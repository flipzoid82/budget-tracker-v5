import React from "react";
import DataTable from "./DataTable";
import DropdownMenu from "../common/DropdownMenu";
import IconHamburgerMenu from "../../icons/IconHamburgerMenu";
import CategoryBadge from "../common/CategoryBadge";
import { formatMDY } from "../../utils/formatters";

export default function ExpenseTable({
  data,
  showCategories = true,
  onMarkPaidClick,
  onMarkUnpaidClick,    
  onEdit,
  onDelete
}) {
  const columns = [
        {
      key: "actions",
      label: "",
      sortable: true,
      render: r => (
        <DropdownMenu
          items={[
            {
              key: "pay",
              label: r.paid ? "Mark Unpaid" : "Mark Paid",
              // route to the right handler based on current state
              onClick: () =>
                r.paid
                  ? onMarkUnpaidClick(r)
                  : onMarkPaidClick(r),
            },
            {
              key: "edit",
              label: "Edit",
              onClick: () => onEdit(r),
            },
            {
              key: "delete",
              label: "Delete",
              onClick: () => onDelete(r), // pass the whole record, not just its id
            },
          ]}
        >
          <IconHamburgerMenu />
        </DropdownMenu>
      ),
    },
    {
    key: "name",
    label: "Name",
    sortable: true,
    render: r => (
        <div className="name-cell">
        {showCategories && (
            <CategoryBadge category={r.categoryId} />
        )}

        {r.url
            ? <a href={r.url} target="_blank" rel="noopener">{r.name}</a>
            : r.name}
        </div>
    )
    },
    { key: "amount", label: "Amount", sortable: true,  render: r => `$${r.amount.toFixed(2)}` },
    { key: "dueDate",   label: "Due Date", sortable: true, render: r => formatMDY(r.dueDate) },
    { key: "paidDate",  label: "Paid Date", sortable: true, render: r => r.paidDate ? formatMDY(r.paidDate) : "–" },
    { key: "confirmation", label: "Confirmation", sortable: true, render: r => r.confirmation || "–" },  
  ];
// ─── Row‐tint: returns a class based on r.paid ─────────────────────────────────
    const getRowClass = r => r.paid ? "row-paid" : "row-unpaid";
// ──────────────────────────────────────────────────────────────────────────────
    return (
    <DataTable
      columns={columns}
      rows={data}
      getRowClass={getRowClass}
    />
  );
}
