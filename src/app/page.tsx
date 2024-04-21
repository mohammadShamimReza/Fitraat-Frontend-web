import AboutSpartan from "@/components/mainLayout/AboutSpartan";
import Banner from "@/components/mainLayout/Banner";
import Motivation from "@/components/mainLayout/Motivation";
import RecoveryFeature from "@/components/mainLayout/RecoveryFeature";
import Reviews from "@/components/mainLayout/Reviews";
import Subscribe from "@/components/mainLayout/Subscribe";
import Faq from "@/components/structure/FAQ";

export default function Home() {
  return (
    <main className="">
      <Banner />
      <AboutSpartan />
      <Motivation />
      <RecoveryFeature />
      <Reviews />
      <Faq />
      <Subscribe />
    </main>
  );
}
