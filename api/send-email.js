import nodemailer from "nodemailer";

const CONFIRMATION_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OneNotTwo — Booking Confirmation</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: #0a0a0a;
      padding: 32px 16px;
    }

    .email-shell {
      max-width: 580px;
      margin: 0 auto;
      background: #111;
      border: 1px solid #2a2a2a;
      overflow: hidden;
    }

    /* Header */
    .header {
      background: #0c0c0c;
      padding: 36px 40px 28px;
      border-bottom: 1px solid #1e1e1e;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }
    .brand {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px;
      font-weight: 600;
      color: #fff;
      letter-spacing: 0.5px;
    }
    .tagline {
      font-size: 10px;
      color: #666;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      margin-top: 3px;
    }
    .header-badge {
      font-size: 9px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #b8913a;
      border: 1px solid #b8913a44;
      padding: 4px 10px;
      font-weight: 500;
    }

    /* Body */
    .body {
      padding: 36px 40px;
    }
    .greeting {
      font-family: 'Cormorant Garamond', serif;
      font-size: 26px;
      font-weight: 500;
      color: #e8e8e8;
      margin-bottom: 10px;
      line-height: 1.2;
    }
    .subtext {
      font-size: 13px;
      color: #777;
      line-height: 1.65;
      margin-bottom: 32px;
    }
    .subtext strong {
      color: #ccc;
      font-weight: 400;
    }

    /* QR Section */
    .qr-section {
      background: #fff;
      margin-bottom: 32px;
      padding: 32px 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
    }
    .qr-img {
      width: 180px;
      height: 180px;
      flex-shrink: 0;
    }
    .qr-img img {
      width: 180px;
      height: 180px;
      display: block;
    }
    .qr-meta .scan-label {
      font-size: 9px;
      color: #888;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .qr-meta .movie {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      font-weight: 600;
      color: #111;
      line-height: 1.2;
      margin-bottom: 4px;
    }
    .qr-meta .utr {
      font-size: 10px;
      color: #999;
      font-family: monospace;
      letter-spacing: 1px;
    }

    /* Details */
    .details-label {
      font-size: 9px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #b8913a;
      margin-bottom: 18px;
      font-weight: 500;
    }
    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      border: 1px solid #1e1e1e;
    }
    .detail-cell {
      padding: 18px 20px;
      border-right: 1px solid #1e1e1e;
    }
    .detail-cell:last-child {
      border-right: none;
    }
    .dc-label {
      font-size: 10px;
      color: #555;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .dc-value {
      font-size: 15px;
      color: #e0e0e0;
      font-weight: 500;
    }
    .detail-cell.highlight .dc-value {
      color: #c9a040;
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
    }

    /* Notice */
    .notice {
      margin-top: 28px;
      border-left: 2px solid #b8913a44;
      padding: 16px 20px;
      background: #111;
    }
    .notice-title {
      font-size: 9px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #b8913a;
      margin-bottom: 10px;
      font-weight: 500;
    }
    .notice ul {
      padding-left: 14px;
    }
    .notice ul li {
      font-size: 12px;
      color: #666;
      line-height: 1.7;
      padding-left: 2px;
    }

    /* Footer */
    .footer {
      background: #0c0c0c;
      border-top: 1px solid #1e1e1e;
      padding: 20px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .footer-brand {
      font-family: 'Cormorant Garamond', serif;
      font-size: 13px;
      color: #444;
    }
    .footer-meta {
      font-size: 10px;
      color: #444;
      text-align: right;
      line-height: 1.5;
    }
  </style>
</head>
<body>

  <div class="email-shell">

    <div class="header">
      <div>
        <div class="brand">OneNotTwo Production</div>
        <div class="tagline">Independent Film Production</div>
      </div>
      <div class="header-badge">Official Ticket</div>
    </div>

    <div class="body">
      <div class="greeting">Hello, {{to_name}}.</div>
      <p class="subtext">
        Your booking for <strong>{{movie_title}}</strong> has been confirmed.
        Present the QR code below at the venue entrance for admission.
      </p>

      <div class="qr-section">
        <div class="qr-img">
          <img src="{{qr_code_url}}" alt="Ticket QR Code" />
        </div>
        <div class="qr-meta">
          <div class="scan-label">Scan at gate</div>
          <div class="movie">{{movie_title}}</div>
          <div class="utr">UTR: {{utr_number}}</div>
        </div>
      </div>

      <div class="details-label">Booking Details</div>
      <div class="details-grid">
        <div class="detail-cell">
          <div class="dc-label">Show</div>
          <div class="dc-value">{{movie_title}}</div>
        </div>
        <div class="detail-cell">
          <div class="dc-label">Tickets</div>
          <div class="dc-value">{{ticket_count}}</div>
        </div>
        <div class="detail-cell highlight">
          <div class="dc-label">Total Paid</div>
          <div class="dc-value">₹{{total_paid}}</div>
        </div>
      </div>

      <div class="notice">
        <div class="notice-title">Important Instructions</div>
        <ul>
          <li>Please arrive at least 15 minutes before the show.</li>
          <li>This QR code is valid for {{ticket_count}} person(s). Do not share.</li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <div class="footer-brand">OneNotTwo Production</div>
      <div class="footer-meta">
        Sent to {{to_email}}<br/>
      </div>
    </div>

  </div>

</body>
</html>`;

const REJECTION_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OneNotTwo — Payment Verification Failed</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: #0a0a0a;
      padding: 32px 16px;
    }

    .email-shell {
      max-width: 580px;
      margin: 0 auto;
      background: #111;
      border: 1px solid #2a2a2a;
      overflow: hidden;
    }

    /* Header */
    .header {
      background: #0c0c0c;
      padding: 36px 40px 28px;
      border-bottom: 1px solid #1e1e1e;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }
    .brand {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px;
      font-weight: 600;
      color: #fff;
      letter-spacing: 0.5px;
    }
    .tagline {
      font-size: 10px;
      color: #666;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      margin-top: 3px;
    }
    .header-badge {
      font-size: 9px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #c0392b;
      border: 1px solid #c0392b44;
      padding: 4px 10px;
      font-weight: 500;
    }

    /* Body */
    .body {
      padding: 36px 40px;
    }
    .greeting {
      font-family: 'Cormorant Garamond', serif;
      font-size: 26px;
      font-weight: 500;
      color: #e8e8e8;
      margin-bottom: 10px;
      line-height: 1.2;
    }
    .subtext {
      font-size: 13px;
      color: #777;
      line-height: 1.65;
      margin-bottom: 32px;
    }
    .subtext strong {
      color: #ccc;
      font-weight: 400;
    }

    /* Status Box */
    .status-box {
      background: #160d0d;
      border: 1px solid #3a1a1a;
      padding: 24px;
      margin-bottom: 32px;
      text-align: center;
    }
    .status-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1.5px solid #c0392b;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 14px;
      color: #c0392b;
      font-size: 18px;
      line-height: 1;
    }
    .status-reason-label {
      font-size: 9px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #c0392b;
      margin-bottom: 6px;
      font-weight: 500;
    }
    .status-reason-value {
      font-family: 'Cormorant Garamond', serif;
      font-size: 18px;
      font-weight: 500;
      color: #e0e0e0;
    }

    /* Details */
    .details-label {
      font-size: 9px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #555;
      margin-bottom: 18px;
      font-weight: 500;
    }
    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border: 1px solid #1e1e1e;
      margin-bottom: 28px;
    }
    .detail-cell {
      padding: 18px 20px;
      border-right: 1px solid #1e1e1e;
    }
    .detail-cell:last-child {
      border-right: none;
    }
    .dc-label {
      font-size: 10px;
      color: #555;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .dc-value {
      font-size: 15px;
      color: #e0e0e0;
      font-weight: 500;
    }
    .detail-cell.alert .dc-value {
      color: #c0392b;
      font-family: monospace;
      font-size: 13px;
      letter-spacing: 0.5px;
    }

    /* Notice */
    .notice {
      border-left: 2px solid #c0392b44;
      padding: 16px 20px;
      background: #111;
    }
    .notice-title {
      font-size: 9px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #c0392b;
      margin-bottom: 10px;
      font-weight: 500;
    }
    .notice p {
      font-size: 12px;
      color: #666;
      line-height: 1.7;
    }
    .notice a {
      color: #a0a0a0;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    /* Footer */
    .footer {
      background: #0c0c0c;
      border-top: 1px solid #1e1e1e;
      padding: 20px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .footer-brand {
      font-family: 'Cormorant Garamond', serif;
      font-size: 13px;
      color: #444;
    }
    .footer-meta {
      font-size: 10px;
      color: #444;
      text-align: right;
      line-height: 1.5;
    }
  </style>
</head>
<body>

  <div class="email-shell">

    <div class="header">
      <div>
        <div class="brand">OneNotTwo Production</div>
        <div class="tagline">Independent Film Production</div>
      </div>
      <div class="header-badge">Payment Failed</div>
    </div>

    <div class="body">
      <div class="greeting">Hello, {{to_name}}.</div>
      <p class="subtext">
        We were unable to verify your payment for <strong>{{movie_title}}</strong>.
        Your booking request has been cancelled as a result.
      </p>

      <div class="status-box">
        <div class="status-icon">✕</div>
        <div class="status-reason-label">Reason</div>
        <div class="status-reason-value">UTR / Transaction Could Not Be Verified</div>
      </div>

      <div class="details-label">Cancelled Booking Details</div>
      <div class="details-grid">
        <div class="detail-cell">
          <div class="dc-label">Show</div>
          <div class="dc-value">{{movie_title}}</div>
        </div>
        <div class="detail-cell alert">
          <div class="dc-label">Transaction ID / UTR</div>
          <div class="dc-value">{{utr_number}}</div>
        </div>
      </div>

      <div class="notice">
        <div class="notice-title">What should I do?</div>
        <p>
          If you believe this is an error, please try booking again with a fresh payment or
          contact our support team with your payment screenshot at
          <a href="mailto:onenot2production@gmail.com">onenot2production@gmail.com</a>.
        </p>
      </div>
    </div>

    <div class="footer">
      <div class="footer-brand">OneNotTwo Production</div>
      <div class="footer-meta">
        Sent to {{to_email}}<br/>
        Independent Film Production House
      </div>
    </div>

  </div>

</body>
</html>`;

function interpolateTemplate(html, params) {
  let output = html;
  for (const [key, value] of Object.entries(params)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    output = output.replace(regex, String(value ?? ""));
  }
  return output;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, subject, type, templateParams } = req.body;

  if (!to || !type || !templateParams) {
    return res.status(400).json({ error: "Missing required fields: to, type, templateParams" });
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_APP_PASSWORD;

  if (!emailUser || !emailPass) {
    console.error("Nodemailer Configuration Error: EMAIL_USER or EMAIL_APP_PASSWORD is not set in environment.");
    return res.status(500).json({ error: "Server email configuration is missing." });
  }

  let htmlTemplate = "";
  if (type === "confirm") {
    htmlTemplate = CONFIRMATION_TEMPLATE;
  } else if (type === "reject") {
    htmlTemplate = REJECTION_TEMPLATE;
  } else {
    return res.status(400).json({ error: `Invalid template type: ${type}` });
  }

  const htmlContent = interpolateTemplate(htmlTemplate, {
    ...templateParams,
    to_email: to
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"OneNotTwo Productions" <${emailUser}>`,
      to,
      subject: subject || (type === "confirm" ? "OneNotTwo — Booking Confirmation" : "OneNotTwo — Payment Verification Failed"),
      html: htmlContent,
    });

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Nodemailer execution error:", error);
    return res.status(500).json({ error: error.message });
  }
}
