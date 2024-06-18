import express from "express";
import envConfig from "../kernel/dotenv.js";
import { setRoute } from "../kernel/routing.js";
import emailRoutes from "./emails/controller.js";

envConfig();

const app = express()
  .use(express.json())
  .use(express.static("public"))
  .get("/", (_, res) => res.send("Welcome to luk microservices"));

for (const route of emailRoutes) {
  setRoute(app, route);
}

// app.post("/request-contact", sendContactEmail);

app.listen(process.env.PORT, () => {
  console.log(`
server started successfully
running on port '${process.env.PORT}'
`);
});
