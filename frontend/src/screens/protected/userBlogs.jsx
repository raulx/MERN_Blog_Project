import { useLazyUsersBlogsQuery } from "../../store";
import Card from "../../components/card";
import CardSkeleton from "../../components/cardSkeleton";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSpinner } from "react-icons/fa";

function UserBlogs() {
  const [getUserBlogs, { isFetching, isLoading }] = useLazyUsersBlogsQuery();
  const [pageNumber, setPageNumber] = useState(1);
  const [userBlogs, setUserBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await getUserBlogs(pageNumber);
        if (res.data) {
          setUserBlogs((prevValue) => {
            return [...prevValue, ...res.data.data];
          });
        }
        if (res.data.data.length === 0) setHasMore(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <>
      {isLoading ? (
        <div className="sm:w-11/12 w-screen mx-auto flex flex-wrap gap-8 justify-between p-4">
          <CardSkeleton times={10} />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={userBlogs.length}
          next={() => setPageNumber(pageNumber + 1)}
          className="flex flex-wrap gap-8 justify-between sm:px-0 px-4 sm:w-11/12 w-screen mx-auto py-6"
          hasMore={hasMore}
          endMessage={
            <p className="w-screen justify-center flex items-center">
              You have seen it all !
            </p>
          }
        >
          {userBlogs.map((blog, index) => {
            return (
              <Card
                key={index}
                cardData={blog}
                afterDelete={() =>
                  setUserBlogs((prevValue) =>
                    prevValue.filter((b) => b._id != blog._id)
                  )
                }
              />
            );
          })}
        </InfiniteScroll>
      )}

      {isFetching && (
        <div className="sm:w-11/12 w-screen flex justify-center items-center py-2">
          <FaSpinner className="animate-spin" />
        </div>
      )}
    </>
  );
}

export default UserBlogs;
