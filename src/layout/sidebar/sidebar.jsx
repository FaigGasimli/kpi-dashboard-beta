"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "../../assests/logo.png";
import {
  ChevronRight,
  X,
  Home,
  Users,
  BarChart3,
  ClipboardList,
  DollarSign,
  UserCheck,
  User,
  Settings,
  HelpCircle,
  AlertCircle,
} from "lucide-react";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [expandedMenus, setExpandedMenus] = useState(() => {
    if (typeof window !== "undefined") {
      const savedExpandedMenus = localStorage.getItem("expandedMenus");
      return savedExpandedMenus ? JSON.parse(savedExpandedMenus) : {};
    }
    return {};
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [activeItem, setActiveItem] = useState("Home page");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    {
      name: "Ana səhifə",
      icon: <Home size={18} />,
      href: "/",
      hasSubmenu: false,
    },
    { name: "SHR", icon: <Users size={18} />, href: "/shr", hasSubmenu: false },
    {
      name: "KPI",
      icon: <BarChart3 size={18} />,
      href: "/kpi",
      hasSubmenu: false,
    },
    {
      name: "Tapşırıqlar paneli",
      icon: <ClipboardList size={18} />,
      href: "/management",
      hasSubmenu: false,
    },
    {
      name: "Maliyyə",
      icon: <DollarSign size={18} />,
      href: "/finance",
      hasSubmenu: false,
    },
    {
      name: "İstifadəçi rolları",
      icon: <UserCheck size={18} />,
      href: "/user-roles",
      hasSubmenu: false,
    },
    {
      name: "Profil",
      icon: <User size={18} />,
      href: "/profile",
      hasSubmenu: false,
    },
  ];

  const bottomMenuItems = [
    {
      name: "Ayarlar",
      icon: <Settings size={18} />,
      href: "/settings",
      hasSubmenu: false,
    },
    {
      name: "Texniki dəstək",
      icon: <HelpCircle size={18} />,
      href: "/support",
      hasSubmenu: false,
    },
  ];

  useEffect(() => {
    let foundActiveItem = false;

    for (const item of [...menuItems, ...bottomMenuItems]) {
      if (item.href === pathname) {
        setActiveItem(item.name);
        foundActiveItem = true;
        break;
      }
      if (item.hasSubmenu && item.submenuItems) {
        for (const subItem of item.submenuItems) {
          if (subItem.href === pathname) {
            setActiveItem(item.name);
            setExpandedMenus((prev) => ({ ...prev, [item.name]: true }));
            foundActiveItem = true;
            break;
          }
        }
        if (foundActiveItem) break;
      }
    }

    if (!foundActiveItem && pathname === "/") {
      const dashboardItem = menuItems.find((item) => item.href === "/");
      if (dashboardItem) setActiveItem(dashboardItem.name);
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("expandedMenus", JSON.stringify(expandedMenus));
    }
  }, [expandedMenus]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const logoutPopup = document.getElementById("logout-popup");
      const logoutButton = document.getElementById("logout-button");
      if (
        showLogoutConfirm &&
        logoutPopup &&
        !logoutPopup.contains(event.target) &&
        logoutButton &&
        !logoutButton.contains(event.target)
      ) {
        setShowLogoutConfirm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogoutConfirm]);

  const toggleMenu = (menuName, e) => {
    if (
      e.target.closest(`.${styles.chevronContainer}`) ||
      e.target.closest(`.${styles.chevronBox}`) ||
      e.target.closest(`.${styles.chevron}`)
    ) {
      e.preventDefault();
      e.stopPropagation();
      setExpandedMenus((prev) => ({
        ...prev,
        [menuName]: !prev[menuName],
      }));
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleMenuItemClick = (item, e) => {
    setActiveItem(item.name);
    if (
      e.target.closest(`.${styles.chevronContainer}`) ||
      e.target.closest(`.${styles.chevronBox}`) ||
      e.target.closest(`.${styles.chevron}`)
    ) {
      e.preventDefault();
      e.stopPropagation();
      if (item.hasSubmenu) {
        setExpandedMenus((prev) => ({
          ...prev,
          [item.name]: !prev[item.name],
        }));
      }
      return;
    }
    if (isMobile && !item.hasSubmenu) {
      setSidebarOpen(false);
    }
  };

  const handleConfirmLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("expandedMenus");
      sessionStorage.clear();
      sessionStorage.setItem("loggedOut", "true");
    }
    setShowLogoutConfirm(false);
    window.location.href = "/loginform";
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      {isMobile && !sidebarOpen && (
        <div className={styles.mobileIndicator} onClick={toggleSidebar}>
          <div className={styles.verticalLine}></div>
          <div className={styles.arrowContainer}>
            <ChevronRight size={20} className={styles.arrowIcon} />
          </div>
        </div>
      )}

      <div
        className={`
          ${styles.sidebar} 
          ${isMobile ? styles.mobileSidebar : styles.desktopSidebar} 
          ${isMobile && !sidebarOpen ? styles.sidebarClosed : ""}
        `}
      >
        <div className={styles.sidebarBg}>
          <div className={styles.bgPattern}></div>
          <div className={styles.bgGlow}></div>
        </div>

        <div className={styles.sidebarHeader}>
          <div className={styles.logoFull}>
            <img src={Logo} alt="" />
          </div>
        </div>

        <div className={styles.sidebarContent}>
          <ul className={styles.menuList}>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`${styles.menuItem} ${
                  activeItem === item.name ? styles.activeItem : ""
                }`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <Link
                  to={item.href}
                  className={`${styles.menuLink} ${
                    activeItem === item.name ? styles.activeLink : ""
                  }`}
                  onClick={(e) => handleMenuItemClick(item, e)}
                >
                  <div className={styles.menuIconBox}>
                    <div className={styles.menuIcon}>
                      {item.icon}
                      <div className={styles.iconRipple}></div>
                    </div>
                    {hoverIndex === index && activeItem !== item.name && (
                      <div className={styles.hoverEffect}></div>
                    )}
                    {activeItem === item.name && (
                      <div className={styles.activeEffect}></div>
                    )}
                  </div>
                  <span className={styles.menuText}>{item.name}</span>
                  {item.hasSubmenu && (
                    <span
                      className={styles.chevronContainer}
                      onClick={(e) => toggleMenu(item.name, e)}
                    >
                      <div
                        className={`${styles.chevronBox} ${
                          expandedMenus[item.name] ? styles.chevronExpanded : ""
                        }`}
                      >
                        <ChevronRight size={14} className={styles.chevron} />
                      </div>
                    </span>
                  )}
                </Link>

                {item.hasSubmenu && (
                  <ul
                    className={`${styles.submenu} ${
                      expandedMenus[item.name] ? styles.submenuExpanded : ""
                    }`}
                  >
                    {item.submenuItems &&
                      item.submenuItems.map((subItem, subIndex) => (
                        <li key={subIndex} className={styles.submenuItem}>
                          <Link
                            href={subItem.href}
                            className={`${styles.submenuLink} ${
                              pathname === subItem.href
                                ? styles.activeSubmenuLink
                                : ""
                            }`}
                            onClick={() => {
                              if (isMobile) {
                                setSidebarOpen(false);
                              }
                            }}
                          >
                            <span className={styles.submenuDot}></span>
                            <span className={styles.submenuText}>
                              {subItem.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className={styles.bottomMenuSection}>
            <ul className={styles.menuList}>
              {bottomMenuItems.map((item, index) => (
                <li
                  key={index}
                  className={`${styles.menuItem} ${
                    activeItem === item.name ? styles.activeItem : ""
                  }`}
                  onMouseEnter={() => setHoverIndex(menuItems.length + index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <Link
                    href={item.href}
                    className={`${styles.menuLink} ${
                      activeItem === item.name ? styles.activeLink : ""
                    }`}
                    onClick={(e) => handleMenuItemClick(item, e)}
                  >
                    <div className={styles.menuIconBox}>
                      <div className={styles.menuIcon}>
                        {item.icon}
                        <div className={styles.iconRipple}></div>
                      </div>
                      {hoverIndex === menuItems.length + index &&
                        activeItem !== item.name && (
                          <div className={styles.hoverEffect}></div>
                        )}
                      {activeItem === item.name && (
                        <div className={styles.activeEffect}></div>
                      )}
                    </div>
                    <span className={styles.menuText}>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {isMobile && sidebarOpen && (
          <button className={styles.closeButton} onClick={toggleSidebar}>
            <X size={24} />
          </button>
        )}
      </div>

      {isMobile && sidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}

      {showLogoutConfirm && (
        <div className={styles.logoutPopupOverlay}>
          <div id="logout-popup" className={styles.logoutPopup}>
            <div className={styles.logoutPopupHeader}>
              <div className={styles.logoutPopupIcon}>
                <AlertCircle size={20} />
              </div>
              <h3>Çıxış etmək istəyirsiniz?</h3>
            </div>
            <div className={styles.logoutPopupContent}>
              <p>Sistemdən çıxış etmək istədiyinizə əminsiniz?</p>
            </div>
            <div className={styles.logoutPopupActions}>
              <button
                className={styles.logoutPopupCancelButton}
                onClick={handleCancelLogout}
              >
                Ləğv et
              </button>
              <button
                className={styles.logoutPopupConfirmButton}
                onClick={handleConfirmLogout}
              >
                Çıxış et
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
