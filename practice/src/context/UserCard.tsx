
import type { User } from '../types'

interface UserCardProps {
    user: User
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <li className="rounded-lg border p-4 shadow-sm border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800" >
            <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">User ID: {user.id}</p>
        </li>
    )
}
