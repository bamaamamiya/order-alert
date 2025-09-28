require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
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
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #ffffff; color: #111; border: 1px solid #e5e5e5;">
  <h2 style="font-size: 20px; font-weight: 600; border-bottom: 1px solid #e5e5e5; padding-bottom: 16px; margin-bottom: 24px;">Konfirmasi Pesanan Baru</h2>
  
  <p style="margin-bottom: 24px;">Anda telah menerima pesanan baru. Silakan proses informasi berikut:</p>
  
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; font-size: 14px;">
    <tr><td style="padding: 8px 0;">Nama</td><td align="right">${name}</td></tr>
    <tr><td style="padding: 8px 0;">No. HP</td><td align="right">${whatsapp}</td></tr>
    <tr><td style="padding: 8px 0; vertical-align: top;">Alamat</td><td align="right" style="white-space: pre-line;">${address}</td></tr>
    <tr><td style="padding: 8px 0;">Tanggal Order</td><td align="right">${order_date}</td></tr>
  </table>

  <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 16px;">Detail Produk</h3>
  <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; background-color: #fafafa; border: 1px solid #ddd; border-radius: 6px; overflow: hidden; margin-bottom: 24px;">
    <tr style="background-color: #f9f9f9; border-bottom: 1px solid #e0e0e0;">
      <td style="padding: 12px;">${product_title}</td>
      <td style="padding: 12px;" align="right">Rp${price}</td>
    </tr>
    <tr><td style="padding: 12px;">Biaya Pengiriman</td><td style="padding: 12px;" align="right">Rp0</td></tr>
    <tr><td colspan="2" style="border-top: 1px dashed #ccc;"></td></tr>
    <tr style="background-color: #f5f5f5;">
      <td style="padding: 16px; font-weight: bold;">Total</td>
      <td style="padding: 16px; font-weight: bold;" align="right">Rp${total}</td>
    </tr>
  </table>

  <a href="https://wa.me/${whatsapp}" target="_blank" style="display: inline-block; background-color: #000; color: #fff; text-decoration: none; font-weight: 500; padding: 12px 24px; border-radius: 4px; font-size: 14px;">Hubungi Pelanggan</a>

  <p style="font-size: 12px; color: #777777; margin-top: 32px; text-align: center;">
    Email ini dikirim otomatis dari <strong>thruvshop.vercel.app</strong>.<br/>
    Mohon segera follow up pesanan melalui dashboard atau WhatsApp.
  </p>
</div>
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
