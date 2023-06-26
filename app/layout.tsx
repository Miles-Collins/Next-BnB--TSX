import "./globals.css";
import { Nunito } from "next/font/google";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Next BnB",
  description: "Next BnB, the NEXT Option",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
