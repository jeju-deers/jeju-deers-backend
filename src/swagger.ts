import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Auto-generated API documentation.",
    },
    servers: [
      {
        url: "https://jeju-deers-backend.fly.dev/",
        description: "Published server",
      },
      {
        url: "http://localhost:3000", // 개발 서버 URL
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/**/*.ts"], // 경로 확인
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
console.log("Swagger Spec:", swaggerSpec);
export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
