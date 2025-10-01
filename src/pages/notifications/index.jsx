"use client";

import { useState, useEffect } from "react";
import Header from "../../components/header";
import { 
  ClipboardList, 
  BarChart3, 
  Users, 
  Settings, 
  GraduationCap, 
  Clock, 
  DollarSign, 
  FileText,
  Check,
  RotateCcw,
  Filter
} from "lucide-react";
import styles from "./notifications.module.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Sample notifications data
  const sampleNotifications = [
    {
      id: 1,
      title: "Yeni tapşırıq təyin edildi",
      message: "Sizə 'Komplayens hesabatının hazırlanması' tapşırığı təyin edildi. Deadline: 25.01.2025",
      type: "task",
      priority: "high",
      isRead: false,
      createdAt: "2025-01-15T10:30:00",
      sender: "Rəşad Məmmədov",
      department: "Komplayens"
    },
    {
      id: 2,
      title: "KPI hədəfi yerinə yetirildi",
      message: "Q4 dövrü üçün KPI hədəfləriniz 120% yerinə yetirildi. Təbriklər!",
      type: "kpi",
      priority: "medium",
      isRead: false,
      createdAt: "2025-01-14T15:45:00",
      sender: "KPI Sistemi",
      department: "KPI"
    },
    {
      id: 3,
      title: "Məzuniyyət təsdiqləndi",
      message: "20-25 Yanvar tarixləri üçün məzuniyyət təyiniz təsdiqləndi.",
      type: "hr",
      priority: "low",
      isRead: true,
      createdAt: "2025-01-13T09:15:00",
      sender: "HR Departamenti",
      department: "İnsan Resursları"
    },
    {
      id: 4,
      title: "Sistem yenilənməsi",
      message: "Sistem 22 Yanvar saat 02:00-da yenilənəcək. Zəhmət olmasa işlərinizi qeyd edin.",
      type: "system",
      priority: "high",
      isRead: false,
      createdAt: "2025-01-12T16:20:00",
      sender: "IT Departamenti",
      department: "Texniki Dəstək"
    },
    {
      id: 5,
      title: "Təlim təyin edildi",
      message: "28 Yanvar tarixində 'Risk İdarəetmə' təlimi təyin edildi. Qatılım məcburidir.",
      type: "training",
      priority: "medium",
      isRead: true,
      createdAt: "2025-01-11T11:30:00",
      sender: "Təlim Mərkəzi",
      department: "İnsan Resursları"
    },
    {
      id: 6,
      title: "Deadline yaxınlaşır",
      message: "Müştəri şikayətlərinin həlli tapşırığının deadline-ı 3 gün qalıb.",
      type: "reminder",
      priority: "high",
      isRead: false,
      createdAt: "2025-01-10T14:00:00",
      sender: "Tapşırıq Sistemi",
      department: "Tapşırıq İdarəetmə"
    },
    {
      id: 7,
      title: "Bonus hesablandı",
      message: "Dekabr ayı üçün performans bonusunuz hesablandı: 500 AZN",
      type: "finance",
      priority: "medium",
      isRead: true,
      createdAt: "2025-01-09T12:00:00",
      sender: "Maliyyə Departamenti",
      department: "Maliyyə"
    },
    {
      id: 8,
      title: "Yeni əməkdaş qəbul edildi",
      message: "IT şöbəsinə yeni əməkdaş qəbul edildi: Tural Həsənov",
      type: "hr",
      priority: "low",
      isRead: false,
      createdAt: "2025-01-08T10:15:00",
      sender: "HR Departamenti",
      department: "İnsan Resursları"
    },
    {
      id: 9,
      title: "Sistem xətası aşkarlandı",
      message: "KPI hesablama modulunda kiçik xəta aşkarlandı. Texniki dəstək tərəfindən həll edilir.",
      type: "system",
      priority: "medium",
      isRead: true,
      createdAt: "2025-01-07T08:45:00",
      sender: "Texniki Dəstək",
      department: "Texniki Dəstək"
    },
    {
      id: 10,
      title: "Aylıq hesabat hazırdır",
      message: "Dekabr ayı üçün departament hesabatı hazırdır və gözden keçirilməyi gözləyir.",
      type: "report",
      priority: "medium",
      isRead: false,
      createdAt: "2025-01-06T17:30:00",
      sender: "Hesabat Sistemi",
      department: "Monitorinq və Hesabat"
    }
  ];

  useEffect(() => {
    setNotifications(sampleNotifications);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === "all" || 
      (filter === "unread" && !notification.isRead) ||
      (filter === "confirmed" && notification.status === "confirmed") ||
      (filter === "canceled" && notification.status === "canceled") ||
      (filter === "information" && notification.type === "information");
    
    const matchesSearch = searchTerm === "" ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.sender.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "task":
        return <ClipboardList size={20} className={styles.taskIcon} />;
      case "kpi":
        return <BarChart3 size={20} className={styles.kpiIcon} />;
      case "hr":
        return <Users size={20} className={styles.hrIcon} />;
      case "system":
        return <Settings size={20} className={styles.systemIcon} />;
      case "training":
        return <GraduationCap size={20} className={styles.trainingIcon} />;
      case "reminder":
        return <Clock size={20} className={styles.reminderIcon} />;
      case "finance":
        return <DollarSign size={20} className={styles.financeIcon} />;
      case "report":
        return <FileText size={20} className={styles.reportIcon} />;
      default:
        return <ClipboardList size={20} className={styles.defaultIcon} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return styles.priorityHigh;
      case "medium":
        return styles.priorityMedium;
      case "low":
        return styles.priorityLow;
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "İndi";
    } else if (diffInHours < 24) {
      return `${diffInHours} saat əvvəl`;
    } else if (diffInHours < 48) {
      return "Dünən";
    } else {
      return date.toLocaleDateString('az-AZ');
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <Header title="Bildirişlər" />
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <h1 className={styles.title}>Bildirişlər</h1>
          <div className={styles.headerActions}>
            <Check className={styles.headerIcon} />
            <RotateCcw className={styles.headerIcon} />
            <Filter 
              className={`${styles.headerIcon} ${styles.filterIcon} ${showFilters ? styles.active : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        {showFilters && (
          <div className={styles.filterTabs}>
            <button
              className={`${styles.filterTab} ${filter === "all" ? styles.active : ""}`}
              onClick={() => setFilter("all")}
            >
              Hamısı ({notifications.length})
            </button>
            <button
              className={`${styles.filterTab} ${filter === "unread" ? styles.active : ""}`}
              onClick={() => setFilter("unread")}
            >
              Oxunmamış ({unreadCount})
            </button>
            <button
              className={`${styles.filterTab} ${filter === "confirmed" ? styles.active : ""}`}
              onClick={() => setFilter("confirmed")}
            >
              Təsdiqlənmiş (10)
            </button>
            <button
              className={`${styles.filterTab} ${filter === "canceled" ? styles.active : ""}`}
              onClick={() => setFilter("canceled")}
            >
              Ləğv edilmiş (0)
            </button>
            <button
              className={`${styles.filterTab} ${filter === "information" ? styles.active : ""}`}
              onClick={() => setFilter("information")}
            >
              Məlumat (0)
            </button>
          </div>
        )}


        {/* Notifications List */}
        <div className={styles.notificationsList}>
          {filteredNotifications.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔔</div>
              <h3>Bildiriş yoxdur</h3>
              <p>Seçilmiş filterə uyğun bildiriş tapılmadı.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`${styles.notificationItem} ${
                  !notification.isRead ? styles.unread : ""
                }`}
              >
                <div className={styles.notificationHeader}>
                  <div className={styles.statusIcon}>
                    <Check size={12} />
                  </div>
                  <span className={styles.notificationTime}>
                    {formatDate(notification.createdAt)}
                  </span>
                </div>
                
                <h3 className={styles.notificationTitle}>
                  {notification.title}
                </h3>
                
                <p className={styles.notificationMessage}>
                  {notification.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
