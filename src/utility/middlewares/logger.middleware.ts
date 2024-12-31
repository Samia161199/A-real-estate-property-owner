import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      logger?: UserEntity;
    }
  }
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (
      !authHeader ||
      isArray(authHeader) ||
      !authHeader.startsWith('Bearer ')
    ) {
      req.logger = null;
      next();
      return;
    } else {
      try {
        const token = authHeader.split(' ')[1];
        const { id } = <JwtPayload>(
          verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        );
        const logger = await this.usersService.findOne(+id);
        req.logger = logger;
        next();
      } catch (err) {
        req.logger = null;
        next();
      }
    }
  }
}

interface JwtPayload {
  id: string;
}
