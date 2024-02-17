import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as process from "process";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    app.setGlobalPrefix('api/v2');//agrega el prefijo por defecto ... /api
    
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            //permitir que lo que ingrese lo tomemos como queremos en los dtos (querys)
            transform: true,
            transformOptions: {
                enableImplicitConversion:true
            }
        })
    );
    
    await app.listen(process.env.PORT);
}
bootstrap();
