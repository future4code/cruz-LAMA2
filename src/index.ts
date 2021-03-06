import express from "express";
import { bandRouter } from "./routes/bandRouter";
import { showRouter } from "./routes/showRouter";
import { userRouter } from "./routes/userRouter";

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/band",bandRouter);
app.use("/show",showRouter)
app.listen(3003, () => {

  console.log(`Servidor rodando em http://localhost:3003`);
});
