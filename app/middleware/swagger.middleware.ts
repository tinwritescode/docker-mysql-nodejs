import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
  definition: {
    host: `${process.env.HOST}:${process.env.PORT}`,
    openapi: '3.0.0',
    info: {
      title: 'Phát triển ứng dụng web nâng cao-CSC13114_19KTPM1',
      version: '1.0.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Tin Nguyen',
        email: 'hopthucuatin@email.com',
      },
    },
    // servers: [
    //   {
    //     url: 'http://localhost:3000/',
    //   },
    // ],
  },
  apis: ['./app/route/*.route.ts', './app/docs/*.yaml'],
}

export const specs = swaggerJSDoc(options)
