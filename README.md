## 変数

prefectures は、全ての都道府県の都道府県名、都道府県コードを格納
prefPopulations は、選択した都道府県の都道府県名とデータ(year, value)を格納

## 関数

addPrefData は、都道府県コード・都道府県名を受け取り、都道府県コードからデータを fetch して、都道府県名・データを prefPopulations に挿入する
deletePrefData は index を受け取り、prefPopulations のインデックスを削除する。
changePrefData は 都道府県名をクリックする度に発火する。

## コンポーネント

PrefectureList.tsx は都道府県名を全表示し、それをクリックする毎に prefPopulations 内の都道府県名と照らし合わせ。
被っていたら、その prefPopulatioins の index を deletePrefData 関数に渡し、データを削除する。
被っていなければ、都道府県名、都道府県コードを addPrefData に渡し、prefPopulations に都道府県データを挿入する。

Chart.tsx は prefPopulations にデータが入っていたら、グラフを生成する。
グラフの 横軸(year) は、prefPopulations[0].data.year から取得している。
グラフのデータ(series)は、prefPopulations 配列の、data.value を配列にして格納。
グラフの都道府県名(name)は、prefPopulations 配列の prefName から取得。

