import type IPageRequest from '../interfaces/IPageRequest';
import type IPageResponse from '../interfaces/IPageResponse';
import type Pokemon from '../interfaces/IPokemon';

export async function getDataAsync({
  page,
  limit,
}: IPageRequest): Promise<Array<Pokemon>> {
  const response: Array<Pokemon> = [];
  const offset = (page - 1) * limit;
  const queryString = `?offset=${offset}&limit=${limit}`;
  const data: IPageResponse = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon${queryString}`)
  ).json();
  for (const result of data.results) {
    const pokemonDetails = await (await fetch(result.url)).json();
    for (const { ability } of pokemonDetails.abilities) {
      const abilityDetails = await (await fetch(ability.url)).json();

      ability.description = abilityDetails.flavor_text_entries.filter(
        (e: { language: { name: string } }) => e.language.name === 'en'
      )[0].flavor_text;
    }
    response.push(pokemonDetails);
  }
  return response;
}
