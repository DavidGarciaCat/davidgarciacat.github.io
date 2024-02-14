import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import LocaleSwitcher from "@/components/locale-switcher";

export default async function IndexPage({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    return (
        <div>
            <p>Current locale: {lang}</p>
            <p>Current language: {dictionary.current.locale}</p>
            <hr/>

            <LocaleSwitcher/>
            <hr/>

            <p dangerouslySetInnerHTML={{__html: dictionary.pages.root.body.tldr_backend}}/>
        </div>
    );
}
