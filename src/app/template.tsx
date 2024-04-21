import Footer from "@/components/structure/Footer";
import NavBar from "@/components/structure/NavBar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="mx-auto min-h-screen max-w-7xl p-1">
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
