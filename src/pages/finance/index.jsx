"use client";

import { useMemo, useState } from "react";
import styles from "./finance.module.css";
import Header from "../../components/header";
import PerformanceCalculator from "../shr/employees/PerformanceCalculator";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

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
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("Yanvar");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorYear, setCalculatorYear] = useState("2025");
  const [calculatorMonth, setCalculatorMonth] = useState("Yanvar");
  const [calculatorDepartment, setCalculatorDepartment] = useState("");
  const [savedCalculations, setSavedCalculations] = useState([]);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [selectedSummaryCard, setSelectedSummaryCard] = useState(null);
  const showPerformance = false; // hide Komplayens table and calculator for now

  // Monthly data used across the page (table + statistics)
  const monthlyData = useMemo(
    () => [
      { month: "Yan", superGross: 2000, basePercent: 60, actualKPI: 100, expenses: 1200, revenue: 3500 },
      { month: "Fev", superGross: 2200, basePercent: 60, actualKPI: 105, expenses: 1350, revenue: 3800 },
      { month: "Mar", superGross: 2100, basePercent: 60, actualKPI: 98, expenses: 1280, revenue: 3600 },
      { month: "Apr", superGross: 2300, basePercent: 60, actualKPI: 110, expenses: 1400, revenue: 4000 },
      { month: "May", superGross: 2400, basePercent: 60, actualKPI: 115, expenses: 1450, revenue: 4200 },
      { month: "İyun", superGross: 2500, basePercent: 60, actualKPI: 120, expenses: 1500, revenue: 4500 },
      { month: "İyul", superGross: 2600, basePercent: 60, actualKPI: 125, expenses: 1550, revenue: 4800 },
      { month: "Avq", superGross: 2400, basePercent: 60, actualKPI: 112, expenses: 1420, revenue: 4100 },
      { month: "Sen", superGross: 2700, basePercent: 60, actualKPI: 130, expenses: 1600, revenue: 5000 },
      { month: "Okt", superGross: 2800, basePercent: 60, actualKPI: 135, expenses: 1650, revenue: 5200 },
      { month: "Noy", superGross: 2900, basePercent: 60, actualKPI: 140, expenses: 1700, revenue: 5500 },
      { month: "Dek", superGross: 3000, basePercent: 60, actualKPI: 145, expenses: 1750, revenue: 5800 },
    ],
    []
  );


  // Quarterly comparison data
  const quarterlyData = useMemo(
    () => [
      { quarter: "Q1 2025", revenue: 10900, expenses: 3830, profit: 7070 },
      { quarter: "Q2 2025", revenue: 12700, expenses: 4370, profit: 8330 },
      { quarter: "Q3 2025", revenue: 13900, expenses: 4570, profit: 9330 },
      { quarter: "Q4 2025", revenue: 16500, expenses: 5100, profit: 11400 },
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
    "Komplayens Monitorinq Şöbəsi",
    "ƏL/TMM üzrə Analitika şöbəsi",
    "Məlumatların emali və Hesabatlıq şöbəsi", 
  ];

  const handleCalculatorSave = (calculationData) => {
    setSavedCalculations(prev => [...prev, calculationData]);
  };

  const handleSummaryCardClick = (cardType) => {
    setSelectedSummaryCard(cardType);
    setSummaryModalOpen(true);
  };

  const closeSummaryModal = () => {
    setSummaryModalOpen(false);
    setSelectedSummaryCard(null);
  };

  // Summary card details for each type
  const getSummaryCardDetails = (cardType) => {
    switch (cardType) {
      case 'totalSuperGross':
        return {
          title: 'Ümumi NET Məbləğ - Ətraflı Analiz',
          description: 'Bütün aylar üzrə ümumi super gross məbləğinin ətraflı hesablaması',
          data: monthlyData.map(item => ({
            month: item.month,
            superGross: item.superGross,
            baseAmount: (item.superGross * item.basePercent) / 100,
            bonusAmount: ((item.superGross * item.basePercent) / 100) * 0.15,
            totalPayment: (item.superGross * item.basePercent) / 100 + (((item.superGross * item.basePercent) / 100) * 0.15)
          })),
          summary: {
            totalSuperGross: monthlyData.reduce((sum, item) => sum + item.superGross, 0),
            avgSuperGross: (monthlyData.reduce((sum, item) => sum + item.superGross, 0) / monthlyData.length).toFixed(0),
            maxSuperGross: Math.max(...monthlyData.map(item => item.superGross)),
            minSuperGross: Math.min(...monthlyData.map(item => item.superGross))
          }
        };
      case 'totalBase':
        return {
          title: '60% Hesablaması - Ətraflı Analiz',
          description: 'Super gross məbləğinin 60%-inin ətraflı hesablaması',
          data: monthlyData.map(item => ({
            month: item.month,
            superGross: item.superGross,
            basePercent: item.basePercent,
            baseAmount: (item.superGross * item.basePercent) / 100,
            percentage: `${item.basePercent}%`
          })),
          summary: {
            totalBase: monthlyData.reduce((sum, item) => sum + (item.superGross * item.basePercent) / 100, 0),
            avgBase: (monthlyData.reduce((sum, item) => sum + (item.superGross * item.basePercent) / 100, 0) / monthlyData.length).toFixed(0),
            maxBase: Math.max(...monthlyData.map(item => (item.superGross * item.basePercent) / 100)),
            minBase: Math.min(...monthlyData.map(item => (item.superGross * item.basePercent) / 100))
          }
        };
      case 'totalBonus':
        return {
          title: '15% Hesablaması - Ətraflı Analiz',
          description: 'Baza məbləğinin 15%-i olan bonus hesablaması',
          data: monthlyData.map(item => ({
            month: item.month,
            baseAmount: (item.superGross * item.basePercent) / 100,
            bonusPercent: '15%',
            bonusAmount: ((item.superGross * item.basePercent) / 100) * 0.15,
            kpi: item.actualKPI
          })),
          summary: {
            totalBonus: monthlyData.reduce((sum, item) => sum + ((item.superGross * item.basePercent) / 100) * 0.15, 0),
            avgBonus: (monthlyData.reduce((sum, item) => sum + ((item.superGross * item.basePercent) / 100) * 0.15, 0) / monthlyData.length).toFixed(0),
            maxBonus: Math.max(...monthlyData.map(item => ((item.superGross * item.basePercent) / 100) * 0.15)),
            minBonus: Math.min(...monthlyData.map(item => ((item.superGross * item.basePercent) / 100) * 0.15))
          }
        };
      case 'avgKpi':
        return {
          title: 'Orta KPI Nəticəsi - Ətraflı Analiz',
          description: 'Aylıq KPI nəticələrinin ətraflı analizi',
          data: monthlyData.map(item => ({
            month: item.month,
            kpi: item.actualKPI,
            target: 100,
            performance: item.actualKPI >= 100 ? 'Hədəfə çatıb' : 'Hədəfdən aşağı',
            difference: item.actualKPI - 100
          })),
          summary: {
            avgKpi: (monthlyData.reduce((sum, item) => sum + item.actualKPI, 0) / monthlyData.length).toFixed(1),
            maxKpi: Math.max(...monthlyData.map(item => item.actualKPI)),
            minKpi: Math.min(...monthlyData.map(item => item.actualKPI)),
            targetAchieved: monthlyData.filter(item => item.actualKPI >= 100).length,
            targetMissed: monthlyData.filter(item => item.actualKPI < 100).length
          }
        };
      case 'totalPayment':
        return {
          title: 'Ümumi Ödəniş - Ətraflı Analiz',
          description: 'Baza məbləğ + bonus hesablamasının ətraflı analizi',
          data: monthlyData.map(item => ({
            month: item.month,
            baseAmount: (item.superGross * item.basePercent) / 100,
            bonusAmount: ((item.superGross * item.basePercent) / 100) * 0.15,
            totalPayment: (item.superGross * item.basePercent) / 100 + (((item.superGross * item.basePercent) / 100) * 0.15),
            kpi: item.actualKPI
          })),
          summary: {
            totalPayment: monthlyData.reduce((sum, item) => sum + ((item.superGross * item.basePercent) / 100) + (((item.superGross * item.basePercent) / 100) * 0.15), 0),
            avgPayment: (monthlyData.reduce((sum, item) => sum + ((item.superGross * item.basePercent) / 100) + (((item.superGross * item.basePercent) / 100) * 0.15), 0) / monthlyData.length).toFixed(0),
            maxPayment: Math.max(...monthlyData.map(item => (item.superGross * item.basePercent) / 100 + (((item.superGross * item.basePercent) / 100) * 0.15))),
            minPayment: Math.min(...monthlyData.map(item => (item.superGross * item.basePercent) / 100 + (((item.superGross * item.basePercent) / 100) * 0.15)))
          }
        };
      default:
        return null;
    }
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
              <option value="2025">2024</option>
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
          <div className={styles.summaryCard} onClick={() => handleSummaryCardClick('totalSuperGross')}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Ümumi NET Məbləğ</h3>
              <div className={styles.cardIcon}><DollarSignIcon /></div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{stats.formatCurrency(stats.totalSuperGross)}</div>
              <div className={styles.cardSubtext}>{selectedYear} Aylıq</div>
            </div>
          </div>

          <div className={styles.summaryCard} onClick={() => handleSummaryCardClick('totalBase')}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>60% Hesablaması</h3>
              <div className={styles.cardIcon}><TrendingUpIcon /></div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{stats.formatCurrency(stats.totalBase)}</div>
              <div className={styles.cardSubtext}>SUPER GROSS × 60%</div>
            </div>
          </div>

          <div className={styles.summaryCard} onClick={() => handleSummaryCardClick('totalBonus')}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>15% Hesablaması</h3>
              <div className={styles.cardIcon}><TargetIcon /></div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{stats.formatCurrency(stats.totalBonus)}</div>
              <div className={styles.cardSubtext}>SUPER GROSS × 15%</div>
            </div>
          </div>

          <div className={styles.summaryCard} onClick={() => handleSummaryCardClick('totalBonus')}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Ümumi Bonus</h3>
              <div className={styles.cardIcon}><CalculatorIcon /></div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{stats.formatCurrency(stats.totalBonus)}</div>
              <div className={styles.cardSubtext}>KPI əsaslı hesablanmış</div>
            </div>
          </div>

          <div className={styles.summaryCard} onClick={() => handleSummaryCardClick('avgKpi')}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Orta KPI Nəticəsi</h3>
              <div className={styles.cardIcon}><TargetIcon /></div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardValue}>{`${stats.avgKpi.toFixed(0)}%`}</div>
              <div className={styles.cardSubtext}>Hədəf: 100%</div>
            </div>
          </div>

          <div className={styles.summaryCard} onClick={() => handleSummaryCardClick('totalPayment')}>
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

        {/* Charts Section */}
        <div className={styles.chartsSection}>
          <div className={styles.chartsGrid}>
            {/* Monthly Revenue Trend Chart */}
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Aylıq Gəlir Trendi</h3>
                <p className={styles.chartSubtitle}>2025 illik gəlir və xərc analizi</p>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#64748b"
                      fontSize={12}
                      tickFormatter={(value) => `${value}K`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        `${value.toLocaleString()} AZN`, 
                        name === 'revenue' ? 'Gəlir' : 'Xərc'
                      ]}
                      labelStyle={{ color: '#374151' }}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                      name="Gəlir"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stackId="2"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.6}
                      name="Xərc"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>


            {/* KPI Performance Line Chart */}
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>KPI Performansı</h3>
                <p className={styles.chartSubtitle}>Aylıq KPI nəticələri</p>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#64748b"
                      fontSize={12}
                      domain={[90, 150]}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'KPI']}
                      labelStyle={{ color: '#374151' }}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="actualKPI"
                      stroke="#996f29"
                      strokeWidth={3}
                      dot={{ fill: '#996f29', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#996f29', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quarterly Comparison Bar Chart */}
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Rüblük Müqayisə</h3>
                <p className={styles.chartSubtitle}>Gəlir, xərc və mənfəət</p>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={quarterlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="quarter" 
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#64748b"
                      fontSize={12}
                      tickFormatter={(value) => `${value}K`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        `${value.toLocaleString()} AZN`, 
                        name === 'revenue' ? 'Gəlir' : 
                        name === 'expenses' ? 'Xərc' : 'Mənfəət'
                      ]}
                      labelStyle={{ color: '#374151' }}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="#10b981" name="Gəlir" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Xərc" />
                    <Bar dataKey="profit" fill="#996f29" name="Mənfəət" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
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

        {/* Summary Card Details Modal */}
        {summaryModalOpen && selectedSummaryCard && (
          <div className={styles.modalOverlay} onClick={closeSummaryModal}>
            <div className={styles.summaryModal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>
                  {getSummaryCardDetails(selectedSummaryCard)?.title}
                </h3>
                <button className={styles.closeButton} onClick={closeSummaryModal}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className={styles.modalContent}>
                {selectedSummaryCard && getSummaryCardDetails(selectedSummaryCard) && (
                  <>
                    {/* Description */}
                    <div className={styles.modalDescription}>
                      <p>{getSummaryCardDetails(selectedSummaryCard).description}</p>
                    </div>

                    {/* Summary Statistics */}
                    <div className={styles.summaryStats}>
                      <h4>Ümumi Statistikalar</h4>
                      <div className={styles.statsGrid}>
                        {selectedSummaryCard === 'totalSuperGross' && (
                          <>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Ümumi Super Gross:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.totalSuperGross.toLocaleString()} AZN
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Orta Super Gross:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.avgSuperGross} AZN
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Ən Yüksək Super Gross:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.maxSuperGross} AZN
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Ən Aşağı Super Gross:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.minSuperGross} AZN
                              </span>
                            </div>
                          </>
                        )}
                        {selectedSummaryCard === 'totalBase' && (
                          <>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Ümumi Baza Məbləğ:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.totalBase.toLocaleString()} AZN
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Orta Baza Məbləğ:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.avgBase} AZN
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Ən Yüksək Baza:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.maxBase.toLocaleString()} AZN
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Ən Aşağı Baza:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.minBase.toLocaleString()} AZN
                              </span>
                            </div>
                          </>
                        )}
                        {selectedSummaryCard === 'totalBonus' && (
                          <>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Ümumi Bonus:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.totalBonus.toLocaleString()} AZN
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Orta Bonus:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.avgBonus} AZN
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Ən Yüksək Bonus:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.maxBonus.toLocaleString()} AZN
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Ən Aşağı Bonus:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.minBonus.toLocaleString()} AZN
                              </span>
                            </div>
                          </>
                        )}
                        {selectedSummaryCard === 'avgKpi' && (
                          <>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Orta KPI:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.avgKpi}%
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Ən Yüksək KPI:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.maxKpi}%
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Ən Aşağı KPI:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.minKpi}%
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Hədəfə Çatan Aylar:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.targetAchieved}/12
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Hədəfdən Aşağı Aylar:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.targetMissed}/12
                              </span>
                            </div>
                          </>
                        )}
                        {selectedSummaryCard === 'totalPayment' && (
                          <>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Ümumi Ödəniş:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.totalPayment.toLocaleString()} AZN
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Orta Ödəniş:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.avgPayment} AZN
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Ən Yüksək Ödəniş:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.maxPayment.toLocaleString()} AZN
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <span className={styles.statLabel}>Ən Aşağı Ödəniş:</span>
                              <span className={styles.statValue}>
                                {getSummaryCardDetails(selectedSummaryCard).summary.minPayment.toLocaleString()} AZN
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Detailed Table */}
                    <div className={styles.detailedTable}>
                      <h4>Ətraflı Məlumatlar</h4>
                      <div className={styles.tableContainer}>
                        <table className={styles.detailsTable}>
                          <thead>
                            <tr>
                              {selectedSummaryCard === 'totalSuperGross' && (
                                <>
                                  <th>Ay</th>
                                  <th>Super Gross (AZN)</th>
                                  <th>Baza Məbləğ (AZN)</th>
                                  <th>Bonus Məbləğ (AZN)</th>
                                  <th>Ümumi Ödəniş (AZN)</th>
                                </>
                              )}
                              {selectedSummaryCard === 'totalBase' && (
                                <>
                                  <th>Ay</th>
                                  <th>Super Gross (AZN)</th>
                                  <th>Baza %</th>
                                  <th>Baza Məbləğ (AZN)</th>
                                </>
                              )}
                              {selectedSummaryCard === 'totalBonus' && (
                                <>
                                  <th>Ay</th>
                                  <th>Baza Məbləğ (AZN)</th>
                                  <th>Bonus %</th>
                                  <th>Bonus Məbləğ (AZN)</th>
                                  <th>KPI (%)</th>
                                </>
                              )}
                              {selectedSummaryCard === 'avgKpi' && (
                                <>
                                  <th>Ay</th>
                                  <th>KPI (%)</th>
                                  <th>Hədəf (%)</th>
                                  <th>Performans</th>
                                  <th>Fərq (%)</th>
                                </>
                              )}
                              {selectedSummaryCard === 'totalPayment' && (
                                <>
                                  <th>Ay</th>
                                  <th>Baza Məbləğ (AZN)</th>
                                  <th>Bonus Məbləğ (AZN)</th>
                                  <th>Ümumi Ödəniş (AZN)</th>
                                  <th>KPI (%)</th>
                                </>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {getSummaryCardDetails(selectedSummaryCard).data.map((item, index) => (
                              <tr key={index}>
                                {selectedSummaryCard === 'totalSuperGross' && (
                                  <>
                                    <td>{item.month}</td>
                                    <td>{item.superGross.toLocaleString()}</td>
                                    <td>{item.baseAmount.toLocaleString()}</td>
                                    <td>{item.bonusAmount.toLocaleString()}</td>
                                    <td>{item.totalPayment.toLocaleString()}</td>
                                  </>
                                )}
                                {selectedSummaryCard === 'totalBase' && (
                                  <>
                                    <td>{item.month}</td>
                                    <td>{item.superGross.toLocaleString()}</td>
                                    <td>{item.percentage}</td>
                                    <td>{item.baseAmount.toLocaleString()}</td>
                                  </>
                                )}
                                {selectedSummaryCard === 'totalBonus' && (
                                  <>
                                    <td>{item.month}</td>
                                    <td>{item.baseAmount.toLocaleString()}</td>
                                    <td>{item.bonusPercent}</td>
                                    <td>{item.bonusAmount.toLocaleString()}</td>
                                    <td>{item.kpi}%</td>
                                  </>
                                )}
                                {selectedSummaryCard === 'avgKpi' && (
                                  <>
                                    <td>{item.month}</td>
                                    <td>{item.kpi}%</td>
                                    <td>{item.target}%</td>
                                    <td>
                                      <span className={`${styles.performanceBadge} ${item.performance === 'Hədəfə çatıb' ? styles.good : styles.poor}`}>
                                        {item.performance}
                                      </span>
                                    </td>
                                    <td>{item.difference > 0 ? '+' : ''}{item.difference}%</td>
                                  </>
                                )}
                                {selectedSummaryCard === 'totalPayment' && (
                                  <>
                                    <td>{item.month}</td>
                                    <td>{item.baseAmount.toLocaleString()}</td>
                                    <td>{item.bonusAmount.toLocaleString()}</td>
                                    <td>{item.totalPayment.toLocaleString()}</td>
                                    <td>{item.kpi}%</td>
                                  </>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
