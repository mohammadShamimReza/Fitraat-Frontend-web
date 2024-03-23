import Faq from "@/components/FAQ";
import AboutSpartan from "@/components/mainLayout/AboutSpartan";
import Banner from "@/components/mainLayout/Banner";
import Motivation from "@/components/mainLayout/Motivation";
import Reviews from "@/components/mainLayout/Reviews";
import Subscribe from "@/components/mainLayout/Subscribe";

export default function Home() {
  return (
    <main className="mb-5">
      <Banner />
      <AboutSpartan />
      <Motivation />
      <Reviews />
      <Faq />
      <Subscribe />
    </main>
  );
}
