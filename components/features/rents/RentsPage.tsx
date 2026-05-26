import PageHeader from "@/components/features/PageHeader";
import StatusBadge from "@/components/features/StatusBadge";
import StatCard from "@/components/features/StatCard";
import {
  formatCurrency,
  getPropertyById,
  getTenantById,
  rentPayments,
} from "@/lib/mock-data";

export default function RentsPage() {
  const total = rentPayments.reduce((sum, rent) => sum + rent.amount, 0);
  const paid = rentPayments
    .filter((rent) => rent.status === "PAID")
    .reduce((sum, rent) => sum + rent.amount, 0);
  const overdue = rentPayments
    .filter((rent) => rent.status === "OVERDUE")
    .reduce((sum, rent) => sum + rent.amount, 0);

  return (
    <>
      <PageHeader
        title="Suivi des loyers"
        description="Pilotage mensuel des paiements, retards et relances."
        actionLabel="Generer une demande"
      />

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="A collecter" value={formatCurrency(total)} />
        <StatCard label="Encaisse" value={formatCurrency(paid)} tone="success" />
        <StatCard label="En retard" value={formatCurrency(overdue)} tone="danger" />
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-400">
              <tr className="border-b border-slate-100">
                <th className="px-5 py-3">Periode</th>
                <th className="px-5 py-3">Locataire</th>
                <th className="px-5 py-3">Bien</th>
                <th className="px-5 py-3">Echeance</th>
                <th className="px-5 py-3">Montant</th>
                <th className="px-5 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rentPayments.map((rent) => {
                const tenant = getTenantById(rent.tenantId);
                const property = getPropertyById(rent.propertyId);

                return (
                  <tr key={rent.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-medium text-slate-900">
                      {rent.period}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {tenant?.firstName} {tenant?.lastName}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{property?.name}</td>
                    <td className="px-5 py-4 text-slate-600">{rent.dueDate}</td>
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
