import AppBar from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";

const Blogs = () => {
  return (
    <div>

      <AppBar />
    <div className="flex justify-center flex-cols">

    <div className="max-w-xl">
      <BlogCard
        authorName="John Doe"
        title="My first blog"
        content="Hello world"
        publishedDate="2021-08-01"
        />
      <BlogCard
        authorName="Jane Doe"
        title="My second blog for the day and in context of the first blog"
        content="Hello world is the first program we ever written in c language and in any other language so hello world is the first and most basic program you can write in any language. "
        publishedDate="2021-08-02"
        />
      <BlogCard
        authorName="Jane Doe"
        title="My second blog for the day and in context of the first blog"
        content="Hello world is the first program we ever written in c language and in any other language so hello world is the first and most basic program you can write in any language. "
        publishedDate="2021-08-02"
        />
      <BlogCard
        authorName="Jane Doe"
        title="My second blog for the day and in context of the first blog"
        content="Hello world is the first program we ever written in c language and in any other language so hello world is the first and most basic program you can write in any language. "
        publishedDate="2021-08-02"
        />
      <BlogCard
        authorName="Jane Doe"
        title="My second blog for the day and in context of the first blog"
        content="Hello world is the first program we ever written in c language and in any other language so hello world is the first and most basic program you can write in any language. "
        publishedDate="2021-08-02"
        />
    </div>
    </div>
        </div>
  );
};

export default Blogs;
