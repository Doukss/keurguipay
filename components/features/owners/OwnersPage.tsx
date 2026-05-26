import PageHeader from "@/components/features/PageHeader";
import { owners } from "@/lib/mock-data";

export default function OwnersPage() {
  return (
    <>
      <PageHeader
        title="Proprietaires"
        description="Suivi des proprietaires et de leurs biens rattaches."
        actionLabel="Ajouter un proprietaire"
      />

      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-400">
              <tr className="border-b border-slate-100">
                <th className="px-5 py-3">Nom</th>
                <th className="px-5 py-3">Telephone</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Biens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {owners.map((owner) => (
                <tr key={owner.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {owner.name}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{owner.phone}</td>
                  <td className="px-5 py-4 text-slate-600">{owner.email}</td>
                  <td className="px-5 py-4 text-slate-900">
                    {owner.propertiesCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
