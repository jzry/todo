import testEmailService from "./test_email.js"

export default async function (emailObj) {
    if (process.env.NODE_ENV === "production") {
        await useEmailService(emailObj);
        return;
    }
        
    await testEmailService(emailObj);
}

