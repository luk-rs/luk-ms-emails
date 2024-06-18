import { Request, Response } from "express";
import { Route } from "../../kernel/routing.js";
import templater from "../../kernel/templater.js";
import emailer from "./emailer.js";

type SleepRequest = {
  name: string;
  email: string;
  location: string;
  words: string;
};

async function sendContactEmail(
  req: Request<{}, {}, SleepRequest>,
  res: Response
) {
  const html = await templater.format(
    "public/contact-template.html",
    (error) => res.status(500).send("could not read file"),
    {
      "${name}": req.body.name,
      "${email}": req.body.email,
      "${location}": req.body.location,
      "${words}": req.body.words.replaceAll("\n", "<br>"),
    }
  );

  const info = await emailer.send({
    from: process.env.EMAIL_CONTACT_FROM,
    to: process.env.EMAIL_TO,
    subject: "Contacto Inicial",
    html: html,
  });

  res.send(info.response);
  console.log(info.response);
}

const emailRoutes: Route[] = [
  { method: "POST", name: "request-contact", handler: sendContactEmail },
];

export default emailRoutes;
