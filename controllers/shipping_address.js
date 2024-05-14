const db = require("../models/index")

const shipping_address = async(req,res)=>{
    try {
        const result = await db.sequelize.models.shipping_address.create({
            user_id:"1",
            address1: "juhapura",
            city: "Ahd",
            state: "Guj",
            country: "India",
            pincode: "123456",
        })
        res.json(result)
        
    } catch (error) {
        console.log("Error while inserting shipping address", error);
    }
}

module.exports = {shipping_address}