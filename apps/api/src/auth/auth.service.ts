import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { scryptSync, timingSafeEqual } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  /** scrypt hash — avoids native bcrypt dependency on Cloudflare Containers */
  static hashPassword(password: string): string {
    const salt = Math.random().toString(36).slice(2, 10);
    const h = scryptSync(password, salt, 32).toString('hex');
    return `${salt}:${h}`;
  }

  private static verify(password: string, stored: string): boolean {
    const [salt, digest] = stored.split(':');
    if (!salt || !digest) return false;
    const h = scryptSync(password, salt, 32);
    return h.length === Buffer.from(digest, 'hex').length &&
      timingSafeEqual(h, Buffer.from(digest, 'hex'));
  }

  async adminLogin(email: string, password: string) {
    const admin = await this.prisma.adminUser.findUnique({ where: { email } });
    if (!admin || !AuthService.verify(password, admin.passwordHash)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwt.signAsync({ sub: admin.id, role: admin.role });
    return { token, admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role } };
  }
}
