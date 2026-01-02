import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Caveat } from "next/font/google";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { certia, main } from "./fonts";

export const metadata: Metadata = {
  title: "Sumit K.",
  description: "Hi, I'm Sumit K.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${main.variable} ${certia.variable} antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
