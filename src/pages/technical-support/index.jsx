"use client";

import { useState } from "react";
import {
  HelpCircle,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Send,
  Paperclip,
  User,
  Calendar,
  Tag,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import styles from "./technical-support.module.css";
import Header from "../../components/header";

const TechnicalSupportPage = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "medium",
    description: "",
    attachments: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ Data
  const faqData = [
    {
      id: 1,
      category: "Giriş və Təhlükəsizlik",
      questions: [
        {
          id: 1,
          question: "Şifrəmi unutdum, necə bərpa edə bilərəm?",
          answer:
            "Şifrənizi bərpa etmək üçün giriş səhifəsində 'Şifrəni unutdum' linkinə klikləyin. Email ünvanınıza şifrə bərpa linki göndəriləcək.",
        },
        {
          id: 2,
          question: "İki faktorlu autentifikasi necə aktivləşdirilir?",
          answer:
            "Profil səhifəsində 'Gizlilik və təhlükəsizlik' bölməsinə gedin və 'İki faktorlu autentifikasi' seçimini aktivləşdirin. Mobil tətbiq tələb olunacaq.",
        },
        {
          id: 3,
          question: "Hesabım bloklanıb, nə etməliyəm?",
          answer:
            "Hesabınız bloklanıbsa, dərhal texniki dəstək komandamızla əlaqə saxlayın. 24 saat ərzində cavab verəcəyik.",
        },
      ],
    },
    {
      id: 2,
      category: "KPI İdarəetməsi",
      questions: [
        {
          id: 4,
          question: "Yeni KPI necə əlavə edilir?",
          answer:
            "KPI səhifəsində 'Yeni KPI əlavə et' düyməsinə klikləyin. KPI adı, təsviri, hədəf dəyəri və ölçü vahidini daxil edin.",
        },
        {
          id: 5,
          question: "KPI məlumatlarını necə yeniləyə bilərəm?",
          answer:
            "KPI kartında 'Redaktə et' düyməsinə klikləyin və lazım olan məlumatları dəyişdirin. Dəyişikliklər avtomatik olaraq yadda saxlanılacaq.",
        },
        {
          id: 6,
          question: "KPI hesabatlarını necə yükləyə bilərəm?",
          answer:
            "Hesabatlar səhifəsində istədiyiniz formatı seçin (PDF, Excel) və 'Yüklə' düyməsinə klikləyin.",
        },
      ],
    },
    {
      id: 3,
      category: "İstifadəçi İdarəetməsi",
      questions: [
        {
          id: 7,
          question: "Yeni istifadəçi necə əlavə edilir?",
          answer:
            "SHR səhifəsində 'Yeni əməkdaş' düyməsinə klikləyin və lazım olan məlumatları doldurun. Email ünvanına giriş məlumatları göndəriləcək.",
        },
        {
          id: 8,
          question: "İstifadəçi rollarını necə dəyişdirə bilərəm?",
          answer:
            "İstifadəçi profilində 'Rollar' bölməsinə gedin və istədiyiniz rolları seçin. Dəyişikliklər dərhal təsir göstərəcək.",
        },
        {
          id: 9,
          question: "İstifadəçi hesabını necə deaktivləşdirə bilərəm?",
          answer:
            "İstifadəçi siyahısında istifadəçinin yanındakı 'Daha çox' düyməsinə klikləyin və 'Deaktivləşdir' seçimini edin.",
        },
      ],
    },
    {
      id: 4,
      category: "Texniki Problemlər",
      questions: [
        {
          id: 10,
          question: "Səhifə yüklənmir, nə etməliyəm?",
          answer:
            "Brauzerinizi yeniləyin və ya cache-i təmizləyin. Problem davam edərsə, fərqli brauzer cəhd edin.",
        },
        {
          id: 11,
          question: "Məlumatlar görünmür, səbəbi nədir?",
          answer:
            "Təcrübəçiet bağlantınızı yoxlayın və səhifəni yeniləyin. Problem davam edərsə, texniki dəstəklə əlaqə saxlayın.",
        },
        {
          id: 12,
          question: "Fayllar yüklənmir, necə həll edim?",
          answer:
            "Fayl ölçüsünü yoxlayın (maksimum 10MB). Dəstəklənən formatlar: PDF, DOC, XLS, PNG, JPG.",
        },
      ],
    },
  ];

  // Support Tickets Data
  const supportTickets = [
    {
      id: "TK-2024-001",
      subject: "KPI hesabatları yüklənmir",
      status: "Açıq",
      priority: "Yüksək",
      category: "Texniki Problem",
      createdDate: "25 Dekabr 2024",
      lastUpdate: "2 saat əvvəl",
      assignee: "Texniki Dəstək",
    },
    {
      id: "TK-2024-002",
      subject: "Yeni istifadəçi əlavə etmə problemi",
      status: "Həll edildi",
      priority: "Orta",
      category: "İstifadəçi İdarəetməsi",
      createdDate: "24 Dekabr 2024",
      lastUpdate: "1 gün əvvəl",
      assignee: "Admin",
    },
    {
      id: "TK-2024-003",
      subject: "Şifrə bərpa linki gəlmir",
      status: "Gözləyir",
      priority: "Aşağı",
      category: "Giriş və Təhlükəsizlik",
      createdDate: "23 Dekabr 2024",
      lastUpdate: "3 gün əvvəl",
      assignee: "Texniki Dəstək",
    },
  ];

  // Contact Information
  const contactInfo = {
    phone: "+994 12 123 45 67",
    email: "support@company.com",
    workingHours: "Bazar ertəsi - Cümə: 09:00 - 18:00",
    responseTime: "24 saat ərzində",
  };

  const handleFaqToggle = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Tiket uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.");
      setTicketForm({
        subject: "",
        category: "",
        priority: "medium",
        description: "",
        attachments: [],
      });
    }, 2000);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Açıq: { className: styles.statusOpen, color: "#ef4444" },
      "Həll edildi": { className: styles.statusResolved, color: "#10b981" },
      Gözləyir: { className: styles.statusPending, color: "#f59e0b" },
    };
    return statusConfig[status] || statusConfig["Açıq"];
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      Yüksək: { className: styles.priorityHigh, color: "#ef4444" },
      Orta: { className: styles.priorityMedium, color: "#f59e0b" },
      Aşağı: { className: styles.priorityLow, color: "#10b981" },
    };
    return priorityConfig[priority] || priorityConfig["Orta"];
  };

  const filteredFaqs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <>
      <Header title="Texniki Dəstək" />
      <div className={styles.container}>
        {/* Search and Quick Actions */}
        <div className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Suallarınızı axtarın..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Contact Information Cards */}
        <div className={styles.contactCards}>
          <div className={styles.contactCard}>
            <Phone size={24} className={styles.contactIcon} />
            <div>
              <h3>Telefon Dəstəyi</h3>
              <p>{contactInfo.phone}</p>
              <span className={styles.contactHours}>
                {contactInfo.workingHours}
              </span>
            </div>
          </div>
          <div className={styles.contactCard}>
            <Mail size={24} className={styles.contactIcon} />
            <div>
              <h3>Email Dəstəyi</h3>
              <p>{contactInfo.email}</p>
              <span className={styles.contactHours}>
                {contactInfo.responseTime}
              </span>
            </div>
          </div>
          <div className={styles.contactCard}>
            <Clock size={24} className={styles.contactIcon} />
            <div>
              <h3>İş Saatları</h3>
              <p>Bazar ertəsi - Cümə</p>
              <span className={styles.contactHours}>09:00 - 18:00</span>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.tabContainer}>
              <button
                className={`${styles.tab} ${
                  activeTab === "faq" ? styles.tabActive : ""
                }`}
                onClick={() => setActiveTab("faq")}
              >
                <HelpCircle size={16} />
                Tez-tez verilən suallar
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === "tickets" ? styles.tabActive : ""
                }`}
                onClick={() => setActiveTab("tickets")}
              >
                <FileText size={16} />
                Dəstək tiketləri
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === "new-ticket" ? styles.tabActive : ""
                }`}
                onClick={() => setActiveTab("new-ticket")}
              >
                <Send size={16} />
                Yeni tiket
              </button>
            </div>
          </div>

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div className={styles.faqContent}>
              {filteredFaqs.length === 0 ? (
                <div className={styles.noResults}>
                  <Search size={48} className={styles.noResultsIcon} />
                  <h3>Axtarış nəticəsi tapılmadı</h3>
                  <p>
                    Başqa açar sözlər cəhd edin və ya texniki dəstəklə əlaqə
                    saxlayın.
                  </p>
                </div>
              ) : (
                filteredFaqs.map((category) => (
                  <div key={category.id} className={styles.faqCategory}>
                    <h3 className={styles.categoryTitle}>
                      {category.category}
                    </h3>
                    <div className={styles.faqList}>
                      {category.questions.map((faq) => (
                        <div key={faq.id} className={styles.faqItem}>
                          <button
                            className={styles.faqQuestion}
                            onClick={() => handleFaqToggle(faq.id)}
                          >
                            <span>{faq.question}</span>
                            {expandedFaq === faq.id ? (
                              <ChevronUp size={20} />
                            ) : (
                              <ChevronDown size={20} />
                            )}
                          </button>
                          {expandedFaq === faq.id && (
                            <div className={styles.faqAnswer}>
                              <p>{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Support Tickets Tab */}
          {activeTab === "tickets" && (
            <div className={styles.ticketsContent}>
              <div className={styles.ticketsHeader}>
                <div className={styles.ticketsFilter}>
                  <Filter size={16} />
                  <select className={styles.filterSelect}>
                    <option>Bütün statuslar</option>
                    <option>Açıq</option>
                    <option>Həll edildi</option>
                    <option>Gözləyir</option>
                  </select>
                </div>
              </div>
              <div className={styles.ticketsList}>
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className={styles.ticketCard}>
                    <div className={styles.ticketHeader}>
                      <div className={styles.ticketInfo}>
                        <h4 className={styles.ticketSubject}>
                          {ticket.subject}
                        </h4>
                        <span className={styles.ticketId}>{ticket.id}</span>
                      </div>
                      <div className={styles.ticketActions}>
                        <span
                          className={`${styles.statusBadge} ${
                            getStatusBadge(ticket.status).className
                          }`}
                        >
                          {ticket.status}
                        </span>
                        <span
                          className={`${styles.priorityBadge} ${
                            getPriorityBadge(ticket.priority).className
                          }`}
                        >
                          {ticket.priority}
                        </span>
                        <button className={styles.moreButton}>
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                    <div className={styles.ticketDetails}>
                      <div className={styles.ticketMeta}>
                        <span className={styles.ticketCategory}>
                          {ticket.category}
                        </span>
                        <span className={styles.ticketDate}>
                          Yaradılıb: {ticket.createdDate}
                        </span>
                        <span className={styles.ticketUpdate}>
                          Son yeniləmə: {ticket.lastUpdate}
                        </span>
                      </div>
                      <div className={styles.ticketAssignee}>
                        <User size={14} />
                        <span>{ticket.assignee}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Ticket Tab */}
          {activeTab === "new-ticket" && (
            <div className={styles.newTicketContent}>
              <form onSubmit={handleTicketSubmit} className={styles.ticketForm}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Mövzu *</label>
                    <input
                      type="text"
                      value={ticketForm.subject}
                      onChange={(e) =>
                        setTicketForm({
                          ...ticketForm,
                          subject: e.target.value,
                        })
                      }
                      placeholder="Problemin qısa təsviri"
                      required
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Kateqoriya *</label>
                    <select
                      value={ticketForm.category}
                      onChange={(e) =>
                        setTicketForm({
                          ...ticketForm,
                          category: e.target.value,
                        })
                      }
                      required
                      className={styles.formSelect}
                    >
                      <option value="">Kateqoriya seçin</option>
                      <option value="technical">Texniki Problem</option>
                      <option value="user-management">
                        İstifadəçi İdarəetməsi
                      </option>
                      <option value="security">Giriş və Təhlükəsizlik</option>
                      <option value="kpi">KPI İdarəetməsi</option>
                      <option value="other">Digər</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Prioritet *</label>
                    <select
                      value={ticketForm.priority}
                      onChange={(e) =>
                        setTicketForm({
                          ...ticketForm,
                          priority: e.target.value,
                        })
                      }
                      required
                      className={styles.formSelect}
                    >
                      <option value="low">Aşağı</option>
                      <option value="medium">Orta</option>
                      <option value="high">Yüksək</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Problemin təsviri *</label>
                  <textarea
                    value={ticketForm.description}
                    onChange={(e) =>
                      setTicketForm({
                        ...ticketForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Problemi ətraflı təsvir edin..."
                    required
                    rows={6}
                    className={styles.formTextarea}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Əlavə fayllar</label>
                  <div className={styles.fileUpload}>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                      className={styles.fileInput}
                    />
                    <button type="button" className={styles.fileUploadButton}>
                      <Paperclip size={16} />
                      Fayl əlavə et
                    </button>
                  </div>
                  <p className={styles.fileHint}>
                    Dəstəklənən formatlar: PDF, DOC, XLS, PNG, JPG (maksimum
                    10MB)
                  </p>
                </div>
                <div className={styles.formActions}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitButton}
                  >
                    {isSubmitting ? "Göndərilir..." : "Tiket Göndər"}
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Help Resources */}
        <div className={styles.helpResources}>
          <h3>Faydalı Resurslar</h3>
          <div className={styles.resourcesGrid}>
            <div className={styles.resourceCard}>
              <FileText size={24} className={styles.resourceIcon} />
              <h4>İstifadəçi Təlimatı</h4>
              <p>Sistemin bütün funksiyaları haqqında ətraflı məlumat</p>
              <button className={styles.resourceButton}>
                <Download size={16} />
                Yüklə
              </button>
            </div>
            <div className={styles.resourceCard}>
              <ExternalLink size={24} className={styles.resourceIcon} />
              <h4>Video Təlimatlar</h4>
              <p>Əsas funksiyaların video təlimatları</p>
              <button className={styles.resourceButton}>
                <ExternalLink size={16} />
                Bax
              </button>
            </div>
            <div className={styles.resourceCard}>
              <HelpCircle size={24} className={styles.resourceIcon} />
              <h4>Əlaqə Mərkəzi</h4>
              <p>Ətraflı sual-cavab bölməsi</p>
              <button className={styles.resourceButton}>
                <ExternalLink size={16} />
                Keç
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TechnicalSupportPage;
