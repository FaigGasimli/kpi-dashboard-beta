import { useState } from "react";
import styles from "../task.module.css";

const KanbanFilters = ({
  onFilterChange,
  onSortChange,
  onSearchChange,
  departments,
  executors,
}) => {
  const [filters, setFilters] = useState({
    department: "",
    executor: "",
    priority: "",
    dateRange: "",
    status: "",
  });

  const [sortBy, setSortBy] = useState("deadline");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    onSortChange(sortType);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  const clearFilters = () => {
    const clearedFilters = {
      department: "",
      executor: "",
      priority: "",
      dateRange: "",
      status: "",
    };
    setFilters(clearedFilters);
    setSortBy("deadline");
    setSearchTerm("");
    onFilterChange(clearedFilters);
    onSortChange("deadline");
    onSearchChange("");
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== "").length + (searchTerm ? 1 : 0);
  };

  return (
    <div className={styles.kanbanFilters}>
      <div className={styles.filtersHeader}>
        <h3 className={styles.filtersTitle}>Filtr və Axtarış</h3>
        {getActiveFiltersCount() > 0 && (
          <button className={styles.clearFiltersButton} onClick={clearFilters}>
            Təmizlə ({getActiveFiltersCount()})
          </button>
        )}
      </div>

      <div className={styles.filtersGrid}>
        {/* Search */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Axtarış</label>
          <input
            type="text"
            placeholder="Tapşırıq adı, icraçı və ya təsvir..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Department Filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Departament</label>
          <select
            value={filters.department}
            onChange={(e) => handleFilterChange("department", e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Bütün departamentlər</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Executor Filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>İcraçı</label>
          <select
            value={filters.executor}
            onChange={(e) => handleFilterChange("executor", e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Bütün icraçılar</option>
            {executors.map((executor) => (
              <option key={executor} value={executor}>
                {executor}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Prioritet</label>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Bütün prioritetlər</option>
            <option value="high">Yüksək (8-10)</option>
            <option value="medium">Orta (5-7)</option>
            <option value="low">Aşağı (1-4)</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Tarix Aralığı</label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange("dateRange", e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Bütün tarixlər</option>
            <option value="today">Bu gün</option>
            <option value="week">Bu həftə</option>
            <option value="month">Bu ay</option>
            <option value="overdue">Gecikmiş</option>
            <option value="upcoming">Yaxın gələcək (7 gün)</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Bütün statuslar</option>
            <option value="Gözləyən">Gözləyən</option>
            <option value="Davam Edən">Davam Edən</option>
            <option value="Tamamlanmış">Tamamlanmış</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Sıralama</label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="deadline">Deadline tarixi</option>
            <option value="priority">Prioritet (ağırlıq)</option>
            <option value="created">Yaradılma tarixi</option>
            <option value="executor">İcraçı adı</option>
            <option value="name">Tapşırıq adı</option>
          </select>
        </div>
      </div>

      {/* Quick Filter Buttons */}
      <div className={styles.quickFilters}>
        <button
          className={`${styles.quickFilterButton} ${
            filters.priority === "high" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("priority", filters.priority === "high" ? "" : "high")}
        >
          Yüksək Prioritet
        </button>
        <button
          className={`${styles.quickFilterButton} ${
            filters.dateRange === "overdue" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("dateRange", filters.dateRange === "overdue" ? "" : "overdue")}
        >
          Gecikmiş
        </button>
        <button
          className={`${styles.quickFilterButton} ${
            filters.status === "Davam Edən" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("status", filters.status === "Davam Edən" ? "" : "Davam Edən")}
        >
          Davam Edən
        </button>
        <button
          className={`${styles.quickFilterButton} ${
            filters.dateRange === "today" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("dateRange", filters.dateRange === "today" ? "" : "today")}
        >
          Bu Gün
        </button>
      </div>
    </div>
  );
};

export default KanbanFilters;
