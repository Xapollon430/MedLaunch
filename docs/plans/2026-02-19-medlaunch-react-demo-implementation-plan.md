# MedLaunch React Demo Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a frontend-only MedLaunch demo in React that opens directly on provider performance and preserves full dashboard route parity using static local mock data.

**Architecture:** Use a route-based React SPA with a shared shell (`Navbar` + hamburger drawer) and route-specific pages. Keep a small global UI context for drawer/title state, and keep business state local to pages, especially provider-performance. All dashboard data is sourced from typed in-repo mock data and transformed through pure selector utilities.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS, React Router, Recharts, Vitest, React Testing Library

---

## Execution Notes
- Required execution skills during implementation: `@superpowers/test-driven-development`, `@superpowers/verification-before-completion`, `@superpowers/subagent-driven-development` (if staying in this session)
- Keep commits small and frequent, following the commit step at the end of each task.
- Do not introduce backend/API/Firebase/env data fetching.

### Task 1: Bootstrap React + Tailwind + Test Harness

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `vitest.setup.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `src/App.test.tsx`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`

**Step 1: Scaffold project**

Run: `npm create vite@latest . -- --template react-ts --force`
Expected: Vite React TS scaffold files created.

**Step 2: Add dependencies**

Run: `npm install react-router-dom recharts && npm install -D tailwindcss postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event`
Expected: install completes with no errors.

**Step 3: Write failing smoke test**

```tsx
// src/App.test.tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders MedLaunch shell title", () => {
  render(<App />);
  expect(screen.getByText(/MedLaunch/i)).toBeInTheDocument();
});
```

**Step 4: Run test to verify it fails**

Run: `npm run test -- src/App.test.tsx`
Expected: FAIL (App does not yet render MedLaunch title).

**Step 5: Write minimal implementation**

```tsx
// src/App.tsx
export default function App() {
  return <div>MedLaunch</div>;
}
```

**Step 6: Run test to verify it passes**

Run: `npm run test -- src/App.test.tsx`
Expected: PASS.

**Step 7: Commit**

```bash
git add package.json vite.config.ts vitest.setup.ts index.html src/main.tsx src/App.tsx src/index.css src/App.test.tsx tsconfig.json tsconfig.app.json tsconfig.node.json postcss.config.js tailwind.config.ts
git commit -m "chore: scaffold react demo with tailwind and test harness"
```

### Task 2: Define Domain Types and Seed Mock Dashboard Data

**Files:**
- Create: `src/types/dashboard.ts`
- Create: `src/data/mockDashboardData.ts`
- Create: `src/data/constants.ts`
- Test: `src/data/mockDashboardData.test.ts`

**Step 1: Write failing data-shape test**

```ts
// src/data/mockDashboardData.test.ts
import { mockDashboardData } from "./mockDashboardData";

test("contains required route datasets", () => {
  expect(mockDashboardData.providerPerformance).toBeDefined();
  expect(mockDashboardData.providerRankings).toBeDefined();
  expect(mockDashboardData.financial).toBeDefined();
  expect(mockDashboardData.operational).toBeDefined();
  expect(mockDashboardData.clinical).toBeDefined();
  expect(mockDashboardData.dataSources).toBeDefined();
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/data/mockDashboardData.test.ts`
Expected: FAIL with module/file not found.

**Step 3: Write minimal typed model + mock data**

```ts
// src/types/dashboard.ts
export type Metric = { label: string; values: number[]; total: number; coding?: string };
export type HierarchyNode = { id: string; label: string; type: "location" | "provider"; data: Record<string, any>; children?: HierarchyNode[] };
export type DashboardData = {
  providerPerformance: Record<string, HierarchyNode[]>;
  providerRankings: Record<string, Record<string, Record<string, number>>>;
  financial: Record<string, Record<string, string | number>>;
  operational: Record<string, Record<string, number[]>>;
  clinical: { title: string; subtitle: string };
  dataSources: { cards: Array<{ id: string; title: string; description: string }> };
};
```

```ts
// src/data/mockDashboardData.ts
import type { DashboardData } from "../types/dashboard";

export const mockDashboardData: DashboardData = {
  providerPerformance: {
    "2024": [
      {
        id: "loc-nyc",
        label: "New York Sleep Center",
        type: "location",
        data: {
          totalVisits: { label: "Total Visits", values: [120, 130, 140, 150, 155, 160, 162, 170, 172, 174, 176, 180], total: 1889, coding: "-" },
          rvus: { label: "RVUs", values: [210, 215, 225, 230, 235, 240, 242, 250, 252, 255, 258, 260], total: 2872, coding: "-" },
          charges: { label: "Charges", values: [45000, 46000, 47000, 49000, 50000, 51000, 51500, 52000, 53000, 54000, 55000, 56000], total: 612500, coding: "-" },
          payments: { label: "Payments", values: [24000, 24500, 25000, 25500, 26000, 26500, 27000, 27250, 27500, 28000, 28500, 29000], total: 318750, coding: "-" },
          adjustments: { label: "Adjustments", values: [8000, 8200, 8100, 8400, 8500, 8600, 8700, 8800, 8850, 8900, 9000, 9100], total: 103150, coding: "-" },
          payroll: { label: "Payroll", values: [9000, 9000, 9100, 9200, 9300, 9400, 9500, 9500, 9600, 9700, 9800, 10000], total: 113100, coding: "-" },
          operatingProfit: { label: "Operating Profit", values: [7000, 7300, 7900, 7900, 8200, 8500, 8800, 8950, 9050, 9400, 9700, 9900], total: 102600, coding: "-" }
        },
        children: []
      }
    ]
  },
  providerRankings: { "2024": { PatientCount: { "Doe, Jane": 1820, "Smith, Alan": 1610 }, RVUs: { "Doe, Jane": 2320, "Smith, Alan": 2210 }, G2211: { "Doe, Jane": 640, "Smith, Alan": 520 }, SleepStudy: { "Doe, Jane": 430, "Smith, Alan": 380 } } },
  financial: {
    "Overall - Sum": { "0-30 Days": 250000, "31-60 Days": 175000, "61-90 Days": 98000, "91-120 Days": 62000, "121 - 150 Days": 43000, "151 - 180 Days": 30000, "> 180 Days": 25000, "Total Balance": 683000, "Total Balance %": "100%" },
    "Patient Balance": { "0-30 Days": 82000, "31-60 Days": 55000, "61-90 Days": 34000, "91-120 Days": 18000, "121 - 150 Days": 12000, "151 - 180 Days": 9000, "> 180 Days": 7000, "Total Balance": 217000, "Total Balance %": "31.77%" }
  },
  operational: {
    "2023": { patientsSeen: [80, 88, 93, 95, 98, 101, 103, 106, 108, 110, 112, 115], newPatients: [12, 13, 12, 14, 14, 15, 16, 16, 17, 18, 17, 19], charges: [32000, 33000, 34000, 35000, 36000, 37000, 38000, 39000, 40000, 40500, 41000, 42000], rvus: [150, 160, 165, 168, 172, 176, 180, 183, 187, 190, 195, 198], totalReceipts: [17000, 17300, 17600, 18000, 18300, 18700, 19100, 19400, 19700, 20000, 20400, 20800], payerPayment: [11000, 11200, 11400, 11600, 11800, 12000, 12200, 12300, 12500, 12700, 12800, 13000], patientPayment: [6000, 6100, 6200, 6400, 6500, 6700, 6900, 7100, 7200, 7300, 7600, 7800], sleepStudy: [20, 21, 23, 24, 25, 25, 26, 27, 28, 29, 30, 31] },
    "2024": { patientsSeen: [90, 95, 100, 103, 106, 110, 112, 115, 118, 121, 124, 128], newPatients: [14, 14, 15, 16, 16, 17, 18, 18, 19, 19, 20, 21], charges: [35000, 36000, 37000, 38500, 39000, 40000, 41000, 42000, 43000, 44000, 45000, 46000], rvus: [165, 170, 175, 180, 183, 187, 190, 195, 198, 202, 206, 210], totalReceipts: [18500, 18800, 19100, 19600, 19800, 20300, 20800, 21200, 21700, 22100, 22500, 23000], payerPayment: [11900, 12100, 12300, 12600, 12700, 12900, 13100, 13300, 13500, 13700, 13900, 14100], patientPayment: [6600, 6700, 6800, 7000, 7100, 7400, 7700, 7900, 8200, 8400, 8600, 8900], sleepStudy: [22, 23, 24, 25, 26, 26, 28, 29, 30, 31, 32, 33] }
  },
  clinical: { title: "Clinical Dashboard", subtitle: "Coming soon..." },
  dataSources: { cards: [{ id: "local-mock", title: "Local Mock Data", description: "Frontend-only static dataset used for this demo." }] }
};
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/data/mockDashboardData.test.ts`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/types/dashboard.ts src/data/mockDashboardData.ts src/data/constants.ts src/data/mockDashboardData.test.ts
git commit -m "feat: add typed local mock dashboard dataset"
```

### Task 3: Build Utility Selectors and Formatters

**Files:**
- Create: `src/utils/format.ts`
- Create: `src/utils/hierarchy.ts`
- Create: `src/utils/rankings.ts`
- Test: `src/utils/hierarchy.test.ts`
- Test: `src/utils/rankings.test.ts`
- Test: `src/utils/format.test.ts`

**Step 1: Write failing hierarchy + rankings tests**

```ts
// src/utils/hierarchy.test.ts
import { flattenHierarchy, filterHierarchy } from "./hierarchy";

test("flattens nested hierarchy", () => {
  const nodes = [{ id: "1", label: "L1", type: "location", data: {}, children: [{ id: "2", label: "P1", type: "provider", data: {} }] }];
  expect(flattenHierarchy(nodes).map((n) => n.id)).toEqual(["1", "2"]);
});

test("filters provider mode by label", () => {
  const nodes = [{ id: "1", label: "Main", type: "location", data: {}, children: [{ id: "2", label: "Jane Doe", type: "provider", data: {} }] }];
  const result = filterHierarchy(nodes, "jane", "Provider");
  expect(result).toHaveLength(1);
  expect(result[0].label).toBe("Jane Doe");
});
```

```ts
// src/utils/rankings.test.ts
import { getSortedRanking } from "./rankings";

test("sorts rankings descending", () => {
  const out = getSortedRanking({ A: 3, B: 5, C: 1 });
  expect(out.categories).toEqual(["B", "A", "C"]);
  expect(out.values).toEqual([5, 3, 1]);
});
```

**Step 2: Run tests to verify failure**

Run: `npm run test -- src/utils/hierarchy.test.ts src/utils/rankings.test.ts`
Expected: FAIL with missing modules.

**Step 3: Write minimal utility implementations**

```ts
// src/utils/hierarchy.ts
import type { HierarchyNode } from "../types/dashboard";

export type SidebarMode = "Location" | "Provider" | "Hierarchial PDF";

export function flattenHierarchy(nodes: HierarchyNode[]): HierarchyNode[] {
  return nodes.flatMap((node) => [node, ...(node.children ? flattenHierarchy(node.children) : [])]);
}

export function filterHierarchy(nodes: HierarchyNode[], term: string, mode: SidebarMode): HierarchyNode[] {
  const q = term.trim().toLowerCase();
  if (mode === "Provider") {
    return flattenHierarchy(nodes).filter((n) => n.type === "provider" && n.label.toLowerCase().includes(q));
  }
  if (mode === "Location") {
    return q ? nodes.filter((n) => n.label.toLowerCase().includes(q)) : nodes;
  }
  return nodes;
}
```

```ts
// src/utils/rankings.ts
export function getSortedRanking(input: Record<string, number>) {
  const entries = Object.entries(input).sort((a, b) => b[1] - a[1]);
  return { categories: entries.map(([k]) => k), values: entries.map(([, v]) => v) };
}
```

**Step 4: Run tests to verify pass**

Run: `npm run test -- src/utils/hierarchy.test.ts src/utils/rankings.test.ts src/utils/format.test.ts`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/utils/format.ts src/utils/hierarchy.ts src/utils/rankings.ts src/utils/hierarchy.test.ts src/utils/rankings.test.ts src/utils/format.test.ts
git commit -m "feat: add selector and formatter utilities for dashboard data"
```

### Task 4: Build App Context, Route Map, and App Shell

**Files:**
- Create: `src/context/AppContext.tsx`
- Create: `src/layout/AppShell.tsx`
- Create: `src/components/navigation/Navbar.tsx`
- Create: `src/components/navigation/DrawerMenu.tsx`
- Create: `src/router.tsx`
- Modify: `src/App.tsx`
- Test: `src/layout/AppShell.test.tsx`

**Step 1: Write failing shell/navigation test**

```tsx
// src/layout/AppShell.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

test("shows provider performance title on default route", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Provider Performance/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify failure**

Run: `npm run test -- src/layout/AppShell.test.tsx`
Expected: FAIL because routing/shell not implemented.

**Step 3: Write minimal shell and routes**

```tsx
// src/router.tsx
import { Navigate, createBrowserRouter } from "react-router-dom";
import AppShell from "./layout/AppShell";
import ProviderPerformancePage from "./pages/ProviderPerformancePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/provider-performance" replace /> },
      { path: "provider-performance", element: <ProviderPerformancePage /> }
    ]
  },
  { path: "*", element: <Navigate to="/provider-performance" replace /> }
]);
```

**Step 4: Run test to verify pass**

Run: `npm run test -- src/layout/AppShell.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/context/AppContext.tsx src/layout/AppShell.tsx src/components/navigation/Navbar.tsx src/components/navigation/DrawerMenu.tsx src/router.tsx src/App.tsx src/layout/AppShell.test.tsx
git commit -m "feat: add shared shell with drawer navigation and base routing"
```

### Task 5: Implement Provider Hierarchy Sidebar (Search + Expand/Collapse)

**Files:**
- Create: `src/components/provider/HierarchySidebar.tsx`
- Create: `src/components/provider/HierarchyNode.tsx`
- Modify: `src/pages/ProviderPerformancePage.tsx`
- Test: `src/components/provider/HierarchySidebar.test.tsx`

**Step 1: Write failing sidebar interaction tests**

```tsx
// src/components/provider/HierarchySidebar.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HierarchySidebar from "./HierarchySidebar";
import { mockDashboardData } from "../../data/mockDashboardData";

test("filters providers by search term in Provider mode", async () => {
  const user = userEvent.setup();
  render(<HierarchySidebar nodes={mockDashboardData.providerPerformance["2024"]} selectedId={null} onSelect={() => {}} />);
  await user.click(screen.getByRole("button", { name: /Provider/i }));
  await user.type(screen.getByPlaceholderText(/Search/i), "Jane");
  expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify failure**

Run: `npm run test -- src/components/provider/HierarchySidebar.test.tsx`
Expected: FAIL.

**Step 3: Implement sidebar + recursive node component**

```tsx
// key behavior in HierarchyNode.tsx
const [isOpen, setIsOpen] = useState(false);
const hasChildren = Boolean(node.children?.length);

<button onClick={() => { setIsOpen((v) => !v); onSelect(node); }}>
  {node.label}
</button>
{hasChildren && isOpen && node.children!.map((child) => (
  <HierarchyNode key={child.id} node={child} depth={depth + 1} onSelect={onSelect} selectedId={selectedId} />
))}
```

**Step 4: Run test to verify pass**

Run: `npm run test -- src/components/provider/HierarchySidebar.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/provider/HierarchySidebar.tsx src/components/provider/HierarchyNode.tsx src/pages/ProviderPerformancePage.tsx src/components/provider/HierarchySidebar.test.tsx
git commit -m "feat: add hierarchy sidebar with search and recursive expansion"
```

### Task 6: Build Provider Performance Monthly Table

**Files:**
- Create: `src/components/provider/ProviderPerformanceTable.tsx`
- Create: `src/components/provider/MetricSectionRow.tsx`
- Modify: `src/pages/ProviderPerformancePage.tsx`
- Test: `src/components/provider/ProviderPerformanceTable.test.tsx`

**Step 1: Write failing table render/expand tests**

```tsx
// src/components/provider/ProviderPerformanceTable.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProviderPerformanceTable from "./ProviderPerformanceTable";
import { mockDashboardData } from "../../data/mockDashboardData";

test("renders core metric rows and expands charges detail", async () => {
  const user = userEvent.setup();
  const node = mockDashboardData.providerPerformance["2024"][0];
  render(<ProviderPerformanceTable node={node} />);
  expect(screen.getByText(/Total Visits/i)).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: /Charges/i }));
  expect(screen.getByText(/Charge Per Patient/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify failure**

Run: `npm run test -- src/components/provider/ProviderPerformanceTable.test.tsx`
Expected: FAIL.

**Step 3: Implement monthly table with expandable sections**

```tsx
// example pattern
const [chargesExpanded, setChargesExpanded] = useState(false);

<tr>
  <td>
    <button onClick={() => setChargesExpanded((v) => !v)}>Charges</button>
  </td>
  {data.charges.values.map((v) => <td key={v}>{formatCurrency(v)}</td>)}
</tr>
{chargesExpanded && (
  <tr>
    <td>Charge Per Patient</td>
    {data.chargePerPatient.values.map((v) => <td key={v}>{formatCurrency(v)}</td>)}
  </tr>
)}
```

**Step 4: Run test to verify pass**

Run: `npm run test -- src/components/provider/ProviderPerformanceTable.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/provider/ProviderPerformanceTable.tsx src/components/provider/MetricSectionRow.tsx src/pages/ProviderPerformancePage.tsx src/components/provider/ProviderPerformanceTable.test.tsx
git commit -m "feat: implement provider performance monthly table with expandable rows"
```

### Task 7: Add Annual Table and Monthly/Annual Toggle Integration

**Files:**
- Create: `src/components/provider/ProviderPerformanceAnnualTable.tsx`
- Create: `src/components/common/YearSelector.tsx`
- Create: `src/components/common/ViewModeToggle.tsx`
- Modify: `src/pages/ProviderPerformancePage.tsx`
- Test: `src/pages/ProviderPerformancePage.test.tsx`

**Step 1: Write failing integration test for view mode switching**

```tsx
// src/pages/ProviderPerformancePage.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProviderPerformancePage from "./ProviderPerformancePage";

test("switches from monthly to annual view", async () => {
  const user = userEvent.setup();
  render(<ProviderPerformancePage />);
  await user.click(screen.getByRole("button", { name: /View Annually/i }));
  expect(screen.getByText(/Operating Profit/i)).toBeInTheDocument();
  expect(screen.getByText(/2024/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify failure**

Run: `npm run test -- src/pages/ProviderPerformancePage.test.tsx`
Expected: FAIL.

**Step 3: Implement toggle + annual table lookup by node id**

```tsx
const [viewMode, setViewMode] = useState<"monthly" | "annual">("monthly");

return viewMode === "monthly" ? (
  <ProviderPerformanceTable node={selectedNode} />
) : (
  <ProviderPerformanceAnnualTable nodeId={selectedNode.id} allYears={mockDashboardData.providerPerformance} />
);
```

**Step 4: Run test to verify pass**

Run: `npm run test -- src/pages/ProviderPerformancePage.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/provider/ProviderPerformanceAnnualTable.tsx src/components/common/YearSelector.tsx src/components/common/ViewModeToggle.tsx src/pages/ProviderPerformancePage.tsx src/pages/ProviderPerformancePage.test.tsx
git commit -m "feat: add annual provider performance view with year controls"
```

### Task 8: Implement Provider Rankings Route and Chart Component

**Files:**
- Create: `src/components/charts/RankingsBarChart.tsx`
- Create: `src/pages/ProviderRankingsPage.tsx`
- Modify: `src/router.tsx`
- Test: `src/pages/ProviderRankingsPage.test.tsx`

**Step 1: Write failing rankings test**

```tsx
// src/pages/ProviderRankingsPage.test.tsx
import { render, screen } from "@testing-library/react";
import ProviderRankingsPage from "./ProviderRankingsPage";

test("renders rankings charts for all metrics", () => {
  render(<ProviderRankingsPage />);
  expect(screen.getByText(/Total Patients Seen Year to Date/i)).toBeInTheDocument();
  expect(screen.getByText(/RVUs Year to Date/i)).toBeInTheDocument();
  expect(screen.getByText(/G2211 Codes Year to Date/i)).toBeInTheDocument();
  expect(screen.getByText(/Sleep Studies Year to Date/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify failure**

Run: `npm run test -- src/pages/ProviderRankingsPage.test.tsx`
Expected: FAIL.

**Step 3: Implement rankings page and reusable chart wrapper**

```tsx
<RankingsBarChart title={`RVUs Year to Date ${activeYear}`} categories={rvu.categories} values={rvu.values} color="#f97316" />
```

**Step 4: Run test to verify pass**

Run: `npm run test -- src/pages/ProviderRankingsPage.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/charts/RankingsBarChart.tsx src/pages/ProviderRankingsPage.tsx src/router.tsx src/pages/ProviderRankingsPage.test.tsx
git commit -m "feat: add provider rankings route with chart cards"
```

### Task 9: Implement Operational Route and Multi-Year Line Charts

**Files:**
- Create: `src/components/charts/OperationalLineChart.tsx`
- Create: `src/pages/OperationalPage.tsx`
- Modify: `src/router.tsx`
- Test: `src/pages/OperationalPage.test.tsx`

**Step 1: Write failing operational test**

```tsx
// src/pages/OperationalPage.test.tsx
import { render, screen } from "@testing-library/react";
import OperationalPage from "./OperationalPage";

test("renders operational metric sections", () => {
  render(<OperationalPage />);
  expect(screen.getByText(/Patients Seen/i)).toBeInTheDocument();
  expect(screen.getByText(/New Patient Count/i)).toBeInTheDocument();
  expect(screen.getByText(/Total Receipts/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify failure**

Run: `npm run test -- src/pages/OperationalPage.test.tsx`
Expected: FAIL.

**Step 3: Implement operational charts by metric**

```tsx
<OperationalLineChart title="Patients Seen 2023 vs 2024" data={mockDashboardData.operational} metric="patientsSeen" />
```

**Step 4: Run test to verify pass**

Run: `npm run test -- src/pages/OperationalPage.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/charts/OperationalLineChart.tsx src/pages/OperationalPage.tsx src/router.tsx src/pages/OperationalPage.test.tsx
git commit -m "feat: add operational dashboard route with multi-year charts"
```

### Task 10: Implement Financial Route Table

**Files:**
- Create: `src/pages/FinancialPage.tsx`
- Modify: `src/router.tsx`
- Test: `src/pages/FinancialPage.test.tsx`

**Step 1: Write failing financial table test**

```tsx
// src/pages/FinancialPage.test.tsx
import { render, screen } from "@testing-library/react";
import FinancialPage from "./FinancialPage";

test("renders aging bucket columns", () => {
  render(<FinancialPage />);
  expect(screen.getByText(/0-30 Days/i)).toBeInTheDocument();
  expect(screen.getByText(/31-60 Days/i)).toBeInTheDocument();
  expect(screen.getByText(/Total Balance/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify failure**

Run: `npm run test -- src/pages/FinancialPage.test.tsx`
Expected: FAIL.

**Step 3: Implement financial table renderer using fixed bucket order**

```tsx
const agingBuckets = ["0-30 Days", "31-60 Days", "61-90 Days", "91-120 Days", "121 - 150 Days", "151 - 180 Days", "> 180 Days", "Total Balance", "Total Balance %"];
```

**Step 4: Run test to verify pass**

Run: `npm run test -- src/pages/FinancialPage.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/pages/FinancialPage.tsx src/router.tsx src/pages/FinancialPage.test.tsx
git commit -m "feat: add financial dashboard table route"
```

### Task 11: Implement Clinical + Data Sources Pages and Complete Route Parity

**Files:**
- Create: `src/pages/ClinicalPage.tsx`
- Create: `src/pages/DataSourcesPage.tsx`
- Modify: `src/router.tsx`
- Modify: `src/components/navigation/DrawerMenu.tsx`
- Test: `src/router.parity.test.tsx`

**Step 1: Write failing route parity test**

```tsx
// src/router.parity.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("all required dashboard routes are reachable from drawer", () => {
  render(
    <MemoryRouter initialEntries={["/clinical"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Clinical Dashboard/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify failure**

Run: `npm run test -- src/router.parity.test.tsx`
Expected: FAIL.

**Step 3: Implement remaining pages and drawer entries**

```tsx
// ClinicalPage.tsx
export default function ClinicalPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-slate-900">Clinical Dashboard</h1>
      <p className="text-slate-600">Coming soon...</p>
    </div>
  );
}
```

**Step 4: Run test to verify pass**

Run: `npm run test -- src/router.parity.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/pages/ClinicalPage.tsx src/pages/DataSourcesPage.tsx src/router.tsx src/components/navigation/DrawerMenu.tsx src/router.parity.test.tsx
git commit -m "feat: complete route parity including clinical and data sources"
```

### Task 12: Final QA, Visual Polish, and Verification Before Completion

**Files:**
- Modify: `src/index.css`
- Modify: `src/layout/AppShell.tsx`
- Modify: `README.md`
- Test: `src/smoke/allRoutes.smoke.test.tsx`

**Step 1: Write failing all-routes smoke test**

```tsx
// src/smoke/allRoutes.smoke.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

const routes = [
  "/provider-performance",
  "/provider-rankings",
  "/financial",
  "/operational",
  "/clinical",
  "/data-sources"
];

test.each(routes)("renders %s", (route) => {
  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole("navigation")).toBeInTheDocument();
});
```

**Step 2: Run smoke test and verify failure**

Run: `npm run test -- src/smoke/allRoutes.smoke.test.tsx`
Expected: FAIL until remaining selector/title wiring is corrected.

**Step 3: Apply final fixes + README usage docs**

- Ensure mobile/desktop layout works.
- Ensure `/` and unknown route redirect behavior is stable.
- Update `README.md` with:
  - install/run commands
  - route list
  - note that data is static local mock

**Step 4: Run full verification suite**

Run:
- `npm run test`
- `npm run build`
- `npm run dev -- --host 0.0.0.0 --port 4173` (manual route walkthrough)

Expected:
- all tests PASS
- production build succeeds
- routes render with no console errors

**Step 5: Commit**

```bash
git add src/index.css src/layout/AppShell.tsx README.md src/smoke/allRoutes.smoke.test.tsx
git commit -m "chore: finalize styling, smoke coverage, and docs"
```

---

Plan complete and saved to `docs/plans/2026-02-19-medlaunch-react-demo-implementation-plan.md`. Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

Which approach?
