import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Caveat } from "next/font/google";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

const caveat = Caveat({
  weight: "400",
  subsets: ["latin"],
});

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
      <body className={`${caveat.className} antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
