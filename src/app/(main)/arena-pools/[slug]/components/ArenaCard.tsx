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
import { useState, ChangeEvent, useEffect, useMemo } from "react";
import { fromMIST, toMIST, amountFormat } from "@/utils/helpers";
import ProgressRaised from "@/app/components/Common/ProgressRaised";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import Link from "next/link";
import { PERCENT_DISTRIBUTION, ARENA_CONFIG } from "@/constants";
import { ArenaCardProps } from "@/utils/types";
import { bnum } from "@/utils/helpers";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";
import { PoolType } from "@/utils/types";
import { styled } from "@mui/material/styles";
import CountdownRefreshPrice from "@/app/components/CountdownRefreshPrice";

const StyledTextValidator = styled((props: any) => (
  //@ts-ignore
  <TextValidator {...props} />
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
    WebkitTextFillColor: "unset",
  },
  "&.MuiInputBase-root.coming-soon": {
    backgroundColor: "#a791d6",
  },
}));

const ButtonSelectPool = ({
  costInUsd,
  numUsers,
  maxUsers,
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
      <TypoC font="bold">${costInUsd}</TypoC>
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
          &nbsp;{numUsers}/{maxUsers}
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

const EndTextProcess = ({ numUsers, maxUsers, ...props }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      {numUsers}/{maxUsers} &nbsp;
      <UserIcon size="18px" />
    </Box>
  );
};

const Pooling = observer(
  ({
    ticker,
    price,
    setPoolIndex,
    selectedPoolIndex,
    amount,
    setAmount,
    coinXsAmount,
    balanceMetadata,
    arenaPool,
    arenaData,
  }) => {
    const {
      root: { arenaPoolStore },
    } = useStores();
    const poolSelected = ARENA_CONFIG[arenaData.poolType].pools[selectedPoolIndex];
    const joined = useMemo(
      () =>
        arenaData.activePools?.find(
          (activePool) => activePool.costInUsd === poolSelected.costInUsd
        )?.numUsers || 0,
      [arenaData.activePools, poolSelected.costInUsd]
    );

    function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
      setAmount(event.target.value);
    }

    function handleSubmit(e) {
      try {
        e.preventDefault();
        // buttonActionHandler(buttonState);
      } catch {}
    }

    function handleSelectPool(poolLevel: number) {
      setPoolIndex(poolLevel);
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
            {ARENA_CONFIG[arenaData.poolType].pools.map((pool, index) => (
              <ButtonSelectPool
                key={index}
                costInUsd={pool.costInUsd}
                numUsers={joined}
                maxUsers={pool.maxUsers}
                active={selectedPoolIndex === pool.poolIndex}
                onClick={() => handleSelectPool(pool.poolIndex)}
              />
            ))}
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
                {(1 / poolSelected.maxUsers) * 100}%
              </TypoC>
            </Box>

            <Box>
              <TypoC color="#d6c2ff" font="bold" size="tiny-small">
                If you&apos;re a winner
              </TypoC>
              <TypoC size="h5" font="bold" sx={{ mt: 0.3 }}>
                You get $
                {bnum(poolSelected.costInUsd)
                  .multipliedBy(PERCENT_DISTRIBUTION.RECEIPT)
                  .multipliedBy(poolSelected.maxUsers)
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
                  {poolSelected.costInUsd} ticket for the pool. Just{" "}
                  {bnum(poolSelected.maxUsers).minus(joined).toFixed()} more are
                  needed to draw the prize.
                </>
              ) : (
                <>
                  {poolSelected.maxUsers} participants are needed to draw the
                  prize.
                </>
              )}
            </TypoC>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <CountdownRefreshPrice />
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
              className={arenaData.id ? "" : "coming-soon"}
              onChange={handleAmountChange}
              name="amount"
              type="number"
              autoFocus={true}
              value={amount || ""}
              placeholder="Enter amount"
              disabled={true}
              endAdornment={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "end",
                    gap: 0,
                    flexDirection: "column",
                  }}
                >
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
            <Box>
              <Box
                sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}
              >
                <TypoC size="small" font="bold" sx={{ whiteSpace: "nowrap" }}>
                  ≈ ${poolSelected.costInUsd}
                </TypoC>
                <TypoC size="small" font="bold" sx={{ whiteSpace: "nowrap" }}>
                  Balance:{" "}
                  {coinXsAmount
                    ? amountFormat(coinXsAmount)
                    : "__"}
                  &nbsp;
                  {arenaPool?.symbol}
                </TypoC>
              </Box>
            </Box>
          </ValidatorForm>

          <ProgressRaised
            sx={{ mt: 2, display: "flex", width: "100%" }}
            startValue={joined}
            endValue={poolSelected.maxUsers}
            endText={
              <EndTextProcess
                numUsers={joined}
                maxUsers={poolSelected.maxUsers}
              />
            }
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
                    {arenaPool?.name || "__"} -{" "}
                    {ARENA_CONFIG[arenaData.poolType].arenaName} Arena Pool #1 - ticket: $
                    {poolSelected.costInUsd}
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
  ({ arenaPool, coins, balanceMetadata, arenaData }: ArenaCardProps) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [amount, setAmount] = useState(null);
    const [selectedPoolIndex, setPoolIndex] = useState(1);
    const {
      root: { providerStore, arenaPoolStore, notificationStore },
    } = useStores();

    const { arenaName } = ARENA_CONFIG[arenaData.poolType];
    const poolSelected =
      ARENA_CONFIG[arenaData.poolType].pools[selectedPoolIndex];

    const coinXsBalance = coins.reduce(
      (total, coin) => bnum(total).plus(coin.balance).toFixed(),
      "0"
    );

    const coinXsAmount = fromMIST(coinXsBalance, balanceMetadata?.decimals)

    function acceptChanged(_, value) {
      setIsDisabled(!value);
    }

    const FIXED_PRICE = 1;
    const priceOfToken = arenaPool?.price || FIXED_PRICE;

    useEffect(() => {
      setAmount(
        bnum(poolSelected.costInUsd).dividedBy(priceOfToken).toFixed(3)
      );
    }, [poolSelected, priceOfToken]);

    function handleJoinPool() {
      if(!providerStore.providerStatus.account) {
        notificationStore.showErrorNotification("Please connect wallet first")
        return
      }
      if(bnum(coinXsAmount).isLessThan(amount)) {
        notificationStore.showErrorNotification("Wallet does not have enough balance")
        return
      }
      arenaPoolStore.onOpenConfirmModal({
        coins,
        amount,
        arenaData: arenaData,
        arenaPool,
        costInUsd: poolSelected.costInUsd
      })
    }

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
            <ArenaImageBox type={arenaData.poolType} sizeImage={90} />
            <Box>
              <TypoC size="h3" color="primary" font="bold">
                Arena Pool
              </TypoC>
              <TypoC size="h5" font="bold" sx={{ mb: 0.5 }}>
                {arenaPool?.name || "__"} - {arenaName} #1
              </TypoC>
              <TypoC font="bold" size="tiny-small">
                <span style={{ color: "#7645d9" }}>Deposit</span>{" "}
                {arenaPool?.symbol || "__"} to join{" "}
                <span style={{ color: "#7645d9" }}> {arenaName}</span> Arena
                Pool. <br />
                You will have a chance to{" "}
                <span style={{ color: "#7645d9" }}>{arenaName}</span> your
                token.
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
          ticker={arenaPool?.symbol}
          selectedPoolIndex={selectedPoolIndex}
          setPoolIndex={setPoolIndex}
          amount={amount}
          setAmount={setAmount}
          price={priceOfToken}
          coinXsAmount={coinXsAmount}
          balanceMetadata={balanceMetadata}
          arenaPool={arenaPool}
          arenaData={arenaData}
        />

        <Box
          sx={{ mt: 2, color: "#6f6f70", fontWeight: "bold", fontSize: "14px" }}
        >
          <Checkbox
            disabled={bnum(amount).isLessThanOrEqualTo(0) || !arenaData.id}
            onChange={acceptChanged}
          />{" "}
          I have read and accept the <Link href="#">Term of Service</Link>
        </Box>
        {arenaData.id ? (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            disabled={isDisabled}
            fullWidth={true}
            sx={{ mt: 2 }}
            onClick={handleJoinPool}
          >
            Deposit to Join
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            fullWidth={true}
            sx={{ mt: 2 }}
          >
            Coming Soon
          </Button>
        )}
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
