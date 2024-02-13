import NavBar from "@/components/NavBar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-7xl">
      <NavBar />
      {children}
    </div>
  );
}
