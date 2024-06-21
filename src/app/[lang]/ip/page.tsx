import {Locale} from "@/i18n-config";
import {getDictionary} from "@/get-dictionary";

export default async function IpAddressPage({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    // A Simple Public IP Address API (https://www.ipify.org/)
    const uri = 'https://api.ipify.org?format=json';
    const response = await fetch(uri, { cache: 'no-store' });
    const json = await response.json();

    return (
        <>
            <section className="resume-section" id="whyme">
                <div className="resume-section-content">
                    <h2 className="mb-5">{dictionary.pages.ip.page.title}</h2>
                    <p className="mb-3">{json.ip}</p>
                </div>
            </section>
        </>
    );
}
