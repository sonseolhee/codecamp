/**
 * openapi contents set by following configuration(options)
 * - definition
 * - apis 
 *      - files containing annotations
 *      - swagger-jsdoc
 */
 export const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'CODECAMP BACKEND 01',
        version: '1.0.0',
      },
    },
    apis: ['./swagger/*.js'], 
  };