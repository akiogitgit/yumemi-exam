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
  let series: Series[] = []
  let yearArr: number[] = []

  // 都道府県を選択していたらグラフを生成
  if (prefPopulations[0]) {
    yearArr = prefPopulations[0].data.map((v) => {
      return v.year
    })
    prefPopulations.map((prefPopulation, i) => {
      series.push({
        name: prefPopulation.prefName,
        data: prefPopulation.data.map((values) => {
          return values.value
        }),
        pointPlacement: 'on',
      })
    })
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
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  )
}
