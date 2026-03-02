"use client";

import { useState } from "react";
import {
  ArrowLeft,
  User,
  Calendar,
  Building2,
  TrendingUp,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Search,
  Plus,
  Edit3,
  Filter,
  ChevronDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import styles from "./EmployeeProfile.module.css";

const EmployeeKPIProfile = ({ employee, onBack }) => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedPeriod, setSelectedPeriod] = useState("aylıq");
  const [selectedModule, setSelectedModule] = useState("Hamısı");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  // Sample trend data
  const trendData = [
    { month: "Yan", fakt: 85, hedef: 90 },
    { month: "Fev", fakt: 88, hedef: 90 },
    { month: "Mar", fakt: 92, hedef: 90 },
    { month: "Apr", fakt: 87, hedef: 90 },
    { month: "May", fakt: 94, hedef: 90 },
    { month: "İyn", fakt: 91, hedef: 90 },
  ];

  // Strong KPIs data
  const strongKPIs = [
    { name: "Müştəri Məmnuniyyəti", value: 95 },
    { name: "Vaxt İdarəetməsi", value: 92 },
    { name: "Komanda İşi", value: 89 },
  ];

  // Weak KPIs data
  const weakKPIs = [
    { name: "Risk İdarəetməsi", value: 65 },
    { name: "İnnovasiya", value: 68 },
    { name: "Texniki Bilik", value: 72 },
  ];

  // Module distribution data
  const moduleData = [
    { name: "CE", value: 35, color: "#3b82f6" },
    { name: "MH", value: 25, color: "#4b5563" },
    { name: "AML", value: 25, color: "#f59e0b" },
    { name: "AU", value: 15, color: "#ef4444" },
  ];

  // KPI Results Table Data
  const kpiResults = [
    {
      id: 1,
      vazifeTelimatlari: "Monitorinq planının icra",
      teyyinat: "cari il",
      status: "Davam edir",
      icraTezliyi: "Aylıq",
      vazifeMesuliyyeti: "Şöbə rəisi, Direktor, CRO",
      isProseduralari: "Planlaşdırma → Monitoring → Hesabat → Geri dönüş",
      isProseduru:
        "Bankdaxili proses və analitikalarla əsasən və monitorinqlərin aparılması qaydaları",
      agirDereceleri: "100%",
      digerSobe: "85%",
      digerSobe2: "90%",
      digerSobe3: null,
      filial: "92%",
      filial2: "88%",
      filial3: null,
      netice: "88.3%",
      fakt: 95,
      isEmpty: false,
    },
    {
      id: 2,
      vazifeTelimatlari: "Yeni məhsul və prosedurların monitorinqu",
      teyyinat: "sərbəst zəmanla",
      status: "Bitib",
      icraTezliyi: "Rüblük",
      vazifeMesuliyyeti: "Şöbə rəisi, Direktor, CRO",
      isProseduralari:
        "Adliyyat struktur bölməsinin müraciətin daxil olması → rəhbərlik razılaşdırılması →Rəyin verilməsi",
      isProseduru: "Yeni məhsullara Kompleyens Rəyinin verilməsi",
      agirDereceleri: "100%",
      digerSobe: "78%",
      digerSobe2: "82%",
      digerSobe3: "85%",
      filial: "85%",
      filial2: "80%",
      filial3: "88%",
      netice: "84.3%",
      fakt: 88,
      isEmpty: false,
    },
    {
      id: 3,
      vazifeTelimatlari: "Mərcə müraciətin icra rəy verilməsi",
      teyyinat: "sərbəst zəmanla",
      status: "Gözləmədədir",
      icraTezliyi: "İllik",
      vazifeMesuliyyeti: "Şöbə rəisi, Direktor, CRO",
      isProseduralari:
        "Adliyyat struktur bölməsinin müraciətin daxil olması → rəhbərlik razılaşdırılması →Rəyin verilməsi",
      isProseduru: "Mərcə müraciətin təsnimatının proseduru və Siyasəti",
      agirDereceleri: "100%",
      digerSobe: null,
      digerSobe2: null,
      digerSobe3: null,
      filial: null,
      filial2: null,
      filial3: null,
      netice: null,
      fakt: null,
      isEmpty: true,
    },
    {
      id: 4,
      vazifeTelimatlari: "KİES icra nəzarət-rəhbərliyin hesabatı",
      teyyinat: "Hesabat",
      status: "Davam edir",
      icraTezliyi: "Rüblük",
      vazifeMesuliyyeti: "Şöbə rəisi, Direktor, CRO",
      isProseduralari:
        "Adliyyat struktur bölməsinin üçün məlumatların toplanması → rəhbərlik razılaşdırılması →Hesabat",
      isProseduru: "KİES",
      agirDereceleri: "100%",
      digerSobe: "92%",
      digerSobe2: "88%",
      digerSobe3: null,
      filial: "90%",
      filial2: "85%",
      filial3: null,
      netice: "88.8%",
      fakt: 92,
      isEmpty: false,
    },
    {
      id: 5,
      vazifeTelimatlari: "ESG icra nəzarət-rəhbərliyin hesabatı",
      teyyinat: "Hesabat",
      status: "Gözləmədədir",
      icraTezliyi: "İllik",
      vazifeMesuliyyeti: "Şöbə rəisi, Direktor, CRO",
      isProseduralari:
        "Adliyyat struktur bölməsinin üçün məlumatların toplanması → rəhbərlik razılaşdırılması →Hesabat",
      isProseduru: "KİES",
      agirDereceleri: "100%",
      digerSobe: null,
      digerSobe2: null,
      digerSobe3: null,
      filial: null,
      filial2: null,
      filial3: null,
      netice: null,
      fakt: null,
      isEmpty: true,
    },
  ];

  const getStatusBadge = (score) => {
    if (score >= 85) return { text: "On-track", color: "#4b5563", icon: "🟢" };
    if (score >= 70) return { text: "Risk", color: "#f59e0b", icon: "🟡" };
    return { text: "Off", color: "#ef4444", icon: "🔴" };
  };

  const handleAddResult = (kpiId) => {
    console.log("Adding result for KPI:", kpiId);
  };

  const handleEditResult = (kpiId) => {
    console.log("Editing result for KPI:", kpiId);
  };

  return (
    <div className={styles.profileContainer}>
      {/* Header */}
      <div className={styles.profileHeader}>
        <button onClick={onBack} className={styles.backButton}>
          <ArrowLeft size={20} />
          Geri
        </button>
        <h1 className={styles.profileTitle}>İşçi KPI Profili</h1>
      </div>

      {/* Personal Information */}
      <div className={styles.personalInfo}>
        <div className={styles.employeeCard}>
          <img
            src={employee.photo || "/placeholder.svg"}
            alt={employee.name}
            className={styles.employeePhoto}
          />
          <div className={styles.employeeDetails}>
            <h2 className={styles.employeeName}>{employee.name}</h2>
            <div className={styles.employeeMeta}>
              <div className={styles.metaItem}>
                <User size={16} />
                <span>{employee.position}</span>
              </div>
              <div className={styles.metaItem}>
                <Building2 size={16} />
                <span>{employee.department}</span>
              </div>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>İşə qəbul: 15.03.2020</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <div className={styles.cardIcon}>
            <Target size={24} />
          </div>
          <div className={styles.cardContent}>
            <h3>Orta KPI Nəticəsi</h3>
            <p className={styles.cardValue}>{employee.kpiScore}%</p>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div
            className={styles.cardIcon}
            style={{ backgroundColor: "#dcfce7" }}
          >
            <CheckCircle size={24} color="#4b5563" />
          </div>
          <div className={styles.cardContent}>
            <h3>On-track Sayı</h3>
            <p className={styles.cardValue}>12</p>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div
            className={styles.cardIcon}
            style={{ backgroundColor: "#fef3c7" }}
          >
            <AlertTriangle size={24} color="#f59e0b" />
          </div>
          <div className={styles.cardContent}>
            <h3>Risk/Off Sayı</h3>
            <p className={styles.cardValue}>3</p>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div
            className={styles.cardIcon}
            style={{ backgroundColor: "#e0e7ff" }}
          >
            <Award size={24} color="#6366f1" />
          </div>
          <div className={styles.cardContent}>
            <h3>Şəxsi KPI Balı</h3>
            <p className={styles.cardValue}>847</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filtersSection}>
        <div className={styles.filterGroup}>
          <label>İl:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label>Dövr:</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="aylıq">Aylıq</option>
            <option value="rüblük">Rüblük</option>
            <option value="illik">İllik</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label>Modul:</label>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <option value="Hamısı">Hamısı</option>
            <option value="CE">CE</option>
            <option value="MH">MH</option>
            <option value="AML">AML</option>
            <option value="AU">AU</option>
          </select>
        </div>
      </div>

      {/* KPI Analytics */}
      <div className={styles.analyticsSection}>
        <div
          className={styles.analyticsHeader}
          onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
        >
          <h2 className={styles.sectionTitle}>KPI Analitika</h2>
          <ChevronDown
            size={20}
            className={`${styles.chevronIcon} ${
              isAnalyticsOpen ? styles.rotated : ""
            }`}
          />
        </div>

        {isAnalyticsOpen && (
          <>
            <div className={styles.analyticsGrid}>
              {/* Trend Chart */}
              <div className={styles.chartCard}>
                <h3>Trend Analizi (Fakt vs Hədəf)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="fakt"
                      stroke="#3b82f6"
                      name="Fakt"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="hedef"
                      stroke="#ef4444"
                      name="Hədəf"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Strong KPIs */}
              <div className={styles.chartCard}>
                <h3>Güclü KPI-lar (Top 3)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={strongKPIs}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4b5563" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Weak KPIs */}
              <div className={styles.chartCard}>
                <h3>Zəif KPI-lar (Top 3)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={weakKPIs}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Module Distribution */}
              <div className={styles.chartCard}>
                <h3>Modullar üzrə Pay</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={moduleData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {moduleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Department Comparison */}
            <div className={styles.comparisonCard}>
              <h3>Departament Ortalaması ilə Müqayisə</h3>
              <div className={styles.comparisonContent}>
                <div className={styles.comparisonItem}>
                  <span>İşçi Nəticəsi:</span>
                  <span className={styles.comparisonValue}>
                    {employee.kpiScore}%
                  </span>
                </div>
                <div className={styles.comparisonItem}>
                  <span>Departament Ortalaması:</span>
                  <span className={styles.comparisonValue}>82%</span>
                </div>
                <div className={styles.comparisonItem}>
                  <span>Fərq:</span>
                  <span className={styles.comparisonDiff}>
                    <TrendingUp size={16} color="#4b5563" />+
                    {employee.kpiScore - 82}%
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* KPI Results Table */}
      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h2 className={styles.sectionTitle}>KPI Nəticə Cədvəli</h2>
          <div className={styles.tableFilters}>
            <div className={styles.searchBox}>
              <Search size={16} />
              <input
                type="text"
                placeholder="KPI axtarışı..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className={styles.filterButton}>
              <Filter size={16} />
              Filterlər
            </button>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.kpiTable}>
            <thead>
              <tr>
                <th>Vəzifə Təlimatları</th>
                <th>Təyinat</th>
                <th>Status</th>
                <th>İcra təzliyi</th>
                <th>Vəzifə Məsuliyyəti</th>
                <th>İş Prosedurları</th>
                <th>İş Proseduru</th>
                <th>Ağır Dərəcəsi</th>
                <th>Digər şöbə 1</th>
                <th>Digər şöbə 2</th>
                <th>Digər şöbə 3</th>
                <th>Filial 1</th>
                <th>Filial 2</th>
                <th>Filial 3</th>
                <th>Nəticə</th>
                <th>Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {kpiResults.map((kpi) => (
                <tr key={kpi.id} className={styles.tableRow}>
                  <td className={styles.taskCell}>{kpi.vazifeTelimatlari}</td>
                  <td>{kpi.teyyinat}</td>
                  <td>{kpi.status}</td>
                  <td>{kpi.icraTezliyi}</td>
                  <td>{kpi.vazifeMesuliyyeti}</td>
                  <td className={styles.procedureCell}>
                    {kpi.isProseduralari}
                  </td>
                  <td className={styles.procedureCell}>{kpi.isProseduru}</td>
                  <td>{kpi.agirDereceleri}</td>
                  <td>
                    {kpi.digerSobe ? (
                      kpi.digerSobe
                    ) : (
                      <button
                        className={styles.addButton}
                        onClick={() => handleAddResult(kpi.id)}
                      >
                        <Plus size={14} />
                        Əlavə et
                      </button>
                    )}
                  </td>
                  <td>
                    {kpi.digerSobe2 ? (
                      kpi.digerSobe2
                    ) : (
                      <button
                        className={styles.addButton}
                        onClick={() => handleAddResult(kpi.id)}
                      >
                        <Plus size={14} />
                        Əlavə et
                      </button>
                    )}
                  </td>
                  <td>
                    {kpi.digerSobe3 ? (
                      kpi.digerSobe3
                    ) : (
                      <button
                        className={styles.addButton}
                        onClick={() => handleAddResult(kpi.id)}
                      >
                        <Plus size={14} />
                        Əlavə et
                      </button>
                    )}
                  </td>
                  <td>
                    {kpi.filial ? (
                      kpi.filial
                    ) : (
                      <button
                        className={styles.addButton}
                        onClick={() => handleAddResult(kpi.id)}
                      >
                        <Plus size={14} />
                        Əlavə et
                      </button>
                    )}
                  </td>
                  <td>
                    {kpi.filial2 ? (
                      kpi.filial2
                    ) : (
                      <button
                        className={styles.addButton}
                        onClick={() => handleAddResult(kpi.id)}
                      >
                        <Plus size={14} />
                        Əlavə et
                      </button>
                    )}
                  </td>
                  <td>
                    {kpi.filial3 ? (
                      kpi.filial3
                    ) : (
                      <button
                        className={styles.addButton}
                        onClick={() => handleAddResult(kpi.id)}
                      >
                        <Plus size={14} />
                        Əlavə et
                      </button>
                    )}
                  </td>
                  <td className={styles.resultCell}>
                    {kpi.netice ? (
                      <span className={styles.resultValue}>{kpi.netice}</span>
                    ) : (
                      <span className={styles.noResult}>Nəticə yoxdur</span>
                    )}
                  </td>
                  <td className={styles.actionCell}>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEditResult(kpi.id)}
                    >
                      <Edit3 size={14} />
                      Düzənlə
                    </button>
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

export default EmployeeKPIProfile;
