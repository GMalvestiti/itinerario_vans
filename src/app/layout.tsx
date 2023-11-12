import './globals.css';

import * as React from 'react';

import ThemeRegistry from '@/app/components/ThemeRegistry/ThemeRegistry';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Itinerário de Vans"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}