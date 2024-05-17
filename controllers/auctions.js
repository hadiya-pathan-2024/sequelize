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


// const logger = require("./logger.js");
// const db = require("../config/connection.js");
// const { isoToDateTimeLocal } = require("../common/isotodatetime.js");
// const cron = require("node-cron");
// const { resolve } = require("path");
// const { getData, groupByAuctions } = require("../common");
// let cronJobs=[
  
// ];


// let socket;
// let io;

// async function intializeSocket(socket1, io1) {

//   socket = socket1;
//   io = io1;
// }
// const configureBothJob=async(auctionStartTime,auctionEndTime,auction_id,seller_id)=>{
  
//   let startjob;
//   auctionStartTime=new Date(auctionStartTime);
//   auctionEndTime=new Date(auctionEndTime);
//   await new Promise((resolve, reject) => {
//     startjob = cron.schedule(
//       `* ${auctionStartTime.getMinutes()} ${auctionStartTime.getHours()} ${auctionStartTime.getDate()} ${
//         auctionStartTime.getMonth() + 1
//       } *`,
//       () => {
//         updateStartStatusOfAuction(auction_id, seller_id);
//         resolve();
//       }
//     );
//     cronJobs.forEach((auction)=>{
//       if(auction.auctionId=auction_id){
//         auction["startJob"]=startjob;
//       }
//      })
//   });
 
//   startjob.stop();

//   let endjob;
//   auctionEndTime=new Date(auctionEndTime);
//     await new Promise((resolve, reject) => {
//       endjob = cron.schedule(
//         `* ${auctionEndTime.getMinutes()} ${auctionEndTime.getHours()} ${auctionEndTime.getDate()} ${
//           auctionEndTime.getMonth() + 1
//         } *`,
//         async() => {
//          updateEndStatusAuction(auction_id,seller_id)
//           resolve();
//         }
//       );
//      cronJobs.forEach((auction)=>{
//       if(auction.auctionId=auction_id){
//         auction["endJob"]=endjob;
//       }
//      })
//     });
//     endjob.stop();


// };
// const configureEndJob=async(auctionEndTime,auction_id,seller_id)=>{
  
//   let endjob;
// auctionEndTime=new Date(auctionEndTime);
//   await new Promise((resolve, reject) => {
//     endjob = cron.schedule(
//       `* ${auctionEndTime.getMinutes()} ${auctionEndTime.getHours()} ${auctionEndTime.getDate()} ${
//         auctionEndTime.getMonth() + 1
//       } *`,
//       async() => {
//        updateEndStatusAuction(auction_id,seller_id)
//         resolve();
//       }
//     );
//    cronJobs.forEach((auction)=>{
//     if(auction.auctionId=auction_id){
//       auction["endJob"]=endjob;
//     }
//    })
//   });
//   endjob.stop();
 
  
// }
// async function showBidderUpcomingLive(auction_id) {
//   let searchquery =
    // "select auctions.id as auction_id,auctions.status_id as status_id,auctions.description as auction_description,starting_time,ending_time,starting_price,winning_bid,title,image as auction_image,image_url from products inner join auctions on products.auction_id = auctions.id inner join product_images on products.id = product_images.product_id where products.status = 'unsold' AND auctions.id=? ";
    // await db.sequelize.models.auctions.findAll({
    //     attributes: ['id','status_id','description','starting_time','ending_time','title','image'],
    //     include: [{
    //         model: db.sequelize.models.products,
    //         required: true,
    //         attributes: ['starting_price','winning_bid'],
                // where: {
                //     status: "unsold"
                // },
    //         include: [{
    //             model: db.sequelize.models.product_images,
    //             required: true,
    //             attributes: ['image_url']
    //         }]
    //     }]
    // })
//   let [result] = await db.query(searchquery, [auction_id]);
//   let groupByAuctionData = groupByAuctions(result);
//   io.emit("addUpcomingCard", groupByAuctionData);
// }
// const updateStartStatusOfAuction=async(auction_id, seller_id)=>{
//     try{
//         let query="UPDATE auctions SET status_id=? WHERE id=?";
//         await db.query(query,[1,auction_id]);

//         let searchquery = await db.sequelize.models.auctions.findAll({
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


//         let [result] = await db.query(searchquery, [auction_id]);
//         let groupByAuctionData = groupByAuctions(result);

//         io.emit("removeUpcomingCard",auction_id);
//         io.emit("liveauctioncard",groupByAuctionData);
        
//         // emmiting socket using seller id
//         io.emit(`toseller${seller_id}addauction`,groupByAuctionData);

//         io.emit(`toseller${seller_id}`,groupByAuctionData);
//         io.emit(`toseller${seller_id}removeupcomming`,auction_id);
//     }
//     catch (error) {
//         logger.error(error)
//     }

// }
// const updateEndStatusAuction = async (auction_id, seller_id) => {
//   try {
//     let query = "UPDATE auctions SET status_id=? WHERE id=?";
//     await db.query(query, [0, auction_id]);

//     let sql = `select b.id,b.auction_id,b.product_id,b.bidder_id,b.bid_amount from bids as b join (select product_id,max(bid_amount) as max_bid_amount from bids group by product_id) max_bids on b.product_id = max_bids.product_id and b.bid_amount = max_bids.max_bid_amount where b.auction_id = ?`;
        // await db.sequelize.models.bids.findAll({
        //     attributes: ['product_id',
        //     db.sequelize.fn('max', db.sequelize.col('bid_amount')),
        // ],
        // group: 'product_id'
        // })
//     let winnerData = await getData(sql, [auction_id]);
//     winnerData.map(async (bid) => {
//       let sql = `UPDATE products set winning_bid = ${bid.id} where id = ${bid.product_id} and auction_id = ${bid.auction_id}`;
//       await db.query(sql);
//     });

//     io.emit("removeliveauctioncard", auction_id);

//     //query area for getting completed auction data
//     let searchquery = "select auctions.id as auction_id,auctions.status_id as status_id,auctions.description as auction_description,starting_time,ending_time,starting_price,winning_bid,title,image as auction_image,image_url from products inner join auctions on products.auction_id = auctions.id inner join product_images on products.id = product_images.product_id where products.status = 'unsold' AND auctions.id=?";
//     let [result] = await db.query(searchquery, [auction_id]);
//     let groupByAuctionData = groupByAuctions(result);

//     // emmiting socket using seller id
//     io.emit(`toseller${seller_id}removeauction`, auction_id);
//     io.emit(`toseller${seller_id}addcompleted`,groupByAuctionData); 
//   } catch (error) {
//     logger.error(error);
//   }
// };

// const startAuction = async (auction_id, seller_id) => {
//   let query = "SELECT starting_time,ending_time from auctions where id=?";
//   let [result] = await db.query(query, [auction_id]);
//   let auctionStartTime = result[0].starting_time;
//   let auctionEndTime = result[0].ending_time;
//   let date = new Date();
//   let offset = date.getTimezoneOffset();
//   let starttime = new Date(auctionStartTime).getTime();
//   starttime = starttime - offset * 60 * 1000;
//   starttime = new Date(starttime);

//   let endtime = new Date(auctionEndTime).getTime();
//   endtime = endtime - offset * 60 * 1000;
//   endtime = new Date(endtime);

//   auctionStartTime = new Date(starttime).toLocaleString();
//   auctionEndTime = new Date(endtime).toLocaleString();

//   auctionStartTime = new Date(auctionStartTime);
//   auctionEndTime = new Date(auctionEndTime);

//   auctionStartTime = new Date(starttime).toLocaleString();
//   auctionEndTime = new Date(endtime).toLocaleString();
//   auctionStartTime = new Date(auctionStartTime);
//   auctionEndTime = new Date(auctionEndTime);
//   let cronJob={
//     auctionId:auction_id   
//   };

//   cronJobs.push(cronJob);
//   setStartJob(auctionStartTime,auction_id, seller_id);
//   setEndJob(auctionEndTime, auction_id, seller_id);
// };

// async function setStartJob(auctionStartTime, auction_id, seller_id){
//   let startjob;
//   await new Promise((resolve, reject) => {
//     startjob = cron.schedule(
//       `* ${auctionStartTime.getMinutes()} ${auctionStartTime.getHours()} ${auctionStartTime.getDate()} ${
//         auctionStartTime.getMonth() + 1
//       } *`,
//       () => {
//         updateStartStatusOfAuction(auction_id, seller_id);
//         resolve();
//       }
//     );

//     cronJobs.forEach(item => {
//       if(item.auctionId == auction_id){
//         item["startJob"]=startjob;
        
//       }
//     })

//   });
//   startjob.stop();
// }

// async function setEndJob(auctionEndTime, auction_id, seller_id){
//   let endjob;
//   await new Promise((resolve, reject) => {
//     endjob = cron.schedule(
//       `* ${auctionEndTime.getMinutes()} ${auctionEndTime.getHours()} ${auctionEndTime.getDate()} ${
//         auctionEndTime.getMonth() + 1
//       } *`,
//       () => {
//         updateEndStatusAuction(auction_id, seller_id);
//         resolve();
//       }
//     );
//     cronJobs.forEach(item => {
//       if(item.auctionId == auction_id){
//         item["endJob"]=endjob;
   
//       }
//     })
    
//   });
  
//   endjob.stop();
  
// }

// const get_add_auction = (req, res) => {
//   try {
//     let seller_id = req.user[0][0].id;
//     res.render("pages/add_auctions", { id: seller_id });
//   } catch (error) {
//     logger.error(error);
//     res.render("pages/error_page", { error: error.toString() });
//   }
// };

// const post_add_auctions = async (req, res) => {
//   try {
//     let seller_id = req.user[0][0].id;
//     let {
//       title,
//       description,
//       start_time,
//       end_time,
//       stratingPrice,
//       priceInterval,
//       reservePrice,
//       productId,
//     } = req.body;
//     let auction_img = req.file.filename;
//     let status = 2; //here 2 indicates upcoming
//     let query =
//       "INSERT INTO auctions (title,description,image,starting_time,ending_time,seller_id,status_id) VALUES (?,?,?,convert_tz(?,@@session.time_zone,'+00:00'),convert_tz(?,@@session.time_zone,'+00:00'),?,?)";
//     let result = await db.query(query, [
//       title,
//       description,
//       auction_img,
//       start_time,
//       end_time,
//       seller_id,
//       status,
//     ]);
//     let auction_id = result[0].insertId;

//     //    here we are doing insertion in products table
//     let product_insert_query =
//       "UPDATE products SET auction_id=?,starting_price=?,bid_price_interval=?,reserved_price=? WHERE id=?";
//     for (let i = 0; i < productId.length; i++) {
//       let products_values = [
//         auction_id,
//         stratingPrice[i],
//         priceInterval[i],
//         reservePrice[i],
//         productId[i],
//       ];
//       let result = await db.query(product_insert_query, products_values);
//     }
//     showBidderUpcomingLive(auction_id);
//     startAuction(auction_id, seller_id);

//     return res.redirect("/seller/dashboard");
//   } catch (error) {
//     logger.error(error);
//     res.render("pages/error_page", { error: error.toString() });
//   }
// };

// const get_selected_auction_products = async (req, res) => {
//   try {
//     let products = [];
//     let productImages = [];

//     let { selectedProducts } = req.body;

//     let productIds = selectedProducts.join("','");
//     productIds = `'${productIds}'`;

//     let query = `SELECT products.id,products.product_name,products.description,products.status,categories.category FROM products left join categories ON products.category_id = categories.id where products.id IN(${productIds})`;

// await db.sequelize.models.products.findAll({
//     attributes: ['id','product_name','description','status'],
//     include:[
//         {
//             model: db.sequelize.models.categories,
//             attributes: ['category']
//         }
//     ]
// })

//     let results = await db.query(query);

//     //
//     products = results[0];

//     return res.status(200).json({ products });
//   } catch (error) {
//     logger.error(error);
//     res.render("pages/error_page", { error: error.toString() });
//   }
// };

// const showSelectedAuctions = async (req, res) => {
//   try {
//     let date = new Date();
//     let auctionId = req.query.auctionId;
//     let getAuctionQuery = "SELECT * FROM auctions WHERE id=(?)";
//     let [auction] = await getData(getAuctionQuery, [auctionId]);
//     auction.starting_time = isoToDateTimeLocal(auction.starting_time);
//     auction.ending_time = isoToDateTimeLocal(auction.ending_time);
//     let offset = date.getTimezoneOffset();

//     let starttime = new Date(auction.starting_time).getTime();
//     starttime = starttime - offset * 60 * 1000;
//     starttime = new Date(starttime);

//     let endtime = new Date(auction.ending_time).getTime();
//     endtime = endtime - offset * 60 * 1000;
//     endtime = new Date(endtime);

//     auction.starting_time = isoToDateTimeLocal(starttime);
//     auction.ending_time = isoToDateTimeLocal(endtime);

//     if (auction.status_id == 1 || auction.status_id == 2) {
//       res.render("pages/selected_auction", { auction });
//     }
//   } catch (error) {
//     logger.error(error);
//     res.render("pages/error_page", { error: error.toString() });
//   }
// };
// const getauctionProducts = async (req, res) => {
//   try {
//     let auctionId = req.query.auctionId;
//     let query =
//       "SELECT products.id,products.product_name,products.description,products.status,products.starting_price,products.bid_price_interval,products.reserved_price ,categories.category FROM products left join categories ON products.category_id = categories.id   where auction_id=(?)";
//     let products = await getData(query, [auctionId]);
//     return res.status(200).json({ products });
//   } catch (error) {
//     logger.error(error);
//     res.render("pages/error_page", { error: error.toString() });
//   }
// };

// // this is controller to update auction
// const updateAuction = async (req, res) => {
//   try {
//     let seller_id = req.user[0][0].id;
//     let {
//       title,
//       description,
//       start_time,
//       end_time,
//       stratingPrice,
//       priceInterval,
//       reservePrice,
//       productId,
//       isImageupdate,
//       auctionId,
//       auctionStatusId,
//     } = req.body;
//     //   means closestauction

//     if (auctionId == 0) {
//       return res.json({ message: "You Can't Edit Closed Auction" });
//     }
//     if (auctionStatusId == 1) {
//       let updateAuctiontableQuery = `UPDATE auctions SET ending_time=convert_tz(?,@@session.time_zone,'+00:00') where id=?`;
//       let update_auctiontablevalues = [end_time, auctionId];
//       await db.query(updateAuctiontableQuery, update_auctiontablevalues);
//        cronJobs.forEach(async(auction)=>{
//         if(auction.auctionId== auctionId){
//           let endJobOld=auction.endJob;
//           endJobOld.stop();
//           configureEndJob(end_time,auctionId,seller_id);
          
//         }
//        });
//       return res.status(200).json({ success: true });
//     }

//     if (isImageupdate == "true") {
//       let auction_img = req.file.filename;
//       let previousauctionquery = "SELECT image From auctions where id=(?) ";
//       let [previousimagedata] = await getData(previousauctionquery, [
//         auctionId,
//       ]);

//       let previousAuctionImage = previousimagedata.image;
//       let storepreviousauctionquery =
//         "INSERT INTO previous_auction_images (image,auction_id) VALUES(?)";
//       let storepreviousauctiondata = [previousAuctionImage, auctionId];
//       await db.query(storepreviousauctionquery, [storepreviousauctiondata]);

//       //  here we are doing update
//       let updateAuctiontableQuery =
//         "UPDATE auctions SET title=?,description=?,image=?,starting_time=convert_tz(?,@@session.time_zone,'+00:00'),ending_time=convert_tz(?,@@session.time_zone,'+00:00') WHERE id=?";
//       let updateAuctionData = [
//         title,
//         description,
//         auction_img,
//         start_time,
//         end_time,
//         auctionId,
//       ];
//       await db.query(updateAuctiontableQuery, updateAuctionData);
//     } else {
//       let updateAuctiontableQuery =
//         "UPDATE auctions SET title=?,description=?,starting_time=convert_tz(?,@@session.time_zone,'+00:00'),ending_time=convert_tz(?,@@session.time_zone,'+00:00') WHERE id=?";
//       let updateAuctionData = [
//         title,
//         description,
//         start_time,
//         end_time,
//         auctionId,
//       ];
//       await db.query(updateAuctiontableQuery, updateAuctionData);
//     }
 
//     cronJobs.forEach(async(auction)=>{
      
//       if(auction.auctionId== auctionId){
//         let startJobOld=auction.startJob;
//         let endJobOld=auction.endJob;
//         startJobOld.stop();
//         endJobOld.stop();
//         configureBothJob(start_time,end_time,auctionId,seller_id);
        
//       }
//      });
       
    
//     let product_insert_query =
//       "UPDATE products SET auction_id=?,starting_price=?,bid_price_interval=?,reserved_price=? WHERE id=?";
//     if (productId) {
//       for (let i = 0; i < productId.length; i++) {
//         let products_values = [
//           auctionId,
//           stratingPrice[i],
//           priceInterval[i],
//           reservePrice[i],
//           productId[i],
//         ];

//         let result = await db.query(product_insert_query, products_values);
//       }
//     }
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     logger.error(error);
//     res.render("pages/error_page", { error: error.toString() });
//   }
// };

// const getProductsOnUpdateAuctionPage = async (req, res) => {
//   try {
//     let seller_id = req.user[0][0].id;
//     let query =
//       "SELECT products.id,products.product_name,products.description,products.status,categories.category FROM products left join categories ON products.category_id = categories.id  where products.seller_id=(?)  AND products.status='unsold' AND products.is_deleted=? AND products.auction_id is null";
//     let results = await db.query(query, [seller_id, 0]);
//     products = results[0];
//     return res.status(200).json({ products });
//   } catch {
//     logger.error(error);
//   }
// };

// const deleteProductsOfAuction = async (req, res) => {
//   try {
//     let { deselcetedAuctionProductID, auctionId } = req.body;
//     let updatequery =
//       "UPDATE products SET auction_id=? ,starting_price=?,bid_price_interval=?,reserved_price=? WHERE id=?";
//     for (let i = 0; i < deselcetedAuctionProductID.length; i++) {
//       let updatevalues = [
//         null,
//         null,
//         null,
//         null,
//         deselcetedAuctionProductID[i],
//       ];
//       await db.query(updatequery, updatevalues);
//     }
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     logger.error(error);
//   }
// };

// // This is the controller To delete Auction
// const deleteAuction = async (req, res) => {
//   try {
//     let auctionId = req.query.auctionId;
//     let auctionResult = await db.query(
//       "SELECT status_id from auctions Where id=?",
//       [auctionId]
//     );
//     let auction_status = auctionResult[0][0].status_id;
//     //    here we are going to apply delete operation only for Upcoming Auction
//     if (auction_status === 2) {
//       let [productsofAuction] = await db.query(
//         "SELECT * FROM products WHERE auction_id=?",
//         [auctionId]
//       );
//       productsofAuction.forEach(async (product) => {
//         await db.query(
//           "UPDATE products SET auction_id=?,status=?,starting_price=?,bid_price_interval=?,reserved_price=?  WHERE  id=?",
//           [null, "unsold", null, null, null, product.id]
//         );
//       });
//       // here we are set isdeleted Status set to 1

//       await db.query("UPDATE auctions SET is_deleted=1 WHERE id=?", [
//         auctionId,
//       ]);

//       res.redirect("/seller/dashboard");
//     }
//   } catch (error) {
//     logger.error(error);
//   }
// };
// module.exports = {
//   get_add_auction,
//   post_add_auctions,
//   get_selected_auction_products,
//   showSelectedAuctions,
//   getauctionProducts,
//   updateAuction,
//   deleteProductsOfAuction,
//   deleteAuction,
//   intializeSocket,
//   getProductsOnUpdateAuctionPage,
//   cronJobs
// };
