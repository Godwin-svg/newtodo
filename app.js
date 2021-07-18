const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const date = require(__dirname + "/date.js")

const items = ["fried rice", "Pounded Yam", "Jellof"];
const hobbiesItems = ["Swimming", "Football", "Tennis"];
console.log(items)
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))



app.get("/", (req, res) => {

    const day = date.getDate();

    res.render("list", { currentday: day, newItems: items, mealList: "Menu list" })
});

app.post("/", (req, res) => {
    const item = req.body.newitem;
    if (req.body.list === "Hobbies") {
        hobbiesItems.push(item)
        res.redirect("/work")
    } else {
        items.push(item)
        res.redirect("/");
    }

})

app.get("/work", (req, res) => {

    const day = date.getDate();
    res.render("list", { mealList: "Hobbies List", newItems: hobbiesItems, currentday: day })

});


app.post("/work", (req, res) => {
    item = req.body.newitem;
    hobbiesItems.push(item)
    res.redirect("/work");
})

app.get("/about", (req, res) => {
    res.render("About");
})

const port = 3000;


app.listen(port, () => {
    console.log(`server running on port ${port}`)
});