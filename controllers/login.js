const db = require("../models/index")

const loginUser = async(req,res)=>{
    res.render("login")
}

module.exports = {loginUser}