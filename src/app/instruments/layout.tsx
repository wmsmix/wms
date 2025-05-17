import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Instruments | WMS",
  description: "View all instruments",
};

export default function InstrumentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
} 