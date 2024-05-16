const { Op } = require("sequelize");
const db = require("../models/index")

const bidder_dashboard = async (req, res) => {
    const profileData = await db.sequelize.models.Users.findAll({
      where: {
        id:2
      }
    })
    const live_auction_sql =
     await db.sequelize.models.Users.findAll({
      attributes: ['first_name','last_name'],
          include: [{
              model: db.sequelize.models.auctions,
              required: true,
              attributes: ['id','seller_id','status_id','description','image','title','starting_time','ending_time'],
              where:{
                  status_id: "1"
              },
              include:[{
                  model: db.sequelize.models.products,
                  required: true,
                  attributes: ['id','auction_id'],
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
  // res.json(result)
  
    const upcoming_auction_sql =
      // "select * from (select auctions.id as auction_id,auctions.seller_id as sellerId,auctions.status_id as status_id,auctions.description as auction_description,starting_time,ending_time,title,image as auction_image from auctions where  is_deleted = ? and status_id = ? ) as auction inner join (select id,concat(first_name,' ',last_name) as name from users) as users on users.id = auction.sellerId inner join (select id,auction_id,status from products) as products on products.auction_id = auction.auction_id inner join (select product_id,image_url from product_images) as product_images on products.id = product_images.product_id where products.status = ?";
      await db.sequelize.models.Users.findAll({
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
    try {
      // const profileData = await getData(profileSql, [id]);
      // const auctionProductData = await getData(live_auction_sql, [
      //   0,
      //   1
      // ]);

      const groupByAuctions = (products) => {
        return Object.values(
          products.reduce((acc, item) => {
            if (!acc[item.auction_id]) {
              acc[item.auction_id] = {
                id: item.auction_id,
                title: item.title,
                status: item.status_id,
                name: item.name,
                description: item.auction_description,
                starting_time: item.starting_time,
                ending_time: item.ending_time,
                image: item.auction_image,
                images: [],
              };
            }
            if (item.image_url) {
              acc[item.auction_id].images = [...new Set([...acc[item.auction_id].images, item.image_url])];
            }
            return acc;
          }, {})
        );
      };
      const groupByAuctionDataLive = groupByAuctions(live_auction_sql);
      const liveAuctionData = groupByAuctionDataLive.reverse();
  
      // const auctionProductData1 = await getData(upcoming_auction_sql, [
      //   0,
      //   2,
      //   "unsold",
      // ]);
      const groupByAuctionDataUpcoming = groupByAuctions(upcoming_auction_sql);
      const upcomingAuctionData = groupByAuctionDataUpcoming.reverse();
      res.render("dashboard.ejs", {
        liveAuctionData,
        upcomingAuctionData,
        data: profileData[0],
        image_path,
      });
    } catch (error) {
      logger.error(error);
      res.json("Error", error)
    }
  };

  module.exports = {bidder_dashboard}