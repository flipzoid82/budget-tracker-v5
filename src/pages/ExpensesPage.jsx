// src/pages/ExpensesPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useMonthContext } from "../context/MonthContext";
import { useExpenses }     from "../hooks/useExpenses";
import { useCategories }   from "../hooks/useCategories";
import { formatMonthId }   from "../utils/formatters";
import ExpenseTable        from "../components/tables/ExpenseTable";
import PromptModal         from "../components/modals/PromptModal";
import WarningModal        from "../components/modals/WarningModal";
import IconWarningSolid    from "../icons/IconWarningSolid";
import "../styles/ExpensesPage.css";

export default function ExpensesPage() {
  const [showCategories, setShowCategories] = useState(true);
  const { monthId } = useMonthContext();
  const [expenses, setExpenses] = useExpenses();
  const categories = useCategories();

  // UI state
  const [search, setSearch]     = useState("");
  const [modal, setModal]       = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // { type: "add"|"edit"|"delete", data? }

  // filter only (sorting delegated to DataTable)
  const list = useMemo(() => {
    return expenses.filter(e =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      (categories.find(c=>c.id===e.categoryId).name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [expenses, search]);

  // CRUD handlers
  const refresh = () => window.api.getExpenses(monthId).then(setExpenses);

    const handleSave = exp => {
      // derive a paid flag: if the form sent one, use it; else infer from paidDate
       const paidFlag = 
           typeof exp.paid === "number"
           ? exp.paid
           : exp.paidDate
               ? 1
               : 0;

       const payload = { ...exp, monthId, paid: paidFlag };
       const fn = exp.id ? window.api.updateExpense : window.api.addExpense;
       fn(payload)
           .then(res => {
               if (!res.success) throw new Error("Save failed");
               refresh();
               setModal(null);
           })
           .catch(err => {
               setErrorMsg(err.message);
           });
    };

  const handleMarkPaid = exp => {
    window.api
      .updateExpense({ 
        ...exp, 
        paid: exp.paid ? 0 : 1, 
        
        // use ISO-date string instead of raw timestamp:
        paidDate: exp.paid
        ? null
        : new Date().toISOString().slice(0, 10)
      })
      .then(refresh);
  };

  const handleDelete = id => {
    window.api.deleteExpense(id).then(refresh);
    setModal(null);
  };

  const handleMarkPaidClick = exp => {
    setModal({ type: "markPaid", data: exp });
  };

  const handleMarkUnpaidClick = exp => {
    setModal({ type: "markUnpaid", data: exp });
  };

  useEffect(() => {
  return () => {
    // Clear expenses when component unmounts or month changes
    setExpenses([]);
  };
    }, [monthId]);

  return (
    <div className="expenses-page">
      <h1>💸 Expenses – {formatMonthId(monthId)}</h1>

      <div className="expenses-toolbar">
        <button onClick={() => setModal({ type: "add" })}>➕ Add Expense</button>
        <input
          type="text"
          placeholder="🔍 Search name or category"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <label className="toggle-categories">
            <input
            type="checkbox"
            checked={showCategories}
            onChange={e => setShowCategories(e.target.checked)}
            />
            Show Categories
        </label>
      {/* header‐click sorting now handled in DataTable */}   
      </div>

      <ExpenseTable
        data={list}
        showCategories={showCategories}
        onMarkPaidClick={handleMarkPaidClick}
        onMarkUnpaidClick={handleMarkUnpaidClick}
        onEdit={exp => setModal({ type: "edit", data: exp })}
        onDelete={exp => setModal({ type: "delete", data: exp })}
      />

      {errorMsg && (
        <WarningModal
            message={`Could not save expense: ${errorMsg}`}
            onConfirm={() => setErrorMsg(null)}
            onCancel={() => setErrorMsg(null)}
            variant="danger"
        />
       )}

      {/* Delete confirmation */}
      {modal?.type === "delete" && (
        <WarningModal
          message={`Delete "${modal.data.name}"?`}
          onConfirm={() => handleDelete(modal.data.id)}
          onCancel={() => setModal(null)}
          variant="danger"
        />
      )}

      {/* Add/Edit form */}
      {(modal?.type === "add" || modal?.type === "edit") && (
        <PromptModal
          title={modal.type === "add" ? "Add Expense" : "Edit Expense"}
          fields={[
            { name: "name",     label: "Name",     type: "text",   required: true },
            { name: "amount",   label: "Amount",   type: "number", required: true },
            { name: "dueDate",  label: "Due Date", type: "date",   required: true },
            {
                name:    "categoryId",
                label:   "Category",
                type:    "select",
                options: categories.map(c => ({ value: c.id, label: c.name })),
                required: true
            },
            { name:"url",          label:"URL",          type:"url"    },
            { name:"paidDate",     label:"Paid Date",    type:"date"   },
            { name:"confirmation", label:"Confirmation", type:"text"   },
          ]}
          initialValue={modal.data}
          onSubmit={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {/* Prompt for marking Paid */}
      {modal?.type === "markPaid" && (
        <PromptModal
          title={`Mark "${modal.data.name}" Paid`}
          fields={[
            { name: "paidDate",     label: "Paid Date",    type: "date", required: true },
            { name: "confirmation", label: "Confirmation", type: "text" }
          ]}
          initialValue={modal.data}
          onSubmit={values => {
            window.api
              .updateExpense({
                ...modal.data,
                paid: 1,
                paidDate: values.paidDate,
                confirmation: values.confirmation
              })
              .then(() => {
                refresh();
                setModal(null);
              });
          }}
          onClose={() => setModal(null)}
        />
      )}

      {/* Warning before marking Unpaid */}
      {modal?.type === "markUnpaid" && (
        <WarningModal
            icon={<IconWarningSolid />}
            message={`If you mark "${modal.data.name}" unpaid, its Paid Date & Confirmation will be cleared. Proceed?`}
          onConfirm={() => {
            window.api
              .updateExpense({
                ...modal.data,
                paid: 0,
                paidDate: null,
                confirmation: null
              })
              .then(() => {
                refresh();
                setModal(null);
              });
          }}
          onCancel={() => setModal(null)}
          variant="warning"
        />
      )}
    </div>
);
}
