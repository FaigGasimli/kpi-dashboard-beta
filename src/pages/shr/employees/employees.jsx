"use client"

import { useState } from "react"
import "./employees.css"
import Photo from "../../../assests/qız.jpg"
import Header from "../../../components/header";

const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState("tasks")
  const [activeDisciplineTab, setActiveDisciplineTab] = useState("bonus")
  const [performanceFilter, setPerformanceFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

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
  }

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
      description: "Q4 üçün yeni işçilərin adaptasiya materiallarının hazırlanması",
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
  ]

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
  ]

  const vacationData = [
    {
      date: "15.08.2024",
      reason: "Ailə məzuniyyəti",
      daysUsed: 14,
      status: "Tamamlandı"
    },
    {
      date: "20.12.2024",
      reason: "Yeni il məzuniyyəti",
      daysUsed: 7,
      status: "Planlaşdırılır"
    },
    {
      date: "10.06.2024",
      reason: "Şəxsi məzuniyyət",
      daysUsed: 5,
      status: "Tamamlandı"
    }
  ]

  const bonusData = [
    {
      type: "Aylıq performans bonusu",
      amount: "500 AZN",
      date: "15.12.2024",
      paymentDate: "20.12.2024",
      status: "Ödənildi",
      reason: "KPI hədəflərinin 120% yerinə yetirilməsi",
      kpiResult: "120%"
    },
    {
      type: "Rüblük bonus",
      amount: "1000 AZN",
      date: "01.10.2024",
      paymentDate: "05.10.2024",
      status: "Ödənildi",
      reason: "Q3 dövrü üçün əla nəticələr",
      kpiResult: "115%"
    },
    {
      type: "İllik bonus",
      amount: "2000 AZN",
      date: "01.01.2024",
      paymentDate: "10.01.2024",
      status: "Ödənildi",
      reason: "2023-cü il üçün üstün performans",
      kpiResult: "110%"
    }
  ]

  const violationData = [
    {
      type: "Gecikməli gəlmə",
      date: "20.09.2024",
      status: "Həll olunub",
      description: "İşə 30 dəqiqə gecikmə",
      appliedMeasure: "Rəsmi xəbərdarlıq"
    },
    {
      type: "İş saatında çıxma",
      date: "15.08.2024",
      status: "Araşdırılır",
      description: "İş saatında icazəsiz çıxış",
      appliedMeasure: "Şifahi xəbərdarlıq"
    },
    {
      type: "Qaydaları pozma",
      date: "10.07.2024",
      status: "Həll olunub",
      description: "Təhlükəsizlik qaydalarını pozma",
      appliedMeasure: "Cərimə (50 AZN)"
    }
  ]

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
  ]

  const getProgressBarColor = (percentage) => {
    if (percentage >= 90) return "#10b981"
    if (percentage >= 70) return "#3b82f6"
    if (percentage >= 50) return "#f59e0b"
    return "#ef4444"
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Yüksək":
        return "#ef4444"
      case "Orta":
        return "#f59e0b"
      case "Aşağı":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Tamamlandı":
        return "#10b981"
      case "Davam edir":
        return "#3b82f6"
      case "Planlaşdırılır":
        return "#f59e0b"
      default:
        return "#6b7280"
    }
  }

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
                      <span className="task-detail">Yaranma tarixi: {task.creationDate}</span>
                      <span className="task-detail">Deadline tarixi: {task.deadline}</span>
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
                      <span className="task-detail">Yaranma tarixi: {task.creationDate}</span>
                      <span className="task-detail">Deadline tarixi: {task.deadline}</span>
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

        {/* Waiting Tasks */}
        <div className="task-section waiting">
          <div className="section-header">
            <h3>Gözləyən</h3>
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
                      <span className="task-detail">Yaranma tarixi: {task.creationDate}</span>
                      <span className="task-detail">Deadline tarixi: {task.deadline}</span>
                    </div>
                  </div>
                  <div className="task-actions">
                    <span className="status-badge waiting">Gözləyən</span>
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
  )

  const getFilteredPerformanceData = () => {
    return performanceData.filter((item) => {
      const matchesSearch =
        item.kpiModule.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.metric.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.component.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = performanceFilter === "all" || item.category === performanceFilter

      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "monthly" && item.executionPeriod.includes("ay") && !item.executionPeriod.includes("12")) ||
        (dateFilter === "quarterly" && item.executionPeriod === "3 ay") ||
        (dateFilter === "yearly" && item.executionPeriod === "12 ay")

      return matchesSearch && matchesCategory && matchesDate
    })
  }

  const renderPerformance = () => (
    <div className="tab-content">
      <div className="performance-header">
        <h2>Performans sistemi nəticələri</h2>
        <div className="performance-controls">
          <div className="search-input">
            <input
              type="text"
              placeholder="Axtar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={performanceFilter}
            onChange={(e) => setPerformanceFilter(e.target.value)}
          >
            <option value="all">Bütün KPI kateqoriyaları</option>
            <option value="compliance">Komplayens</option>
            <option value="procedures">Prosedurlar</option>
            <option value="technical">Texniki</option>
          </select>
          <select className="filter-select" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
            <option value="all">Bütün dövrler</option>
            <option value="monthly">Aylıq</option>
            <option value="quarterly">Rüblük</option>
            <option value="yearly">İllik</option>
          </select>
        </div>
      </div>

      <div className="performance-table-container">
        <table className="performance-table-new">
          <thead>
            <tr>
              <th>Təyin olunan KPI modulu</th>
              <th>Metrika</th>
              <th>Komponent</th>
              <th>Nəticə</th>
              <th>Gözlənti</th>
              <th>KPI nəticəsi %</th>
              <th>Başlama Tarixi</th>
              <th>Bitmə Tarixi</th>
              <th>İcra Müddəti</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredPerformanceData().map((item, index) => (
              <tr key={index}>
                <td className="kpi-module">{item.kpiModule}</td>
                <td>{item.metric}</td>
                <td>{item.component}</td>
                <td>{item.currentResult || "-"}</td>
                <td>{item.target || "-"}</td>
                <td className="kpi-percentage">{item.kpiPercentage ? `${item.kpiPercentage}%` : "-"}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.executionPeriod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

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
                <span className={`status-badge ${bonus.status.toLowerCase().replace(/\s+/g, '')}`}>
                  {bonus.status}
                </span>
              </td>
              <td className="bonus-reason">{bonus.reason}</td>
              <td className="kpi-result">{bonus.kpiResult}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderViolationsTable = () => (
    <div className="violations-table-container">
      <table className="violations-table">
        <thead>
          <tr>
            <th>Növü</th>
            <th>Tarix</th>
            <th>Status</th>
            <th>Təsviri</th>
            <th>Tətbiq edilən tədbir / cəza</th>
          </tr>
        </thead>
        <tbody>
          {violationData.map((violation, index) => (
            <tr key={index}>
              <td className="violation-type">{violation.type}</td>
              <td>{violation.date}</td>
              <td>
                <span className={`status-badge ${violation.status.toLowerCase().replace(/\s+/g, '')}`}>
                  {violation.status}
                </span>
              </td>
              <td className="violation-description">{violation.description}</td>
              <td className="applied-measure">{violation.appliedMeasure}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderDiscipline = () => (
    <div className="tab-content">
      <div className="discipline-tabs-horizontal">
        <div className="discipline-tab-nav-horizontal">
          <button
            className={activeDisciplineTab === "bonus" ? "discipline-tab-button-horizontal active" : "discipline-tab-button-horizontal"}
            onClick={() => setActiveDisciplineTab("bonus")}
          >
            Bonus siyahısı
          </button>
          <button
            className={activeDisciplineTab === "violations" ? "discipline-tab-button-horizontal active" : "discipline-tab-button-horizontal"}
            onClick={() => setActiveDisciplineTab("violations")}
          >
            İntizam pozuntuları
          </button>
        </div>
        <div className="discipline-tab-content-horizontal">
          {activeDisciplineTab === "bonus" && renderBonusTable()}
          {activeDisciplineTab === "violations" && renderViolationsTable()}
        </div>
      </div>
    </div>
  )

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
                <span className={`status-badge-new ${training.status.toLowerCase().replace(" ", "-")}`}>
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
  )

  return (
   <> <Header title="Strategic Human Resources - Strateji İnsan Resursları" />
    <div className="employee-profile">
      {/* Header Section */}
      <div className="profile-header">
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
              <label>İşə qəbul tarixi:</label>
              <span>{employee.hireDate}</span>
            </div>
            <div className="info-item">
              <label>Şöbə:</label>
              <span>{employee.position}</span>
            </div>
            <div className="info-item">
              <label>Əmək haqqı:</label>
              <span>{employee.salary}</span>
            </div>
            <div className="info-item">
              <label>Vəzifə:</label>
              <span>{employee.branch}</span>
            </div>
            <div className="info-item">
              <label>Vəzifə:</label>
              <span>{employee.branch}</span>
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
            <span className="stat-value">{vacationData.reduce((sum, vacation) => sum + vacation.daysUsed, 0)} gün</span>
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
              <div className={`vacation-status ${vacation.status.toLowerCase().replace(/\s+/g, '')}`}>
                {vacation.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-container">
        <div className="tabs-nav">
          <button
            className={activeTab === "tasks" ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab("tasks")}
          >
            Tapşırıqlar
          </button>
          <button
            className={activeTab === "performance" ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab("performance")}
          >
            Performans Sistemi
          </button>
          <button
            className={activeTab === "discipline" ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab("discipline")}
          >
            Nizam İntizam
          </button>
          <button
            className={activeTab === "training" ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab("training")}
          >
            Təlim və İnkişaf
          </button>
        </div>

        <div className="tabs-content">
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
    </div></>
  )
}

export default EmployeeProfile
