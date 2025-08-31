"use client"

import { useState } from "react"
import styles from "./performance.module.css"

const Performance = () => {
  const [selectedYear, setSelectedYear] = useState("2025")
  const [hoveredBar, setHoveredBar] = useState(null)

  const monthlyData = [
    { month: "Jan", value: 50, label: "Yan" },
    { month: "Feb", value: 60, label: "Fev" },
    { month: "Mar", value: 68, label: "Mar" },
    { month: "Apr", value: 55, label: "Apr" },
    { month: "May", value: 42, label: "May" },
    { month: "Jun", value: 55, label: "İyn" },
    { month: "Jul", value: 62, label: "İyl" },
    { month: "Aug", value: 77, label: "Avq" },
    { month: "Sep", value: 65, label: "Sen" },
    { month: "Oct", value: 55, label: "Okt" },
    { month: "Nov", value: 48, label: "Noy" },
    { month: "Dec", value: 70, label: "Dek" },
  ]

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
  ]

  const maxValue = Math.max(...monthlyData.map((d) => d.value))

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton}>
          <span className={styles.backIcon}>‹</span>
          Geri
        </button>
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <h2 className={styles.chartTitle}>Aylar üzrə KPI performans (2025)</h2>
          <div className={styles.chartControls}>
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.legendColor} style={{ backgroundColor: "#8b5a3c" }}></span>
                <span>Hədəf</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendColor} style={{ backgroundColor: "#8b5a3c" }}></span>
                <span>Performans</span>
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

          <div className={styles.chartArea}>
            <div className={styles.gridLines}>
              {[0, 20, 40, 60, 80, 100].map((value) => (
                <div key={value} className={styles.gridLine}></div>
              ))}
            </div>

            <div className={styles.barsContainer}>
              {monthlyData.map((data, index) => (
                <div key={data.month} className={styles.barGroup}>
                  <div
                    className={styles.bar}
                    style={{
                      height: `${(data.value / maxValue) * 100}%`,
                      backgroundColor: "#8b5a3c",
                    }}
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
      </div>

      <div className={styles.tableSection}>
        <h2 className={styles.tableTitle}>Şöbələr üzrə aylıq KPI göstəriciləri</h2>

        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Şöbə</div>
            <div className={styles.headerCell}>Cari göstərici</div>
            <div className={styles.headerCell}>Keçən ay</div>
            <div className={styles.headerCell}>Hədəf</div>
            <div className={styles.headerCell}>KPI performans nəticəsi %</div>
          </div>

          <div className={styles.tableBody}>
            {departmentData.map((dept, index) => (
              <div key={index} className={styles.tableRow}>
                <div className={styles.cell}>{dept.name}</div>
                <div className={styles.cell}>{dept.current}</div>
                <div className={styles.cell}>{dept.lastMonth}</div>
                <div className={styles.cell}>{dept.target}</div>
                <div className={styles.cell}>
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
    </div>
  )
}

export default Performance
