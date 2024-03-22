"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

interface PokemonDetails {
    id: number;
    name: string;
    height: string;
    weight: string;
    types: { name: string; url: string }[];
    order: number;
    sprites: {
        front_default: string;
    }
}

async function getPokemon(id: number) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.json();
}

export default function AboutPokemon({
    params: {id},
} : {
    params: {id: number};
}){
    const [pokemon, setpokemon] = useState<PokemonDetails | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            const pokemonData = await getPokemon(id);
            setpokemon(pokemonData);
        };

        fetchPokemon();
    }, [id]);

    return (
        <div>
            {pokemon && (
                <>
                    <h1>name: {pokemon.name}</h1>
                    {pokemon.sprites && (
                        <img
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                        />
                    )}
                    <p>height: {pokemon.height}</p>
                    <p>weight: {pokemon.weight}</p>
                    <p>order: {pokemon.order}</p>
                    <p>
                        types:{' '}
                        {pokemon.types.map((type, index) => (
                            <span key={index}>
                                {type.name}
                                {index !== pokemon.types.length - 1 && ', '}
                            </span>
                        ))}
                    </p>
                    <button><Link href='/client'>View List</Link></button>
                </>
            )}
        </div>
    );

}