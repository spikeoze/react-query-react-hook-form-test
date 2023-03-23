const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, DELETE, PUT",
  })
);
// GET
app.get("/user", async (req, res) => {
  const users = await prisma.users.findMany({});
  res.status(200).json(users);
});

// GET [id]
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.users.findUnique({
    where: { id: parseInt(id) },
  });

  res.status(200).json(user);
});

// POST
app.post("/user", async (req, res) => {
  const { username, email } = req.body;

  const create = await prisma.users.create({
    data: {
      username,
      email,
    },
  });

  res.status(200).json("user created");
});

// PUT [id]
app.put("/user/:id", async (req, res) => {
  const { username, email } = req.body;
  const { id } = req.params;

  const updateUser = await prisma.users.update({
    where: { id: parseInt(id) },
    data: {
      username,
      email,
    },
  });

  res.status(200).json("user updated");
});

// DELETE [id]
app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  const deleteUser = await prisma.users.delete({
    where: { id: parseInt(id) },
  });

  res.status(200).json("user deleted");
});

// Listener
app.listen(8080, () => {
  console.log(`Serving on port 8080`);
});
