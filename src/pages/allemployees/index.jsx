"use client";

import { useState, useEffect } from "react";
import Header from "../../components/header";
import styles from "./allemployees.module.css";

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    branch: "",
    department: "",
    division: "",
    search: ""
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
      status: "Aktiv"
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
      status: "Aktiv"
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
      status: "Aktiv"
    },
    {
      id: 4,
      name: "Təranə Qasımova",
      position: "HR məsləhətçisi",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      division: "Komplayens departamenti",
      email: "terane.gasimova@bank.az",
      phone: "+994 50 456 78 90",
      hireDate: "05.09.2020",
      status: "Aktiv"
    },
    {
      id: 5,
      name: "Nigar Əliyeva",
      position: "HR məsləhətçisi",
      department: "İnsan Resursları",
      branch: "KMS şöbəsi",
      division: "Komplayens departamenti",
      email: "nigar.aliyeva@bank.az",
      phone: "+994 50 567 89 01",
      hireDate: "12.01.2021",
      status: "Aktiv"
    },
    {
      id: 6,
      name: "Elçin Məmmədov",
      position: "Maliyyə məsləhətçisi",
      department: "Maliyyə",
      branch: "Maliyyə şöbəsi",
      division: "Maliyyə departamenti",
      email: "elchin.mammadov@bank.az",
      phone: "+994 50 678 90 12",
      hireDate: "20.04.2019",
      status: "Aktiv"
    },
    {
      id: 7,
      name: "Aygün Əliyeva",
      position: "Maliyyə məsləhətçisi",
      department: "Maliyyə",
      branch: "Maliyyə şöbəsi",
      division: "Maliyyə departamenti",
      email: "aygun.aliyeva@bank.az",
      phone: "+994 50 789 01 23",
      hireDate: "08.07.2020",
      status: "Aktiv"
    },
    {
      id: 8,
      name: "Rəşad Həsənov",
      position: "Texniki dəstək məsləhətçisi",
      department: "Texniki Dəstək",
      branch: "IT şöbəsi",
      division: "Texniki dəstək departamenti",
      email: "rashad.hasanov@bank.az",
      phone: "+994 50 890 12 34",
      hireDate: "15.11.2017",
      status: "Aktiv"
    },
    {
      id: 9,
      name: "Leyla Məmmədova",
      position: "Texniki dəstək məsləhətçisi",
      department: "Texniki Dəstək",
      branch: "IT şöbəsi",
      division: "Texniki dəstək departamenti",
      email: "leyla.mammadova@bank.az",
      phone: "+994 50 901 23 45",
      hireDate: "03.02.2019",
      status: "Aktiv"
    },
    {
      id: 10,
      name: "Səbinə Əliyeva",
      position: "KPI məsləhətçisi",
      department: "KPI",
      branch: "KPI şöbəsi",
      division: "KPI departamenti",
      email: "sabina.aliyeva@bank.az",
      phone: "+994 50 012 34 56",
      hireDate: "25.05.2021",
      status: "Aktiv"
    },
    {
      id: 11,
      name: "Orxan Məmmədov",
      position: "KPI məsləhətçisi",
      department: "KPI",
      branch: "KPI şöbəsi",
      division: "KPI departamenti",
      email: "orkhan.mammadov@bank.az",
      phone: "+994 50 123 45 67",
      hireDate: "18.08.2022",
      status: "Aktiv"
    },
    {
      id: 12,
      name: "Günel Həsənova",
      position: "Tapşırıq idarəetmə məsləhətçisi",
      department: "Tapşırıq İdarəetmə",
      branch: "Tapşırıq şöbəsi",
      division: "Tapşırıq idarəetmə departamenti",
      email: "gunel.hasanova@bank.az",
      phone: "+994 50 234 56 78",
      hireDate: "30.10.2020",
      status: "Aktiv"
    },
    {
      id: 13,
      name: "Rəvan Əliyev",
      position: "Tapşırıq idarəetmə məsləhətçisi",
      department: "Tapşırıq İdarəetmə",
      branch: "Tapşırıq şöbəsi",
      division: "Tapşırıq idarəetmə departamenti",
      email: "revan.aliyev@bank.az",
      phone: "+994 50 345 67 89",
      hireDate: "12.03.2021",
      status: "Aktiv"
    },
    {
      id: 14,
      name: "Aysel Məmmədova",
      position: "İstifadəçi rolları məsləhətçisi",
      department: "İstifadəçi Rolları",
      branch: "İstifadəçi rolları şöbəsi",
      division: "İstifadəçi rolları departamenti",
      email: "aysel.mammadova@bank.az",
      phone: "+994 50 456 78 90",
      hireDate: "07.06.2019",
      status: "Aktiv"
    },
    {
      id: 15,
      name: "Tural Həsənov",
      position: "İstifadəçi rolları məsləhətçisi",
      department: "İstifadəçi Rolları",
      branch: "İstifadəçi rolları şöbəsi",
      division: "İstifadəçi rolları departamenti",
      email: "tural.hasanov@bank.az",
      phone: "+994 50 567 89 01",
      hireDate: "14.09.2020",
      status: "Aktiv"
    },
    {
      id: 16,
      name: "Fəridə Məmmədova",
      position: "Risk idarəetmə məsləhətçisi",
      department: "Risk İdarəetmə",
      branch: "Risk şöbəsi",
      division: "Risk idarəetmə departamenti",
      email: "farida.mammadova@bank.az",
      phone: "+994 50 678 90 12",
      hireDate: "22.01.2018",
      status: "Aktiv"
    },
    {
      id: 17,
      name: "Rəşad Əliyev",
      position: "Risk idarəetmə məsləhətçisi",
      department: "Risk İdarəetmə",
      branch: "Risk şöbəsi",
      division: "Risk idarəetmə departamenti",
      email: "rashad.aliyev@bank.az",
      phone: "+994 50 789 01 23",
      hireDate: "15.04.2019",
      status: "Aktiv"
    },
    {
      id: 18,
      name: "Günelə Həsənova",
      position: "Müştəri xidmətləri məsləhətçisi",
      department: "Müştəri Xidmətləri",
      branch: "Müştəri xidmətləri şöbəsi",
      division: "Müştəri xidmətləri departamenti",
      email: "gunela.hasanova@bank.az",
      phone: "+994 50 890 12 34",
      hireDate: "08.07.2020",
      status: "Aktiv"
    },
    {
      id: 19,
      name: "Tural Məmmədov",
      position: "Müştəri xidmətləri məsləhətçisi",
      department: "Müştəri Xidmətləri",
      branch: "Müştəri xidmətləri şöbəsi",
      division: "Müştəri xidmətləri departamenti",
      email: "tural.mammadov@bank.az",
      phone: "+994 50 901 23 45",
      hireDate: "12.11.2021",
      status: "Aktiv"
    },
    {
      id: 20,
      name: "Leyla Əliyeva",
      position: "Hüquq məsləhətçisi",
      department: "Hüquq",
      branch: "Hüquq şöbəsi",
      division: "Hüquq departamenti",
      email: "leyla.aliyeva@bank.az",
      phone: "+994 50 012 34 56",
      hireDate: "05.03.2017",
      status: "Aktiv"
    }
  ];

  useEffect(() => {
    setEmployees(sampleEmployees);
    setFilteredEmployees(sampleEmployees);
  }, []);

  useEffect(() => {
    let filtered = employees;

    // Apply filters
    if (filters.branch) {
      filtered = filtered.filter(emp => emp.branch === filters.branch);
    }
    if (filters.department) {
      filtered = filtered.filter(emp => emp.department === filters.department);
    }
    if (filters.division) {
      filtered = filtered.filter(emp => emp.division === filters.division);
    }
    if (filters.search) {
      filtered = filtered.filter(emp => 
        emp.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        emp.position.toLowerCase().includes(filters.search.toLowerCase()) ||
        emp.email.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, employees]);

  // Get unique values for filter dropdowns
  const branches = [...new Set(employees.map(emp => emp.branch))];
  const departments = [...new Set(employees.map(emp => emp.department))];
  const divisions = [...new Set(employees.map(emp => emp.division))];

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.paginationBtn} ${currentPage === i ? styles.active : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className={styles.pagination}>
        <button
          className={styles.paginationBtn}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Əvvəlki
        </button>
        {pages}
        <button
          className={styles.paginationBtn}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Növbəti
        </button>
      </div>
    );
  };

  return (
    <>
      <Header title="Əməkdaşlar" />
      <div className={styles.employeesContainer}>
        {/* Filters Section */}
        <div className={styles.filtersSection}>
          <div className={styles.filtersRow}>
            <div className={styles.filterGroup}>
              <label>Filial:</label>
              <select
                value={filters.branch}
                onChange={(e) => handleFilterChange('branch', e.target.value)}
              >
                <option value="">Bütün filiallar</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Departament:</label>
              <select
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              >
                <option value="">Bütün departamentlər</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Şöbə:</label>
              <select
                value={filters.division}
                onChange={(e) => handleFilterChange('division', e.target.value)}
              >
                <option value="">Bütün şöbələr</option>
                {divisions.map(division => (
                  <option key={division} value={division}>{division}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Axtarış:</label>
              <input
                type="text"
                placeholder="Ad, vəzifə və ya email ilə axtar..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className={styles.resultsSummary}>
          <p>Cəmi {filteredEmployees.length} əməkdaş tapıldı</p>
        </div>

        {/* Employees Table */}
        <div className={styles.employeesTableContainer}>
          <table className={styles.employeesTable}>
            <thead>
              <tr>
                <th>№</th>
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
              {currentEmployees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{startIndex + index + 1}</td>
                  <td className={styles.employeeName}>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.branch}</td>
                  <td>{employee.division}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.hireDate}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[employee.status.toLowerCase()]}`}>
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.paginationContainer}>
            {renderPagination()}
            <div className={styles.paginationInfo}>
              {startIndex + 1}-{Math.min(endIndex, filteredEmployees.length)} / {filteredEmployees.length} nəticə
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllEmployees;
