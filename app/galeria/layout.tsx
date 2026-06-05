import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria - Hotel z Lasów Corso",
  description: "Zobacz naszą galerię zdjęć przedstawiających naszych zadowolonych psich gości oraz udogodnienia i tereny wokół Hotelu z Lasów Corso.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
