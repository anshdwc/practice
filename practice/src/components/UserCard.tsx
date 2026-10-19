
import type { User } from '../types'

interface UserCardProps {
    user: User
    onToggleFavorite: (id: number) => void
}

export default function UserCard({ user, onToggleFavorite }: UserCardProps) {
    const { id, name, email, address, favorite } = user
    return (
        <li className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className=" text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-400">User ID: {address?.city}</p>
            <p className='text-sm text-gray-600 '>
                Pincode : {address?.pincode ?? 'Not Available'}
            </p>

            <button
                type="button"
                onClick={() => onToggleFavorite(id)}
                aria-pressed={favorite}
                className="mt-3 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
                {favorite ? '★ Favorite' : '☆ Add to favorites'}
            </button>
        </li>
    )
}
