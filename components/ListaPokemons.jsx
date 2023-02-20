import styles from '@/styles/ListaPokemons.module.css';
import Pokemon from '@/components/Pokemon';
import { useEffect, useState } from 'react';
import Image from 'next/image';

function ListaPokemons() {

    const [listaPokemons, setListaPokemons] = useState([]);
    const [pokemonFiltrado, setPokemonFiltrado] = useState(0);
    const [offset, setOffset] = useState(0);
    const [pokemonSelecionado, setPokemonSelecionado] = useState(false);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=12&offset=' + offset)
        .then((response) => response.json())
        .then((data) => setListaPokemons(data.results))
    }, [offset])

    function Proximo() {
        if(pokemonFiltrado==0){
            setOffset(offset + 12);
        }
    }

    function Anterior(){
        if(offset >= 12 && pokemonFiltrado==0){
            setOffset(offset - 12);
        }
    }

    function Pesquisar(name) {
        name = name.toLowerCase()
        if(name.length > 0){
            fetch('https://pokeapi.co/api/v2/pokemon/' + name)
            .then((response) => response.json())
            .then((data) => setPokemonFiltrado(data))
            .catch((e) => console.error("Não encontrado!"))
        } else{
            setPokemonFiltrado(0);
        }
    }

    function SelicionarPokemon(id){
        fetch('https://pokeapi.co/api/v2/pokemon/' + id)
            .then((response) => response.json())
            .then((data) => setPokemonSelecionado(data))
    }

    function LimparSelecao(){
        setPokemonSelecionado(false);
    }

    return(
        <>
            <section className={styles.mainContainer}>
                <section className={styles.listaPokemonsContainer}>
                    <section className={styles.inputSection}>
                        <input className={styles.campoPesquisa} type="text" name="nomeProduto" id="nomeProduto" placeholder='pesquisar' onChange={(e) => Pesquisar(e.target.value)}/>
                    </section>
                    
                    <section className={styles.ListaDosPokemons}>
                        { pokemonFiltrado==0 && listaPokemons.map((pokemon) => (
                            <Pokemon key={pokemon.url.slice(34,-1)} nomePokemon={pokemon.name} id={pokemon.url.slice(34,-1)} event={SelicionarPokemon}/>
                        ))}
                        {
                            pokemonFiltrado!=0 && 
                            <Pokemon key={pokemonFiltrado.id} nomePokemon={pokemonFiltrado.name} id={pokemonFiltrado.id} event={SelicionarPokemon}/>
                        }
                    </section>
                    <section className={styles.containerPokemonsControler}>
                        <button className={styles.botaoControle} onClick={Anterior}>Anterior</button>
                        <button className={styles.botaoControle} onClick={Proximo}>Próximo</button>
                    </section>
                </section>
                { !!pokemonSelecionado &&
                        <section className={styles.pokemonSelecionado}>
                            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonSelecionado.id}.png`} height={250} width={250} priority alt='Imagem de pokemon' className={styles.imagemSelecionado}/>
                            <span className={styles.pokemonInfos}>{pokemonSelecionado.name}</span>
                            <span className={styles.pokemonInfos}>ID: {pokemonSelecionado.id}</span>
                            <span className={styles.pokemonInfos}>Height: {pokemonSelecionado.height}</span>
                            <span className={styles.pokemonInfos}>Weight: {pokemonSelecionado.weight}</span>
                            <section className={styles.abilitiesBox}>
                                <span className={styles.pokemonInfos}>Habilidades</span>
                                {pokemonSelecionado.abilities.map((habilidades, index) => (
                                    <span className={styles.ability} key={index}>{habilidades.ability.name}</span>
                                ))}
                            </section>
                            <button className={styles.closeButton} onClick={LimparSelecao}>Fechar</button>
                    </section>
                }
            </section>
        </>
    )
}

export default ListaPokemons;

