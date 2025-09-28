require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  // 🔹 Tambahin header CORS di paling atas handler
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, whatsapp, address, order_date, product_title, price, total } =
    req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlTemplate = `
      <div>… (template kamu tetap) …</div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `New Order Received – ${name}`,
      html: htmlTemplate,
    });

    res.status(200).json({ message: "Email sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed to send email!" });
  }
};
