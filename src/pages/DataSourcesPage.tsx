import { mockDashboardData } from '../data/mockDashboardData'

const DataSourcesPage = () => {
  const cards = mockDashboardData.dataSources.cards

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-2xl font-semibold text-slate-900">Data Sources</h2>
        <p className="mt-1 text-sm text-slate-600">Static information for this frontend-only demo.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <article key={card.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DataSourcesPage
