import { Hono } from "hono";
import { verify } from "hono/jwt";
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET: string;
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

    await next();
  } catch (e) {
    c.status(403);
    return c.json({ error: "Invalid token" });
  }
});

blogRouter.post("/", (c) => {
  return c.json({
    message: "Blog route",
  });
});
blogRouter.put("/", (c) => {
  return c.json({
    message: "Blog route",
  });
});

blogRouter.get("/", (c) => {
  return c.json({
    message: "Blog id route",
  });
});

blogRouter.get("/bulk", (c) => {
  return c.text("Hello Hono!");
});
