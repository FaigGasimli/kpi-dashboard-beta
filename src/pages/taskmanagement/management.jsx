"use client";

import { useState } from "react";
import styles from "./task.module.css";
import Header from "../../components/header";

const TaskManagement = () => {
  const [activeTab, setActiveTab] = useState("Tapşırıqlar");
  const [showModal, setShowModal] = useState(false);
  const [expandedDepartments, setExpandedDepartments] = useState({
    "Kompliyens Monitoring": true,
    "BL / TMM": true,
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [tasks, setTasks] = useState({
    "Kompliyens Monitoring": [
      {
        id: 1,
        name: "Komplayens Risk qiymətləndirlməsinə nəzarət",
        workProcess:
          "Aidiyyəti struktur bölmədən ilkin məlumatların toplanması→ rəhbərlə razılaşdırılma → Monitorinq → Hesabat",
        workProcedure:
          "ƏLTMM üzrə daxili nəzarət proqramının və Komplayens funksiyasının effektivliyinin qiymətləndirməsi dair son_",
        weightDegree: "10",
        executor: "Ayaz Səfixova",
        creator: "Rəhbər Məmmədov",
        createdDate: "05 İyul 2025",
        deadline: "05 İyul 2025",
        status: "Tamamlanmış",
        responsible: ["👤", "👤", "👤"],
      },
      {
        id: 2,
        name: "Yeni məhsul və  proseslərin monitorinqi",
        workProcess:
          "Aidiyyəti struktur bölmədən müraciətin daxil olması→ rəhbərlə razılaşdırılma →Rəyin verilməsi",
        workProcedure: "Yeni məhsullara Komplayens Rəyinin verilməsi",
        weightDegree: "3",
        executor: "Leyla Həsənova",
        creator: "Rəhbər Məmmədov",
        createdDate: "05 İyul 2025",
        deadline: "05 İyul 2025",
        status: "Davam Edən",
        responsible: ["👤", "👤"],
      },
      {
        id: 3,
        name: "Maraq münaqişəsi üzrə rəy verilməsi",
        workProcess:
          "Aidiyyəti struktur bölmədən müraciətin daxil olması→ rəhbərlə razılaşdırılma →Rəyin verilməsi",
        workProcedure:
          "Maraqlar münaqişəsi tənzimlənməsi proseduru və Siyasəti",
        weightDegree: "7",
        executor: "Məhəmməd Əliyev",
        creator: "HR Rəhbəri",
        createdDate: "05 İyul 2025",
        deadline: "05 İyul 2025",
        status: "Gözləyən",
        responsible: ["👤"],
      },
    ],
  });

  const handleDragStart = (e, task, department) => {
    setDraggedTask({ task, department });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (!draggedTask) return;

    const { task, department } = draggedTask;

    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      const departmentTasks = [...updatedTasks[department]];
      const taskIndex = departmentTasks.findIndex((t) => t.id === task.id);

      if (taskIndex !== -1) {
        departmentTasks[taskIndex] = { ...task, status: newStatus };
        updatedTasks[department] = departmentTasks;
      }

      return updatedTasks;
    });

    setDraggedTask(null);
  };

  const toggleDepartment = (dept) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [dept]: !prev[dept],
    }));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Tamamlanmış":
        return styles.statusCompleted;
      case "Davam Edən":
        return styles.statusInProgress;
      case "Gözləyən":
        return styles.statusWaiting;
      default:
        return "";
    }
  };

  const getTasksByStatus = (status) => {
    const allTasks = [];
    Object.entries(tasks).forEach(([department, departmentTasks]) => {
      departmentTasks.forEach((task) => {
        if (task.status === status) {
          allTasks.push({ ...task, department });
        }
      });
    });
    return allTasks;
  };

  const CircularProgress = ({ percentage }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className={styles.circularProgressContainer}>
        <svg className={styles.circularProgress} width="120" height="120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#996F29"
            strokeWidth="8"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className={styles.progressText}>
          <span className={styles.progressPercentage}>{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header title="Tapşırıqlar paneli" />
      <div className={styles.container}>
        {/* Navigation Tabs */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${
              activeTab === "Tapşırıqlar" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("Tapşırıqlar")}
          >
            Tapşırıqlar
          </button>

          <button
            className={`${styles.tab} ${
              activeTab === "Kanban" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("Kanban")}
          >
            Kanban Board
          </button>
        </div>

        <div className={styles.mainSection}>
          {/* Task Statistics Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>300</div>
              <div className={styles.statLabel}>Tamamlanmış tapşırıqlar</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>400</div>
              <div className={styles.statLabel}>Gözləmədə olan tapşırıqlar</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>320</div>
              <div className={styles.statLabel}>Tamamlanmamış tapşırıqlar</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>12</div>
              <div className={styles.statLabel}>Gecikmiş tapşırıqlar</div>
            </div>
          </div>

          {/* Task Execution Chart */}
          <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>Taskların icrası</h3>
            <div className={styles.chartContent}>
              <CircularProgress percentage={75} />
              <div className={styles.chartLegend}>
                {[
                  { label: "Tamamlanmış", color: "#996F29" },
                  { label: "Davam Edən", color: "#D4B896" },
                  { label: "Gözləyən", color: "#F5E6D3" },
                ].map((item, index) => (
                  <div key={index} className={styles.legendItem}>
                    <div
                      className={styles.legendColor}
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className={styles.legendLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {activeTab === "Kanban" && (
          <div className={styles.kanbanContainer}>
            <div className={styles.kanbanBoard}>
              {["Gözləyən", "Davam Edən", "Tamamlanmış"].map((status) => (
                <div
                  key={status}
                  className={styles.kanbanColumn}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, status)}
                >
                  <div className={styles.kanbanColumnHeader}>
                    <h4 className={styles.kanbanColumnTitle}>{status}</h4>
                    <span className={styles.kanbanColumnCount}>
                      {getTasksByStatus(status).length}
                    </span>
                  </div>
                  <div className={styles.kanbanColumnContent}>
                    {getTasksByStatus(status).map((task) => (
                      <div
                        key={task.id}
                        className={styles.kanbanCard}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, task, task.department)
                        }
                      >
                        <div className={styles.kanbanCardHeader}>
                          <span className={styles.kanbanCardDepartment}>
                            {task.department}
                          </span>
                          <span className={styles.kanbanCardWeight}>
                            {task.weightDegree}
                          </span>
                        </div>
                        <h5 className={styles.kanbanCardTitle}>{task.name}</h5>
                        <div className={styles.kanbanCardDetails}>
                          <div className={styles.kanbanCardProcess}>
                            <strong>Proses:</strong> {task.workProcess}
                          </div>
                          <div className={styles.kanbanCardProcedure}>
                            <strong>Prosedur:</strong> {task.workProcedure}
                          </div>
                        </div>
                        <div className={styles.kanbanCardFooter}>
                          <div className={styles.kanbanCardUsers}>
                            <div className={styles.kanbanCardUser}>
                              <strong>İcraçı:</strong> {task.executor}
                            </div>
                            <div className={styles.kanbanCardUser}>
                              <strong>Yaradan:</strong> {task.creator}
                            </div>
                          </div>
                          <span className={styles.kanbanCardDate}>
                            {task.deadline}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Tapşırıqlar" && (
          <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
              <h3 className={styles.sectionTitle}>Tapşırıqların icrası</h3>
              <div className={styles.tableActions}>
                <div className={styles.searchContainer}>
                  <input
                    type="text"
                    placeholder="Axtar"
                    className={styles.searchInput}
                  />
                </div>
                <button
                  className={styles.addButton}
                  onClick={() => setShowModal(true)}
                >
                  Yenisini əlavə et
                </button>
                <button className={styles.filterButton}>
                  Təmiz göra filtr
                </button>
                <select className={styles.selectButton}>
                  <option>Bütün</option>
                </select>
              </div>
            </div>

            {/* Department Groups */}
            {Object.entries(tasks).map(([deptName, departmentTasks]) => (
              <div key={deptName} className={styles.departmentGroup}>
                <div
                  className={styles.departmentHeader}
                  onClick={() => toggleDepartment(deptName)}
                >
                  <span
                    className={`${styles.expandIcon} ${
                      expandedDepartments[deptName] ? styles.expanded : ""
                    }`}
                  >
                    ▼
                  </span>
                  <span className={styles.departmentName}>{deptName}</span>
                </div>

                {expandedDepartments[deptName] && (
                  <div className={styles.taskTable}>
                    <div className={styles.tableHeaderRow}>
                      <div className={styles.tableHeaderCell}>Tapşırıq adı</div>
                      <div className={styles.tableHeaderCell}>İş Prosessi</div>
                      <div className={styles.tableHeaderCell}>İş Proseduru</div>
                      <div className={styles.tableHeaderCell}>
                        Ağırlıq Dərəcəsi
                      </div>
                      <div className={styles.tableHeaderCell}>İcra edən</div>
                      <div className={styles.tableHeaderCell}>Yaradan</div>
                      <div className={styles.tableHeaderCell}>
                        Yaranma tarixi
                      </div>
                      <div className={styles.tableHeaderCell}>
                        Deadline tarixi
                      </div>
                      <div className={styles.tableHeaderCell}>Status</div>
                      <div className={styles.tableHeaderCell}></div>
                    </div>

                    {departmentTasks.map((task) => (
                      <div
                        key={task.id}
                        className={styles.tableRow}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task, deptName)}
                      >
                        <div className={styles.tableCell}>{task.name}</div>
                        <div className={styles.tableCell}>
                          {task.workProcess}
                        </div>
                        <div className={styles.tableCell}>
                          {task.workProcedure}
                        </div>
                        <div className={styles.tableCell}>
                          <span
                            className={`${styles.weightBadge} ${
                              styles[`weight${task.weightDegree}`]
                            }`}
                          >
                            {task.weightDegree}
                          </span>
                        </div>
                        <div className={styles.tableCell}>{task.executor}</div>
                        <div className={styles.tableCell}>{task.creator}</div>
                        <div className={styles.tableCell}>
                          {task.createdDate}
                        </div>
                        <div className={styles.tableCell}>{task.deadline}</div>
                        <div className={styles.tableCell}>
                          <span
                            className={`${styles.statusBadge} ${getStatusClass(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </span>
                        </div>
                        <div className={styles.tableCell}>
                          <button className={styles.moreButton}>⋯</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div
            className={styles.modalOverlay}
            onClick={() => setShowModal(false)}
          >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Yeni Tapşırıq</h3>
                <button
                  className={styles.closeButton}
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>

              <div className={styles.modalContent}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Başlıq / Adı:</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="Tapşırıq adını daxil edin"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Kateqoriya:</label>
                    <select className={styles.formSelect}>
                      <option>Audit</option>
                      <option>AML/KYC</option>
                      <option>Risk</option>
                      <option>HR</option>
                      <option>Daxili nəzarət</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Təsviri:</label>
                  <textarea
                    className={styles.formTextarea}
                    rows="3"
                    placeholder="Tapşırığın detallı izahı"
                  ></textarea>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Prioritet:</label>
                    <select className={styles.formSelect}>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Periodiklik:</label>
                    <select className={styles.formSelect}>
                      <option>Cari</option>
                      <option>Aylıq</option>
                      <option>Rüblük</option>
                      <option>İllik</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Başlama tarixi:</label>
                    <input type="date" className={styles.formInput} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Deadline tarixi:</label>
                    <input type="date" className={styles.formInput} />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Filial:</label>
                    <select className={styles.formSelect}>
                      <option>Filial seç</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Departament:</label>
                    <select className={styles.formSelect}>
                      <option>Departament seç</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Şöbə / Bölmə:</label>
                    <select className={styles.formSelect}>
                      <option>Şöbə seç</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Verən şəxs:</label>
                    <select className={styles.formSelect}>
                      <option>Rəhbər seç</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Məsul əməkdaş (icraçı):
                  </label>
                  <div className={styles.assigneeContainer}>
                    <span className={styles.assigneeTag}>
                      Ayaz Səfixova
                      <button className={styles.removeTag}>×</button>
                    </span>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <div className={styles.attachmentActions}>
                    <button className={styles.attachButton}>
                      📎 File əlavə et
                    </button>
                    <button className={styles.attachButton}>
                      🔗 KPI əlaqələndir
                    </button>
                  </div>
                  <button className={styles.saveButton}>Yadda saxla</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskManagement;
