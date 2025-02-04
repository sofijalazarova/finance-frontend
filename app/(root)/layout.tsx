
import Sidebar from "../_components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      
      <Sidebar/>
    
      <div className=" sm:ml-64">
   
         {children} 
      

</div>
      
    </main>
  );
}
