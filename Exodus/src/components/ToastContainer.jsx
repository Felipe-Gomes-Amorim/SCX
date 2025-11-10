import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Toast from "./Toast.jsx";

export default function ToastContainer({ toasts, removeToast }) {
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 20,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: "auto" }}
          >
            <Toast {...toast} onClose={removeToast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.getElementById("toast-root") 
  );
}
