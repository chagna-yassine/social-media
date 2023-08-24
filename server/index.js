import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import imagesRoutes from "./routes/image.js";
import feedRoutes from "./routes/feed.js";
import fanoutRoutes from "./routes/fanout.js";
import metadataRoutes from "./routes/metadata.js";
import likeRoutes from "./routes/like.js";
import commentRoutes from "./routes/comment.js";


/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/Image", imagesRoutes);
app.use("/Feed", feedRoutes);
app.use("/Fanout", fanoutRoutes);
app.use("/Metadata", metadataRoutes);
app.use("/Like", likeRoutes);
app.use("/Comment", commentRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));