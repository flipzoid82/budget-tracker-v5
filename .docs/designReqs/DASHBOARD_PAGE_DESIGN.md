📊 Dashboard Page – Design Spec (Revised)

## 🧠 Purpose

The Dashboard is the user’s control center, giving an at-a-glance view of financial health for the selected month. It should be:

- **Informative**: Key totals and summaries
- **Action-oriented**: Quick links and toggles
- **Visually engaging**: Color, charts, and hover effects

---

## 🧱 Structure (Top to Bottom)

### 1. Page Header

- **Icon + Title**: `📊 Dashboard — APR 2025`
- Uses `formatMonthId(monthId)` to display human-friendly month.

### 2. Summary Cards Grid

- **4-column CSS grid**: `grid-template-columns: repeat(4, 1fr)`
- **Cards**:
  1. **Total Income** (green tint, link to `/income`)
  2. **Total Expenses** (red tint, link to `/expenses`)
  3. **Unpaid Bills** (red tint if > 0; neutral otherwise)
  4. **Surplus** (green if ≥ 0; red if negative)
- **Styling**: Tinted background, colored border, matching text per variant; hover “lift” effect.

### 3. Trend Chart Panel

- **Title**: “Income vs. Expenses over the past 6 months”
- **Chart**: `ComposedChart` with:
  - **Income** as green bars
  - **Expenses** as red line with white-filled, red-stroked dots
- **Data**: Last 6 months via `get-dashboard-history`; X-axis labels via `formatMonthId`.

### 4. Activity Cards Section

- **Side-by-side grid** (`auto-fit, minmax(220px, 1fr)`)
- **Cards** (render only if non-empty):
  - 🔴 **Overdue Bills**
  - 🟠 **Upcoming Bills**
  - ✅ **Recently Paid**
- **Features**:
  - Up to 6 items shown by default, with “Show X More…” toggle.
  - Dates formatted via `formatMDY`.

### 5. Optional Future Panels

- KPI deltas and sparklines
- Category breakdown chart (pie/bar)
- Quick-action buttons (“+ Add Expense/Income”)
- Goal-tracking widget (budget vs. actual)

---

## 📐 Layout & Styling

- **Page CSS**: `src/styles/DashboardPage.css`
- **Component CSS**:
  - `DashboardCard.css`
  - `DashboardTrendChart.css`
  - `DashboardActivityCard.css`
- Responsive grid and dark-mode compatible.

---

## 🔁 Behavior

- **Triggers**:
  - Month switch
  - CRUD on income/expenses
- **Response**: Real-time updates via `useDashboardData` hook.

## 🔒 Data Dependencies

- **IPC handlers**:
  - `get-dashboard-summary`
  - `get-dashboard-history`
  - `get-urgent-bills`
- **Database**:
  - `income WHERE monthId = ?`
  - `expenses WHERE monthId = ?`

---

## ✅ Recap Summary

| Section                    | Status |
| -------------------------- | :----: |
| Page Header                |   ✅   |
| Summary Cards (4 cards)    |   ✅   |
| Trend Chart (6-month)      |   ✅   |
| Activity Cards (3 buckets) |   ✅   |
| Responsive & styled        |   ✅   |
| Live data refresh          |   ✅   |
