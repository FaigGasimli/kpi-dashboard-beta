"use client";

import { useState } from "react";
import {
  Edit,
  Lock,
  MoreHorizontal,
  Filter,
  Save,
  X,
  Eye,
  EyeOff,
  Upload,
  Settings,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";
import styles from "./profile.module.css";
import Header from "../../components/header";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("assigned-kpis");
  const [profileEditTab, setProfileEditTab] = useState("profile-edit");
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // KPI Results navigation state
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [navigationLevel, setNavigationLevel] = useState("branches");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [profileData, setProfileData] = useState({
    name: "Vəfa Vahabova",
    surname: "Namiq qızı",
    age: "29 yaş",
    email: "vefa.vahabova@company.com",
    phone: "+994 50 123 45 67",
    birthDate: "15 Yanvar 1990",
    status: "active",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const workInfo = {
    
    position: "Şöbə reisi",
    departmentBranch: "Komplayens / KMS şöbəsi",
    hireDate: "21.02.2012",
    tenure: "13 il 6 ay",
    employeeCode: "EMP-00452",
  };

  const myKPIs = [
    {
      id: 1,
      name: "Kod keyfiyyəti artırılması",
      progress: 85,
      status: "On track",
    },
    {
      id: 2,
      name: "Layihə vaxtında tamamlanması",
      progress: 65,
      status: "Risk",
    },
    { id: 3, name: "Komanda əməkdaşlığı", progress: 92, status: "On track" },
  ];

  const assignedKPIs = [
    {
      employee: "Leyla Əliyeva",
      kpi: "Hesabların vaxtında təqdimatı",
      status: "Aktiv",
      lastUpdate: "2 gün əvvəl",
    },
    {
      employee: "Rəşad Həsənov",
      kpi: "Orta səviyyəli risklərin izlənməsi",
      status: "Tamamlanmış",
      lastUpdate: "1 həftə əvvəl",
    },
    {
      employee: "Həvva Orucova",
      kpi: "AML/TMM tələblərinə uyğun STR-lərin vaxtında təqdimatı",
      status: "Aktiv",
      lastUpdate: "1 həftə əvvəl",
    },
    {
      employee: "Adəm Əsgərov",
      kpi: "Risklərin aradan qaldırılması",
      status: "Tamamlanmış",
      lastUpdate: "1 həftə əvvəl",
    },
  ];

  const activityLog = [
    {
      date: "25 Dekabr 2024",
      action: "KPI yeniləndi",
      target: "Kod keyfiyyəti",
    },
    {
      date: "20 Dekabr 2024",
      action: "Tapşırıq təyin edildi",
      target: "Leyla Əliyeva",
    },
    {
      date: "15 Dekabr 2024",
      action: "Profil yeniləndi",
      target: "Şəxsi məlumatlar",
    },
  ];

  // Mock data for KPI Results
  const branchesData = [
    {
      name: "Yeni Filial",
      departments: 3,
      divisions: 3,
      employees: 16,
      performance: 77,
      color: "#92400e",
    },
    {
      name: "Filial 1",
      departments: 3,
      divisions: 3,
      employees: 16,
      performance: 64,
      color: "#92400e",
    },
    {
      name: "Filial 2",
      departments: 3,
      divisions: 3,
      employees: 16,
      performance: 96,
      color: "#92400e",
    },
    {
      name: "Filial 3",
      departments: 3,
      divisions: 3,
      employees: 16,
      performance: 49,
      color: "#92400e",
    },
  ];

  const departmentsData = {
    "Yeni Filial": [
      {
        name: "Komplayens Departamenti",
        divisions: 3,
        employees: 8,
        performance: 85,
      },
      {
        name: "Risklərin idarə edilməsi",
        divisions: 2,
        employees: 5,
        performance: 78,
      },
      {
        name: "Nəzarət departamenti",
        divisions: 1,
        employees: 3,
        performance: 92,
      },
    ],
    "Filial 1": [
      { name: "Müştəri Xidmətləri", divisions: 2, employees: 6, performance: 72 },
      {
        name: "Maliyyə Departamenti",
        divisions: 2,
        employees: 7,
        performance: 68,
      },
      { name: "IT Departamenti", divisions: 1, employees: 3, performance: 88 },
    ],
    "Filial 2": [
      { name: "Satış Departamenti", divisions: 3, employees: 9, performance: 94 },
      { name: "Marketing", divisions: 1, employees: 4, performance: 96 },
      { name: "HR Departamenti", divisions: 1, employees: 3, performance: 89 },
    ],
    "Filial 3": [
      {
        name: "Əməliyyat Departamenti",
        divisions: 2,
        employees: 8,
        performance: 52,
      },
      { name: "Texniki Dəstək", divisions: 1, employees: 5, performance: 45 },
      { name: "Təhlükəsizlik", divisions: 1, employees: 3, performance: 58 },
    ],
  };

  const divisionsData = {
    "Komplayens Departamenti": [
      { name: "ƏL/TMM Şöbəsi", employees: 3, performance: 88 },
      { name: "MEŞ / Hesabatlıq şöbəsi", employees: 3, performance: 82 },
      { name: "Komplayens Monitorinq Şöbəsi", employees: 2, performance: 85 },
    ],
    "Risklərin idarə edilməsi": [
      { name: "Kredit Risk Şöbəsi", employees: 3, performance: 75 },
      { name: "Əməliyyat Risk Şöbəsi", employees: 2, performance: 81 },
    ],
    "Nəzarət departamenti": [
      { name: "Audit Şöbəsi", employees: 3, performance: 92 },
    ],
    "Müştəri Xidmətləri": [
      { name: "Müştəri Dəstəyi", employees: 3, performance: 70 },
      { name: "Şikayət İdarəetməsi", employees: 3, performance: 74 },
    ],
    "Maliyyə Departamenti": [
      { name: "Maliyyə Planlaşdırması", employees: 4, performance: 65 },
      { name: "Uçot Şöbəsi", employees: 3, performance: 71 },
    ],
    "IT Departamenti": [
      { name: "Sistem İdarəetməsi", employees: 3, performance: 88 },
    ],
    "Satış Departamenti": [
      { name: "Korporativ Satış", employees: 4, performance: 95 },
      { name: "Fərdi Satış", employees: 3, performance: 93 },
      { name: "Onlayn Satış", employees: 2, performance: 94 },
    ],
    Marketing: [{ name: "Rəqəmsal Marketing", employees: 4, performance: 96 }],
    "HR Departamenti": [
      { name: "İnsan Resursları", employees: 3, performance: 89 },
    ],
    "Əməliyyat Departamenti": [
      { name: "Gündəlik Əməliyyatlar", employees: 5, performance: 50 },
      { name: "Proses İdarəetməsi", employees: 3, performance: 54 },
    ],
    "Texniki Dəstək": [{ name: "Texniki Yardım", employees: 5, performance: 45 }],
    Təhlükəsizlik: [
      { name: "Fiziki Təhlükəsizlik", employees: 3, performance: 58 },
    ],
  };

  const employeesData = {
    "ƏL/TMM Şöbəsi": [
      {
        name: "Nigar Əhmədova",
        photo: "/professional-female-avatar.png",
        position: "Baş Mütəxəssis",
        branch: "Yeni Filial",
        department: "Komplayens Departamenti",
        division: "ƏL/TMM Şöbəsi",
        kpiResult: 91,
        kpiScore: 91,
        status: "On-track",
        benchmark: 6,
      },
      {
        name: "Tural Məmmədov",
        photo: "/professional-male-avatar.png",
        position: "Aparıcı Mütəxəssis",
        branch: "Yeni Filial",
        department: "Komplayens Departamenti",
        division: "ƏL/TMM Şöbəsi",
        kpiResult: 85,
        kpiScore: 85,
        status: "On-track",
        benchmark: 3,
      },
      {
        name: "Səbinə Qasımova",
        photo: "/professional-female-avatar-2.png",
        position: "Mütəxəssis",
        branch: "Yeni Filial",
        department: "Komplayens Departamenti",
        division: "ƏL/TMM Şöbəsi",
        kpiResult: 88,
        kpiScore: 88,
        status: "On-track",
        benchmark: 4,
      },
    ],
    "MEŞ / Hesabatlıq şöbəsi": [
      {
        name: "Orxan Həsənov",
        photo: "/professional-male-avatar-2.png",
        position: "Şöbə Rəisi",
        branch: "Yeni Filial",
        department: "Komplayens Departamenti",
        division: "MEŞ / Hesabatlıq şöbəsi",
        kpiResult: 82,
        kpiScore: 82,
        status: "On-track",
        benchmark: 2,
      },
      {
        name: "Aynur Rəhimova",
        photo: "/professional-female-avatar.png",
        position: "Baş Mütəxəssis",
        branch: "Yeni Filial",
        department: "Komplayens Departamenti",
        division: "MEŞ / Hesabatlıq şöbəsi",
        kpiResult: 79,
        kpiScore: 79,
        status: "Risk",
        benchmark: -1,
      },
      {
        name: "Fərid Əliyev",
        photo: "/professional-male-avatar-3.png",
        position: "Aparıcı Mütəxəssis",
        branch: "Yeni Filial",
        department: "Komplayens Departamenti",
        division: "MEŞ / Hesabatlıq şöbəsi",
        kpiResult: 84,
        kpiScore: 84,
        status: "On-track",
        benchmark: 3,
      },
    ],
    "Komplayens Monitorinq Şöbəsi": [
      {
        name: "Məryəm Nəsirova",
        photo: "/professional-female-avatar-2.png",
        position: "Baş Mütəxəssis",
        branch: "Yeni Filial",
        department: "Komplayens Departamenti",
        division: "Komplayens Monitorinq Şöbəsi",
        kpiResult: 94,
        kpiScore: 94,
        status: "On-track",
        benchmark: 8,
      },
      {
        name: "Kamran Babayev",
        photo: "/professional-male-avatar.png",
        position: "Mütəxəssis",
        branch: "Yeni Filial",
        department: "Komplayens Departamenti",
        division: "Komplayens Monitorinq Şöbəsi",
        kpiResult: 90,
        kpiScore: 90,
        status: "On-track",
        benchmark: 5,
      },
    ],
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { text: "Aktiv", className: styles.statusActive },
      vacation: { text: "Məzuniyyətdə", className: styles.statusVacation },
      business_trip: {
        text: "Ezamiyyətdə",
        className: styles.statusBusinessTrip,
      },
    };
    return statusConfig[status] || statusConfig.active;
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleEditModeToggle = () => {
    setIsEditMode(!isEditMode);
  };

  // KPI Results navigation handlers
  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
    setNavigationLevel("departments");
    setSelectedDepartment(null);
  };

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
    setNavigationLevel("divisions");
  };

  const handleDivisionClick = (division) => {
    setSelectedDivision(division);
    setNavigationLevel("employees");
  };

  const handleBackClick = () => {
    if (navigationLevel === "employees") {
      setNavigationLevel("divisions");
      setSelectedDivision(null);
    } else if (navigationLevel === "divisions") {
      setNavigationLevel("departments");
      setSelectedDepartment(null);
    } else if (navigationLevel === "departments") {
      setNavigationLevel("branches");
      setSelectedBranch(null);
    }
  };

  const handleEmployeeProfileClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleBackFromEmployeeProfile = () => {
    setSelectedEmployee(null);
  };

  const getStatusBadgeForKPI = (status) => {
    const statusConfig = {
      "On-track": { color: "#22c55e", emoji: "🟢", text: "On-track" },
      Risk: { color: "#eab308", emoji: "🟡", text: "Risk" },
      Off: { color: "#ef4444", emoji: "🔴", text: "Off" },
    };
    return statusConfig[status] || statusConfig["Off"];
  };

  return (
    <>
      <Header title="Profil" />
      <div className={styles.container}>
        {isEditMode ? (
          <div className={styles.editSection}>
            <div className={styles.backButtonContainer}>
              <button
                className={styles.backButton}
                onClick={handleEditModeToggle}
              >
                Geri qayıt
              </button>
            </div>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.tabContainer}>
                  <button
                    className={`${styles.tab} ${
                      profileEditTab === "profile-edit" ? styles.tabActive : ""
                    }`}
                    onClick={() => setProfileEditTab("profile-edit")}
                  >
                    Profil redaktəsi
                  </button>
                  <button
                    className={`${styles.tab} ${
                      profileEditTab === "security" ? styles.tabActive : ""
                    }`}
                    onClick={() => setProfileEditTab("security")}
                  >
                    Gizlilik və təhlükəsizlik
                  </button>
                </div>
              </div>

              {profileEditTab === "profile-edit" && (
                <div className={styles.editForm}>
                  <div className={styles.profileImageUpload}>
                    <div className={styles.uploadContainer}>
                      <div className={styles.uploadPreview}>
                        <img
                          src="/api/placeholder/80/80"
                          alt="Profile Preview"
                        />
                      </div>
                      <button className={styles.uploadButton}>
                        <Upload size={16} />
                        Şəkil yüklə
                      </button>
                    </div>
                  </div>

                  <div className={styles.formGridTwo}>
                    <div>
                      <div className={styles.formGroup}>
                        <label>Ad Soyad</label>
                        <input
                          type="text"
                          value={`${profileData.name} ${profileData.surname}`.trim()}
                          onChange={(e) => {
                            const full = e.target.value.trim();
                            const parts = full.split(" ");
                            const surname = parts.length > 1 ? parts.pop() : "";
                            const name = parts.join(" ");
                            setProfileData({ ...profileData, name, surname });
                          }}
                          disabled={!isEditing}
                          className={styles.formInput}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Doğum tarixi</label>
                        <input
                          type="text"
                          value={profileData.birthDate}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              birthDate: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className={styles.formInput}
                        />
                      </div>
                    </div>
                    <div>
                      <div className={styles.formGroup}>
                        <label>Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className={styles.formInput}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Telefon</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phone: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className={styles.formInput}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    {!isEditing ? (
                      <button
                        className={styles.editButton}
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit size={16} />
                        Redaktə et
                      </button>
                    ) : (
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.saveButton}
                          onClick={handleSave}
                        >
                          <Save size={16} />
                          Yadda saxla
                        </button>
                        <button
                          className={styles.cancelButton}
                          onClick={handleCancel}
                        >
                          <X size={16} />
                          Ləğv et
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {profileEditTab === "security" && (
                <div className={styles.securityContent}>
                  <div className={styles.passwordForm}>
                    <div className={styles.formGroup}>
                      <label>İndiki şifrə</label>
                      <div className={styles.passwordInput}>
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          placeholder="İndiki şifrənizi daxil edin"
                          className={styles.formInput}
                        />
                        <button
                          type="button"
                          className={styles.eyeButton}
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Yeni şifrə</label>
                      <div className={styles.passwordInput}>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          placeholder="Yeni şifrənizi daxil edin"
                          className={styles.formInput}
                        />
                        <button
                          type="button"
                          className={styles.eyeButton}
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Yeni şifrənin təkrarı</label>
                      <div className={styles.passwordInput}>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          placeholder="Yeni şifrənizi təkrar daxil edin"
                          className={styles.formInput}
                        />
                        <button
                          type="button"
                          className={styles.eyeButton}
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      className={styles.passwordChangeButton}
                      onClick={handlePasswordChange}
                    >
                      <Lock size={16} />
                      Şifrəni yenilə
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.profileCard}>
              <div className={styles.profileCardHeader}>
                <button
                  className={styles.settingsButton}
                  onClick={handleEditModeToggle}
                >
                  <Settings size={20} />
                </button>
              </div>

              <div className={styles.profileContent}>
                <div className={styles.profileImageSection}>
                  <div className={styles.profileImageLarge}>
                    <img src="/api/placeholder/120/120" alt="Profile" />
                  </div>
                </div>

                <div className={styles.profileInfoSection}>
                  <div className={styles.personalInfoColumn}>
                    <h2 className={styles.profileName}>
                      {profileData.name} {profileData.surname}
                    </h2>
                    <div className={styles.birthRow}>
                      <Calendar size={16} className={styles.birthIcon} />
                      <span>{profileData.birthDate}</span>
                    </div>
                    <div className={styles.contactList}>
                      <div className={styles.contactItem}>
                        <Mail size={16} className={styles.contactIcon} />
                        <span>{profileData.email}</span>
                      </div>
                      <div className={styles.contactItem}>
                        <Phone size={16} className={styles.contactIcon} />
                        <span>{profileData.phone}</span>
                      </div>
                    </div>
                    <div
                      className={`${styles.statusBadge} ${
                        getStatusBadge(profileData.status).className
                      }`}
                    >
                      {getStatusBadge(profileData.status).text}
                    </div>
                  </div>

                  <div className={styles.workInfoGrid}>
                    <div className={styles.workInfoItem}>
                      <span className={styles.workLabel}>VƏZİFƏ:</span>
                      <span className={styles.workValue}>
                        {workInfo.position}
                      </span>
                    </div>
                    <div className={styles.workInfoItem}>
                      <span className={styles.workLabel}>
                        DEPARTAMENT / FİLİAL:
                      </span>
                      <span className={styles.workValue}>
                        {workInfo.departmentBranch}
                      </span>
                    </div>
                    <div className={styles.workInfoItem}>
                      <span className={styles.workLabel}>
                        İŞƏ QƏBUL TARİXİ:
                      </span>
                      <span className={styles.workValue}>
                        {workInfo.hireDate}
                      </span>
                    </div>
                    <div className={styles.workInfoItem}>
                      <span className={styles.workLabel}>STAJ:</span>
                      <span className={styles.workValue}>
                        {workInfo.tenure}
                      </span>
                    </div>
                    <div className={styles.workInfoItem}>
                      <span className={styles.workLabel}>İŞÇİ KODU:</span>
                      <span className={styles.workValue}>
                        {workInfo.employeeCode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.tabContainer}>
                  <button
                    className={`${styles.tab} ${
                      activeTab === "assigned-kpis" ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab("assigned-kpis")}
                  >
                    Təyin etdiyim KPI-lar
                  </button>
             
                </div>
              </div>

            
              {activeTab === "assigned-kpis" && (
                <div className={styles.assignedKpis}>
                  <div className={styles.filterBar}>
                    <Filter size={16} />
                    <select className={styles.filterSelect}>
                      <option>Bütün statuslar</option>
                      <option>Aktiv</option>
                      <option>Tamamlanmış</option>
                    </select>
                  </div>
                  <div className={styles.kpiTable}>
                    <div className={styles.tableHeader}>
                      <span>Əməkdaş</span>
                      <span>KPI adı</span>
                      <span>Status</span>
                      <span>Son yeniləmə</span>
                    </div>
                    {assignedKPIs.map((item, index) => (
                      <div key={index} className={styles.tableRow}>
                        <span>{item.employee}</span>
                        <span>{item.kpi}</span>
                        <span
                          className={`${styles.tableStatus} ${
                            item.status === "Aktiv"
                              ? styles.statusActive
                              : styles.statusCompleted
                          }`}
                        >
                          {item.status}
                        </span>
                        <span>{item.lastUpdate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

           
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Fəaliyyət tarixi</h2>
              </div>
              <div className={styles.timeline}>
                {activityLog.map((activity, index) => (
                  <div key={index} className={styles.timelineItem}>
                    <div className={styles.timelineMarker}></div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineDate}>{activity.date}</div>
                      <div className={styles.timelineAction}>
                        {activity.action}
                      </div>
                      <div className={styles.timelineTarget}>
                        {activity.target}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
