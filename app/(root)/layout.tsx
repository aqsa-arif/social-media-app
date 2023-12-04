import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/components/common/Topbar";
import Bottombar from "@/components/common/Bottombar";
import LeftSidebar from "@/components/common/LeftSidebar";
import TanstackProvider from "@/components/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SocialMediaApp",
  description: "A Nextjs 13 Meta SocialMediaApp Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ClerkProvider>
    // <TanstackProvider>
    // <html lang="en">
      // <body className={inter.className}>
        <main className="w-full">
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
          </main>
          <Bottombar />
        </main>
        // </body>  
      // </html>  
      // </TanstackProvider>  
      // </ClerkProvider>  
  );
}
