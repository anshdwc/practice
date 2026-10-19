
import type { User } from '../types'

interface UserCardProps {
    user: User
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <li className="rounded-lg border p-4 shadow-sm">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-400">User ID: {user.id}</p>
        </li>
    )
}
