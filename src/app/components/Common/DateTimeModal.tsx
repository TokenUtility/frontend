import * as React from "react";
import { Box, Modal, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar";
import dayjs from "dayjs";
import { observer } from "mobx-react";
import { useStores } from "@/contexts/storesContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", md: 500 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: { xs: 1, md: 4 },
};

const styleAction = {
  gridColumn: "1 / 4",
  gridRow: 3,
  display: "flex",
  justifyContent: "flex-end",
  padding: "8px",
  alignItems: "center",
};

const ActionList = observer((props: PickersActionBarProps) => {
  const {
    root: { appStore },
  } = useStores();

  const { onAccept, onClear, onCancel, onSetToday } = props;

  return (
    <Box sx={styleAction}>
      <Button onClick={appStore.onCloseDateTimePickerModal} color="primary">
        Cancel
      </Button>
      <Button onClick={onAccept} color="primary" sx={{ marginLeft: "8px" }}>
        Apply
      </Button>
    </Box>
  );
});

const DateTimeModal = observer((props) => {
  const {
    root: { appStore },
  } = useStores();

  function onAccept(value) {
    props.onAccept(value);
    appStore.onCloseDateTimePickerModal();
  }

  return (
    <div>
      <Modal
        open={appStore.dateTimePickerModal}
        onClose={appStore.onCloseDateTimePickerModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              defaultValue={dayjs()}
              disablePast={true}
              onAccept={onAccept}
              slots={{
                actionBar: ActionList,
              }}
            />
          </LocalizationProvider>
        </Box>
      </Modal>
    </div>
  );
});

export default DateTimeModal;
