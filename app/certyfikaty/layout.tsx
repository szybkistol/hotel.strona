import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certyfikaty i Szkolenia - Hotel z Lasów Corso",
  description: "Poznaj kwalifikacje i wiedzę naszej kadry. Zobacz certyfikaty z behawiorystyki psów, pierwszej pomocy przedweterynaryjnej oraz żywienia i dietetyki.",
};

export default function CertificatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
