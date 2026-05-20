import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private prisma: PrismaClient) {}

  async register(data: { email: string; password: string; name?: string; role?: 'admin'|'craftsman'|'customer' }) {
    const exists = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (exists) throw new UnauthorizedException('Email already in use');
    const hash = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: { email: data.email, password: hash, name: data.name || '', role: data.role || 'customer' },
      select: { id: true, email: true, name: true, role: true },
    });
    return { user, token: await this.sign(user) };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, (user as any).password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const { password: _, ...safe } = user as any;
    return { user: safe, token: await this.sign(safe) };
  }

  async sign(user: any) {
    return this.jwt.signAsync({ sub: user.id, role: user.role, email: user.email });
  }
}
