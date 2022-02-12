const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/products');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
app.use(express.json());

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => console.log('db connected')).catch(err => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);



app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
})