import Banner from "@/components/mainLayout/Banner";
import Blog from "@/components/mainLayout/Blog";
import Motivation from "@/components/mainLayout/Motivation";
import Reviews from "@/components/mainLayout/Reviews";

export default function Home() {
  return (
    <main className="">
      <Banner />
      <Blog />
      <Motivation />
      <Reviews />
    </main>
  );
}
