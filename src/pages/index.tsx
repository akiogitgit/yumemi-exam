import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { PrefectureList } from '../components/PrefectureList'
import { PrefPopulation } from '../types/prefPopulation'
import { Chart } from '../components/Chart'

const Home: NextPage = () => {
  const [choosePref, setChoosePref] = useState<string[]>([])
  const [prefPopulation, setPrefPopulation] = useState<PrefPopulation[]>([])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
        <script src='https://cdn.tailwindcss.com'></script>
      </Head>

      <main>
        <PrefectureList
          choosePref={choosePref}
          setChoosePref={setChoosePref}
          prefPopulation={prefPopulation}
          setPrefPopulation={setPrefPopulation}
        />

        <Chart prefPopulation={prefPopulation} />
      </main>
      <footer></footer>
    </div>
  )
}

export default Home
