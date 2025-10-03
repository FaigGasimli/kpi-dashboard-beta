"use client";

import { useState } from "react";
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

export default function FinancePage() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("Yanvar");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorYear, setCalculatorYear] = useState("2024");
  const [calculatorMonth, setCalculatorMonth] = useState("Yanvar");
  const [calculatorDepartment, setCalculatorDepartment] = useState("");
  const [savedCalculations, setSavedCalculations] = useState([]);

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
            {[
              {
                month: "Yan",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Fev",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Mar",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Apr",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "May",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "İyun",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "İyul",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Avq",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Sen",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Okt",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Noy",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
              {
                month: "Dek",
                superGross: 2000,
                basePercent: 60,
                actualKPI: 100,
              },
            ].map((row, index) => {
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

        {/* Performance System Section */}
        {renderPerformance()}

        {/* Performance Calculator Modal */}
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
      </div>
    </>
  );
}
