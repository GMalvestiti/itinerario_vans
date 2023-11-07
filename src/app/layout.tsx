import './globals.css';

import * as React from 'react';

import ThemeRegistry from '@/app/components/ThemeRegistry/ThemeRegistry';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | ProDriver",
    default: "ProDriver",
  },
  description: "Projeto ProDriver",
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