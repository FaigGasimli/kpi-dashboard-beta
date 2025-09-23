import { useState } from "react";
import TaskCard from "./TaskCard";
import styles from "../task.module.css";

const KanbanColumn = ({
  status,
  tasks,
  onTaskEdit,
  onTaskDelete,
  onTaskMove,
  onAddTask,
  onTaskStatusChange,
}) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    workProcess: "",
    workProcedure: "",
    weightDegree: "5",
    executor: "",
    creator: "Cari İstifadəçi",
    createdDate: new Date().toISOString().split("T")[0],
    deadline: "",
    status: status,
    responsible: ["👤"],
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskData = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (taskData.status !== status) {
      onTaskMove(taskData.id, status);
    }
  };

  const handleAddTask = () => {
    if (newTask.name && newTask.executor && newTask.deadline) {
      onAddTask(newTask);
      setNewTask({
        name: "",
        workProcess: "",
        workProcedure: "",
        weightDegree: "5",
        executor: "",
        creator: "Cari İstifadəçi",
        createdDate: new Date().toISOString().split("T")[0],
        deadline: "",
        status: status,
        responsible: ["👤"],
      });
      setIsAddingTask(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Gözləyən":
        return "#e6e6e6c4";
      case "Davam Edən":
        return "#e6e6e6c4";
      case "Tamamlanmış":
        return "#e6e6e6c4";
      default:
        return "#f8f9fa";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Gözləyən":
        return "Gözləyən";
      case "Davam Edən":
        return "Davam Edən";
      case "Tamamlanmış":
        return "Tamamlanmış";
      default:
        return "Yeni";
    }
  };

  const getColumnStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "Tamamlanmış").length;
    const overdueTasks = tasks.filter((task) => {
      const today = new Date();
      const deadline = new Date(task.deadline);
      return deadline < today && task.status !== "Tamamlanmış";
    }).length;
    
    return { totalTasks, completedTasks, overdueTasks };
  };

  const stats = getColumnStats();

  return (
    <div
      className={styles.kanbanColumn}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{ backgroundColor: getStatusColor(status) }}
    >
      {/* Column Header */}
      <div className={styles.kanbanColumnHeader}>
        <div className={styles.columnHeaderLeft}>
          <h4 className={styles.kanbanColumnTitle}>{getStatusText(status)}</h4>
          <span className={styles.kanbanColumnCount}>{tasks.length}</span>
        </div>
        <div className={styles.columnHeaderRight}>
          <button
            className={styles.addTaskButton}
            onClick={() => setIsAddingTask(!isAddingTask)}
            title="Yeni tapşırıq əlavə et"
          >
            Alt tapşırıq
          </button>
        </div>
      </div>

      {/* Column Stats */}
      <div className={styles.columnStats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{stats.completedTasks}</span>
          <span className={styles.statLabel}>Tamamlanmış</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{stats.overdueTasks}</span>
          <span className={styles.statLabel}>Gecikmiş</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>
            {stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%
          </span>
          <span className={styles.statLabel}>Tamamlanma</span>
        </div>
      </div>

      {/* Add Task Form */}
      {isAddingTask && (
        <div className={styles.addTaskForm}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Tapşırıq adı"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="İcraçı"
              value={newTask.executor}
              onChange={(e) => setNewTask({ ...newTask, executor: e.target.value })}
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <select
              value={newTask.weightDegree}
              onChange={(e) => setNewTask({ ...newTask, weightDegree: e.target.value })}
              className={styles.formSelect}
            >
              <option value="1">1 - Çox aşağı</option>
              <option value="2">2 - Aşağı</option>
              <option value="3">3 - Orta-aşağı</option>
              <option value="4">4 - Orta</option>
              <option value="5">5 - Orta-yuxarı</option>
              <option value="6">6 - Yuxarı</option>
              <option value="7">7 - Çox yuxarı</option>
              <option value="8">8 - Kritik</option>
              <option value="9">9 - Çox kritik</option>
              <option value="10">10 - Məcburi</option>
            </select>
          </div>
          <div className={styles.formActions}>
            <button className={styles.saveTaskButton} onClick={handleAddTask}>
              Əlavə et
            </button>
            <button
              className={styles.cancelTaskButton}
              onClick={() => setIsAddingTask(false)}
            >
              Ləğv et
            </button>
          </div>
        </div>
      )}

      {/* Tasks */}
      <div className={styles.kanbanColumnContent}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onTaskEdit}
            onDelete={onTaskDelete}
            onStatusChange={onTaskStatusChange}
          />
        ))}
        
        {/* Empty State */}
        {tasks.length === 0 && !isAddingTask && (
          <div className={styles.emptyColumn}>
            <p className={styles.emptyText}>Bu sütunda tapşırıq yoxdur</p>
            <button
              className={styles.emptyAddButton}
              onClick={() => setIsAddingTask(true)}
            >
              İlk tapşırığı əlavə et
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
