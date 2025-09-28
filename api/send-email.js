require("dotenv").config();
const nodemailer = require("nodemailer");
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }


	try{
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user:process.env.SMTP_USER,
				pass:process.env.SMTP_PASS,
			}
		});

		await transporter.sendMail({
			from:process.env.SMTP_USER,
			to:process.env.SMTP_USER,
			subject:"ada order msk",
			text:"ada order baru dari funnel kamu"
		})

		res.status(200).json({message : "Email sent!"})
	}catch (err) {
		console.error(err);
		res.status(500).json({message : "failed to send email!"})
	}
};
