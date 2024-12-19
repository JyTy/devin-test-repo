const nodemailer = require('nodemailer');

async function createTestAccount() {
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('Ethereal Email credentials:');
    console.log('SMTP_HOST=smtp.ethereal.email');
    console.log('SMTP_PORT=587');
    console.log(`SMTP_USER=${testAccount.user}`);
    console.log(`SMTP_PASS=${testAccount.pass}`);
    console.log('\nPreview URL base:', nodemailer.getTestMessageUrl({}));
  } catch (error) {
    console.error('Error creating test account:', error);
  }
}

createTestAccount();
