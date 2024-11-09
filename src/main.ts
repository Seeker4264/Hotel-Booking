import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/", (_req, res) => {
  console.log("Route visited");
  res.send("Home")
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
