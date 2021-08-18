import { mailer } from "../core/mailer"

const html = (userId:string, email:string, code:string) => {
    return `Подтвердить адрес <a href="${process.env.CLIENT_URL}/verifyemail?email=${email}&id=${userId}">link</a> <p>Код: ${code}</p>`
}

export const sendEmail = ({
    from,
    to,
    subject,
    userId,
    code
    }) => (
        mailer.sendMail({
            from,
            to,
            subject,
            html: html(userId,to,code)
        })
    )

