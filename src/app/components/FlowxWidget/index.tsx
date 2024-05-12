import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";

const FlowXWidget = () => {
  const ref = useRef();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded) {
      return;
    }
    if (!window.FlowXInitial) {
      console.error("FlowXInitial");
      return;
    }
    const root = window.FlowXInitial(ref.current);
    return () => {
      root.unmount();
    };
  }, [loaded]);

  return (
    <div>
      <div ref={ref} />
      <Script
        strategy="afterInteractive"
        src="https://cdn.flowx.finance/swap-widget/0.0.8/main.js"
        onLoad={() => {
          setLoaded(true);
          console.log("script has loaded");
        }}
      ></Script>
    </div>
  );
};

export default FlowXWidget;
