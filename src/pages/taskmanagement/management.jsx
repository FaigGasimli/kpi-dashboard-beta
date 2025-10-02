"use client";

import { useState, useMemo } from "react";
import styles from "./task.module.css";
import Header from "../../components/header";
import KanbanColumn from "./components/KanbanColumn";
import KanbanFilters from "./components/KanbanFilters";
import TaskModal from "./components/TaskModal";

const TaskManagement = () => {
  const [activeTab, setActiveTab] = useState("KPİ Tapşırıqları");
  const [showModal, setShowModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [expandedDepartments, setExpandedDepartments] = useState({
    "Gecikmiş Tapşırıqlar": true,
    Komplayens: true,
    "Monitorinq və Hesabat": true,
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("deadline");
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState({
    "Gecikmiş Tapşırıqlar": [
      {
        id: 12,
        kpiCode: "CE-07",
        kpiName: "Risk qiymətləndirmə hesabatının hazırlanması",
        purpose: "Risklərin vaxtında qiymətləndirilməsi",
        measurementMethod: "Say",
        period: "Aylıq",
        calculationFormula:
          "Hazırlanmış hesabatların sayı ÷ Planlaşdırılan hesabatların sayı × 100",
        weight: "25",
        responsibleDepartment: "Risk İdarəetmə",
        dataSource: "Risk reyestri, hesabat sistemi",
        executor: "Nərgiz Əliyeva",
        creator: "Risk Rəhbəri",
        createdDate: "2024-12-15",
        deadline: "2024-12-31",
        status: "Gecikmiş",
        department: "Gecikmiş Tapşırıqlar",
        comments: [],
        attachments: [],
      },
      {
        id: 13,
        kpiCode: "MH-06",
        kpiName: "Təcrübəçieşən hesabatların təhlili",
        purpose: "Təcrübəçieşən əməliyyatların monitorinqi",
        measurementMethod: "Faiz",
        period: "Rüblük",
        calculationFormula:
          "Təhlil olunmuş əməliyyatlar ÷ Ümumi əməliyyatlar × 100",
        weight: "18",
        responsibleDepartment: "ƏL/TMM Şöbə",
        dataSource: "Təcrübəçieşən əməliyyatlar bazası",
        executor: "Məhəmməd Əliyev",
        creator: "ƏL / TMM Rəhbəri",
        createdDate: "2024-12-20",
        deadline: "2025-01-05",
        status: "Gecikmiş",
        department: "Gecikmiş Tapşırıqlar",
        comments: [],
        attachments: [],
      },
    ],
    Komplayens: [
      {
        id: 1,
        kpiCode: "CE-01",
        kpiName: "Komplayenslə cərimə sayında azalma",
        purpose: "Pozuntu hallarını azaltmaq",
        measurementMethod: "Say",
        period: "Rüblük",
        calculationFormula:
          "(Əvvəlki dövr cərimə sayı - Cari dövr cərimə sayı) ÷ Əvvəlki dövr cərimə sayı × 100",
        weight: "15",
        responsibleDepartment: "Komplayens Monitorinq şöbəsi",
        dataSource: "MB qərar məktubları, daxili protokollar",
        executor: "Ayaz Səfixova",
        creator: "Rəhbər Məmmədov",
        createdDate: "2025-01-05",
        deadline: "2025-01-15",
        status: "Tamamlanmış",
        department: "Komplayens",
        comments: [],
        attachments: [],
      },
      {
        id: 2,
        kpiCode: "CE-02",
        kpiName: "Komplayenslə cərimə məbləği üzrə azalma",
        purpose: "Maliyyə yükünü azaltmaq",
        measurementMethod: "Məbləğ (AZN)",
        period: "Rüblük",
        calculationFormula:
          "(Əvvəlki dövr cərimə məbləği - Cari dövr cərimə məbləği) ÷ Əvvəlki dövr cərimə məbləği × 100",
        weight: "20",
        responsibleDepartment: "Maliyyə və Komplayens",
        dataSource: "MB qərar məktubları, maliyyə uçotu",
        executor: "Leyla Həsənova",
        creator: "Rəhbər Məmmədov",
        createdDate: "2025-01-05",
        deadline: "2025-01-20",
        status: "Davam Edən",
        department: "Komplayens",
        comments: [],
        attachments: [],
      },
      {
        id: 3,
        kpiCode: "CE-03",
        kpiName: "Mərkəzi Bank tərəfindən tətbiq olunmuş cərimələrin sayı",
        purpose: "MB nəzarətində pozuntuların sayını minimuma endirmək",
        measurementMethod: "Say",
        period: "Rüblük",
        calculationFormula:
          "Cari dövrdə Mərkəzi Bank tərəfindən verilmiş cərimə qərarlarının sayı",
        weight: "15",
        responsibleDepartment: "Komplayens",
        dataSource: "MB qərarları",
        executor: "Məhəmməd Əliyev",
        creator: "HR Rəhbəri",
        createdDate: "2025-01-05",
        deadline: "2025-01-25",
        status: "Gözləyən",
        department: "Komplayens",
        comments: [],
        attachments: [],
      },
      {
        id: 4,
        kpiCode: "CE-04",
        kpiName: "Təkrar komplayens pozuntularının sayı",
        purpose: "Eyni səbəbdən təkrar pozuntuların qarşısını almaq",
        measurementMethod: "Say",
        period: "İllik",
        calculationFormula:
          "Təkrar hallar (%) = (Təkrar halların sayı ÷ Ümumi pozuntu sayı) × 100",
        weight: "15",
        responsibleDepartment: "Komplayens",
        dataSource: "Daxili Audit hesabatına əsasən protokolları",
        executor: "Nərgiz Əliyeva",
        creator: "ƏL / TMM Rəhbəri",
        createdDate: "2025-01-06",
        deadline: "2025-01-18",
        status: "Davam Edən",
        department: "Komplayens",
        comments: [],
        attachments: [],
      },
      {
        id: 5,
        kpiCode: "CE-05",
        kpiName:
          "Cəriməyə səbəb olan proseslər üzrə tədbir planının icra faizi",
        purpose: "Risklərin aradan qaldırılması",
        measurementMethod: "Faiz",
        period: "Rüblük",
        calculationFormula:
          "(İcra olunmuş tədbirlərin sayı ÷ Planlaşdırılan tədbirlərin sayı) × 100",
        weight: "20",
        responsibleDepartment: "Komplayens + Aidiyyəti Şöbə",
        dataSource: "Tədbirlər planı, daxili aktlar",
        executor: "Ayaz Səfixova",
        creator: "Rəhbər Məmmədov",
        createdDate: "2025-01-05",
        deadline: "2025-01-15",
        status: "Tamamlanmış",
        department: "Komplayens",
        comments: [],
        attachments: [],
      },
      {
        id: 6,
        kpiCode: "CE-06",
        kpiName: "Komplayens pozuntularının rəhbərliyə eskalasiya müddəti",
        purpose: "Eskalasiya prosesinin sürətini ölçmək",
        measurementMethod: "Gün / Saat",
        period: "Rüblük",
        calculationFormula:
          "SLA 24h (%) = 24 saat ərzində eskalasiya olunan hallar ÷ Ümumi hallar × 100",
        weight: "15",
        responsibleDepartment: "Komplayens",
        dataSource: "Tədbirlər planı, daxili aktlar",
        executor: "Leyla Həsənova",
        creator: "Rəhbər Məmmədov",
        createdDate: "2025-01-05",
        deadline: "2025-01-20",
        status: "Davam Edən",
        department: "Komplayens",
        comments: [],
        attachments: [],
      },
    ],
    "Monitorinq və Hesabat": [
      {
        id: 7,
        kpiCode: "MH-01",
        kpiName: "Planlı monitorinqlərin icra faizi",
        purpose:
          "Bütün nəzərdə tutulmuş monitorinqlərin keçirilməsini təmin etmək",
        measurementMethod: "Faiz",
        period: "Rüblük",
        calculationFormula:
          "İcra olunmuş monitorinq sayı ÷ Planlaşdırılmış monitorinq sayı × 100",
        weight: "20",
        responsibleDepartment: "Komplayens Monitorinq şöbəsi",
        dataSource: "Monitorinq planı, daxili aktlar",
        executor: "Məhəmməd Əliyev",
        creator: "HR Rəhbəri",
        createdDate: "2025-01-05",
        deadline: "2025-01-25",
        status: "Gözləyən",
        department: "Monitorinq və Hesabat",
        comments: [],
        attachments: [],
      },
      {
        id: 8,
        kpiCode: "MH-02",
        kpiName: "Şübhəli əməliyyatlara dair hesabatların hazırlanması",
        purpose: "AML/TMM tələblərinə uyğun STR-lərin vaxtında təqdimatı",
        measurementMethod: "Say",
        period: "Aylıq / Rüblük",
        calculationFormula: "Cari dövrdə hazırlanmış STR hesabatlarının sayı",
        weight: "25",
        responsibleDepartment: "ƏL/TMM Şöbə",
        dataSource: "STR bazası, daxili hesabat sistemi",
        executor: "Nərgiz Əliyeva",
        creator: "ƏL / TMM Rəhbəri",
        createdDate: "2025-01-06",
        deadline: "2025-01-18",
        status: "Davam Edən",
        department: "Monitorinq və Hesabat",
        comments: [],
        attachments: [],
      },
      {
        id: 9,
        kpiCode: "MH-03",
        kpiName: "Hesabatların vaxtında təqdimatı",
        purpose:
          "MB və daxili rəhbərliyə hesabatların vaxtında verilməsini təmin etmək",
        measurementMethod: "Faiz",
        period: "Rüblük",
        calculationFormula:
          "(Vaxtında təqdim olunmuş hesabatların sayı ÷ Ümumi hesabatların sayı) × 100",
        weight: "20",
        responsibleDepartment: "Komplayens",
        dataSource: "MB hesabat sistemi",
        executor: "Ayaz Səfixova",
        creator: "Rəhbər Məmmədov",
        createdDate: "2025-01-05",
        deadline: "2025-01-15",
        status: "Tamamlanmış",
        department: "Monitorinq və Hesabat",
        comments: [],
        attachments: [],
      },
      {
        id: 10,
        kpiCode: "MH-04",
        kpiName: "Proses pozuntularının təhlili",
        purpose:
          "Monitorinq nəticəsində aşkarlanan pozuntuların təhlil dərəcəsi",
        measurementMethod: "Faiz",
        period: "Rüblük",
        calculationFormula:
          "(Təhlil olunmuş pozuntu sayı ÷ Aşkarlanmış pozuntu sayı) × 100",
        weight: "15",
        responsibleDepartment: "Komplayens Monitorinq",
        dataSource: "Daxili protokollar",
        executor: "Leyla Həsənova",
        creator: "Rəhbər Məmmədov",
        createdDate: "2025-01-05",
        deadline: "2025-01-20",
        status: "Davam Edən",
        department: "Monitorinq və Hesabat",
        comments: [],
        attachments: [],
      },
      {
        id: 11,
        kpiCode: "MH-05",
        kpiName: "Təcili müdaxilə tələb edən hallar üzrə nəzarət",
        purpose: "Yüksək riskli hallarda dərhal reaksiya təmin etmək",
        measurementMethod: "Gün / Saat",
        period: "Aylıq",
        calculationFormula:
          "Pozuntu aşkarlandığı tarix - Rəhbərliyə çatdırılma tarixi = Orta müddət (gün/saat)",
        weight: "20",
        responsibleDepartment: "Komplayens + Risk İdarəetmə",
        dataSource: "Eskalasiya jurnalı, risk reyestri",
        executor: "Məhəmməd Əliyev",
        creator: "HR Rəhbəri",
        createdDate: "2025-01-05",
        deadline: "2025-01-25",
        status: "Gözləyən",
        department: "Monitorinq və Hesabat",
        comments: [],
        attachments: [],
      },
    ],
  });

  // Get all unique departments and executors for filters
  const departments = useMemo(() => {
    return Object.keys(tasks);
  }, [tasks]);

  const executors = useMemo(() => {
    const allExecutors = new Set();
    Object.values(tasks).forEach((departmentTasks) => {
      departmentTasks.forEach((task) => {
        allExecutors.add(task.executor);
      });
    });
    return Array.from(allExecutors);
  }, [tasks]);

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let allTasks = [];
    Object.entries(tasks).forEach(([department, departmentTasks]) => {
      departmentTasks.forEach((task) => {
        allTasks.push({ ...task, department });
      });
    });

    // Apply filters
    if (filters.department) {
      allTasks = allTasks.filter(
        (task) => task.department === filters.department
      );
    }
    if (filters.executor) {
      allTasks = allTasks.filter((task) => task.executor === filters.executor);
    }
    if (filters.priority) {
      const weight = parseInt(
        filters.priority === "high"
          ? "8"
          : filters.priority === "medium"
          ? "5"
          : "1"
      );
      allTasks = allTasks.filter((task) => {
        const taskWeight = parseInt(task.weightDegree);
        if (filters.priority === "high") return taskWeight >= 8;
        if (filters.priority === "medium")
          return taskWeight >= 5 && taskWeight < 8;
        return taskWeight < 5;
      });
    }
    if (filters.status) {
      allTasks = allTasks.filter((task) => task.status === filters.status);
    }
    if (filters.dateRange) {
      const today = new Date();
      allTasks = allTasks.filter((task) => {
        const deadline = new Date(task.deadline);
        switch (filters.dateRange) {
          case "today":
            return deadline.toDateString() === today.toDateString();
          case "week":
            const weekFromNow = new Date(
              today.getTime() + 7 * 24 * 60 * 60 * 1000
            );
            return deadline <= weekFromNow;
          case "month":
            const monthFromNow = new Date(
              today.getTime() + 30 * 24 * 60 * 60 * 1000
            );
            return deadline <= monthFromNow;
          case "overdue":
            return deadline < today && task.status !== "Tamamlanmış";
          case "upcoming":
            const upcoming = new Date(
              today.getTime() + 7 * 24 * 60 * 60 * 1000
            );
            return deadline <= upcoming && deadline >= today;
          default:
            return true;
        }
      });
    }
    if (searchTerm) {
      allTasks = allTasks.filter(
        (task) =>
          task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.executor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.workProcess.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.workProcedure.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    allTasks.sort((a, b) => {
      switch (sortBy) {
        case "deadline":
          return new Date(a.deadline) - new Date(b.deadline);
        case "priority":
          return parseInt(b.weightDegree) - parseInt(a.weightDegree);
        case "created":
          return new Date(b.createdDate) - new Date(a.createdDate);
        case "executor":
          return a.executor.localeCompare(b.executor);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return allTasks;
  }, [tasks, filters, sortBy, searchTerm]);

  // Get tasks by status for Kanban columns
  const getTasksByStatus = useMemo(() => {
    return (status) => {
      return filteredAndSortedTasks.filter((task) => task.status === status);
    };
  }, [filteredAndSortedTasks]);

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

  const handleTaskMove = (taskId, newStatus) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      Object.keys(updatedTasks).forEach((department) => {
        const taskIndex = updatedTasks[department].findIndex(
          (t) => t.id === taskId
        );
        if (taskIndex !== -1) {
          updatedTasks[department][taskIndex] = {
            ...updatedTasks[department][taskIndex],
            status: newStatus,
          };
        }
      });
      return updatedTasks;
    });
  };

  const handleTaskEdit = (taskId, updatedData) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      Object.keys(updatedTasks).forEach((department) => {
        const taskIndex = updatedTasks[department].findIndex(
          (t) => t.id === taskId
        );
        if (taskIndex !== -1) {
          updatedTasks[department][taskIndex] = {
            ...updatedTasks[department][taskIndex],
            ...updatedData,
          };
        }
      });
      return updatedTasks;
    });
  };

  const handleTaskDelete = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      Object.keys(updatedTasks).forEach((department) => {
        updatedTasks[department] = updatedTasks[department].filter(
          (t) => t.id !== taskId
        );
      });
      return updatedTasks;
    });
  };

  const handleAddTask = (newTask) => {
    const taskId =
      Math.max(
        ...Object.values(tasks)
          .flat()
          .map((t) => t.id)
      ) + 1;
    const taskWithId = { ...newTask, id: taskId };

    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      if (!updatedTasks[newTask.department]) {
        updatedTasks[newTask.department] = [];
      }
      updatedTasks[newTask.department].push(taskWithId);
      return updatedTasks;
    });
  };

  const handleTaskModalSave = (taskData) => {
    if (selectedTask) {
      handleTaskEdit(selectedTask.id, taskData);
    } else {
      handleAddTask(taskData);
    }
    setSelectedTask(null);
  };

  const handleTaskModalDelete = (taskId) => {
    handleTaskDelete(taskId);
    setSelectedTask(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
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
      case "Gecikmiş":
        return styles.statusGecikmiş;
      default:
        return "";
    }
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
      <Header title="KPI İdarəetmə Paneli" />
      <div className={styles.container}>
        {/* Navigation Tabs */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${
              activeTab === "KPİ Tapşırıqları" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("KPİ Tapşırıqları")}
          >
            KPİ Tapşırıqları
          </button>

          <button
            className={`${styles.tab} ${
              activeTab === "Kanban" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("Kanban")}
          >
            Tapşırıqlar lövhəsi
          </button>
        </div>

        {/* <div className={styles.mainSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>6</div>
              <div className={styles.statLabel}>Tamamlanmış tapşırıqlar</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>3</div>
              <div className={styles.statLabel}>Gözləmədə olan tapşırıqlar</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>2</div>
              <div className={styles.statLabel}>Davam edən tapşırıqlar</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>2</div>
              <div className={styles.statLabel}>Gecikmiş tapşırıqlar</div>
            </div>
          </div>


          <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>Tapşırıqların icrası</h3>
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
        </div> */}

        {activeTab === "Kanban" && (
          <div className={styles.kanbanContainer}>
            {/* Kanban Filters */}
            <KanbanFilters
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              onSearchChange={handleSearchChange}
              departments={departments}
              executors={executors}
            />

            {/* Kanban Board */}
            <div className={styles.kanbanActions}>
              <button
                className={styles.addNewTaskButton}
                onClick={() => {
                  setSelectedTask(null);
                  setShowTaskModal(true);
                }}
              >
                Yeni Tapşırıq Əlavə Et
              </button>
            </div>
            <div className={styles.kanbanBoard}>
              {["Gözləyən", "Davam Edən", "Tamamlanmış"].map((status) => (
                <KanbanColumn
                  key={status}
                  status={status}
                  tasks={getTasksByStatus(status)}
                  onTaskEdit={handleTaskEdit}
                  onTaskDelete={handleTaskDelete}
                  onTaskMove={handleTaskMove}
                  onAddTask={handleAddTask}
                  onTaskStatusChange={handleTaskMove}
                />
              ))}
            </div>

            {/* Add New Task Button */}
          </div>
        )}


        {activeTab === "KPİ Tapşırıqları" && (
          <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
              <h3 className={styles.sectionTitle}>KPİ Tapşırıqlarının İcrası</h3>
              <div className={styles.tableActions}>
                <div className={styles.searchContainer}>
                  <input
                    type="text"
                    placeholder="KPI-ları axtar"
                    className={styles.searchInput}
                  />
                </div>

                <button className={styles.filterButton}>Filter</button>
                <select className={styles.selectButton}>
                  <option>Bütün</option>
                </select>
                <button 
                  className={styles.addButton}
                  onClick={() => {
                    setSelectedTask(null);
                    setShowTaskModal(true);
                  }}
                >
                  Yeni tapşırıq
                </button>
              </div>
            </div>

            {/* Department Groups */}
            {Object.entries(tasks).map(([deptName, departmentTasks]) => (
              <div
                key={deptName}
                className={`${styles.departmentGroup} ${
                  deptName === "Gecikmiş Tapşırıqlar" ? styles.overdue : ""
                }`}
              >
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
                      <div className={styles.tableHeaderCell}>KPI Kodu</div>
                      <div className={styles.tableHeaderCell}>KPI Adı</div>
                      <div className={styles.tableHeaderCell}>Məqsəd</div>
                      <div className={styles.tableHeaderCell}>Ölçü Metodu</div>
                      <div className={styles.tableHeaderCell}>Müddət</div>
                      <div className={styles.tableHeaderCell}>Çəki (%)</div>
                      <div className={styles.tableHeaderCell}>Məsul Şöbə</div>
                      <div className={styles.tableHeaderCell}>Data Mənbə</div>
                      <div className={styles.tableHeaderCell}>Status</div>
                    </div>

                    {departmentTasks.map((task) => (
                      <div
                        key={task.id}
                        className={styles.tableRow}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task, deptName)}
                      >
                        <div className={styles.tableCell} data-label="KPI Kodu">
                          {task.kpiCode}
                        </div>
                        <div className={styles.tableCell} data-label="KPI Adı">
                          {task.kpiName}
                        </div>
                        <div className={styles.tableCell} data-label="Məqsəd">
                          {task.purpose}
                        </div>
                        <div
                          className={styles.tableCell}
                          data-label="Ölçü Metodu"
                        >
                          {task.measurementMethod}
                        </div>
                        <div className={styles.tableCell} data-label="Müddət">
                          {task.period}
                        </div>
                        <div className={styles.tableCell} data-label="Çəki (%)">
                          <span
                            className={`${styles.weightBadge} ${
                              styles[`weight${task.weight}`]
                            }`}
                          >
                            {task.weight}%
                          </span>
                        </div>
                        <div
                          className={styles.tableCell}
                          data-label="Məsul Şöbə"
                        >
                          {task.responsibleDepartment}
                        </div>
                        <div
                          className={styles.tableCell}
                          data-label="Data Mənbə"
                        >
                          {task.dataSource}
                        </div>
                        <div className={styles.tableCell} data-label="Status">
                          <span
                            className={`${styles.statusBadge} ${getStatusClass(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </span>
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

        {/* Task Modal */}
        <TaskModal
          task={selectedTask}
          isOpen={showTaskModal}
          onClose={() => {
            setShowTaskModal(false);
            setSelectedTask(null);
          }}
          onSave={handleTaskModalSave}
          onDelete={handleTaskModalDelete}
          departments={departments}
          executors={executors}
        />
      </div>
    </>
  );
};

export default TaskManagement;
