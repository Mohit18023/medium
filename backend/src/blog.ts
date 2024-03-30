import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/api/v1/blog/*", async (c, next) => {
  // get the header
  // verify the header
  // if the header is not present return 403
  // if the header is present verify the token
  // if the token is invalid return 403
  // if the token is valid continue with the request
  try {
    const header = c.req.header("Authorization");
    if (!header) {
      c.status(403);
      return c.json({ error: "Authorization header not found" });
    }
    const token = header.split(" ")[1];
    const response = await verify(token, c.env.SECRET);

    if (!response.id) {
      c.status(403);
      return c.json({ error: "Invalid token" });
    }
    c.set("userId", response.id);
    await next();
  } catch (e) {
    c.status(403);
    return c.json({ message: "You are not logged in" });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });

  return c.json({
    message: "Blog created successfully",
    blog,
  });
});

// update the blog's title and description
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    message: "Blog updated successfully",
    blog,
  });
});

// get the blog by id
blogRouter.get("/", async (c) => {
  const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.post.findUnique({
        where: {
            id: body.id,
        },
    });
    return c.json({
        blog,
    });
    }
    catch(e){
        c.status(411);
        return c.json({
            error: "Error while fetching blog"
        });
    
    }
});

// get all the blogs ---- add pagination
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany();
    return c.json({
        blogs,
    });
});
