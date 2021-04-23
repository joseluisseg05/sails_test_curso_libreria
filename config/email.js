module.exports.email = { 
    service: "Mailgun",
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    templateDir: "api/templates", 
    from: "no-replay@seg.com", 
    testMode: false, 
    ssl: false 
}