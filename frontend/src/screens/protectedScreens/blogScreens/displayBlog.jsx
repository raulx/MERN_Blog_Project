/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetUserQuery } from "../../../store";
import { useLazyBlogDataQuery } from "../../../store";
import { useEffect, useState } from "react";

function DisplayBlog() {
  const { blogs, user } = useSelector((state) => {
    return state;
  });

  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blog");
  const { data: authorData, isFetching } = useGetUserQuery(id);
  const [fetchBlogData] = useLazyBlogDataQuery();

  useEffect(() => {
    const getBlog = async () => {
      let selectedBlog =
        blogs.blogs.find((blog) => blog.id === blogId) ||
        user.blogs.find((blog) => blog.id === blogId);

      if (!selectedBlog) {
        const res = await fetchBlogData(blogId);
        selectedBlog = res.data[0];
      }
      setBlogData(selectedBlog);
    };
    getBlog();
  }, []);

  return (
    <div className="overflow-y-scroll">
      <>
        {blogData ? (
          <>
            <div>
              <img src={blogData.image.remote_url} />
              <p>{blogData.title}</p>
              <p>{blogData.content}</p>
            </div>
            {isFetching ? null : (
              <div>
                <p>{authorData.name}</p>
                <img src={authorData.profilePic} />
              </div>
            )}
          </>
        ) : (
          <p>Fetching Data</p>
        )}
      </>
    </div>
  );
}

export default DisplayBlog;
