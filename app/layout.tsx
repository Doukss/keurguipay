import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KeurGui Pay",
  description: "Gestion locative et suivi des loyers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
