import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";
import TanstackProvider from "@/components/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SocailMediaApp | Authentication",
  description: "A Nextjs 13 Meta SocailMediaApp Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <TanstackProvider>
        <html lang="en">
          <body className={`${inter.className} bg-dark-1`}>{children}</body>
        </html>
      </TanstackProvider>
    </ClerkProvider>
  );
}
