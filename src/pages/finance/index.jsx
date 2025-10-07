"use client";

import { useMemo, useState } from "react";
import styles from "./finance.module.css";
import Header from "../../components/header";
import PerformanceCalculator from "../shr/employees/PerformanceCalculator";

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

export default function FinancePage() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("Yanvar");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorYear, setCalculatorYear] = useState("2024");
  const [calculatorMonth, setCalculatorMonth] = useState("Yanvar");
  const [calculatorDepartment, setCalculatorDepartment] = useState("");
  const [savedCalculations, setSavedCalculations] = useState([]);
  const showPerformance = false; // hide Komplayens table and calculator for now

  // Monthly data used across the page (table + statistics)
  const monthlyData = useMemo(
    () => [
      { month: "Yan", superGross: 2000, basePercent: 60, actualKPI: 100 },
      { month: "Fev", superGross: 2000, basePercent: 60, actualKPI: 100 },
      { month: "Mar", superGross: 2000, basePercent: 60, actualKPI: 100 },
      { month: "Apr", superGross: 2000, basePercent: 60, actualKPI: 100 },
      { month: "May", superGross: 2000, basePercent: 60, actualKPI: 100 },
      { month: "İyun", superGross: 2000, basePercent: 60, actualKPI: 100 },
      { month: "İyul", superGross: 2000, basePercent: 60, actualKPI: 100 },
      { month: "Avq", superGross: 2000, basePercent: 60, actualKPI: 100 },
      { month: "Sen", superGross: 2000, basePercent: 60, actualKPI: 100 },
      { month: "Okt", superGross: 2000, basePercent: 60, actualKPI: 100 },
      { month: "Noy", superGross: 2000, basePercent: 60, actualKPI: 100 },
      { month: "Dek", superGross: 2000, basePercent: 60, actualKPI: 100 },
    ],
    []
  );

  // Top statistics calculations
  const stats = useMemo(() => {
    const totalSuperGross = monthlyData.reduce((sum, r) => sum + r.superGross, 0);
    const totalBase = monthlyData.reduce(
      (sum, r) => sum + (r.superGross * r.basePercent) / 100,
      0
    );
    const totalBonus = monthlyData.reduce(
      (sum, r) => sum + ((r.superGross * r.basePercent) / 100) * 0.15,
      0
    );
    const avgKpi =
      monthlyData.reduce((sum, r) => sum + r.actualKPI, 0) / monthlyData.length;
    const totalPayment = totalBase + totalBonus;

    const formatCurrency = (v) =>
      `${v.toLocaleString("az-AZ", { minimumFractionDigits: 0 })} AZN`;

    return {
      totalSuperGross,
      totalBase,
      totalBonus,
      avgKpi,
      totalPayment,
      formatCurrency,
    };
  }, [monthlyData]);

  // Sample departments data
  const departments = [
    "İnsan Resursları",
    "Maliyyə",
    "Texniki Dəstək", 
    "KPI",
    "Tapşırıq İdarəetmə",
    "İstifadəçi Rolları",
    "Risk İdarəetmə",
    "Müştəri Xidmətləri",
    "Hüquq"
  ];

  const handleCalculatorSave = (calculationData) => {
    setSavedCalculations(prev => [...prev, calculationData]);
  };

  const renderPerformance = () => (
    <div className={styles.performanceSection}>
      <div className={styles.performanceHeader}>
        <div className={styles.performanceTitleSection}>
          <h2>Komplayens departamenti üzrə mükafatlandırılma sistemi</h2>
          <button
            className={styles.calculatorBtn}
            onClick={() => setIsCalculatorOpen(true)}
          >
            <CalculatorIcon />
            Mükafatlandırma Kalkulyatoru
          </button>
        </div>
        <p className={styles.performanceDescription}>
          Aylıq KPI nəticələrinə və baza faizinə görə mükafat məbləğini
          hesablayın.
        </p>
      </div>

      <div className={styles.bonusCalculatorContainer}>
        <table className={styles.bonusCalculatorTable}>
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
            {monthlyData.map((row, index) => {
              const baseAmount = (row.superGross * row.basePercent) / 100;
              const band = "A";
              const coefficient = 1;
              const bonusPercent = "15%";
              const bonusAmount = (baseAmount * 15) / 100;

              return (
                <tr key={index}>
                  <td className={styles.monthCell}>{row.month}</td>
                  <td className={styles.dataCell}>{row.superGross}</td>
                  <td className={styles.dataCell}>{row.basePercent}</td>
                  <td className={styles.calculatedCell}>
                    {baseAmount.toLocaleString("az-AZ", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    ₼
                  </td>
                  <td className={styles.dataCell}>{row.actualKPI}</td>
                  <td className={styles.calculatedCell}>{band}</td>
                  <td className={styles.calculatedCell}>{coefficient}</td>
                  <td className={styles.calculatedCell}>{bonusPercent}</td>
                  <td className={styles.calculatedCell}>
                    {bonusAmount.toLocaleString("az-AZ", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    ₼
                  </td>
                </tr>
              );
            })}
            <tr className={styles.summaryRow}>
              <td className={styles.summaryLabel}>Orta KPI</td>
              <td colSpan="7"></td>
              <td className={styles.summaryValue}>100.0%</td>
            </tr>
            <tr className={styles.summaryRow}>
              <td className={styles.summaryLabel}>İllik cəm mükafat</td>
              <td colSpan="7"></td>
              <td className={styles.summaryValue}>2.160,00 ₼</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      <Header title="Maliyyə İdarəetmə Sistemi" />
      <div className={styles.container}>
        {/* Filters (moved to top) */}
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
            <span>Ay:</span>
            <select
              className={styles.filterSelect}
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="Yanvar">Yanvar</option>
              <option value="Fevral">Fevral</option>
              <option value="Mart">Mart</option>
              <option value="Aprel">Aprel</option>
              <option value="May">May</option>
              <option value="İyun">İyun</option>
              <option value="İyul">İyul</option>
              <option value="Avqust">Avqust</option>
              <option value="Sentyabr">Sentyabr</option>
              <option value="Oktyabr">Oktyabr</option>
              <option value="Noyabr">Noyabr</option>
              <option value="Dekabr">Dekabr</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <span>Şöbə:</span>
            <select
              className={styles.filterSelect}
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Bütün şöbələr</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Ümumi NET Məbləğ</h3>
              <div className={styles.cardIcon}><DollarSignIcon /></div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{stats.formatCurrency(stats.totalSuperGross)}</div>
              <div className={styles.cardSubtext}>{selectedYear} Aylıq</div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>60% Hesablaması</h3>
              <div className={styles.cardIcon}><TrendingUpIcon /></div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{stats.formatCurrency(stats.totalBase)}</div>
              <div className={styles.cardSubtext}>SUPER GROSS × 60%</div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>15% Hesablaması</h3>
              <div className={styles.cardIcon}><TargetIcon /></div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{stats.formatCurrency(stats.totalBonus)}</div>
              <div className={styles.cardSubtext}>SUPER GROSS × 15%</div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Ümumi Bonus</h3>
              <div className={styles.cardIcon}><CalculatorIcon /></div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{stats.formatCurrency(stats.totalBonus)}</div>
              <div className={styles.cardSubtext}>KPI əsaslı hesablanmış</div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Orta KPI Nəticəsi</h3>
              <div className={styles.cardIcon}><TargetIcon /></div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{`${stats.avgKpi.toFixed(0)}%`}</div>
              <div className={styles.cardSubtext}>Hədəf: 100%</div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Ümumi Ödəniş</h3>
              <div className={styles.cardIcon}><CalculatorIcon /></div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{stats.formatCurrency(stats.totalPayment)}</div>
              <div className={styles.cardSubtext}>NET + Bonus</div>
            </div>
          </div>
        </div>

        {/* Performance System Section (hidden) */}
        {showPerformance && renderPerformance()}

        {/* Performance Calculator Modal (hidden) */}
        {showPerformance && (
          <PerformanceCalculator
            isOpen={isCalculatorOpen}
            onClose={() => setIsCalculatorOpen(false)}
            onSave={handleCalculatorSave}
            selectedYear={calculatorYear}
            selectedMonth={calculatorMonth}
            selectedDepartment={calculatorDepartment}
            onYearChange={setCalculatorYear}
            onMonthChange={setCalculatorMonth}
            onDepartmentChange={setCalculatorDepartment}
          />
        )}
      </div>
    </>
  );
}
