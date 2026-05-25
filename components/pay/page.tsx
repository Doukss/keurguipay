"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Interface pour typer nos données de paiement
interface PaymentDetails {
  id: string;
  amount: number;
  tenantName: string;
  propertyName: string;
  agencyName: string;
  status: string;
}

export default function PaymentPage() {
  const params = useParams();
  const paymentId = params.id as string;

  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 1. Simuler ou récupérer les infos du paiement au chargement
  useEffect(() => {
    // Plus tard, tu feras un fetch(`/api/payments/${paymentId}`)
    // Pour l'instant, on mock les données pour tester ton design
    setPayment({
      id: paymentId,
      amount: 175000,
      tenantName: "Moustapha Diop",
      propertyName: "Appartement 4A - Almadies",
      agencyName: "ImmoSénégal S.A.R.L",
      status: "PENDING",
    });
    setLoading(false);
  }, [paymentId]);

  // 2. Fonction pour déclencher le paiement vers PayTech
  const handlePayment = async () => {
    if (!payment) return;
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
        // Redirection directe vers la page de paiement sécurisée PayTech (Wave/OM)
        window.location.href = data.redirectUrl;
      } else {
        alert("Erreur lors de l'initialisation du paiement. Réessayez.");
        setSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur réseau est survenue.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500 animate-pulse">Chargement de votre facture KeurGui Pay...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 px-4 py-8 justify-between sm:justify-center sm:items-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sm:my-auto">
        
        {/* En-tête de l'Agence */}
        <div className="text-center mb-6">
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
            Demande de règlement
          </span>
          <h1 className="text-xl font-bold text-gray-800 mt-3">{payment?.agencyName}</h1>
          <p className="text-sm text-gray-500 mt-1">{payment?.propertyName}</p>
        </div>

        <hr className="border-gray-100 my-4" />

        {/* Détails du montant */}
        <div className="bg-gray-50 rounded-xl p-4 text-center my-6">
          <p className="text-xs text-gray-400 uppercase font-medium tracking-wide">Montant du loyer</p>
          <p className="text-3xl font-black text-slate-900 mt-1">
            {payment?.amount.toLocaleString("fr-FR")} <span className="text-xl font-bold">FCFA</span>
          </p>
        </div>

        {/* Informations Locataire */}
        <div className="space-y-3 mb-8 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Locataire</span>
            <span className="font-semibold text-gray-700">{payment?.tenantName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Référence Facture</span>
            <span className="font-mono text-xs text-gray-500">{payment?.id.substring(0, 8)}...</span>
          </div>
        </div>

        {/* Bouton d'action principal */}
        <button
          onClick={handlePayment}
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-md transition duration-200 disabled:bg-purple-300 flex items-center justify-center space-x-2"
        >
          {submitting ? (
            <span>Redirection vers Wave / Orange Money...</span>
          ) : (
            <span>Procéder au paiement</span>
          )}
        </button>
      </div>

      {/* Footer de réassurance */}
      <div className="text-center text-xs text-gray-400 mt-6 space-y-1">
        <p>🔒 Paiement 100% sécurisé</p>
        <p>Propulsé par <span className="font-semibold text-blue-500">KeurGui Pay</span> & PayTech</p>
      </div>
    </div>
  );
}