# MedLaunch React Frontend-Only Demo Design

## Goal
Build a frontend-only React demo app named MedLaunch that reproduces the existing dashboard experience (table, hierarchy sidebar, charts, and route navigation) without any backend/Firebase dependencies.

## Approved Scope
- Stack: Vite + React + TypeScript + Tailwind + React Router
- Data model: single customer, single source, static local mock data
- Landing behavior: no customer picker; open directly to demo dashboard
- Route parity required:
  - `/provider-performance`
  - `/provider-rankings`
  - `/financial`
  - `/operational`
  - `/clinical`
  - `/data-sources`
- UI parity target: preserve routes + hierarchy sidebar + table + charts
- Exclusions: no print feature, no CSV download actions, no API calls, no server/Firebase

## Architecture
Create a single-page React app with route-level pages and shared layout shell.

### App shell
- Top navbar with:
  - hamburger button to open/close route drawer
  - current route title
- Left drawer menu listing all dashboard routes
- Provider hierarchy sidebar shown on provider-performance page

### Routing
- `/` redirects to `/provider-performance`
- Unknown routes redirect to `/provider-performance`
- Each dashboard route renders in the shared shell

### Data layer
- One source of truth file in `src/data/mockDashboardData.ts`
- No async data fetching; all selectors read from local objects

## Component Design

### Layout/navigation
- `src/layout/AppShell.tsx`
- `src/components/navigation/Navbar.tsx`
- `src/components/navigation/DrawerMenu.tsx`

### Provider performance flow
- `src/components/provider/HierarchySidebar.tsx`
- `src/components/provider/HierarchyNode.tsx`
- `src/components/provider/ProviderPerformanceTable.tsx`
- `src/components/provider/ProviderPerformanceAnnualTable.tsx`
- `src/components/common/YearSelector.tsx`
- `src/components/common/ViewModeToggle.tsx`

### Chart/dashboard components
- `src/components/charts/RankingsBarChart.tsx`
- `src/components/charts/OperationalLineChart.tsx`

### Route pages
- `src/pages/ProviderPerformancePage.tsx`
- `src/pages/ProviderRankingsPage.tsx`
- `src/pages/FinancialPage.tsx`
- `src/pages/OperationalPage.tsx`
- `src/pages/ClinicalPage.tsx`
- `src/pages/DataSourcesPage.tsx`

## State Design

### Global (context)
- `isDrawerOpen`
- `currentDashboard`

### Route-local
Provider performance:
- `activeYear`
- `viewMode` (`monthly` | `annual`)
- `searchTerm`
- `sidebarCategory` (`Location` | `Provider` | `Hierarchial PDF`)
- `selectedNode`

Other routes:
- minimal local state (for example, `activeYear` in provider rankings)

## Data Flow

### Provider performance
1. Read `providerPerformance[activeYear]` from mock data.
2. Sidebar applies mode-aware filtering and search.
3. Node selection drives table content.
4. In hierarchical mode, render flattened hierarchy list.
5. Annual mode resolves same node IDs across all years.

### Provider rankings
1. Read `providerRankings[activeYear]`.
2. Sort metric maps descending by value.
3. Render ranked bar charts by metric.

### Operational
1. Read `operational` yearly metric arrays.
2. Render multi-line charts comparing years per metric.

### Financial
1. Read static aging-bucket matrix.
2. Render dashboard table using fixed row/column order.

### Clinical
- Static placeholder (“Coming soon” style), matching prior behavior.

### Data sources
- Static informational cards only (no download actions).

## Error Handling
- Guard missing year keys with empty-state rendering.
- If selected node becomes invalid after filter/year change, auto-select first valid node.
- Suppress empty/zero-only charts.
- Route fallback redirect for unknown paths.

## Testing Strategy

### Unit tests (Vitest)
- hierarchy flattening and filtering selectors
- rankings transformation/sorting
- formatting helpers

### Component tests (React Testing Library)
- sidebar selection updates provider-performance table
- monthly/annual toggle changes rendered table mode
- drawer navigation updates route/page title

### Route smoke tests
- each route renders expected shell heading and primary content block

## Acceptance Criteria
- App launches directly into provider performance without customer selection.
- All six dashboard routes are accessible via hamburger drawer.
- Provider hierarchy supports expand/collapse and search.
- Provider performance table and annual toggle behave like prior UI.
- Rankings and operational charts render from local mock data.
- Financial table renders with expected aging bucket structure.
- No backend/Firebase/environment API configuration is required.

## Out of Scope (v1)
- Authentication/user roles
- Backend/API integration
- Live ETL triggers
- File export/download
- Print-specific layout

