import { Dispatch, FC, SetStateAction, useEffect, useState, VFC } from 'react'
import { Prefectures } from '../types/prefectures'
import { PrefPopulation } from '../types/prefPopulation'

interface Props {
  choosePref: string[]
  setChoosePref: Dispatch<SetStateAction<string[]>>
  prefPopulation: PrefPopulation[]
  setPrefPopulation: Dispatch<SetStateAction<PrefPopulation[]>>
}

export const PrefectureList: VFC<Props> = ({
  choosePref,
  setChoosePref,
  prefPopulation,
  setPrefPopulation,
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
  const addPrefData = (pref_id: string) => {
    fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${pref_id}`,
      {
        headers: {
          'X-API-KEY': String(process.env.NEXT_PUBLIC_RESAS_APIKEY),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setPrefPopulation([...prefPopulation, res.result.data[0].data])
      })
  }

  // 指定された都道府県のデータを削除
  const deletePrefData = (deleteIndex: number) => {
    const newData: PrefPopulation[] = prefPopulation
    newData.splice(deleteIndex, 1)
    setPrefPopulation([...newData])
  }

  const changePrefectures = (pref_id: string) => {
    // チェックが外れる時
    if (choosePref.includes(pref_id)) {
      const deleteIndex = choosePref.indexOf(pref_id)
      const newArr = choosePref
      newArr.splice(deleteIndex, 1)
      setChoosePref(newArr)
      deletePrefData(deleteIndex)
      return
    }
    setChoosePref([...choosePref, pref_id])
    addPrefData(pref_id)
  }

  return (
    <div>
      <ul className='flex flex-wrap gap-4'>
        {prefectures &&
          prefectures.map((v, i) => (
            <li
              className='flex items-center'
              key={i}
              onChange={() => changePrefectures(String(v.prefCode))}
            >
              <input type='checkbox' name='' id={v.prefName} />
              <label htmlFor={v.prefName}>
                {v.prefCode}. {v.prefName}
              </label>
            </li>
          ))}
      </ul>
    </div>
  )
}
