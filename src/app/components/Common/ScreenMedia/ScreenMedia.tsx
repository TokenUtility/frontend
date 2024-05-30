// import * as rdd from "react-device-detect";
// import { isMobile } from "react-device-detect";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";

interface ScreenMediaProps {
  children: (props) => React.ReactNode;
}
export default function ScreenMedia(props: ScreenMediaProps) {
  const xsAndUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("xs"));
  const smAndUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  // const mdAndUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  // const lgAndUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const xlAndUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("xl"));

  const xsOnly = useMediaQuery((theme: Theme) => theme.breakpoints.only("xs"));
  // const smOnly = useMediaQuery((theme: Theme) => theme.breakpoints.only("sm"));
  // const mdOnly = useMediaQuery((theme: Theme) => theme.breakpoints.only("md"));
  // const lgOnly = useMediaQuery((theme: Theme) => theme.breakpoints.only("lg"));
  // const xlOnly = useMediaQuery((theme: Theme) => theme.breakpoints.only("xl"));

  return props.children({
    xsAndUp,
    smAndUp,
    // mdAndUp,
    // lgAndUp,
    xlAndUp,
    xsOnly,
    // smOnly,
    // mdOnly,
    // lgOnly,
    // xlOnly,
  });
}
