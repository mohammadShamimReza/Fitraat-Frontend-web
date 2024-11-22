import AboutSpartan from "./AboutSpartan";
import Banner from "./Banner";
import Motivation from "./Motivation";
import RecoveryFeature from "./RecoveryFeature";
import Reviews from "./Reviews";
import Subscribe from "./Subscribe";

export default function MainLayout() {
  return (
    <div>
      <Banner />
      <AboutSpartan />
      <Motivation />
      <RecoveryFeature />
      <Reviews />
      <Subscribe />
    </div>
  );
}
