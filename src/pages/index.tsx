import type { NextPage } from 'next'
import React, { useState } from 'react'
import { Chart } from '../components/Chart'
import { Layout } from '../components/Layout'
import { PrefectureList } from '../components/PrefectureList'
import { PrefPopulations } from '../types/prefPopulations'

const Home: NextPage = () => {
  const [prefPopulations, setPrefPopulations] = useState<PrefPopulations[]>([])

  return (
    <Layout>
      <PrefectureList
        prefPopulations={prefPopulations}
        setPrefPopulations={setPrefPopulations}
      />

      <Chart prefPopulations={prefPopulations} />
    </Layout>
  )
}

export default Home
