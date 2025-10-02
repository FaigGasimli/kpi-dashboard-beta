"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EmployeesTable.module.css";

const EmployeesTable = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    branch: "",
    department: "",
    division: "",
    search: "",
  });

  // Sample employee data
  const sampleEmployees = [
    {
      id: 1,
      name: "Vəfa Vahabova Namiq qızı",
      position: "KMS şöbəsi rəisi",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      division: "Komplayens departamenti",
      email: "vefa.vahabova@bank.az",
      phone: "+994 50 123 45 67",
      hireDate: "21.02.2012",
      status: "Aktiv",
    },
    {
      id: 2,
      name: "Rəşad Məmmədov",
      position: "HR məsləhətçisi",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      division: "Komplayens departamenti",
      email: "rashad.mammadov@bank.az",
      phone: "+994 50 234 56 78",
      hireDate: "15.03.2015",
      status: "Aktiv",
    },
    {
      id: 3,
      name: "Jalə Hüseynova",
      position: "HR məsləhətçisi",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      division: "Komplayens departamenti",
      email: "jale.huseynova@bank.az",
      phone: "+994 50 345 67 89",
      hireDate: "10.06.2018",
      status: "Aktiv",
    },
    {
      id: 4,
      name: "Nigar Əliyeva",
      position: "HR məsləhətçisi",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      division: "Komplayens departamenti",
      email: "nigar.aliyeva@bank.az",
      phone: "+994 50 456 78 90",
      hireDate: "05.09.2019",
      status: "Aktiv",
    },
    {
      id: 5,
      name: "Elçin Babayev",
      position: "HR məsləhətçisi",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      division: "Komplayens departamenti",
      email: "elcin.babayev@bank.az",
      phone: "+994 50 567 89 01",
      hireDate: "12.01.2020",
      status: "Aktiv",
    },
    {
      id: 6,
      name: "Aygün Məmmədova",
      position: "HR məsləhətçisi",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      division: "Komplayens departamenti",
      email: "aygun.mammadova@bank.az",
      phone: "+994 50 678 90 12",
      hireDate: "20.03.2021",
      status: "Aktiv",
    },
    {
      id: 7,
      name: "Tural Əliyev",
      position: "HR məsləhətçisi",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      division: "Komplayens departamenti",
      email: "tural.aliyev@bank.az",
      phone: "+994 50 789 01 23",
      hireDate: "08.07.2022",
      status: "Aktiv",
    },
    {
      id: 8,
      name: "Günel Həsənova",
      position: "HR məsləhətçisi",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      division: "Komplayens departamenti",
      email: "gunel.hasanova@bank.az",
      phone: "+994 50 890 12 34",
      hireDate: "15.11.2022",
      status: "Aktiv",
    },
    {
      id: 9,
      name: "Rəvan Quliyev",
      position: "HR məsləhətçisi",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      division: "Komplayens departamenti",
      email: "revan.quliyev@bank.az",
      phone: "+994 50 901 23 45",
      hireDate: "03.02.2023",
      status: "Aktiv",
    },
    {
      id: 10,
      name: "Leyla Məmmədova",
      position: "HR məsləhətçisi",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      division: "Komplayens departamenti",
      email: "leyla.mammadova@bank.az",
      phone: "+994 50 012 34 56",
      hireDate: "18.05.2023",
      status: "Aktiv",
    },
  ];

  useEffect(() => {
    setEmployees(sampleEmployees);
    setFilteredEmployees(sampleEmployees);
  }, []);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    setCurrentPage(1);

    let filtered = sampleEmployees;

    if (newFilters.branch) {
      filtered = filtered.filter((emp) =>
        emp.branch.toLowerCase().includes(newFilters.branch.toLowerCase())
      );
    }

    if (newFilters.department) {
      filtered = filtered.filter((emp) =>
        emp.department
          .toLowerCase()
          .includes(newFilters.department.toLowerCase())
      );
    }

    if (newFilters.division) {
      filtered = filtered.filter((emp) =>
        emp.division.toLowerCase().includes(newFilters.division.toLowerCase())
      );
    }

    if (newFilters.search) {
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(newFilters.search.toLowerCase()) ||
          emp.position
            .toLowerCase()
            .includes(newFilters.search.toLowerCase()) ||
          emp.email.toLowerCase().includes(newFilters.search.toLowerCase())
      );
    }

    setFilteredEmployees(filtered);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEmployeeClick = (employeeId) => {
    navigate(`/employees/${employeeId}`);
  };

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  return (
    <div className={styles.employeesContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <div className={styles.titleRow}>
              <div>
                <h1 className={styles.pageTitle}>Əməkdaşlar</h1>
                <p className={styles.pageSubtitle}>
                  Bütün əməkdaşların siyahısı və idarəetməsi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <div className={styles.filtersRow}>
          <div className={styles.filterGroup}>
            <label>Şöbə</label>
            <select
              value={filters.division}
              onChange={(e) => handleFilterChange("division", e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Bütün şöbələr</option>
              <option value="Komplayens departamenti">
                Komplayens departamenti
              </option>
              <option value="Risk İdarəetməsi">Risk İdarəetməsi</option>
              <option value="Hüquq Şöbəsi">Hüquq Şöbəsi</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Axtarış</label>
            <input
              type="text"
              placeholder="Ad, vəzifə və ya email ilə axtar"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className={styles.filterInput}
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className={styles.tableSection}>
        <div className={styles.tableContainer}>
          <table className={styles.employeesTable}>
            <thead>
              <tr>
                <th>Ad Soyad</th>
                <th>Vəzifə</th>
                <th>Departament</th>
                <th>Filial</th>
                <th>Şöbə</th>
                <th>Email</th>
                <th>Telefon</th>
                <th>İşə qəbul tarixi</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className={styles.clickableRow}
                  onClick={() => handleEmployeeClick(employee.id)}
                >
                  <td className={styles.nameCell}>
                    <div className={styles.employeeName}>{employee.name}</div>
                  </td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.branch}</td>
                  <td>{employee.division}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.hireDate}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[employee.status.toLowerCase()]
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button
            className={styles.paginationBtn}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Əvvəlki
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`${styles.paginationBtn} ${
                currentPage === page ? styles.active : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className={styles.paginationBtn}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Növbəti
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeesTable;
