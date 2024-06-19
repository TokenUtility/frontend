import LinearProgress from "@mui/material/LinearProgress";
import { SxProps, Box } from "@mui/material";
import { amountFormat } from "@/utils/helpers";
import react from "react";

interface ProgressProps {
  startText?: string | react.ReactNode;
  endText?: string | react.ReactNode;
  startValue: number | string;
  endValue: number | string;
  sx?: SxProps;
  size?: string;
  prefix?: string;
  postfix?: string;
}

function getStyleBySize(size) {
  const mediumSize = {
    title: { fontSize: { xs: "16px", md: "16px" } },
    value: { fontSize: { xs: "16px", md: "16px" } },
    process: { height: "12px" },
  };
  switch (size) {
    case "small":
      return {
        title: { fontSize: "14px" },
        value: { fontSize: "18px" },
        process: { height: "12px" },
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
    <Box sx={{ display: "flex", alignItems: 'center', ...sx}}>
      <Box sx={{ ...styleBySize.title }}>{startText || "Raised"}</Box>
      <Box sx={{flex: 1}}>
        <LinearProgress
          variant="determinate"
          value={progress}
          aria-label="progress raised"
          sx={{ mr: 1, mb: 0, ...styleBySize.process }}
        />
      </Box>
      <Box sx={{ ...styleBySize.title }}>{endText || ""}</Box>
    </Box>
  );
};

export default ProgressRaised;
