const db = require("../models/index")

const auctions_status = async(req,res)=>{
   try {
    //  const result1 = await db.sequelize.models.auctions_status.create({
    //      status: "completed"
    //  })
     const result2 = await db.sequelize.models.auctions_status.create({
         status: "live"
     })
     const result3 = await db.sequelize.models.auctions_status.create({
         status: "upcoming"
     })
 
     res.json(result2)
   } catch (error) {
    console.log("Error inserting data in auctions status",error);
   }
}

module.exports = {auctions_status}