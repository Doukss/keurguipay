import PageHeader from "@/components/features/PageHeader";
import StatusBadge from "@/components/features/StatusBadge";
import { formatCurrency, getPropertyById, tenants } from "@/lib/mock-data";

export default function TenantsPage() {
  return (
    <>
      <PageHeader
        title="Locataires"
        description="Liste des locataires actifs et de leurs contrats."
        actionLabel="Ajouter un locataire"
      />

      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-400">
              <tr className="border-b border-slate-100">
                <th className="px-5 py-3">Locataire</th>
                <th className="px-5 py-3">Telephone</th>
                <th className="px-5 py-3">Bien</th>
                <th className="px-5 py-3">Loyer</th>
                <th className="px-5 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tenants.map((tenant) => {
                const property = getPropertyById(tenant.propertyId);

                return (
                  <tr key={tenant.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {tenant.firstName} {tenant.lastName}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{tenant.phone}</td>
                    <td className="px-5 py-4 text-slate-600">{property?.name}</td>
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {formatCurrency(tenant.monthlyRent)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={tenant.status} />
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
