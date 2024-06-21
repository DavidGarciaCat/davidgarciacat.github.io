'use client'

import { usePathname } from 'next/navigation'
import { redirect } from 'next/navigation'

export default function HomePage({}) {
    const pathname = usePathname()

    // redirect('/ca')

    return (
        <>
            <h1>Home page</h1>
            <h2>{pathname}</h2>
        </>
    );
}
