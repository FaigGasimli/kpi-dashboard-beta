"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  User,
  Gift,
  ShoppingBag,
  Search,
  Download,
  Plus,
} from "lucide-react";
import Header from "../../components/header";
import styles from "./benefits.module.css";

const STORAGE_KEY = "benefits_state_v1";
const CURRENT_USER_ID = "user-benefits-1";
const DEMO_EMPLOYEES = [
  { id: "user-benefits-1", name: "İşçi 1" },
  { id: "user-benefits-2", name: "İşçi 2" },
  { id: "user-benefits-3", name: "İşçi 3" },
];
const BENEFIT_CATEGORIES = ["Sağlamlıq", "Təhsil", "İdman", "Əyləncə", "Digər"];

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        catalog: [],
        budgets: {},
        balances: {},
        transactions: [],
      };
    }
    const parsed = JSON.parse(raw);
    return {
      catalog: Array.isArray(parsed.catalog) ? parsed.catalog : [],
      budgets: parsed.budgets || {},
      balances: parsed.balances || {},
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
    };
  } catch (e) {
    return {
      catalog: [],
      budgets: {},
      balances: {},
      transactions: [],
    };
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function BenefitsPage() {
  const [state, setState] = useState(() => loadState());
  const [tab, setTab] = useState("admin");
  const [searchCatalog, setSearchCatalog] = useState("");
  const [searchStatement, setSearchStatement] = useState("");
  const [newBenefit, setNewBenefit] = useState({ name: "", price: "", category: BENEFIT_CATEGORIES[0] });
  const [editingBudgetUserId, setEditingBudgetUserId] = useState(null);
  const [editingBudgetValue, setEditingBudgetValue] = useState("");

  useEffect(() => {
    saveState(state);
  }, [state]);

  const totalBudgetAllocated = useMemo(() => {
    return Object.values(state.budgets).reduce((sum, b) => sum + (Number(b) || 0), 0);
  }, [state.budgets]);

  const totalSpent = useMemo(() => {
    return state.transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  }, [state.transactions]);

  const usagePercent = totalBudgetAllocated > 0 ? Math.min(100, Math.round((totalSpent / totalBudgetAllocated) * 100)) : 0;

  const currentUserBalance = state.balances[CURRENT_USER_ID] ?? 0;
  const currentUserSpent = useMemo(
    () => state.transactions.filter((t) => t.employeeId === CURRENT_USER_ID).reduce((s, t) => s + (t.amount || 0), 0),
    [state.transactions]
  );
  const currentUserTransactions = useMemo(
    () =>
      state.transactions
        .filter((t) => t.employeeId === CURRENT_USER_ID)
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [state.transactions]
  );

  const filteredCatalog = useMemo(() => {
    const q = (searchCatalog || "").trim().toLowerCase();
    return state.catalog.filter(
      (b) => !q || (b.name || "").toLowerCase().includes(q) || (b.category || "").toLowerCase().includes(q)
    );
  }, [state.catalog, searchCatalog]);

  const filteredStatement = useMemo(() => {
    const q = (searchStatement || "").trim().toLowerCase();
    return currentUserTransactions.filter(
      (t) => !q || (t.benefitName || "").toLowerCase().includes(q) || (t.status || "").toLowerCase().includes(q)
    );
  }, [currentUserTransactions, searchStatement]);

  const handleAddBenefit = () => {
    const name = (newBenefit.name || "").trim();
    const price = Math.max(0, Number(newBenefit.price) || 0);
    if (!name) return;
    setState((prev) => ({
      ...prev,
      catalog: [
        ...prev.catalog,
        {
          id: `benefit-${Date.now()}`,
          name,
          price,
          category: newBenefit.category || BENEFIT_CATEGORIES[0],
        },
      ],
    }));
    setNewBenefit({ name: "", price: "", category: BENEFIT_CATEGORIES[0] });
  };

  const handleSetBudget = (userId, value) => {
    const num = Math.max(0, Number(value) || 0);
    setState((prev) => ({
      ...prev,
      budgets: { ...prev.budgets, [userId]: num },
      balances: { ...prev.balances, [userId]: prev.balances[userId] ?? num },
    }));
    setEditingBudgetUserId(null);
    setEditingBudgetValue("");
  };

  const handlePurchase = (benefit) => {
    const amount = benefit.price || 0;
    if (amount > currentUserBalance) return;
    setState((prev) => ({
      ...prev,
      balances: {
        ...prev.balances,
        [CURRENT_USER_ID]: (prev.balances[CURRENT_USER_ID] ?? 0) - amount,
      },
      transactions: [
        ...prev.transactions,
        {
          id: `tx-${Date.now()}`,
          employeeId: CURRENT_USER_ID,
          benefitId: benefit.id,
          benefitName: benefit.name,
          amount,
          date: new Date().toISOString().slice(0, 10),
          status: "Active",
        },
      ],
    }));
  };

  const handleExportClick = () => {
    const rows = filteredStatement.map((t) => `${t.date}\t${t.benefitName}\t${t.amount} AZN\t${t.status}`);
    const csv = "Tarix\tGüzəştin adı\tMəbləğ\tStatus\n" + rows.join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guzest-xercleri-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Header title="Güzəştlərin İdarə Edilməsi" />
      <div className={styles.container}>
        <div className={styles.pageCard}>
          <div className={styles.header}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>Güzəştlərin İdarə Edilməsi</h1>
              <p className={styles.subtitle}>Büdcə, güzəşt kataloqu və balans idarəetməsi.</p>
            </div>
          </div>

          <div className={styles.tabs}>
            <div className={styles.tabsList}>
            <button
              type="button"
              className={`${styles.tabButton} ${tab === "admin" ? styles.tabActive : ""}`}
              onClick={() => setTab("admin")}
            >
              <LayoutDashboard size={18} />
              HR Panel
            </button>
            <button
              type="button"
              className={`${styles.tabButton} ${tab === "employee" ? styles.tabActive : ""}`}
              onClick={() => setTab("employee")}
            >
              <User size={18} />
              İşçi paneli
            </button>
            </div>
          </div>

          {tab === "admin" ? (
            <div className={styles.adminGrid}>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Ümumi statistika</h2>
                <div className={styles.statsRow}>
                  <div className={styles.statCard}>
                    <div className={styles.statLabel}>Cəmi büdcə (AZN)</div>
                    <div className={styles.statValue}>{totalBudgetAllocated}</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statLabel}>İstifadə edilən (%)</div>
                    <div className={styles.statValue}>{usagePercent}%</div>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: `${usagePercent}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Büdcə təyini (aylıq məbləğ, AZN)</h2>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>İşçi</th>
                        <th>Aylıq məbləğ</th>
                        <th>Cari balans</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {DEMO_EMPLOYEES.map((emp) => (
                        <tr key={emp.id}>
                          <td>{emp.name}</td>
                          <td>{state.budgets[emp.id] ?? 0} AZN</td>
                          <td>{state.balances[emp.id] ?? 0} AZN</td>
                          <td>
                            {editingBudgetUserId === emp.id ? (
                              <>
                                <input
                                  type="number"
                                  min={0}
                                  className={styles.inputSmall}
                                  value={editingBudgetValue}
                                  onChange={(e) => setEditingBudgetValue(e.target.value)}
                                  placeholder="Məbləğ"
                                />
                                <button
                                  type="button"
                                  className={styles.btnPrimary}
                                  onClick={() => handleSetBudget(emp.id, editingBudgetValue)}
                                >
                                  Tətbiq et
                                </button>
                                <button
                                  type="button"
                                  className={styles.btnGhost}
                                  onClick={() => {
                                    setEditingBudgetUserId(null);
                                    setEditingBudgetValue("");
                                  }}
                                >
                                  Ləğv
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                className={styles.btnGhost}
                                onClick={() => {
                                  setEditingBudgetUserId(emp.id);
                                  setEditingBudgetValue(state.budgets[emp.id] ?? "");
                                }}
                              >
                                Təyin et
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Güzəşt kataloqu</h2>
                <div className={styles.formRow}>
                  <input
                    type="text"
                    className={styles.input}
                    value={newBenefit.name}
                    onChange={(e) => setNewBenefit((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Güzəştin adı"
                  />
                  <input
                    type="number"
                    min={0}
                    className={styles.input}
                    value={newBenefit.price}
                    onChange={(e) => setNewBenefit((p) => ({ ...p, price: e.target.value }))}
                    placeholder="Qiymət (AZN)"
                  />
                  <select
                    className={styles.select}
                    value={newBenefit.category}
                    onChange={(e) => setNewBenefit((p) => ({ ...p, category: e.target.value }))}
                  >
                    {BENEFIT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <button type="button" className={styles.btnPrimary} onClick={handleAddBenefit}>
                    <Plus size={16} />
                    Əlavə et
                  </button>
                </div>
                <div className={styles.searchRow}>
                  <div className={styles.searchBox}>
                    <Search size={16} />
                    <input
                      type="text"
                      className={styles.searchInput}
                      value={searchCatalog}
                      onChange={(e) => setSearchCatalog(e.target.value)}
                      placeholder="Kataloqda axtar..."
                    />
                  </div>
                </div>
                <div className={styles.catalogGrid}>
                  {filteredCatalog.map((b) => (
                    <div key={b.id} className={styles.benefitCard}>
                      <span className={styles.benefitCategory}>{b.category}</span>
                      <div className={styles.benefitName}>{b.name}</div>
                      <div className={styles.benefitPrice}>{b.price} AZN</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.employeeGrid}>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Balans</h2>
                <div className={styles.balanceCard}>
                  <div className={styles.balanceAmount}>{currentUserBalance} AZN</div>
                  <div className={styles.balanceLabel}>Mövcud balans</div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${currentUserBalance + currentUserSpent > 0 ? Math.min(100, (currentUserSpent / (currentUserBalance + currentUserSpent)) * 100) : 0}%`,
                      }}
                    />
                  </div>
                  <div className={styles.balanceSub}>Son xərcləmələr: {currentUserTransactions.length} tranzaksiya</div>
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Marketplace</h2>
                <div className={styles.marketplaceGrid}>
                  {state.catalog.map((b) => (
                    <div key={b.id} className={styles.marketCard}>
                      <span className={styles.badgeCategory}>{b.category}</span>
                      <div className={styles.marketName}>{b.name}</div>
                      <div className={styles.marketPrice}>{b.price} AZN</div>
                      <button
                        type="button"
                        className={styles.btnPurchase}
                        onClick={() => handlePurchase(b)}
                        disabled={currentUserBalance < (b.price || 0)}
                        title={currentUserBalance < (b.price || 0) ? "Balans kifayət etmir" : "Al"}
                      >
                        <ShoppingBag size={16} />
                        Al
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Xərclər tarixçəsi (Statement)</h2>
                <div className={styles.searchRow}>
                  <div className={styles.searchBox}>
                    <Search size={16} />
                    <input
                      type="text"
                      className={styles.searchInput}
                      value={searchStatement}
                      onChange={(e) => setSearchStatement(e.target.value)}
                      placeholder="Tarix, güzəşt və ya statusa görə axtar..."
                    />
                  </div>
                  <button type="button" className={styles.btnExport} onClick={handleExportClick}>
                    <Download size={16} />
                    Export
                  </button>
                </div>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Tarix</th>
                        <th>Güzəştin adı</th>
                        <th>Məbləğ</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStatement.length === 0 ? (
                        <tr>
                          <td colSpan={4} className={styles.emptyCell}>
                            Tranzaksiya yoxdur.
                          </td>
                        </tr>
                      ) : (
                        filteredStatement.map((t) => (
                          <tr key={t.id}>
                            <td>{t.date}</td>
                            <td>{t.benefitName}</td>
                            <td>{t.amount} AZN</td>
                            <td>
                              <span className={`${styles.badge} ${t.status === "Active" ? styles.badgeActive : styles.badgeGray}`}>
                                {t.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BenefitsPage;
