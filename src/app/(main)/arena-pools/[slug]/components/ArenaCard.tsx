import {
  Box,
  Button,
  Typography,
  Tooltip,
  IconButton,
  Checkbox,
} from "@mui/material";
import ArenaImageBox from "@/app/components/Common/ArenaImageBox";
import UserIcon from "@/app/components/Common/Icons/Profile";
import TypoC from "@/app/components/Common/Typo";
import TextValidator from "@/app/components/InputValidator/TextField";
import { ValidatorForm } from "react-form-validator-core";
import { useState, ChangeEvent } from "react";
import { fromMIST, amountFormat } from "@/utils/helpers";
import { useAccountBalance } from "@suiet/wallet-kit";
import ProgressRaised from "@/app/components/Common/ProgressRaised";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import Link from "next/link";
import { PERCENT_DISTRIBUTION } from "@/constants";
import { ArenaCardProps } from "@/utils/types";
import { bnum } from "@/utils/helpers";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";

const ButtonSelectPool = ({ type, joined, total, active, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: active
          ? "rgba(118, 69, 217, 1)"
          : "rgba(118, 69, 217, 0.38)",
        color: active ? "#fff" : "#000",
        "&:hover": {
          backgroundColor: "rgba(118, 69, 217, 1)",
          color: "#fff",
        },
        py: 0.7,
        px: 1,
      }}
      {...props}
    >
      <TypoC font="bold">${type}</TypoC>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <UserIcon
          size="18px"
          color={active ? "#fff" : "rgba(118, 69, 217, 1)"}
        />
        <TypoC size="small" font="bold">
          &nbsp;{joined}/{total}
        </TypoC>
      </Box>
    </Button>
  );
};

const StartTextProcess = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      Raised/<span style={{ color: "rgba(0, 0, 0, 0.22)" }}>Goal</span>
      <Tooltip
        aria-label="fee for winner"
        id="fee-for-winner"
        title={<TypoC size="small">just some text</TypoC>}
      >
        <IconButton>
          <InfoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const EndTextProcess = ({ raised, goal, ticker, ...props }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {raised}/
      <span style={{ color: "rgba(0, 0, 0, 0.22)" }}>
        {goal} {ticker}
      </span>
    </Box>
  );
};

const Pooling = ({
  poolType,
  amount,
  setAmount,
  setPoolValue,
  poolData,
  setPoolData,
  ticker,
  price = 0,
}) => {
  const [poolSelected, setPoolSelected] = useState(0);

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setAmount(event.target.value);
    setPoolSelected(0);
  }

  function handleSubmit(e) {
    try {
      e.preventDefault();
      // buttonActionHandler(buttonState);
    } catch {}
  }

  function handleSelectPool(index: number) {
    let poolValue = 0;
    switch (index) {
      case 1:
        poolValue = 10;
        break;
      case 2:
        poolValue = 100;
        break;
      case 3:
        poolValue = 500;
        break;
      default:
        break;
    }
    setPoolSelected(index);
    setPoolValue(poolValue);
    setAmount(bnum(poolValue).dividedBy(price).toFixed(2, 2));

    let dataOfType = poolData[poolType] ?? {};
    let updatePool = { poolValue };
    updatePool["key_" + poolValue] = {};

    let dataUpdate = {};
    dataUpdate[poolType] = { ...dataOfType, ...updatePool };

    setPoolData((x) => ({
      ...x,
      ...dataUpdate,
    }));
  }

  return (
    <Box>
      <TypoC font="bold" sx={{ mt: 2 }}>
        Pooling
      </TypoC>
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", gap: { sm: 1, xl: 2 } }}>
          <ButtonSelectPool
            type="10"
            joined={poolData["10"]?.joined ?? 0}
            total={poolType}
            active={poolSelected === 1}
            onClick={() => handleSelectPool(1)}
          />
          <ButtonSelectPool
            type="100"
            joined={poolData["100"]?.joined ?? 0}
            total={poolType}
            active={poolSelected === 2}
            onClick={() => handleSelectPool(2)}
          />
          <ButtonSelectPool
            type="500"
            joined={poolData["500"]?.joined ?? 0}
            total={poolType}
            active={poolSelected === 3}
            onClick={() => handleSelectPool(3)}
          />
        </Box>
      </Box>
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={(errors) => {
          // setErrorForm(true);
          console.log(errors);
        }}
        autoComplete="off"
      >
        {/* @ts-ignore */}
        <TextValidator
          id="deposit-pool"
          onChange={handleAmountChange}
          name="amount"
          type="number"
          autoFocus={true}
          value={amount || ""}
          placeholder="Enter amount"
          endAdornment={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                USDT
              </Typography>
            </Box>
          }
          FormHelperTextProps={{ sx: { mt: 1 } }}
          FormControlProps={{ sx: { mt: 0 } }}
          validators={["required", "minNumber:1", "isFloat"]}
          errorMessages={[
            "“Target amount” is required",
            "“Target amount” must be greater than 1",
            "“Target amount”  must be a number",
          ]}
        />
      </ValidatorForm>
    </Box>
  );
};

const ArenaCard = observer(({ type, arenaPool }: ArenaCardProps) => {
  const { balance } = useAccountBalance();
  const [amount, setAmount] = useState("0");
  const [poolValue, setPoolValue] = useState("0");
  const [isDisabled, setIsDisabled] = useState(true);
  const [poolData, setPoolData] = useState({});
  const {
    root: { providerStore, arenaPoolStore },
  } = useStores()

  function acceptChanged(_, value) {
    setIsDisabled(!value);
  }

  const FIXED_PRICE = 1.03;
  const priceOfToken = arenaPool?.price || FIXED_PRICE;

  function getStartValue() {
    const dataOfType = poolData[type];
    if (!dataOfType) {
      return "0";
    }
    const key = "key_" + dataOfType?.poolValue;
    const poolValue = dataOfType[key];
    console.log("getStartValue", dataOfType, key);
    console.log("getStartValue", poolValue);
    return "0";
  }

  function getEndValue() {
    const dataOfType = poolData[type];
    if (!dataOfType) {
      return "0";
    }
    return "0";
  }

  
  // console.log({contractMetadata})
  // const depositContractAddr = useMemo(() => {
  //   if (!wallet.chain) return "";
  //   return sampleDeposit.get(wallet.chain.id) ?? "";
  // }, [wallet]);

  

  return (
    <Box
      sx={{
        borderRadius: "27px",
        boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.22)",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ArenaImageBox type={type} sizeImage={76}>
          Arena Pool
        </ArenaImageBox>
        <Box
          sx={{
            borderRadius: "12px",
            backgroundColor: "#f6f6f6",
            color: "#7645d9",
            display: "flex",
            alignItems: "center",
            pl: 3,
            pr: 1,
            py: 1,
            fontWeight: "bold",
          }}
        >
          {type} &nbsp;
          <UserIcon size="18px" color="#7645d9" />
        </Box>
      </Box>
      <TypoC size="h5" font="bold" sx={{ mt: 1 }}>
        {arenaPool?.name || "__"} - X{type} Arena Pool #1
      </TypoC>
      <TypoC color="gray" sx={{ mt: 0.5 }}>
        Ends in: <span style={{ color: "#000" }}>1d:4h:15m:15s</span>
      </TypoC>
      <Box
        sx={{
          borderRadius: "22px",
          border: "solid 1px #ededed",
          px: 3,
          py: 1.5,
          mt: 1,
        }}
      >
        <TypoC>
          <span style={{ color: "#7645d9" }}>Deposit</span>{" "}
          {arenaPool?.symbol || "__"} to join{" "}
          <span style={{ color: "#7645d9" }}>X{type}</span> Arena Pool. <br />
          You will have a chance to{" "}
          <span style={{ color: "#7645d9" }}>X{type}</span> your token.
        </TypoC>
      </Box>
      <Pooling
        poolType={type}
        amount={amount}
        setAmount={setAmount}
        setPoolValue={setPoolValue}
        poolData={poolData}
        setPoolData={setPoolData}
        ticker={arenaPool?.symbol}
        price={priceOfToken}
      />
      <TypoC size="h5" sx={{ textAlign: "right", mt: 1 }}>
        Your balance: {amountFormat(fromMIST(balance as unknown as number))}{" "}
        {arenaPool?.symbol}
      </TypoC>
      <ProgressRaised
        sx={{ mt: 2 }}
        startValue={getStartValue()}
        endValue={getEndValue()}
        endText={
          <EndTextProcess
            raised={getStartValue()}
            goal={getEndValue()}
            ticker={arenaPool?.symbol}
          />
        }
        startText={<StartTextProcess />}
        prefix=""
      />
      <Box
        sx={{
          borderRadius: "22px",
          border: "solid 1px #ededed",
          px: 2,
          py: 1.5,
          mt: 2,
        }}
      >
        <Box className="summary-list">
          SUMMARY
          <ul>
            <li>
              You deposit{" "}
              <span>
                {amount}&nbsp; {arenaPool?.symbol || "__"}
              </span>{" "}
              to join{" "}
              <span>
                {arenaPool?.name || "__"} - X{type} Arena Pool #1 - ticket: $
                {poolValue}
              </span>
            </li>

            <li>
              Platform fee <span>{PERCENT_DISTRIBUTION.PLATFORM_FEE}%</span> if
              you Win the pool!
            </li>
            <li>
              Check your <Link href="/#profile">profile</Link> to see the
              result.
            </li>
          </ul>
        </Box>
      </Box>
      <Box sx={{ mt: 2, color: "#6f6f70", fontWeight: "bold" }}>
        <Checkbox
          disabled={bnum(amount).isGreaterThan(0)}
          onChange={acceptChanged}
        />{" "}
        I have read and accept the <Link href="#">Term of Service</Link>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        disabled={isDisabled}
        fullWidth={true}
        sx={{ mt: 2 }}
        onClick={() => arenaPoolStore.deposit()}
      >
        Deposit to Join
      </Button>
    </Box>
  );
});

export default ArenaCard;
