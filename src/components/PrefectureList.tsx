import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { usePrefectureList } from '../hooks/usePrefectureList'
import { ChoosePrefs } from '../types/choosePrefs'
import { PrefPopulations } from '../types/prefPopulations'

interface Props {
  choosePrefs: ChoosePrefs[]
  setChoosePrefs: Dispatch<SetStateAction<ChoosePrefs[]>>
  prefPopulations: PrefPopulations[]
  setPrefPopulations: Dispatch<SetStateAction<PrefPopulations[]>>
}

export const PrefectureList = ({
  choosePrefs,
  setChoosePrefs,
  prefPopulations,
  setPrefPopulations,
}: Props) => {
  const { prefectures, fetchPrefectures, changePrefectures } =
    usePrefectureList(
      choosePrefs,
      setChoosePrefs,
      prefPopulations,
      setPrefPopulations
    )

  fetchPrefectures()

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
