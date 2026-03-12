"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Plus,
  LayoutDashboard,
  BookOpen,
  Copy,
  Pencil,
  Power,
  Trash2,
  ArrowLeft,
  Star,
  Paperclip,
  Video,
  Search,
  Filter,
  BadgeCheck,
  Link as LinkIcon,
  FileText,
  Video as VideoIcon,
  File,
} from "lucide-react";
import Header from "../../components/header";
import styles from "./trainings.module.css";
import QuizModal from "./components/QuizModal";
import CertificateView from "./components/CertificateView";
import sampleVideo from "../../assests/video.mp4";

const STORAGE_KEY = "hrd_trainings_state_v1";
const CURRENT_COMPANY_ID = "company-hr-dynamics";
const CURRENT_USER_ID = "user-static-1";
const CURRENT_USER_NAME = "İstifadəçi Adı";

const TRAINING_CATEGORIES = [
  "Ümumi",
  "Hüquq",
  "Karyera",
  "Soft Skills",
  "İdarəetmə",
  "Texniki",
];

const GLOBAL_TEMPLATES = [
  {
    id: "labor-law",
    title: "Əmək Məcəlləsi Təlimi",
    description: "Əmək qanunvericiliyi, müqavilələr, iş münasibətləri.",
    category: "Hüquq",
    durationSec: 1800,
  },
  {
    id: "career-dev",
    title: "Karyera İnkişafı Təlimi",
    description: "Karyera planlaşdırılması və inkişaf strategiyaları.",
    category: "Karyera",
    durationSec: 2400,
  },
  {
    id: "prof-skills",
    title: "Peşəkar Bacarıqlar Təlimi",
    description: "Kommunikasiya, təqdimat, əməkdaşlıq bacarıqları.",
    category: "Soft Skills",
    durationSec: 2100,
  },
];

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        trainings: [],
        progressByTrainingId: {},
        ratingsByTrainingId: {},
        notesByTrainingId: {},
      };
    }
    const parsed = JSON.parse(raw);
    const trainings = (parsed.trainings || []).map((t) => ({
      ...t,
      quiz: Array.isArray(t?.quiz) ? t.quiz : [],
      dueDate: t?.dueDate ?? "",
      prerequisiteId: t?.prerequisiteId ?? "",
      resources: Array.isArray(t?.resources)
        ? t.resources.map((r) => ({
            ...r,
            type: r?.type || "link",
          }))
        : [],
    }));
    return {
      trainings,
      progressByTrainingId: parsed.progressByTrainingId || {},
      ratingsByTrainingId: parsed.ratingsByTrainingId || {},
      notesByTrainingId: parsed.notesByTrainingId || {},
    };
  } catch (e) {
    return {
      trainings: [],
      progressByTrainingId: {},
      ratingsByTrainingId: {},
      notesByTrainingId: {},
    };
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatDuration(sec) {
  if (!sec || sec <= 0) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m >= 60) {
    const h = Math.floor(m / 60);
    const rm = m % 60;
    return `${h} saat ${rm} dəq`;
  }
  return `${m} dəq ${s.toString().padStart(2, "0")} san`;
}

function pct(num) {
  if (!num || Number.isNaN(num)) return 0;
  return Math.max(0, Math.min(100, Math.round(num)));
}

function isOverdue(dueDate) {
  if (!dueDate) return false;
  const end = new Date(`${dueDate}T23:59:59.999`);
  if (Number.isNaN(end.getTime())) return false;
  return Date.now() > end.getTime();
}

function safeDateText(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("az-AZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function TrainingsPage() {
  const { trainingId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(trainingId ? "employee" : "admin");
  const [state, setState] = useState(() => loadState());
  const [editForm, setEditForm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [quizOpen, setQuizOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    if (trainingId) {
      setTab("employee");
    }
  }, [trainingId]);

  const trainings = useMemo(
    () => state.trainings.filter((t) => t.companyId === CURRENT_COMPANY_ID),
    [state.trainings]
  );

  const activeTrainings = trainings.filter((t) => t.isActive);

  const currentTraining = trainingId
    ? trainings.find((t) => t.id === trainingId)
    : null;

  const handleCreateTraining = () => {
    setEditForm({
      mode: "create",
      id: null,
      title: "",
      description: "",
      category: "Ümumi",
      durationMin: "",
      videoUrl: "",
      dueDate: "",
      quiz: [],
      prerequisiteId: "",
      resources: [],
    });
    setIsModalOpen(true);
  };

  const handleCloneTemplate = (template) => {
    const id = `tmpl-${template.id}-${Date.now()}`;
    const training = {
      id,
      companyId: CURRENT_COMPANY_ID,
      title: template.title,
      description: template.description,
      category: template.category,
      coverImageUrl: "",
      videoUrl: "",
      durationSec: template.durationSec,
      status: "draft",
      isActive: false,
      fromTemplateId: template.id,
      attachments: [],
      dueDate: "",
      quiz: [],
      prerequisiteId: "",
      resources: [],
    };
    setState((prev) => ({
      ...prev,
      trainings: [...prev.trainings, training],
    }));
  };

  const handleToggleActive = (id) => {
    setState((prev) => ({
      ...prev,
      trainings: prev.trainings.map((t) =>
        t.id === id ? { ...t, isActive: !t.isActive, status: "published" } : t
      ),
    }));
  };

  const handleDeleteTraining = (id) => {
    setDeleteConfirmId(id);
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirmId) return;
    const id = deleteConfirmId;
    setState((prev) => {
      const next = {
        ...prev,
        trainings: prev.trainings.filter((t) => t.id !== id),
      };
      delete next.progressByTrainingId[id];
      delete next.ratingsByTrainingId[id];
      delete next.notesByTrainingId[id];
      return next;
    });
    setDeleteConfirmId(null);
    if (trainingId === id) navigate("/dashboard/trainings");
  };

  const handleOpenEditTraining = (training) => {
    setEditForm({
      mode: "edit",
      id: training.id,
      title: training.title || "",
      description: training.description || "",
      category: training.category || "Ümumi",
      durationMin: training.durationSec ? Math.round(training.durationSec / 60) : "",
      videoUrl: training.videoUrl || "",
      dueDate: training.dueDate || "",
      quiz: Array.isArray(training.quiz) ? training.quiz : [],
      prerequisiteId: training.prerequisiteId || "",
      resources: Array.isArray(training.resources) ? training.resources : [],
    });
    setIsModalOpen(true);
  };

  const handleSubmitTrainingModal = () => {
    if (!editForm || !editForm.title.trim()) return;
    const durationSec = Math.max(0, parseInt(editForm.durationMin, 10) || 0) * 60;
    const videoUrl = (editForm.videoUrl || "").trim();
    const category = (editForm.category || "Ümumi").trim() || "Ümumi";
    const dueDate = (editForm.dueDate || "").trim();
    const quizRaw = Array.isArray(editForm.quiz) ? editForm.quiz.slice(0, 5) : [];
    const quiz = quizRaw
      .map((q) => ({
        id: q?.id || `q-${Date.now()}`,
        question: (q?.question || "").toString(),
        options: Array.isArray(q?.options)
          ? q.options.map((o) => (o ?? "").toString())
          : [],
        correctIndex:
          typeof q?.correctIndex === "number"
            ? q.correctIndex
            : Number(q?.correctIndex ?? 0) || 0,
      }))
      .map((q) => ({
        ...q,
        options: q.options.filter((o) => o.trim() !== ""),
      }))
      .filter((q) => q.question.trim() && q.options.length >= 2)
      .map((q) => ({
        ...q,
        correctIndex: Math.max(0, Math.min(q.options.length - 1, q.correctIndex)),
      }));

    if (quiz.length > 0 && quiz.length < 3) {
      window.alert("Test üçün minimum 3 sual əlavə edin (3–5 sual).");
      return;
    }

    const prerequisiteId = (editForm.prerequisiteId || "").trim();
    const resources =
      Array.isArray(editForm.resources) && editForm.resources.length
        ? editForm.resources
            .map((r) => ({
              id: r?.id || `res-${Date.now()}-${Math.random().toString(16).slice(2)}`,
              name: (r?.name || "").toString().trim(),
              url: (r?.url || "").toString().trim(),
              type: (r?.type || "link").toString(),
            }))
            .filter((r) => r.name && r.url)
        : [];

    if (editForm.mode === "create") {
      const id = `custom-${Date.now()}`;
      const training = {
        id,
        companyId: CURRENT_COMPANY_ID,
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        category,
        coverImageUrl: "",
        videoUrl,
        durationSec,
        status: "draft",
        isActive: false,
        fromTemplateId: null,
        attachments: [],
        dueDate,
        quiz,
        prerequisiteId,
        resources,
      };
      setState((prev) => ({
        ...prev,
        trainings: [...prev.trainings, training],
      }));
    } else if (editForm.mode === "edit" && editForm.id) {
      setState((prev) => ({
        ...prev,
        trainings: prev.trainings.map((t) =>
          t.id === editForm.id
            ? {
                ...t,
                title: editForm.title.trim(),
                description: editForm.description.trim(),
                category,
                videoUrl,
                durationSec,
                dueDate,
                quiz,
                prerequisiteId,
                resources,
              }
            : t
        ),
      }));
    }
    setIsModalOpen(false);
    setEditForm(null);
  };

  const handleAddAttachment = (id, name) => {
    if (!name || !name.trim()) return;
    setState((prev) => ({
      ...prev,
      trainings: prev.trainings.map((t) =>
        t.id === id
          ? {
              ...t,
              attachments: [
                ...(t.attachments || []),
                { id: `att-${Date.now()}`, name: name.trim() },
              ],
            }
          : t
      ),
    }));
  };

  const handleRemoveAttachment = (id, attachmentId) => {
    setState((prev) => ({
      ...prev,
      trainings: prev.trainings.map((t) =>
        t.id === id
          ? {
              ...t,
              attachments: (t.attachments || []).filter(
                (a) => a.id !== attachmentId
              ),
            }
          : t
      ),
    }));
  };

  const handleProgressUpdate = (id, payload) => {
    setState((prev) => {
      const existing = prev.progressByTrainingId[id] || {
        lastPositionSec: 0,
        totalWatchSec: 0,
        completionPct: 0,
        isCompleted: false,
        quizPassed: false,
        quizScorePct: 0,
        certificateGeneratedAt: null,
      };
      const duration = payload.durationSec || trainings.find((t) => t.id === id)?.durationSec || 0;
      const position = payload.positionSec || 0;
      const completionRaw = duration > 0 ? (position / duration) * 100 : 0;
      const completionPct = pct(completionRaw);
      const isCompleted =
        existing.isCompleted || payload.eventType === "complete" || completionPct >= 90;
      const delta =
        payload.eventType === "progress" && position > existing.lastPositionSec
          ? position - existing.lastPositionSec
          : 0;

      return {
        ...prev,
        progressByTrainingId: {
          ...prev.progressByTrainingId,
          [id]: {
            lastPositionSec: position,
            totalWatchSec: existing.totalWatchSec + delta,
            completionPct,
            isCompleted,
            quizPassed: existing.quizPassed || false,
            quizScorePct: existing.quizScorePct || 0,
            certificateGeneratedAt: existing.certificateGeneratedAt ?? null,
          },
        },
      };
    });
  };

  const handleSetRating = (id, rating) => {
    setState((prev) => ({
      ...prev,
      ratingsByTrainingId: {
        ...prev.ratingsByTrainingId,
        [id]: {
          rating,
        },
      },
    }));
  };

  const handleAddNote = (id, timestampSec, content) => {
    if (!content.trim()) return;
    setState((prev) => {
      const existing = prev.notesByTrainingId[id] || [];
      const note = {
        id: `note-${Date.now()}`,
        userId: CURRENT_USER_ID,
        timestampSec,
        content: content.trim(),
      };
      return {
        ...prev,
        notesByTrainingId: {
          ...prev.notesByTrainingId,
          [id]: [...existing, note].sort((a, b) => a.timestampSec - b.timestampSec),
        },
      };
    });
  };

  const handleUpdateNote = (trainingIdForNote, noteId, content) => {
    setState((prev) => {
      const existing = prev.notesByTrainingId[trainingIdForNote] || [];
      return {
        ...prev,
        notesByTrainingId: {
          ...prev.notesByTrainingId,
          [trainingIdForNote]: existing.map((n) =>
            n.id === noteId ? { ...n, content } : n
          ),
        },
      };
    });
  };

  const handleDeleteNote = (trainingIdForNote, noteId) => {
    setState((prev) => {
      const existing = prev.notesByTrainingId[trainingIdForNote] || [];
      return {
        ...prev,
        notesByTrainingId: {
          ...prev.notesByTrainingId,
          [trainingIdForNote]: existing.filter((n) => n.id !== noteId),
        },
      };
    });
  };

  const filteredAdminTrainings = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    return trainings.filter((t) => {
      const matchesQuery = !q || (t.title || "").toLowerCase().includes(q);
      const matchesFilter =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
            ? t.isActive
            : !t.isActive;
      return matchesQuery && matchesFilter;
    });
  }, [trainings, searchQuery, statusFilter]);

  const filteredEmployeeTrainings = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    return activeTrainings.filter((t) => {
      const matchesQuery = !q || (t.title || "").toLowerCase().includes(q);
      return matchesQuery;
    });
  }, [activeTrainings, searchQuery]);

  if (trainingId && currentTraining) {
    const progress = state.progressByTrainingId[currentTraining.id] || {};
    const canStartQuiz =
      pct(progress?.completionPct || 0) >= 90 &&
      Array.isArray(currentTraining.quiz) &&
      currentTraining.quiz.length >= 3;
    const dueOverdue = isOverdue(currentTraining.dueDate);
    const completed =
      Boolean(progress?.quizPassed) && pct(progress?.completionPct || 0) >= 90;

    return (
      <>
        <Header title="Təlimlər & Seminarlar" />
        <TrainingDetailView
          training={currentTraining}
          progress={progress}
          notes={state.notesByTrainingId[currentTraining.id] || []}
          rating={state.ratingsByTrainingId[currentTraining.id]?.rating || 0}
          onBack={() => navigate("/dashboard/trainings")}
          onProgress={(payload) =>
            handleProgressUpdate(currentTraining.id, payload)
          }
          onAddNote={(ts, content) => handleAddNote(currentTraining.id, ts, content)}
          onUpdateNote={(noteId, content) =>
            handleUpdateNote(currentTraining.id, noteId, content)
          }
          onDeleteNote={(noteId) => handleDeleteNote(currentTraining.id, noteId)}
          onSetRating={(rating) => handleSetRating(currentTraining.id, rating)}
          onAddAttachment={(name) => handleAddAttachment(currentTraining.id, name)}
          onRemoveAttachment={(attachmentId) =>
            handleRemoveAttachment(currentTraining.id, attachmentId)
          }
          playbackRate={playbackRate}
          onPlaybackRateChange={setPlaybackRate}
          isOverdue={dueOverdue}
          canStartQuiz={canStartQuiz}
          onStartQuiz={() => setQuizOpen(true)}
          isCompleted={completed}
          onShowCertificate={() => setCertificateOpen(true)}
        />

        <QuizModal
          isOpen={quizOpen}
          title={`${currentTraining.title} • Test`}
          quiz={currentTraining.quiz}
          onClose={() => setQuizOpen(false)}
          onSubmit={(result) => {
            setState((prev) => {
              const existing = prev.progressByTrainingId[currentTraining.id] || {};
              const passed = Boolean(result?.passed);
              const next = {
                ...existing,
                quizPassed: passed,
                quizScorePct: result?.pct || 0,
                completionPct: Math.max(
                  pct(existing.completionPct || 0),
                  passed ? 100 : pct(existing.completionPct || 0)
                ),
                isCompleted: passed,
                certificateGeneratedAt:
                  passed && !existing.certificateGeneratedAt
                    ? Date.now()
                    : existing.certificateGeneratedAt ?? null,
              };
              return {
                ...prev,
                progressByTrainingId: {
                  ...prev.progressByTrainingId,
                  [currentTraining.id]: next,
                },
              };
            });
            setQuizOpen(false);
            if (result?.passed) setCertificateOpen(true);
          }}
        />

        <CertificateView
          isOpen={certificateOpen}
          trainingTitle={currentTraining.title}
          userName={CURRENT_USER_NAME}
          dateText={safeDateText(
            state.progressByTrainingId[currentTraining.id]?.certificateGeneratedAt
          )}
          onClose={() => setCertificateOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <Header title="Təlimlər & Seminarlar" />
      <div className={styles.container}>
        <div className={styles.pageCard}>
          <div className={styles.header}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>Təlimlər &amp; Seminarlar</h1>
              <p className={styles.subtitle}>
                Təlim kataloqu, izləmə və tamamlanma statistikası.
              </p>
            </div>
            <div className={styles.headerActions}>
              <span className={styles.pill}>Şirkət: HR Dynamics</span>
              <button
                className={styles.primaryButton}
                onClick={handleCreateTraining}
              >
                <Plus size={18} strokeWidth={2.5} />
                Yeni təlim
              </button>
            </div>
          </div>

          <div className={styles.tabs}>
            <div className={styles.tabsList}>
              <button
                className={`${styles.tabButton} ${
                  tab === "admin" ? styles.tabButtonActive : ""
                }`}
                onClick={() => setTab("admin")}
              >
                <LayoutDashboard size={18} />
                İdarəetmə paneli
              </button>
              <button
                className={`${styles.tabButton} ${
                  tab === "employee" ? styles.tabButtonActive : ""
                }`}
                onClick={() => setTab("employee")}
              >
                <BookOpen size={18} />
                Mənim təlimlərim
              </button>
            </div>
          </div>

          <div className={styles.controlsRow}>
            <div className={styles.searchBox}>
              <Search size={16} />
              <input
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Təlim adı ilə axtar..."
              />
            </div>
            {tab === "admin" && (
              <div className={styles.filterBox}>
                <Filter size={16} />
                <select
                  className={styles.filterSelect}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Hamısı</option>
                  <option value="active">Aktiv</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            )}
          </div>

          {tab === "admin" ? (
            <AdminView
              trainings={filteredAdminTrainings}
              activeTrainings={activeTrainings}
              progressByTrainingId={state.progressByTrainingId}
              onCloneTemplate={handleCloneTemplate}
              onToggleActive={handleToggleActive}
              onDeleteTraining={handleDeleteTraining}
              deleteConfirmId={deleteConfirmId}
              onCloseDeleteConfirm={() => setDeleteConfirmId(null)}
              onConfirmDelete={handleConfirmDelete}
              onEditTraining={handleOpenEditTraining}
            />
          ) : (
            <EmployeeView
              trainings={filteredEmployeeTrainings}
              progressByTrainingId={state.progressByTrainingId}
            />
          )}
        </div>

        {isModalOpen && editForm && (
          <div className={styles.modalOverlay}>
            <div
              className={styles.modalBackdrop}
              onClick={() => {
                setIsModalOpen(false);
                setEditForm(null);
              }}
            />
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  {editForm.mode === "create" ? "Yeni təlim" : "Təlimi redaktə et"}
                </h2>
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditForm(null);
                  }}
                >
                  ✕
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.modalFormGroup}>
                  <label className={styles.modalLabel}>Təlim adı</label>
                  <input
                    className={styles.modalInput}
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Məs: Əmək Məcəlləsi üzrə təlim"
                  />
                </div>
                <div className={styles.modalFormGroup}>
                  <label className={styles.modalLabel}>Kateqoriya</label>
                  <select
                    className={styles.modalInput}
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                  >
                    {TRAINING_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.modalFormGroup}>
                  <label className={styles.modalLabel}>Müddət (dəqiqə)</label>
                  <input
                    type="number"
                    min={0}
                    className={styles.modalInput}
                    value={editForm.durationMin ?? ""}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        durationMin: e.target.value,
                      }))
                    }
                    placeholder="Məs: 30"
                  />
                </div>
                <div className={styles.modalFormGroup}>
                  <label className={styles.modalLabel}>Video URL (opsional)</label>
                  <input
                    type="url"
                    className={styles.modalInput}
                    value={editForm.videoUrl ?? ""}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        videoUrl: e.target.value,
                      }))
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className={styles.modalFormGroup}>
                  <label className={styles.modalLabel}>Son tarix (deadline)</label>
                  <input
                    type="date"
                    className={styles.modalInput}
                    value={editForm.dueDate ?? ""}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        dueDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={styles.modalFormGroup}>
                  <label className={styles.modalLabel}>Ön şərt təlim</label>
                  <select
                    className={styles.modalInput}
                    value={editForm.prerequisiteId || ""}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        prerequisiteId: e.target.value,
                      }))
                    }
                  >
                    <option value="">Ön şərt yoxdur</option>
                    {trainings
                      .filter((t) => !editForm.id || t.id !== editForm.id)
                      .map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.title}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={styles.modalFormGroup}>
                  <label className={styles.modalLabel}>Əlavə resurslar</label>
                  <div className={styles.quizEditor}>
                    {(editForm.resources || []).map((r, ri) => (
                      <div key={r.id || ri} className={styles.quizEditorItem}>
                        <div className={styles.quizEditorRow}>
                          <input
                            className={styles.modalInput}
                            value={r.name || ""}
                            onChange={(e) =>
                              setEditForm((prev) => {
                                const next = [...(prev.resources || [])];
                                next[ri] = { ...next[ri], name: e.target.value };
                                return { ...prev, resources: next };
                              })
                            }
                            placeholder="Resurs adı (məs: Təlim PDF)"
                          />
                        </div>
                        <div className={styles.quizEditorRow}>
                          <select
                            className={styles.modalInput}
                            value={r.type || "link"}
                            onChange={(e) =>
                              setEditForm((prev) => {
                                const next = [...(prev.resources || [])];
                                next[ri] = { ...next[ri], type: e.target.value };
                                return { ...prev, resources: next };
                              })
                            }
                          >
                            <option value="pdf">PDF</option>
                            <option value="video">Video</option>
                            <option value="doc">Sənəd</option>
                            <option value="link">Link</option>
                          </select>
                          <input
                            className={styles.modalInput}
                            value={r.url || ""}
                            onChange={(e) =>
                              setEditForm((prev) => {
                                const next = [...(prev.resources || [])];
                                next[ri] = { ...next[ri], url: e.target.value };
                                return { ...prev, resources: next };
                              })
                            }
                            placeholder="Resurs linki (https://...)"
                          />
                          <button
                            type="button"
                            className={styles.ghostButtonDanger}
                            onClick={() =>
                              setEditForm((prev) => {
                                const next = [...(prev.resources || [])].filter(
                                  (_, i) => i !== ri
                                );
                                return { ...prev, resources: next };
                              })
                            }
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className={styles.quizEditorActions}>
                      <button
                        type="button"
                        className={styles.ghostButton}
                        onClick={() => {
                          const nextR = {
                            id: `res-${Date.now()}`,
                            name: "",
                            url: "",
                          };
                          setEditForm((prev) => ({
                            ...prev,
                            resources: [...(prev.resources || []), nextR],
                          }));
                        }}
                      >
                        + Resurs əlavə et
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.modalFormGroup}>
                  <label className={styles.modalLabel}>
                    Təlim sınağı (3–5 sual)
                  </label>
                  <div className={styles.quizEditor}>
                    {(editForm.quiz || []).map((q, qi) => (
                      <div key={q.id || qi} className={styles.quizEditorItem}>
                        <div className={styles.quizEditorRow}>
                          <input
                            className={styles.modalInput}
                            value={q.question || ""}
                            onChange={(e) =>
                              setEditForm((prev) => {
                                const next = [...(prev.quiz || [])];
                                next[qi] = { ...next[qi], question: e.target.value };
                                return { ...prev, quiz: next };
                              })
                            }
                            placeholder={`Sual ${qi + 1}`}
                          />
                          <button
                            type="button"
                            className={styles.ghostButtonDanger}
                            onClick={() =>
                              setEditForm((prev) => {
                                const next = [...(prev.quiz || [])].filter((_, i) => i !== qi);
                                return { ...prev, quiz: next };
                              })
                            }
                          >
                            Sil
                          </button>
                        </div>
                        <div className={styles.quizEditorOptions}>
                          {(q.options || ["", "", "", ""]).slice(0, 5).map((opt, oi) => (
                            <label key={oi} className={styles.quizEditorOption}>
                              <input
                                type="radio"
                                name={`correct-${qi}`}
                                checked={Number(q.correctIndex || 0) === oi}
                                onChange={() =>
                                  setEditForm((prev) => {
                                    const next = [...(prev.quiz || [])];
                                    next[qi] = { ...next[qi], correctIndex: oi };
                                    return { ...prev, quiz: next };
                                  })
                                }
                              />
                              <input
                                className={styles.modalInput}
                                value={opt}
                                onChange={(e) =>
                                  setEditForm((prev) => {
                                    const next = [...(prev.quiz || [])];
                                    const opts = [...(next[qi].options || [])];
                                    while (opts.length < 4) opts.push("");
                                    opts[oi] = e.target.value;
                                    next[qi] = { ...next[qi], options: opts };
                                    return { ...prev, quiz: next };
                                  })
                                }
                                placeholder={`Seçim ${oi + 1}`}
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className={styles.quizEditorActions}>
                      <button
                        type="button"
                        className={styles.ghostButton}
                        onClick={() => {
                          const nextQ = {
                            id: `q-${Date.now()}`,
                            question: "",
                            options: ["", "", "", ""],
                            correctIndex: 0,
                          };
                          setEditForm((prev) => ({
                            ...prev,
                            quiz: [...(prev.quiz || []), nextQ].slice(0, 5),
                          }));
                        }}
                        disabled={(editForm.quiz || []).length >= 5}
                      >
                        + Sual əlavə et
                      </button>
                      <div className={styles.quizHint}>
                        {(editForm.quiz || []).length}/5
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.modalFormGroup}>
                  <label className={styles.modalLabel}>Qısa təsvir</label>
                  <textarea
                    className={styles.modalTextarea}
                    rows={4}
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Təlimin məqsədi və əsas məzmunu haqqında qısa məlumat yazın..."
                  />
                </div>
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.ghostButton}
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditForm(null);
                  }}
                >
                  Ləğv et
                </button>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={handleSubmitTrainingModal}
                >
                  Yadda saxla
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function AdminView({
  trainings,
  activeTrainings,
  progressByTrainingId,
  onCloneTemplate,
  onToggleActive,
  onDeleteTraining,
  onEditTraining,
  deleteConfirmId,
  onCloseDeleteConfirm,
  onConfirmDelete,
}) {
  const navigate = useNavigate();

  const mostWatched = useMemo(() => {
    return [...trainings]
      .map((t) => {
        const p = progressByTrainingId[t.id];
        return {
          training: t,
          completion: p?.completionPct || 0,
        };
      })
      .sort((a, b) => b.completion - a.completion)
      .slice(0, 3);
  }, [trainings, progressByTrainingId]);

  return (
    <div className={styles.layout}>
      <div className={styles.column}>
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Hazır təlim şablonları</h2>
              <p className={styles.sectionDescription}>
                Sistemdə mövcud global təlim şablonları. Klonlayıb özəlləşdirə bilərsiniz.
              </p>
            </div>
          </div>
          <div className={styles.cardsGrid}>
            {GLOBAL_TEMPLATES.map((t) => (
              <div key={t.id} className={styles.trainingCard}>
                <div className={styles.cardHeaderRow}>
                  <div>
                    <div className={styles.cardTitle}>{t.title}</div>
                    <div className={styles.categoryTag}>{t.category}</div>
                  </div>
                  <span className={`${styles.badge} ${styles.badgeTemplate}`}>Şablon</span>
                </div>
                <div className={styles.sectionDescription}>{t.description}</div>
                <div className={styles.progressLabelRow}>
                  <span>Müddət</span>
                  <span>{formatDuration(t.durationSec)}</span>
                </div>
                <div className={styles.cardActionsRow}>
                  <button
                    className={styles.ghostButton}
                    onClick={() => onCloneTemplate(t)}
                  >
                    <Copy size={14} />
                    Klonla və redaktə et
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Şirkət təlimləri</h2>
              <p className={styles.sectionDescription}>
                Aktiv və layihə (draft) təlimlər. Redaktə, aktivləşdirmə və silmə buradan.
              </p>
            </div>
          </div>
          {trainings.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>
                Hələ təlim yoxdur. Yuxarıdakı &quot;Yeni təlim&quot; düyməsi ilə yaradın və ya hazır şablonu &quot;Klonla və redaktə et&quot; ilə əlavə edin.
              </p>
            </div>
          ) : (
            <div className={styles.cardsGrid}>
              {trainings.map((t) => {
                const progress = progressByTrainingId[t.id];
                const overdue = isOverdue(t.dueDate);
                const completion = pct(progress?.completionPct || 0);
                const completed = Boolean(progress?.quizPassed) && completion >= 90;
                const statusLabel = overdue
                  ? "Gecikir"
                  : completed
                    ? "Tamamlandı"
                    : completion > 0
                      ? "Davam edir"
                      : "Yeni";
                const statusClass = overdue
                  ? styles.badgeOverdue
                  : completed
                    ? styles.badgeCompleted
                    : completion > 0
                      ? styles.badgeInProgress
                      : styles.badgeNew;
                return (
                  <div
                    key={t.id}
                    className={styles.trainingCard}
                    onClick={() => navigate(`/dashboard/trainings/${t.id}`)}
                  >
                    <div className={styles.cardHeaderRow}>
                      <div>
                        <div className={styles.cardTitle}>{t.title}</div>
                        <div className={styles.categoryTag}>{t.category}</div>
                      </div>
                      <div className={styles.badgeStack}>
                        <span className={`${styles.badge} ${statusClass}`}>
                          {statusLabel}
                        </span>
                        <span
                          className={`${styles.badge} ${
                            t.isActive ? styles.badgeActive : styles.badgeDraft
                          }`}
                        >
                          {t.isActive ? "Aktiv" : "Layihə"}
                        </span>
                      </div>
                    </div>
                    <div className={styles.sectionDescription}>
                      {t.description || "Təsvir əlavə edilməyib."}
                    </div>
                    {t.dueDate && (
                      <div className={styles.progressLabelRow}>
                        <span>Deadline</span>
                        <span>{t.dueDate}</span>
                      </div>
                    )}
                    <div className={styles.progressLabelRow}>
                      <span>Müddət</span>
                      <span>{formatDuration(t.durationSec)}</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{
                          width: `${completion}%`,
                        }}
                      />
                    </div>
                    <div className={styles.progressLabelRow}>
                      <span>Tamamlanma</span>
                      <span>{completion}%</span>
                    </div>

                    <div className={styles.cardActionsRow}>
                      <button
                        className={styles.ghostButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditTraining(t);
                        }}
                      >
                        <Pencil size={14} />
                        Redaktə et
                      </button>
                      <button
                        className={styles.ghostButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleActive(t.id);
                        }}
                      >
                        <Power size={14} />
                        {t.isActive ? "Deaktiv et" : "Aktiv et"}
                      </button>
                      <button
                        className={styles.ghostButtonDanger}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteTraining(t.id);
                        }}
                      >
                        <Trash2 size={14} />
                        Sil
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.analyticsCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Qısa statistikalar</h2>
            </div>
          </div>
          <div className={styles.analyticsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Aktiv təlimlər</div>
              <div className={styles.metricValue}>{activeTrainings.length}</div>
              <div className={styles.metricSub}>Yalnız bu şirkət üçün</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Ümumi təlimlər</div>
              <div className={styles.metricValue}>{trainings.length}</div>
              <div className={styles.metricSub}>Draft + aktiv</div>
            </div>
          </div>
          {mostWatched.length > 0 && (
            <>
              <div className={styles.sectionDescription}>Ən çox tamamlanan təlimlər:</div>
              <div className={styles.cardsGrid}>
                {mostWatched.map((item) => (
                  <div key={item.training.id} className={styles.trainingCard}>
                    <div className={styles.cardHeaderRow}>
                      <div className={styles.cardTitle}>
                        {item.training.title}
                      </div>
                    </div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${pct(item.completion)}%` }}
                      />
                    </div>
                    <div className={styles.progressLabelRow}>
                      <span>Orta tamamlanma</span>
                      <span>{pct(item.completion)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {deleteConfirmId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBackdrop} onClick={onCloseDeleteConfirm} />
          <div className={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.confirmTitle}>Təlimi silmək</h3>
            <p className={styles.confirmText}>
              Bu təlimi silmək istədiyinizə əminsiniz? Bütün proqres və qeydlər silinəcək.
            </p>
            <div className={styles.confirmActions}>
              <button type="button" className={styles.ghostButton} onClick={onCloseDeleteConfirm}>
                Ləğv et
              </button>
              <button type="button" className={styles.dangerButton} onClick={onConfirmDelete}>
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmployeeView({ trainings, progressByTrainingId }) {
  if (trainings.length === 0) {
    return (
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Mənim təlimlərim</h2>
            <div className={styles.emptyStateInline}>
              <div className={styles.emptyStateIcon}>
                <BookOpen size={26} />
              </div>
              <div>
                <p className={styles.sectionDescription}>
                  Hazırda sizə təyin olunmuş aktiv təlim yoxdur.
                </p>
                <p className={styles.sectionDescription}>
                  İdarəetmə panelindən təlim aktivləşdirildikdə burada görünəcək.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Mənim təlimlərim</h2>
          <p className={styles.sectionDescription}>
            Sizə təyin olunmuş aktiv təlimlər. Proqresi saxlanılır.
          </p>
        </div>
      </div>
      <div className={styles.cardsGrid}>
        {trainings.map((t) => {
          const progress = progressByTrainingId[t.id];
          const overdue = isOverdue(t.dueDate);
          const completion = pct(progress?.completionPct || 0);
          const completed = Boolean(progress?.quizPassed) && completion >= 90;
          const badgeLabel = overdue
            ? "Gecikir"
            : completed
              ? "Tamamlandı"
              : completion > 0
                ? "Davam edir"
                : "Yeni";
          const badgeClass = overdue
            ? styles.badgeOverdue
            : completed
              ? styles.badgeCompleted
              : completion > 0
                ? styles.badgeInProgress
                : styles.badgeNew;
          return (
            <Link
              key={t.id}
              to={`/dashboard/trainings/${t.id}`}
              className={styles.trainingCard}
            >
              <div className={styles.cardHeaderRow}>
                <div>
                  <div className={styles.cardTitle}>{t.title}</div>
                  <div className={styles.categoryTag}>{t.category}</div>
                </div>
                <span className={`${styles.badge} ${badgeClass}`}>{badgeLabel}</span>
              </div>
              <div className={styles.sectionDescription}>
                {t.description || "Təsvir əlavə edilməyib."}
              </div>
              <div className={styles.progressLabelRow}>
                <span>Müddət</span>
                <span>{formatDuration(t.durationSec)}</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${completion}%`,
                  }}
                />
              </div>
              <div className={styles.progressLabelRow}>
                <span>{completed ? "Tamamlandı" : "Proqres"}</span>
                <span>{completion}%</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function TrainingDetailView({
  training,
  progress,
  notes,
  rating,
  onBack,
  onProgress,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onSetRating,
  onAddAttachment,
  onRemoveAttachment,
  playbackRate,
  onPlaybackRateChange,
  isOverdue: overdue,
  canStartQuiz,
  onStartQuiz,
  isCompleted,
  onShowCertificate,
}) {
  const [noteText, setNoteText] = useState("");
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (video && typeof playbackRate === "number") {
      video.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const handleAddNoteClick = () => {
    const video = videoRef.current;
    const ts = video ? Math.floor(video.currentTime || 0) : 0;
    onAddNote(ts, noteText);
    setNoteText("");
  };

  const handleSeekTo = (sec) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = sec;
      video.play();
    }
  };

  const handleStarClick = (value) => {
    onSetRating(value);
  };

  const handleAddAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && onAddAttachment) {
      onAddAttachment(file.name);
    }
    if (e.target) {
      e.target.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <button type="button" className={styles.backLink} onClick={onBack}>
        <ArrowLeft size={20} />
        Geri qayıt
      </button>

      <div className={styles.detailLayout}>
        <div className={styles.videoCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Video təlim</h2>
            </div>
          </div>
          <div className={styles.videoWrapper}>
            {training.videoUrl || sampleVideo ? (
              <video
                ref={videoRef}
                className={styles.video}
                controls
                src={training.videoUrl || sampleVideo}
                onLoadedMetadata={(e) => {
                  const el = e.target;
                  const last = Math.floor(progress?.lastPositionSec || 0);
                  if (last > 0 && Number.isFinite(el.duration) && last < el.duration) {
                    el.currentTime = last;
                  }
                  if (typeof playbackRate === "number") {
                    el.playbackRate = playbackRate;
                  }
                }}
                onTimeUpdate={(e) => {
                  const el = e.target;
                  const positionSec = Math.floor(el.currentTime || 0);
                  const durationSec = Math.floor(el.duration || 0);
                  onProgress({ positionSec, durationSec, eventType: "progress" });
                }}
                onEnded={(e) => {
                  const el = e.target;
                  const durationSec = Math.floor(el.duration || 0);
                  onProgress({
                    positionSec: durationSec,
                    durationSec,
                    eventType: "complete",
                  });
                }}
              />
            ) : (
              <div className={styles.videoPlaceholder}>
                <div className={styles.videoPlaceholderIcon}>
                  <Video size={36} strokeWidth={1.5} />
                </div>
                <p className={styles.videoPlaceholderText}>Video əlavə edilməyib</p>
                <p className={styles.videoPlaceholderHint}>
                  İdarəetmə panelindən təlimi redaktə edib video URL daxil edin.
                </p>
              </div>
            )}
          </div>
          <div className={styles.detailControlsRow}>
            <label className={styles.speedControl}>
              <span>Sürət</span>
              <select
                className={styles.filterSelect}
                value={playbackRate}
                onChange={(e) => onPlaybackRateChange?.(Number(e.target.value))}
                disabled={!training.videoUrl && !sampleVideo}
              >
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </label>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={onStartQuiz}
              disabled={!canStartQuiz || Boolean(progress?.quizPassed)}
              title={
                progress?.quizPassed
                  ? "Test artıq keçilib"
                  : !canStartQuiz
                    ? "Test üçün videonu ən az 90% izləyin (və admin 3+ sual əlavə etməlidir)"
                    : ""
              }
            >
              <BadgeCheck size={18} />
              Testə başla
            </button>
          </div>
          <div className={styles.progressLabelRow}>
            <span>Son mövqe</span>
            <span>{formatDuration(progress?.lastPositionSec || 0)}</span>
          </div>
        </div>

        <div className={styles.metaCard}>
          <div className={styles.metaTitleRow}>
            <div>
              <h2 className={styles.metaTitle}>{training.title}</h2>
              <div className={styles.metaCategory}>{training.category}</div>
            </div>
            <span className={`${styles.badge} ${overdue ? styles.badgeOverdue : styles.badgeActive}`}>
              {overdue ? "Gecikir" : training.isActive ? "Aktiv" : "Layihə"}
            </span>
          </div>
          <p className={styles.sectionDescription}>
            {training.description || "Təsvir əlavə edilməyib."}
          </p>

          <div className={styles.metaRow}>
            <div>
              <div className={styles.metaLabel}>Müddət</div>
              <div>{formatDuration(training.durationSec)}</div>
            </div>
            <div>
              <div className={styles.metaLabel}>Tamamlanma</div>
              <div>{pct(progress?.completionPct || 0)}%</div>
            </div>
          </div>

          <div className={styles.attachmentsList}>
            <div className={styles.notesHeaderRow}>
              <span className={styles.metaLabel}>Əlavə resurslar</span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {(training.resources || []).length === 0 ? (
              <span className={styles.sectionDescription}>
                Hələ əlavə resurs yoxdur.
              </span>
            ) : (
              (training.resources || []).map((res) => (
                <div key={res.id} className={styles.attachmentItem}>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.attachmentLink}
                    onClick={(e) => e.stopPropagation?.()}
                  >
                    {res.type === "pdf" && <FileText size={14} style={{ marginRight: 6 }} />}
                    {res.type === "video" && <VideoIcon size={14} style={{ marginRight: 6 }} />}
                    {res.type === "doc" && <File size={14} style={{ marginRight: 6 }} />}
                    {!res.type || res.type === "link" ? (
                      <LinkIcon size={14} style={{ marginRight: 6 }} />
                    ) : null}
                    {res.name}
                  </a>
                </div>
              ))
            )}
          </div>

          <div className={styles.cardActionsRow}>
            <button
              type="button"
              className={styles.ghostButton}
              onClick={onShowCertificate}
              disabled={!isCompleted}
              title={!isCompleted ? "Sertifikat üçün testi keçin və təlimi tamamlayın" : ""}
            >
              Sertifikatı göstər
            </button>
          </div>

          <div className={styles.analyticsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Baxış sayı</div>
              <div className={styles.metricValue}>
                {progress && progress.totalWatchSec > 0 ? 1 : 0}
              </div>
              <div className={styles.metricSub}>Unikal istifadəçi: 1</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Ümumi izləmə vaxtı</div>
              <div className={styles.metricValue}>
                {formatDuration(progress?.totalWatchSec || 0)}
              </div>
              <div className={styles.metricSub}>Yalnız bu istifadəçi üçün</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Drop-off nöqtəsi</div>
              <div className={styles.metricValue}>
                {formatDuration(progress?.lastPositionSec || 0)}
              </div>
              <div className={styles.metricSub}>
                İzləmənin dayandığı təxmini yer
              </div>
            </div>
          </div>

          <div className={styles.ratingRow}>
            <span className={styles.metaLabel}>Reytinq:</span>
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                className={`${styles.starButton} ${
                  i <= rating ? styles.starActive : styles.starInactive
                }`}
                onClick={() => handleStarClick(i)}
              >
                ★
              </button>
            ))}
          </div>

            <div className={styles.attachmentsList}>
            <div className={styles.notesHeaderRow}>
              <span className={styles.metaLabel}>Əlavələr</span>
              <button
                type="button"
                className={styles.noteButton}
                onClick={handleAddAttachmentClick}
              >
                <Paperclip size={14} />
                Fayl əlavə et
              </button>
            </div>
            {(training.attachments || []).length === 0 ? (
              <span className={styles.sectionDescription}>
                Hələ əlavə material yoxdur.
              </span>
            ) : (
              (training.attachments || []).map((att) => (
                <div key={att.id} className={styles.attachmentItem}>
                  <span className={styles.attachmentLink}>{att.name}</span>
                  <button
                    type="button"
                    className={styles.noteButton}
                    onClick={() =>
                      onRemoveAttachment && onRemoveAttachment(att.id)
                    }
                  >
                    Sil
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className={styles.notesCard}>
        <div className={styles.notesHeaderRow}>
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.sectionTitle}>Şəxsi qeydlər</h3>
              <span className={styles.sectionDescription}>
                Qeydlər yalnız sizə görünür və bu təlimə aiddir.
              </span>
            </div>
          </div>
        </div>

        <div className={styles.notesList}>
          {notes.length === 0 && (
            <p className={styles.sectionDescription}>
              Hələ qeyd yoxdur. Videoda istənilən anda “Qeyd əlavə et” düyməsi
              ilə yeni qeyd yarada bilərsiniz.
            </p>
          )}
          {notes.map((note) => (
            <div key={note.id} className={styles.noteItem}>
              <div>
                <div className={styles.noteTime}>
                  {formatDuration(note.timestampSec)}
                </div>
                {editingNoteId === note.id ? (
                  <textarea
                    className={styles.modalTextarea}
                    rows={3}
                    value={editingNoteText}
                    onChange={(e) => setEditingNoteText(e.target.value)}
                  />
                ) : (
                  <div>{note.content}</div>
                )}
              </div>
              <div className={styles.noteActions}>
                {editingNoteId === note.id ? (
                  <>
                    <button
                      type="button"
                      className={styles.noteButton}
                      onClick={() => {
                        onUpdateNote(note.id, editingNoteText);
                        setEditingNoteId(null);
                        setEditingNoteText("");
                      }}
                    >
                      Yadda saxla
                    </button>
                    <button
                      type="button"
                      className={styles.noteButton}
                      onClick={() => {
                        setEditingNoteId(null);
                        setEditingNoteText("");
                      }}
                    >
                      Ləğv et
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className={styles.noteButton}
                      onClick={() => {
                        setEditingNoteId(note.id);
                        setEditingNoteText(note.content);
                      }}
                    >
                      Redaktə
                    </button>
                    <button
                      type="button"
                      className={styles.noteButton}
                      onClick={() => onDeleteNote(note.id)}
                    >
                      Sil
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.noteForm}>
          <input
            className={styles.noteInput}
            placeholder="Hazırki vaxt üçün qeyd yazın..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <button
            type="button"
            className={`${styles.primaryButton} ${styles.primaryButtonSmall}`}
            onClick={handleAddNoteClick}
          >
            Qeyd əlavə et
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrainingsPage;

