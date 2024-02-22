import Banner from "@/components/mainLayout/Banner";
import Blog from "@/components/mainLayout/LayoutBlog";
import Motivation from "@/components/mainLayout/Motivation";
import Reviews from "@/components/mainLayout/Reviews";
import Subscribe from "@/components/mainLayout/Subscribe";

export default function Home() {
  return (
    <main className="border-2 pr-5 pl-5 border-slate-100 shadow-2xl bg-yellow-100 rounded-md mb-5">
      <Banner />
      <Blog />
      <Motivation />
      <Reviews />
      <Subscribe />
    </main>
  );
}
