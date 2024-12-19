import { Resolver, Mutation, Arg, ObjectType, Field } from 'type-graphql';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@ObjectType()
export class VerifyEmailResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}

@Resolver()
export class VerifyResolver {
  @Mutation(() => VerifyEmailResponse)
  async verifyEmail(
    @Arg('token', () => String) token: string
  ): Promise<VerifyEmailResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { verifyToken: token }
      });

      if (!user) {
        return { success: false, message: 'Invalid verification token' };
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          isVerified: true,
          verifyToken: null
        }
      });

      return { success: true, message: 'Email verified successfully' };
    } catch (error) {
      return { success: false, message: 'Verification failed' };
    }
  }
}
