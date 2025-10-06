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
      department: "Komplayens Departamenti",
      branch: "KMS şöbəsi",
      taskCompletionPercentage: 95,
      kpiPercentage: 85,
      status: "Aktiv",
    },
    {
      id: 2,
      name: "Rəşad Məmmədov",
      position: "HR məsləhətçisi",
      department: "Komplayens Departamenti",
      branch: "KMS şöbəsi",
      taskCompletionPercentage: 88,
      kpiPercentage: 75,
      status: "Aktiv",
    },
    {
      id: 3,
      name: "Jalə Hüseynova",
      position: "HR məsləhətçisi",
      department: "Komplayens Departamenti",
      branch: "KMS şöbəsi",
      taskCompletionPercentage: 92,
      kpiPercentage: 78,
      status: "Aktiv",
    },
    {
      id: 4,
      name: "Nigar Əliyeva",
      position: "HR məsləhətçisi",
      department: "Komplayens Departamenti",
      branch: "KMS şöbəsi",
      taskCompletionPercentage: 85,
      kpiPercentage: 70,
      status: "Aktiv",
    },
    {
      id: 5,
      name: "Elçin Babayev",
      position: "HR məsləhətçisi",
      department: "Komplayens Departamenti",
      branch: "KMS şöbəsi",
      taskCompletionPercentage: 78,
      kpiPercentage: 65,
      status: "Aktiv",
    },
    {
      id: 6,
      name: "Aygün Məmmədova",
      position: "HR məsləhətçisi",
      department: "Komplayens Departamenti",
      branch: "KMS şöbəsi",
      taskCompletionPercentage: 90,
      kpiPercentage: 80,
      status: "Aktiv",
    },
    {
      id: 7,
      name: "Tural Əliyev",
      position: "HR məsləhətçisi",
      department: "Komplayens Departamenti",
      branch: "KMS şöbəsi",
      taskCompletionPercentage: 82,
      kpiPercentage: 68,
      status: "Aktiv",
    },
    {
      id: 8,
      name: "Günel Həsənova",
      position: "HR məsləhətçisi",
      department: "Komplayens Departamenti",
      branch: "KMS şöbəsi",
      taskCompletionPercentage: 96,
      kpiPercentage: 90,
      status: "Aktiv",
    },
    {
      id: 9,
      name: "Rəvan Quliyev",
      position: "HR məsləhətçisi",
      department: "Komplayens Departamenti",
      branch: "KMS şöbəsi",
      taskCompletionPercentage: 89,
      kpiPercentage: 72,
      status: "Aktiv",
    },
    {
      id: 10,
      name: "Leyla Məmmədova",
      position: "HR məsləhətçisi",
      department: "Komplayens Departamenti",
      branch: "KMS şöbəsi",
      taskCompletionPercentage: 87,
      kpiPercentage: 69,
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
                ƏL / TMM üzrə Analitika şöbəsi
              </option>
              <option value="Risk İdarəetməsi">Məlumatların emalı və Hesabatlıq şöbəsi</option>
              <option value="Hüquq Şöbəsi">Komplayens monitorinq şöbəsi</option>
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
                <th>Şöbə</th>
                <th>Tapşırıq icra faizi</th>
                <th>KPI faizi</th>
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
                  <td className={styles.percentageCell}>
                    <div className={styles.percentageValue}>
                      {employee.taskCompletionPercentage}%
                    </div>
                  </td>
                  <td className={styles.percentageCell}>
                    <div className={styles.percentageValue}>
                      {employee.kpiPercentage}%
                    </div>
                  </td>
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
