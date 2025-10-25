import { GiInspiration } from "react-icons/gi";
import { GrInProgress } from "react-icons/gr";
import { MdWorkHistory } from "react-icons/md";
import { TbBuildingCommunity } from "react-icons/tb";

function RecoveryFeature() {
  return (
    <div>
      {" "}
      <div className={`container mx-auto py-2 px-4 `}>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add recovery features here */}
          <div className="bg-white border shadow-lg rounded-lg p-6 flex gap-10">
            <div className="border rounded-xl p-5">
              <GrInProgress color="green" className="h-full w-10 " />
            </div>
            <div className="">
              <h2 className="text-xl font-semibold mb-2">
                Daily Progress Steps
              </h2>
              <p>Track your daily progress steps towards recovery.</p>
            </div>
          </div>
          <div className="bg-white border shadow-lg rounded-lg p-6 flex gap-10">
            <div className="border rounded-xl p-5">
              <GiInspiration color="#F87B1B" className="h-full w-10" />
            </div>{" "}
            <div className="">
              {" "}
              <h2 className="text-xl font-semibold mb-2">Inspiring Content</h2>
              <p>
                Access inspiring videos and articles to motivate you on your
                journey.
              </p>
            </div>
          </div>
          <div className="bg-white border shadow-lg rounded-lg p-6 flex gap-10">
            <div className="border rounded-xl p-5">
              <TbBuildingCommunity className="h-full w-10" />
            </div>{" "}
            <div className="">
              <h2 className="text-xl font-semibold mb-2">Community Support</h2>
              <p>Connect with others in a supportive community environment.</p>
            </div>
          </div>
          <div className="bg-white border shadow-lg rounded-lg p-6 flex gap-10">
            <div className="border rounded-xl p-5">
              <MdWorkHistory color="4E61D3" className="h-full w-10" />
            </div>{" "}
            <div className="">
              {" "}
              <h2 className="text-xl font-semibold mb-2">Expert Guidance</h2>
              <p>
                Get professional support from licensed mental health
                professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecoveryFeature;
