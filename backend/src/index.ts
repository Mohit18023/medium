import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
}>();


// middleware to verify token
app.use('/api/v1/blog/*',async(c,next)=>{
  // get the header
  // verify the header
  // if the header is not present return 403
  // if the header is present verify the token
  // if the token is invalid return 403
  // if the token is valid continue with the request
  try{
    const header = c.req.header("Authorization");
    if(!header){
      c.status(403);
      return c.json({error:"Authorization header not found"})
    }
    const token = header.split(" ")[1];
    const response = await verify(token,c.env.SECRET);

    if(!response.id){
      c.status(403);
      return c.json({error:"Invalid token"})
    }
    
    await next();
  }
  catch(e){
    c.status(403);
    return c.json({error:"Invalid token"})
  }
})


app.post("/api/v1/signup", async (c) => {
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

app.post("/api/v1/signin", async (c) => {
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
app.post("/api/v1/blog", (c) => {
  return c.json({
    message: "Blog route",
  });
});

app.get("/api/v1/blog:id", (c) => {
  return c.json({
    message: "Blog id route",
  });
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
