import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, token: string) {
  console.log('Setting up email transport...');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  console.log('Email transport configured');

  console.log('Sending verification email...');
  const info = await transporter.sendMail({
    from: `"Notes App" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Verify your email',
    html: `
      <h1>Welcome to Notes App!</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:4200'}/verify?token=${token}">Verify Email</a>
    `
  });

  console.log('Email sent successfully');
  console.log('Message ID:', info.messageId);
  console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

  return info;
}
