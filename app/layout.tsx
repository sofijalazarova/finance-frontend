import "@/app/_styles/globals.css";

import { Roboto, Inter, Poppins } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import ReactQueryProvider from "@/utils/ReactQueryProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "BudgetMate",
  description: "A simple budgeting app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${roboto.variable} bg-ice-white`}
      >
        <ReactQueryProvider>
          <ReactQueryDevtools/>
          {children}</ReactQueryProvider>
      </body>
    </html>
    
  );
}
