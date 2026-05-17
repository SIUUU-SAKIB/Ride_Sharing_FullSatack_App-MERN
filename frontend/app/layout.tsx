import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import {Toaster} from 'sonner'

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto"
})

export const metadata: Metadata = {
  title: "Ridex Ride Sharing Site",
  description: "This is the only fast and effiecient way of sharing ride.",
  icons: {
    icon: "/car.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Providers>
          <Toaster position="top-center" richColors/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
