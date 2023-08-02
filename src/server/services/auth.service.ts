import crypto from 'crypto';
const jwt = require('jsonwebtoken');

import UserEntity from '@/server/orm/entities/user.entity';

export default class AuthService {

  static async hash(password: string) {
    return new Promise<string>((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex');

      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(salt + ':' + derivedKey.toString('hex'));
      });
    })
  }

  static async verify(password: string, hash: string) {
    return new Promise<boolean>((resolve, reject) => {
      const [salt, key] = hash.split(':');

      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key == derivedKey.toString('hex'))
      });
    })
  }

  static signJwt(user: UserEntity) {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const {
      ACCESS_TOKEN_SECRET_KEY,
      ACCESS_TOKEN_EXPIRES_IN,
    } = process.env;

    const atExpiresIn = Number(ACCESS_TOKEN_EXPIRES_IN);

    const accessToken = jwt.sign(
      payload,
      ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: Number(ACCESS_TOKEN_EXPIRES_IN)
    });

    return {
      accessToken,
      atExpiresIn,
    };
  }
}