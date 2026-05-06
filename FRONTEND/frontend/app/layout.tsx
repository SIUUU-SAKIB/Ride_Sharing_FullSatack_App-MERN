import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Nav from "./_components/Nav";

const roboto = Roboto({
  weight:["300","400", "500", "700", "800", "900"],
  subsets: ["latin"],
  display:"swap"
})

export const metadata: Metadata = {
  icons: {
    icon: '/car.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <div>
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
