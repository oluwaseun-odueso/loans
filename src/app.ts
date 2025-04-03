import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes/index.route"
import errorHandler from "./middlewares/errorHandler.middleware"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true
  })
);
app.use(morgan('dev'));

app.use('/api/v1', routes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app;