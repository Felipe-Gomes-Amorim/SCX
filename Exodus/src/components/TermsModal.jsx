import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Style from "./TermsModal.module.css";

export default function TermsModal({ onClose, onConfirm }) {
  return (
    <AnimatePresence>
      <motion.div
        className={Style.backdrop}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={Style.modal}
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h3>Antes de continuar…</h3>

          <p className={Style.text}>
            Ao redefinir sua senha, você automaticamente concorda com os{" "}
            <a
              href="/termos"
              className={Style.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Termos de Uso
            </a>{" "}
            e com a{" "}
            <a
              href="/privacidade"
              className={Style.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidade
            </a>
            .
          </p>

          <div className={Style.actions}>
            <button className={Style.confirmBtn} onClick={onConfirm}>
              Concordo e Continuar
            </button>

            <button className={Style.cancelBtn} onClick={onClose}>
              Cancelar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
