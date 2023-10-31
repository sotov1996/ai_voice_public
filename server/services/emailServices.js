const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    pool: true,
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    },
});

const sendEmail = async ({ email, text, content }) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'You VO affirmation ready to download',
        html: `
          <div>
            Hey,<br></br><br></br>
            First off, I want to give you a major shout-out for taking the step towards personal growth and affirming your future! 🚀<br></br><br></br>
            Your custom voiceover is not just a recording – it's your personal anthem. Your rally cry. Your "I'm gonna crush it" mantra.<br></br><br></br>
            📲 Go ahead and upload that bad boy to your phone, or save it straight to your Telegram messages.<br></br><br></br>
            Here's a game plan for you:<br></br><br></br>
            🌳 Going for a reflective walk in the park? Press play.<br></br><br></br>
            🚗 Hitting the road? Let your affirmation fill up the car.<br></br><br></br>
            💪 Crushing your workout? Use this as your ultimate pump-up track.<br></br><br></br>
            Remember, the more you hear it, the more it'll become a part of you. Dive deep into these affirmations. Let them soak into your very being, and watch how they transform not just your days, but your life.<br></br><br></br>
            Let's crush it together!<br></br><br></br>
            To your success and beyond,<br></br><br></br>
            Andrew from <a href="https://www.myaffirmation.ai/">MyAffirmation.ai</a><br></br><br></br>
            Find the attached file below.<br></br><br></br>
            You text of the Voice Over<br></br><br></br>
            "${text}"
          </div>
          `,
          attachments: [{
            filename: "audio.mp3",
            content
        }]
      }
    const resp = await transporter.sendMail(mailOptions);
    return resp
}

module.exports = {
    sendEmail
}