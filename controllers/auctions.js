const db = require("../models/index")

const auctions = async(req,res)=>{
    try {
       const result = await db.sequelize.models.auctions.create({
        title: "painting",
        description: "This is an art",
        starting_time: "2024-05-14 04:16:24",
        ending_time: "2024-05-17 04:16:24",
        seller_id: "1",
        status_id: "3",
        created_at: "2024-05-17 04:16:24"
       }) 
    } catch (error) {
        console.log("Error",error);
    }
}

module.exports = {auctions}