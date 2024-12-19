import nodemailer from 'nodemailer';

function validateEnvVars() {
  const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'FRONTEND_URL'] as const;
  const missing = requiredVars.filter(varName => typeof process.env[varName] === 'undefined');

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  validateEnvVars();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT!),
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!
    }
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM!,
    to: email,
    subject: 'Verify your email',
    html: `Click <a href="${process.env.FRONTEND_URL!}/verify?token=${token}">here</a> to verify your email`
  });
}
