import crypto from 'crypto';
const jwt = require('jsonwebtoken');

import UserEntity from '@/server/orm/entities/user.entity';

export default {

  hash: async (password: string) => {
    return new Promise<string>((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex');

      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(salt + ':' + derivedKey.toString('hex'));
      });
    })
  },

  verify: async (password: string, hash: string) => {
    return new Promise<boolean>((resolve, reject) => {
      const [salt, key] = hash.split(':');

      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key == derivedKey.toString('hex'))
      });
    })
  },

  signJwt: (user: UserEntity) => {
    const {
      ACCESS_TOKEN_EXPIRES_IN,
      REFRESH_TOKEN_EXPIRES_IN,
      ACCESS_TOKEN_SECRET_KEY,
      REFRESH_TOKEN_SECRET_KEY,
    } = process.env;

    const atExpiresIn = Number(ACCESS_TOKEN_EXPIRES_IN);
    const rtExpiresIn = Number(REFRESH_TOKEN_EXPIRES_IN);

    const accessToken = jwt.sign({
      id: user.id,
      role: user.role,
    }, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: atExpiresIn
    });

    const refreshToken = jwt.sign({
      id: user.id,
    }, REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: rtExpiresIn
    });

    return {
      accessToken,
      refreshToken,
      atExpiresIn,
      rtExpiresIn,
    };
  }
};