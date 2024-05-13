import LinearProgress from "@mui/material/LinearProgress";
import { SxProps, Box } from "@mui/material";
import { amountFormat, fromWei } from "@/utils/helpers";
import react from "react";

interface ProgressProps {
  startText?: string | react.ReactNode;
  endText?: string | react.ReactNode;
  startValue: string;
  endValue: string;
  sx?: SxProps;
  size?: string;
  prefix?: string;
  postfix?: string;
}

function getStyleBySize(size) {
  const mediumSize = {
    title: { fontSize: { xs: "16px", md: "16px" } },
    value: { fontSize: { xs: "16px", md: "16px" } },
    process: { height: "19px" },
  };
  switch (size) {
    case "small":
      return {
        title: { fontSize: "14px" },
        value: { fontSize: "18px" },
        process: { height: "4px" },
      };
    case "medium":
      return mediumSize;
    default:
      return mediumSize;
  }
}

const ProgressRaised = (props: ProgressProps) => {
  const { endText, startText, startValue, endValue, sx, prefix, postfix } =
    props;
  const progressCal = Math.floor((+startValue * 100) / +endValue);
  const progress = progressCal > 100 ? 100 : progressCal;

  const styleBySize = getStyleBySize(props.size);

  return (
    <Box sx={sx}>
      <LinearProgress
        variant="determinate"
        value={progress}
        aria-label="progress raised"
        sx={{ mt: 1.5, mb: 0, ...styleBySize.process }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          ...styleBySize.title,
        }}
      >
        {startText || "Raised"}
        {endText || ""}
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          ...styleBySize.value,
        }}
      >
        <span>
          {prefix ? prefix + " " : ""}
          {amountFormat(fromWei(startValue), 0)}
          {postfix ? " " + postfix : ""}
        </span>
        <span style={{textAlign: "right"}}>
          {prefix ? prefix + " " : ""}
          {amountFormat(fromWei(endValue), 0)}
          {postfix ? " " + postfix : ""}
        </span>
      </Box> */}
    </Box>
  );
};

export default ProgressRaised;
