import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput,updateBlogInput } from "@mohit1823/medium-common";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
  Variables: {
    userId: Number;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const header = await c.req.header("Authorization");
    if (!header) {
      c.status(401);
      return c.json({ message: "Unauthorized" });
    }
    //const token = header.split(" ")[1];
    const payload = await verify(header, c.env.SECRET);
    if (payload) {
      c.set("userId", payload.id);
      await next();
    } else {
        c.status(403);
      return c.json({ message: "You are not logged in" });
    }
  } catch (e) {
    c.status(500);
    return c.json({ message: "Internal Server Error" });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authorId = c.get("userId");
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid Input" });
  }
  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId),
    },
  });
  return c.json({ message: "Blog Created", id: blog.id });
});
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid Input" });
  }
  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({ message: "Blog Updated" });
});

// add pagination to the blog route
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      take: 10,
      orderBy: {
        id: "asc",
      },
      select:{
        content:true,
        title:true,
        id:true,
        //publishDate:true,
        author: {
          select: {
            name: true,
          },
        }
      }
    });
    return c.json({ message: "Blogs", blogs });
  } catch (e) {
    c.status(500);
    return c.json({ message: "Error fetching blogs" });
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
      select:{
        content:true,
        title:true,
        id:true,
        //publishDate:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
    return c.json({ message: "Blog", blog });
  } catch (e) {
    c.status(500);
    return c.json({ message: "Error fetching blog" });
  }
});

