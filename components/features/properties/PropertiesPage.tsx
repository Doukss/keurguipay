import PageHeader from "@/components/features/PageHeader";
import { formatCurrency, getOwnerById, properties } from "@/lib/mock-data";

export default function PropertiesPage() {
  return (
    <>
      <PageHeader
        title="Biens"
        description="Catalogue des biens geres par l'agence."
        actionLabel="Ajouter un bien"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {properties.map((property) => {
          const owner = getOwnerById(property.ownerId);

          return (
            <article
              key={property.id}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-950">{property.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{property.address}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {property.type}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-xs text-slate-400">Proprietaire</p>
                  <p className="mt-1 font-medium text-slate-800">{owner?.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Loyer</p>
                  <p className="mt-1 font-medium text-slate-800">
                    {formatCurrency(property.monthlyRent)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Occupation</p>
                  <p className="mt-1 font-medium text-slate-800">
                    {property.occupiedUnits}/{property.units}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
