## 変数

prefectures は、全ての都道府県の都道府県名、都道府県コードを格納
prefPopulations は、選択した都道府県の都道府県名とデータ(year, value)を格納

## コンポーネント

PrefectureList.tsx は都道府県名を全表示し、それをクリックする毎に prefPopulations 内の都道府県名と照らし合わせ。
被っていたら、その prefPopulatioins のデータを削除する。
被っていなければ、 prefPopulations に都道府県データを挿入する。

Chart.tsx は prefPopulations にデータが入っていたら、グラフを生成する。
グラフの 横軸(year) は、prefPopulations[0].data.year から取得している。
グラフのデータ(series)は、prefPopulations 配列の、data.value を配列にして格納。
グラフの都道府県名(name)は、prefPopulations 配列の prefName から取得。

## 概要

## 詳細
