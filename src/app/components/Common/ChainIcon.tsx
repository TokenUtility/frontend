import ScreenMedia from "@/app/components/Common/ScreenMedia";
import Image from "next/image";

const ChainIcon = ({ size = 46, src, alt, disabledResponsive = false }) => {
  return (
    <ScreenMedia>
      {({ xlAndUp }) => {
        const calcSize = disabledResponsive
          ? size
          : xlAndUp
            ? size
            : size * 0.85;
        return (
          <Image
            src={src}
            height={calcSize}
            width={calcSize}
            alt={alt}
            style={{ borderRadius: "999px" }}
          />
        );
      }}
    </ScreenMedia>
  );
};

export default ChainIcon;
