import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import { getAllPokemons } from "~/lib/pokemon";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async () => {
  const data: any = await getAllPokemons();
  // this is just so we don't send that much data to the client
  const cleanData = data.map(({ id, name, sprites }: any) => ({
    id,
    name,
    sprites,
  }));
  // https://remix.run/api/remix#json
  return json(cleanData, {
    headers: {
      "Cache-Control": "max-age=60, s-maxage=3600, stale-while-revalidate=3600",
    },
  });
};

export function headers() {
  return {
    "Cache-Control": "max-age=60, s-maxage=3600, stale-while-revalidate=3600",
  };
}

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Pokemon",
    description: "This is a pokedex-type of thingy",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<any>();
  return (
    <div className="flex flex-wrap max-w-5xl w-full mx-auto items-center justify-center gap-2">
      {data.map((pokemon: any) => (
        <Link className="text-white" to={`${pokemon.name}`} key={pokemon.name}>
          <div className="w-full max-w-xs bg-pink-300 rounded-lg shadow-lg p-12 flex flex-col justify-between items-center">
            <h2 className="font-bold text-2xl capitalize">{pokemon.name}</h2>
            <img
              src={pokemon.sprites.other.home.front_default}
              height="50px"
              width="auto"
              className="drop-shadow-lg"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
