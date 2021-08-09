import { mailer } from "../core/mailer"

const html = (hash:string, email:string, code:string) => {
    return `Подтвердить адрес <a href="${process.env.CLIENT_URL}/verifyemail?email=${email}&hash=${hash}">link</a> <p>Код: ${code}</p>`
}

export const sendEmail = ({
    from,
    to,
    subject,
    hash,
    code
    }) => (
        mailer.sendMail({
            from,
            to,
            subject,
            html: html(hash,to,code)
        })
    )

