import _ from "lodash";
import { useCallback } from "react";

export default function useThrottle(cb, delay) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(_.throttle(cb, delay), []);
}
