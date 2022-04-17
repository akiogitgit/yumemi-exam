import { Dispatch, FC, SetStateAction, useEffect, useState, VFC } from 'react'
import { ChoosePrefs } from '../types/choosePrefs'
import { Prefectures } from '../types/prefectures'
import { PrefPopulations } from '../types/prefPopulations'

interface Props {
  // choosePrefs: string[]
  // setChoosePrefs: Dispatch<SetStateAction<string[]>>
  choosePrefs: ChoosePrefs[]
  setChoosePrefs: Dispatch<SetStateAction<ChoosePrefs[]>>
  prefPopulations: PrefPopulations[]
  setPrefPopulations: Dispatch<SetStateAction<PrefPopulations[]>>
}

export const PrefectureList: FC<Props> = ({
  choosePrefs,
  setChoosePrefs,
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
  const addPrefData = (prefCode: string) => {
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
        setPrefPopulations([...prefPopulations, res.result.data[0].data])
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
    // チェックが外れる時
    choosePrefs.forEach((object, index) => {
      if (object.prefCode === prefCode && flug) {
        const deleteIndex = index
        const newArr = choosePrefs
        newArr.splice(deleteIndex, 1)
        setChoosePrefs(newArr)
        deletePrefData(deleteIndex)
        flug = false
      }
    })
    if (flug) {
      setChoosePrefs([
        ...choosePrefs,
        { prefCode: prefCode, prefName: prefName },
      ])
      addPrefData(prefCode)
    }
  }

  console.log('chooseP', choosePrefs)
  console.log('prefP', prefPopulations)
  return (
    <div>
      <ul className='flex flex-wrap gap-4'>
        {prefectures &&
          prefectures.map((v, i) => (
            <li
              className='flex items-center'
              key={i}
              onChange={() => changePrefectures(String(v.prefCode), v.prefName)}
            >
              <input type='checkbox' id={v.prefName} />
              <label htmlFor={v.prefName}>
                {v.prefCode}. {v.prefName}
              </label>
            </li>
          ))}
      </ul>
    </div>
  )
}
