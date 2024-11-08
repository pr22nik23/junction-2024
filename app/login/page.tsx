import React from 'react'
import Login from './components/login'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
    const cookieStore = await cookies();
    const user = cookieStore.get('user')?.value || '';

    if (user) {
        redirect('/');
    }
    return (
        <div>
            <Login />
        </div>
    )
}
