import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import nodemailer from 'nodemailer';

// Custom Vite plugin to handle SMTP email sending during development & preview
function smtpEmailPlugin() {
  return {
    name: 'vite-plugin-smtp-email',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Method not allowed' }));
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const { name, email, message } = data;

            if (!name || !email || !message) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'Missing required fields: name, email, message' }));
            }

            const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
            const smtpHost = env.SMTP_HOST || 'smtp.gmail.com';
            const smtpPort = Number(env.SMTP_PORT) || 587;
            const smtpUser = env.SMTP_USER || 'harshbh20102@gmail.com';
            const smtpPass = env.SMTP_PASS || 'ryvtvzzfbnkfarmy';

            const transporter = nodemailer.createTransport({
              host: smtpHost,
              port: smtpPort,
              secure: false, // true for 465, false for 587
              auth: {
                user: smtpUser,
                pass: smtpPass,
              },
            });

            // 1. Send notification email to Harsh
            await transporter.sendMail({
              from: `"${name} (Portfolio)" <${smtpUser}>`,
              to: smtpUser,
              replyTo: email,
              subject: `✨ New Portfolio Inquiry from ${name}`,
              html: `
                <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
                  <div style="background: linear-gradient(135deg, #4f46e5, #0ea5e9); padding: 24px 28px; color: #ffffff;">
                    <h2 style="margin: 0; font-size: 20px; font-weight: 700;">🚀 New Message Received</h2>
                    <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Harsh Sharma Portfolio Contact Form</p>
                  </div>
                  <div style="padding: 28px;">
                    <div style="margin-bottom: 20px; padding: 14px; background: #f8fafc; border-radius: 12px; border: 1px solid #edf2f7;">
                      <p style="margin: 0 0 6px 0; font-size: 14px; color: #64748b;"><strong>Sender Name:</strong> <span style="color: #0f172a;">${name}</span></p>
                      <p style="margin: 0; font-size: 14px; color: #64748b;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></p>
                    </div>
                    <div style="margin-top: 16px;">
                      <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; font-weight: 700; color: #94a3b8; letter-spacing: 0.05em;">Message Content:</p>
                      <div style="padding: 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</div>
                    </div>
                    <div style="margin-top: 24px; text-align: center;">
                      <a href="mailto:${email}?subject=Re: Your inquiry on Harsh Sharma Portfolio" style="display: inline-block; background: #4f46e5; color: #ffffff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply Directly to ${name}</a>
                    </div>
                  </div>
                </div>
              `,
            });

            // 2. Send polite confirmation auto-reply to the visitor
            try {
              await transporter.sendMail({
                from: `"Harsh Sharma" <${smtpUser}>`,
                to: email,
                subject: `✨ Thanks for reaching out, ${name}! — Harsh Sharma`,
                html: `
                  <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #4f46e5, #0ea5e9); padding: 24px 28px; color: #ffffff;">
                      <h2 style="margin: 0; font-size: 20px; font-weight: 700;">Hi ${name}! 👋</h2>
                      <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Thanks for visiting my portfolio</p>
                    </div>
                    <div style="padding: 28px; color: #334155; font-size: 15px; line-height: 1.6;">
                      <p>Thank you for sending a message through my portfolio website! I have received your note and will review it promptly.</p>
                      <p>I typically respond within <strong>24 hours</strong>. If you have an urgent inquiry, you can also reach out via LinkedIn or GitHub.</p>
                      <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 12px; border-left: 4px solid #4f46e5;">
                        <p style="margin: 0; font-weight: 600; color: #0f172a;">Harsh Sharma</p>
                        <p style="margin: 2px 0 0 0; font-size: 13px; color: #64748b;">Full-Stack Developer · MCA @ Lovely Professional University</p>
                        <p style="margin: 4px 0 0 0; font-size: 13px;"><a href="https://github.com/Harshbh7" style="color: #4f46e5; text-decoration: none;">GitHub</a> · <a href="https://linkedin.com/" style="color: #0ea5e9; text-decoration: none;">LinkedIn</a></p>
                      </div>
                    </div>
                  </div>
                `,
              });
            } catch (replyErr) {
              console.warn('Auto-reply warning:', replyErr.message);
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: true, message: 'Email sent successfully via Gmail SMTP' }));
          } catch (err) {
            console.error('SMTP Error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: err.message || 'Failed to send email' }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), smtpEmailPlugin()],
});
