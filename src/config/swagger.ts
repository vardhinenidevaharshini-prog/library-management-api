import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
  openapi: "3.0.0",
  info: {
    title: "Library Management API",
    version: "1.0.0",
    description: "Library Management System API Documentation",
  },

  servers: [
    {
      url: "http://localhost:5000",
      description: "Local Server",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },

  security: [
    {
      bearerAuth: [],
    },
  ],
},

  apis: ["src/modules/**/*.routes.ts"],
};


export const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi };