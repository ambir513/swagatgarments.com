import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL,
    pass: process.env.NEXT_PUBLIC_PASS,
  },
});

export const sendEmail = async (data: {
  to: string;
  subject: string;
  displayName: string;
  meta: {
    description: string;
    link: string;
  };
}) => {
  const mailOptions = {
    from: `"${data.displayName}" <${process.env.NEXT_PUBLIC_EMAIL}>`,
    to: data.to,
    subject: data.subject,
    html: `
            <p>${data.meta.description}</p>
            <a href="${data.meta.link}">Click here</a>
        `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
