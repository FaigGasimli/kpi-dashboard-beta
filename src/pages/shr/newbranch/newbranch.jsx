"use client";

import { useState, useEffect } from "react";
import styles from "./branch.module.css";
import Header from "../../../components/header";
import { Link, useSearchParams } from "react-router-dom";

const NewBranch = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(
    "Komplayens departamenti"
  );
  const [selectedBranch, setSelectedBranch] = useState("KMS şöbəsi");
  const [selectedSection, setSelectedSection] = useState("KMS Bölməsi");

  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  const [searchParams] = useSearchParams();

  // Auto-open modal based on URL parameter
  useEffect(() => {
    const modalParam = searchParams.get("modal");
    if (modalParam) {
      switch (modalParam) {
        case "department":
          setShowDepartmentModal(true);
          break;
        case "branch":
          setShowBranchModal(true);
          break;
        case "employee":
          setShowEmployeeModal(true);
          break;
        default:
          break;
      }
    }
  }, [searchParams]);

  const departments = [
    "Komplayens departamenti",
    "Rislərin idarə edilməsi departamenti",
    "Nəzarət departamenti",
  ];

  const branches = {
    "Komplayens departamenti": [
      "ƏL / TMM üzrə Analitika şöbəsi",
      "Məlumatların emalı və Hesabatlıq şöbəsi",
      "Komplayens monitorinq şöbəsi",
    ],
    // "Nəzarət departamenti": ["Audit", "Control", "Monitoring"],
    "Rislərin idarə edilməsi departamenti": [
      "Əməliyyat risklərinin idarə edilməsi şöbəsi",
      "Bazar risklərinin idarə edilməsi şöbəsi",
      "Kredit risklərinin idarə edilməsi şöbəsi",
    ],
  };

  const sections = {
    "ƏL / TMM şöbəsi": ["BL Bölməsi", "TMM Bölməsi", "Analitik Bölməsi"],
    "Hesabatlıq şöbəsi": [
      "Daxili Hesabatlıq",
      "Xarici Hesabatlıq",
      "Statistik Bölmə",
    ],
    // "KMS şöbəsi": ["KMS Bölməsi", "Təhlükəsizlik Bölməsi"],
    "Audit şöbəsi": ["Daxili Audit", "Xarici Audit", "Prosedur Bölməsi"],
    "Control şöbəsi": ["Keyfiyyət Nəzarəti", "Əməliyyat Nəzarəti"],
    "Monitoring şöbəsi": ["Real-vaxt Monitoring", "Hesabat Monitoring"],
    "Credit Risk şöbəsi": ["Kredit Analizi", "Risk Qiymətləndirmə"],
    "Market Risk şöbəsi": ["Bazar Analizi", "Portfel Riski"],
    "Operational Risk şöbəsi": ["Əməliyyat Riski", "Texnoloji Risk"],
  };

  const employees = [
    { name: "Vəfa Vahabova", position: "Şöbə rəisi", kpi: "1 il" },
    { name: "Leyla Yusifova", position: "Şöbə rəisi müavini", kpi: "1 il" },
    { name: "Həsanov Kamil", position: "Baş mütəxəssis", kpi: "1 il" },
    { name: "Sain Qurbanov", position: "Şöbə rəisi", kpi: "1 il" },
    { name: "Günel Əlizadə", position: "Mütəxəssis", kpi: "1 il" },
    {
      name: "Ayan Hüseynli",
      position: "2-ci dərəcəli mütəxəssis",
      kpi: "1 il",
    },
    {
      name: "Sənan Hüseynli",
      position: "3-cü dərəcəli mütəxəssis",
      kpi: "1 il",
    },
    { name: "Günah Həsənova", position: "Kiçik mütəxəssis", kpi: "1 il" },
    { name: "Sənan Hüseynli", position: "Təcrübəçi", kpi: "1 il" },
  ];

  const branchManager = "Şaiq Muradzadə";
  const employeeCount = 6;

  const isSectionsDisabled = selectedDepartment === "Komplayens departamenti";

  const getEmployeeAvatar = (name: string, index: number) => {
    const colors = ["linear-gradient(135deg, #9e9e9eff 0%, #9e9e9eff 100%)"];

    return {
      background: colors[index % colors.length],
      initials: name
        .split(" ")
        .map((n) => n[0])
        .join(""),
    };
  };

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

  const SectionModal = () => (
    <div
      className={styles.modalOverlay}
      onClick={() => setShowSectionModal(false)}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Yeni bölmə yarat</h2>
          <button
            className={styles.closeButton}
            onClick={() => setShowSectionModal(false)}
          >
            ×
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.formGroup}>
            <label>Bölmənin adı</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Bölmə adını daxil edin"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Aid olduğu şöbə</label>
            <select className={styles.select}>
              <option>Seç</option>
              <option>BL / TMM şöbəsi</option>
              <option>Hesabatlıq şöbəsi</option>
              <option>KMS şöbəsi</option>
              <option>Audit şöbəsi</option>
              <option>Control şöbəsi</option>
              <option>Monitoring şöbəsi</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>İşçi sayı</label>
            <input type="number" className={styles.input} placeholder="0" />
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={styles.cancelButton}
            onClick={() => setShowSectionModal(false)}
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
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Yeni işçi yarat</h2>
          <button
            className={styles.closeButton}
            onClick={() => setShowEmployeeModal(false)}
          >
            ×
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Ad</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Səbinə"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Soyadı</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Məmmədova"
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Atasının adı</label>
              <input type="text" className={styles.input} placeholder="Vasif" />
            </div>
            <div className={styles.formGroup}>
              <label>Doğulduğu tarixi</label>
              <input
                type="date"
                className={styles.input}
                defaultValue="1995-04-21"
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Aid olduğu departament</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Premium Bank"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Aid olduğu filial</label>
              <select className={styles.select}>
                <option>İnformasiya texnologiyası</option>
                <option>Maliyyə</option>
                <option>İnsan resursları</option>
              </select>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Vəzifə</label>
              <select className={styles.select}>
                <option>Mobile app developer</option>
                <option>Frontend developer</option>
                <option>Backend developer</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>İşə qəbul olduğu tarixi</label>
              <input
                type="date"
                className={styles.input}
                defaultValue="2019-11-21"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Ailə vəziyyəti</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="maritalStatus"
                  value="subay"
                  defaultChecked
                />
                Subay
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="maritalStatus" value="evli" />
                Evli
              </label>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Şənad yüklə</label>
              <div className={styles.uploadSection}>
                <div className={styles.uploadItem}>
                  <button className={styles.uploadButton}>
                    <span>📄</span>
                    Sertifikat yüklə
                  </button>
                  <button className={styles.addFileButton}>Əlavə et +</button>
                </div>
                <div className={styles.uploadItem}>
                  <button className={styles.uploadButton}>
                    <span>📄</span>
                    Müqavilə yüklə
                  </button>
                  <button className={styles.addFileButton}>Əlavə et +</button>
                </div>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>3×4 şəkil yüklə</label>
              <div className={styles.photoUpload}>
                <div className={styles.photoPlaceholder}>
                  <span>📷</span>
                  <span>Choose file</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Ş/V-nin seriya nömrəsi</label>
              <input
                type="text"
                className={styles.input}
                placeholder="135875"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Fin kod</label>
              <input
                type="text"
                className={styles.input}
                placeholder="5a5ff34"
              />
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={styles.cancelButton}
            onClick={() => setShowEmployeeModal(false)}
          >
            Ləğv et
          </button>
          <button className={styles.saveButton}>Yadda saxla</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header title="Strategic Human Resources - Strateji İnsan Resursları" />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Yeni filial</h1>
        </div>

        <div className={styles.mainContent}>
          {/* Column Headers */}
          <div className={styles.columnHeaders}>
            <div className={styles.columnHeader}>
              <h3>Departamentlər</h3>
              <button
                className={styles.addButton}
                onClick={() => setShowDepartmentModal(true)}
              >
                <span className={styles.plusIcon}>+</span>
                Departament yarat
              </button>
            </div>
            <div className={styles.columnHeader}>
              <h3>Şöbələr</h3>
              <button
                className={styles.addButton}
                onClick={() => setShowBranchModal(true)}
              >
                <span className={styles.plusIcon}>+</span>
                Şöbə yarat
              </button>
            </div>
            <div
              className={`${styles.columnHeader} ${
                isSectionsDisabled ? styles.disabledColumn : ""
              }`}
            >
              <h3>Bölmələr</h3>
              <button
                className={`${styles.addButton} ${
                  isSectionsDisabled ? styles.disabledButton : ""
                }`}
                disabled={isSectionsDisabled}
                onClick={() => !isSectionsDisabled && setShowSectionModal(true)}
              >
                <span className={styles.plusIcon}>+</span>
                Bölmə yarat
              </button>
            </div>
            <div className={styles.columnHeader}>
              <h3>Əməkdaşlar</h3>
              <button
                className={styles.addButton}
                onClick={() => setShowEmployeeModal(true)}
              >
                <span className={styles.plusIcon}>+</span>
                Yeni əməkdaş daxil et
              </button>
            </div>
          </div>

          {/* Content Sections */}
          <div className={styles.content}>
            {/* Departments Section */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h4>Yeni filial</h4>
              </div>
              <div className={styles.list}>
                {departments.map((dept, index) => (
                  <div
                    key={index}
                    className={`${styles.listItem} ${
                      selectedDepartment === dept ? styles.selectedItem : ""
                    }`}
                    onClick={() => setSelectedDepartment(dept)}
                  >
                    {dept}
                    <span className={styles.arrow}>›</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Branches Section */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h4>{selectedDepartment}</h4>
              </div>
              <div className={styles.list}>
                {branches[selectedDepartment]?.map((branch, index) => (
                  <div
                    key={index}
                    className={`${styles.listItem} ${
                      selectedBranch === `${branch} şöbəsi`
                        ? styles.selectedItem
                        : ""
                    }`}
                    onClick={() => setSelectedBranch(`${branch} şöbəsi`)}
                  >
                    {branch}
                    <span className={styles.arrow}>›</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`${styles.section} ${
                isSectionsDisabled ? styles.disabledSection : ""
              }`}
            >
              <div className={styles.sectionTitle}>
                <h4>
                  {isSectionsDisabled ? "Bölmələr (Deaktiv)" : selectedBranch}
                </h4>
              </div>
              <div className={styles.list}>
                {!isSectionsDisabled &&
                  sections[selectedBranch]?.map((section, index) => (
                    <div
                      key={index}
                      className={`${styles.listItem} ${
                        selectedSection === section ? styles.selectedItem : ""
                      }`}
                      onClick={() => setSelectedSection(section)}
                    >
                      {section}
                      <span className={styles.arrow}>›</span>
                    </div>
                  ))}
                {isSectionsDisabled && (
                  <div className={styles.disabledMessage}>
                    Kompliyens departamenti üçün bölmələr mövcud deyil
                  </div>
                )}
              </div>
            </div>

            {/* Employees Section */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h4>{isSectionsDisabled ? selectedBranch : selectedSection}</h4>
                <div className={styles.branchInfo}>
                  <div className={styles.branchManager}>
                    Şöbə rəisi:{" "}
                    <span className={styles.managerName}>{branchManager}</span>
                  </div>
                  <div className={styles.employeeCount}>
                    Əməkdaş sayı:{" "}
                    <span className={styles.count}>{employeeCount}</span>
                  </div>
                </div>
              </div>

              <div className={styles.employeeTable}>
                <div className={styles.tableHeader}>
                  <div className={styles.tableHeaderCell}>Ad və soyad</div>
                  <div className={styles.tableHeaderCell}>Vəzifə</div>
                  <div className={styles.tableHeaderCell}>Təcrübə</div>
                </div>

                {employees.map((employee, index) => {
                  const avatar = getEmployeeAvatar(employee.name, index);
                  return (
                    <Link
                      key={index}
                      to="/employees"
                      className={styles.tableRow}
                    >
                      <div className={styles.employeeInfo}>
                        <div
                          className={styles.avatar}
                          style={{ background: avatar.background }}
                        >
                          {avatar.initials}
                        </div>
                        <span className={styles.employeeName}>
                          {employee.name}
                        </span>
                      </div>
                      <div className={styles.position}>{employee.position}</div>
                      <div className={styles.kpi}>{employee.kpi}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {showDepartmentModal && <DepartmentModal />}
        {showBranchModal && <BranchModal />}
        {showSectionModal && <SectionModal />}
        {showEmployeeModal && <EmployeeModal />}
      </div>
    </>
  );
};

export default NewBranch;
