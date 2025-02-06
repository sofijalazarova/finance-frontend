"use client"


import { useAuthGuard } from "@/lib/auth/useAuth";
import Sidebar from "../../components/ layout/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const {user} = useAuthGuard({middleware: "auth"});

  if(user === undefined) return <div>Loading...</div>

  return (

    <main>     
      <Sidebar/>  
      <div className=" sm:ml-64">  
         {children}      
      </div>      
    </main>
  );
}
