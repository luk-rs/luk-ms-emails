import express from "express";
import ViteExpress from "vite-express";
import emailer from "./emails/emailer.js";

const app = express();

app.get("/hello", async (_, res) => {
  await emailer
    .send(
      "Autoridade Tributaria <info@at.gov.pt>",
      "Filipa Maia <santos8@gmail.com>",
      "Multa",
      `Caro(a) contribuinte,

Por inconformidades de ultima hora encontradas na sua declaracao de IRS foi emitida uma multa no valor de 4276,54 euros.

Dirija-se ao portal da financas para mais informacoes sobre o pagamento.

Com os melhores cumprimentos
Autoridade Triburaria e Aduaneira`
    )
    .then(() => res.send("email sent to 'Filipa Maia <santos8@gmail.com>'"))
    .catch((error) => res.status(500).send(error));
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
