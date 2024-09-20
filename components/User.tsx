"use client";

import { useEffect, useState } from 'react';
import { useStore } from '@/store/store'; 
import { useShallow } from 'zustand/react/shallow';

export function User() {
    const [session, setSession] = useState<any>(null);
    console.log(session?.user.id, session?.user.email);
    const { id, email, fetchUser } = useStore(
        useShallow((state) => ({
            id: state.id,
            email: state.email,
            fetchUser: state.fetchUser,
        }))
    );

    useEffect(() => {
        const fetchSession = async () => {
            const res = await fetch('/api/session');
            if (!res.ok) throw new Error('Failed to fetch session');
            const data = await res.json();
            return data.session || null;
        };

        const fetchData = async () => {
            const userSession = await fetchSession();
            setSession(userSession);

            // Call fetchUser with the userSession data
            if (userSession) {
                await fetchUser(userSession.user.id, userSession.user.email);
            }
        };

        fetchData();
    }, [fetchUser]);

    return (
        <div>
            <p>User ID: {id}</p>
            <p>User Email: {email}</p>
        </div>
    );
}
