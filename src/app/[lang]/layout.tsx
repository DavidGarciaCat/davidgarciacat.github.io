import { i18n, type Locale } from "@/i18n-config";
import {getDictionary} from "@/get-dictionary";
import LocaleSwitcher from "@/components/locale-switcher";
import Link from "next/link";
import Script from "next/script";
import "../globals.css";
import Image from "next/image";
import profilePicture from "@/../public/images/profile-x400.jpg";

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Root({
   children,
   params,
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(params.lang);

    return (
        <html lang={params.lang}>
        <body id="page-top">

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">
                <span className="d-block d-lg-none">Clarence Taylor</span>
                <span className="d-none d-lg-block">
                    <Image className={"img-fluid img-profile rounded-circle mx-auto mb-2"}
                           src={profilePicture}
                           alt={"David Garcia's profile picture"}
                           width={300} height={300}/>
                    {/* <img className="img-fluid img-profile rounded-circle mx-auto mb-2"
                         src="/images/profile.jpg"
                         alt="David Garcia's profile picture"/> */}
                </span>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        {dictionary.i18n.locales.map((locale: string, localeIndes: number) => (
                            <Link key={localeIndes}
                                  className={"nav-link js-scroll-trigger"}
                                  style={{display: "inline-block"}}
                                  href={"/" + locale.iso_639_2}>
                                <span className={"flag-icon flag-icon-" + locale.flag}></span>
                            </Link>
                        ))}
                    </li>
                    <li className="nav-item"><Link className="nav-link js-scroll-trigger" href={"/" + params.lang + "#about"}>{dictionary.navbar.about}</Link></li>
                    <li className="nav-item"><Link className="nav-link js-scroll-trigger" href={"/" + params.lang + "#whyme"}>{dictionary.navbar.why}</Link></li>
                    <li className="nav-item"><Link className="nav-link js-scroll-trigger" href={"/" + params.lang + "#experience"}>{dictionary.navbar.experience}</Link></li>
                    <li className="nav-item"><Link className="nav-link js-scroll-trigger" href={"/" + params.lang + "#volunteering"}>{dictionary.navbar.volunteering}</Link></li>
                    <li className="nav-item"><Link className="nav-link js-scroll-trigger" href={"/" + params.lang + "#education"}>{dictionary.navbar.education}</Link></li>
                    <li className="nav-item"><Link className="nav-link js-scroll-trigger" href={"/" + params.lang + "#skills"}>{dictionary.navbar.skills}</Link></li>
                </ul>
            </div>
        </nav>

        <div className="container-fluid p-0">
            {children}
        </div>

        <Script src={"https://use.fontawesome.com/releases/v6.3.0/js/all.js"}/>
        <Script src={"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"}/>
        <Script src={"js/scripts.js"}/>

        </body>
        </html>
    );
}
