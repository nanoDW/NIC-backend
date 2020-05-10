import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv";
import * as fs from "fs";

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = fs.existsSync(filePath) ? dotenv.parse(fs.readFileSync(filePath)) : process.env;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
