/* eslint-disable react/prop-types */
import { Skeleton } from "@mui/material";

function CardSkeleton({ times }) {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className="w-96 h-96 border-2 rounded-lg">
          <Skeleton variant="rectangular" height="100%" width="100%" />
        </div>
      );
    });
  return <>{boxes}</>;
}
export default CardSkeleton;
