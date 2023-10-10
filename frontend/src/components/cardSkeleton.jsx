/* eslint-disable react/prop-types */
import { Skeleton } from "@mui/material";

function CardSkeleton({ times }) {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className="w-96 h-96 border-2 rounded-lg">
          <Skeleton variant="rectangular" height="60%" width="100%" />
          <Skeleton variant="text" className=" ml-2 mr-24" />
          <Skeleton variant="text" className=" ml-2 mr-4" />
          <Skeleton variant="text" className=" ml-2 mr-4" />
          <Skeleton variant="text" className=" ml-2 mr-4" />
          <Skeleton variant="text" className=" ml-2 mr-28" />
        </div>
      );
    });
  return <>{boxes}</>;
}
export default CardSkeleton;
