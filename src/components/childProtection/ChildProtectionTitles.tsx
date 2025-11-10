import { ChildProtectionItem } from "@/types/contantType";

interface Props {
  titles: any[];
  userDay: number | undefined;
  currentDay: string;
}

export default function ChildProtectionTitles({
  titles,
  userDay = 1,
  currentDay,
}: Props) {
  return (
    <div className="border rounded-lg bg-white shadow p-3 mt-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        All Child Protection Titles
      </h3>
      <div className="max-h-64 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
        {titles.map((item: ChildProtectionItem) => {
          const isCompleted = item.numberCount < userDay;
          const isCurrent = item.numberCount.toString() === currentDay;

          return (
            <div
              key={item.id}
              className={`flex justify-between items-center border p-3 rounded-lg hover:bg-gray-200 transition-all duration-200
                ${isCompleted ? "bg-green-100" : ""}
                ${isCurrent ? "bg-gray-100 border-blue-200" : ""}
              `}
            >
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-800">
                  {item.numberCount}. {item.title}
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  isCompleted
                    ? "bg-green-500 border-green-700"
                    : "border-gray-300"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
