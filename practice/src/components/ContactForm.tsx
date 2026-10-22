import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

const API_URL = import.meta.env.VITE_API_URL

type ContactFormData = {
    name: string
    email: string
    message: string
}

type FormErrors = Partial<ContactFormData>

const emptyForm: ContactFormData = { name: '', email: '', message: '' }

const inputClass = 'w-full rounded border border-gray-300 p-2'

function validate(values: ContactFormData): FormErrors {
    const errors: FormErrors = {}

    if (!values.name.trim()) {
        errors.name = 'name is required'
    }

    if (!values.email.trim()) {
        errors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = " enter valid email like name@example.com"
    }

    if (!values.message.trim()) {
        errors.message = 'Message is required'
    } else if (values.message.trim().length < 10) {
        errors.message = "Message at least be 10 characters"
    }
    return errors
}

function ContactForm() {

    const [formData, setFormData] = useState<ContactFormData>(emptyForm)
    const [errors, setErrors] = useState<FormErrors>({})
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [submitError, setSubmitError] = useState('')
    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const field = e.target.name as keyof ContactFormData
        const value = e.target.value
        setFormData((current) => ({ ...current, [field]: value }))

        setErrors((current) => ({ ...current, [field]: undefined }))
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSent(false)
        setSubmitError('')

        const validateErrors = validate(formData)
        setErrors(validateErrors)
        if (Object.keys(validateErrors).length > 0) return

        try {
            setSending(true)
            const response = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('Could not send your message. Please try again.')
            }

            setSent(true)
            setFormData(emptyForm)
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setSending(false)
        }
        console.log("Form is valid ", formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
                <label htmlFor="name" className="mb-1 block font-medium">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                    <p id='name-error' className='mt-1 text-sm text-red-600'>{errors.name}</p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="mb-1 block font-medium">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                    <p id='email-error' className='mt-1 text-sm text-red-600'>{errors.email}</p>
                )}
            </div>

            <div>
                <label htmlFor="message" className="mb-1 block font-medium">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={inputClass}
                />
                {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600">
                        {errors.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={sending}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {sending ? 'Sending..' : 'Send Message'}
            </button>

            {sent && (
                <p role='status' className='text-green-700'>Message Sent</p>
            )}

            {submitError && (
                <p role='alert' className='text-red-600'>{submitError}</p>
            )}
        </form>
    )
}

export default ContactForm