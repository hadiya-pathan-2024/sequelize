const db = require("../models/index");
const { Op } = require("sequelize")

const query = async(req,res)=>{
    // const result = await db.sequelize.models.Users.findAll({
    //     attributes: ['first_name','last_name'],
    //         include: [{
    //             model: db.sequelize.models.auctions,
    //             required: true,
    //             attributes: ['id','seller_id','status_id','description','image','title','starting_time','ending_time'],
    //             where:{
    //                 status_id: "5"
    //             },
    //             include:[{
    //                 model: db.sequelize.models.products,
    //                 required: true,
    //                 attributes: ['id','auction_id'],
    //                 where:{
    //                     status: "unsold"
    //                 },
    //                 include: [
    //                     {
    //                         model: db.sequelize.models.product_images,
    //                         required: true,
    //                         attributes: ['product_id','image_url']
    //                     }
    //                 ]
    //             }]
    //         }]
    // })
    // "select auctions.id as auction_id,auctions.status_id as status_id,auctions.description as auction_description,starting_time,ending_time,starting_price,winning_bid,title,image as auction_image,image_url from products inner join auctions on products.auction_id = auctions.id inner join product_images on products.id = product_images.product_id where products.status = 'unsold' AND auctions.id=? ";

    // const querySearchAuctions = await db.sequelize.models.auctions.findAll({
    //     attributes: ['id','status_id','description','starting_time','ending_time','title','image'],
    //     include: [{
    //         model: db.sequelize.models.products,
    //         required: true,
    //         attributes: ['starting_price','winning_bid'],
    //         where: {
    //             status: "unsold"
    //         },
    //         include: [{
    //             model: db.sequelize.models.product_images,
    //             required: true,
    //             attributes: ['image_url']
    //         }]
    //     }]
    // })

    // `select b.id,b.auction_id,b.product_id,b.bidder_id,b.bid_amount from bids as b join (select product_id,max(bid_amount) as max_bid_amount from bids group by product_id) max_bids on b.product_id = max_bids.product_id and b.bid_amount = max_bids.max_bid_amount where b.auction_id = ?`;

    // const maxBids = await db.sequelize.models.bids.findAll({
    //     attributes: ['product_id',
    //     db.sequelize.fn('max', db.sequelize.col('bid_amount')),
    // ],
    //     group: 'product_id'
    // })
    // `SELECT products.id,products.product_name,products.description,products.status,categories.category FROM products left join categories ON products.category_id = categories.id where products.id IN(${productIds})`;

    // const get_selected_auction_products = await db.sequelize.models.products.findAll({
    //     attributes: ['id','product_name','description','status'],
    //     include:[
    //         {
    //             model: db.sequelize.models.categories,
    //             attributes: ['category']
    //         }
    //     ]
    // })
    // `select auctions.title,Users.first_name from orders inner join Users on orders.buyer_id = Users.id inner join auctions on orders.auction_id = auctions.id  where auctions.seller_id = 3 ORDER BY orders.created_at DESC;`
    // const ordersSql = await db.sequelize.models.Users.findAll({
    //     attributes: ['first_name'],
    //     required: true,
    //     include: [{
    //         model: db.sequelize.models.auctions,
    //         attributes: ['title'],
    //         required: true,
    //         where: {
    //             seller_id: "3"
    //         },
    //         include: [{
    //             model: db.sequelize.models.orders,
    //             required: true,
    //             attributes: ['auction_id'],
    //             order:[
    //                 db.sequelize.fn('created_at','DESC')
    //             ]
    //         }]
    //     }],
    // })


        const result = await db.sequelize.models.Users.findAll({
                where:{
                    first_name: {
                        [Op.like]: 'hadiya%'
                    },
                    last_name: {
                        [Op.like]: 'pathan%'
                    }
                }
        })
    

    res.json(result)
}

module.exports = {query}