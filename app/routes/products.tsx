import {json} from "@remix-run/node"; // or cloudflare/deno
import {useLoaderData} from "@remix-run/react";
import {useTranslation} from "react-i18next";

// This tells remix to load the "home" namespace
export let handle = {i18n: "common"};

export async function loader() {
    const res = await fetch("https://axciona.com/api/products?pagination[withCount]=false&pagination[pageSize]=100");
    console.log(res)
    return json(await res.json());
}

export default function ProductsRoute() {
    let {t,i18n} = useTranslation("common");
    const products = useLoaderData<typeof loader>();
    return (
        <div>
            <h1>{t("title")}</h1>
            <ul>
                {products.data.map((product
                ) => (
                    <li key={product.id}>
                        <a href={"product/"+product.id}>{product.attributes.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
