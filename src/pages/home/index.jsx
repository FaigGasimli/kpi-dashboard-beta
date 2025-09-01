import styles from "./home.module.css"
import Header from "../../components/header"
import {
  BarChart3,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Calendar,
  Filter,
  Building,
  UserCheck,
  Award,
  ListTodo,
  Timer,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const CircularProgress = ({ percentage, color = "#4f46e5", size = 80 }) => {
  const radius = 30
  const strokeWidth = 6
  const normalizedRadius = radius - strokeWidth * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className={styles.circularProgress} style={{ width: size, height: size }}>
      <svg height={size} width={size} className={styles.progressSvg}>
        <circle
          stroke="#f1f5f9"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          className={styles.progressCircle}
        />
      </svg>
      <div className={styles.percentageText}>
        <span className={styles.percentage}>{percentage}%</span>
      </div>
    </div>
  )
}

const MiniChart = ({ data, color = "#4f46e5" }) => {
  const chartData = data.map((value, index) => ({ value, index }))

  return (
    <div className={styles.miniChart}>
      <ResponsiveContainer width="100%" height={30}>
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const Dashboard = () => {
  const overviewCards = [
    {
      title: "Ümumi KPI-lar sayı",
      value: "24",
      icon: BarChart3,
      color: "#996f29",
      trend: [20, 22, 21, 24, 23, 24],
      change: "+8.3%",
    },
    {
      title: "Orta KPI nəticəsi",
      value: "85%",
      icon: TrendingUp,
      color: "#10b981",
      trend: [80, 82, 85, 83, 87, 85],
      change: "+2.4%",
    },
    {
      title: "On-track KPI-lar",
      value: "18",
      icon: CheckCircle,
      color: "#10b981",
      trend: [15, 16, 17, 18, 17, 18],
      change: "+5.9%",
    },
    {
      title: "Risk/Off KPI-lar",
      value: "6",
      icon: AlertTriangle,
      color: "#ef4444",
      trend: [8, 7, 6, 7, 6, 6],
      change: "-12.5%",
    },
    {
      title: "Orta davamiyyət",
      value: "92%",
      icon: Users,
      color: "#4f46e5",
      trend: [90, 91, 92, 91, 93, 92],
      change: "+1.1%",
    },
    {
      title: "Gecikmiş tapşırıqlar",
      value: "12",
      icon: Clock,
      color: "#ef4444",
      trend: [15, 14, 13, 12, 13, 12],
      change: "-20%",
    },
  ]

  const moduleChartData = [
    { name: "CE", value: 35, color: "#996f29" },
    { name: "MH", value: 25, color: "#10b981" },
    { name: "AML", value: 20, color: "#f59e0b" },
    { name: "AU", value: 20, color: "#ef4444" },
  ]

  const trendChartData = [
    { month: "Yan", value: 80 },
    { month: "Fev", value: 82 },
    { month: "Mar", value: 85 },
    { month: "Apr", value: 83 },
    { month: "May", value: 87 },
    { month: "İyn", value: 85 },
  ]

  const riskyKPIs = [
    { name: "Müştəri məmnuniyyəti", current: 65, target: 85, risk: "Yüksək", riskLevel: "high" },
    { name: "Kredit portfeli keyfiyyəti", current: 72, target: 90, risk: "Orta", riskLevel: "medium" },
    { name: "Əməliyyat səmərəliliyi", current: 78, target: 95, risk: "Orta", riskLevel: "medium" },
    { name: "Rəqəmsal xidmət istifadəsi", current: 45, target: 70, risk: "Yüksək", riskLevel: "high" },
  ]

  const hrData = {
    disciplinary: [
      { type: "Gecikmə", count: 8, level: "Aşağı", levelClass: "low" },
      { type: "İcazəsiz yoxluq", count: 3, level: "Orta", levelClass: "medium" },
      { type: "Qaydaların pozulması", count: 1, level: "Yüksək", levelClass: "high" },
    ],
    topPerformers: [
      { name: "Ayan Hüseynli", department: "ƏL/TMM", score: 98, avatar: "AH" },
      { name: "Şaiq Muradzadə", department: "ME", score: 95, avatar: "ŞM" },
      { name: "Sənan Hüseynli", department: "KM", score: 92, avatar: "SH" },
    ],
  }

  const taskData = {
    distribution: [
      { status: "To Do", count: 45, color: "#64748b", icon: ListTodo },
      { status: "In Progress", count: 32, color: "#3b82f6", icon: Timer },
      { status: "Completed", count: 128, color: "#10b981", icon: CheckCircle },
      { status: "Overdue", count: 12, color: "#ef4444", icon: AlertTriangle },
    ],
    overdueTasks: [
      { task: "Q1 Hesabat hazırlığı", responsible: "A.Hüseynli", days: 5 },
      { task: "Sistem yeniləməsi", responsible: "Ş.Muradzadə", days: 3 },
      { task: "Müştəri sorğusu", responsible: "S.Hüseynli", days: 2 },
    ],
  }

  const departmentData = [
    { name: "ƏL / TMM", current: 2586, target: 2586, performance: 98, trend: "up" },
    { name: "Məlumatlar Emalı", current: 2500, target: 2500, performance: 80, trend: "stable" },
    { name: "Komplyens Monitoring", current: 1854, target: 1854, performance: 78, trend: "down" },
    { name: "Müştəri Xidmətləri", current: 1589, target: 1589, performance: 65, trend: "up" },
  ]

  const kpiPerformanceData = [
    { name: "Hədəf", value: 18, fill: "#10b981" },
    { name: "Risk", value: 6, fill: "#ef4444" },
  ]

  const taskPerformanceData = [
    { name: "Tamamlanmış", value: 128, fill: "#4f46e5" },
    { name: "Gecikmiş", value: 12, fill: "#ef4444" },
  ]

  const attendanceChartData = [
    { name: "İştirakçı", value: 156, fill: "#10b981" },
    { name: "Yoxluq", value: 12, fill: "#ef4444" },
    { name: "Gecikmə", value: 8, fill: "#f59e0b" },
  ]

  return (
    <>
      <Header title="KPI Dashboard - Ana səhifə" />
      <div className={styles.dashboard}>
        <div className={styles.filterSection}>
          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>
              <Calendar size={14} />
              <span>Dövr</span>
            </div>
            <select className={styles.filterSelect}>
              <option>Aylıq</option>
              <option>Rüblük</option>
              <option>İllik</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>
              <Filter size={14} />
              <span>Modul</span>
            </div>
            <select className={styles.filterSelect}>
              <option>Hamısı</option>
              <option>CE</option>
              <option>MH</option>
              <option>AML</option>
              <option>AU</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>
              <Building size={14} />
              <span>Struktur</span>
            </div>
            <select className={styles.filterSelect}>
              <option>Hamısı</option>
              <option>Filial</option>
              <option>Departament</option>
              <option>Şöbə</option>
            </select>
          </div>
        </div>

        <div className={styles.overviewSection}>
          <h2>Ümumi Xülasə</h2>
          <div className={styles.overviewCards}>
            {overviewCards.map((card, index) => {
              const IconComponent = card.icon
              return (
                <div key={index} className={styles.overviewCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon} style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                      <IconComponent size={20} />
                    </div>
                    <div className={styles.cardValue}>{card.value}</div>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardTitle}>{card.title}</div>
                    <div className={styles.cardTrend}>
                      <MiniChart data={card.trend} color={card.color} />
                      <span
                        className={styles.trendValue}
                        style={{ color: card.change.startsWith("+") ? "#10b981" : "#ef4444" }}
                      >
                        {card.change}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.analyticsSection}>
          <h2>KPI Analitikası</h2>
          <div className={styles.analyticsGrid}>
            <div className={styles.trendSection}>
              <div className={styles.sectionHeader}>
                <TrendingUp size={18} color="#996f29" />
                <h3>KPI Trend Analizi</h3>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={trendChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#996f29"
                      strokeWidth={3}
                      dot={{ fill: "#996f29", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className={styles.trendSummary}>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Cari ay:</span>
                    <span className={styles.summaryValue}>85%</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Trend:</span>
                    <span className={styles.summaryValue} style={{ color: "#10b981" }}>
                      ↗ +2.4%
                    </span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Hədəf:</span>
                    <span className={styles.summaryValue}>90%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.riskyKpiSection}>
              <div className={styles.sectionHeader}>
                <AlertTriangle size={18} color="#ef4444" />
                <h3>Riskli KPI-lar</h3>
              </div>
              <div className={styles.riskyKpiList}>
                {riskyKPIs.map((kpi, index) => (
                  <div key={index} className={styles.riskyKpiItem}>
                    <div className={styles.kpiInfo}>
                      <div className={styles.kpiName}>{kpi.name}</div>
                      <div className={styles.kpiProgress}>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{
                              width: `${(kpi.current / kpi.target) * 100}%`,
                              backgroundColor:
                                kpi.riskLevel === "high"
                                  ? "#ef4444"
                                  : kpi.riskLevel === "medium"
                                    ? "#f59e0b"
                                    : "#10b981",
                            }}
                          />
                        </div>
                        <span className={styles.progressText}>
                          {kpi.current}% / {kpi.target}%
                        </span>
                      </div>
                    </div>
                    <span className={`${styles.riskBadge} ${styles[kpi.riskLevel]}`}>{kpi.risk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.moduleSection}>
              <div className={styles.sectionHeader}>
                <BarChart3 size={18} color="#4f46e5" />
                <h3>Modul Payı</h3>
              </div>
              <div className={styles.moduleChart}>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={moduleChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {moduleChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className={styles.moduleLegend}>
                  {moduleChartData.map((module, index) => (
                    <div key={index} className={styles.legendItem}>
                      <span className={styles.legendDot} style={{ backgroundColor: module.color }}></span>
                      <span className={styles.legendText}>
                        {module.name}: {module.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.departmentChart}>
              <div className={styles.sectionHeader}>
                <Building size={18} color="#996f29" />
                <h3>Şöbə Performansı</h3>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" fontSize={11} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="performance" fill="#996f29" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.hrSection}>
          <h2>İnsan Resursları Analitikası</h2>
          <div className={styles.hrGrid}>
            <div className={styles.attendanceSection}>
              <div className={styles.sectionHeader}>
                <UserCheck size={18} color="#10b981" />
                <h3>Davamiyyət</h3>
              </div>
              <div className={styles.attendanceContainer}>
                <div className={styles.attendanceChart}>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={attendanceChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {attendanceChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className={styles.attendanceStats}>
                  <div className={styles.attendanceItem}>
                    <div className={styles.attendanceIcon} style={{ backgroundColor: "#10b98115", color: "#10b981" }}>
                      <UserCheck size={16} />
                    </div>
                    <div className={styles.attendanceInfo}>
                      <span className={styles.attendanceValue}>156</span>
                      <span className={styles.attendanceText}>İştirakçı</span>
                    </div>
                  </div>
                  <div className={styles.attendanceItem}>
                    <div className={styles.attendanceIcon} style={{ backgroundColor: "#ef444415", color: "#ef4444" }}>
                      <Clock size={16} />
                    </div>
                    <div className={styles.attendanceInfo}>
                      <span className={styles.attendanceValue}>12</span>
                      <span className={styles.attendanceText}>Yoxluq</span>
                    </div>
                  </div>
                  <div className={styles.attendanceItem}>
                    <div className={styles.attendanceIcon} style={{ backgroundColor: "#f59e0b15", color: "#f59e0b" }}>
                      <AlertTriangle size={16} />
                    </div>
                    <div className={styles.attendanceInfo}>
                      <span className={styles.attendanceValue}>8</span>
                      <span className={styles.attendanceText}>Gecikmə</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.disciplinarySection}>
              <div className={styles.sectionHeader}>
                <AlertTriangle size={18} color="#f59e0b" />
                <h3>İntizam Pozuntuları</h3>
              </div>
              <div className={styles.disciplinaryList}>
                {hrData.disciplinary.map((item, index) => (
                  <div key={index} className={styles.disciplinaryItem}>
                    <div className={styles.disciplinaryInfo}>
                      <span className={styles.disciplinaryType}>{item.type}</span>
                      <span className={styles.disciplinaryCount}>{item.count} hal</span>
                    </div>
                    <span className={`${styles.levelBadge} ${styles[item.levelClass]}`}>{item.level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.topPerformersSection}>
              <div className={styles.sectionHeader}>
                <Award size={18} color="#996f29" />
                <h3>Top Performans</h3>
              </div>
              <div className={styles.performersList}>
                {hrData.topPerformers.map((performer, index) => (
                  <div key={index} className={styles.performerItem}>
                    <div className={styles.performerInfo}>
                      <div className={styles.performerAvatar}>{performer.avatar}</div>
                      <div className={styles.performerDetails}>
                        <span className={styles.performerName}>{performer.name}</span>
                        <span className={styles.performerDept}>{performer.department}</span>
                      </div>
                    </div>
                    <div className={styles.performerScore}>{performer.score}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.taskSection}>
          <h2>Tapşırıq İdarəetməsi</h2>
          <div className={styles.taskGrid}>
            <div className={styles.taskDistribution}>
              <div className={styles.sectionHeader}>
                <ListTodo size={18} color="#4f46e5" />
                <h3>Tapşırıq Statusu</h3>
              </div>
              <div className={styles.taskStatusGrid}>
                {taskData.distribution.map((status, index) => {
                  const IconComponent = status.icon
                  return (
                    <div key={index} className={styles.taskStatusCard}>
                      <div
                        className={styles.taskStatusIcon}
                        style={{ backgroundColor: `${status.color}15`, color: status.color }}
                      >
                        <IconComponent size={18} />
                      </div>
                      <div className={styles.taskStatusInfo}>
                        <div className={styles.taskStatusCount}>{status.count}</div>
                        <div className={styles.taskStatusName}>
                          {status.status === "To Do"
                            ? "Gözləyən"
                            : status.status === "In Progress"
                              ? "Davam edən"
                              : status.status === "Completed"
                                ? "Tamamlanmış"
                                : "Gecikmiş"}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={styles.overdueSection}>
              <div className={styles.sectionHeader}>
                <Clock size={18} color="#ef4444" />
                <h3>Gecikmiş Tapşırıqlar</h3>
              </div>
              <div className={styles.overdueList}>
                {taskData.overdueTasks.map((task, index) => (
                  <div key={index} className={styles.overdueItem}>
                    <div className={styles.taskInfo}>
                      <span className={styles.taskName}>{task.task}</span>
                      <span className={styles.taskResponsible}>{task.responsible}</span>
                    </div>
                    <div className={styles.overdueBadge}>
                      <Clock size={12} />
                      <span>{task.days} gün</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.kpiPerformanceSection}>
          <h2>KPI Performans</h2>
          <div className={styles.kpiCards}>
            <div className={styles.kpiCard}>
              <div className={styles.cardHeader}>
                <h3>KPI Statusu</h3>
                <Target size={18} color="#996f29" />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={kpiPerformanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {kpiPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className={styles.kpiStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statDot} style={{ backgroundColor: "#10b981" }}></span>
                    <span>Hədəf: 18</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statDot} style={{ backgroundColor: "#ef4444" }}></span>
                    <span>Risk: 6</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.kpiCard}>
              <div className={styles.cardHeader}>
                <h3>Tapşırıq Performansı</h3>
                <CheckCircle size={18} color="#10b981" />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie
                        data={taskPerformanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {taskPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className={styles.kpiStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statDot} style={{ backgroundColor: "#4f46e5" }}></span>
                    <span>Tamamlanmış: 128</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statDot} style={{ backgroundColor: "#ef4444" }}></span>
                    <span>Gecikmiş: 12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
