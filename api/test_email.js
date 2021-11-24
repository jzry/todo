import nodemailer from "nodemailer";

// use something like ethereal to test email
export default async function (email) {
    let acc = await nodemailer.createTestAccount();

    let transport = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: acc.user,
            pass: acc.pass
        }
    });

    let emailInfo = await transport.sendMail({
        from: "noreply@todo.list",
        to: email.address,
        subject: email.subject || "No Subject",
        text: email.txt || "No text provided",
        html: email.html || "<em>No HTML</em>"
    });

    console.log("Preview email: %s", nodemailer.getTestMessageUrl(emailInfo));
}