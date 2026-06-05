import type { Metadata } from "next";
import { Quicksand, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Hotel z Lasów Corso - Luksusowy Hotel dla Twojego Psa",
  description: "Drugi Dom Dla Twojego Przyjaciela. Zapewniamy profesjonalną opiekę, miłość i bezpieczeństwo w luksusowych warunkach. Bo każdy pies zasługuje na wakacje.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${quicksand.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
