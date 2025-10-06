'use server'

//import { FormSchema } from './validations'

// Sendgrid setup

const senderEmail = process.env.SENDER_EMAIL
const clientEmail = process.env.CLIENT_EMAIL
const senderName = process.env.SENDER_NAME

export async function submitForm() {
	// 	data: z.infer<typeof FormSchema>,
	// 	emailHtml: string,
	// 	subject: string,
	// ) {
	// 	const { data: validationData, error: validationError } =
	// 		await FormSchema.safeParseAsync(data)
	// 	if (!validationData) {
	// 		return
	// 	}
	// 	if (data.favourite_colour && data.favourite_colour !== '') {
	// 		redirect('/thank-you')
	// 		return
	// 	}
	// 	sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '')
	// 	const options = {
	// 		from: `${senderName} <${senderEmail}>`,
	// 		to: `${senderName} <${clientEmail}>`,
	// 		subject: 'There has been a form submission on SM&E',
	// 		html: emailHtml,
	// 	}
	// 	await sendgrid.send(options)
	// 	redirect('/thank-you')
}
