import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulamin - Hotel z Lasów Corso",
  description: "Poznaj regulamin i warunki pobytu gości w Hotelu z Lasów Corso. Informacje o rezerwacjach, wyżywieniu i opiece weterynaryjnej.",
};

export default function RegulationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
