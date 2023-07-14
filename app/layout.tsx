import "./globals.css";
import { Nunito } from "next/font/google";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Next BnB",
  description: "Next BnB, the NEXT Option",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
