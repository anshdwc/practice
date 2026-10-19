export type User = {
    id: number
    name: string
    email: string
    address?: {          // ? means it may be missing
        city: string
        pincode?: string
    }
    favorite?: boolean
}