import { Modal, Typography, Box, Button, Stack } from "@mui/material";

export interface IConfirmationModal {
  title: string;
  open: boolean;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "primary" | "error" | "warning" | "success";
  handleClose: () => void;
  handleConfirm: () => void;
  loading?: boolean;
}

function ConfirmationModal({
  title,
  message,
  open,
  handleClose,
  handleConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmColor = "primary",
  loading = false,
}: IConfirmationModal) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="confirmation-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {message && (
          <Typography id="confirmation-modal-description" sx={{ my: 2 }}>
            {message}
          </Typography>
        )}
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
          <Button onClick={handleClose} variant="outlined" disabled={loading}>
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color={confirmColor}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ConfirmationModal;
