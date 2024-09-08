import { sendTemplate } from '@/services/emailer'

type AppointmentBody = {
    appointment: AppointmentDetails
    customer: CustomerDetails
}

type AppointmentDetails = {
    name: string,
    value: number,
    duration: number
}

type CustomerDetails = {
    name: string
    date: Date,
    email: `${string}@${string}.${string}`,
    whatsapp: string

}

const POST = async (req: Request): Promise<Response> => {

    try {

        const body = await req.json() as AppointmentBody

        const info = await sendTemplate({
            from: `${body.customer.name} <${body.customer.email}>`,
            to: process.env.EMAIL_TO!,
            subject: 'Reserva de terapia',
            template: 'appointment',
            replacements: {
                "${service}": body.appointment.name,
                "${cost}": new String(body.appointment.value).toString(),
                "${duration}": new String(body.appointment.duration).toString(),
                "${name}": body.customer.name,
                "${date}": new Date(body.customer.date).toString(),
                "${email}": body.customer.email,
                "${whatsapp}": body.customer.whatsapp
            }
        })
        return Response.json(`Email sent successfully ${info.response}`)

    } catch (error) {
        console.warn(error)
        return new Response(
            JSON.stringify(error),
            {
                status: 500
            })
    }
}

export { POST }

