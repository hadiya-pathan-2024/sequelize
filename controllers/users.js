
const db = require("../models/index")
const addUser = async(req,res)=>{
    try {
        console.log("try going",db.sequelize);
        const result = await db.sequelize.models.Users.create( 
       { 
        first_name: "hadiya",
        last_name: "pathan",
        role: "seller",
        email: "hadiyapathan@gmail.com",
        dob: "2001-07-10",
        gender: "female",
        activation_status: "1",
        password: "something",
        profile_pic: "",
        created_at: "2024-05-03 09:27:08",

    }
        )
        res.json(result)
    } catch (error) {
        console.log("catch going",error);
        res.send(error)
    }
}

module.exports = {addUser}