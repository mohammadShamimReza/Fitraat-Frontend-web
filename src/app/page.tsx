import AboutSpartan from "@/components/mainLayout/AboutSpartan";
import Banner from "@/components/mainLayout/Banner";
import Motivation from "@/components/mainLayout/Motivation";
import RecoveryFeature from "@/components/mainLayout/RecoveryFeature";
import Reviews from "@/components/mainLayout/Reviews";
import Subscribe from "@/components/mainLayout/Subscribe";
import Faq from "@/components/structure/FAQ";

export default function Home() {
  return (
    <main
      className="mb-5 pattern-boxes pattern-blue-500 pattern-bg-white 
  pattern-size-6 pattern-opacity-20"
    >
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
