"use client"

import { useState, useEffect } from "react"
import styles from "./kpimodal.module.css"

export default function KPICreationModal({ open, onOpenChange, editMode = false, kpiData = null, onSave, onCancel }) {
  const [kpiCode, setKpiCode] = useState("")
  const [module, setModule] = useState("")
  const [kpiName, setKpiName] = useState("")
  const [purpose, setPurpose] = useState("")
  const [measurementMethod, setMeasurementMethod] = useState("")
  const [duration, setDuration] = useState("")
  const [calculationFormula, setCalculationFormula] = useState("")
  const [weight, setWeight] = useState("")
  const [responsibleDepartment, setResponsibleDepartment] = useState("")
  const [relatedDepartments, setRelatedDepartments] = useState([])
  const [relatedBranches, setRelatedBranches] = useState([])
  const [relatedPersons, setRelatedPersons] = useState([])
  const [dataSource, setDataSource] = useState("")

  // Load KPI data when in edit mode
  useEffect(() => {
    if (editMode && kpiData && open) {
      setKpiCode(kpiData.code || "")
      setModule(kpiData.module || "")
      setKpiName(kpiData.name || "")
      setPurpose(kpiData.purpose || "")
      setMeasurementMethod(kpiData.method || "")
      setDuration(kpiData.period || "")
      setCalculationFormula(kpiData.formula || "")
      setWeight(kpiData.weight || "")
      setResponsibleDepartment(kpiData.department || "")
      setRelatedDepartments(kpiData.relatedDepartment ? kpiData.relatedDepartment.split(", ") : [])
      setRelatedBranches(kpiData.relatedBranch ? kpiData.relatedBranch.split(", ") : [])
      setRelatedPersons(kpiData.relatedPersons ? kpiData.relatedPersons.split(", ") : [])
      setDataSource(kpiData.dataSource || "")
    } else if (!editMode && open) {
      // Clear all fields when creating new KPI
      setKpiCode("")
      setModule("")
      setKpiName("")
      setPurpose("")
      setMeasurementMethod("")
      setDuration("")
      setCalculationFormula("")
      setWeight("")
      setResponsibleDepartment("")
      setRelatedDepartments([])
      setRelatedBranches([])
      setRelatedPersons([])
      setDataSource("")
    }
  }, [editMode, kpiData, open])

  const handleSave = () => {
    const kpiPayload = {
      code: kpiCode,
      module,
      name: kpiName,
      purpose,
      method: measurementMethod,
      period: duration,
      formula: calculationFormula,
      weight,
      department: responsibleDepartment,
      relatedDepartment: relatedDepartments.join(", "),
      relatedBranch: relatedBranches.join(", "),
      relatedPersons: relatedPersons.join(", "),
      dataSource,
    }
    
    if (editMode && onSave) {
      onSave(kpiPayload)
    } else {
      console.log("Creating new KPI:", kpiPayload)
    onOpenChange(false)
    }
  }

  const handleCancel = () => {
    if (editMode && onCancel) {
      onCancel()
    } else {
    setKpiCode("")
    setModule("")
    setKpiName("")
    setPurpose("")
    setMeasurementMethod("")
    setDuration("")
    setCalculationFormula("")
    setWeight("")
    setResponsibleDepartment("")
      setRelatedDepartments([])
      setRelatedBranches([])
      setRelatedPersons([])
    setDataSource("")
    onOpenChange(false)
    }
  }

  if (!open) return null

  return (
    <div className={styles.modalOverlay}>
      {/* Backdrop */}
      <div className={styles.modalBackdrop} onClick={() => onOpenChange(false)} />

      {/* Modal Content */}
      <div className={styles.modalContent}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <h2>{editMode ? "KPI-nı Redaktə Et" : "Yeni KPI Əlavə Et"}</h2>
          </div>
          <button onClick={() => onOpenChange(false)} className={styles.closeBtn}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formSection}>
            <div className={styles.formGrid}>
              {/* Row 1 - Basic Info */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>KPI Kodu</label>
                  <input
                    type="text"
                    placeholder="KPI kodunu daxil edin"
                    value={kpiCode}
                    onChange={(e) => setKpiCode(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Modulu</label>
                  <input
                    type="text"
                    placeholder="Modulu daxil edin"
                    value={module}
                    onChange={(e) => setModule(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
              </div>

              {/* Row 2 - KPI Name (Full Width) */}
              <div className={styles.formRowFull}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>KPI Adı</label>
                  <input
                    type="text"
                    placeholder="KPI adını daxil edin"
                    value={kpiName}
                    onChange={(e) => setKpiName(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
              </div>

              {/* Row 3 - Purpose (Full Width) */}
              <div className={styles.formRowFull}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Məqsədi</label>
                  <textarea
                    placeholder="KPI məqsədini daxil edin"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className={styles.formTextarea}
                    rows="3"
                  />
                </div>
              </div>

              {/* Row 4 - Method and Duration */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Ölçü Metodu</label>
                  <input
                    type="text"
                    placeholder="Ölçü metodunu daxil edin"
                    value={measurementMethod}
                    onChange={(e) => setMeasurementMethod(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Müddəti</label>
                  <select value={duration} onChange={(e) => setDuration(e.target.value)} className={styles.formSelect}>
                    <option value="">Müddəti seçin</option>
                    <option value="günlük">Günlük</option>
                    <option value="həftəlik">Həftəlik</option>
                    <option value="aylıq">Aylıq</option>
                    <option value="rüblük">Rüblük</option>
                    <option value="illik">İllik</option>
                  </select>
                </div>
              </div>

              {/* Row 5 - Formula (Full Width) */}
              <div className={styles.formRowFull}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Hesablama Formulası</label>
                  <textarea
                    placeholder="Hesablama formulasını daxil edin"
                    value={calculationFormula}
                    onChange={(e) => setCalculationFormula(e.target.value)}
                    className={styles.formTextarea}
                    rows="3"
                  />
                </div>
              </div>

              {/* Row 6 - Weight and Department */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Çəki (%)</label>
                  <input
                    type="number"
                    placeholder="Çəkini daxil edin"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className={styles.formInput}
                    min="0"
                    max="100"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Məsul Şöbə</label>
                  <input
                    type="text"
                    placeholder="Məsul şöbəni daxil edin"
                    value={responsibleDepartment}
                    onChange={(e) => setResponsibleDepartment(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
              </div>

              {/* Row 7 - Related Departments */}
              <div className={styles.formRowFull}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Əlaqəli Şöbələr</label>
                  <div className={styles.multiSelectContainer}>
                    <div className={styles.selectedItems}>
                      {relatedDepartments.map((dept, index) => (
                        <span key={index} className={styles.selectedItem}>
                          {dept}
                          <button
                            type="button"
                            onClick={() => setRelatedDepartments(relatedDepartments.filter((_, i) => i !== index))}
                            className={styles.removeButton}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Şöbə adını daxil edin və Enter basın"
                      className={styles.formInput}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          setRelatedDepartments([...relatedDepartments, e.target.value.trim()])
                          e.target.value = ''
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Row 8 - Related Branches */}
              <div className={styles.formRowFull}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Əlaqəli Filiallar</label>
                  <div className={styles.multiSelectContainer}>
                    <div className={styles.selectedItems}>
                      {relatedBranches.map((branch, index) => (
                        <span key={index} className={styles.selectedItem}>
                          {branch}
                          <button
                            type="button"
                            onClick={() => setRelatedBranches(relatedBranches.filter((_, i) => i !== index))}
                            className={styles.removeButton}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Filial adını daxil edin və Enter basın"
                      className={styles.formInput}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          setRelatedBranches([...relatedBranches, e.target.value.trim()])
                          e.target.value = ''
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Row 9 - Related Persons */}
              <div className={styles.formRowFull}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Əlaqəli Şəxslər</label>
                  <div className={styles.multiSelectContainer}>
                    <div className={styles.selectedItems}>
                      {relatedPersons.map((person, index) => (
                        <span key={index} className={styles.selectedItem}>
                          {person}
                          <button
                            type="button"
                            onClick={() => setRelatedPersons(relatedPersons.filter((_, i) => i !== index))}
                            className={styles.removeButton}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Şəxs adını daxil edin və Enter basın"
                      className={styles.formInput}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          setRelatedPersons([...relatedPersons, e.target.value.trim()])
                          e.target.value = ''
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Row 10 - Data Source (Full Width) */}
              <div className={styles.formRowFull}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Data Mənbə</label>
                  <input
                    type="text"
                    placeholder="Data mənbəyini daxil edin"
                    value={dataSource}
                    onChange={(e) => setDataSource(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.modalActions}>
            <button onClick={handleCancel} className={styles.cancelBtn}>
              Ləğv et
            </button>
            <button onClick={handleSave} className={styles.saveBtn}>
              Yadda saxla
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
