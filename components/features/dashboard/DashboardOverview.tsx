import PageHeader from "@/components/features/PageHeader";
import StatCard from "@/components/features/StatCard";
import StatusBadge from "@/components/features/StatusBadge";
import DashboardCharts from "@/components/features/dashboard/DashboardCharts";
import {
  formatCurrency,
  getPropertyById,
  properties,
  rentPayments,
  tenants,
} from "@/lib/mock-data";

export default function DashboardOverview() {
  const totalToCollect = rentPayments.reduce((sum, rent) => sum + rent.amount, 0);
  const totalCollected = rentPayments
    .filter((rent) => rent.status === "PAID")
    .reduce((sum, rent) => sum + rent.amount, 0);
  const totalOverdue = rentPayments
    .filter((rent) => rent.status === "OVERDUE")
    .reduce((sum, rent) => sum + rent.amount, 0);
  const occupancyRate =
    (properties.reduce((sum, property) => sum + property.occupiedUnits, 0) /
      properties.reduce((sum, property) => sum + property.units, 0)) *
    100;

  return (
    <>
      <PageHeader
        title="Tableau de bord"
        description="Vue globale de l'activite locative et des encaissements."
        actionLabel="Ajouter un locataire"
      />

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total attendu" value={formatCurrency(totalToCollect)} />
        <StatCard
          label="Total encaisse"
          value={formatCurrency(totalCollected)}
          detail={`${Math.round((totalCollected / totalToCollect) * 100)}% collectes`}
          tone="success"
        />
        <StatCard
          label="Total en retard"
          value={formatCurrency(totalOverdue)}
          detail="Relance requise"
          tone="danger"
        />
        <StatCard
          label="Occupation"
          value={`${occupancyRate.toFixed(0)}%`}
          detail={`${tenants.length} locataires actifs`}
        />
      </section>

      <section className="mt-6">
        <DashboardCharts />
      </section>

      <section className="mt-8 rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Derniers loyers du mois
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-400">
              <tr className="border-b border-slate-100">
                <th className="px-5 py-3">Locataire</th>
                <th className="px-5 py-3">Bien</th>
                <th className="px-5 py-3">Montant</th>
                <th className="px-5 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rentPayments.map((rent) => {
                const tenant = tenants.find((item) => item.id === rent.tenantId);
                const property = getPropertyById(rent.propertyId);

                return (
                  <tr key={rent.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-medium text-slate-900">
                      {tenant?.firstName} {tenant?.lastName}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{property?.name}</td>
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {formatCurrency(rent.amount)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={rent.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
