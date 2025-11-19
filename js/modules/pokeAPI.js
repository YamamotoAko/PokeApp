export default async function fetchPokemonData() {
  const result = document.querySelector('#result');
  const answer = document.querySelector('#answer');
  const checkBtn = document.querySelector('#checkBtn');
  const nextBtn = document.querySelector('#nextBtn');
  const pokeImg = document.querySelector('#pokeImg');
  answer.focus();
  result.textContent = '';
  answer.value = '';
  nextBtn.style.display = 'none';

  const num = [
    1, 4, 6, 7, 13, 25, 26, 27, 35, 37, 39, 50, 52, 63, 69, 74, 79, 78, 94, 95,
    105, 108, 113, 122, 132, 133, 143, 151, 150, 158, 172, 175, 182, 190, 202,
    252, 255, 258, 448,
  ];
  const randomIndex = Math.floor(Math.random() * num.length);
  const pokeId = num[randomIndex];

  const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
  const data = await pokeData.json();
  const specise = await fetch(data.species.url);
  const dataSpecies = await specise.json();

  let japaneseName = data.name;
  for (let i = 0; i < dataSpecies.names.length; i++) {
    const entry = dataSpecies.names[i];

    if (entry.language.name === 'ja-Hrkt') {
      japaneseName = entry.name;
      break;
    } else if (entry.language.name === 'ja') {
      japaneseName = entry.name;
      return japaneseName;
    }
  }

  const backImageUrl =
    data.sprites.back_default ||
    data.sprites.other['official-artwork'].front_default;
  const frontImageUrl =
    data.sprites.front_default ||
    data.sprites.other['official-artwork'].front_default;

  pokeImg.src = backImageUrl;

  let isProcessing = false;

  // ひらがな、半角カタカナ入力対応
  function hiraganaToKatakana(str) {
    return str.replace(/[\u3041-\u3096]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) + 0x60)
    );
  }
  function hankakuToZenkaku(str) {
    return str.replace(/[\uFF65-\uFF9F]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0xfec0)
    );
  }
  function romajiToKatakana(str) {
    const map = {
      pikachu: 'ピカチュウ',
      fushigidane: 'フシギダネ',
      hitokage: 'ヒトカゲ',
      zenigame: 'ゼニガメ',
      kyatapī: 'キャタピー',
      raichu: 'ライチュウ',
      sando: 'サンド',
      rokon: 'ロコン',
      purin: 'プリン',
      diguda: 'ディグダ',
      nyaasu: 'ニャース',
      keeshii: 'ケーシィ',
      madatsubomi: 'マダツボミ',
      goroonya: 'ゴローニャ',
      yadon: 'ヤドン',
      gyaroppu: 'ギャロップ',
      genga: 'ゲンガー',
      iwaaku: 'イワーク',
      garagara: 'ガラガラ',
      beroringa: 'ベロリンガ',
      rakkii: 'ラッキー',
      bariyaado: 'バリヤード',
      metamon: 'メタモン',
      eevui: 'イーブイ',
      kabigon: 'カビゴン',
      myuu: 'ミュウ',
      myuutsuu: 'ミュウツー',
      waninoko: 'ワニノコ',
      pichuu: 'ピチュー',
      togepii: 'トゲピー',
      kireihana: 'キレイハナ',
      eipamu: 'エイパム',
      soonansu: 'ソーナンス',
      kimori: 'キモリ',
      achamo: 'アチャモ',
      mizugorou: 'ミズゴロウ',
      rukario: 'ルカリオ',
      // 必要に応じて第5世代ポケモンも追加
    };
    const key = str.toLowerCase().replace(/[^a-z]/g, '');
    return map[key] || '';
  }

  function normalizeAnswer(str) {
    let s = str.trim();
    s = hiraganaToKatakana(s);
    s = hankakuToZenkaku(s);
    const romajiConverted = romajiToKatakana(s);
    return romajiConverted || s;
  }

  function performCheck() {
    if (isProcessing) return; // 既に処理中の場合は何もしない
    isProcessing = true;

    const userInput = normalizeAnswer(answer.value);
    const correct = normalizeAnswer(japaneseName);
    if (userInput === correct) {
      result.textContent = `正解！　答えは${japaneseName}でした！`;
      pokeImg.src = frontImageUrl;
    } else {
      result.textContent = `残念！　答えは${japaneseName}でした！`;
    }
    nextBtn.style.display = 'inline-block';
    nextBtn.focus();
    setTimeout(() => {
      isProcessing = false;
    }, 100);
  }
  answer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.isComposing) {
      performCheck();
      e.preventDefault();
    }
  });

  checkBtn.addEventListener('click', performCheck);
  nextBtn.onkeydown = (e) => {
    if (e.key === 'Enter') fetchPokemonData();
  };
  nextBtn.onclick = () => fetchPokemonData();
}
