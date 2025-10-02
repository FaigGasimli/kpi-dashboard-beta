import { useState, useEffect } from "react";
import styles from "../task.module.css";

const TaskModal = ({ task, isOpen, onClose, onSave, onDelete, departments, executors }) => {
  const [formData, setFormData] = useState({
    kpiCode: "",
    kpiName: "",
    purpose: "",
    measurementMethod: "",
    period: "",
    weight: "15",
    responsibleDepartment: "",
    dataSource: "",
    executor: "",
    creator: "",
    createdDate: "",
    deadline: "",
    status: "Gözləyən",
    department: "",
    comments: [],
    attachments: [],
  });

  const [newComment, setNewComment] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        kpiCode: task.kpiCode || "",
        kpiName: task.kpiName || "",
        purpose: task.purpose || "",
        measurementMethod: task.measurementMethod || "",
        period: task.period || "",
        weight: task.weight || "15",
        responsibleDepartment: task.responsibleDepartment || "",
        dataSource: task.dataSource || "",
        executor: task.executor || "",
        creator: task.creator || "",
        createdDate: task.createdDate || "",
        deadline: task.deadline || "",
        status: task.status || "Gözləyən",
        department: task.department || "",
        comments: task.comments || [],
        attachments: task.attachments || [],
      });
    }
  }, [task]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment,
        author: "Cari İstifadəçi",
        timestamp: new Date().toISOString(),
      };
      setFormData(prev => ({
        ...prev,
        comments: [...prev.comments, comment]
      }));
      setNewComment("");
    }
  };

  const handleDeleteComment = (commentId) => {
    setFormData(prev => ({
      ...prev,
      comments: prev.comments.filter(comment => comment.id !== commentId)
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
    }));
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
  };

  const handleDeleteAttachment = (attachmentId) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(attachment => attachment.id !== attachmentId)
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("az-AZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.taskModal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <h3 className={styles.modalTitle}>
              {task ? "KPI-nı Redaktə Et" : "Yeni KPI"}
            </h3>
            <span className={styles.taskId}>#{task?.id || "Yeni"}</span>
          </div>
          <div className={styles.modalHeaderRight}>
            {task && (
              <button
                className={styles.deleteButton}
                onClick={() => setShowDeleteConfirm(true)}
                title="Tapşırığı sil"
              >
                Sil
              </button>
            )}
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className={styles.modalContent}>
          <div className={styles.modalTabs}>
            <div className={styles.tabContent}>
              {/* KPI Information Tab */}
              <div className={styles.formSection}>
                <h4 className={styles.sectionTitle}>KPI Məlumatları</h4>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>KPI Kodu *</label>
                    <input
                      type="text"
                      value={formData.kpiCode}
                      onChange={(e) => handleInputChange("kpiCode", e.target.value)}
                      className={styles.formInput}
                      placeholder="Məsələn: CE-01, MH-01"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>KPI Adı *</label>
                    <input
                      type="text"
                      value={formData.kpiName}
                      onChange={(e) => handleInputChange("kpiName", e.target.value)}
                      className={styles.formInput}
                      placeholder="KPI adını daxil edin"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Məqsəd *</label>
                    <input
                      type="text"
                      value={formData.purpose}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                      className={styles.formInput}
                      placeholder="KPI-nın məqsədini daxil edin"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Ölçü Metodu *</label>
                    <select
                      value={formData.measurementMethod}
                      onChange={(e) => handleInputChange("measurementMethod", e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="">Ölçü metodunu seçin</option>
                      <option value="Say">Say</option>
                      <option value="Məbləğ (AZN)">Məbləğ (AZN)</option>
                      <option value="Faiz">Faiz</option>
                      <option value="Gün / Saat">Gün / Saat</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Müddət *</label>
                    <select
                      value={formData.period}
                      onChange={(e) => handleInputChange("period", e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="">Müddəti seçin</option>
                      <option value="Aylıq">Aylıq</option>
                      <option value="Rüblük">Rüblük</option>
                      <option value="İllik">İllik</option>
                      <option value="Aylıq / Rüblük">Aylıq / Rüblük</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Çəki (%) *</label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      className={styles.formInput}
                      placeholder="Məsələn: 15"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>


                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Məsul Şöbə *</label>
                    <input
                      type="text"
                      value={formData.responsibleDepartment}
                      onChange={(e) => handleInputChange("responsibleDepartment", e.target.value)}
                      className={styles.formInput}
                      placeholder="Məsul şöbəni daxil edin"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Data Mənbə *</label>
                    <input
                      type="text"
                      value={formData.dataSource}
                      onChange={(e) => handleInputChange("dataSource", e.target.value)}
                      className={styles.formInput}
                      placeholder="Data mənbəyini daxil edin"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Şöbə *</label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="">Şöbəni seçin</option>
                      {departments.map((department) => (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>İcraçı *</label>
                    <select
                      value={formData.executor}
                      onChange={(e) => handleInputChange("executor", e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="">İcraçı seçin</option>
                      {executors.map((executor) => (
                        <option key={executor} value={executor}>
                          {executor}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Yaradılma Tarixi</label>
                    <input
                      type="date"
                      value={formData.createdDate}
                      onChange={(e) => handleInputChange("createdDate", e.target.value)}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Deadline *</label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleInputChange("deadline", e.target.value)}
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className={styles.formSelect}
                  >
                    <option value="Gözləyən">Gözləyən</option>
                    <option value="Davam Edən">Davam Edən</option>
                    <option value="Tamamlanmış">Tamamlanmış</option>
                  </select>
                </div>
              </div>

              {/* Comments Section */}
              <div className={styles.formSection}>
                <h4 className={styles.sectionTitle}>Şərhlər</h4>
                
                <div className={styles.commentsList}>
                  {formData.comments.map((comment) => (
                    <div key={comment.id} className={styles.commentItem}>
                      <div className={styles.commentHeader}>
                        <span className={styles.commentAuthor}>{comment.author}</span>
                        <span className={styles.commentDate}>{formatDate(comment.timestamp)}</span>
                        <button
                          className={styles.deleteCommentButton}
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          ×
                        </button>
                      </div>
                      <div className={styles.commentText}>{comment.text}</div>
                    </div>
                  ))}
                </div>

                <div className={styles.addCommentForm}>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className={styles.commentInput}
                    placeholder="Yeni şərh əlavə edin..."
                    rows="3"
                  />
                  <button
                    className={styles.addCommentButton}
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    Şərh əlavə et
                  </button>
                </div>
              </div>

              {/* Attachments Section */}
              <div className={styles.formSection}>
                <h4 className={styles.sectionTitle}>Fayllar</h4>
                
                <div className={styles.attachmentsList}>
                  {formData.attachments.map((attachment) => (
                    <div key={attachment.id} className={styles.attachmentItem}>
                      <div className={styles.attachmentInfo}>
                        <span className={styles.attachmentName}>{attachment.name}</span>
                        <span className={styles.attachmentSize}>{formatFileSize(attachment.size)}</span>
                        <span className={styles.attachmentDate}>{formatDate(attachment.uploadDate)}</span>
                      </div>
                      <button
                        className={styles.deleteAttachmentButton}
                        onClick={() => handleDeleteAttachment(attachment.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className={styles.fileUploadArea}>
                  <input
                    type="file"
                    id="fileUpload"
                    multiple
                    onChange={handleFileUpload}
                    className={styles.fileInput}
                  />
                  <label htmlFor="fileUpload" className={styles.fileUploadLabel}>
                    Fayl əlavə et
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={styles.modalFooter}>
          <div className={styles.modalFooterLeft}>
            <button className={styles.cancelButton} onClick={onClose}>
              Ləğv et
            </button>
          </div>
          <div className={styles.modalFooterRight}>
            <button className={styles.saveButton} onClick={handleSave}>
              Saxla
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className={styles.deleteConfirmModal}>
            <div className={styles.deleteConfirmContent}>
              <h4>Tapşırığı silmək istədiyinizə əminsiniz?</h4>
              <p>Bu əməliyyat geri alına bilməz.</p>
              <div className={styles.deleteConfirmActions}>
                <button
                  className={styles.confirmDeleteButton}
                  onClick={handleDelete}
                >
                  Bəli, sil
                </button>
                <button
                  className={styles.cancelDeleteButton}
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Ləğv et
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;

