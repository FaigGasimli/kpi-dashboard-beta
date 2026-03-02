"use client";

import { useState } from "react";
import styles from "./shr.module.css";
import Photo from "../../assests/qız.jpg";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import Employees from "./employees/employees";
import EmployeesTable from "./employees/EmployeesTable";

const SHR = () => {
  const [overviewStats] = useState([
    {
      label: "Ümumi işçi sayı",
      value: "1,247",
      color: "#3b82f6",
      chartData: [85, 92, 78, 96, 88],
    },
    {
      label: "Şöbə sayı",
      value: "12",
      color: "#4b5563",
      chartData: [12, 11, 10, 12, 12],
    },

    {
      label: "Bu ay işə qəbul",
      value: "23",
      color: "#8b5cf6",
      chartData: [15, 18, 25, 20, 23],
    },
  ]);

  // Modal states
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState("branch");

  const handleCreateBranch = () => {
    setShowBranchModal(true);
  };

  const handleCreateDepartment = () => {
    setShowDepartmentModal(true);
  };

  const handleAddEmployee = () => {
    setShowEmployeeModal(true);
  };

  const BuildingIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12h4" />
      <path d="M6 16h4" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M14 12h4" />
      <path d="M14 16h4" />
    </svg>
  );

  const GridIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );

  const UserPlusIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );

  const MiniChart = ({ data, color }) => (
    <div className={styles.miniChart}>
      {data.map((value, index) => (
        <div
          key={index}
          className={styles.chartBar}
          style={{
            height: `${(value / Math.max(...data)) * 100}%`,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );

  // Modal Components
  const DepartmentModal = () => (
    <div
      className={styles.modalOverlay}
      onClick={() => setShowDepartmentModal(false)}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Yeni departament yarat</h2>
          <button
            className={styles.closeButton}
            onClick={() => setShowDepartmentModal(false)}
          >
            ×
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.formGroup}>
            <label>Departamentin adı</label>
            <input type="text" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Aid olduğu filial</label>
            <select className={styles.select}>
              <option>Seç</option>
              <option>Baş filial</option>
              <option>Regional filial</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Şöbə sayı</label>
            <input type="number" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>İşçi sayı</label>
            <input type="number" className={styles.input} />
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={styles.cancelButton}
            onClick={() => setShowDepartmentModal(false)}
          >
            Ləğv et
          </button>
          <button className={styles.saveButton}>Yadda saxla</button>
        </div>
      </div>
    </div>
  );

  const BranchModal = () => (
    <div
      className={styles.modalOverlay}
      onClick={() => setShowBranchModal(false)}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Yeni şöbə yarat</h2>
          <button
            className={styles.closeButton}
            onClick={() => setShowBranchModal(false)}
          >
            ×
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.formGroup}>
            <label>Şöbənin adı</label>
            <input type="text" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Aid olduğu filial</label>
            <select className={styles.select}>
              <option>Seç</option>
              <option>Baş filial</option>
              <option>Regional filial</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Bölmə sayı</label>
            <input type="number" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>İşçi sayı</label>
            <input type="number" className={styles.input} />
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={styles.cancelButton}
            onClick={() => setShowBranchModal(false)}
          >
            Ləğv et
          </button>
          <button className={styles.saveButton}>Yadda saxla</button>
        </div>
      </div>
    </div>
  );

  const EmployeeModal = () => (
    <div
      className={styles.modalOverlay}
      onClick={() => setShowEmployeeModal(false)}
    >
      <div className={styles.modernModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modernModalHeader}>
          <h2>Yenisi yarat</h2>
          <button
            className={styles.closeButton}
            onClick={() => setShowEmployeeModal(false)}
          >
            ×
          </button>
        </div>

        {/* Tab Navigation */}
        <div className={styles.modalTabs}>
          <button
            className={`${styles.modalTab} ${
              activeModalTab === "branch" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveModalTab("branch")}
          >
            Şöbə yarat
          </button>
          <button
            className={`${styles.modalTab} ${
              activeModalTab === "section" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveModalTab("section")}
          >
            Bölmə yarat
          </button>
          <button
            className={`${styles.modalTab} ${
              activeModalTab === "employee" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveModalTab("employee")}
          >
            İşçi yarat
          </button>
        </div>
        <div className={styles.modernModalContent}>
          {/* İşçi Formu */}
          {activeModalTab === "employee" && (
            <div className={styles.tabContent}>
              <div className={styles.modernFormRow}>
                <div className={styles.modernFormGroup}>
                  <label>Ad</label>
                  <input
                    type="text"
                    className={styles.modernInput}
                    placeholder="İşçinin adı"
                  />
                </div>
                <div className={styles.modernFormGroup}>
                  <label>Vəzifə</label>
                  <input
                    type="text"
                    className={styles.modernInput}
                    placeholder="İş yeri"
                  />
                </div>
              </div>
              <div className={styles.modernFormGroup}>
                <label>Email</label>
                <input
                  type="email"
                  className={styles.modernInput}
                  placeholder="email@company.com"
                />
              </div>
              <div className={styles.modernFormGroup}>
                <label>Telefon</label>
                <input
                  type="tel"
                  className={styles.modernInput}
                  placeholder="Telefon nömrəsi"
                />
              </div>
              <div className={styles.modernFormRow}>
                <div className={styles.modernFormGroup}>
                  <label>Departament</label>
                  <select className={styles.modernSelect}>
                    <option>Komplayens Departament</option>
                  </select>
                </div>
                <div className={styles.modernFormGroup}>
                  <label>Şöbə</label>
                  <select className={styles.modernSelect}>
                    <option>Şöbə seç</option>
                    <option>ƏL / TMM üzrə Analitika şöbəsi</option>
                    <option>Məlumatların emalı və Hesabatlıq şöbəsi</option>
                    <option>Komplayens monitorinq şöbəsi</option>
                  </select>
                </div>
              </div>

              {/* Additional Employee Fields */}
              <div className={styles.modernFormRow}>
                <div className={styles.modernFormGroup}>
                  <label>İşə qəbul tarixi</label>
                  <input type="date" className={styles.modernInput} />
                </div>
                <div className={styles.modernFormGroup}>
                  <label>Doğulduğu tarix</label>
                  <input type="date" className={styles.modernInput} />
                </div>
              </div>

              <div className={styles.modernFormRow}>
                <div className={styles.modernFormGroup}>
                  <label>Cinsi</label>
                  <select className={styles.modernSelect}>
                    <option>Cins seç</option>
                    <option>Kişi</option>
                    <option>Qadın</option>
                  </select>
                </div>
                <div className={styles.modernFormGroup}>
                  <label>Ailə vəziyyəti</label>
                  <select className={styles.modernSelect}>
                    <option>Ailə vəziyyəti seç</option>
                    <option>Subay</option>
                    <option>Evli</option>
                    <option>Boşanmış</option>
                  </select>
                </div>
              </div>

              <div className={styles.modernFormGroup}>
                <label>Sənəd yüklə</label>
                <div className={styles.uploadSection}>
                  <div className={styles.uploadItem}>
                    <button className={styles.uploadButton}>
                      <span>📄</span>
                      Sertifikat yüklə
                    </button>
                  </div>
                  <div className={styles.uploadItem}>
                    <button className={styles.uploadButton}>
                      <span>📄</span>
                      Müqavilə yüklə
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.modernFormRow}>
                <div className={styles.modernFormGroup}>
                  <label>Ş/V-nin seriya nömrəsi</label>
                  <input
                    type="text"
                    className={styles.modernInput}
                    placeholder="135875"
                  />
                </div>
                <div className={styles.modernFormGroup}>
                  <label>Fin kod</label>
                  <input
                    type="text"
                    className={styles.modernInput}
                    placeholder="5a5ff34"
                  />
                </div>
              </div>

              <div className={styles.modernFormGroup}>
                <label>Profil şəkli</label>
                <div className={styles.photoUpload}>
                  <div className={styles.photoPlaceholder}>
                    <span>📷</span>
                    <span>Şəkil yüklə</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bölmə Formu */}
          {activeModalTab === "section" && (
            <div className={styles.tabContent}>
              <div className={styles.modernFormGroup}>
                <label>Bölmənin adı</label>
                <input
                  type="text"
                  className={styles.modernInput}
                  placeholder="Bölmə adı"
                />
              </div>
              <div className={styles.modernFormGroup}>
                <label>Aid olduğu şöbə</label>
                <select className={styles.modernSelect}>
                  <option>Şöbə seç</option>
                  <option>ƏL / TMM üzrə Analitika şöbəsi</option>
                  <option>Məlumatların emalı və Hesabatlıq şöbəsi</option>
                  <option>Komplayens monitorinq şöbəsi</option>
                </select>
              </div>
              <div className={styles.modernFormGroup}>
                <label>İşçi sayı</label>
                <input
                  type="number"
                  className={styles.modernInput}
                  placeholder="0"
                />
              </div>
            </div>
          )}

          {/* Şöbə Formu */}
          {activeModalTab === "branch" && (
            <div className={styles.tabContent}>
              <div className={styles.modernFormGroup}>
                <label>Şöbənin adı</label>
                <input
                  type="text"
                  className={styles.modernInput}
                  placeholder="Şöbə adı"
                />
              </div>
              <div className={styles.modernFormGroup}>
                <label>Aid olduğu departament</label>
                <select className={styles.modernSelect}>
                  <option>Komplayens Departament</option>
                </select>
              </div>
              <div className={styles.modernFormRow}>
                <div className={styles.modernFormGroup}>
                  <label>Bölmə sayı</label>
                  <input
                    type="number"
                    className={styles.modernInput}
                    placeholder="0"
                  />
                </div>
                <div className={styles.modernFormGroup}>
                  <label>İşçi sayı</label>
                  <input
                    type="number"
                    className={styles.modernInput}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.modernModalFooter}>
          <button className={styles.modernAddButton}>Əlavə et</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.modernContainer}>
        {/* Modern Header */}
        <div className={styles.modernHeader}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1 className={styles.pageTitle}>
                Komplayens Departamenti Əməkdaşları
              </h1>
            </div>
            <button className={styles.addNewButton} onClick={handleAddEmployee}>
              <UserPlusIcon />
              <span>Yenisini yarat</span>
            </button>
          </div>
        </div>

        {/* Modern Stats Cards */}
        <div className={styles.statsGrid}>
          {overviewStats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statContent}>
                <div className={styles.statInfo}>
                  <h3 className={styles.statTitle}>{stat.label}</h3>
                  <div className={styles.statValue}>{stat.value}</div>
                </div>
                <div className={styles.statIcon}>
                  {index === 0 && <UserPlusIcon />}
                  {index === 1 && <BuildingIcon />}
                  {index === 2 && <GridIcon />}
                  {index === 3 && <UserPlusIcon />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern Employee Directory */}
        <div className={styles.employeeDirectory}>
          <EmployeesTable />
        </div>
      </div>

      {/* Modals */}
      {showDepartmentModal && <DepartmentModal />}
      {showBranchModal && <BranchModal />}
      {showEmployeeModal && <EmployeeModal />}
    </>
  );
};

export default SHR;
