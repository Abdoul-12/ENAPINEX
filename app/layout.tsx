import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/src/components/layout/Navbar";
import ToastProvider from "@/src/components/ui/ToastProvider";

export const metadata: Metadata = {
  title: "ENAPINEX — Les saveurs du terroir gabonais",
  description: "Marketplace de miels et chenilles comestibles du Gabon",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ToastProvider>
          <Navbar />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
