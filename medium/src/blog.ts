import { Hono } from "hono";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
}>();




blogRouter.post("/", (c) => {
  return c.json({ message: "Blog Created" });
});
blogRouter.put("/", (c) => {
  return c.json({ message: "Blog Updated" });
});

blogRouter.get("/blog", (c) => {
  return c.json({ message: "Blog List" });
});
blogRouter.get("/bulk", (c) => {
  return c.json({ message: "all Blog" });
});