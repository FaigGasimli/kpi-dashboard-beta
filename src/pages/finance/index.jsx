"use client";

import { useState } from "react";
import styles from "./finance.module.css";
import Header from "../../components/header";

const monthlyPerformanceData = [
  {
    id: 1,
    percentage60: "60%",
    percentage15: 1,
    net: 2000,
    superGross: 2680,
    calculated60: 1608.0,
    calculated15: 268.0,
    kpiTarget: "100%",
    actualKpi: "90%",
    coefficient: 0.9,
    bonusAmount: 241,
    quarterlyPayment: 2241,
    quarter: 1,
  },
  {
    id: 2,
    percentage60: "60%",
    percentage15: 2,
    net: 2000,
    superGross: 2680,
    calculated60: 1608.0,
    calculated15: 268.0,
    kpiTarget: "100%",
    actualKpi: "80%",
    coefficient: 0.8,
    bonusAmount: 214,
    quarterlyPayment: 2214,
    quarter: 1,
  },
  {
    id: 3,
    percentage60: "60%",
    percentage15: 3,
    net: 2000,
    superGross: 2680,
    calculated60: 1608.0,
    calculated15: 268.0,
    kpiTarget: "100%",
    actualKpi: "95%",
    coefficient: 0.9,
    bonusAmount: 241,
    quarterlyPayment: 2241,
    quarter: 1,
  },
  {
    id: 4,
    percentage60: "60%",
    percentage15: 4,
    net: 2000,
    superGross: 2680,
    calculated60: 1608.0,
    calculated15: 268.0,
    kpiTarget: "100%",
    actualKpi: "100%",
    coefficient: 1.0,
    bonusAmount: 268,
    quarterlyPayment: 2268,
    quarter: 2,
  },
  {
    id: 5,
    percentage60: "60%",
    percentage15: 5,
    net: 2000,
    superGross: 2680,
    calculated60: 1608.0,
    calculated15: 268.0,
    kpiTarget: "100%",
    actualKpi: "85%",
    coefficient: 0.8,
    bonusAmount: 214,
    quarterlyPayment: 2214,
    quarter: 2,
  },
  {
    id: 6,
    percentage60: "60%",
    percentage15: 6,
    net: 2000,
    superGross: 2680,
    calculated60: 1608.0,
    calculated15: 268.0,
    kpiTarget: "100%",
    actualKpi: "75%",
    coefficient: 0.7,
    bonusAmount: 188,
    quarterlyPayment: 2188,
    quarter: 2,
  },
  {
    id: 7,
    percentage60: "60%",
    percentage15: 7,
    net: 2000,
    superGross: 2680,
    calculated60: 1608.0,
    calculated15: 268.0,
    kpiTarget: "100%",
    actualKpi: "92%",
    coefficient: 0.9,
    bonusAmount: 241,
    quarterlyPayment: 2241,
    quarter: 3,
  },
  {
    id: 8,
    percentage60: "60%",
    percentage15: 8,
    net: 2000,
    superGross: 2680,
    calculated60: 1608.0,
    calculated15: 268.0,
    kpiTarget: "100%",
    actualKpi: "88%",
    coefficient: 0.8,
    bonusAmount: 214,
    quarterlyPayment: 2214,
    quarter: 3,
  },
  {
    id: 9,
    percentage60: "60%",
    percentage15: 9,
    net: 2000,
    superGross: 2680,
    calculated60: 1608.0,
    calculated15: 268.0,
    kpiTarget: "100%",
    actualKpi: "96%",
    coefficient: 0.9,
    bonusAmount: 241,
    quarterlyPayment: 2241,
    quarter: 3,
  },
  {
    id: 10,
    percentage60: "60%",
    percentage15: 10,
    net: 2000,
    superGross: 2680,
    calculated60: 1608.0,
    calculated15: 268.0,
    kpiTarget: "100%",
    actualKpi: "100%",
    coefficient: 1.0,
    bonusAmount: 268,
    quarterlyPayment: 2268,
    quarter: 4,
  },
  {
    id: 11,
    percentage60: "60%",
    percentage15: 11,
    net: 2000,
    superGross: 2680,
    calculated60: 1608.0,
    calculated15: 268.0,
    kpiTarget: "100%",
    actualKpi: "87%",
    coefficient: 0.8,
    bonusAmount: 214,
    quarterlyPayment: 2214,
    quarter: 4,
  },
  {
    id: 12,
    percentage60: "60%",
    percentage15: 12,
    net: 2000,
    superGross: 2680,
    calculated60: 1608.0,
    calculated15: 268.0,
    kpiTarget: "100%",
    actualKpi: "93%",
    coefficient: 0.9,
    bonusAmount: 241,
    quarterlyPayment: 2241,
    quarter: 4,
  },
];

const performanceCriteria = [
  {
    description: "Hədəfə çatılmayıb, bonus hesablanmır",
    executionPercentage: "Менее 70%",
    coefficient: "0",
    bonus: "8%",
  },
  {
    description: "Qismən yerinə yetirilib",
    executionPercentage: "70% - 79%",
    coefficient: "0.7",
    bonus: "10%",
  },
  {
    description: "Hədəfə yaxınlaşma",
    executionPercentage: "80% - 89%",
    coefficient: "0.8",
    bonus: "12%",
  },
  {
    description: "Demək olar ki, hədəfə çatılıb",
    executionPercentage: "90% - 99%",
    coefficient: "0.9",
    bonus: "14%",
  },
  {
    description: "Hədəf tam yerinə yetirilib",
    executionPercentage: "100%",
    coefficient: "1",
    bonus: "15%",
  },
];

const summaryData = {
  totalNet: 24000,
  totalCalculated60: 19296,
  totalCalculated15: 3216,
  averageKpi: "87%",
  averageCoefficient: "0.9",
  totalBonus: 2525,
  totalQuarterlyPayment: 26525,
  quarterlyTotals: [696, 670, 696, 663],
};

const CalculatorIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="8" x2="16" y1="6" y2="6"></line>
    <line x1="16" x2="16" y1="14" y2="14"></line>
    <path d="m16 10 4 4-4 4"></path>
  </svg>
);

const TrendingUpIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
    <polyline points="16,7 22,7 22,13"></polyline>
  </svg>
);

const DollarSignIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="12" x2="12" y1="1" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const TargetIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7,10 12,15 17,10"></polyline>
    <line x1="12" x2="12" y1="15" y2="3"></line>
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
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
  </svg>
);

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="12" x2="12" y1="5" y2="19"></line>
    <line x1="5" x2="19" y1="12" y2="12"></line>
  </svg>
);

const XIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" x2="6" y1="6" y2="18"></line>
    <line x1="6" x2="18" y1="6" y2="18"></line>
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
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12,6 12,12 16,14"></polyline>
  </svg>
);

const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default function FinancePage() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedQuarter, setSelectedQuarter] = useState("Q1");
  const [showCalculationModal, setShowCalculationModal] = useState(false);
  const [newCalculation, setNewCalculation] = useState({
    net: "",
    superGross: "",
    percentage60: "60",
    percentage15: "",
    kpiTarget: "100",
    actualKpi: "",
  });

  // Filter data based on selected period
  const getFilteredData = () => {
    if (selectedPeriod === "yearly") {
      return monthlyPerformanceData;
    } else if (selectedPeriod === "quarterly") {
      const quarterNum = parseInt(selectedQuarter.replace("Q", ""));
      return monthlyPerformanceData.filter(
        (item) => item.quarter === quarterNum
      );
    } else {
      // Monthly - show all data
      return monthlyPerformanceData;
    }
  };

  const filteredData = getFilteredData();

  // Calculate quarterly totals
  const calculateQuarterlyTotals = () => {
    const quarterlyData = {};
    
    // Group data by quarters
    monthlyPerformanceData.forEach(item => {
      if (!quarterlyData[item.quarter]) {
        quarterlyData[item.quarter] = {
          quarter: item.quarter,
          totalQuarterlyPayment: 0,
          months: []
        };
      }
      quarterlyData[item.quarter].totalQuarterlyPayment += item.quarterlyPayment;
      quarterlyData[item.quarter].months.push(item);
    });

    return Object.values(quarterlyData).sort((a, b) => a.quarter - b.quarter);
  };

  // Calculate annual total
  const calculateAnnualTotal = () => {
    return monthlyPerformanceData.reduce((sum, item) => sum + item.quarterlyPayment, 0);
  };

  // Calculate totals for filtered data
  const calculateTotals = () => {
    const data = filteredData;
    const totalNet = data.reduce((sum, item) => sum + item.net, 0);
    const totalCalculated60 = data.reduce(
      (sum, item) => sum + item.calculated60,
      0
    );
    const totalCalculated15 = data.reduce(
      (sum, item) => sum + item.calculated15,
      0
    );
    const totalBonus = data.reduce((sum, item) => sum + item.bonusAmount, 0);
    const totalQuarterlyPayment = data.reduce(
      (sum, item) => sum + item.quarterlyPayment,
      0
    );
    const averageKpi =
      data.length > 0
        ? Math.round(
            data.reduce((sum, item) => sum + parseFloat(item.actualKpi), 0) /
              data.length
          )
        : 0;
    const averageCoefficient =
      data.length > 0
        ? (
            data.reduce((sum, item) => sum + item.coefficient, 0) / data.length
          ).toFixed(1)
        : 0;

    return {
      totalNet,
      totalCalculated60,
      totalCalculated15,
      totalBonus,
      totalQuarterlyPayment,
      averageKpi: `${averageKpi}%`,
      averageCoefficient: averageCoefficient.toString(),
    };
  };

  const currentTotals = calculateTotals();
  const quarterlyTotals = calculateQuarterlyTotals();
  const annualTotal = calculateAnnualTotal();

  const handleNewCalculation = () => {
    setShowCalculationModal(true);
  };

  const handleSaveCalculation = () => {
    const net = Number.parseFloat(newCalculation.net) || 0;
    const superGross =
      Number.parseFloat(newCalculation.superGross) || net * 1.34; // 2680/2000 = 1.34
    const percentage60 = Number.parseFloat(newCalculation.percentage60) / 100;
    const percentage15 = Number.parseFloat(newCalculation.percentage15) / 100;
    const actualKpi = Number.parseFloat(newCalculation.actualKpi) / 100;

    const calculated60 = superGross * percentage60;
    const calculated15 = superGross * percentage15;
    const coefficient =
      actualKpi >= 1
        ? 1.0
        : actualKpi >= 0.9
        ? 0.9
        : actualKpi >= 0.8
        ? 0.8
        : actualKpi >= 0.7
        ? 0.7
        : 0;
    const bonusAmount = calculated15 * coefficient;
    const quarterlyPayment = net + bonusAmount;

    console.log("Saving calculation:", {
      ...newCalculation,
      calculated60,
      calculated15,
      coefficient,
      bonusAmount,
      quarterlyPayment,
    });

    setShowCalculationModal(false);
    setNewCalculation({
      net: "",
      superGross: "",
      percentage60: "60",
      percentage15: "",
      kpiTarget: "100",
      actualKpi: "",
    });
  };

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
            <span>Dövr:</span>
            <select
              className={styles.filterSelect}
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="monthly">Aylıq</option>
              <option value="quarterly">Rüblük</option>
              <option value="yearly">İllik</option>
            </select>
          </div>
          {selectedPeriod === "quarterly" && (
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
          )}
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
              <div className={styles.cardValue}>
                {currentTotals.totalNet.toLocaleString()} AZN
              </div>
              <div className={styles.cardSubtext}>
                {selectedYear}{" "}
                {selectedPeriod === "quarterly"
                  ? selectedQuarter
                  : selectedPeriod === "yearly"
                  ? "İllik"
                  : "Aylıq"}
              </div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>60% Hesablaması</h3>
              <div className={styles.cardIcon}>
                <TrendingUpIcon />
              </div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>
                {currentTotals.totalCalculated60.toLocaleString()} AZN
              </div>
              <div className={styles.cardSubtext}>SUPER GROSS × 60%</div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>15% Hesablaması</h3>
              <div className={styles.cardIcon}>
                <TargetIcon />
              </div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>
                {currentTotals.totalCalculated15.toLocaleString()} AZN
              </div>
              <div className={styles.cardSubtext}>SUPER GROSS × 15%</div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Ümumi Bonus</h3>
              <div className={styles.cardIcon}>
                <CalculatorIcon />
              </div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>
                {currentTotals.totalBonus.toLocaleString()} AZN
              </div>
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
              <div className={styles.cardValue}>{currentTotals.averageKpi}</div>
              <div className={styles.cardSubtext}>Hədəf: 100%</div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Ümumi Ödəniş</h3>
              <div className={styles.cardIcon}>
                <CalculatorIcon />
              </div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>
                {currentTotals.totalQuarterlyPayment.toLocaleString()} AZN
              </div>
              <div className={styles.cardSubtext}>NET + Bonus</div>
            </div>
          </div>
        </div>

        {/* Statistics */}

        {/* Monthly Performance Table */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              Aylıq Performans və Hesablamalar
            </h3>
            <div className={styles.catalogActions}>
              <button
                className={styles.primaryButton}
                onClick={handleNewCalculation}
              >
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
                    <th>60%</th>
                    <th>15%</th>
                    <th>NET</th>
                    <th>SUPER GROSS</th>
                    <th className={styles.highlightColumn}>60%</th>
                    <th>15%</th>
                    <th>KPI Nədəf</th>
                    <th>Faktiki KPI</th>
                    <th>Koeficent</th>
                    <th>Mükafat</th>
                    <th className={styles.paymentColumn}>
                      KPI-lərin faktiki icrasına əsasən Kvartal ödənişi
                      hesablayırıq
                    </th>
                    <th>Rüb</th>
                    <th>İl</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={row.id}>
                      <td>{row.percentage60}</td>
                      <td>{row.percentage15}</td>
                      <td>{row.net.toLocaleString()}</td>
                      <td>{row.superGross.toLocaleString()}</td>
                      <td className={styles.highlightCell}>
                        {row.calculated60.toLocaleString()}
                      </td>
                      <td>{row.calculated15.toLocaleString()}</td>
                      <td>{row.kpiTarget}</td>
                      <td>{row.actualKpi}</td>
                      <td>{row.coefficient}</td>
                      <td>{row.bonusAmount.toLocaleString()}</td>
                      <td className={styles.paymentCell}>
                        {row.quarterlyPayment.toLocaleString()}
                      </td>
                      <td>{row.quarter}</td>
                      <td>{selectedYear}</td>
                    </tr>
                  ))}
                  
                  {/* Quarterly Summary Rows */}
                  {selectedPeriod === "yearly" && quarterlyTotals.map((quarterData, index) => (
                    <tr key={`quarter-${quarterData.quarter}`} className={styles.quarterlyRow}>
                      <td colSpan="10" className={styles.quarterlyLabel}>
                        Rüb {quarterData.quarter} - KPI-lərin faktiki icrasına əsasən Kvartal ödənişi (3 ay)
                      </td>
                      <td className={styles.quarterlyPaymentValue}>
                        {quarterData.totalQuarterlyPayment.toLocaleString()}
                      </td>
                      <td className={styles.quarterlyValue}>
                        {quarterData.quarter}
                      </td>
                      <td className={styles.quarterlyValue}>
                        {selectedYear}
                      </td>
                    </tr>
                  ))}
                  
                  {/* Annual Total Row */}
                  {selectedPeriod === "yearly" && (
                    <tr className={styles.annualRow}>
                      <td colSpan="10" className={styles.annualLabel}>
                        İllik - Ümumi hesabla qiymət
                      </td>
                      <td className={styles.annualPaymentValue}>
                        {annualTotal.toLocaleString()}
                      </td>
                      <td className={styles.annualValue}>
                        -
                      </td>
                      <td className={styles.annualValue}>
                        {selectedYear}
                      </td>
                    </tr>
                  )}
                  
                  {/* Regular Total Row for other periods */}
                  {selectedPeriod !== "yearly" && (
                    <tr className={styles.totalRow}>
                      <td className={styles.totalLabel}>Cəmi:</td>
                      <td></td>
                      <td className={styles.totalValue}>
                        {currentTotals.totalNet.toLocaleString()}
                      </td>
                      <td></td>
                      <td className={styles.totalValue}>
                        {currentTotals.totalCalculated60.toLocaleString()}
                      </td>
                      <td className={styles.totalValue}>
                        {currentTotals.totalCalculated15.toLocaleString()}
                      </td>
                      <td></td>
                      <td className={styles.totalValue}>
                        {currentTotals.averageKpi}
                      </td>
                      <td className={styles.totalValue}>
                        {currentTotals.averageCoefficient}
                      </td>
                      <td className={styles.totalValue}>
                        {currentTotals.totalBonus.toLocaleString()}
                      </td>
                      <td className={styles.totalPaymentValue}>
                        {currentTotals.totalQuarterlyPayment.toLocaleString()}
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Performance Criteria Table */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              Performans Kriteriyaları və Koeficentlər
            </h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.tableContainer}>
              <table className={styles.criteriaTable}>
                <thead>
                  <tr>
                    <th>İzahı</th>
                    <th>İcra Faizi</th>
                    <th>Koeficent</th>
                    <th>Mükafat</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceCriteria.map((criteria, index) => (
                    <tr
                      key={index}
                      className={
                        index === performanceCriteria.length - 1
                          ? styles.excellentRow
                          : ""
                      }
                    >
                      <td className={styles.descriptionCell}>
                        {criteria.description}
                      </td>
                      <td>{criteria.executionPercentage}</td>
                      <td>{criteria.coefficient}</td>
                      <td>{criteria.bonus}</td>
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
              <li>NET məbləğ = əsas maaş (2000 AZN)</li>
              <li>SUPER GROSS = NET + vergi və sosial ödənişlər (2680 AZN)</li>
              <li>60% hesablaması = SUPER GROSS × 60% (1608 AZN)</li>
              <li>15% hesablaması = SUPER GROSS × 15% (268 AZN)</li>
              <li>Bonus məbləği = 15% × KPI koeficenti</li>
              <li>Ümumi ödəniş = NET + Bonus məbləği</li>
              <li>Koeficent azaldıqca mükafatın faizi də azalır</li>
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h4>KPI Qiymətləndirməsi və Mükafat Faizləri</h4>
            <ul>
              <li>
                100% - Hədəf tam yerinə yetirilib (Koeficent: 1.0, Mükafat: 15%)
              </li>
              <li>
                90-99% - Demək olar ki, hədəfə çatılıb (Koeficent: 0.9, Mükafat:
                14%)
              </li>
              <li>80-89% - Hədəfə yaxınlaşma (Koeficent: 0.8, Mükafat: 12%)</li>
              <li>
                70-79% - Qismən yerinə yetirilib (Koeficent: 0.7, Mükafat: 10%)
              </li>
              <li>
                70%-dən az - Hədəfə çatılmayıb, bonus hesablanmır (Koeficent: 0,
                Mükafat: 8%)
              </li>
            </ul>
          </div>
        </div>

        {showCalculationModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h3>Yeni Hesablama Əlavə Et</h3>
                <button
                  className={styles.closeButton}
                  onClick={() => setShowCalculationModal(false)}
                >
                  <XIcon />
                </button>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>15% Dərəcəsi:</label>
                    <input
                      type="number"
                      value={newCalculation.percentage15}
                      onChange={(e) =>
                        setNewCalculation({
                          ...newCalculation,
                          percentage15: e.target.value,
                        })
                      }
                      className={styles.formInput}
                      placeholder="7"
                      min="1"
                      max="15"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>60% Dərəcəsi:</label>
                    <input
                      type="number"
                      value={newCalculation.percentage60}
                      onChange={(e) =>
                        setNewCalculation({
                          ...newCalculation,
                          percentage60: e.target.value,
                        })
                      }
                      className={styles.formInput}
                      placeholder="60"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>NET Məbləğ (AZN):</label>
                    <input
                      type="number"
                      value={newCalculation.net}
                      onChange={(e) =>
                        setNewCalculation({
                          ...newCalculation,
                          net: e.target.value,
                        })
                      }
                      className={styles.formInput}
                      placeholder="6000"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>SUPER GROSS (AZN):</label>
                    <input
                      type="number"
                      value={newCalculation.superGross}
                      onChange={(e) =>
                        setNewCalculation({
                          ...newCalculation,
                          superGross: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setNewCalculation({
                          ...newCalculation,
                          kpiTarget: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setNewCalculation({
                          ...newCalculation,
                          actualKpi: e.target.value,
                        })
                      }
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
                      <span>
                        {(
                          (Number.parseFloat(newCalculation.superGross) || 0) *
                          ((Number.parseFloat(newCalculation.percentage60) ||
                            60) /
                            100)
                        ).toLocaleString()}{" "}
                        AZN
                      </span>
                    </div>
                    <div className={styles.previewItem}>
                      <span>15% Hesablaması:</span>
                      <span>
                        {(
                          ((Number.parseFloat(newCalculation.superGross) || 0) *
                            (Number.parseFloat(newCalculation.percentage15) ||
                              0)) /
                          100
                        ).toLocaleString()}{" "}
                        AZN
                      </span>
                    </div>
                    <div className={styles.previewItem}>
                      <span>Koeficent:</span>
                      <span>
                        {(Number.parseFloat(newCalculation.actualKpi) || 0) >=
                        100
                          ? "1.0"
                          : (Number.parseFloat(newCalculation.actualKpi) ||
                              0) >= 90
                          ? "0.9"
                          : (Number.parseFloat(newCalculation.actualKpi) ||
                              0) >= 80
                          ? "0.8"
                          : (Number.parseFloat(newCalculation.actualKpi) ||
                              0) >= 70
                          ? "0.7"
                          : "0"}
                      </span>
                    </div>
                    <div className={styles.previewItem}>
                      <span>Bonus Məbləği:</span>
                      <span>
                        {(
                          (((Number.parseFloat(newCalculation.superGross) ||
                            0) *
                            (Number.parseFloat(newCalculation.percentage15) ||
                              0)) /
                            100) *
                          ((Number.parseFloat(newCalculation.actualKpi) || 0) >=
                          100
                            ? 1.0
                            : (Number.parseFloat(newCalculation.actualKpi) ||
                                0) >= 90
                            ? 0.9
                            : (Number.parseFloat(newCalculation.actualKpi) ||
                                0) >= 80
                            ? 0.8
                            : (Number.parseFloat(newCalculation.actualKpi) ||
                                0) >= 70
                            ? 0.7
                            : 0)
                        ).toLocaleString()}{" "}
                        AZN
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowCalculationModal(false)}
                >
                  Ləğv et
                </button>
                <button
                  className={styles.saveButton}
                  onClick={handleSaveCalculation}
                >
                  Yadda saxla
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
