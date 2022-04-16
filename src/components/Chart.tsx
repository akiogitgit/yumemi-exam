import { FC } from 'react'
import { PrefPopulation } from '../types/prefPopulation'

interface Props {
  prefPopulation: PrefPopulation[]
}

export const Chart: FC<Props> = ({ prefPopulation }) => {
  return (
    <>
      <ul className='flex gap-4'>
        {prefPopulation &&
          prefPopulation.map((v, i) => (
            <div key={i}>
              {v.map((value, index) => (
                <li key={index}>
                  {value.year}: {value.value}
                </li>
              ))}
            </div>
          ))}
      </ul>
    </>
  )
}
