// src/components/tables/IncomeTable.jsx
import React from "react";
import PropTypes from 'prop-types';
import DataTable from "./DataTable";
import DropdownMenu from "../common/DropdownMenu";
import IconHamburgerMenu from "../../icons/IconHamburgerMenu";
import CategoryBadge from "../common/CategoryBadge";
import { formatMDY } from "../../utils/formatters";

export default function IncomeTable({
  data = [],
  onEdit,
  onDelete,
  showCategories = true,
}) {

  // Default-sort the data
  const rows = React.useMemo(() => {
    return [...data].sort((a, b) =>
      new Date(a.dateReceived) - new Date(b.dateReceived)
    );
  }, [data]);

  const columns = [
    {
      key: "actions",
      label: "",
      sortable: false,
      width: "3rem",
      render: (row) => (
        <DropdownMenu
          items={[
            { key: "edit",   label: "Edit",   onClick: () => onEdit(row) },
            { key: "delete", label: "Delete", onClick: () => onDelete(row) },
          ]}
        >
          <IconHamburgerMenu />
        </DropdownMenu>
      ),
    },
    {
    key: "source",
    label: "Source",
    sortable: true,
    render: r => (
        <div className="name-cell">
        {showCategories && (
            <CategoryBadge category={r.categoryId} />
        )}

        {r.source}
        </div>
    )
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (r) => `$${r.amount.toFixed(2)}`,
    },
    {
      key: "dateReceived",
      label: "Date",
      sortable: true,
      render: (r) => formatMDY(r.dateReceived),
    },
  ];

  const getRowClass = (_r, idx) => (idx % 2 === 0 ? "row-even" : "row-odd");

  return (
    <DataTable
      columns={columns}
      rows={data}
      getRowClass={getRowClass}
    />
  );
}

IncomeTable.propTypes = {
  data: PropTypes.array,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showCategories: PropTypes.bool,
};
