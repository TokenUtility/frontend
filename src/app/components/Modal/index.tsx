import Modal, { ModalProps } from "@mui/material/Modal";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", sm: 600, xl: 650 },
  bgcolor: "#fff",
  border: "1px solid transparent",
  outline: "none",
  borderRadius: "20px",
  maxWidth: "calc(100% - 24px)",
  mx: "auto",
  boxShadow: 24,
  px: {
    xs: 2,
    xl: 5,
  },
  py: {
    xs: 4,
    xl: 6,
  },
  overflowX: "auto",
  maxHeight: "90vh",
};

const styleIconClose = {
  position: "absolute",
  right: "1rem",
  top: "10px",
};

const ModalCustom = (props: ModalProps) => {
  const { children, onClose, sx, ...res } = props;
  return (
    <Modal onClose={onClose} {...res}>
      {/* @ts-ignore */}
      <Box sx={{ ...style, ...sx }}>
        {onClose && (
          <IconButton
            onClick={(event) => onClose(event, "escapeKeyDown")}
            sx={styleIconClose}
          >
            <CloseRoundedIcon />
          </IconButton>
        )}
        {children}
      </Box>
    </Modal>
  );
};

export default ModalCustom;
