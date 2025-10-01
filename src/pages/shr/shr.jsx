"use client";

import { useState } from "react";
import styles from "./shr.module.css";
import Photo from "../../assests/qız.jpg";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import Employees from "./employees/employees";
import EmployeesTable from "./employees/EmployeesTable";

const SHR = () => {
  const [activeTab, setActiveTab] = useState("analytics");
  
  const [branches] = useState([
    {
      name: "Yeni ofis",
      departments: 3,
      branches: 3,
      employees: 16,
      performance: 77,
      color: "#92400e",
    },
    {
      name: "Filial 1",
      departments: 3,
      branches: 3,
      employees: 16,
      performance: 64,
      color: "#92400e",
    },
    {
      name: "Filial 2",
      departments: 3,
      branches: 3,
      employees: 16,
      performance: 96,
      color: "#92400e",
    },
    {
      name: "Filial 2",
      departments: 3,
      branches: 3,
      employees: 16,
      performance: 49,
      color: "#92400e",
    },
  ]);

  const [overviewStats] = useState([
    {
      label: "Ümumi işçi sayı",
      value: "1,247",
      color: "#3b82f6",
      chartData: [85, 92, 78, 96, 88],
    },
    {
      label: "Aktiv filiallar",
      value: "12",
      color: "#996F29",
      chartData: [12, 11, 10, 12, 12],
    },
    {
      label: "Departamentlər",
      value: "8",
      color: "#f59e0b",
      chartData: [6, 7, 8, 8, 8],
    },
    {
      label: "Bu ay işə qəbul",
      value: "23",
      color: "#8b5cf6",
      chartData: [15, 18, 25, 20, 23],
    },
  ]);

  const [attendanceData] = useState([
    { month: "Yanvar", percentage: 94, target: 95 },
    { month: "Fevral", percentage: 96, target: 95 },
    { month: "Mart", percentage: 92, target: 95 },
    { month: "Aprel", percentage: 98, target: 95 },
    { month: "May", percentage: 95, target: 95 },
    { month: "İyun", percentage: 93, target: 95 },
  ]);

  const [disciplinaryViolations] = useState([
    {
      name: "Rəşad Əliyev",
      violation: "Gecikməli gəlmə",
      date: "15.03.2025",
      discoveryDate: "15.03.2025",
      reason: "Nəqliyyat problemləri",
      status: "Araşdırılır",
      repeatCount: 2,
      escalationDeadline: "22.03.2025",
      severity: "low",
      branch: "Filial 1",
      department: "Satış departamenti",
      category: "delay",
      actionStatus: "xəbərdarlıq verildi",
    },
    {
      name: "Leyla Qasımova",
      violation: "İş saatında çıxma",
      date: "12.03.2025",
      discoveryDate: "12.03.2025",
      reason: "Şəxsi işlər",
      status: "Rəhbərliyə göndərildi",
      repeatCount: 1,
      escalationDeadline: "19.03.2025",
      severity: "medium",
      branch: "Yeni ofis",
      department: "HR departamenti",
      category: "leaving",
      actionStatus: "izahat alındı",
    },
    {
      name: "Orxan Məmmədov",
      violation: "Qaydaları pozma",
      date: "10.03.2025",
      discoveryDate: "10.03.2025",
      reason: "Təhlükəsizlik qaydalarını pozma",
      status: "Həll olunub",
      repeatCount: 3,
      escalationDeadline: "17.03.2025",
      severity: "high",
      branch: "Filial 2",
      department: "IT departamenti",
      category: "rule",
      actionStatus: "həll olunub",
    },
    {
      name: "Aynur Rəhimova",
      violation: "Gecikməli gəlmə",
      date: "08.03.2025",
      discoveryDate: "08.03.2025",
      reason: "Uşağın xəstəliyi",
      status: "Araşdırılır",
      repeatCount: 1,
      escalationDeadline: "15.03.2025",
      severity: "low",
      branch: "Filial 1",
      department: "Maliyyə departamenti",
      category: "delay",
      actionStatus: "xəbərdarlıq verildi",
    },
    {
      name: "Kamran Əliyev",
      violation: "İş saatında çıxma",
      date: "05.03.2025",
      discoveryDate: "05.03.2025",
      reason: "Həkim yoxlaması",
      status: "Rəhbərliyə göndərildi",
      repeatCount: 2,
      escalationDeadline: "12.03.2025",
      severity: "medium",
      branch: "Yeni ofis",
      department: "Satış departamenti",
      category: "leaving",
      actionStatus: "izahat alındı",
    },
  ]);

  const [violationStats] = useState({
    total: 12,
    high: 3,
    medium: 5,
    low: 4,
    trend: [8, 10, 12, 9, 11, 12], // Last 6 months
    topViolators: [
      { name: "Rəşad Əliyev", count: 4 },
      { name: "Leyla Qasımova", count: 3 },
      { name: "Orxan Məmmədov", count: 2 },
    ],
  });

  const [selectedYear, setSelectedYear] = useState("2025");
  const [availableYears] = useState(["2023", "2024", "2025"]);
  const [selectedBranch, setSelectedBranch] = useState("Hamısı");
  const [selectedDepartment, setSelectedDepartment] = useState("Hamısı");

  const handleCreateBranch = () => {
    console.log("Create branch clicked");
  };

  const handleCreateDepartment = () => {
    console.log("Create department clicked");
  };

  const handleAddEmployee = () => {
    console.log("Add employee clicked");
  };

  const getAttendanceAverage = () => {
    const sum = attendanceData.reduce((acc, data) => acc + data.percentage, 0);
    return Math.round(sum / attendanceData.length);
  };

  const getBestWorstMonths = () => {
    const sorted = [...attendanceData].sort(
      (a, b) => b.percentage - a.percentage
    );
    return {
      best: sorted[0],
      worst: sorted[sorted.length - 1],
    };
  };

  const calculateDaysRemaining = (escalationDeadline) => {
    const today = new Date();
    const deadline = new Date(
      escalationDeadline.split(".").reverse().join("-")
    );
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "delay":
        return <ClockIcon />;
      case "leaving":
        return <DoorIcon />;
      case "rule":
        return <AlertTriangleIcon />;
      default:
        return <AlertIcon />;
    }
  };

  const BuildingIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12h4" />
      <path d="M6 16h4" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M14 12h4" />
      <path d="M14 16h4" />
    </svg>
  );

  const GridIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );

  const UserPlusIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );

  const ThreeDotsIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  const AlertIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );

  const ClockIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  );

  const DoorIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
      <circle cx="15" cy="12" r="1" />
    </svg>
  );

  const AlertTriangleIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );

  const FilterIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
    </svg>
  );

  const TrophyIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55.47.98.97 1.21C12.04 18.75 13 20.24 13 22" />
      <path d="M14 14.66V17c0 .55-.47.98-.97 1.21C11.96 18.75 11 20.24 11 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );

  const MiniChart = ({ data, color }) => (
    <div className={styles.miniChart}>
      {data.map((value, index) => (
        <div
          key={index}
          className={styles.chartBar}
          style={{
            height: `${(value / Math.max(...data)) * 100}%`,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );

  const TrendLine = ({ data }) => (
    <div className={styles.trendLine}>
      <svg width="100%" height="40" viewBox="0 0 300 40">
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          points={data
            .map(
              (value, index) =>
                `${(index / (data.length - 1)) * 280 + 10},${
                  40 - (value / 100) * 30
                }`
            )
            .join(" ")}
        />
      </svg>
    </div>
  );

  const { best: bestMonth, worst: worstMonth } = getBestWorstMonths();

  return (
    <>
      <Header title="Strategic Human Resources - Strateji İnsan Resursları" />
      <div className={styles.container}>
        {/* Tab Navigation */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${activeTab === "analytics" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            Analitika
          </button>
          <button
            className={`${styles.tab} ${activeTab === "employees" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("employees")}
          >
            Əməkdaşlar
          </button>
        </div>

        {/* Analytics Tab Content */}
        {activeTab === "analytics" && (
          <>
        {/* Action Buttons */}
        <div className={styles.actionButtonsContainer}>
          <div className={styles.actionButtons}>
            <Link to="/newbranch?modal=branch">
              <button
                className={styles.actionButton}
                onClick={handleCreateBranch}
              >
                <BuildingIcon />
                <span>Yeni filial yarat</span>
              </button>
            </Link>
            <Link to="/newbranch?modal=department">
              <button
                className={styles.actionButton}
                onClick={handleCreateDepartment}
              >
                <GridIcon />
                <span>Departament yarat</span>
              </button>
            </Link>
            <Link to="/newbranch?modal=employee">
              <button
                className={styles.actionButton}
                onClick={handleAddEmployee}
              >
                <UserPlusIcon />
                <span>Yeni işçi əlavə et</span>
              </button>
            </Link>
          </div>

          <div className={styles.overviewStatsCompact}>
            {overviewStats.map((stat, index) => (
              <div key={index} className={styles.compactStatItem}>
                <span className={styles.compactStatValue}>{stat.value}</span>
                <span className={styles.compactStatLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.sectionCompact}>
          <h2 className={styles.sectionTitleCompact}>Filiallar siyahısı</h2>
          <div className={styles.branchGrid}>
            {branches.map((branch, index) => (
              <Link to="/newbranch">
                <div key={index} className={styles.branchCard}>
                  <div className={styles.branchHeader}>
                    <h3 className={styles.branchName}>{branch.name}</h3>
                    <button className={styles.menuButton}>
                      <ThreeDotsIcon />
                    </button>
                  </div>
                  <div className={styles.branchStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>
                        Departament sayı:
                      </span>
                      <span className={styles.statValue}>
                        {branch.departments}
                      </span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Şöbə sayı:</span>
                      <span className={styles.statValue}>
                        {branch.branches}
                      </span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>İşçi sayı:</span>
                      <span className={styles.statValue}>
                        {branch.employees}
                      </span>
                    </div>
                  </div>
                  <div className={styles.branchPerformance}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{
                          width: `${branch.performance}%`,
                          backgroundColor: branch.color,
                        }}
                      ></div>
                    </div>
                    <span className={styles.performanceText}>
                      {branch.performance}%
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Two-Column Layout for Attendance Data and Disciplinary Violations */}
        <div className={styles.twoColumnLayout}>
          {/* Average Attendance */}
          <div className={styles.sectionCompact}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitleCompact}>
                <CalendarIcon />
                Orta davamiyyət
              </h2>
              <div className={styles.filterGroup}>
                <select
                  className={styles.branchFilter}
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  <option value="Hamısı">Hamısı</option>
                  <option value="Yeni ofis">Yeni ofis</option>
                  <option value="Filial 1">Filial 1</option>
                  <option value="Filial 2">Filial 2</option>
                </select>
                <select
                  className={styles.yearFilter}
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.attendanceSummary}>
              <div className={styles.summaryStats}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>6 aylıq ortalama:</span>
                  <span className={styles.summaryValue}>
                    {getAttendanceAverage()}%
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Hədəf:</span>
                  <span className={styles.summaryValue}>95%</span>
                </div>
              </div>
              <TrendLine data={attendanceData.map((d) => d.percentage)} />
            </div>

            <div className={styles.attendanceList}>
              {attendanceData.map((data, index) => (
                <div key={index} className={styles.attendanceItem}>
                  <div className={styles.attendanceMonth}>{data.month}</div>
                  <div className={styles.attendanceBar}>
                    <div
                      className={`${styles.attendanceFill} ${
                        data.percentage < data.target ? styles.belowTarget : ""
                      }`}
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                  <div className={styles.attendancePercentage}>
                    <span
                      className={
                        data.percentage < data.target
                          ? styles.belowTargetText
                          : ""
                      }
                    >
                      {data.percentage}%
                    </span>
                    <span className={styles.targetComparison}>
                      / {data.target}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.monthHighlights}>
              <div className={styles.bestMonth}>
                <span className={styles.highlightLabel}>Ən yaxşı:</span>
                <span className={styles.highlightValue}>
                  {bestMonth.month} ({bestMonth.percentage}%)
                </span>
              </div>
              <div className={styles.worstMonth}>
                <span className={styles.highlightLabel}>Ən zəif:</span>
                <span className={styles.highlightValue}>
                  {worstMonth.month} ({worstMonth.percentage}%)
                </span>
              </div>
            </div>
          </div>

          {/* Disciplinary Violations */}
          <div className={styles.sectionCompact}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitleCompact}>
                <AlertIcon />
                İntizam pozuntuları
              </h2>
              <div className={styles.filterGroup}>
                <select
                  className={styles.branchFilter}
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  <option value="Hamısı">Hamısı</option>
                  <option value="Yeni ofis">Yeni ofis</option>
                  <option value="Filial 1">Filial 1</option>
                  <option value="Filial 2">Filial 2</option>
                </select>
                <select
                  className={styles.departmentFilter}
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="Hamısı">Hamısı</option>
                  <option value="HR departamenti">HR</option>
                  <option value="IT departamenti">IT</option>
                  <option value="Satış departamenti">Satış</option>
                </select>
              </div>
            </div>

            <div className={styles.topViolators}>
              <h4 className={styles.topViolatorsTitle}>
                Ən çox pozuntu edənlər (TOP-3)
              </h4>
              {violationStats.topViolators.map((violator, index) => (
                <div key={index} className={styles.topViolatorItem}>
                  <span className={styles.violatorName}>{violator.name}</span>
                  <span className={styles.violatorCount}>
                    {violator.count} pozuntu
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.detailedViolations}>
              <h4 className={styles.detailedViolationsTitle}>
                Detallı pozuntu siyahısı
              </h4>
              <div className={styles.violationsTable}>
                <div className={styles.violationsHeader}>
                  <div className={styles.headerCell}>İşçi</div>
                  <div className={styles.headerCell}>Pozuntu</div>
                  <div className={styles.headerCell}>Aşkar tarixi</div>
                  <div className={styles.headerCell}>Səbəb</div>
                  <div className={styles.headerCell}>Status</div>
                  <div className={styles.headerCell}>Təkrarlanma</div>
                  <div className={styles.headerCell}>Qalan gün</div>
                </div>
                {disciplinaryViolations.map((violation, index) => {
                  const daysRemaining = calculateDaysRemaining(
                    violation.escalationDeadline
                  );
                  return (
                    <div key={index} className={styles.violationRow}>
                      <div className={styles.violationCell}>
                        <div className={styles.employeeName}>
                          {violation.name}
                        </div>
                        <div className={styles.employeeLocation}>
                          {violation.branch} - {violation.department}
                        </div>
                      </div>
                      <div className={styles.violationCell}>
                        <div className={styles.violationType}>
                          {getCategoryIcon(violation.category)}
                          {violation.violation}
                        </div>
                        <div
                          className={`${styles.severityBadge} ${
                            styles[violation.severity]
                          }`}
                        >
                          {violation.severity === "high"
                            ? "Yüksək"
                            : violation.severity === "medium"
                            ? "Orta"
                            : "Aşağı"}
                        </div>
                      </div>
                      <div className={styles.violationCell}>
                        <div className={styles.dateValue}>
                          {violation.discoveryDate}
                        </div>
                      </div>
                      <div className={styles.violationCell}>
                        <div className={styles.reasonValue}>
                          {violation.reason}
                        </div>
                      </div>
                      <div className={styles.violationCell}>
                        <div
                          className={`${styles.statusBadge} ${
                            styles[
                              violation.status.toLowerCase().replace(/\s+/g, "")
                            ]
                          }`}
                        >
                          {violation.status}
                        </div>
                      </div>
                      <div className={styles.violationCell}>
                        <div className={styles.repeatCount}>
                          <span className={styles.repeatNumber}>
                            {violation.repeatCount}
                          </span>
                          <span className={styles.repeatLabel}>dəfə</span>
                        </div>
                      </div>
                      <div className={styles.violationCell}>
                        <div
                          className={`${styles.countdownTimer} ${
                            daysRemaining <= 2
                              ? styles.urgent
                              : daysRemaining <= 5
                              ? styles.warning
                              : ""
                          }`}
                        >
                          <span className={styles.countdownNumber}>
                            {daysRemaining}
                          </span>
                          <span className={styles.countdownLabel}>gün</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Branches List */}
          </>
        )}

        {/* Employees Tab Content */}
        {activeTab === "employees" && (
          <EmployeesTable />
        )}
      </div>
    </>
  );
};

export default SHR;
