// ExpensesPage.jsx - placeholder content
// src/pages/ExpensesPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ExpenseList from "../components/expenses/ExpenseList";
import PromptModal from "../components/modals/PromptModal";
import { getExpenses, addExpense } from "../api/expenses";
import { v4 as uuidv4 } from "uuid";

function ExpensesPage() {
  const { currentMonth } = useContext(AppContext);
  const [expenses, setExpenses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Load expenses when month changes
  useEffect(() => {
    if (currentMonth) loadExpenses();
  }, [currentMonth]);

  const loadExpenses = async () => {
    const data = await getExpenses(currentMonth);
    setExpenses(data);
  };

  const handleAddExpense = async ({ input, select }) => {
    const newExpense = {
      name: input,
      amount: 0,
      dueDate: "", // to be set in edit modal later
      paid: false,
      paidDate: "",
      confirmation: "",
      url: "",
      category: select,
      monthId: currentMonth,
    };
    await addExpense(newExpense);
    loadExpenses();
  };

  const seedTestExpenses = async () => {
    const sampleData = [
        {
        name: "Electric Bill",
        amount: 120.5,
        dueDate: "2025-07-05",
        paid: false,
        paidDate: "",
        confirmation: "",
        url: "https://utility.com",
        category: "Utility",
        },
        {
        name: "Rent",
        amount: 1800,
        dueDate: "2025-07-01",
        paid: true,
        paidDate: "2025-07-01",
        confirmation: "CONF123",
        url: "",
        category: "Housing",
        },
        {
        name: "Netflix",
        amount: 15.99,
        dueDate: "2025-07-10",
        paid: false,
        paidDate: "",
        confirmation: "",
        url: "https://netflix.com",
        category: "Subscription",
        },
    ];

    for (const item of sampleData) {
        await addExpense({
        ...item,
        id: uuidv4(),
        monthId: currentMonth,
        });
    }

    reload(); // Refresh UI
    };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>💸 Expenses – {currentMonth}</h2>

      <button onClick={() => setShowAddModal(true)}>➕ Add Expense</button>
      <button onClick={seedTestExpenses} style={{ marginLeft: "0.75rem" }}>
       🧪 Seed Test Data
      </button>
      {showAddModal && (
        <PromptModal
          title="Add Expense"
          label="Expense Name"
          initialValue=""
          selectOptions={[
            { label: "Utility", value: "Utility" },
            { label: "Housing", value: "Housing" },
            { label: "Subscription", value: "Subscription" },
            { label: "Other", value: "Other" },
          ]}
          submitLabel="Add"
          onSubmit={handleAddExpense}
          onClose={() => setShowAddModal(false)}
        />
      )}

      <ExpenseList items={expenses} reload={loadExpenses} />
    </div>
  );
}

export default ExpensesPage;
