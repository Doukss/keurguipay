"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

type PaymentDetails = {
  id: string;
  amount: number;
  tenantName: string;
  propertyName: string;
  agencyName: string;
  status: string;
};

export default function PaymentPage() {
  const params = useParams();
  const paymentId = String(params.id ?? "demo-payment");
  const [submitting, setSubmitting] = useState(false);

  const payment = useMemo<PaymentDetails>(
    () => ({
      id: paymentId,
      amount: 175000,
      tenantName: "Moustapha Diop",
      propertyName: "Appartement 4A - Almadies",
      agencyName: "ImmoSenegal S.A.R.L",
      status: "PENDING",
    }),
    [paymentId],
  );

  const handlePayment = async () => {
    setSubmitting(true);

    try {
      const response = await fetch("/api/paytech/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: payment.id,
          amount: payment.amount,
          description: `Loyer - ${payment.propertyName}`,
        }),
      });

      const data = await response.json();

      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }

      alert("Erreur lors de l'initialisation du paiement. Reessayez.");
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      alert("Une erreur reseau est survenue.");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-gray-50 px-4 py-8 sm:items-center sm:justify-center">
      <div className="w-full max-w-md rounded-lg border border-gray-100 bg-white p-6 shadow-sm sm:my-auto">
        <div className="mb-6 text-center">
          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-600">
            Demande de reglement
          </span>
          <h1 className="mt-3 text-xl font-bold text-gray-800">
            {payment.agencyName}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{payment.propertyName}</p>
        </div>

        <hr className="my-4 border-gray-100" />

        <div className="my-6 rounded-lg bg-gray-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Montant du loyer
          </p>
          <p className="mt-1 text-3xl font-black text-slate-900">
            {payment.amount.toLocaleString("fr-FR")}{" "}
            <span className="text-xl font-bold">FCFA</span>
          </p>
        </div>

        <div className="mb-8 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Locataire</span>
            <span className="font-semibold text-gray-700">{payment.tenantName}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Reference facture</span>
            <span className="font-mono text-xs text-gray-500">
              {payment.id.substring(0, 8)}...
            </span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={submitting}
          className="flex w-full items-center justify-center rounded-lg bg-violet-600 px-6 py-4 font-semibold text-white shadow-md transition hover:bg-violet-700 disabled:bg-violet-300"
        >
          {submitting
            ? "Redirection vers Wave / Orange Money..."
            : "Proceder au paiement"}
        </button>
      </div>

      <div className="mt-6 space-y-1 text-center text-xs text-gray-400">
        <p>Paiement 100% securise</p>
        <p>
          Propulse par{" "}
          <span className="font-semibold text-violet-500">KeurGui Pay</span> &
          PayTech
        </p>
      </div>
    </div>
  );
}
