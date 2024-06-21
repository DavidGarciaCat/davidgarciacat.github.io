'use client'

import { usePathname } from 'next/navigation'
import { redirect } from 'next/navigation'
import { i18n } from "@/i18n-config";

export default function HomeLayout({children}: {children: React.ReactNode}) {
    const pathname = usePathname()

    if ('/' === pathname) redirect(`/${i18n.defaultLocale}`)

    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
