import AppBar from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

interface Blog {
  id: number;
  author : {
    name: string;
  }
  title: string;
  content: string;
}

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div className="flex justify-center p-20">
        <div role="status" className="max-w-sm animate-pulse mb-12">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <AppBar />
      <div className="flex justify-center flex-cols">
        <div >
          {blogs.map((blog : Blog) => (
            <BlogCard key={blog.id} id={blog.id} authorName={blog.author.name || "name"} title={blog.title} content={blog.content} publishedDate="02-02-2003" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
