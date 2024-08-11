const express = require("express");
const app = express();
const path = require("path");
const model = require("./models/model.js");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  const student = await model.find();
  res.render("index", { student });
});

app.get("/newForm", (req, res) => {
  res.render("newForm");
});

app.post("/new", async (req, res) => {
  const { name, class: className, faculty, address } = req.body;
  model.create({
    name,
    class: className,
    faculty,
    address,
  });
  res.redirect("/");
});

app.post("/edit/:id", async (req, res) => {
  let { id } = req.params;
  const student = await model.findById(id);
  res.render("edit.ejs", { student });
});

app.patch("/edit/:id", async (req, res) => {
  const { name, class: grade, faculty, address } = req.body;
  let { id } = req.params;
  await model.findByIdAndUpdate(id, {
    name,
    class: grade,
    faculty,
    address,
  });
  res.redirect("/");
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await model.findByIdAndDelete(id);
  res.redirect("/");
});

app.listen(5000);
