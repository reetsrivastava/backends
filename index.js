const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const initializeDB = require("./db/db.connect.js")

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const cartRoutes = require("./routes/carts");
const wishlistRoutes = require("./routes/wishlists");
const addressesRoutes = require("./routes/addresses");
const ordersRoutes = require("./routes/orders");

dotenv.config();

const port = 3000;

initializeDB();

app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());

app.get('/',(req,res) => {
   res.send("server is running")
})

app.use("/api/products",productRoutes);
app.use("/api/users",userRoutes);
app.use("/api/carts",cartRoutes);
app.use("/api/wishlists",wishlistRoutes);
app.use("/api/addresses",addressesRoutes);
app.use("/api/orders",ordersRoutes);

app.use((err,req,res,next) => {
   console.error(err.stack)
   res.status(500).json({ success: false, message:"route not found on server" ,error:err.message})
})

app.listen(port,() => console.log("server listening on port : ",port))