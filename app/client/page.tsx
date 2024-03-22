"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL =  `https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`;

interface Pokemon {
    id: number;
    name: string;
    url: string;
    image: string; 
}

export default function CLientComponentPokemon() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(API_URL);
            const data = await response.json();
            const fetchedPokemonList: Pokemon[] = [];

            for(const result of data.results){
                const urlParts = result.url.split('/');
                const id = parseInt(urlParts[urlParts.length - 2]);

                const pokemonResponse = await fetch(result.url);
                const pokemonData = await pokemonResponse.json();

                fetchedPokemonList.push({
                    id: id,
                    name: pokemonData.name,
                    url: result.url,
                    image: pokemonData.sprites.front_default
                });

            }
            setPokemonList(fetchedPokemonList);
        };

        fetchData();
    }, []);

    return (
        <div>
            <div>
                <h1>List of all pokemons</h1>
                <ul>
                    {pokemonList.map((pokemon: Pokemon, index: number) => (
                        <li key={index}>
                            <p>{pokemon.name}</p>
                            <img src={pokemon.image} alt="" />
                            <button><Link href={`/client/${pokemon.id}`}>Show details</Link></button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}
