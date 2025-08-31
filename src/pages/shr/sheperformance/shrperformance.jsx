"use client"

import { useState } from "react"
import styles from "./shrperformance.module.css"

const SHRPerformance = () => {
  const [selectedYear, setSelectedYear] = useState("2025")
  const [hoveredBar, setHoveredBar] = useState(null)

  // Monthly performance data
  const monthlyData = [
    { month: "Jan", value: 50, label: "Yan" },
    { month: "Feb", value: 60, label: "Fev" },
    { month: "Mar", value: 70, label: "Mar" },
    { month: "Apr", value: 58, label: "Apr" },
    { month: "May", value: 42, label: "May" },
    { month: "Jun", value: 55, label: "İyn" },
    { month: "Jul", value: 62, label: "İyl" },
    { month: "Aug", value: 77, label: "Avq" },
    { month: "Sep", value: 65, label: "Sen" },
    { month: "Oct", value: 58, label: "Okt" },
    { month: "Nov", value: 48, label: "Noy" },
    { month: "Dec", value: 72, label: "Dek" },
  ]

  // Department data
  const departmentData = [
    {
      name: "BL / TMM",
      current: 2586,
      lastMonth: 2586,
      target: 2586,
      percentage: 98,
      color: "#3b82f6",
    },
    {
      name: "Məlumatlar Emalı",
      current: 2500,
      lastMonth: 2500,
      target: 2500,
      percentage: 80,
      color: "#10b981",
    },
    {
      name: "Kompliyens Monitoring",
      current: 1854,
      lastMonth: 1854,
      target: 1854,
      percentage: 78,
      color: "#f59e0b",
    },
    {
      name: "Müştəri Xidmətləri Şöbəsi",
      current: 1589,
      lastMonth: 1589,
      target: 1589,
      percentage: 65,
      color: "#ef4444",
    },
  ]

  const maxValue = Math.max(...monthlyData.map((d) => d.value))

  const handleCreateDepartment = () => {
    console.log("Create department clicked")
  }

  const handleAddEmployee = () => {
    console.log("Add employee clicked")
  }

  const handleBack = () => {
    console.log("Back clicked")
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Geri
        </button>
      </div>

      {/* Department Title */}
      <div className={styles.departmentTitle}>
        <h1>Kompliyens Monitoring departamenti</h1>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button className={styles.actionButton} onClick={handleCreateDepartment}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
          </svg>
          Şöbə yarat
        </button>
        <button className={styles.actionButton} onClick={handleAddEmployee}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="17" y1="11" x2="23" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Yeni işçi əlavə et
        </button>
      </div>

      {/* Monthly Performance Chart */}
      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <h2>Aylar üzrə KPI performans (2025)</h2>
          <div className={styles.chartControls}>
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.legendColor} style={{ backgroundColor: "#e5e7eb" }}></span>
                Hədəf
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendColor} style={{ backgroundColor: "#92400e" }}></span>
                Performans
              </div>
            </div>
            <select
              className={styles.yearSelector}
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>

        <div className={styles.chartContainer}>
          <div className={styles.yAxis}>
            <span>100</span>
            <span>80</span>
            <span>60</span>
            <span>40</span>
            <span>20</span>
            <span>0</span>
          </div>

          <div className={styles.chart}>
            {monthlyData.map((data, index) => (
              <div key={data.month} className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{ height: `${(data.value / maxValue) * 100}%` }}
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {hoveredBar === index && <div className={styles.tooltip}>{data.value}</div>}
                </div>
                <span className={styles.monthLabel}>{data.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department KPI Table */}
      <div className={styles.tableSection}>
        <h2>Şöbələr üzrə aylıq KPI göstəriciləri</h2>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.tableCell}>Şöbə</div>
            <div className={styles.tableCell}>Cari göstərici</div>
            <div className={styles.tableCell}>Keçən ay</div>
            <div className={styles.tableCell}>Hədəf</div>
            <div className={styles.tableCell}>KPI performans nəticəsi %</div>
          </div>

          {departmentData.map((dept, index) => (
            <div key={index} className={styles.tableRow}>
              <div className={styles.tableCell}>{dept.name}</div>
              <div className={styles.tableCell}>{dept.current}</div>
              <div className={styles.tableCell}>{dept.lastMonth}</div>
              <div className={styles.tableCell}>{dept.target}</div>
              <div className={styles.tableCell}>
                <div className={styles.progressContainer}>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${dept.percentage}%`,
                        backgroundColor: dept.color,
                      }}
                    ></div>
                  </div>
                  <span className={styles.percentage}>{dept.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SHRPerformance
