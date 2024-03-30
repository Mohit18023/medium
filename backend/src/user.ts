import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import {sign, decode } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET: string;
    }
}>();




userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.SECRET);

    return c.json({
      message: "successfull signup",
      token,
    });
  } catch (e) {
    c.status(403);
    return c.json({
      error: "Error while signing up",
    });
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        error: "User not found",
      });
    }
    if (user.password !== body.password) {
      c.status(403);
      return c.json({
        error: "Invalid password",
      });
    }
    const token = await sign({ id: body.id }, c.env.SECRET);
    return c.json({
      message: "successfull signin",
      token,
    });
  } catch (e) {
    c.status(403);
    return c.json({
      error: "Error while signing in",
    });
  }
});