import LoadingIcon from "./Icons/Loading";
import Button, { ButtonProps } from "@mui/material/Button";

interface LoadingButton extends ButtonProps {
  loading?: boolean;
}

function getFontSizeIcon(size) {
  switch (size) {
    case "large":
      return "40px";
    case "medium":
      return "28px";
    default:
      return "28px";
  }
}

const LoadingButton = ({ children, loading, size, ...res }: LoadingButton) => {
  return (
    <Button disabled={loading} size={size} {...res}>
      {loading && <LoadingIcon fontSize={getFontSizeIcon(size)}></LoadingIcon>}
      {children}
    </Button>
  );
};

export default LoadingButton;
