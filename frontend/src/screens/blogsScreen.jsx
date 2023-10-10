import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetBlogsQuery } from "../store/api/blogApi";
import { addBlog, addPage } from "../store";
import { useEffect } from "react";
import Card from "../components/card";
import CardSkeleton from "../components/cardSkeleton";

function Blogs() {
  const { blogs, currentPage, pageSize } = useSelector((state) => {
    return state.blogs;
  });
  const { data, isFetching } = useGetBlogsQuery({
    page: currentPage,
    pageSize: pageSize,
  });
  const dispatch = useDispatch();
  const { type } = useParams();

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(addBlog(data));
    }
  }, [data, dispatch]);

  const handleAddMoreData = () => {
    dispatch(addPage());
  };

  let blogData = blogs;

  if (type != "all") {
    blogData = blogData.filter((blog) => {
      return blog.category === type;
    });
  }

  return (
    <>
      <div className="p-4 flex flex-wrap w-full gap-4 h-full justify-center ">
        {blogData.map((blog) => {
          return <Card key={blog.id} cardData={blog} />;
        })}
        {type === "all" ? (
          <>
            {isFetching ? (
              <CardSkeleton times={pageSize} />
            ) : (
              <button onClick={handleAddMoreData}>Add more Data</button>
            )}
          </>
        ) : null}
      </div>
    </>
  );
}

export default Blogs;
