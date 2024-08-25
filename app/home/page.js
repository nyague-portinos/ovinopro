import Nav from "@/components/nav";
import Establecimiento from "@/components/establecimiento";
import SideNav from "@/components/sideNav";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-white flex flex-col">
      <Nav />

      <div className="w-full  flex flex-grow">
        <SideNav/>
        <div className="w-[80%] ml-[20%]    bg-white  mt-20">
          <Establecimiento />
        </div>
      </div>
    </main>
  );
}
