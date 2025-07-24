// src/pages/IncomePage.jsx

import React, { useState, useEffect } from "react";
import { useMonthContext } from "../context/MonthContext";
import useIncome from "../hooks/useIncome";
import { useCategories } from "../hooks/useCategories";
import { formatMonthId } from "../utils/formatters";
import IncomeTable from "../components/tables/IncomeTable";
import PromptModal from "../components/modals/PromptModal";
import WarningModal from "../components/modals/WarningModal";
import CategoryBadge from "../components/common/CategoryBadge";
import "../styles/IncomePage.css";

export default function IncomePage() {
  const { monthId } = useMonthContext();
  const [incomes, refreshIncomes] = useIncome();
  const categories = useCategories();
  const [showCategories, setShowCategories] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState({ type: null, data: null });
  const [error, setError] = useState("");

  // filter by source or date (YYYY-MM-DD)
  const filtered = incomes.filter((inc) =>
    inc.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.dateReceived.includes(searchTerm)
  );

  // Handlers
  const openAdd = () =>
    setModal({ type: "form", data: { source: "", amount: "", dateReceived: "" } });
  const openEdit = (row) => setModal({ type: "form", data: row });
  const confirmDelete = (row) => setModal({ type: "delete", data: row });

  const handleSave = async (values) => {
    try {
     const isEdit = Boolean(modal.data.id);
     const payload = {
       // grab all the form fields...
       ...values,
       // then force in the existing id (undefined for “Add”)
       id:  modal.data.id,
       monthId,
       notes:      values.notes ?? null,
       categoryId: values.categoryId || null
     };
    const fn = Boolean(modal.data.id)
      ? window.api.updateIncome
      : window.api.addIncome;
    await fn(payload);
    setModal({ type: null, data: null });
    refreshIncomes();
    } catch (e) {
      setError(e.message || "Failed to save income");
    }
  };

  const handleDelete = async () => {
    try {
      await window.api.deleteIncome(modal.data.id);
      setModal({ type: null, data: null });
      refreshIncomes();
    } catch (e) {
      setError(e.message || "Failed to delete income");
    }
  };

  // Clear error on modal close
  useEffect(() => {
    if (!modal.type) setError("");
  }, [modal.type]);

  return (
    <div className="income-page">
      <h1>💰 Income — {formatMonthId(monthId)}</h1>

      <div className="income-toolbar">
        <button onClick={openAdd}>➕ Add Income</button>
        <input
          type="text"
          placeholder="🔍 Search source or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
         <label className="toggle-categories">
            <input
            type="checkbox"
            checked={showCategories}
            onChange={e => setShowCategories(e.target.checked)}
            />
            Show Categories
        </label>
      </div>

      <IncomeTable
        data={filtered}
        categories={categories}
        showCategories={showCategories}
        onEdit={openEdit}
        onDelete={confirmDelete}
      />

      {modal.type === "form" && (
        <PromptModal
          title={modal.data.id ? "Edit Income" : "Add Income"}
          fields={[
            { name: "source", label: "Source", type: "text", required: true },
            { name: "amount", label: "Amount", type: "number", required: true },
            { name: "dateReceived", label: "Date", type: "date", required: true },
            {
                name:     "categoryId",
                label:    "Category",
                type:     "select",
                options:  categories.map(c => ({ value: c.id, label: c.name })),
                required: true
            },
            { name: "notes", label: "Notes", type: "textarea" },
          ]}
          initialValue={modal.data}
          onSubmit={handleSave}
          onClose={() => setModal({ type: null, data: null })}
          error={error}
        />
      )}

      {modal.type === "delete" && (
        <WarningModal
          message={`Delete income from “${modal.data.source}” on ${modal.data.dateReceived}?`}
          variant="danger"
          onConfirm={handleDelete}
          onCancel={() => setModal({ type: null, data: null })}
        />
      )}
    </div>
  );
}
