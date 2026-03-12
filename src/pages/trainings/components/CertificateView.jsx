import styles from "../trainings.module.css";

export default function CertificateView({ isOpen, trainingTitle, userName, dateText, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalBackdrop} onClick={onClose} />
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Sertifikat</h2>
          <button type="button" className={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.certificate}>
            <div className={styles.certificateInner}>
              <div className={styles.certificateTop}>CERTIFICATE</div>
              <div className={styles.certificateTitle}>TAMAMLANMA SERTİFİKATI</div>
              <div className={styles.certificateText}>Bu sertifikat təqdim olunur:</div>
              <div className={styles.certificateName}>{userName || "İstifadəçi"}</div>
              <div className={styles.certificateText}>aşağıdakı təlimi uğurla tamamladığı üçün</div>
              <div className={styles.certificateTraining}>{trainingTitle}</div>
              <div className={styles.certificateMetaRow}>
                <div>
                  <div className={styles.certificateMetaLabel}>Tarix</div>
                  <div className={styles.certificateMetaValue}>{dateText}</div>
                </div>
                <div className={styles.certificateSeal}>HRD</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalActions}>
          <button type="button" className={styles.primaryButton} onClick={onClose}>
            Bağla
          </button>
        </div>
      </div>
    </div>
  );
}

