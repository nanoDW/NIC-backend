import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get("TYPEORM_HOST"),
        port: Number(config.get("TYPEORM_PORT")),
        username: config.get("TYPEORM_USERNAME"),
        password: config.get("TYPEORM_PASSWORD"),
        database: config.get("TYPEORM_DATABASE"),
        logging: false,
        synchronize: true,
        entities: [__dirname + "/model/**.entity{.ts,.js}"],
        cli: {
          entitiesDir: "../src/model",
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
