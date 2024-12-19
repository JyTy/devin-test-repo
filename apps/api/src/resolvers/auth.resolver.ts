import { Resolver, Mutation, Arg } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { User, AuthResponse } from '../models/user.model';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { sendVerificationEmail } from '../utils/email';
import { VerifyEmailResponse } from './verify.resolver';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

@Resolver(() => User)
export class AuthResolver {
  @Mutation(() => AuthResponse)
  async register(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string
  ): Promise<AuthResponse> {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const verifyToken = crypto.randomBytes(32).toString('hex');
    const user = await prisma.user.create({
      data: {
        email,
        password: await bcryptjs.hash(password, 10),
        verifyToken,
        isVerified: false,
        created_datetime: new Date()
      },
      include: { notes: true }
    });

    await sendVerificationEmail(email, verifyToken);

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    return { token, user };
  }

  @Mutation(() => AuthResponse)
  async login(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string
  ): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { notes: true }
    });
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    return { token, user };
  }

  @Mutation(() => VerifyEmailResponse)
  async verifyEmail(
    @Arg('token', () => String) token: string
  ): Promise<VerifyEmailResponse> {
    const user = await prisma.user.findUnique({
      where: { verifyToken: token }
    });

    if (!user) {
      return { success: false, message: 'Invalid verification token' };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, verifyToken: null }
    });

    return { success: true, message: 'Email verified successfully' };
  }
}
