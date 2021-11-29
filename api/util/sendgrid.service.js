import sgMail from "@sendgrid/mail"

export default async function (email) {


    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: email.address, // Change to your recipient
        from: 'FlourishTodo@protonmail.com', // Change to your verified sender
        subject: email.subject,
        text: email.txt,
        html: email.html,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}