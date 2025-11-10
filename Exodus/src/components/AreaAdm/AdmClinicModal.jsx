import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { admClinicAction } from "../../js/fluxoAdmSis/admClinicActions";
import Style from "./DisableAdmModal.module.css";
import { useToast } from "../../context/ToastProvider.jsx";

export default function AdmClinicModal({ token, show, onClose, action }) {
  const [admEmail, setAdmEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const isEnable = action === "enable";
  const title = isEnable
    ? "Ativar Administrador de Clínica"
    : "Desativar Administrador de Clínica";
  const buttonText = loading
    ? "Processando..."
    : isEnable
      ? "Ativar"
      : "Desativar";

  async function handleSubmit() {
    if (!admEmail.trim()) return showToast("Digite o e-mail do administrador.");
    setLoading(true);

    const result = await admClinicAction(admEmail, action, token);
    showToast(result.message);

    if (result.success) {
      setAdmEmail("");
      onClose();
    }

    setLoading(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={Style.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={Style.modalCard}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 15,
            }}
          >
            <h3>{title}</h3>
            <p>Digite o e-mail do administrador:</p>

            <input
              type="email"
              placeholder="exemplo@clinica.com"
              value={admEmail}
              onChange={(e) => setAdmEmail(e.target.value)}
            />

            <div className={Style.modalButtons}>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`${Style.confirmBtn} ${isEnable ? Style.enable : Style.disable
                  }`}
              >
                {buttonText}
              </button>

              <button onClick={onClose} className={Style.cancelBtn}>
                Cancelar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
