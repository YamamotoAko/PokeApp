readme.txt ver.1.00 
2025/08/27
developer:motoyama

このリポジトリに教科書を進めながら書いたコードを保管してゆきます。


論理和演算子
x || y
x が true に変換できる場合は x を返し、それ以外の場合は y を返します。





























[変数に１から100までの数字をランダム表示させる]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  // Math.random()は0以上1未満の乱数を生成
  // (max - min + 1)で乱数の範囲を決定し、最小値に足すことで範囲を調整
  // Math.floor()で小数点以下を切り捨て、整数にする
}
const randomNumber = getRandomInt(1, 100);


export default async function fetchPokemonData(pokemon) {
  try {
    // pokeAPIからデータを取得して変数に格納
    const pokeData = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    // ステータスコードが200番台以外の場合はエラーを投げる
    if (!pokeData.ok) {
      throw new Error(
        `エラーが発生しました。ステータスコード: ${pokeData.status}`
      );
    }
    // pokeDataのJSON形式をオブジェクトに変換
    // 重めの作業になるのでawaitをかけている
    const data = await pokeData.json();

    // APIから取得したオブジェクトを処理する項目

    console.log(data);

    //ここまで
  } catch (err) {
    // エラーが発生した場合はcatch()でエラー内容をコンソールに表示
    console.log(err);
  }
}
//　ここからが本番です。
// fetch()を使ってpokeAPIからデータを取得できたので、
// 取得したデータをHTMLに反映させていきましょう。
// 例えば、ポケモンの名前や画像、タイプなどを表示することができます。
// さらに、ユーザーがポケモンの名前やIDを入力して検索できるようにすることも可能です。
// これにより、インタラクティブなポケモン図鑑のようなものを作成できます。

// 例えば、ボタンを押すとランダムなポケモンが表示されるようになったり、
// 検索バーに名前やIDを入力して特定のポケモンを表示できるようになったりします。

// そのためにはどんなHTML要素が必要か、どのようにJavaScriptで操作するかを考え、実装していきましょう。


//　引数にポケモンの名前またはIDを指定して関数を呼び出せばそのポケモンのデータが取得できます。

// (25)はピカチュウの番号
// let pokeNum;
// fetchPokemonData(randomNumber);

// 引数でポケモンのデータを呼び出している
// 数値や名前で指定 = 固定のポケモンのみの呼び出し
// この引数を変数にすればポケモンの切り替えができる
