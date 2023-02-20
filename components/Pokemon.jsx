import styles from '@/styles/Pokemon.module.css'
import Image from 'next/image';

function Pokemon(props) {

    function SelecionandoPokemon(){
        props.event(props.id)
    }

    return(
        <>
            <section className={styles.Pokemon}>
                <section className={styles.imagemContainer}>
                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${props.id}.png`} height={80} width={80} priority alt='Imagem de pokemon'/>
                </section>
                <span className={styles.nomePokemon}>{props.nomePokemon}</span>
                <button className={styles.botaoExpandir} onClick={SelecionandoPokemon}>Ver</button>
            </section>
        </>
    )
}

export default Pokemon;
