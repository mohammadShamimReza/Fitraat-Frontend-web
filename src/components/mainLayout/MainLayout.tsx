import MembershipCard from "@/app/proMember/page";
import Reviews from "./Reviews";
import Subscribe from "./Subscribe";

export default function MainLayout() {
  return (
    <div>
      <Reviews />
      <MembershipCard />
      <Subscribe />
    </div>
  );
}
