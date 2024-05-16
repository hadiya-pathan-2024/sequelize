const express = require('express');
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
  extended: false
}));
const {addUser} = require("./controllers/registration")
const {shipping_address} = require("./controllers/shipping_address")
const {auctions_status} = require("./controllers/auctions_status")
const {auctions} = require("./controllers/auctions")
const {loginUser} = require("./controllers/login")
const {query} = require("./controllers/test")
app.get('/', (req, res) => {
  console.log('API is running');
})
app.get("/register", (req,res)=>{
  res.render("registration")
})
app.post("/addUser", addUser)
app.get("/address" , shipping_address)
app.get("/auctions_status" , auctions_status)
app.get("/auctions", auctions)
app.get("/dashboard", (req,res)=>{
  res.render("dashboard");
})

app.get("/query" , query)

app.get("/login" , loginUser)
app.listen(3000, (req, res) => {
  console.log('server started');
})