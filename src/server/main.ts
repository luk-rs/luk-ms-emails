import express from "express";
import ViteExpress from "vite-express";
import emailer from "./emails/emailer.js";

const app = express();

app.get("/request-contact", async (_, res) => {
  const staticMail = {
    from: '"Autoridade Tributaria" <info@at.gov.pt>',
    to: "Filipa Maia <santos8@gmail.com>",
    subject: "Multa",
    text: `Caro(a) contribuinte,

Por inconformidades de ultima hora encontradas na sua declaracao de IRS foi emitida uma multa no valor de 4276,54 euros.

Dirija-se ao portal da financas para mais informacoes sobre o pagamento.

Com os melhores cumprimentos
Autoridade Triburaria e Aduaneira`,
  };

  await emailer
    .send(staticMail)
    .then((info) => {
      console.log("Email sent:", info.response);
      res.send(`email sent to '${staticMail.to}'`);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
