import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/layout/Footer";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Управление клиентами",
};

export default function RootLayout({
  children,
  clientModal,
  params: {session, ...params}
}: Readonly<{
  children: React.ReactNode
  clientModal: React.ReactNode
  params: any
}>) {
  return (
    <html lang="en">
      <body className={clsx("bg-blue-100", inter.className)}>
        <SessionProvider session={session}>
            <div className="flex flex-col justify-between min-h-screen">
              <Header />
              <main className="p-10 grow mt-16">
                {children}
                {clientModal}
              </main>
              <Footer />
            </div>
        </SessionProvider>
      </body>
    </html>
  );
}
