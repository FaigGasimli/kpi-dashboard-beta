import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import styles from "../trainings.module.css";

function normalizeQuiz(quiz) {
  if (!Array.isArray(quiz)) return [];
  return quiz
    .map((q) => ({
      id: q?.id ?? `q-${Math.random().toString(16).slice(2)}`,
      question: (q?.question ?? "").toString(),
      options: Array.isArray(q?.options)
        ? q.options.map((o) => (o ?? "").toString())
        : [],
      correctIndex:
        typeof q?.correctIndex === "number" ? q.correctIndex : Number(q?.correctIndex ?? 0) || 0,
    }))
    .filter((q) => q.question.trim() && q.options.filter(Boolean).length >= 2);
}

export default function QuizModal({
  isOpen,
  title = "Təlim sınağı",
  quiz,
  minCorrectPct = 70,
  onClose,
  onSubmit,
}) {
  const normalized = useMemo(() => normalizeQuiz(quiz), [quiz]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setAnswers({});
    setSubmitted(false);
  }, [isOpen, normalized.length]);

  const total = normalized.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = total > 0 && answeredCount === total;

  const result = useMemo(() => {
    const correct = normalized.reduce((acc, q) => {
      const a = answers[q.id];
      return acc + (typeof a === "number" && a === q.correctIndex ? 1 : 0);
    }, 0);
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { correct, total, pct, passed: pct >= minCorrectPct };
  }, [answers, normalized, total, minCorrectPct]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalBackdrop} onClick={onClose} />
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button type="button" className={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          {normalized.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>
                Bu təlim üçün test sualları təyin edilməyib.
              </p>
            </div>
          ) : (
            <div className={styles.quizList}>
              {normalized.map((q, idx) => {
                const chosen = answers[q.id];
                return (
                  <div key={q.id} className={styles.quizItem}>
                    <div className={styles.quizQuestionRow}>
                      <div className={styles.quizQuestionIndex}>{idx + 1}.</div>
                      <div className={styles.quizQuestionText}>{q.question}</div>
                    </div>
                    <div className={styles.quizOptions}>
                      {q.options.map((opt, oi) => {
                        const isChecked = chosen === oi;
                        const isCorrect = submitted && oi === q.correctIndex;
                        const isWrong = submitted && isChecked && oi !== q.correctIndex;
                        return (
                          <label
                            key={`${q.id}-${oi}`}
                            className={`${styles.quizOption} ${
                              isCorrect ? styles.quizOptionCorrect : ""
                            } ${isWrong ? styles.quizOptionWrong : ""}`}
                          >
                            <input
                              type="radio"
                              name={`q-${q.id}`}
                              checked={isChecked}
                              onChange={() =>
                                setAnswers((prev) => ({ ...prev, [q.id]: oi }))
                              }
                              disabled={submitted}
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {submitted && normalized.length > 0 && (
            <div
              className={`${styles.quizResult} ${
                result.passed ? styles.quizResultPass : styles.quizResultFail
              }`}
            >
              <div className={styles.quizResultIcon}>
                {result.passed ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
              </div>
              <div>
                <div className={styles.quizResultTitle}>
                  {result.passed ? "Uğurla keçdiniz" : "Keçid balı yetərli deyil"}
                </div>
                <div className={styles.quizResultMeta}>
                  Doğru: {result.correct}/{result.total} • Nəticə: {result.pct}% (Minimum{" "}
                  {minCorrectPct}%)
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.modalActions}>
          <button type="button" className={styles.ghostButton} onClick={onClose}>
            Bağla
          </button>

          {!submitted ? (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => setSubmitted(true)}
              disabled={!allAnswered || normalized.length === 0}
              title={!allAnswered ? "Bütün sualları cavablayın" : ""}
            >
              Testi bitir
            </button>
          ) : (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => onSubmit?.(result)}
              disabled={normalized.length === 0}
            >
              Nəticəni təsdiqlə
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

