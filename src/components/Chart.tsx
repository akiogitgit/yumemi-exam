import { FC } from 'react'
import { PrefPopulation } from '../types/prefPopulation'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

interface Props {
  prefPopulation: PrefPopulation[]
}

export const Chart: FC<Props> = ({ prefPopulation }) => {
  let yearArr = []
  let series = [{}]
  if (prefPopulation[0]) {
    yearArr = prefPopulation[0].map((v, i) => {
      return v.year
    })
    // const valueArr = {
    //   name: '都道府県名',
    //   data: prefPopulation[0].map((v, i) => {
    //     return v.value
    //   }),
    //   pointPlacement: 'on',
    // }

    // const dataArr = [prefPopulation.map((v, i) => {
    //   {
    //     name: '都道府県名',
    //     data: prefPopulation[0].map((v2, i2) => {
    //       return v2.value
    //     }),
    //     pointPlacement: 'on',
    //   },
    // })]
    prefPopulation.map((v, i) => {
      series.push({
        name: '都道府県名',
        data: v.map((v2, i2) => {
          return v2.value
        }),
        pointPlacement: 'on',
      })
    })

    console.log(series)
    // const arrr = prefPopulation.map((a, i) => {
    //   name: "都道府県名",
    //   data: a.map((v, i) => {
    //     return v.value
    //   }),
    //   pointPlacement: "on"
    // })
  }
  // const yearArr = [
  //   1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015,
  //   2020, 2025, 2030, 2035, 2040, 2045,
  // ]
  // series name: 都道府県名:string、data: 人口数:string[]

  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
  }
  const options = {
    chart: {
      polar: true,
      type: 'line',
    },

    accessibility: {
      description: '都道府県毎の人口構成',
    },

    title: {
      text: '人口構成',
      x: 0,
    },

    pane: {
      size: '80%',
    },

    xAxis: {
      categories: yearArr,
      tickmarkPlacement: 'on',
      lineWidth: 0,
    },

    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0,
    },

    tooltip: {
      shared: true,
      pointFormat:
        '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>',
    },

    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
    },

    series: series,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
            pane: {
              size: '70%',
            },
          },
        },
      ],
    },
  }
  console.log(prefPopulation)
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
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
