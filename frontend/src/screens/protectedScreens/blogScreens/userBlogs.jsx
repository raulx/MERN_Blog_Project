import { useUsersBlogsQuery } from "../../../store";
import Card from "../../../components/card";
import CardSkeleton from "../../../components/cardSkeleton";
import { setUserBlogs } from "../../../store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function UserBlogs() {
  const { id } = JSON.parse(localStorage.getItem("user"));
  const { data, isFetching } = useUsersBlogsQuery(id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUserBlogs(data));
    }
  }, [data, dispatch]);
  return (
    <div className="flex justify-evenly gap-6 flex-wrap my-20 overflow-y-scroll">
      {isFetching ? (
        <CardSkeleton times={5} />
      ) : (
        <>
          {data.map((d) => {
            return <Card cardData={d} key={d.id} />;
          })}
        </>
      )}
    </div>
  );
}

export default UserBlogs;
