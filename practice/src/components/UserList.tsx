import { useEffect, useState } from 'react'
import type { User } from '../types'
import UserCard from './UserCard'

const API_URL = import.meta.env.VITE_API_URL

function UserList() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [postCount, setPostCount] = useState(0)
    const [search, setSearch] = useState('')

    useEffect(() => {
        async function loadData() {
            try {
                const [usersRes, postRes] = await Promise.all([
                    fetch(`${API_URL}/users`),
                    fetch(`${API_URL}/posts`)
                ])
                if (!usersRes.ok || !postRes.ok) {
                    throw new Error('Could not load users. Please try again.')
                }

                const usersData: User[] = await usersRes.json()
                const postsData: unknown[] = await postRes.json()
                setUsers(usersData)
                setPostCount(postsData.length)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    function toggleFavorite(id: number) {
        setUsers((currentUsers) =>
            currentUsers.map((user) =>
                user.id === id ? { ...user, favorite: !user.favorite } : user
            )
        )
    }

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    )

    const favoriteCount = users.reduce(
        (total, user) => (user.favorite ? total + 1 : total),
        0
    )

    if (loading) {
        return (
            <div
                role="status"
                aria-label="Loading"
                className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"
            />
        )
    }

    if (error) {
        return <p className="text-red-600">{error}</p>
    }

    if (users.length === 0) {
        return <p>No users found.</p>
    }

    return (
        <>

            <p className="mb-4 text-gray-600">
                {users.length} users, {postCount} posts, {favoriteCount} favorites
            </p>

            <label htmlFor="search" className="sr-only">
                Search users by name
            </label>
            <input
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name..."
                className="mb-4 w-full rounded border border-gray-300 p-2"
            />

            {filteredUsers.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {filteredUsers.map((user) => (
                        <UserCard key={user.id}
                            user={user}
                            onToggleFavorite={toggleFavorite} />
                    ))}
                </ul>
            )}
        </>
    )
}

export default UserList