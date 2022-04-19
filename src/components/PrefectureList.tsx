import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Prefectures } from '../types/prefectures'
import { PrefPopulations } from '../types/prefPopulations'

interface Props {
  prefPopulations: PrefPopulations[]
  setPrefPopulations: Dispatch<SetStateAction<PrefPopulations[]>>
}

export const PrefectureList: FC<Props> = ({
  prefPopulations,
  setPrefPopulations,
}) => {
  const [prefectures, setPrefectures] = useState<Prefectures[]>([])

  // 都道府県名を取得
  useEffect(() => {
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: { 'X-API-KEY': String(process.env.NEXT_PUBLIC_RESAS_APIKEY) },
    })
      .then((res) => res.json())
      .then((res) => {
        setPrefectures(res.result)
      })
  }, [])

  // 都道府県のデータを取得
  const addPrefData = (prefCode: string, prefName: string) => {
    fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
      {
        headers: {
          'X-API-KEY': String(process.env.NEXT_PUBLIC_RESAS_APIKEY),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setPrefPopulations([
          ...prefPopulations,
          { data: res.result.data[0].data, prefName: prefName },
        ])
      })
  }

  // 指定された都道府県のデータを削除
  const deletePrefData = (deleteIndex: number) => {
    const newData: PrefPopulations[] = prefPopulations
    newData.splice(deleteIndex, 1)
    setPrefPopulations([...newData])
  }

  const changePrefectures = (prefCode: string, prefName: string) => {
    let flug = true
    prefPopulations.map((object, index) => {
      if (object.prefName === prefName && flug) {
        deletePrefData(index)
        flug = false
      }
    })
    if (flug) {
      addPrefData(prefCode, prefName)
    }
  }

  return (
    <section>
      <span className='section-title'>都道府県</span>
      <ul>
        {prefectures &&
          prefectures.map((v, i) => (
            <li
              key={i}
              onChange={() => changePrefectures(String(v.prefCode), v.prefName)}
            >
              <input type='checkbox' id={v.prefName} />
              <label htmlFor={v.prefName}>{v.prefName}</label>
            </li>
          ))}
      </ul>
    </section>
  )
}
