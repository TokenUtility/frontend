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
import { PERCENT_DISTRIBUTION } from '@/constants'

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
        py: 0.7
      }}
      {...props}
    >
      <Box sx={{fontWeight: 'bold'}}>${type}</Box>
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
        &nbsp;{joined}/{total}
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

const EndTextProcess = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      10.000 / <span style={{ color: "rgba(0, 0, 0, 0.22)" }}>20.000 SCB</span>
    </Box>
  );
};

const Pooling = ({ amount, setAmount }) => {
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
    setPoolSelected(index);
    switch (index) {
      case 1:
        setAmount(10);
        break;
      case 2:
        setAmount(100);
        break;
      case 3:
        setAmount(500);
        break;
      default:
        break;
    }
  }

  return (
    <Box>
      <TypoC font="bold" sx={{ mt: 2 }}>
        Pooling
      </TypoC>
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <ButtonSelectPool
            type="10"
            joined={1}
            total={2}
            active={poolSelected === 1}
            onClick={() => handleSelectPool(1)}
          />
          <ButtonSelectPool
            type="100"
            joined={0}
            total={2}
            active={poolSelected === 2}
            onClick={() => handleSelectPool(2)}
          />
          <ButtonSelectPool
            type="500"
            joined={0}
            total={2}
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
              {/* <Button
                size="small"
                variant="contained"
                disableElevation={true}
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "rgba(33, 193, 134, 0.19)",
                  padding: "4px 8px",
                  minWidth: "unset",
                  color: "#21c186",
                  "&:hover": {
                    backgroundColor: "rgba(33, 193, 134, 0.30)",
                  },
                }}
                onClick={onMaxAmount}
              >
                Max
              </Button> */}
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

const ArenaCard = () => {
  const { balance } = useAccountBalance();
  const [amount, setAmount] = useState();

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
        <ArenaImageBox type="x2" sizeImage={76}>
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
          }}
        >
          2 &nbsp;
          <UserIcon size="18px" color="#7645d9" />
        </Box>
      </Box>
      <TypoC size="h5" font="bold" sx={{ mt: 1 }}>
        Sacabam - X2 Arena Pool #1
      </TypoC>
      <TypoC color="gray" sx={{ mt: 0.5 }}>
        Ends in: <span style={{ color: "#000" }}>1d:4h:15m:15s</span>
      </TypoC>
      <Box
        sx={{ borderRadius: "22px", border: "solid 1px #ededed", px: 3, py: 1.5, mt: 1 }}
      >
        <TypoC>
          <span style={{ color: "#7645d9" }}>Deposit</span> SCB to join{" "}
          <span style={{ color: "#7645d9" }}>X10</span> Arena Pool. <br />
          You will have a chance to{" "}
          <span style={{ color: "#7645d9" }}>X10</span> your token.
        </TypoC>
      </Box>
      <Pooling amount={amount} setAmount={setAmount} />
      <TypoC size="h5" sx={{ textAlign: "right", mt: 1 }}>
        Your balance: {amountFormat(fromMIST(balance as unknown as number))} SUI
      </TypoC>
      <ProgressRaised
        sx={{ mt: 2 }}
        startValue={'10000' || "0"}
        endValue={"20000"}
        endText={<EndTextProcess />}
        startText={<StartTextProcess />}
        prefix=""
      />
      <Box
        sx={{ borderRadius: "22px", border: "solid 1px #ededed", px: 2, py: 1.5, mt: 2 }}
      >
        <Box className="summary-list">
          SUMMARY
          <ul>
            <li>
              You deposit <span>{amount}&nbsp; SCB</span> to join{" "}
              <span>Sacabam - X2 Arena Pool #1 - ticket: $10</span>
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
      <Box sx={{ mt: 2, color: "#6f6f70", fontWeight: 'bold' }}>
        <Checkbox /> I have read and accept the{" "}
        <Link href="#">Term of Service</Link>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        disabled={true}
        fullWidth={true}
        sx={{ mt: 2 }}
      >
        Deposit to Join
      </Button>
    </Box>
  );
};

export default ArenaCard;
