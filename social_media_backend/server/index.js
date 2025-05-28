const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

dotenv.config("./.env");

// Cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// middlewares
app.use(express.json({ limit: "100mb" }));
app.use(morgan("common"));
app.use(cookieParser());

let origin = 'http://localhost:3000';
console.log('here env', process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production') {
  origin = process.env.CORS_ORIGIN;
}
app.use(
  cors({
    credentials: true,
    origin: origin,
  })
);

app.use("/auth", authRouter);

app.use("/posts", postRouter);

app.use("/user", userRouter);

const PORT = process.env.PORT || 4002;

dbConnect();

app.get("/", (req, res) => {
  res.status(200).send("Ok from server");
});

app.listen(PORT, () => {
  console.log("listening on port PORT :", PORT);
});

// To generate TOKEN from node
// node
// crypto.randomBytes(64).toString('hex')
