const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const Contenedor = require("./contenedor");
const contenedor = new Contenedor();
const { engine } = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});

app.use("/public", express.static(__dirname + "/public"));

app.set("view engine", "hbs");
app.set("views", "./views");
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

app.get("/", (req, res) => {
  res.render("form");
});

app.post("/productos", async (req, res) => {
  const { body } = req;
  await contenedor.save(body);
  res.json("Producto cargado con exito!");
});

app.get("/productos", async (req, res) => {
  const todos = await contenedor.getAll();
  res.render("productos", { todos, productsExist: true });
});
