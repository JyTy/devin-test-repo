import { Resolver, Mutation, Arg } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { User, AuthResponse } from '../models/user.model';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

@Resolver(() => User)
export class AuthResolver {
  @Mutation(() => AuthResponse)
  async register(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string
  ): Promise<AuthResponse> {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    return { token, user };
  }

  @Mutation(() => AuthResponse)
  async login(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string
  ): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    return { token, user };
  }

  @Mutation(() => Boolean)
  async verifyEmail(
    @Arg('token', () => String) token: string
  ): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { verifyToken: token }
    });

    if (!user) throw new Error('Invalid verification token');

    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, verifyToken: null }
    });

    return true;
  }
}
