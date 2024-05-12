"use client";
import { forwardRef } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useStores } from "@/contexts/storesContext";
import { observer } from "mobx-react";

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  },
);
const Notification = observer(() => {
  const {
    root: { notificationStore },
  } = useStores();
  const { open, onClose, message, autoHideDuration, severity, anchorOrigin } =
    notificationStore;
  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
});
export default Notification;
