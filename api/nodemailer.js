import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, phone, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nodemailer424@gmail.com",
      pass: "zxdosgfbnzccjttg",
    },
  });

  const mailOptions = {
    from: "nodemailer424@gmail.com",
    to: "latakshsariya146@gmail.com",
    replyTo: email,
    subject: `New Contact Form: ${subject || 'No Subject'}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #5227FF; margin-bottom: 20px;">New Contact Form Submission</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #333;">Name:</strong>
            <p style="margin: 5px 0; color: #666;">${name}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #333;">Email:</strong>
            <p style="margin: 5px 0; color: #666;">${email}</p>
          </div>
          
          ${phone ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #333;">Phone:</strong>
            <p style="margin: 5px 0; color: #666;">${phone}</p>
          </div>
          ` : ''}
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #333;">Subject:</strong>
            <p style="margin: 5px 0; color: #666;">${subject || 'No Subject'}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #333;">Message:</strong>
            <p style="margin: 5px 0; color: #666; white-space: pre-wrap;">${message}</p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          
          <p style="color: #999; font-size: 12px; margin: 0;">
            This email was sent from the 1not2 Productions contact form.
          </p>
        </div>
      </div>
    `,
    text: `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      ${phone ? `Phone: ${phone}` : ''}
      Subject: ${subject || 'No Subject'}
      
      Message:
      ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
