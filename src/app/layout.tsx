import { Navbar } from "@/components/Navbar";
import "./globals.css";

import { Work_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { FlashMessage } from '@/components/FlashMessage';

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Get A Pet",
  description: "Adoção de pets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <Navbar />
        <FlashMessage />
        <main className="min-h-[66vh] w-[1200px] pt-4 pb-8 px-12 my-0 mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
