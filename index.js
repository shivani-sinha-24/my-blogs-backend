import * as dotenv from 'dotenv' 
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

//routes
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST',
  credentials:true
  }
));
app.use("/uploads", express.static("./uploads"));  //upload folder should in the root directory

// connect mongodb
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGOOSE_CONNECTION_LINK )
  .then(()=>console.log('connected to db'))
  .catch((err)=>console.log(err))
}

//routes
app.get('/',(req,res)=>res.send('Hello World from my blogs backend'))
app.use("/user",userRoutes);
app.use("/blog",blogRoutes);

//listening port
app.listen(3009, () => {
    console.log("server started on port :3009");
  });