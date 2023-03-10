import Head from 'next/head'
import { Inter } from '@next/font/google'
import ListaPokemons from '@/components/ListaPokemons'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Poke Search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ListaPokemons/>
    </>
  )
}
