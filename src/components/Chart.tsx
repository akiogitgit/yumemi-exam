import { FC } from 'react'
import { PrefPopulations } from '../types/prefPopulations'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { Series } from '../types/series.'

interface Props {
  prefPopulations: PrefPopulations[]
}

export const Chart: FC<Props> = ({ prefPopulations }) => {
  let yearArr = []
  // const yearArr = [
  //   1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015,
  //   2020, 2025, 2030, 2035, 2040, 2045,
  // ]

  // 初期値を空にして、型をtypesに書く
  let series: Series[] = []
  if (prefPopulations[0]) {
    yearArr = prefPopulations[0].map((v, i) => {
      return v.year
    })
    prefPopulations.map((v, i) => {
      series.push({
        // ["東東","神奈川","鳥取"][i]みたいに取りたい
        name: '都道府県名',
        data: v.map((v2, i2) => {
          return v2.value
        }),
        pointPlacement: 'on',
      })
    })

    console.log(series)
    // const arrr = prefPopulations.map((a, i) => {
    //   name: "都道府県名",
    //   data: a.map((v, i) => {
    //     return v.value
    //   }),
    //   pointPlacement: "on"
    // })
  }

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
  console.log(prefPopulations)
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  )
}
