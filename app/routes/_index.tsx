import {json, MetaFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {useTranslation} from "react-i18next";
import i18next from "~/i18next.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};



export async function loader() {
  const res = await fetch("https://axciona.com/api/products?pagination[withCount]=false&pagination[pageSize]=100");

  return json(await res.json());
}



export default function Index() {

  const products = useLoaderData<typeof loader>();
    let {t,i18n} = useTranslation("common");
  return (
      <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
        <h1>{t("title")}</h1>
        <ul>
          {products.data.map((product
          ) => (
              <li key={product.id}>
                <a href={product.html_url}>{product.attributes.name}</a>
              </li>
          ))}
        </ul>
      </div>
  );
}
