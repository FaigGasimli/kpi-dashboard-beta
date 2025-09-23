"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Save,
  X,
  Eye,
  EyeOff,
  UserCheck,
  Shield,
  Users,
  Settings,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Key,
  Lock,
} from "lucide-react";
import styles from "./user-roles.module.css";
import Header from "../../components/header";

const UserRolesPage = () => {
  const [activeTab, setActiveTab] = useState("roles");
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for roles
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Administrator",
      description: "Tam sistem idarəetməsi və bütün KPI-ların nəzarəti",
      permissions: {
        canEnterKPIData: true,
        canSuperviseKPIs: true,
        canManageUsers: true,
        canViewAllData: true,
        canEditRoles: true,
        canDeleteData: true,
      },
      userCount: 3,
      status: "active",
      color: "#dc2626",
    },
    {
      id: 2,
      name: "Şöbə Rəisi",
      description: "Şöbə səviyyəsində KPI idarəetməsi və əməkdaş nəzarəti",
      permissions: {
        canEnterKPIData: true,
        canSuperviseKPIs: true,
        canManageUsers: false,
        canViewAllData: false,
        canEditRoles: false,
        canDeleteData: false,
      },
      userCount: 8,
      status: "active",
      color: "#ea580c",
    },
    {
      id: 3,
      name: "Baş Mütəxəssis",
      description: "KPI məlumatlarının daxil edilməsi və komanda nəzarəti",
      permissions: {
        canEnterKPIData: true,
        canSuperviseKPIs: true,
        canManageUsers: false,
        canViewAllData: false,
        canEditRoles: false,
        canDeleteData: false,
      },
      userCount: 15,
      status: "active",
      color: "#d97706",
    },
    {
      id: 4,
      name: "Aparıcı Mütəxəssis",
      description: "KPI məlumatlarının daxil edilməsi və məhdud nəzarət",
      permissions: {
        canEnterKPIData: true,
        canSuperviseKPIs: false,
        canManageUsers: false,
        canViewAllData: false,
        canEditRoles: false,
        canDeleteData: false,
      },
      userCount: 25,
      status: "active",
      color: "#059669",
    },
    {
      id: 5,
      name: "Mütəxəssis",
      description: "Yalnız öz KPI məlumatlarının daxil edilməsi",
      permissions: {
        canEnterKPIData: true,
        canSuperviseKPIs: false,
        canManageUsers: false,
        canViewAllData: false,
        canEditRoles: false,
        canDeleteData: false,
      },
      userCount: 45,
      status: "active",
      color: "#0891b2",
    },
    {
      id: 6,
      name: "Təcrübəçi",
      description: "Məhdud KPI məlumatları daxil edilməsi",
      permissions: {
        canEnterKPIData: false,
        canSuperviseKPIs: false,
        canManageUsers: false,
        canViewAllData: false,
        canEditRoles: false,
        canDeleteData: false,
      },
      userCount: 12,
      status: "active",
      color: "#7c3aed",
    },
  ]);

  // Mock data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Vəfa Vahabova",
      email: "vefa.vahabova@company.com",
      role: "Administrator",
      department: "Komplayens / KMS şöbəsi",
      status: "active",
      lastLogin: "2 saat əvvəl",
      kpiDataEntry: true,
      supervision: true,
    },
    {
      id: 2,
      name: "Leyla Əliyeva",
      email: "leyla.aliyeva@company.com",
      role: "Şöbə Rəisi",
      department: "ƏL/TMM Şöbəsi",
      status: "active",
      lastLogin: "1 gün əvvəl",
      kpiDataEntry: true,
      supervision: true,
    },
    {
      id: 3,
      name: "Rəşad Həsənov",
      email: "rashad.hasanov@company.com",
      role: "Baş Mütəxəssis",
      department: "MEŞ / Hesabatlıq şöbəsi",
      status: "active",
      lastLogin: "3 saat əvvəl",
      kpiDataEntry: true,
      supervision: true,
    },
    {
      id: 4,
      name: "Həvva Orucova",
      email: "hevva.orucova@company.com",
      role: "Aparıcı Mütəxəssis",
      department: "Komplayens Monitorinq Şöbəsi",
      status: "active",
      lastLogin: "5 saat əvvəl",
      kpiDataEntry: true,
      supervision: false,
    },
    {
      id: 5,
      name: "Adəm Əsgərov",
      email: "adem.askerov@company.com",
      role: "Mütəxəssis",
      department: "Kredit Risk Şöbəsi",
      status: "active",
      lastLogin: "1 gün əvvəl",
      kpiDataEntry: true,
      supervision: false,
    },
    {
      id: 6,
      name: "Nigar Əhmədova",
      email: "nigar.ahmadova@company.com",
      role: "Təcrübəçi",
      department: "ƏL/TMM Şöbəsi",
      status: "active",
      lastLogin: "2 gün əvvəl",
      kpiDataEntry: false,
      supervision: false,
    },
  ]);

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: {
      canEnterKPIData: false,
      canSuperviseKPIs: false,
      canManageUsers: false,
      canViewAllData: false,
      canEditRoles: false,
      canDeleteData: false,
    },
    color: "#6b7280",
  });

  const handleAddRole = () => {
    if (newRole.name.trim()) {
      const role = {
        ...newRole,
        id: roles.length + 1,
        userCount: 0,
        status: "active",
      };
      setRoles([...roles, role]);
      setNewRole({
        name: "",
        description: "",
        permissions: {
          canEnterKPIData: false,
          canSuperviseKPIs: false,
          canManageUsers: false,
          canViewAllData: false,
          canEditRoles: false,
          canDeleteData: false,
        },
        color: "#6b7280",
      });
      setIsAddingRole(false);
    }
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setNewRole(role);
    setIsEditingRole(true);
  };

  const handleSaveEdit = () => {
    if (newRole.name.trim()) {
      setRoles(
        roles.map((role) =>
          role.id === selectedRole.id
            ? { ...newRole, userCount: role.userCount, status: role.status }
            : role
        )
      );
      setIsEditingRole(false);
      setSelectedRole(null);
      setNewRole({
        name: "",
        description: "",
        permissions: {
          canEnterKPIData: false,
          canSuperviseKPIs: false,
          canManageUsers: false,
          canViewAllData: false,
          canEditRoles: false,
          canDeleteData: false,
        },
        color: "#6b7280",
      });
    }
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm("Bu rolu silmək istədiyinizə əminsiniz?")) {
      setRoles(roles.filter((role) => role.id !== roleId));
    }
  };

  const filteredRoles = roles.filter((role) => {
    const matchesSearch =
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || role.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getPermissionIcon = (permission) => {
    switch (permission) {
      case "canEnterKPIData":
        return <Key size={16} />;
      case "canSuperviseKPIs":
        return <Eye size={16} />;
      case "canManageUsers":
        return <Users size={16} />;
      case "canViewAllData":
        return <Shield size={16} />;
      case "canEditRoles":
        return <Settings size={16} />;
      case "canDeleteData":
        return <Trash2 size={16} />;
      default:
        return <Lock size={16} />;
    }
  };

  const getPermissionLabel = (permission) => {
    switch (permission) {
      case "canEnterKPIData":
        return "KPI məlumatları daxil edə bilər";
      case "canSuperviseKPIs":
        return "KPI-ları nəzarət edə bilər";
      case "canManageUsers":
        return "İstifadəçiləri idarə edə bilər";
      case "canViewAllData":
        return "Bütün məlumatları görə bilər";
      case "canEditRoles":
        return "Rolları redaktə edə bilər";
      case "canDeleteData":
        return "Məlumatları silə bilər";
      default:
        return "Naməlum icazə";
    }
  };

  return (
    <>
      <Header title="İstifadəçi Rolları" />
      <div className={styles.container}>
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${
              activeTab === "roles" ? styles.tabActive : ""
            }`}
            onClick={() => setActiveTab("roles")}
          >
            <UserCheck size={18} />
            Rollar
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "users" ? styles.tabActive : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={18} />
            İstifadəçilər
          </button>
        </div>

        {activeTab === "roles" && (
          <div className={styles.rolesSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.searchAndFilter}>
                <div className={styles.searchBox}>
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Rol axtar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className={styles.filterSelect}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Bütün statuslar</option>
                  <option value="active">Aktiv</option>
                  <option value="inactive">Qeyri-aktiv</option>
                </select>
              </div>
              <button
                className={styles.addButton}
                onClick={() => setIsAddingRole(true)}
              >
                <Plus size={16} />
                Yeni rol əlavə et
              </button>
            </div>

            <div className={styles.rolesGrid}>
              {filteredRoles.map((role) => (
                <div key={role.id} className={styles.roleCard}>
                  <div className={styles.roleHeader}>
                    <div className={styles.roleInfo}>
                      <div
                        className={styles.roleColor}
                        style={{ backgroundColor: role.color }}
                      ></div>
                      <div>
                        <h3 className={styles.roleName}>{role.name}</h3>
                        <p className={styles.roleDescription}>
                          {role.description}
                        </p>
                      </div>
                    </div>
                    <div className={styles.roleActions}>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEditRole(role)}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteRole(role.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.roleStats}>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>İstifadəçi sayı:</span>
                      <span className={styles.statValue}>{role.userCount}</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Status:</span>
                      <span
                        className={`${styles.statusBadge} ${styles.statusActive}`}
                      >
                        {role.status === "active" ? "Aktiv" : "Qeyri-aktiv"}
                      </span>
                    </div>
                  </div>

                  <div className={styles.permissionsList}>
                    <h4 className={styles.permissionsTitle}>İcazələr:</h4>
                    <div className={styles.permissionsGrid}>
                      {Object.entries(role.permissions).map(
                        ([permission, hasPermission]) => (
                          <div
                            key={permission}
                            className={`${styles.permissionItem} ${
                              hasPermission
                                ? styles.permissionActive
                                : styles.permissionInactive
                            }`}
                          >
                            {getPermissionIcon(permission)}
                            <span className={styles.permissionLabel}>
                              {getPermissionLabel(permission)}
                            </span>
                            {hasPermission ? (
                              <CheckCircle
                                size={14}
                                className={styles.checkIcon}
                              />
                            ) : (
                              <X size={14} className={styles.xIcon} />
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className={styles.usersSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.searchAndFilter}>
                <div className={styles.searchBox}>
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="İstifadəçi axtar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className={styles.filterSelect}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Bütün statuslar</option>
                  <option value="active">Aktiv</option>
                  <option value="inactive">Qeyri-aktiv</option>
                </select>
              </div>
              <button className={styles.addButton}>
                <UserPlus size={16} />
                Yeni istifadəçi əlavə et
              </button>
            </div>

            <div className={styles.usersTable}>
              <div className={styles.tableHeader}>
                <span>İstifadəçi</span>
                <span>Rol</span>
                <span>Departament</span>
                <span>KPI Daxil Etmə</span>
                <span>Nəzarət</span>
                <span>Status</span>
                <span>Son giriş</span>
                <span>Əməliyyatlar</span>
              </div>
              {filteredUsers.map((user) => (
                <div key={user.id} className={styles.tableRow}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className={styles.userName}>{user.name}</div>
                      <div className={styles.userEmail}>{user.email}</div>
                    </div>
                  </div>
                  <span className={styles.userRole}>{user.role}</span>
                  <span className={styles.userDepartment}>
                    {user.department}
                  </span>
                  <span className={styles.kpiDataEntry}>
                    {user.kpiDataEntry ? (
                      <CheckCircle size={16} className={styles.checkIcon} />
                    ) : (
                      <X size={16} className={styles.xIcon} />
                    )}
                  </span>
                  <span className={styles.supervision}>
                    {user.supervision ? (
                      <CheckCircle size={16} className={styles.checkIcon} />
                    ) : (
                      <X size={16} className={styles.xIcon} />
                    )}
                  </span>
                  <span
                    className={`${styles.statusBadge} ${styles.statusActive}`}
                  >
                    {user.status === "active" ? "Aktiv" : "Qeyri-aktiv"}
                  </span>
                  <span className={styles.lastLogin}>{user.lastLogin}</span>
                  <div className={styles.userActions}>
                    <button className={styles.editButton}>
                      <Edit size={14} />
                    </button>
                    <button className={styles.deleteButton}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add/Edit Role Modal */}
        {(isAddingRole || isEditingRole) && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>
                  {isAddingRole ? "Yeni rol əlavə et" : "Rolu redaktə et"}
                </h2>
                <button
                  className={styles.closeButton}
                  onClick={() => {
                    setIsAddingRole(false);
                    setIsEditingRole(false);
                    setSelectedRole(null);
                    setNewRole({
                      name: "",
                      description: "",
                      permissions: {
                        canEnterKPIData: false,
                        canSuperviseKPIs: false,
                        canManageUsers: false,
                        canViewAllData: false,
                        canEditRoles: false,
                        canDeleteData: false,
                      },
                      color: "#6b7280",
                    });
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <div className={styles.modalContent}>
                <div className={styles.formGroup}>
                  <label>Rol adı</label>
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) =>
                      setNewRole({ ...newRole, name: e.target.value })
                    }
                    placeholder="Rol adını daxil edin"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Təsvir</label>
                  <textarea
                    value={newRole.description}
                    onChange={(e) =>
                      setNewRole({ ...newRole, description: e.target.value })
                    }
                    placeholder="Rol təsvirini daxil edin"
                    className={styles.formTextarea}
                    rows={3}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Rol rəngi</label>
                  <div className={styles.colorPicker}>
                    {[
                      "#dc2626",
                      "#ea580c",
                      "#d97706",
                      "#059669",
                      "#0891b2",
                      "#7c3aed",
                      "#6b7280",
                    ].map((color) => (
                      <button
                        key={color}
                        className={`${styles.colorOption} ${
                          newRole.color === color ? styles.colorSelected : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewRole({ ...newRole, color })}
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <div className={styles.permissionsSectionTitle}>
                    <Shield size={18} />
                    İcazələr
                  </div>
                  <div className={styles.permissionsForm}>
                    {Object.entries(newRole.permissions).map(
                      ([permission, hasPermission]) => (
                        <div
                          key={permission}
                          className={styles.permissionFormItem}
                        >
                          <label className={styles.permissionCheckbox}>
                            <input
                              type="checkbox"
                              checked={hasPermission}
                              onChange={(e) =>
                                setNewRole({
                                  ...newRole,
                                  permissions: {
                                    ...newRole.permissions,
                                    [permission]: e.target.checked,
                                  },
                                })
                              }
                            />
                            <span className={styles.checkboxLabel}>
                              {getPermissionIcon(permission)}
                              {getPermissionLabel(permission)}
                            </span>
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setIsAddingRole(false);
                    setIsEditingRole(false);
                    setSelectedRole(null);
                    setNewRole({
                      name: "",
                      description: "",
                      permissions: {
                        canEnterKPIData: false,
                        canSuperviseKPIs: false,
                        canManageUsers: false,
                        canViewAllData: false,
                        canEditRoles: false,
                        canDeleteData: false,
                      },
                      color: "#6b7280",
                    });
                  }}
                >
                  Ləğv et
                </button>
                <button
                  className={styles.saveButton}
                  onClick={isAddingRole ? handleAddRole : handleSaveEdit}
                >
                  <Save size={16} />
                  {isAddingRole ? "Əlavə et" : "Yadda saxla"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserRolesPage;
