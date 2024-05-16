const db = require("../models/index");
const { Op } = db.Sequelize;

const query = async(req,res)=>{
    const result = await db.sequelize.models.Users.findAll({
        attributes: ['first_name','last_name'],
            include: [{
                model: db.sequelize.models.auctions,
                required: true,
                attributes: ['id','seller_id','status_id','description','image','title','starting_time','ending_time'],
                where:{
                    status_id: "5"
                },
                include:[{
                    model: db.sequelize.models.products,
                    required: true,
                    attributes: ['id','auction_id'],
                    where:{
                        status: "unsold"
                    },
                    include: [
                        {
                            model: db.sequelize.models.product_images,
                            required: true,
                            attributes: ['product_id','image_url']
                        }
                    ]
                }]
            }]
    })
    res.json(result)
}

module.exports = {query}