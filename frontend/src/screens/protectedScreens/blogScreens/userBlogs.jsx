import { useUsersBlogsQuery } from "../../../store";
import Card from "../../../components/card";
import CardSkeleton from "../../../components/cardSkeleton";
import { setUserBlogs } from "../../../store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserBlogs() {
  const { data, isLoading, isError } = useUsersBlogsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      dispatch(setUserBlogs(data.data));
    } else if (isError) {
      navigate("/notfound");
    }
  }, [data, dispatch, isError, navigate]);

  let content;

  if (data) {
    content = (
      <>
        {data.data.map((d) => {
          return <Card cardData={d} key={d._id} />;
        })}
      </>
    );
  } else if (isError) {
    content = <div>Error occured</div>;
  } else if (isLoading) {
    content = <CardSkeleton times={5} />;
  }

  return (
    <div className="flex justify-evenly gap-6 flex-wrap my-4 md:my-10">
      {content}
    </div>
  );
}

export default UserBlogs;
