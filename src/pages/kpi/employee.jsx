"use client"

import { useState } from "react"
import styles from "./employee.module.css"

const EmployeeView = () => {
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  // Branch data
  const branches = [
    { id: 1, name: "Baş Ofis", employeeCount: 45 },
    { id: 2, name: "Gəncə Filialı", employeeCount: 23 },
    { id: 3, name: "Sumqayıt Filialı", employeeCount: 18 },
    { id: 4, name: "Şəki Filialı", employeeCount: 12 },
    { id: 5, name: "Lənkəran Filialı", employeeCount: 15 },
  ]

  // Employee KPI data based on the provided table
  const employeeKPIData = [
    {
      id: 1,
      yaziliTelimatlar: "Monitoring planının tərtib",
      təyinat: "cari il",
      icraTəyinati: "",
      status: "Ümumlaşdırım Gözl, Şöbə rəisi",
      icraTəzliyi: "Şöbə rəisi, Direktor, CRO",
      vazifeMesuliyyeti: "Şöbə rəisi, Direktor, CRO",
      olayaTapsiriglar: "Planlaşdırma → Monitoring → Hesabat → Geri dönüş",
      isProsesu: "Bankdaxili proses və analitikalarla əsasən və monitorinqlərin aparılması qaydası",
      isProseduru: "Yeni məhsullara Kompleksləyən Rəyinin verilməsi",
      agirligDərəcəsi: "100%",
      digerGöbə: "şöbə rəisi",
      filial: "şöbə rəisi",
    },
    {
      id: 2,
      yaziliTelimatlar: "Yeni məhsul və proseslərin monitorinqi",
      təyinat: "sərbəst asanında",
      icraTəyinati: "",
      status: "Ümumlaşdırım Gözl, Şöbə rəisi",
      icraTəzliyi: "Şöbə rəisi, Direktor, CRO",
      vazifeMesuliyyeti: "Şöbə rəisi, Direktor, CRO",
      olayaTapsiriglar:
        "Adliyyat struktur bölməsinin müraciətin daxil olması → rəhbərlik razılaşdırılması →Rəyin verilməsi",
      isProsesu: "Yeni məhsullara Kompleksləyən Rəyinin verilməsi",
      isProseduru: "Yeni məhsullara Kompleksləyən Rəyinin verilməsi",
      agirligDərəcəsi: "100%",
      digerGöbə: "şöbə rəisi",
      filial: "şöbə rəisi",
    },
    {
      id: 3,
      yaziliTelimatlar: "Mərcə müraciətin icra rey verilməsi",
      təyinat: "sərbəst asanında",
      icraTəyinati: "",
      status: "Ümumlaşdırım Gözl, Şöbə rəisi",
      icraTəzliyi: "Şöbə rəisi, Direktor, CRO",
      vazifeMesuliyyeti: "Şöbə rəisi, Direktor, CRO",
      olayaTapsiriglar:
        "Adliyyat struktur bölməsinin müraciətin daxil olması → rəhbərlik razılaşdırılması →Rəyin verilməsi",
      isProsesu: "Mərcələr müraciətin təsirindəmməsi proseduru və Siyasəti",
      isProseduru: "Mərcələr müraciətin təsirindəmməsi proseduru və Siyasəti",
      agirligDərəcəsi: "10",
      digerGöbə: "şöbə rəisi",
      filial: "şöbə rəisi",
    },
  ]

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch)
  }

  const handleBackToBranches = () => {
    setSelectedBranch(null)
    setSelectedEmployee(null)
  }

  if (!selectedBranch) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Filialları Seçin</h2>
          <p className={styles.subtitle}>İşçi məlumatlarını görmək üçün filial seçin</p>
        </div>

        <div className={styles.branchGrid}>
          {branches.map((branch) => (
            <div key={branch.id} className={styles.branchCard} onClick={() => handleBranchSelect(branch)}>
              <div className={styles.branchIcon}>🏢</div>
              <h3 className={styles.branchName}>{branch.name}</h3>
              <p className={styles.employeeCount}>{branch.employeeCount} işçi</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBackToBranches}>
          ← Geri
        </button>
        <h2 className={styles.title}>{selectedBranch.name} - İşçi Görünüşü</h2>
      </div>

      {/* Employee Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.employeeInfo}>
          <div className={styles.avatar}>👤</div>
          <div className={styles.details}>
            <h3>Əli Məmmədov</h3>
            <p>Risk Meneceri</p>
            <p>Risk İdarəetmə Şöbəsi</p>
            <p>İşə qəbul: 15.03.2020 (4 il təcrübə)</p>
          </div>
        </div>

        <div className={styles.kpiSummary}>
          <div className={styles.summaryCard}>
            <div className={styles.cardValue}>85%</div>
            <div className={styles.cardLabel}>Ümumi Orta Nəticə</div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.cardValue}>12</div>
            <div className={styles.cardLabel}>On-track KPI</div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.cardValue}>3</div>
            <div className={styles.cardLabel}>Riskli KPI</div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.cardValue}>92</div>
            <div className={styles.cardLabel}>Şəxsi KPI Balı</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <select className={styles.filterSelect}>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
        <select className={styles.filterSelect}>
          <option>Aylıq</option>
          <option>Rüblük</option>
          <option>İllik</option>
        </select>
        <select className={styles.filterSelect}>
          <option>Bütün Modullar</option>
          <option>CE</option>
          <option>MH</option>
          <option>AML</option>
          <option>AU</option>
        </select>
        <select className={styles.filterSelect}>
          <option>Bütün Status</option>
          <option>On-track</option>
          <option>Risk</option>
          <option>Off</option>
        </select>
      </div>

      {/* KPI Results Table */}
      <div className={styles.tableContainer}>
        <table className={styles.kpiTable}>
          <thead>
            <tr>
              <th>Yazılı Təlimatları</th>
              <th>Təyinat</th>
              <th>İcra Təyinatı</th>
              <th>Status</th>
              <th>İcra təzliyi</th>
              <th>Vəzifə Məsuliyyəti</th>
              <th>Olaya tapşırıqlar Şəxs</th>
              <th>İş Prosesi</th>
              <th>İş Proseduru</th>
              <th>Ağırlıq Dərəcəsi</th>
              <th>Digər göbə</th>
              <th>Filial</th>
              <th>Qiymətləndirmə</th>
            </tr>
          </thead>
          <tbody>
            {employeeKPIData.map((item) => (
              <tr key={item.id}>
                <td>{item.yaziliTelimatlar}</td>
                <td>{item.təyinat}</td>
                <td>{item.icraTəyinati}</td>
                <td>
                  <span className={styles.statusBadge}>{item.status}</span>
                </td>
                <td>{item.icraTəzliyi}</td>
                <td>{item.vazifeMesuliyyeti}</td>
                <td>{item.olayaTapsiriglar}</td>
                <td>{item.isProsesu}</td>
                <td>{item.isProseduru}</td>
                <td>
                  <span className={styles.weightBadge}>{item.agirligDərəcəsi}</span>
                </td>
                <td>{item.digerGöbə}</td>
                <td>{item.filial}</td>
                <td>
                  <div className={styles.ratingContainer}>
                    <div className={styles.rating}>85%</div>
                    <div className={styles.comparison}>
                      <span className={styles.positive}>↑ +5%</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Analytics Panel */}
      <div className={styles.analyticsPanel}>
        <div className={styles.chartContainer}>
          <h4>Trend Analizi (Son 6 ay)</h4>
          <div className={styles.trendChart}>
            <div className={styles.chartPlaceholder}>📈 Fakt vs Hədəf Müqayisəsi</div>
          </div>
        </div>

        <div className={styles.chartContainer}>
          <h4>Ən Güclü KPI-lar</h4>
          <div className={styles.topKPIs}>
            <div className={styles.kpiItem}>
              <span>Risk Monitorinqi</span>
              <span className={styles.positive}>95%</span>
            </div>
            <div className={styles.kpiItem}>
              <span>Hesabat Hazırlığı</span>
              <span className={styles.positive}>92%</span>
            </div>
            <div className={styles.kpiItem}>
              <span>Prosedur İcrası</span>
              <span className={styles.positive}>88%</span>
            </div>
          </div>
        </div>

        <div className={styles.chartContainer}>
          <h4>Zəif KPI-lar</h4>
          <div className={styles.weakKPIs}>
            <div className={styles.kpiItem}>
              <span>Mərcə Müraciət</span>
              <span className={styles.negative}>65%</span>
            </div>
            <div className={styles.kpiItem}>
              <span>Yeni Məhsul</span>
              <span className={styles.negative}>70%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeView
