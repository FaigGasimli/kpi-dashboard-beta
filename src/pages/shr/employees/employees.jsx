"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./employees.css";
import Photo from "../../../assests/qız.jpg";
import Header from "../../../components/header";
import PerformanceCalculator from "./PerformanceCalculator";

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bonus");
  const [performanceFilter, setPerformanceFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("Yanvar");

  const handleSaveCalculation = (calculationData) => {
    setSavedCalculations((prev) => [...prev, calculationData]);
  };

  const employee = {
    name: "Vəfa Vahabova Namiq qızı",
    age: 29,
    photo: "../",
    department: "Komplayens departamenti",
    position: "KMS şöbəsi",
    branch: "Şöbə rəisi",
    hireDate: "21.02.2012",
    salary: "4000 AZN",
    workExperience: "11 il 8 ay",
    contractEndDate: "21.02.2025",
    directManager: "Rəşad Məmmədov",
    workSchedule: "09:00-18:00",
    attendanceRate: 96.5,
    medicalInsurance: "Aktiv",
  };

  const tasks = [
    {
      id: 1,
      name: "Yeni işçilərin adaptasiya proqramı",
      executors: ["Jalə Hüseynova", "Rəşad Məmmədov"],
      responsiblePerson: "Jalə Hüseynova",
      responsiblePosition: "KMS şöbəsi rəisi",
      creator: "Nigar Əliyeva",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      category: "Adaptasiya",
      workProcess: "İnsan resursları idarəetməsi",
      workProcedure: "HR-001 Adaptasiya proseduru",
      weightLevel: "Yüksək",
      importance: "Kritik",
      deadline: "15.12.2024",
      creationDate: "01.11.2024",
      completionDate: null,
      currentProcess: "İcra mərhələsi",
      priority: "Yüksək",
      status: "Davam edir",
      progress: 75,
      description:
        "Q4 üçün yeni işçilərin adaptasiya materiallarının hazırlanması",
    },
    {
      id: 2,
      name: "Performans qiymətləndirmə sistemi yeniləməsi",
      executors: ["Jalə Hüseynova", "Təranə Qasımova"],
      responsiblePerson: "Jalə Hüseynova",
      responsiblePosition: "KMS şöbəsi rəisi",
      creator: "Rəşad Məmmədov",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      category: "Sistem təkmilləşdirmə",
      workProcess: "Performans idarəetməsi",
      workProcedure: "HR-002 Performans qiymətləndirmə",
      weightLevel: "Orta",
      importance: "Vacib",
      deadline: "30.12.2024",
      creationDate: "15.11.2024",
      completionDate: null,
      currentProcess: "Planlaşdırma mərhələsi",
      priority: "Orta",
      status: "Planlaşdırılır",
      progress: 25,
      description: "Mövcud performans sisteminin təkmilləşdirilməsi",
    },
    {
      id: 3,
      name: "Əmək müqaviləsi şablonlarının yenilənməsi",
      executors: ["Jalə Hüseynova"],
      responsiblePerson: "Jalə Hüseynova",
      responsiblePosition: "KMS şöbəsi rəisi",
      creator: "Hüquq şöbəsi",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      category: "Sənəd hazırlığı",
      workProcess: "Hüquqi sənədləşmə",
      workProcedure: "LEG-001 Müqavilə hazırlığı",
      weightLevel: "Aşağı",
      importance: "Normal",
      deadline: "01.12.2024",
      creationDate: "20.10.2024",
      completionDate: "28.11.2024",
      currentProcess: "Tamamlanmış",
      priority: "Aşağı",
      status: "Tamamlandı",
      progress: 100,
      description: "Yeni qanunvericiliyə uyğun müqavilə şablonları",
    },
  ];

  const performanceData = [
    {
      kpiModule: "KYC və müştəri eyniləşdirmə",
      metric: "Yeni müştərilərin düzgün eyniləşdirilməsi",
      component: "Tələb olunan sənədlərin təmiqi",
      currentResult: 98,
      target: 100,
      kpiPercentage: 98,
      startDate: "01.01.2024",
      endDate: "31.12.2024",
      executionPeriod: "12 ay",
      category: "compliance",
    },
    {
      kpiModule: "KYC və müştəri eyniləşdirmə",
      metric: "Yeni müştərilərin düzgün eyniləşdirilməsi",
      component: "Tələb olunan sənədlərin təmiqi",
      currentResult: 95,
      target: 100,
      kpiPercentage: 95,
      startDate: "01.01.2024",
      endDate: "31.03.2024",
      executionPeriod: "3 ay",
      category: "compliance",
    },
    {
      kpiModule: "ƏL/TMM siyasət və prosedurlar",
      metric: "Yeni müştərilərin düzgün eyniləşdirilməsi",
      component: "Tələb olunan sənədlərin təmiqi",
      currentResult: null,
      target: null,
      kpiPercentage: null,
      startDate: "01.04.2024",
      endDate: "30.06.2024",
      executionPeriod: "3 ay",
      category: "procedures",
    },
    {
      kpiModule: "KYC və müştəri eyniləşdirmə",
      metric: "Yeni müştərilərin düzgün eyniləşdirilməsi",
      component: "Tələb olunan sənədlərin təmiqi",
      currentResult: 89,
      target: 100,
      kpiPercentage: 89,
      startDate: "01.07.2024",
      endDate: "30.09.2024",
      executionPeriod: "3 ay",
      category: "compliance",
    },
    {
      kpiModule: "Uyğunsuzluqların aradan qaldırılması",
      metric: "Yeni müştərilərin düzgün eyniləşdirilməsi",
      component: "Tələb olunan sənədlərin təmiqi",
      currentResult: null,
      target: null,
      kpiPercentage: null,
      startDate: "01.10.2024",
      endDate: "31.12.2024",
      executionPeriod: "3 ay",
      category: "compliance",
    },
    {
      kpiModule: "KYC və müştəri eyniləşdirmə",
      metric: "Yeni müştərilərin düzgün eyniləşdirilməsi",
      component: "Tələb olunan sənədlərin təmiqi",
      currentResult: 100,
      target: 100,
      kpiPercentage: 100,
      startDate: "01.01.2024",
      endDate: "31.12.2024",
      executionPeriod: "12 ay",
      category: "compliance",
    },
    {
      kpiModule: "Uyğunsuzluqların aradan qaldırılması",
      metric: "Yeni müştərilərin düzgün eyniləşdirilməsi",
      component: "Tələb olunan sənədlərin təmiqi",
      currentResult: 88,
      target: 100,
      kpiPercentage: 88,
      startDate: "01.01.2024",
      endDate: "30.06.2024",
      executionPeriod: "6 ay",
      category: "compliance",
    },
    {
      kpiModule: "KYC və müştəri eyniləşdirmə",
      metric: "Yeni müştərilərin düzgün eyniləşdirilməsi",
      component: "Tələb olunan sənədlərin təmiqi",
      currentResult: null,
      target: null,
      kpiPercentage: null,
      startDate: "01.07.2024",
      endDate: "31.12.2024",
      executionPeriod: "6 ay",
      category: "compliance",
    },
    {
      kpiModule: "Texniki bacərıq və sistem istifadəsi",
      metric: "Yeni müştərilərin düzgün eyniləşdirilməsi",
      component: "Tələb olunan sənədlərin təmiqi",
      currentResult: 98,
      target: 100,
      kpiPercentage: 98,
      startDate: "01.01.2024",
      endDate: "31.03.2024",
      executionPeriod: "3 ay",
      category: "technical",
    },
    {
      kpiModule: "Uyğunsuzluqların aradan qaldırılması",
      metric: "Yeni müştərilərin düzgün eyniləşdirilməsi",
      component: "Tələb olunan sənədlərin təmiqi",
      currentResult: 96,
      target: 100,
      kpiPercentage: 96,
      startDate: "01.04.2024",
      endDate: "30.06.2024",
      executionPeriod: "3 ay",
      category: "compliance",
    },
    {
      kpiModule: "Uyğunsuzluqların aradan qaldırılması",
      metric: "Yeni müştərilərin düzgün eyniləşdirilməsi",
      component: "Tələb olunan sənədlərin təmiqi",
      currentResult: 100,
      target: 100,
      kpiPercentage: 100,
      startDate: "01.07.2024",
      endDate: "30.09.2024",
      executionPeriod: "3 ay",
      category: "compliance",
    },
  ];

  const vacationData = [
    {
      date: "15.08.2024",
      reason: "Ailə məzuniyyəti",
      daysUsed: 14,
      status: "Tamamlandı",
    },
    {
      date: "20.12.2024",
      reason: "Yeni il məzuniyyəti",
      daysUsed: 7,
      status: "Planlaşdırılır",
    },
    {
      date: "10.06.2024",
      reason: "Şəxsi məzuniyyət",
      daysUsed: 5,
      status: "Tamamlandı",
    },
  ];

  const bonusData = [
    {
      type: "Aylıq performans bonusu",
      amount: "500 AZN",
      date: "15.12.2024",
      paymentDate: "20.12.2024",
      status: "Ödənildi",
      reason: "KPI hədəflərinin 120% yerinə yetirilməsi",
      kpiResult: "120%",
    },
    {
      type: "Rüblük bonus",
      amount: "1000 AZN",
      date: "01.10.2024",
      paymentDate: "05.10.2024",
      status: "Ödənildi",
      reason: "Q3 dövrü üçün əla nəticələr",
      kpiResult: "115%",
    },
    {
      type: "İllik bonus",
      amount: "2000 AZN",
      date: "01.01.2024",
      paymentDate: "10.01.2024",
      status: "Ödənildi",
      reason: "2023-cü il üçün üstün performans",
      kpiResult: "110%",
    },
  ];

  const violationData = [
    {
      type: "İş saatlarında iş yerində olmamaq",
      date: "20.09.2024",
      status: "Həll olunub",
      description: "İş saatında iş yerində olmamaq",
      appliedMeasure: "Rəsmi xəbərdarlıq",
    },
    {
      type: "İşə gecikmə",
      date: "15.08.2024",
      status: "Araşdırılır",
      description: "İşə 30 dəqiqə gecikmə",
      appliedMeasure: "Şifahi xəbərdarlıq",
    },
    {
      type: "İcazə limitinin aşılması",
      date: "10.07.2024",
      status: "Həll olunub",
      description: "İcazə limitinin aşılması",
      appliedMeasure: "Cərimə (50 AZN)",
    },
    {
      type: "Dress-kod qaydalarının pozulması",
      date: "05.06.2024",
      status: "Həll olunub",
      description: "Dress-kod qaydalarının pozulması",
      appliedMeasure: "Şifahi xəbərdarlıq",
    },
    {
      type: "Daxili ünsiyyət qaydalarının pozulması",
      date: "01.05.2024",
      status: "Həll olunub",
      description: "Daxili ünsiyyət qaydalarının pozulması",
      appliedMeasure: "Rəsmi xəbərdarlıq",
    },
    {
      type: "Etik davranış qaydalarının pozulması",
      date: "15.04.2024",
      status: "Araşdırılır",
      description: "Etik davranış qaydalarının pozulması",
      appliedMeasure: "Araşdırılır",
    },
    {
      type: "Məlumatların məxfiliyinin pozulması",
      date: "10.03.2024",
      status: "Həll olunub",
      description: "Məlumatların məxfiliyinin pozulması",
      appliedMeasure: "Cərimə (100 AZN)",
    },
    {
      type: "Şirkətin imicinə zərər verən davranış",
      date: "25.02.2024",
      status: "Həll olunub",
      description: "Şirkətin imicinə zərər verən davranış",
      appliedMeasure: "Rəsmi xəbərdarlıq",
    },
    {
      type: "Subordinasiyaya əməl etməmək",
      date: "20.01.2024",
      status: "Həll olunub",
      description: "Subordinasiyaya əməl etməmək",
      appliedMeasure: "Şifahi xəbərdarlıq",
    },
    {
      type: "Təhlükəsizlik qaydalarının pozulması",
      date: "15.12.2023",
      status: "Həll olunub",
      description: "Təhlükəsizlik qaydalarının pozulması",
      appliedMeasure: "Cərimə (75 AZN)",
    },
    {
      type: "Peşəkar etikaya zidd hallar",
      date: "10.11.2023",
      status: "Həll olunub",
      description: "Peşəkar etikaya zidd hallar",
      appliedMeasure: "Rəsmi xəbərdarlıq",
    },
    {
      type: "Müştəri ilə ünsiyyət qaydalarının pozulması",
      date: "05.10.2023",
      status: "Həll olunub",
      description: "Müştəri ilə ünsiyyət qaydalarının pozulması",
      appliedMeasure: "Şifahi xəbərdarlıq",
    },
    {
      type: "Daxili yazışma qaydalarını pozmaq",
      date: "01.09.2023",
      status: "Həll olunub",
      description: "Daxili yazışma qaydalarını pozmaq",
      appliedMeasure: "Rəsmi xəbərdarlıq",
    },
    {
      type: "İş yerində şəxsi cihazlardan həddən artıq istifadə",
      date: "15.08.2023",
      status: "Həll olunub",
      description: "İş yerində şəxsi cihazlardan həddən artıq istifadə",
      appliedMeasure: "Şifahi xəbərdarlıq",
    },
    {
      type: "Siqaret və ya elektron siqaretin icazəsiz yerlərdə istifadəsi",
      date: "10.07.2023",
      status: "Həll olunub",
      description:
        "Siqaret və ya elektron siqaretin icazəsiz yerlərdə istifadəsi",
      appliedMeasure: "Cərimə (25 AZN)",
    },
    {
      type: "Alkoqollu içkilərin təsiri altında işə gəlmək",
      date: "05.06.2023",
      status: "Həll olunub",
      description: "Alkoqollu içkilərin təsiri altında işə gəlmək",
      appliedMeasure: "Cərimə (200 AZN)",
    },
    {
      type: "Bank əmlakına zərər vurmaq (avadanlıq, inventar və s.)",
      date: "01.05.2023",
      status: "Həll olunub",
      description: "Bank əmlakına zərər vurmaq (avadanlıq, inventar və s.)",
      appliedMeasure: "Cərimə (150 AZN)",
    },
    {
      type: "Müştəri və ya həmkarlarla mübahisə (emosional, aqressiv davranış)",
      date: "15.04.2023",
      status: "Həll olunub",
      description:
        "Müştəri və ya həmkarlarla mübahisə (emosional, aqressiv davranış)",
      appliedMeasure: "Rəsmi xəbərdarlıq",
    },
  ];

  // Helpers: classify applied action into measure vs penalty
  const classifyDiscipline = (appliedMeasure) => {
    if (!appliedMeasure) {
      return { measure: "-", penaltyType: "-", penaltyDetail: "-" };
    }
    const text = appliedMeasure.toLowerCase();
    if (text.includes("cərimə")) {
      return {
        measure: "-",
        penaltyType: "Maddi",
        penaltyDetail: appliedMeasure,
      };
    }
    if (text.includes("protokol")) {
      return {
        measure: "-",
        penaltyType: "Protokol",
        penaltyDetail: appliedMeasure,
      };
    }
    // otherwise treat as organizational measure (xəbərdarlıq və s.)
    return { measure: appliedMeasure, penaltyType: "-", penaltyDetail: "-" };
  };

  const disciplineCounts = (() => {
    let measures = 0;
    let penalties = 0;
    violationData.forEach((v) => {
      const c = classifyDiscipline(v.appliedMeasure);
      if (c.penaltyType !== "-") penalties += 1;
      if (c.measure !== "-") measures += 1;
    });
    return { measures, penalties };
  })();

  // Frequency of each penalty kind/detail to show per-row counts
  const penaltyCounts = (() => {
    const map = {};
    violationData.forEach((v) => {
      const c = classifyDiscipline(v.appliedMeasure);
      if (c.penaltyType !== "-") {
        const keyRaw =
          c.penaltyDetail && c.penaltyDetail !== "-"
            ? c.penaltyDetail
            : c.penaltyType;
        const key = String(keyRaw).toLowerCase();
        map[key] = (map[key] || 0) + 1;
      }
    });
    return map;
  })();

  // Frequency of each applied measure to show per-row counts
  const measureCounts = (() => {
    const map = {};
    violationData.forEach((v) => {
      const c = classifyDiscipline(v.appliedMeasure);
      if (c.measure !== "-") {
        const key = String(c.measure).toLowerCase();
        map[key] = (map[key] || 0) + 1;
      }
    });
    return map;
  })();

  const trainingData = [
    {
      name: "Komplayens və Risk İdarəetməsi",
      provider: "Daxili Təlim Mərkəzi",
      date: "15.10.2024",
      status: "Tamamlandı",
      certificate: "Var",
      score: 95,
    },
    {
      name: "Liderlik və Komanda İdarəetməsi",
      provider: "Xarici Təlim Təşkilatı",
      date: "20.11.2024",
      status: "Davam edir",
      certificate: "Gözlənilir",
      score: null,
    },
    {
      name: "Rəqəmsal Transformasiya",
      provider: "Online Platforma",
      date: "01.12.2024",
      status: "Planlaşdırılır",
      certificate: "Planlaşdırılır",
      score: null,
    },
  ];

  const getProgressBarColor = (percentage) => {
    if (percentage >= 90) return "#4b5563";
    if (percentage >= 70) return "#3b82f6";
    if (percentage >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Yüksək":
        return "#ef4444";
      case "Orta":
        return "#f59e0b";
      case "Aşağı":
        return "#4b5563";
      default:
        return "#6b7280";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Tamamlandı":
        return "#4b5563";
      case "Davam edir":
        return "#3b82f6";
      case "Planlaşdırılır":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const renderBonus = () => (
    <div className="tab-content">
      <div className="bonus-header">
        <h2>Bonus Siyahısı</h2>
        <div className="bonus-controls">
          <div className="search-input">
            <input type="text" placeholder="Axtar..." />
          </div>
          <button className="control-btn">Yeni bonus əlavə et</button>
          <button className="control-btn">Tarixə görə filter</button>
          <button className="control-btn active">Bütün</button>
        </div>
      </div>
      {renderBonusTable()}
    </div>
  );

  const renderTasks = () => (
    <div className="tab-content">
      <div className="tasks-header">
        <h2>Tapşırıqların icrası</h2>
        <div className="tasks-controls">
          <div className="search-input">
            <input type="text" placeholder="Axtar" />
          </div>
          <button className="control-btn">Yenilənə əlavə et</button>
          <button className="control-btn">Tarixə görə filter</button>
          <button className="control-btn active">Bütün</button>
        </div>
      </div>

      <div className="tasks-sections">
        {/* Overdue Tasks */}
        <div className="task-section waiting">
          <div className="section-header">
            <h3>Gecikmiş</h3>
          </div>
          {tasks
            .filter((task) => task.status === "Planlaşdırılır")
            .map((task) => (
              <div key={task.id} className="task-card">
                <div className="task-card-header">
                  <div className="task-info">
                    <div className="task-title">{task.name}</div>
                    <div className="task-details-row">
                      <span className="task-detail">Task sayı: {task.id}</span>
                      <span className="task-detail">
                        Yaranma tarixi: {task.creationDate}
                      </span>
                      <span className="task-detail">
                        Deadline tarixi: {task.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="task-actions">
                    <span className="status-badge waiting">Gecikmiş</span>
                    <div className="responsible-avatars">
                      {task.executors.slice(0, 3).map((executor, index) => (
                        <div key={index} className="avatar" title={executor}>
                          {executor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Ongoing Tasks */}
        <div className="task-section ongoing">
          <div className="section-header">
            <h3>Davam edən</h3>
          </div>
          {tasks
            .filter((task) => task.status === "Davam edir")
            .map((task) => (
              <div key={task.id} className="task-card">
                <div className="task-card-header">
                  <div className="task-info">
                    <div className="task-title">{task.name}</div>
                    <div className="task-details-row">
                      <span className="task-detail">Task sayı: {task.id}</span>
                      <span className="task-detail">
                        Yaranma tarixi: {task.creationDate}
                      </span>
                      <span className="task-detail">
                        Deadline tarixi: {task.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="task-actions">
                    <span className="status-badge ongoing">Davam edir</span>
                    <div className="responsible-avatars">
                      {task.executors.slice(0, 3).map((executor, index) => (
                        <div key={index} className="avatar" title={executor}>
                          {executor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Completed Tasks */}
        <div className="task-section completed">
          <div className="section-header">
            <h3>Tamamlanmış</h3>
          </div>
          {tasks
            .filter((task) => task.status === "Tamamlandı")
            .map((task) => (
              <div key={task.id} className="task-card">
                <div className="task-card-header">
                  <div className="task-info">
                    <div className="task-title">{task.name}</div>
                    <div className="task-details-row">
                      <span className="task-detail">Task sayı: {task.id}</span>
                      <span className="task-detail">
                        Yaranma tarixi: {task.creationDate}
                      </span>
                      <span className="task-detail">
                        Deadline tarixi: {task.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="task-actions">
                    <span className="status-badge completed">Tamamlandı</span>
                    <div className="responsible-avatars">
                      {task.executors.slice(0, 3).map((executor, index) => (
                        <div key={index} className="avatar" title={executor}>
                          {executor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const getFilteredPerformanceData = () => {
    return performanceData.filter((item) => {
      const matchesSearch =
        item.kpiModule.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.metric.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.component.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        performanceFilter === "all" || item.category === performanceFilter;

      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "monthly" &&
          item.executionPeriod.includes("ay") &&
          !item.executionPeriod.includes("12")) ||
        (dateFilter === "quarterly" && item.executionPeriod === "3 ay") ||
        (dateFilter === "yearly" && item.executionPeriod === "12 ay");

      return matchesSearch && matchesCategory && matchesDate;
    });
  };

  const renderPerformance = () => (
    <div className="tab-content">
      <div className="performance-header">
        <div className="performance-title-section">
          <h2>Bonus Kalkulyatoru - KPI əsaslı Mükafat</h2>
          <button
            className="calculator-btn"
            onClick={() => setIsCalculatorOpen(true)}
          >
            Mükafatlandırma Kalkulyatoru
          </button>
        </div>
        <p className="performance-description">
          Aylıq KPI nəticələrinə və baza faizinə görə mükafat məbləğini
          hesablayın.
        </p>
      </div>

      {/* Filter Section */}
      <div className="performance-filters">
        <div className="filter-row">
          <div className="filter-group">
            <label>İl</label>
            <select className="filter-select">
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Ay</label>
            <select className="filter-select">
              <option value="all">Bütün aylar</option>
              <option value="1">Yanvar</option>
              <option value="2">Fevral</option>
              <option value="3">Mart</option>
              <option value="4">Aprel</option>
              <option value="5">May</option>
              <option value="6">İyun</option>
              <option value="7">İyul</option>
              <option value="8">Avqust</option>
              <option value="9">Sentyabr</option>
              <option value="10">Oktyabr</option>
              <option value="11">Noyabr</option>
              <option value="12">Dekabr</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Rüb</label>
            <select className="filter-select">
              <option value="all">Bütün rüblər</option>
              <option value="1">I Rüb (Yan-Fev-Mar)</option>
              <option value="2">II Rüb (Apr-May-İyun)</option>
              <option value="3">III Rüb (İyul-Avq-Sen)</option>
              <option value="4">IV Rüb (Okt-Noy-Dek)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bonus-calculator-container">
        <table className="bonus-calculator-table">
          <thead>
            <tr>
              <th>Ay</th>
              <th>Super Gross (AZN)</th>
              <th>Baza %</th>
              <th>Baza (AZN)</th>
              <th>Faktiki KPI, %</th>
              <th>Band</th>
              <th>Koef.</th>
              <th>Mükafat faizi</th>
              <th>Mükafat (AZN)</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                month: "Yan",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Fev",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Mar",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Apr",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "May",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "İyun",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "İyul",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Avq",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Sen",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Okt",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Noy",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Dek",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
            ].map((row, index) => {
              const baseAmount = (row.superGross * row.basePercent) / 100;
              const band = "A";
              const coefficient = 1;
              const bonusPercent = "15%";
              const bonusAmount = (baseAmount * 15) / 100;

              return (
                <tr key={index}>
                  <td className="month-cell">{row.month}</td>
                  <td className="data-cell">{row.superGross}</td>
                  <td className="data-cell">{row.basePercent}</td>
                  <td className="calculated-cell">
                    {baseAmount.toLocaleString("az-AZ", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    ₼
                  </td>
                  <td className="data-cell">{row.actualKPI}</td>
                  <td className="calculated-cell">{band}</td>
                  <td className="calculated-cell">{coefficient}</td>
                  <td className="calculated-cell">{bonusPercent}</td>
                  <td className="calculated-cell">
                    {bonusAmount.toLocaleString("az-AZ", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    ₼
                  </td>
                </tr>
              );
            })}
            <tr className="summary-row">
              <td className="summary-label">Orta KPI</td>
              <td colSpan="7"></td>
              <td className="summary-value">100.0%</td>
            </tr>
            <tr className="summary-row">
              <td className="summary-label">İllik cəm mükafat</td>
              <td colSpan="7"></td>
              <td className="summary-value">2.160,00 ₼</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBonusTable = () => (
    <div className="bonus-table-container">
      <table className="bonus-table">
        <thead>
          <tr>
            <th>Bonus növü</th>
            <th>Məbləğ</th>
            <th>Tarix</th>
            <th>Ödəniş tarixi</th>
            <th>Status</th>
            <th>Səbəb</th>
            <th>KPI nəticəsi</th>
          </tr>
        </thead>
        <tbody>
          {bonusData.map((bonus, index) => (
            <tr key={index}>
              <td className="bonus-type">{bonus.type}</td>
              <td className="bonus-amount">{bonus.amount}</td>
              <td>{bonus.date}</td>
              <td>{bonus.paymentDate}</td>
              <td>
                <span
                  className={`status-badge ${bonus.status
                    .toLowerCase()
                    .replace(/\s+/g, "")}`}
                >
                  {bonus.status}
                </span>
              </td>
              <td className="bonus-reason">{bonus.reason}</td>
              <td className="kpi-result">{bonus.kpiResult}</td>
            </tr>
          ))}
          {savedCalculations.map((calc, index) => (
            <tr key={`calc-${index}`} className="saved-calculation-row">
              <td className="bonus-type">Kalkulyator hesablaması</td>
              <td className="bonus-amount">
                {calc.monthlyReward.toFixed(2)} AZN
              </td>
              <td>{calc.date}</td>
              <td>-</td>
              <td>
                <span className="status-badge pending">Gözləyir</span>
              </td>
              <td className="bonus-reason">
                KPI: {calc.kpi}%, Band: {calc.band}, Koef: {calc.coefficient}
              </td>
              <td className="kpi-result">{calc.kpi}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderViolationsTable = () => (
    <div className="violations-table-container">
      <table className="violations-table">
        <thead>
          <tr>
            <th>Növü</th>
            <th>Tarix</th>
            <th>Status</th>
            <th>Təsviri</th>
            <th>Tətbiq edilən tədbir</th>
            <th>Cəza (növü)</th>
          </tr>
        </thead>
        <tbody>
          {violationData.map((violation, index) => (
            <tr key={index}>
              <td className="violation-type">{violation.type}</td>
              <td>{violation.date}</td>
              <td>
                <span
                  className={`status-badge ${violation.status
                    .toLowerCase()
                    .replace(/\s+/g, "")}`}
                >
                  {violation.status}
                </span>
              </td>
              <td className="violation-description">{violation.description}</td>
              <td className="applied-measure">
                {(() => {
                  const c = classifyDiscipline(violation.appliedMeasure);
                  if (c.measure === "-") return "-";
                  const count =
                    measureCounts[String(c.measure).toLowerCase()] || 0;
                  return `${c.measure} (x${count})`;
                })()}
              </td>
              <td className="applied-measure">
                {(() => {
                  const c = classifyDiscipline(violation.appliedMeasure);
                  if (c.penaltyType === "-") return "-";
                  const keyRaw =
                    c.penaltyDetail && c.penaltyDetail !== "-"
                      ? c.penaltyDetail
                      : c.penaltyType;
                  const count =
                    penaltyCounts[String(keyRaw).toLowerCase()] || 0;
                  return `${c.penaltyType}${c.penaltyDetail && c.penaltyDetail !== "-" ? ` — ${c.penaltyDetail}` : ""} (x${count})`;
                })()}
              </td>
            </tr>
          ))}
          <tr className="summary-row">
            <td colSpan="4" className="summary-label">
              Cəmi
            </td>
            <td className="summary-value">{disciplineCounts.measures}</td>
            <td className="summary-value">{disciplineCounts.penalties}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderDiscipline = () => (
    <div className="tab-content">
      <div className="discipline-header">
        <h2>İntizam Pozuntuları</h2>
        <div className="discipline-controls">
          <div className="search-input">
            <input type="text" placeholder="Axtar..." />
          </div>
          <button className="control-btn">Yeni pozuntu əlavə et</button>
          <button className="control-btn">Tarixə görə filter</button>
          <button className="control-btn active">Bütün</button>
        </div>
      </div>
      <div
        className="discipline-summary"
        style={{ display: "flex", gap: 12, marginBottom: 12 }}
      >
        <div
          className="summary-chip"
          style={{
            background: "#f8fafc",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: "8px 12px",
          }}
        >
          Tətbiq edilən tədbir sayı:{" "}
          <strong>{disciplineCounts.measures}</strong>
        </div>
        <div
          className="summary-chip"
          style={{
            background: "#f8fafc",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: "8px 12px",
          }}
        >
          Cəza sayı: <strong>{disciplineCounts.penalties}</strong>
        </div>
      </div>
      {renderViolationsTable()}
    </div>
  );

  const renderTraining = () => (
    <div className="tab-content">
      <div className="training-summary-new">
        <div className="summary-card-new success">
          <div className="summary-content">
            <h4>Tamamlanmış</h4>
            <span className="summary-number">1</span>
          </div>
        </div>
        <div className="summary-card-new info">
          <div className="summary-content">
            <h4>Davam edən</h4>
            <span className="summary-number">1</span>
          </div>
        </div>
        <div className="summary-card-new warning">
          <div className="summary-content">
            <h4>Planlaşdırılan</h4>
            <span className="summary-number">1</span>
          </div>
        </div>
      </div>

      <div className="training-list-new">
        {trainingData.map((training, index) => (
          <div key={index} className="training-item-new">
            <div className="training-item-header">
              <div className="training-title-section">
                <h4>{training.name}</h4>
                <span
                  className={`status-badge-new ${training.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {training.status}
                </span>
              </div>
            </div>
            <div className="training-details-grid">
              <div className="training-detail-item">
                <label>Təlim təşkilatçısı</label>
                <span>{training.provider}</span>
              </div>
              <div className="training-detail-item">
                <label>Tarix</label>
                <span>{training.date}</span>
              </div>
              <div className="training-detail-item">
                <label>Sertifikat</label>
                <span>{training.certificate}</span>
              </div>
              {training.score && (
                <div className="training-detail-item">
                  <label>Nəticə</label>
                  <span>{training.score}/100</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // If no ID is provided, show a message or redirect
  if (!id) {
    return (
      <div className="employee-profile">
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>İşçi seçilməyib</h2>
          <p>Əməkdaşlar siyahısından bir işçi seçin.</p>
          <button
            onClick={() => navigate("/shr")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Əməkdaşlar siyahısına qayıt
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="employee-profile">
        {/* Header Section */}
        <div className="profile-header">
          <div className="back-button-container">
            <button onClick={() => navigate("/shr")} className="back-button">
              ← Əməkdaşlar siyahısına qayıt
            </button>
          </div>
          <div className="employee-info">
            <div className="employee-photo">
              <img src={Photo} alt={employee.name} />
            </div>
            <div className="employee-details">
              <h1>{employee.name}</h1>
              <p className="employee-age">{employee.age} yaş</p>
            </div>
          </div>

          <div className="work-info">
            <div className="info-grid">
              <div className="info-item">
                <label>Departament:</label>
                <span>{employee.department}</span>
              </div>
              <div className="info-item">
                <label>Vəzifə:</label>
                <span>{employee.branch}</span>
              </div>
              <div className="info-item">
                <label>Əmək haqqı:</label>
                <span>{employee.salary}</span>
              </div>
              <div className="info-item">
                <label>Şöbə:</label>
                <span>{employee.position}</span>
              </div>
              <div className="info-item">
                <label>İşə qəbul tarixi:</label>
                <span>{employee.hireDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vacation Summary */}
        <div className="vacation-summary">
          <h3>Məzuniyyət günləri</h3>
          <div className="vacation-stats">
            <div className="vacation-stat">
              <span className="stat-label">Ümumi istifadə olunan günlər:</span>
              <span className="stat-value">
                {vacationData.reduce(
                  (sum, vacation) => sum + vacation.daysUsed,
                  0,
                )}{" "}
                gün
              </span>
            </div>
            <div className="vacation-stat">
              <span className="stat-label">Qalan günlər:</span>
              <span className="stat-value">14 gün</span>
            </div>
          </div>
          <div className="vacation-list">
            {vacationData.map((vacation, index) => (
              <div key={index} className="vacation-item">
                <div className="vacation-date">{vacation.date}</div>
                <div className="vacation-reason">{vacation.reason}</div>
                <div className="vacation-days">{vacation.daysUsed} gün</div>
                <div
                  className={`vacation-status ${vacation.status
                    .toLowerCase()
                    .replace(/\s+/g, "")}`}
                >
                  {vacation.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="tabs-container">
          <div className="tabs-nav">
            {/* <button
              className={
                activeTab === "bonus" ? "tab-button active" : "tab-button"
              }
              onClick={() => setActiveTab("bonus")}
            >
              Bonus Siyahısı
            </button> */}
            <button
              className={
                activeTab === "tasks" ? "tab-button active" : "tab-button"
              }
              onClick={() => setActiveTab("tasks")}
            >
              Tapşırıqlar
            </button>

            <button
              className={
                activeTab === "discipline" ? "tab-button active" : "tab-button"
              }
              onClick={() => setActiveTab("discipline")}
            >
              Nizam İntizam
            </button>
            <button
              className={
                activeTab === "training" ? "tab-button active" : "tab-button"
              }
              onClick={() => setActiveTab("training")}
            >
              Təlim və İnkişaf
            </button>
            <button
              className={
                activeTab === "performance" ? "tab-button active" : "tab-button"
              }
              onClick={() => setActiveTab("performance")}
            >
              Performans Sistemi
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === "bonus" && renderBonus()}
            {activeTab === "tasks" && renderTasks()}
            {activeTab === "performance" && renderPerformance()}
            {activeTab === "discipline" && renderDiscipline()}
            {activeTab === "training" && renderTraining()}
          </div>
        </div>

        {/* Additional HR Information */}
        <div className="hr-info-section">
          <h3>Əlavə əmakdaş məlumatları</h3>
          <div className="hr-info-grid">
            <div className="hr-info-item">
              <label>İş təcrübəsi:</label>
              <span>{employee.workExperience}</span>
            </div>
            <div className="hr-info-item">
              <label>Müqavilə bitmə tarixi:</label>
              <span>{employee.contractEndDate}</span>
            </div>
            <div className="hr-info-item">
              <label>Birbaşa rəhbər:</label>
              <span>{employee.directManager}</span>
            </div>
            <div className="hr-info-item">
              <label>İş qrafiki:</label>
              <span>{employee.workSchedule}</span>
            </div>
            <div className="hr-info-item">
              <label>İşə davamiyyət:</label>
              <span>{employee.attendanceRate}%</span>
            </div>
            <div className="hr-info-item">
              <label>Tibbi sığorta:</label>
              <span>{employee.medicalInsurance}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Performance Calculator Modal */}
      <PerformanceCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onSave={handleSaveCalculation}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onYearChange={setSelectedYear}
        onMonthChange={setSelectedMonth}
      />
    </>
  );
};

export default EmployeeProfile;
