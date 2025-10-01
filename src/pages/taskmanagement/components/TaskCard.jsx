import { useState } from "react";
import styles from "../task.module.css";

const TaskCard = ({ task, onEdit, onDelete, onStatusChange, onAddComment }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: task.name,
    workProcess: task.workProcess,
    workProcedure: task.workProcedure,
    weightDegree: task.weightDegree,
    executor: task.executor,
    deadline: task.deadline,
    attachments: task.attachments || [],
    tags: task.tags || [],
    taggedUsers: task.taggedUsers || [],
  });
  const [newTag, setNewTag] = useState("");
  const [newTaggedUser, setNewTaggedUser] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(task.id, editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: task.name,
      workProcess: task.workProcess,
      workProcedure: task.workProcedure,
      weightDegree: task.weightDegree,
      executor: task.executor,
      deadline: task.deadline,
      attachments: task.attachments || [],
      tags: task.tags || [],
      taggedUsers: task.taggedUsers || [],
    });
    setIsEditing(false);
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
    setEditForm(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
  };

  const handleDeleteAttachment = (attachmentId) => {
    setEditForm(prev => ({
      ...prev,
      attachments: prev.attachments.filter(attachment => attachment.id !== attachmentId)
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      const tag = {
        id: Date.now(),
        name: newTag.trim(),
        color: getRandomColor(),
      };
      setEditForm(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setNewTag("");
    }
  };

  const handleDeleteTag = (tagId) => {
    setEditForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag.id !== tagId)
    }));
  };

  const handleAddTaggedUser = () => {
    if (newTaggedUser.trim()) {
      const taggedUser = {
        id: Date.now(),
        name: newTaggedUser.trim(),
        avatar: getInitials(newTaggedUser.trim()),
      };
      setEditForm(prev => ({
        ...prev,
        taggedUsers: [...prev.taggedUsers, taggedUser]
      }));
      setNewTaggedUser("");
    }
  };

  const handleDeleteTaggedUser = (userId) => {
    setEditForm(prev => ({
      ...prev,
      taggedUsers: prev.taggedUsers.filter(user => user.id !== userId)
    }));
  };

  const getRandomColor = () => {
    const colors = ['#e3f2fd', '#f3e5f5', '#e8f5e8', '#fff3e0', '#fce4ec', '#f1f8e9'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getPriorityColor = (weight) => {
    const weightNum = parseInt(weight);
    if (weightNum >= 8) return "#996f29"; // High priority - main color
    if (weightNum >= 5) return "#996f29"; // Medium priority - main color
    return "#996f29"; // Low priority - main color
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Tamamlanmış":
        return "Tamamlandı";
      case "Davam Edən":
        return "Davam edir";
      case "Gözləyən":
        return "Gözləyir";
      default:
        return "Yeni";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("az-AZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isOverdue = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate < today && task.status !== "Tamamlanmış";
  };

  return (
    <div
      className={`${styles.kanbanCard} ${isOverdue(task.deadline) ? styles.overdue : ""}`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(task));
        e.dataTransfer.effectAllowed = "move";
      }}
    >
      {/* Card Header */}
      <div className={styles.kanbanCardHeader}>
        <div className={styles.cardHeaderLeft}>
          <span className={styles.kanbanCardNumber}>#{task.id}</span>
          <span className={styles.statusText}>{getStatusText(task.status)}</span>
        </div>
        <div className={styles.cardHeaderRight}>
          <span
            className={styles.kanbanCardWeight}
            style={{ backgroundColor: getPriorityColor(task.weightDegree) }}
          >
            {task.weightDegree}
          </span>
          <div className={styles.cardActions}>
            <button
              className={styles.cardActionButton}
              onClick={() => setShowDetails(!showDetails)}
              title="Detalları göstər"
            >
              {showDetails ? "Gizlə" : "Göstər"}
            </button>
            <button
              className={styles.cardActionButton}
              onClick={handleEdit}
              title="Redaktə et"
            >
              Redaktə
            </button>
            <button
              className={styles.cardActionButton}
              onClick={() => onDelete(task.id)}
              title="Sil"
            >
              Sil
            </button>
          </div>
        </div>
      </div>

      {/* Card Title */}
      {isEditing ? (
        <input
          type="text"
          value={editForm.name}
          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          className={styles.editInput}
          autoFocus
        />
      ) : (
        <h5 className={styles.kanbanCardTitle}>{task.name}</h5>
      )}

      {/* Card Details */}
      {showDetails && (
        <div className={styles.kanbanCardDetails}>
          {isEditing ? (
            <div className={styles.editForm}>
              <div className={styles.editRow}>
                <label>İş Prosesi:</label>
                <textarea
                  value={editForm.workProcess}
                  onChange={(e) =>
                    setEditForm({ ...editForm, workProcess: e.target.value })
                  }
                  className={styles.editTextarea}
                  rows="2"
                />
              </div>
              <div className={styles.editRow}>
                <label>İş Proseduru:</label>
                <textarea
                  value={editForm.workProcedure}
                  onChange={(e) =>
                    setEditForm({ ...editForm, workProcedure: e.target.value })
                  }
                  className={styles.editTextarea}
                  rows="2"
                />
              </div>
              <div className={styles.editRow}>
                <label>Ağırlıq Dərəcəsi:</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={editForm.weightDegree}
                  onChange={(e) =>
                    setEditForm({ ...editForm, weightDegree: e.target.value })
                  }
                  className={styles.editInput}
                />
              </div>
              <div className={styles.editRow}>
                <label>İcraçı:</label>
                <input
                  type="text"
                  value={editForm.executor}
                  onChange={(e) =>
                    setEditForm({ ...editForm, executor: e.target.value })
                  }
                  className={styles.editInput}
                />
              </div>
              <div className={styles.editRow}>
                <label>Deadline:</label>
                <input
                  type="date"
                  value={editForm.deadline}
                  onChange={(e) =>
                    setEditForm({ ...editForm, deadline: e.target.value })
                  }
                  className={styles.editInput}
                />
              </div>
              {/* File Upload Section */}
              <div className={styles.editRow}>
                <label>Fayllar:</label>
                <div className={styles.attachmentsList}>
                  {editForm.attachments.map((attachment) => (
                    <div key={attachment.id} className={styles.attachmentItem}>
                      <div className={styles.attachmentInfo}>
                        <span className={styles.attachmentName}>{attachment.name}</span>
                        <span className={styles.attachmentSize}>{formatFileSize(attachment.size)}</span>
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
                    id={`fileUpload-${task.id}`}
                    multiple
                    onChange={handleFileUpload}
                    className={styles.fileInput}
                  />
                  <label htmlFor={`fileUpload-${task.id}`} className={styles.fileUploadLabel}>
                    Fayl əlavə et
                  </label>
                </div>
              </div>

              {/* Tags Section */}
              <div className={styles.editRow}>
                <label>Etiketlər:</label>
                <div className={styles.tagsList}>
                  {editForm.tags.map((tag) => (
                    <div key={tag.id} className={styles.tagItem} style={{ backgroundColor: tag.color }}>
                      <span className={styles.tagName}>{tag.name}</span>
                      <button
                        className={styles.deleteTagButton}
                        onClick={() => handleDeleteTag(tag.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className={styles.addTagForm}>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className={styles.tagInput}
                    placeholder="Etiket adını daxil edin..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <button
                    className={styles.addTagButton}
                    onClick={handleAddTag}
                    disabled={!newTag.trim()}
                  >
                    Etiket əlavə et
                  </button>
                </div>
              </div>

              {/* Tagged Users Section */}
              <div className={styles.editRow}>
                <label>Tag Edilmiş İstifadəçilər:</label>
                <div className={styles.taggedUsersList}>
                  {editForm.taggedUsers.map((user) => (
                    <div key={user.id} className={styles.taggedUserItem}>
                      <div className={styles.userAvatar}>{user.avatar}</div>
                      <span className={styles.userName}>{user.name}</span>
                      <button
                        className={styles.deleteTaggedUserButton}
                        onClick={() => handleDeleteTaggedUser(user.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className={styles.addTaggedUserForm}>
                  <input
                    type="text"
                    value={newTaggedUser}
                    onChange={(e) => setNewTaggedUser(e.target.value)}
                    className={styles.taggedUserInput}
                    placeholder="İstifadəçi adını daxil edin..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTaggedUser()}
                  />
                  <button
                    className={styles.addTaggedUserButton}
                    onClick={handleAddTaggedUser}
                    disabled={!newTaggedUser.trim()}
                  >
                    İstifadəçi tag et
                  </button>
                </div>
              </div>

              <div className={styles.editActions}>
                <button className={styles.saveEditButton} onClick={handleSave}>
                  Saxla
                </button>
                <button className={styles.cancelEditButton} onClick={handleCancel}>
                  Ləğv et
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.kanbanCardProcess}>
                <strong>Proses:</strong> {task.workProcess}
              </div>
              <div className={styles.kanbanCardProcedure}>
                <strong>Prosedur:</strong> {task.workProcedure}
              </div>
              <div className={styles.taskMetadata}>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataLabel}>Yaradılma:</span>
                  <span className={styles.metadataValue}>
                    {formatDate(task.createdDate)}
                  </span>
                </div>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataLabel}>Yaradan:</span>
                  <span className={styles.metadataValue}>{task.creator}</span>
                </div>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataLabel}>Departament:</span>
                  <span className={styles.metadataValue}>{task.department}</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Card Footer */}
      <div className={styles.kanbanCardFooter}>
        <div className={styles.kanbanCardUsers}>
          <div className={styles.kanbanCardUser}>
            <strong>İcraçı:</strong> {task.executor}
          </div>
          <div className={styles.kanbanCardUser}>
            <strong>Yaradan:</strong> {task.creator}
          </div>
        </div>
        <div className={styles.cardFooterBottom}>
          <span
            className={`${styles.kanbanCardDate} ${
              isOverdue(task.deadline) ? styles.overdueDate : ""
            }`}
          >
            {formatDate(task.deadline)}
            {isOverdue(task.deadline) && " (Gecikmiş)"}
          </span>
          <div className={styles.responsibleAvatars}>
            {task.responsible?.map((person, index) => (
              <div key={index} className={styles.kanbanAvatar}>
                {person}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${
              task.status === "Tamamlanmış"
                ? 100
                : task.status === "Davam Edən"
                ? 50
                : 0
            }%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default TaskCard;
