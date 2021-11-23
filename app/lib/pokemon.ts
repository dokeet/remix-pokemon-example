export const getPokemon = async (id: string) => {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return data.json();
};

export const getAllPokemons = async () => {
  const data = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
  ).json();
  const allPokemons = Promise.all(
    data.results.map(async (pokemon: any) => {
      const pokemonData = await fetch(pokemon.url);
      return pokemonData.json();
    })
  );
  return allPokemons;
};
