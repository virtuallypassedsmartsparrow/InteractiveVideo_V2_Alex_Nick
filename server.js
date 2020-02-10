const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");


const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require("./controllers/html-routes")(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("server started on port", PORT);
});