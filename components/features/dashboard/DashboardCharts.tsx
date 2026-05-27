"use client";

import { useMemo, useState } from "react";
import {
  formatCurrency,
  monthlyCollections,
  properties,
  rentPayments,
  tenants,
  type RentStatus,
} from "@/lib/mock-data";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type StatusCount = {
  status: RentStatus;
  label: string;
  value: number;
  color: string;
};

const statusColors: Record<RentStatus, string> = {
  PAID: "#10b981",
  PENDING: "#f59e0b",
  OVERDUE: "#e11d48",
};

const statusOptions: Array<{
  value: "ALL" | RentStatus;
  label: string;
  color: string;
}> = [
  { value: "ALL", label: "Tous", color: "#64748b" },
  { value: "PAID", label: "Payés", color: "#10b981" },
  { value: "PENDING", label: "En attente", color: "#f59e0b" },
  { value: "OVERDUE", label: "En retard", color: "#e11d48" },
];

function ChartStat({
  label,
  value,
  accentColor,
  description,
}: {
  label: string;
  value: string;
  accentColor: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p>
        </div>
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{ backgroundColor: accentColor }}
        >
          <span className="h-3 w-3 rounded-full bg-white" />
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-500">{description}</p>
    </div>
  );
}

function CollectionAreaChart() {
  const chartData = monthlyCollections.map((item) => ({
    month: item.month,
    Attendu: item.expected,
    Encaisse: item.collected,
  }));

  return (
    <section className="rounded-xl border border-slate-200 bg-linear-to-br from-white to-slate-50 p-6 shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-950">
            Evolution des encaissements
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Comparaison du montant attendu et encaisse.
          </p>
        </div>
        <div className="rounded-lg bg-emerald-50 px-3 py-2 text-right">
          <p className="text-xs font-medium text-emerald-700">Dernier mois</p>
          <p className="text-sm font-bold text-emerald-800">
            {formatCurrency(
              monthlyCollections[monthlyCollections.length - 1].collected,
            )}
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="encaisseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="attenduGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickFormatter={(v) => `${(Number(v) / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(v: unknown) => formatCurrency(Number(v))}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="Attendu"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#attenduGradient)"
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="Encaisse"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#encaisseGradient)"
              fillOpacity={1}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function StatusDonutChart() {
  const statusCounts: StatusCount[] = [
    {
      status: "PAID",
      label: "Payes",
      value: rentPayments.filter((rent) => rent.status === "PAID").length,
      color: "#10b981",
    },
    {
      status: "PENDING",
      label: "En attente",
      value: rentPayments.filter((rent) => rent.status === "PENDING").length,
      color: "#f59e0b",
    },
    {
      status: "OVERDUE",
      label: "En retard",
      value: rentPayments.filter((rent) => rent.status === "OVERDUE").length,
      color: "#e11d48",
    },
  ];
  const total = statusCounts.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
      <h3 className="font-semibold text-slate-950">Statut des loyers</h3>
      <p className="mt-1 text-sm text-slate-500">
        Repartition du mois en cours.
      </p>

      <div className="mt-6 flex flex-col items-center">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={statusCounts}
              dataKey="value"
              nameKey="label"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={4}
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {statusCounts.map((item) => (
                <Cell key={item.status} fill={item.color} stroke={item.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
              formatter={(v: unknown) => `${Number(v) ?? 0} loyers`}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-4 text-center">
          <p className="text-3xl font-bold text-slate-950">{total}</p>
          <p className="text-xs text-slate-500">loyers</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {statusCounts.map((item) => (
          <div
            key={item.status}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2 text-slate-600">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </span>
            <span className="font-semibold text-slate-900">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PropertyRevenueChart({
  selectedStatus,
  onStatusChange,
}: {
  selectedStatus: "ALL" | RentStatus;
  onStatusChange: (status: "ALL" | RentStatus) => void;
}) {
  const chartData = useMemo(
    () =>
      properties.map((property) => {
        const tenant = tenants.find((item) => item.propertyId === property.id);
        return {
          id: property.id,
          name: property.name.split(" - ")[1] || property.name,
          type: property.type,
          amount: tenant?.monthlyRent ?? property.monthlyRent,
          status: tenant?.status ?? "PENDING",
        };
      }),
    [],
  );

  const filteredData = useMemo(
    () =>
      selectedStatus === "ALL"
        ? chartData
        : chartData.filter((entry) => entry.status === selectedStatus),
    [selectedStatus, chartData],
  );

  const selectedLabel =
    selectedStatus === "ALL"
      ? "Tous les statuts"
      : (statusOptions.find((option) => option.value === selectedStatus)
          ?.label ?? "Filtre");

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-slate-950">Revenus par bien</h3>
          <p className="mt-1 text-sm text-slate-500">
            Filtrer selon le statut du loyer.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onStatusChange(option.value)}
              className={`rounded-full border px-3 py-1 text-sm transition ${
                selectedStatus === option.value
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <span className="font-semibold text-slate-900">{selectedLabel}</span> —{" "}
        {filteredData.length} bien(s)
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={filteredData}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 90, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            horizontal={false}
          />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#64748b" }}
            tickFormatter={(v) => `${(Number(v) / 1000).toFixed(0)}k`}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#334155" }}
            width={80}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -10px rgb(15 23 42 / 0.3)",
            }}
            formatter={(v: unknown) => formatCurrency(Number(v))}
          />
          <Bar dataKey="amount" radius={[8, 8, 8, 8]} animationDuration={1400}>
            {filteredData.map((entry) => (
              <Cell
                key={entry.id}
                fill={statusColors[entry.status as RentStatus] ?? "#64748b"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default function DashboardCharts() {
  const totalExpected = monthlyCollections.reduce(
    (sum, item) => sum + item.expected,
    0,
  );
  const totalCollected = monthlyCollections.reduce(
    (sum, item) => sum + item.collected,
    0,
  );
  const collectionRate = Math.round((totalCollected / totalExpected) * 100);
  const totalPaid = rentPayments.filter(
    (rent) => rent.status === "PAID",
  ).length;
  const totalOverdue = rentPayments.filter(
    (rent) => rent.status === "OVERDUE",
  ).length;
  const totalPending = rentPayments.filter(
    (rent) => rent.status === "PENDING",
  ).length;
  const [selectedStatus, setSelectedStatus] = useState<"ALL" | RentStatus>(
    "ALL",
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <ChartStat
          label="Encaisse attendue"
          value={formatCurrency(totalExpected)}
          accentColor="#f59e0b22"
          description="Montant prévu sur les 6 derniers mois."
        />
        <ChartStat
          label="Encaisse réel"
          value={formatCurrency(totalCollected)}
          accentColor="#10b98122"
          description={`${collectionRate}% de collecte réalisée`}
        />
        <ChartStat
          label="Loyers en retard"
          value={`${totalOverdue} total`}
          accentColor="#e11d4822"
          description="Nombre de paiements nécessitant une relance."
        />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-2xl shadow-slate-950/10">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              Analyse des flux
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Suivi des encaissements dynamiques
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-300">
              Visualisez l'évolution des montants attendus et encaissés, ainsi
              que la performance par statut de loyer.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-900/80 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                Payé
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {totalPaid}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                En attente
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {totalPending}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                En retard
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {totalOverdue}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.4fr)]">
        <CollectionAreaChart />
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-1">
          <StatusDonutChart />
          <PropertyRevenueChart
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
        </div>
      </div>
    </div>
  );
}
