import styles from "./home.module.css";
import Header from "../../components/header";

const CircularProgress = ({ percentage, color = "#4682B4" }) => {
  const radius = 45;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.circularProgress}>
      <svg
        height={radius * 2}
        width={radius * 2}
        className={styles.progressSvg}
      >
        {/* Background circle */}
        <circle
          stroke="#f0f0f0"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className={styles.progressCircle}
        />
      </svg>
      <div className={styles.percentageText}>
        <span className={styles.percentage}>{percentage}%</span>
      </div>
    </div>
  );
};

const BarChart = ({ data }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className={styles.barChart}>
      <div className={styles.chartContainer}>
        {data.map((item, index) => (
          <div key={index} className={styles.barColumn}>
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: index % 2 === 0 ? "#8B4513" : "#DAA520",
                }}
              >
                <div className={styles.barValue}>{item.value}</div>
              </div>
            </div>
            <div className={styles.barLabel}>{item.month}</div>
          </div>
        ))}
      </div>
      <div className={styles.yAxis}>
        <div className={styles.yAxisLabel}>100</div>
        <div className={styles.yAxisLabel}>80</div>
        <div className={styles.yAxisLabel}>60</div>
        <div className={styles.yAxisLabel}>40</div>
        <div className={styles.yAxisLabel}>20</div>
        <div className={styles.yAxisLabel}>0</div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const kpiData = [
    {
      title: "KPI statusu",
      percentage: 80,
      legend: [
        { label: "Hədəf", color: "#8B4513" },
        { label: "Gözlənti", color: "#DAA520" },
        { label: "Normal", color: "#FFD700" },
      ],
    },
    {
      title: "Tasklar üzrə performans",
      percentage: 75,
      legend: [
        { label: "Hədəf", color: "#8B4513" },
        { label: "Cari", color: "#4682B4" },
        { label: "Keçən il", color: "#FFD700" },
      ],
    },
    {
      title: "İşçilər üzrə nəticə",
      percentage: 80,
      legend: [
        { label: "Hədəf", color: "#8B0000" },
        { label: "Cari", color: "#DC143C" },
        { label: "Keçən il", color: "#FF6347" },
      ],
    },
  ];

  const departmentData = [
    {
      name: "ƏL / TMM",
      current: 2586,
      lastMonth: 2586,
      target: 2586,
      performance: 98,
    },
    {
      name: "Məlumatlar Emalı",
      current: 2500,
      lastMonth: 2500,
      target: 2500,
      performance: 80,
    },
    {
      name: "Komplyens Monitoring",
      current: 1854,
      lastMonth: 1854,
      target: 1854,
      performance: 78,
    },
    {
      name: "Müştəri Xidmətləri Şöbəsi",
      current: 1589,
      lastMonth: 1589,
      target: 1589,
      performance: 65,
    },
  ];

  const employeeData = [
    { name: "Ayan Hüseynli", avatar: "👨", performance: 98 },
    { name: "Şaiq Muradzadə", avatar: "👨", performance: 80 },
    { name: "Sənan Hüseynli", avatar: "👨", performance: 78 },
    { name: "Günəş Həsənova", avatar: "👩", performance: 65 },
  ];

  const chartData = [
    { month: "Yan", value: 85 },
    { month: "Fev", value: 92 },
    { month: "Mar", value: 78 },
    { month: "Apr", value: 95 },
    { month: "May", value: 88 },
    { month: "İyn", value: 82 },
    { month: "İyl", value: 90 },
    { month: "Avq", value: 87 },
    { month: "Sen", value: 93 },
    { month: "Okt", value: 89 },
    { month: "Noy", value: 91 },
    { month: "Dek", value: 96 },
  ];

  return (
    <>
      <Header title="Ana səhifə" />
      <div className={styles.dashboard}>
        {/* Navigation Tabs */}
        {/* KPI Cards */}
        <div className={styles.kpiCards}>
          {kpiData.map((item, index) => (
            <div key={index} className={styles.kpiCard}>
              <div className={styles.cardHeader}>
                <h3>{item.title}</h3>
                <button className={styles.moreBtn}>⋯</button>
              </div>
              <div className={styles.cardContent}>
                <CircularProgress
                  percentage={item.percentage}
                  color={
                    index === 0
                      ? "#DAA520"
                      : index === 1
                      ? "#4682B4"
                      : "#DC143C"
                  }
                />
                <div className={styles.legend}>
                  {item.legend.map((legendItem, idx) => (
                    <div key={idx} className={styles.legendItem}>
                      <span
                        className={styles.legendColor}
                        style={{ backgroundColor: legendItem.color }}
                      ></span>
                      <span>{legendItem.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Department KPI Table */}
        <div className={styles.tableSection}>
          <h2>Şöbələr üzrə aylıq KPI göstəriciləri</h2>
          <div className={styles.tableContainer}>
            <table className={styles.kpiTable}>
              <thead>
                <tr>
                  <th>Şöbə</th>
                  <th>Cari göstərici</th>
                  <th>Keçən ay</th>
                  <th>Hədəf</th>
                  <th>KPI performans nəticəsi %</th>
                </tr>
              </thead>
              <tbody>
                {departmentData.map((dept, index) => (
                  <tr key={index}>
                    <td>{dept.name}</td>
                    <td>{dept.current}</td>
                    <td>{dept.lastMonth}</td>
                    <td>{dept.target}</td>
                    <td>
                      <div className={styles.performanceBar}>
                        <div
                          className={styles.performanceFill}
                          style={{
                            width: `${dept.performance}%`,
                            backgroundColor:
                              index === 0
                                ? "#4682B4"
                                : index === 1
                                ? "#32CD32"
                                : index === 2
                                ? "#FFD700"
                                : "#FF6347",
                          }}
                        ></div>
                        <span className={styles.performanceText}>
                          {dept.performance}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          {/* Employee KPI */}
          <div className={styles.employeeSection}>
            <h3>Şöbə üzvləri üzrə KPI</h3>
            <div className={styles.employeeList}>
              <div className={styles.employeeHeader}>
                <span>İşçi adı</span>
                <span>KPI performans nəticəsi %</span>
              </div>
              {employeeData.map((employee, index) => (
                <div key={index} className={styles.employeeItem}>
                  <div className={styles.employeeInfo}>
                    <span className={styles.avatar}>{employee.avatar}</span>
                    <span>{employee.name}</span>
                  </div>
                  <div className={styles.employeePerformance}>
                    <div className={styles.performanceBar}>
                      <div
                        className={styles.performanceFill}
                        style={{
                          width: `${employee.performance}%`,
                          backgroundColor:
                            index === 0
                              ? "#4682B4"
                              : index === 1
                              ? "#32CD32"
                              : index === 2
                              ? "#FFD700"
                              : "#FF6347",
                        }}
                      ></div>
                    </div>
                    <span className={styles.performanceText}>
                      {employee.performance}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <div className={styles.chartSection}>
            <div className={styles.chartHeader}>
              <h3>Şöbə üzvləri üzrə KPI</h3>
              <div className={styles.chartControls}>
                <span>Performans müqayisəsi</span>
                <select className={styles.chartSelect}>
                  <option>İllik</option>
                </select>
              </div>
            </div>
            <BarChart data={chartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
