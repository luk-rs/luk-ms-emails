import express, { Application } from "express";

type Handler = (req: express.Request, res: express.Response) => Promise<void>;
export type Route = {
  method: string;
  name: string;
  handler: Handler;
};
const setRoute = (app: Application, route: Route) => {
  const path = "/" + route.name;
  switch (route.method.toUpperCase()) {
    case "POST":
      console.log("post method added");
      app.post(path, route.handler);
      break;
    case "GET":
      app.get(path, route.handler);
      break;
    default:
      throw new Error(`Method '${route.method}' still not supported`);
  }
};

export { setRoute };
