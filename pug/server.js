const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const Contenedor = require("./contenedor");
const contenedor = new Contenedor();

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("form.pug");
});

app.post("/productos", async (req, res) => {
  const { body } = req;
  await contenedor.save(body);
  res.json("Producto cargado con exito!");
});

app.get("/productos", async (req, res) => {
  const todos = await contenedor.getAll();
  res.render("productos.pug", { todos, productsExist: true });
});
