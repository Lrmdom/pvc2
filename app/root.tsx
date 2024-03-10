

import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation, withTranslation, Trans } from 'react-i18next'

import i18next from "~/i18next.server";
import {json, MetaFunction} from "@remix-run/node";
import {Link,useLoaderData} from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader({ request }: LoaderArgs) {
    let locale = await i18next.getLocale(request);
    return json({ locale });
}

export let handle = {
    // In the handle export, we can add a i18n key with namespaces our route
    // will need to load. This key can be a single string or an array of strings.
    // TIP: In most cases, you should set this to your defaultNS from your i18n config
    // or if you did not set one, set it to the i18next default namespace "translation"
    i18n: "common",
};

// Component using the Trans component
function MyComponent({ t }) {
    return (
        <Trans t={t} i18nKey="description.part1">
        </Trans>
    )
}

export default function App() {
    // Get the locale from the loader
    let { locale } = useLoaderData<typeof loader>();

    let {t,i18n} = useTranslation("common");
    const { lngs } = {
        lngs: {
            en: { nativeName: 'English' },
            es: { nativeName: 'Español' },
            pt: { nativeName: 'Português' }
        }
    }

    const changeLanguage = (language) => {
        i18n.changeLanguage(language, (error) => {
            console.log(error);
        });
    };

  return (
      <html lang={locale} dir={i18n.dir()}>
      <title>{t("title")}</title>
      <head>

          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <Meta/>
          <Links/>
      </head>
      <body>
      <div>
          {Object.keys(lngs).map((lng) => (
              <Link
                  key={lng}
                  style={{marginRight: 5, fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal'}}
                  to={`/?lng=${lng}`}
                  onClick={() => changeLanguage(lng)}
              >
                  {lngs[lng].nativeName}
              </Link>
          ))}
      </div>
      <MyComponent t={t}/>
      <Outlet/>
      <ScrollRestoration/>
      <Scripts/>
      <LiveReload/>
      </body>
      </html>
  );
}