import Footer from "@/components/structure/Footer";
import NavBar from "@/components/structure/NavBar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="mx-auto min-h-screen max-w-7xl">
        <NavBar />
        {children}
      </div>
      <div className="mx-auto max-w-7xl">
        {" "}
        <Footer />
      </div>
    </div>
  );
}
