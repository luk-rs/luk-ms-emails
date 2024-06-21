import { sendTemplate } from "@/services/emailer"

type ContactBody = {
  name: string
  email: string
  location: string
  words: string
}

const POST = async (req: Request) => {
  try {

    const body = await req.json() as ContactBody;

    const info = await sendTemplate({
      from: `${body.name} <${body.email}>`,
      to: process.env.EMAIL_TO!,
      subject: 'Contacto Site',
      template: 'contact',
      replacements: {
        "${name}": body.name,
        "${email}": body.email,
        "${location}": body.location,
        "${words}": body.words.replaceAll("\n", "<br>"),
      }
    })
    return Response.json(`Email sent successfully ${info.response}`)
  } catch (error) {
    return new Response(
      JSON.stringify(error),
      {
        status: 500
      })
  }
}

export { POST }

