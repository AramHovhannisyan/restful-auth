import { config } from "./config";

const port = config.server.port;
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "REST API for Swagger Documentation",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    servers: [{ url: `http://localhost:${port}/` }],
  },
  apis: [
    `${__dirname}/../routes/*.ts`,
    `${__dirname}/../routes/*.js`,
  ],
};

export default swaggerOptions;