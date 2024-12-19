import { Resolver, Mutation, Arg } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { User, AuthResponse } from '../models/user.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthResponse)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<AuthResponse> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    return { token, user };
  }

  @Mutation(() => AuthResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    return { token, user };
  }
}
