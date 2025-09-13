"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Bell,
  Palette,
  Globe,
  Moon,
  Sun,
  Save,
  Check,
} from "lucide-react";
import styles from "./settings.module.css";
import Header from "../../components/header";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    theme: "light",
    language: "az",
    notifications: true,
    sidebarCollapsed: false,
  });
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const tabs = [
    { id: "general", name: "Ümumi", icon: <Globe size={18} /> },
    { id: "appearance", name: "Görünüş", icon: <Palette size={18} /> },
    { id: "notifications", name: "Bildirişlər", icon: <Bell size={18} /> },
  ];

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('dashboardSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const renderGeneralSettings = () => (
    <div className={styles.settingsSection}>
      <div className={styles.settingGroup}>
        <h3>Dil Seçimi</h3>
        <div className={styles.settingItem}>
          <label>Dil</label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className={styles.selectInput}
          >
            <option value="az">Azərbaycan</option>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className={styles.settingsSection}>
      <div className={styles.settingGroup}>
        <h3>Mövzu</h3>
        <div className={styles.settingItem}>
          <label>Mövzu rejimi</label>
          <div className={styles.themeSelector}>
            <button
              className={`${styles.themeButton} ${settings.theme === 'light' ? styles.themeActive : ''}`}
              onClick={() => handleSettingChange('theme', 'light')}
            >
              <Sun size={20} />
              <span>Açıq</span>
            </button>
            <button
              className={`${styles.themeButton} ${settings.theme === 'dark' ? styles.themeActive : ''}`}
              onClick={() => handleSettingChange('theme', 'dark')}
            >
              <Moon size={20} />
              <span>Qaranlıq</span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.settingGroup}>
        <h3>Görünüş Seçimləri</h3>
        <div className={styles.settingItem}>
          <label className={styles.switchLabel}>
            <input
              type="checkbox"
              checked={settings.sidebarCollapsed}
              onChange={(e) => handleSettingChange('sidebarCollapsed', e.target.checked)}
              className={styles.switchInput}
            />
            <span className={styles.switchSlider}></span>
            <span className={styles.switchText}>Yan paneli kiçik göstər</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className={styles.settingsSection}>
      <div className={styles.settingGroup}>
        <h3>Bildirişlər</h3>
        <div className={styles.settingItem}>
          <label className={styles.switchLabel}>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              className={styles.switchInput}
            />
            <span className={styles.switchSlider}></span>
            <span className={styles.switchText}>Bildirişləri aktiv et</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "appearance":
        return renderAppearanceSettings();
      case "notifications":
        return renderNotificationSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <>
      <Header title="Ayarlar" />
      <div className={styles.container}>
        <div className={styles.settingsContainer}>
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <Settings size={20} />
              <h2>Ayarlar</h2>
            </div>
            <nav className={styles.tabNavigation}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.tabButton} ${
                    activeTab === tab.id ? styles.tabActive : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <h1>{tabs.find(tab => tab.id === activeTab)?.name}</h1>
              <button
                className={styles.saveButton}
                onClick={handleSave}
              >
                <Save size={16} />
                Yadda saxla
              </button>
            </div>

            <div className={styles.settingsContent}>
              {renderTabContent()}
            </div>
          </div>
        </div>

        {showSaveSuccess && (
          <div className={styles.successMessage}>
            <Check size={20} />
            <span>Ayarlar uğurla yadda saxlanıldı!</span>
          </div>
        )}
      </div>
    </>
  );
};

export default SettingsPage;
