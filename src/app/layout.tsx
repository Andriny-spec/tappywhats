import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tappy WhatsApp - Automatize seu WhatsApp",
  description: "Transforme seu WhatsApp em uma máquina de vendas com o Tappy WhatsApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="fixed inset-0 -z-10 gradient-bg" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
