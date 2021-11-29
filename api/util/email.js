import testEmailService from "./email.debug.js"
import useEmailService from "./sendgrid.service.js"
export default async function(emailObj) {
    if (process.env.NODE_ENV === "production") {
        await useEmailService(emailObj);
        return;
    }

    await testEmailService(emailObj);
}