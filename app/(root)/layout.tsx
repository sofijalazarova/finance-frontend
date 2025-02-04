import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      {/* <Header /> */}
      <Sidebar/>
    


      <div className=" sm:ml-64">
   
      
         {children} 
      

</div>
      
    </main>
  );
}
