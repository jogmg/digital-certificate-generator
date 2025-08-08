import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Certificate Generator",
  description: "Generate a digital certificate with QR code for authentication",
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
