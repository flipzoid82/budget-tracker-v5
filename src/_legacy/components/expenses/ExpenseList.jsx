// src/components/expenses/ExpenseList.jsx
import React, { useState } from "react";
import PromptModal from "../modals/PromptModal";
import WarningModal from "../modals/WarningModal";
import { updateExpense, deleteExpense } from "../../api/expenses";

/**
 * Renders a table of expenses for the selected month.
 * Includes support for mark as paid/unpaid, edit, and delete.
 */
function ExpenseList({ items, reload }) {
  const [selected, setSelected] = useState(null);
  const [modalType, setModalType] = useState(null);

  const handlePaidSubmit = async ({ input }) => {
    await updateExpense(selected.id, {
      paid: 1,
      paidDate: input,
      confirmation: "", // Simplified for now
    });
    setSelected(null);
    setModalType(null);
    reload();
  };

  const handleUnpaidConfirm = async () => {
    await updateExpense(selected.id, {
      paid: 0,
      paidDate: "",
      confirmation: "",
    });
    setSelected(null);
    setModalType(null);
    reload();
  };

  const handleEditExpense = async ({ input, select }) => {
    await updateExpense(selected.id, {
      name: input,
      category: select,
    });
    setSelected(null);
    setModalType(null);
    reload();
  };

  const handleDelete = async () => {
    await deleteExpense(selected.id);
    setSelected(null);
    setModalType(null);
    reload();
  };

  if (!items || items.length === 0) {
    return <p>No expenses yet for this month.</p>;
  }

  return (
    <>
      <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Due</th>
            <th>Status</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.dueDate || "—"}</td>
              <td>{expense.paid ? "✅ Paid" : "❌ Unpaid"}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  title={expense.paid ? "Undo Paid" : "Mark as Paid"}
                  onClick={() => {
                    setSelected(expense);
                    setModalType(expense.paid ? "undoPaid" : "markPaid");
                  }}
                >
                  💵
                </button>
                <button
                  title="Edit"
                  onClick={() => {
                    setSelected(expense);
                    setModalType("edit");
                  }}
                >
                  ✏️
                </button>
                <button
                  title="Delete"
                  onClick={() => {
                    setSelected(expense);
                    setModalType("delete");
                  }}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mark as Paid */}
      {modalType === "markPaid" && selected && (
        <PromptModal
          title="Mark as Paid"
          label="Paid Date (YYYY-MM-DD)"
          initialValue={new Date().toISOString().substring(0, 10)}
          submitLabel="Mark Paid"
          onSubmit={({ input }) => handlePaidSubmit({ input })}
          onClose={() => {
            setSelected(null);
            setModalType(null);
          }}
        />
      )}

      {/* Undo Paid */}
      {modalType === "undoPaid" && selected && (
        <WarningModal
          title="Undo Paid?"
          message={`Mark "${selected.name}" as unpaid? This will clear confirmation and paid date.`}
          confirmLabel="Undo"
          onConfirm={handleUnpaidConfirm}
          onCancel={() => {
            setSelected(null);
            setModalType(null);
          }}
        />
      )}

      {/* Edit */}
      {modalType === "edit" && selected && (
        <PromptModal
          title="Edit Expense"
          label="Expense Name"
          initialValue={selected.name}
          selectOptions={[
            { label: "Utility", value: "Utility" },
            { label: "Housing", value: "Housing" },
            { label: "Subscription", value: "Subscription" },
            { label: "Other", value: "Other" },
          ]}
          submitLabel="Save"
          onSubmit={handleEditExpense}
          onClose={() => {
            setSelected(null);
            setModalType(null);
          }}
        />
      )}

      {/* Delete */}
      {modalType === "delete" && selected && (
        <WarningModal
          title="Delete Expense"
          message={`Are you sure you want to permanently delete "${selected.name}"?`}
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => {
            setSelected(null);
            setModalType(null);
          }}
        />
      )}
    </>
  );
}

export default ExpenseList;
