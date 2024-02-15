import Banner from "@/components/mainLayout/Banner";
import Footer from "@/components/mainLayout/Footer";
import Blog from "@/components/mainLayout/LayoutBlog";
import Motivation from "@/components/mainLayout/Motivation";
import Reviews from "@/components/mainLayout/Reviews";
import Subscribe from "@/components/mainLayout/Subscribe";

export default function Home() {
  return (
    <main className="">
      <Banner />
      <Blog />
      <Motivation />
      <Reviews />
      <Subscribe />
      <Footer />
    </main>
  );
}
