import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { User, AuthResponse } from '../models/user.model';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { sendVerificationEmail } from '../utils/email';
import { VerifyEmailResponse } from './verify.resolver';
import { Context } from '../types/context';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

@Resolver(() => User)
export class AuthResolver {
  @Mutation(() => AuthResponse)
  async register(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string
  ): Promise<AuthResponse> {
    console.log('Registration attempt for email:', email);

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log('Registration failed: User already exists');
      throw new Error('User already exists');
    }

    console.log('Generating verification token...');
    const verifyToken = crypto.randomBytes(32).toString('hex');

    console.log('Creating new user...');
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
    console.log('User created successfully:', user.id);

    try {
      console.log('Sending verification email...');
      await sendVerificationEmail(email, verifyToken);
      console.log('Verification email sent');
    } catch (error) {
      console.error('Failed to send verification email:', error);
      // Continue with registration even if email fails
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    console.log('JWT token generated');

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

  @Query(() => User, { nullable: true })
  async verifyToken(@Ctx() context: Context): Promise<User | null> {
    try {
      if (!context.token) return null;

      const decoded = jwt.verify(context.token, JWT_SECRET) as { userId: number };
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: { notes: true }
      });

      return user;
    } catch (error) {
      return null;
    }
  }
}
