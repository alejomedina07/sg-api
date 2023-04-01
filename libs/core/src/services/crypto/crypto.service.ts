import { Injectable } from '@nestjs/common';
// import { SHA256, AES, enc } from 'crypto-js';
// import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
const saltRounds = 12;

@Injectable()
export class CryptoService {
  // constructor(private configService: ListService) {}
  // createHash(data: any): string {
  //   return SHA256(JSON.stringify({ ...data, hash: null })).toString();
  // }
  //
  // encryptData(data: any): string {
  //   return AES.encrypt(JSON.stringify(data), this.configService.get<string>('register.keyMovement')).toString();
  // }
  // decryptedData(data: string): string {
  //   return AES.decrypt(data, this.configService.get<string>('register.keyMovement')).toString(enc.Utf8);
  // }

  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(plainPassword: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hash);
  }
}
