"use client"

import { useState } from "react"
import "./employees.css"
import Photo from "../../../assests/qız.jpg"
import Header from "../../../components/header";

const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState("tasks")
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

  const disciplineRecords = [
    {
      date: "15.11.2024",
      type: "Bonus",
      description: "Üstün performansa görə aylıq bonus",
      status: "Aktiv",
      category: "positive",
      entryTime: "08:55",
      exitTime: "18:10",
    },
    {
      date: "01.10.2024",
      type: "Təlim",
      description: "Komplayens qaydaları üzrə təlim",
      status: "Tamamlandı",
      category: "training",
      entryTime: "09:00",
      exitTime: "18:00",
    },
    {
      date: "20.09.2024",
      type: "Şifahi xəbərdarlıq",
      description: "İşə gecikməyə görə şifahi xəbərdarlıq",
      status: "Bağlandı",
      category: "warning",
      entryTime: "09:15",
      exitTime: "18:00",
    },
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

  const renderDiscipline = () => (
    <div className="tab-content">
      <div className="discipline-records">
        {disciplineRecords.map((record, index) => (
          <div key={index} className={`discipline-item ${record.category}`}>
            <div className="discipline-header">
              <h4>{record.type}</h4>
              <span className="discipline-date">{record.date}</span>
            </div>
            <p>{record.description}</p>
            <div className="time-info">
              <span className="entry-time">Giriş: {record.entryTime}</span>
              <span className="exit-time">Çıxış: {record.exitTime}</span>
            </div>
            <span className={`status-badge ${record.status.toLowerCase()}`}>{record.status}</span>
          </div>
        ))}
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
