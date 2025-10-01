import React, { useState, useMemo } from 'react';
import './PerformanceCalculator.css';

const PerformanceCalculator = ({ isOpen, onClose, onSave }) => {
  const [superGross, setSuperGross] = useState(2000);
  const [kpi, setKpi] = useState(100);
  const [basePct, setBasePct] = useState(60);

  // Band definitions
  const BANDS = [
    { code: "O", range: [0, 59.999], coef: 0, rewardPct: 0.00, label: "Hədəfə çatılmayıb, bonus yoxdur" },
    { code: "E", range: [60, 69.999], coef: 0.6, rewardPct: 0.08, label: "Hədəfə çatılmayıb, minimal mükafat" },
    { code: "D", range: [70, 79.999], coef: 0.7, rewardPct: 0.11, label: "Qismən yerinə yetirilib" },
    { code: "C", range: [80, 89.999], coef: 0.8, rewardPct: 0.12, label: "Hədəfə yaxınlaşma" },
    { code: "B", range: [90, 99.999], coef: 0.9, rewardPct: 0.14, label: "Demək olar ki, hədəf yerinə yetirilib" },
    { code: "A", range: [100, 1000], coef: 1.0, rewardPct: 0.15, label: "Hədəf tam yerinə yetirilib" },
  ];

  const findBand = (kpiValue) => {
    const v = Math.max(0, Math.min(1000, kpiValue));
    return BANDS.find(b => v >= b.range[0] && v <= b.range[1]) || BANDS[BANDS.length - 1];
  };

  const band = useMemo(() => findBand(kpi), [kpi]);
  const base = useMemo(() => (isFinite(superGross) ? superGross * (basePct / 100) : 0), [superGross, basePct]);
  const reward = useMemo(() => base * band.rewardPct * band.coef, [base, band]);
  const yearly = useMemo(() => reward * 12, [reward]);

  const formatNumber = (n) => {
    if (!isFinite(n)) return "–";
    return new Intl.NumberFormat("az-Latn-AZ", { maximumFractionDigits: 2 }).format(n);
  };

  const formatAZN = (n) => {
    if (!isFinite(n)) return "–";
    return new Intl.NumberFormat("az-Latn-AZ", { style: "currency", currency: "AZN", maximumFractionDigits: 2 }).format(n);
  };

  const handleSave = () => {
    const calculationData = {
      superGross,
      kpi,
      basePct,
      base,
      band: band.code,
      coefficient: band.coef,
      rewardPercentage: Math.round(band.rewardPct * 100),
      monthlyReward: reward,
      annualProjection: yearly,
      date: new Date().toLocaleDateString('az-AZ')
    };

    if (onSave) {
      onSave(calculationData);
    }
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="performance-calculator-overlay">
      <div className="performance-calculator-modal">
        <div className="calculator-header">
          <h2>Mükafatlandırma Kalkulyatoru</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="calculator-content">
          {/* Formula Description */}
          <div className="formula-description">
            <p>KPI-yə əsasən mükafat məbləğini hesablamaq üçün dəyərləri daxil edin.</p>
            <p className="formula-text">Formula: Super Gross × 60% × Mükafat Faizi × Koefisent</p>
          </div>

          {/* Input Section */}
          <div className="input-section">
            <div className="input-group">
              <label>Əmək haqqı (Super Gross), AZN</label>
              <input
                type="number"
                value={superGross}
                onChange={(e) => setSuperGross(parseFloat(e.target.value || "0"))}
                placeholder="2000"
                min={0}
              />
              <p className="input-hint">Nümunə: 2000</p>
            </div>

            <div className="input-group">
              <label>Faktiki KPI, %</label>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="120"
                  step="1"
                  value={kpi}
                  onChange={(e) => setKpi(parseFloat(e.target.value))}
                  className="kpi-slider"
                />
                <span className="slider-value">{kpi}%</span>
              </div>
              <p className="input-hint">100% və daha yuxarı nəticə A bandına düşür.</p>
            </div>

            <div className="input-group">
              <label>Baza faiz (Default: 60%)</label>
              <input
                type="number"
                value={basePct}
                onChange={(e) => setBasePct(parseFloat(e.target.value || "0"))}
                placeholder="60"
                min="0"
                max="100"
              />
              <p className="input-hint">Sənədə görə baza = əmək haqqının 60%-i.</p>
            </div>
          </div>

          {/* Breakdown Section */}
          <div className="breakdown-section">
            <div className="breakdown-grid">
              <div className="stat-item">
                <div className="stat-label">Baza ({basePct}%)</div>
                <div className="stat-value">{formatNumber(base)} AZN</div>
                <div className="stat-hint">Super Gross × {basePct}%</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Band / Attestasiya</div>
                <div className="stat-value band">{band.code}</div>
                <div className="stat-hint">{band.label}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Koefisent</div>
                <div className="stat-value">{band.coef}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Mükafat faizi</div>
                <div className="stat-value">{Math.round(band.rewardPct * 100)}%</div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="results-section">
            <div className="results-grid">
              <div className="result-item highlight">
                <h2 className="result-title">Nəticə</h2>
                <div className="result-value-large">{formatAZN(reward)} AZN</div>
                <p className="result-description">Hesablanma: <span className="formula-text">{superGross.toFixed(2)} × {(basePct/100).toFixed(2)} × {(band.rewardPct).toFixed(2)} × {band.coef.toFixed(2)}</span></p>
              </div>

              <div className="result-item highlight">
                <h3 className="result-subtitle">İllik proyeksiya</h3>
                <div className="result-value-medium">{formatAZN(yearly)} AZN / il</div>
                <p className="result-description">Sadə proyeksiya: aylıq mükafat × 12.</p>
              </div>
            </div>
          </div>

          {/* Reward Scale Table */}
          <div className="reward-scale-section">
            <h3>Mükafatlandırma Şkalası</h3>
            <div className="reward-scale-table">
              <div className="table-header">
                <div>İcra faizi</div>
                <div>Kod</div>
                <div>Koef.</div>
                <div>Mükafat faizi</div>
                <div>İzah</div>
              </div>
              {BANDS.map((b, index) => (
                <div key={b.code} className={`table-row ${b.code === band.code ? "active" : ""}`}>
                  <div className="range-cell">{b.range[0]}% – {Math.min(b.range[1], 100)}%</div>
                  <div className="band-cell">{b.code}</div>
                  <div className="coefficient-cell">{b.coef}</div>
                  <div className="reward-cell">{Math.round(b.rewardPct * 100)}%</div>
                  <div className="label-cell">{b.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="calculator-actions">
            <button className="cancel-btn" onClick={onClose}>
              Bağla
            </button>
            <button className="save-btn" onClick={handleSave}>
              Yadda Saxla
            </button>
          </div>

          {/* Footer */}
          <div className="calculator-footer">
            <p>Qeyd: Mükafat yalnız illik yekun nəticələr əsasında ödənilə bilər. Baza (60%) və maksimum mükafat faizi (15%) sənəddə müəyyən edilib; burada band üzrə faizlər həmin 15%-in azaldılmış dəyərləridir.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCalculator;
