import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput,signupInput } from "@mohit1823/medium-common";
export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET: string;
    }
}>()


userRouter.post("/signup", async (c) => {
  try {
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ message: "Invalid Input" });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const check = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (check) {
      c.status(409);
      return c.json({ message: "User Already Exist" });
    }
    const newuser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({ id: newuser.id }, c.env.SECRET);
    return c.json({ message: "User Signed UP", token });
  } catch (e) {
    c.status(403);
    return c.json({
      message: "Error signing up user",
    });
  }
});


userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid Input" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(404);
      return c.json({ message: "User not found" });
    }

    const token = await sign({ id: user.id }, c.env.SECRET);
    return c.json({ message: "User Logged In", token });
  } catch (e) {
    c.status(403);
    return c.json({ message: "Error logging in" });
  }
});