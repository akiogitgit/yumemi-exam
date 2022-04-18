import type { NextPage } from 'next'
import React, { useState } from 'react'
import Head from 'next/head'
import { PrefectureList } from '../components/PrefectureList'
import { PrefPopulations } from '../types/prefPopulations'
import { Chart } from '../components/Chart'
import { Layout } from '../components/Layout'

const Home: NextPage = () => {
  const [prefPopulations, setPrefPopulations] = useState<PrefPopulations[]>([])

  return (
    <Layout>
      <main>
        <PrefectureList
          prefPopulations={prefPopulations}
          setPrefPopulations={setPrefPopulations}
        />

        <Chart prefPopulations={prefPopulations} />
      </main>
    </Layout>
  )
}

export default Home
