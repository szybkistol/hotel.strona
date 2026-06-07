import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka Prywatności - Hotel z Lasów Corso",
  description: "Poznaj zasady przetwarzania danych osobowych oraz politykę prywatności stosowaną w Hotelu z Lasów Corso.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
