// @ts-nocheck
import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";

const FlowXWidget = ({ id }: { id: string }) => {
  const ref = useRef();

  useEffect(() => {
    if (!window.FlowXInitial) {
      console.error("FlowXInitial");
      return;
    }
    // const root = window.FlowXInitial(ref.current);
    // return () => {
    //   root.unmount();
    // };
  }, [id]);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};

export default FlowXWidget;
