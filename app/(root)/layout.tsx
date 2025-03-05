"use client";

import { useAuthGuard } from "@/lib/auth/useAuth";
import Sidebar from "../../components/ layout/Sidebar";
import Loading from "../../components/ui/Loading";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useAuthGuard({ middleware: "auth" });

  if (!user) {
    return <Loading />;
  }

  return (
    <main>
      <Sidebar />
      <div className=" sm:ml-64">{children}</div>
    </main>
  );
}
