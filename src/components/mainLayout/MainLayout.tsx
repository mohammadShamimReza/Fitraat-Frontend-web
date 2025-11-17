import MembershipCard from "@/app/proMember/page";
import Faq from "../structure/FAQ";
import Reviews from "./Reviews";
import Subscribe from "./Subscribe";

export default function MainLayout() {
  return (
    <div className="py-16 px-6">
      <Reviews />
      <MembershipCard />
      <Subscribe />
      <Faq />
    </div>
  );
}
