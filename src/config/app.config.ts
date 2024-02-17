

import * as process from "process";

export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    // paginacion
    defaultLimit: process.env.DEFAULT_LIMIT || 7,
    defaultOffset: process.env.DEFAULT_OFFSET || 0,
})