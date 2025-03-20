import { useSearchParams } from "react-router-dom";
import { formatDate } from "../../utils/functions";
import { BsFillPeopleFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Card from "../../components/card";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  useLazyGetAuthorProfileQuery,
  useLazyGetAuthorBlogsQuery,
  useFollowAuthorMutation,
  useUnfollowAuthorMutation,
} from "../../store";
import UseUserData from "../../hooks/useUserData";

function ProfileBox() {
  const [searchParams] = useSearchParams();

  const authorId = searchParams.get("authorId");

  const [getUserProfile, { isLoading }] = useLazyGetAuthorProfileQuery();
  const [followAuthor] = useFollowAuthorMutation();
  const [unfollowAuthor] = useUnfollowAuthorMutation();

  const { _id: userId } = UseUserData();

  const authorIsUser = authorId === userId;

  const [authorData, setAuthorData] = useState({
    name: "",
    email: "",
    profile_pic: "",
    blogsWritten: 0,
    totalFollowers: 0,
    createdAt: "",
    userFollowing: false,
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getUserProfile(authorId);
        if (res) {
          setAuthorData(res.data.data);
        }
      } catch (error) {
        console.log("error " + error);
      }
    };
    if (authorId) {
      getUser();
    }
  }, [authorId, getUserProfile]);

  const handleFollowAuthor = async () => {
    try {
      const res = await followAuthor(authorId);

      if (res.data) {
        setAuthorData((prevValue) => {
          return {
            ...prevValue,
            totalFollowers: prevValue.totalFollowers + 1,
            userFollowing: true,
          };
        });
      } else {
        console.log(`error : ${res.error}`);
      }
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };

  const handleUnfollowAuthor = async () => {
    try {
      const res = await unfollowAuthor(authorId);
      if (res.data) {
        setAuthorData((prevValue) => {
          return {
            ...prevValue,
            totalFollowers: prevValue.totalFollowers - 1,
            userFollowing: false,
          };
        });
      } else {
        console.log(`error : ${res.error}`);
      }
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className=" w-11/12 mx-auto h-48 flex justify-center items-center text-3xl">
          <FaSpinner className="animate-spin" />
        </div>
      ) : (
        <div className="flex gap-8 p-6 ml-12 my-6">
          <div className="h-28 w-28 ">
            <img
              className="w-full h-full rounded-full object-cover"
              src={authorData?.profile_pic}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">{authorData?.name}</h1>
            <div className="flex gap-2 items-center">
              <span>{authorData?.email} </span> <GoDotFill />
              <span>{authorData?.blogsWritten}</span>
              <span>blogs</span>
            </div>
            <div className="flex items-center gap-2">
              <BsFillPeopleFill />
              <span>followers</span>
              <span>{authorData?.totalFollowers}</span>
            </div>
            <div>
              <span>Joined in : </span>
              {authorData?.createdAt && (
                <span>{formatDate(authorData?.createdAt)}</span>
              )}
            </div>

            {!authorIsUser && (
              <>
                {authorData.userFollowing ? (
                  <button
                    className=" border-2 rounded-full border-gray-300 w-fit px-8 py-1"
                    onClick={handleUnfollowAuthor}
                  >
                    UnFollow
                  </button>
                ) : (
                  <button
                    className=" border-2 border-gray-300 rounded-full w-fit px-8 py-1"
                    onClick={handleFollowAuthor}
                  >
                    Follow
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function BlogPosts() {
  const [getAuthorBlogs, { isFetching, isLoading }] =
    useLazyGetAuthorBlogsQuery();
  const [pageNumber, setPageNumber] = useState(1);
  const [userBlogs, setUserBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams();
  const authorId = searchParams.get("authorId");

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await getAuthorBlogs({ authorId, pageNumber });
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
        <div className=" w-11/12 mx-auto h-48 flex justify-center items-center text-3xl">
          <FaSpinner className="animate-spin" />
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

      {isFetching && <div> Fetching more data...</div>}
    </>
  );
}

function AuthorProfile() {
  return (
    <div className="w-11/12 mx-auto">
      <ProfileBox />
      <span className=" w-1/2 mx-auto">Posts</span>
      <hr className="h-[1px] bg-black" />
      <BlogPosts />
    </div>
  );
}

export default AuthorProfile;
