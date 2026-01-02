import { Modal, Typography, Box } from "@mui/material";
import type { ModalInterface } from "./CustomModal.types";

function CustomModal({ title, subtitle, open, handleClose, children }: ModalInterface) {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {subtitle}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
}

export default CustomModal;
