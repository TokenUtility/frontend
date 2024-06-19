import {
  Box,
  Button,
  Typography,
  Tooltip,
  IconButton,
  Checkbox,
  Divider,
} from "@mui/material";
import ArenaImageBox from "@/app/components/Common/ArenaImageBox";
import UserIcon from "@/app/components/Common/Icons/Profile";
import TypoC from "@/app/components/Common/Typo";
import TextValidator from "@/app/components/InputValidator/TextField";
import { ValidatorForm } from "react-form-validator-core";
import { useState, ChangeEvent, useEffect } from "react";
import { fromMIST, amountFormat } from "@/utils/helpers";
import ProgressRaised from "@/app/components/Common/ProgressRaised";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import Link from "next/link";
import { PERCENT_DISTRIBUTION, POOL_AMOUNT_LEVEL } from "@/constants";
import { ArenaCardProps } from "@/utils/types";
import { bnum } from "@/utils/helpers";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";
import { PoolType } from "@/utils/types";
import { styled } from "@mui/material/styles";

const StyledTextValidator = styled((props: any) => (
  //@ts-ignore
  <TextValidator {...props}></TextValidator>
))(({ theme }) => ({
  "&.MuiInputBase-root": {
    backgroundColor: "rgba(246,246,246, 1)",
  },
  "&.MuiInputBase-root.Mui-focused": {
    backgroundColor: "rgba(246,246,246, 1)",
  },
  "&.MuiInputBase-root.Mui-disabled": {
    color: "rgba(0, 0, 0, 0.87)",
  },
  "#deposit-pool": {
    color: "#7645d9",
    fontSize: "18px",
  },
}));

const ButtonSelectPool = ({
  amountLevel,
  currentPlayer,
  totalPlayer,
  active,
  onClick,
}) => {
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
        borderRadius: "6px 6px 0 0",
        height: active ? 42 : 34,
      }}
      onClick={onClick}
    >
      <TypoC font="bold">${POOL_AMOUNT_LEVEL[amountLevel]}</TypoC>
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
          &nbsp;{currentPlayer}/{totalPlayer}
        </TypoC>
      </Box>
    </Button>
  );
};

const StartTextProcess = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      Raised
      <Tooltip
        aria-label="fee for winner"
        id="fee-for-winner"
        title={<TypoC size="small">just some text</TypoC>}
      >
        <IconButton>
          <InfoIcon fontSize="small" style={{ color: "#fff" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const EndTextProcess = ({ joined, type, ...props }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      {joined}/{type} &nbsp;
      <UserIcon size="18px" />
    </Box>
  );
};

const Pooling = observer(
  ({
    poolType,
    ticker,
    price,
    setPoolAmountLevel,
    poolAmountLevel,
    amount,
    setAmount,
    coinXsBalance,
    balanceMetadata,
    arenaPool,
  }) => {
    const {
      root: { arenaPoolStore },
    } = useStores();
    const joined = 1;

    function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
      setAmount(event.target.value);
      setPoolAmountLevel(null);
    }

    function handleSubmit(e) {
      try {
        e.preventDefault();
        // buttonActionHandler(buttonState);
      } catch {}
    }

    function handleSelectPool(poolLevel: number) {
      setPoolAmountLevel(poolLevel);
    }

    return (
      <Box>
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              gap: { sm: 1, xl: 2 },
              px: 2,
            }}
          >
            <ButtonSelectPool
              amountLevel={1}
              currentPlayer={joined}
              totalPlayer={poolType}
              active={poolAmountLevel === 1}
              onClick={() => handleSelectPool(1)}
            />
            <ButtonSelectPool
              amountLevel={2}
              currentPlayer={joined}
              totalPlayer={poolType}
              active={poolAmountLevel === 2}
              onClick={() => handleSelectPool(2)}
            />
            <ButtonSelectPool
              amountLevel={3}
              currentPlayer={joined}
              totalPlayer={poolType}
              active={poolAmountLevel === 3}
              onClick={() => handleSelectPool(3)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#7645d9",
            borderRadius: "12px",
            px: 2,
            py: 3,
            color: "#fff",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#502f94",
              borderRadius: "16px",
              px: 2,
              py: 1.2,
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <TypoC color="#d6c2ff" font="bold" size="tiny-small">
                Win Rate
              </TypoC>
              <TypoC size="h5" font="bold" sx={{ mt: 0.3 }}>
                {(1 / poolType) * 100}%
              </TypoC>
            </Box>

            <Box>
              <TypoC color="#d6c2ff" font="bold" size="tiny-small">
                If you&apos;re a winner
              </TypoC>
              <TypoC size="h5" font="bold" sx={{ mt: 0.3 }}>
                You get $
                {bnum(POOL_AMOUNT_LEVEL[poolAmountLevel])
                  .multipliedBy(PERCENT_DISTRIBUTION.RECEIPT)
                  .multipliedBy(poolType)
                  .dividedBy(100)
                  .toFixed()}
              </TypoC>
            </Box>

            <Box>
              <TypoC color="#d6c2ff" font="bold" size="tiny-small">
                Ends in
              </TypoC>
              <TypoC size="h5" font="bold" sx={{ mt: 0.3 }}>
                {" "}
                2d:4h:15m:15s
              </TypoC>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 3,
              mb: 1,
              minHeight: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TypoC font="bold" size="small" sx={{ textAlign: "center" }}>
              {joined ? (
                <>
                  {joined} participants have chosen the $
                  {POOL_AMOUNT_LEVEL[poolAmountLevel]} ticket for the pool. Just{" "}
                  {bnum(poolType).minus(joined).toFixed()} more are needed to
                  draw the prize.
                </>
              ) : (
                <>{poolType} participants are needed to draw the prize.</>
              )}
            </TypoC>
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
            <StyledTextValidator
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
                    alignItems: "end",
                    gap: 0,
                    flexDirection: "column",
                  }}
                >
                  <TypoC size="small" font="bold" sx={{ whiteSpace: "nowrap" }}>
                    Balance:{" "}
                    {coinXsBalance
                      ? amountFormat(coinXsBalance, balanceMetadata?.decimals)
                      : "__"}
                    &nbsp;
                    {arenaPool?.symbol}
                  </TypoC>
                  <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                    {arenaPool?.symbol}
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

          <ProgressRaised
            sx={{ mt: 2, display: "flex", width: "100%" }}
            startValue={joined}
            endValue={poolType}
            endText={<EndTextProcess joined={joined} type={poolType} />}
            startText={<StartTextProcess />}
            prefix=""
          />
          <Divider
            orientation="horizontal"
            sx={{
              height: "unset",
              mt: 1.5,
              mb: 2,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            }}
          />
          <Box>
            <Box className="summary-list">
              SUMMARY
              <ul>
                <li>
                  You deposit{" "}
                  <span>
                    {amountFormat(amount)}&nbsp; {arenaPool?.symbol || "__"}
                  </span>{" "}
                  to join{" "}
                  <span>
                    {arenaPool?.name || "__"} - X{poolType} Arena Pool #1 -
                    ticket: ${POOL_AMOUNT_LEVEL[poolAmountLevel]}
                  </span>
                </li>

                <li>
                  Platform fee <span>{PERCENT_DISTRIBUTION.PLATFORM_FEE}%</span>{" "}
                  if you Win the pool!
                </li>
                <li>
                  Check your <Link href="/#profile">profile</Link> to see the
                  result.
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

const ArenaCard = observer(
  ({ type, arenaPool, coins, balanceMetadata }: ArenaCardProps) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [amount, setAmount] = useState(null);
    const [poolAmountLevel, setPoolAmountLevel] = useState(2);

    const {
      root: { providerStore, arenaPoolStore },
    } = useStores();

    const coinXsBalance = coins.reduce(
      (total, coin) => bnum(total).plus(coin.balance).toFixed(),
      "0"
    );

    function acceptChanged(_, value) {
      setIsDisabled(!value);
    }

    const FIXED_PRICE = 1;
    const priceOfToken = arenaPool?.price || FIXED_PRICE;

    useEffect(() => {
      setAmount(
        bnum(POOL_AMOUNT_LEVEL[poolAmountLevel])
          .dividedBy(priceOfToken)
          .toFixed()
      );
      console.log({
        amount: POOL_AMOUNT_LEVEL[poolAmountLevel],
        priceOfToken,
        poolAmountLevel,
        POOL_AMOUNT_LEVEL,
      });
    }, [poolAmountLevel, priceOfToken]);
    return (
      <Box
        sx={{
          borderRadius: "27px",
          boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.22)",
          px: { xs: 2.5, xl: 3 },
          py: { xs: 3, xl: 3 },
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(232,224,248, 0.4)",
            p: 2,
            borderRadius: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <ArenaImageBox type={type} sizeImage={90} />
            <Box>
              <TypoC size="h3" color="primary" font="bold">
                Arena Pool
              </TypoC>
              <TypoC size="h5" font="bold" sx={{ mb: 0.5 }}>
                {arenaPool?.name || "__"} - X{type} #1
              </TypoC>
              <TypoC font="bold" size="tiny-small">
                <span style={{ color: "#7645d9" }}>Deposit</span>{" "}
                {arenaPool?.symbol || "__"} to join{" "}
                <span style={{ color: "#7645d9" }}>X{type}</span> Arena Pool.{" "}
                <br />
                You will have a chance to{" "}
                <span style={{ color: "#7645d9" }}>X{type}</span> your token.
              </TypoC>
            </Box>
          </Box>
          <TypoC color="primary" size="small" font="bold" sx={{ mt: 1 }}>
            The winner is randomly selected by the SUI Verifiable Random
            Function (SUI VRF).
          </TypoC>
        </Box>
        <TypoC
          color="primary"
          size="small"
          font="bold"
          sx={{ mt: 1, textAlign: "center" }}
        >
          In this pool, choose one of the following tickets: <br />
          $1, $10, or $100 to participate.
        </TypoC>

        <Pooling
          poolType={type}
          ticker={arenaPool?.symbol}
          poolAmountLevel={poolAmountLevel}
          setPoolAmountLevel={setPoolAmountLevel}
          amount={amount}
          setAmount={setAmount}
          price={priceOfToken}
          coinXsBalance={coinXsBalance}
          balanceMetadata={balanceMetadata}
          arenaPool={arenaPool}
        />

        <Box
          sx={{ mt: 2, color: "#6f6f70", fontWeight: "bold", fontSize: "14px" }}
        >
          <Checkbox
            disabled={bnum(amount).isLessThanOrEqualTo(0)}
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
          onClick={() =>
            arenaPoolStore.onOpenConfirmModal({
              coins,
              amount,
              type,
              arenaPool,
              poolAmountLevel,
            })
          }
        >
          Deposit to Join
        </Button>
        {/* <Button
          variant="contained"
          color="primary"
          size="medium"
          fullWidth={true}
          sx={{ mt: 2 }}
          onClick={() => arenaPoolStore.claimWinner({ coins })}
        >
          Claim
        </Button> */}
      </Box>
    );
  }
);

export default ArenaCard;
