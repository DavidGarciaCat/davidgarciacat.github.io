'use client'

import { usePathname } from 'next/navigation'
import { redirect } from 'next/navigation'
import { i18n } from "@/i18n-config"
import Script from "next/script"

export default function HomeLayout({children}: {children: React.ReactNode}) {
    const pathname = usePathname()

    if ('/' === pathname) redirect(`/${i18n.defaultLocale}`)

    return (
        <html>
            <body>{children}</body>
            <Script defer
                    src="https://cloud.umami.is/script.js"
                    data-website-id="01cc0ffe-5550-492e-8796-33b4327e56dc" />
        </html>
    );
}
