
import nodemailer from 'nodemailer'

import appointment_html_template from '@/assets/templates/appointment/appointment.json'
import contact_html_template from '@/assets/templates/contact/contact.json'

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const format = async (
  template: string,
  replacements: Record<string, string>
) => {
  let formatted = String(template)

  for (const key in replacements) {
    const value = replacements[key]
    formatted = formatted.replaceAll(key, value)
  }

  return formatted
}

type Email = {
  from: string
  to: string
  subject: string
}

type TextEmail = Email & {
  text: string
}

type HtmlTemplateEmail = Email & {
  template: string
  replacements: Record<string, string>
}


function send(options: TextEmail) {
  return transporter.sendMail({
    ...options
  })
}

const templates: Record<string, string> = {
  "contact": contact_html_template,
  "appointment": appointment_html_template
}
async function sendTemplate(options: HtmlTemplateEmail) {
  const template = templates[options.template]

  const html = await format(template, options.replacements)

  return transporter.sendMail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: html
  })
}


export { send, sendTemplate }

