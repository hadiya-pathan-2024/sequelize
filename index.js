const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
const {addUser} = require("./controllers/users")


app.get('/', (req, res) => {
  console.log('API is running');
})

app.get("/addUser", addUser)

app.listen(3000, (req, res) => {
  console.log('server started');
})