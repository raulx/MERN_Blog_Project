/* eslint-disable react/prop-types */
import Skeleton from "./skeleton";
function CardSkeleton({ times }) {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div
          key={i}
          className="md:w-96 md:h-[48rem] w-full h-96 border-2 rounded-lg shadow-lg"
        >
          <Skeleton className="h-1/2 w-full" />
          <div className="p-2">
            <div className="flex gap-4">
              <Skeleton className="h-8 w-4/5  rounded-2xl" />
              <Skeleton className="h-8 w-14 rounded-full" />
            </div>
            <Skeleton className="mt-4  h-10 " />
            <Skeleton className="mt-4 h-36 " />
            <div className="flex gap-4 mt-6">
              <Skeleton className="h-12 w-14 rounded-2xl" />
              <Skeleton className="h-12 w-4/5 " />
            </div>
          </div>
        </div>
      );
    });
  return <>{boxes}</>;
}
export default CardSkeleton;
