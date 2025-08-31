"use client"

import { useState, useEffect, useRef } from "react"
import styles from "./header.module.css"
import { ChevronDown, User, LogOut, Settings, AlertCircle } from "lucide-react"

export default function Header({ title = "Tapşırıq İdarəetmə Sistemi" }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const userDropdownRef = useRef(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const [userData, setUserData] = useState({
    fullName: "İstifadəçi Adı",
    email: "user@example.com",
    role: "Administrator",
    initials: "İA",
  })
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleLogoutClick = (e) => {
    e.preventDefault()
    setShowLogoutConfirm(true)
    setShowDropdown(false)
  }

  const handleConfirmLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    setShowLogoutConfirm(false)
    window.location.href = "/loginform"
  }

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false)
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <h1 className={styles.title}>{title}</h1>
        </div>

        <div className={styles.userSection}>
          <div className={styles.userProfileContainer} ref={userDropdownRef}>
            <div className={styles.userProfile} onClick={toggleDropdown}>
              <div className={styles.userAvatar}>{userData.initials}</div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{userData.fullName}</span>
                <span className={styles.userRole}>{userData.role}</span>
              </div>
              <ChevronDown size={16} className={`${styles.dropdownIcon} ${showDropdown ? styles.rotated : ""}`} />
            </div>

            {showDropdown && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>
                  <div className={styles.dropdownAvatar}>{userData.initials}</div>
                  <div className={styles.dropdownUserInfo}>
                    <h4 className={styles.dropdownUserName}>{userData.fullName}</h4>
                    <p className={styles.dropdownUserEmail}>{userData.email}</p>
                    <span className={styles.dropdownUserRole}>{userData.role}</span>
                  </div>
                </div>

                <div className={styles.dropdownDivider}></div>

                <ul className={styles.dropdownMenu}>
                  <li className={styles.dropdownItem}>
                    <a href="/dashboard/profile" className={styles.dropdownLink}>
                      <User size={16} />
                      <span>Profil</span>
                    </a>
                  </li>
                  <li className={styles.dropdownItem}>
                    <a href="/dashboard/settings" className={styles.dropdownLink}>
                      <Settings size={16} />
                      <span>Tənzimləmələr</span>
                    </a>
                  </li>
                </ul>

                <div className={styles.dropdownDivider}></div>

                <div className={styles.dropdownFooter}>
                  <button id="header-logout-button" className={styles.logoutButton} onClick={handleLogoutClick}>
                    <LogOut size={16} />
                    <span>Çıxış</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
              <button className={styles.logoutPopupCancelButton} onClick={handleCancelLogout}>
                Ləğv et
              </button>
              <button className={styles.logoutPopupConfirmButton} onClick={handleConfirmLogout}>
                Çıxış et
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
