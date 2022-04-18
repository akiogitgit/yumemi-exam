## 変数

prefectures は、全ての都道府県の都道府県名、都道府県コードを格納
choosePrefs は、選択している都道府県の都道府県名、都道府県コードを格納
prefPopulations は、選択した都道府県の都道府県名とデータ(year, value)を格納

## コンポーネント

PrefectureList.tsx は都道府県名を全表示し、それをクリックする毎に choosePrefs 内のデータと照らし合わせ。
被っていたら、その choosePrefs と prefPopulatioins のデータを削除する。
被っていなければ、choosePrefs と prefPopulations に都道府県データを挿入する。

## 概要

## 詳細
