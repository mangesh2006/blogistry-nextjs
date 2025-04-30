import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const SendMail = async (email: string, otp: string) => {
  const htmlPath = path.join(process.cwd(), "email", "email.html");
  let htmlcontent = fs.readFileSync(htmlPath, "utf8");

  htmlcontent = htmlcontent.replace("{{code}}", otp);
  const info = await transport.sendMail({
    from: `"noreply" <${process.env.USER_EMAIL}>`,
    to: email,
    subject: "Verify Email",
    html: htmlcontent,
  });
};

export default SendMail;
