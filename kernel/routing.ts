import express, { Application, Request, Response } from "express";

type Handler = (req: express.Request, res: express.Response) => Promise<void>;
export type Route = {
  method: string;
  name: string;
  handler: Handler;
};

function safeRoute(handler: Handler) {
  return (req: Request, res: Response) =>
    handler(req, res).catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
}

const setRoute = (app: Application, route: Route) => {
  const path = "/" + route.name;
  const safeHandler = safeRoute(route.handler);
  switch (route.method.toUpperCase()) {
    case "POST":
      console.log("post method added");
      app.post(path, safeHandler);
      break;
    case "GET":
      app.get(path, safeHandler);
      break;
    default:
      throw new Error(`Method '${route.method}' still not supported`);
  }
};

export { setRoute };
