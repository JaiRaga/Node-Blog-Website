const express    = require('express'),
      mongoose   = require('mongoose'),
      bodyParser = require('body-parser'),
      app        = express();  

mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})

let Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Lights",
//     image: "https://images.unsplash.com/photo-1552650904-54d0c54b278f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
//     body: "Well lit path."   
// });

app.get("/", (req, res) => {
    res.redirect("/blogs");
})

app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    })
});



app.listen("3000", () => {
    console.log("Blog server is Up!");
})