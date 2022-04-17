import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { ChoosePrefs } from '../types/choosePrefs'
import { Prefectures } from '../types/prefectures'
import { PrefPopulations } from '../types/prefPopulations'

export const usePrefectureList = (
  choosePrefs: ChoosePrefs[],
  setChoosePrefs: Dispatch<SetStateAction<ChoosePrefs[]>>,
  prefPopulations: PrefPopulations[],
  setPrefPopulations: Dispatch<SetStateAction<PrefPopulations[]>>
) => {
  const [prefectures, setPrefectures] = useState<Prefectures[]>([])

  // 都道府県名を取得
  const fetchPrefectures = () => {
    useEffect(() => {
      fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': String(process.env.NEXT_PUBLIC_RESAS_APIKEY) },
      })
        .then((res) => res.json())
        .then((res) => {
          setPrefectures(res.result)
        })
    }, [])
  }
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
      addPrefData(prefCode, prefName)
    }
  }

  return {
    prefectures,
    fetchPrefectures,
    deletePrefData,
    changePrefectures,
  }
}
