import AppBar from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
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
       <div>
         <AppBar />
         <div className="flex justify-center">
           <div>
             <BlogSkeleton />
             <BlogSkeleton />
             <BlogSkeleton />
             <BlogSkeleton />
             <BlogSkeleton />
           </div>
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
