import { GoDotFill } from "react-icons/go";
import UseUserData from "../../hooks/useUserData";
import { BsFillPeopleFill } from "react-icons/bs";
import { formatDate } from "../../utils/functions";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  useLazyGetUserHistoryQuery,
  useLazyGetUserLikesQuery,
  useLazyUsersBlogsQuery,
} from "../../store";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../components/card";

const profileLinks = [
  { url: "/profile", name: "posts" },
  { url: "/profile/history", name: "history" },
  { url: "/profile/liked", name: "liked" },
];

export function Posts() {
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
        <div>loading</div>
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

      {isFetching && <div> Fetching more data...</div>}
    </>
  );
}

export function History() {
  const [getUserHistory, { isFetching, isLoading }] =
    useLazyGetUserHistoryQuery();
  const [pageNumber, setPageNumber] = useState(1);
  const [userHistory, setUserHistory] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await getUserHistory(pageNumber);
        if (res.data) {
          setUserHistory((prevValue) => {
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
        <div>loading</div>
      ) : (
        <InfiniteScroll
          dataLength={userHistory.length}
          next={() => setPageNumber(pageNumber + 1)}
          className="flex flex-wrap gap-8 justify-between sm:px-0 px-4 sm:w-11/12 w-screen mx-auto py-6"
          hasMore={hasMore}
          endMessage={
            <p className="w-screen justify-center flex items-center">
              You have seen it all !
            </p>
          }
        >
          {userHistory.map((history, index) => {
            return (
              <Card
                key={index}
                cardData={history.blogData}
                afterDelete={() =>
                  setUserHistory((prevValue) =>
                    prevValue.filter((b) => b._id != history.blogData._id)
                  )
                }
              />
            );
          })}
        </InfiniteScroll>
      )}

      {isFetching && <div> Fetching more data...</div>}
    </>
  );
}

export function Liked() {
  const [getUserLikes, { isFetching, isLoading }] = useLazyGetUserLikesQuery();
  const [pageNumber, setPageNumber] = useState(1);
  const [userLikes, setUserLikes] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await getUserLikes(pageNumber);
        if (res.data) {
          setUserLikes((prevValue) => {
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
        <div>loading</div>
      ) : (
        <InfiniteScroll
          dataLength={userLikes.length}
          next={() => setPageNumber(pageNumber + 1)}
          className="flex flex-wrap gap-8 justify-between sm:px-0 px-4 sm:w-11/12 w-screen mx-auto py-6"
          hasMore={hasMore}
          endMessage={
            <p className="w-screen justify-center flex items-center">
              You have seen it all !
            </p>
          }
        >
          {userLikes.map((likes, index) => {
            return (
              <Card
                key={index}
                cardData={likes.blogData}
                afterDelete={() =>
                  setUserLikes((prevValue) =>
                    prevValue.filter((b) => b._id != likes.blogData._id)
                  )
                }
              />
            );
          })}
        </InfiniteScroll>
      )}

      {isFetching && <div> Fetching more data...</div>}
    </>
  );
}

function ProfileScreen() {
  const userData = UseUserData();
  const profileLocation = useLocation().pathname;

  return (
    <div className="w-11/12 mx-auto ">
      <div className="flex gap-8 p-6 ml-12 my-6">
        <div className="h-28 w-28 ">
          <img
            className="w-full h-full rounded-full object-cover"
            src={userData.profile_pic}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <div className="flex gap-2 items-center">
            <span>{userData.email} </span> <GoDotFill />
            <span>{userData.blogsWritten}</span>
            <span>blogs</span>
          </div>
          <div className="flex items-center gap-2">
            <BsFillPeopleFill />
            <span>followers</span>
            <span>{userData.totalFollowers}</span>
          </div>
          <div className="text-sm">
            <span>Joined in : </span>
            {userData.createdAt && (
              <span>{formatDate(userData.createdAt)}</span>
            )}
          </div>
        </div>
      </div>
      <nav className="flex gap-8 items-center px-6 ">
        {profileLinks.map((link, index) => {
          return (
            <Link
              to={link.url}
              key={index}
              className={`border-b px-2 capitalize ${
                link.url === profileLocation && "border-black"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
      <hr className="h-[1px] bg-black" />

      <div className="sm:p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileScreen;
