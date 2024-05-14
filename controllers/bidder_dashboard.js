const db = require("../models/index")

const bidder_dashboard = async (req, res) => {
    const profileSql = `select * from users where id=?`;
    const live_auction_sql =
      "select * from (select auctions.id as auction_id,auctions.seller_id as sellerId,auctions.status_id as status_id,auctions.description as auction_description,starting_time,ending_time,title,image as auction_image from auctions where  is_deleted = ? and status_id = ? ) as auction inner join (select id,concat(first_name,' ',last_name) as name from users) as users on users.id = auction.sellerId inner join (select id,auction_id from products) as products on products.auction_id = auction.auction_id inner join (select product_id,image_url from product_images) as product_images on products.id = product_images.product_id;";
    const upcoming_auction_sql =
      "select * from (select auctions.id as auction_id,auctions.seller_id as sellerId,auctions.status_id as status_id,auctions.description as auction_description,starting_time,ending_time,title,image as auction_image from auctions where  is_deleted = ? and status_id = ? ) as auction inner join (select id,concat(first_name,' ',last_name) as name from users) as users on users.id = auction.sellerId inner join (select id,auction_id,status from products) as products on products.auction_id = auction.auction_id inner join (select product_id,image_url from product_images) as product_images on products.id = product_images.product_id where products.status = ?";
  
    try {
      const profileData = await getData(profileSql, [id]);
      const auctionProductData = await getData(live_auction_sql, [
        0,
        1
      ]);
      const groupByAuctionDataLive = groupByAuctions(auctionProductData);
      const liveAuctionData = groupByAuctionDataLive.reverse();
  
      const auctionProductData1 = await getData(upcoming_auction_sql, [
        0,
        2,
        "unsold",
      ]);
      const groupByAuctionDataUpcoming = groupByAuctions(auctionProductData1);
      const upcomingAuctionData = groupByAuctionDataUpcoming.reverse();
      res.render("pages/bidder_dashboard.ejs", {
        liveAuctionData,
        upcomingAuctionData,
        data: profileData[0],
        image_path,
      });
    } catch (error) {
      logger.error(error);
      res.render("pages/error_page", { error: error.toString() });
    }
  };

  module.exports = {bidder_dashboard}