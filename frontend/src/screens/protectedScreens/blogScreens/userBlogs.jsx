import { useUsersBlogsQuery } from "../../../store";
import Card from "../../../components/card";
import CardSkeleton from "../../../components/cardSkeleton";
function UserBlogs() {
  const { id } = JSON.parse(localStorage.getItem("user"));
  const { data, isFetching } = useUsersBlogsQuery(id);
  console.log(data);
  return (
    <div className="flex justify-evenly gap-6 flex-wrap my-20">
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
