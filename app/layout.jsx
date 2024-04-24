import { Inter } from "next/font/google";
import "./globals.css";
import UidContextProvider from "@/context/UidContext";
import ReduxContextProvider from "@/context/ReduxContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat",
  description: "Chat nextjs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ReduxContextProvider>
          <UidContextProvider>{children}</UidContextProvider>
        </ReduxContextProvider>
      </body>
    </html>
  );
}
