import Link from "next/link";
const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`;

interface Pokemon{
    id: number;
    name: string;
    url: string;
    image: "sprites.front_default";
}

export default async function ServerComponentPokemon(){
    const response = await fetch(API_URL);
    const data = await response.json();

    return(
        <div>
            <div>
                <h1>List of all pokemons</h1>
                <ul>
                {data.results.map((pokemon: Pokemon, index: number) => {
                    const urlParts = pokemon.url.split('/');
                    const id = urlParts[urlParts.length - 2];

                    return (
                        <li key={index}>
                            <p>{pokemon.name}</p>
                            <p>{id}</p>
                            <img src={pokemon.image} alt="" />
                            <button><Link href={`/server/${id}`}>Show details</Link></button>
                        </li>
                    );
                })}
                </ul>
            </div>
        </div>
    )
}
