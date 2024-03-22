import Link from "next/link";

interface PokemonDetails {
    id: number;
    name: string;
    height: string;
    weight: string;
    types: { name: string; url: string }[];
    order: number;
}
async function getPokemon(id: number) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.json();
}

export default async function AboutPokemon({
    params: { id },
}: {
    params: { id: number }
}) {
    const pokemonData = getPokemon(id);

    const [pokemon] = await Promise.all([pokemonData]);

    return (
        <div>
            {pokemon && (
                <>
                    <h1>name: {pokemon.name}</h1>
                    <p>height: {pokemon.height}</p>
                    <p>weight: {pokemon.weight}</p>
                    <p>order: {pokemon.order}</p>
                    <p>
                        types:{' '}
                        {pokemon.types.map((type: { name: string; url: string }, index: number) => (
                            <span key={index}>
                                {type.name}
                                {index !== pokemon.types.length - 1 && ', '}
                            </span>
                        ))}
                    </p>
                    <button><Link href='/server'>View List</Link></button>
                </>
            )}
        </div>
    );
}