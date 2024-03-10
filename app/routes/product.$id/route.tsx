import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

export async function loader()  {
    const res = await fetch("https://axciona.com/api/products/2");
    console.log(res)
    return json(await res.json());
}

export default function ProductsRoute() {
    const product = useLoaderData<typeof loader>();
    console.log(product)
    return (
        <ul>

                <li key={product.id}>
                    <a href={product.id}>{product.data.attributes.name}</a>
                </li>

        </ul>
    );
}
