// A default server component
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import SearchModal from "./components/modals/SearchModal";


export const metadata: Metadata = {
  title: "Travel Mate",
  description: "Created by Lincy",
};

const font = Nunito({
  subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const currentUser = await getCurrentUser();
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className = {font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal/>
          <RegisterModal />
          <Navbar session={session} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>    
      </body>
    </html>
  );
}
