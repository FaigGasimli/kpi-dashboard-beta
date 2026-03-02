"use client";

import { useState } from "react";
import styles from "./summary.module.css";

// Circular Progress Component
const CircularProgress = ({ percentage, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.circularProgress}>
      <svg width={size} height={size} className={styles.progressSvg}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#d97706"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={styles.progressCircle}
        />
      </svg>
      <div className={styles.progressText}>
        <span className={styles.progressPercentage}>{percentage}%</span>
      </div>
    </div>
  );
};

// Bar Chart Component
const BarChart = ({ data, height = 200 }) => {
  const maxValue = Math.max(
    ...data.map((item) => Math.max(item.actual, item.target)),
  );

  return (
    <div className={styles.barChart} style={{ height }}>
      <div className={styles.chartContainer}>
        {data.map((item, index) => (
          <div key={index} className={styles.barGroup}>
            <div className={styles.bars}>
              <div
                className={`${styles.bar} ${styles.actualBar}`}
                style={{ height: `${(item.actual / maxValue) * 100}%` }}
                title={`Actual: ${item.actual}`}
              />
              <div
                className={`${styles.bar} ${styles.targetBar}`}
                style={{ height: `${(item.target / maxValue) * 100}%` }}
                title={`Target: ${item.target}`}
              />
            </div>
            <span className={styles.barLabel}>{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const KpiSummary = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("İllik");

  // Sample data
  const kpiData = {
    actual: 300,
    target: 400,
    expected: 320,
    belowPerformance: 12,
  };

  const performanceComparison = 80;

  const annualPerformanceData = [
    { month: "Yan", actual: 85, target: 90 },
    { month: "Fev", actual: 92, target: 95 },
    { month: "Mar", actual: 88, target: 90 },
    { month: "Apr", actual: 95, target: 100 },
    { month: "May", actual: 87, target: 90 },
    { month: "İyn", actual: 93, target: 95 },
    { month: "İyl", actual: 89, target: 90 },
    { month: "Avq", actual: 91, target: 95 },
    { month: "Sen", actual: 86, target: 90 },
    { month: "Okt", actual: 94, target: 95 },
    { month: "Noy", actual: 88, target: 90 },
    { month: "Dek", actual: 92, target: 95 },
  ];

  const employeeKpiData = [
    {
      id: 1,
      name: "Ayan Hüseynli",
      avatar: "👨‍💼",
      performance: 98,
      color: "#3b82f6",
    },
    {
      id: 2,
      name: "Şaiq Muradzadə",
      avatar: "👨‍💻",
      performance: 80,
      color: "#4b5563",
    },
    {
      id: 3,
      name: "Sənan Hüseynli",
      avatar: "👨‍🔧",
      performance: 78,
      color: "#f59e0b",
    },
    {
      id: 4,
      name: "Günah Həsənova",
      avatar: "👩‍💼",
      performance: 65,
      color: "#ef4444",
    },
  ];

  const departmentKpiData = [
    {
      department: "ƏL / TMM",
      currentIndicator: 2586,
      lastMonth: 2586,
      target: 2586,
      performance: 98,
      color: "#3b82f6",
    },
    {
      department: "Məlumatlar Emalı",
      currentIndicator: 2500,
      lastMonth: 2500,
      target: 2500,
      performance: 80,
      color: "#4b5563",
    },
    {
      department: "Kompliyens Monitoring",
      currentIndicator: 1854,
      lastMonth: 1854,
      target: 1854,
      performance: 78,
      color: "#f59e0b",
    },
    {
      department: "Müştəri Xidmətləri Şöbəsi",
      currentIndicator: 1589,
      lastMonth: 1589,
      target: 1589,
      performance: 65,
      color: "#ef4444",
    },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton}>
          <span className={styles.backIcon}>←</span>
          Geri
        </button>
      </div>

      {/* General KPI Indicators */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Ümumi KPI göstəriciləri</h2>
        <div className={styles.sectionGrid}>
          <div className={styles.kpiGrid}>
            <div className={styles.kpiCard}>
              <div className={styles.kpiValue}>{kpiData.actual}</div>
              <div className={styles.kpiLabel}>Faktiki nəticə</div>
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.kpiValue}>{kpiData.target}</div>
              <div className={styles.kpiLabel}>Hədəf</div>
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.kpiValue}>{kpiData.expected}</div>
              <div className={styles.kpiLabel}>Gözlənti</div>
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.kpiValue}>{kpiData.belowPerformance}</div>
              <div className={styles.kpiLabel}>KPI üzrə aşağı performans</div>
            </div>

            {/* Performance Comparison Chart */}
          </div>
          <div className={styles.performanceCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Performans müqayisəsi</h3>
              <select
                className={styles.periodSelect}
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="İllik">İllik</option>
                <option value="Aylıq">Aylıq</option>
                <option value="Həftəlik">Həftəlik</option>
              </select>
            </div>
            <div className={styles.performanceContent}>
              <CircularProgress percentage={performanceComparison} />
              <div className={styles.performanceLegend}>
                <div className={styles.legendItem}>
                  <span
                    className={styles.legendColor}
                    style={{ backgroundColor: "#8b5a2b" }}
                  ></span>
                  <span className={styles.legendText}>Hədəf</span>
                </div>
                <div className={styles.legendItem}>
                  <span
                    className={styles.legendColor}
                    style={{ backgroundColor: "#d97706" }}
                  ></span>
                  <span className={styles.legendText}>Cari</span>
                </div>
                <div className={styles.legendItem}>
                  <span
                    className={styles.legendColor}
                    style={{ backgroundColor: "#fbbf24" }}
                  ></span>
                  <span className={styles.legendText}>Keçən il</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Annual Performance and Employee KPI */}
      <div className={styles.twoColumnSection}>
        {/* Annual Performance */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>İllik performans</h2>
            <div className={styles.chartControls}>
              <span className={styles.chartLabel}>Performans müqayisəsi</span>
              <select className={styles.periodSelect}>
                <option value="İllik">İllik</option>
              </select>
            </div>
          </div>
          <BarChart data={annualPerformanceData} />
          <div className={styles.chartLegend}>
            <div className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: "#8b5a2b" }}
              ></span>
              <span className={styles.legendText}>Faktiki</span>
            </div>
            <div className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: "#d97706" }}
              ></span>
              <span className={styles.legendText}>Hədəf</span>
            </div>
          </div>
        </div>

        {/* Employee KPI */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>İşçilər üzrə KPI</h2>
          <div className={styles.employeeList}>
            <div className={styles.employeeHeader}>
              <span className={styles.employeeHeaderText}>İşçi adı</span>
              <span className={styles.employeeHeaderText}>
                KPI performans nəticəsi %
              </span>
            </div>
            {employeeKpiData.map((employee) => (
              <div key={employee.id} className={styles.employeeItem}>
                <div className={styles.employeeInfo}>
                  <div className={styles.employeeAvatar}>{employee.avatar}</div>
                  <span className={styles.employeeName}>{employee.name}</span>
                </div>
                <div className={styles.employeePerformance}>
                  <div className={styles.performanceBar}>
                    <div
                      className={styles.performanceFill}
                      style={{
                        width: `${employee.performance}%`,
                        backgroundColor: employee.color,
                      }}
                    ></div>
                  </div>
                  <span className={styles.performanceValue}>
                    {employee.performance}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Monthly KPI Indicators */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Şöbələr üzrə aylıq KPI göstəriciləri
        </h2>
        <div className={styles.tableContainer}>
          <table className={styles.kpiTable}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Şöbə</th>
                <th className={styles.tableHeader}>Cari göstərici</th>
                <th className={styles.tableHeader}>Keçən ay</th>
                <th className={styles.tableHeader}>Hədəf</th>
                <th className={styles.tableHeader}>
                  KPI performans nəticəsi %
                </th>
              </tr>
            </thead>
            <tbody>
              {departmentKpiData.map((dept, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>{dept.department}</td>
                  <td className={styles.tableCell}>{dept.currentIndicator}</td>
                  <td className={styles.tableCell}>{dept.lastMonth}</td>
                  <td className={styles.tableCell}>{dept.target}</td>
                  <td className={styles.tableCell}>
                    <div className={styles.performanceCell}>
                      <div className={styles.performanceBar}>
                        <div
                          className={styles.performanceFill}
                          style={{
                            width: `${dept.performance}%`,
                            backgroundColor: dept.color,
                          }}
                        ></div>
                      </div>
                      <span className={styles.performanceValue}>
                        {dept.performance}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KpiSummary;
