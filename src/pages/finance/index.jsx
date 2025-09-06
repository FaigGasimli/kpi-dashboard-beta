"use client"

import { useState } from "react"
import styles from "./finance.module.css"
import Header from "../../components/header"


const monthlyPerformanceData = [
  {
    month: "FEV",
    percentage60: "60%",
    percentage15: 7,
    net: 6000,
    superGross: 7200,
    calculated60: 4320.0,
    calculated15: 648.0,
    kpiTarget: "100%",
    actualKpi: "100%",
    coefficient: 1.0,
    bonusAmount: 648,
    quarterlyPayment: 6648,
  },
  {
    month: "MAR",
    percentage60: "60%",
    percentage15: 8,
    net: 6000,
    superGross: 7200,
    calculated60: 4320.0,
    calculated15: 648.0,
    kpiTarget: "100%",
    actualKpi: "100%",
    coefficient: 1.0,
    bonusAmount: 648,
    quarterlyPayment: 6648,
  },
  {
    month: "APR",
    percentage60: "60%",
    percentage15: 9,
    net: 6000,
    superGross: 7200,
    calculated60: 4320.0,
    calculated15: 648.0,
    kpiTarget: "100%",
    actualKpi: "100%",
    coefficient: 1.0,
    bonusAmount: 648,
    quarterlyPayment: 6648,
  },
  {
    month: "MAY",
    percentage60: "60%",
    percentage15: 10,
    net: 6000,
    superGross: 7200,
    calculated60: 4320.0,
    calculated15: 648.0,
    kpiTarget: "100%",
    actualKpi: "100%",
    coefficient: 1.0,
    bonusAmount: 648,
    quarterlyPayment: 6648,
  },
  {
    month: "İYN",
    percentage60: "60%",
    percentage15: 11,
    net: 6000,
    superGross: 7200,
    calculated60: 4320.0,
    calculated15: 648.0,
    kpiTarget: "100%",
    actualKpi: "100%",
    coefficient: 1.0,
    bonusAmount: 648,
    quarterlyPayment: 6648,
  },
  {
    month: "İYUL",
    percentage60: "60%",
    percentage15: 12,
    net: 6000,
    superGross: 7200,
    calculated60: 4320.0,
    calculated15: 648.0,
    kpiTarget: "100%",
    actualKpi: "100%",
    coefficient: 1.0,
    bonusAmount: 648,
    quarterlyPayment: 6648,
  },
]

const performanceCriteria = [
  {
    description: "Hədəfə çatılmayıb, bonus hesablanmır",
    executionPercentage: "Менее 70%",
    coefficient: "0",
    attestation: "Менее 70%",
  },
  {
    description: "Qismən yerinə yetirilib",
    executionPercentage: "70% - 79%",
    coefficient: "E",
    attestation: "70%",
  },
  {
    description: "Hədəfə yaxınlaşma",
    executionPercentage: "80% - 89%",
    coefficient: "C",
    attestation: "80%",
  },
  {
    description: "Demək olar ki, hədəfə çatılıb",
    executionPercentage: "90% - 99%",
    coefficient: "B",
    attestation: "90%",
  },
  {
    description: "Hədəf tam yerinə yetirilib",
    executionPercentage: "A",
    coefficient: "100%",
    attestation: "1",
  },
]

const summaryData = {
  totalNet: 72000,
  totalBonus: 7776,
  totalKpi: "100%",
  totalCoefficient: "1.0",
  totalQuarterlyPayment: 79776,
}



const CalculatorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="8" x2="16" y1="6" y2="6"></line>
    <line x1="16" x2="16" y1="14" y2="14"></line>
    <path d="m16 10 4 4-4 4"></path>
  </svg>
)

const TrendingUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
    <polyline points="16,7 22,7 22,13"></polyline>
  </svg>
)

const DollarSignIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" x2="12" y1="1" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
)

const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
)

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7,10 12,15 17,10"></polyline>
    <line x1="12" x2="12" y1="15" y2="3"></line>
  </svg>
)

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
  </svg>
)

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" x2="12" y1="5" y2="19"></line>
    <line x1="5" x2="19" y1="12" y2="12"></line>
  </svg>
)

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" x2="6" y1="6" y2="18"></line>
    <line x1="6" x2="18" y1="6" y2="18"></line>
  </svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12,6 12,12 16,14"></polyline>
  </svg>
)

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

export default function FinancePage() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedQuarter, setSelectedQuarter] = useState("Q2")
  const [showCalculationModal, setShowCalculationModal] = useState(false)
  const [newCalculation, setNewCalculation] = useState({
    month: "",
    net: "",
    superGross: "",
    percentage60: "60",
    percentage15: "",
    kpiTarget: "100",
    actualKpi: "",
  })

  const handleNewCalculation = () => {
    setShowCalculationModal(true)
  }

  const handleSaveCalculation = () => {
    const net = Number.parseFloat(newCalculation.net) || 0
    const superGross = Number.parseFloat(newCalculation.superGross) || net * 1.2
    const percentage60 = Number.parseFloat(newCalculation.percentage60) / 100
    const percentage15 = Number.parseFloat(newCalculation.percentage15) / 100
    const actualKpi = Number.parseFloat(newCalculation.actualKpi) / 100

    const calculated60 = superGross * percentage60
    const calculated15 = superGross * percentage15
    const coefficient =
      actualKpi >= 1 ? 1.0 : actualKpi >= 0.9 ? 0.9 : actualKpi >= 0.8 ? 0.8 : actualKpi >= 0.7 ? 0.7 : 0
    const bonusAmount = calculated15 * coefficient
    const quarterlyPayment = net + bonusAmount

    console.log("Saving calculation:", {
      ...newCalculation,
      calculated60,
      calculated15,
      coefficient,
      bonusAmount,
      quarterlyPayment,
    })

    setShowCalculationModal(false)
    setNewCalculation({
      month: "",
      net: "",
      superGross: "",
      percentage60: "60",
      percentage15: "",
      kpiTarget: "100",
      actualKpi: "",
    })
  }

  return (
    <>
      <Header title="Maliyyə İdarəetmə Sistemi" />
      <div className={styles.container}>
        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <FilterIcon />
            <span>İl:</span>
            <select
              className={styles.filterSelect}
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <span>Rüblük:</span>
            <select
              className={styles.filterSelect}
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
            >
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
          </div>
          <button className={styles.exportButton}>
            <DownloadIcon />
            Excel-ə Export
          </button>
        </div>

        {/* Summary Cards */}
        <div className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Ümumi NET Məbləğ</h3>
              <div className={styles.cardIcon}>
                <DollarSignIcon />
              </div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{summaryData.totalNet.toLocaleString()} AZN</div>
              <div className={styles.cardSubtext}>
                {selectedYear} {selectedQuarter}
              </div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Ümumi Bonus</h3>
              <div className={styles.cardIcon}>
                <TrendingUpIcon />
              </div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{summaryData.totalBonus.toLocaleString()} AZN</div>
              <div className={styles.cardSubtext}>KPI əsaslı hesablanmış</div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Orta KPI Nəticəsi</h3>
              <div className={styles.cardIcon}>
                <TargetIcon />
              </div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{summaryData.totalKpi}</div>
              <div className={styles.cardSubtext}>Hədəf: 100%</div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Rüblük Ödəniş</h3>
              <div className={styles.cardIcon}>
                <CalculatorIcon />
              </div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{summaryData.totalQuarterlyPayment.toLocaleString()} AZN</div>
              <div className={styles.cardSubtext}>NET + Bonus</div>
            </div>
          </div>
        </div>

        {/* Statistics */}
       

        {/* Monthly Performance Table */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Aylıq Performans və Hesablamalar</h3>
            <div className={styles.catalogActions}>
              <button className={styles.primaryButton} onClick={handleNewCalculation}>
                <PlusIcon />
                Yeni Hesablama
              </button>
            </div>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.tableContainer}>
              <table className={styles.performanceTable}>
                <thead>
                  <tr>
                    <th className={styles.monthColumn}>AY</th>
                    <th>60%</th>
                    <th>15%</th>
                    <th>NET</th>
                    <th>SUPER GROSS</th>
                    <th className={styles.highlightColumn}>60%</th>
                    <th>15%</th>
                    <th>KPI Nədəf</th>
                    <th>Faktiki KPI</th>
                    <th>Koeficent</th>
                    <th>Bonus Məbləği</th>
                    <th className={styles.paymentColumn}>
                      KPI-lərin faktiki icrasına əsasən Kvartal ödənişi hesablayırıq
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyPerformanceData.map((row, index) => (
                    <tr key={index}>
                      <td className={styles.monthCell}>{row.month}</td>
                      <td>{row.percentage60}</td>
                      <td>{row.percentage15}</td>
                      <td>{row.net.toLocaleString()}</td>
                      <td>{row.superGross.toLocaleString()}</td>
                      <td className={styles.highlightCell}>{row.calculated60.toLocaleString()}</td>
                      <td>{row.calculated15.toLocaleString()}</td>
                      <td>{row.kpiTarget}</td>
                      <td>{row.actualKpi}</td>
                      <td>{row.coefficient}</td>
                      <td>{row.bonusAmount.toLocaleString()}</td>
                      <td className={styles.paymentCell}>{row.quarterlyPayment.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className={styles.totalRow}>
                    <td className={styles.totalLabel}>Cəmi:</td>
                    <td></td>
                    <td></td>
                    <td className={styles.totalValue}>{summaryData.totalNet.toLocaleString()}</td>
                    <td></td>
                    <td></td>
                    <td className={styles.totalValue}>{summaryData.totalBonus.toLocaleString()}</td>
                    <td></td>
                    <td className={styles.totalValue}>{summaryData.totalKpi}</td>
                    <td className={styles.totalValue}>{summaryData.totalCoefficient}</td>
                    <td className={styles.totalValue}>{summaryData.totalBonus.toLocaleString()}</td>
                    <td className={styles.totalPaymentValue}>{summaryData.totalQuarterlyPayment.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Performance Criteria Table */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Performans Kriteriyaları və Koeficentlər</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.tableContainer}>
              <table className={styles.criteriaTable}>
                <thead>
                  <tr>
                    <th>İzahı</th>
                    <th>İcra Faizi</th>
                    <th>Koeficent</th>
                    <th>Attestasiya</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceCriteria.map((criteria, index) => (
                    <tr key={index} className={index === performanceCriteria.length - 1 ? styles.excellentRow : ""}>
                      <td className={styles.descriptionCell}>{criteria.description}</td>
                      <td>{criteria.executionPercentage}</td>
                      <td>{criteria.coefficient}</td>
                      <td>{criteria.attestation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <h4>Hesablama Qaydaları</h4>
            <ul>
              <li>NET məbləğ = əsas maaş</li>
              <li>SUPER GROSS = NET + vergi və sosial ödənişlər</li>
              <li>60% hesablaması = SUPER GROSS × 60%</li>
              <li>15% hesablaması = SUPER GROSS × 15%</li>
              <li>Bonus məbləği = 15% × KPI koeficenti</li>
              <li>Rüblük ödəniş = NET + Bonus məbləği</li>
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h4>KPI Qiymətləndirməsi</h4>
            <ul>
              <li>100% - Hədəf tam yerinə yetirilib (Koeficent: 1.0)</li>
              <li>90-99% - Demək olar ki, hədəfə çatılıb (Koeficent: 0.9)</li>
              <li>80-89% - Hədəfə yaxınlaşma (Koeficent: 0.8)</li>
              <li>70-79% - Qismən yerinə yetirilib (Koeficent: 0.7)</li>
              <li>70%-dən az - Hədəfə çatılmayıb, bonus hesablanmır (Koeficent: 0)</li>
            </ul>
          </div>
        </div>

        {showCalculationModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h3>Yeni Hesablama Əlavə Et</h3>
                <button className={styles.closeButton} onClick={() => setShowCalculationModal(false)}>
                  <XIcon />
                </button>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Ay:</label>
                    <select
                      value={newCalculation.month}
                      onChange={(e) => setNewCalculation({ ...newCalculation, month: e.target.value })}
                      className={styles.formInput}
                    >
                      <option value="">Ay seçin</option>
                      <option value="YAN">Yanvar</option>
                      <option value="FEV">Fevral</option>
                      <option value="MAR">Mart</option>
                      <option value="APR">Aprel</option>
                      <option value="MAY">May</option>
                      <option value="İYN">İyun</option>
                      <option value="İYUL">İyul</option>
                      <option value="AVQ">Avqust</option>
                      <option value="SEN">Sentyabr</option>
                      <option value="OKT">Oktyabr</option>
                      <option value="NOY">Noyabr</option>
                      <option value="DEK">Dekabr</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>15% Dərəcəsi:</label>
                    <input
                      type="number"
                      value={newCalculation.percentage15}
                      onChange={(e) => setNewCalculation({ ...newCalculation, percentage15: e.target.value })}
                      className={styles.formInput}
                      placeholder="7"
                      min="1"
                      max="15"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>NET Məbləğ (AZN):</label>
                    <input
                      type="number"
                      value={newCalculation.net}
                      onChange={(e) => setNewCalculation({ ...newCalculation, net: e.target.value })}
                      className={styles.formInput}
                      placeholder="6000"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>SUPER GROSS (AZN):</label>
                    <input
                      type="number"
                      value={newCalculation.superGross}
                      onChange={(e) => setNewCalculation({ ...newCalculation, superGross: e.target.value })}
                      className={styles.formInput}
                      placeholder="7200"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>KPI Hədəf (%):</label>
                    <input
                      type="number"
                      value={newCalculation.kpiTarget}
                      onChange={(e) => setNewCalculation({ ...newCalculation, kpiTarget: e.target.value })}
                      className={styles.formInput}
                      placeholder="100"
                      readOnly
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Faktiki KPI (%):</label>
                    <input
                      type="number"
                      value={newCalculation.actualKpi}
                      onChange={(e) => setNewCalculation({ ...newCalculation, actualKpi: e.target.value })}
                      className={styles.formInput}
                      placeholder="95"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {/* Calculation Preview */}
                <div className={styles.calculationPreview}>
                  <h4>Hesablama Nəticəsi:</h4>
                  <div className={styles.previewGrid}>
                    <div className={styles.previewItem}>
                      <span>60% Hesablaması:</span>
                      <span>{((Number.parseFloat(newCalculation.superGross) || 0) * 0.6).toLocaleString()} AZN</span>
                    </div>
                    <div className={styles.previewItem}>
                      <span>15% Hesablaması:</span>
                      <span>
                        {(
                          ((Number.parseFloat(newCalculation.superGross) || 0) *
                            (Number.parseFloat(newCalculation.percentage15) || 0)) /
                          100
                        ).toLocaleString()}{" "}
                        AZN
                      </span>
                    </div>
                    <div className={styles.previewItem}>
                      <span>Koeficent:</span>
                      <span>
                        {(Number.parseFloat(newCalculation.actualKpi) || 0) >= 100
                          ? "1.0"
                          : (Number.parseFloat(newCalculation.actualKpi) || 0) >= 90
                            ? "0.9"
                            : (Number.parseFloat(newCalculation.actualKpi) || 0) >= 80
                              ? "0.8"
                              : (Number.parseFloat(newCalculation.actualKpi) || 0) >= 70
                                ? "0.7"
                                : "0"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.cancelButton} onClick={() => setShowCalculationModal(false)}>
                  Ləğv et
                </button>
                <button className={styles.saveButton} onClick={handleSaveCalculation}>
                  Yadda saxla
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
