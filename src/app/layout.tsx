import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ecoworks Monitoring",
  description: "Monitoring system for Ecoworks staff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
