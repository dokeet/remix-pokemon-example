import { LoaderFunction, useLoaderData, json } from "remix";
import { getPokemon } from "~/lib/pokemon";
import invariant from "tiny-invariant";

export let loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, "params is required");
  const data = await getPokemon(params.id);
  return json(data, {
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

export default function JokeRoute() {
  const data = useLoaderData();
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-red-300">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-4xl capitalize font-bold">
          {data.name}
        </h1>
        <p className="text-white">weight: {data.weight}</p>
        <p className="text-white">height: {data.height}</p>
        <img
          src={data.sprites.other.home.front_default}
          className="max-w-xs h-auto drop-shadow-lg"
        />
      </div>
    </div>
  );
}
