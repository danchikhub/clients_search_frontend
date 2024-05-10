const cyrillicToLatinMap = new Map([
    ['А', 'A'],
    ['Б', 'B'],
    ['В', 'V'],
    ['Г', 'G'],
    ['Д', 'D'],
    ['Е', 'E'],
    ['Ё', 'Yo'],
    ['Ж', 'Zh'],
    ['З', 'Z'],
    ['И', 'I'],
    ['Й', 'I'],
    ['К', 'K'],
    ['Л', 'L'],
    ['М', 'M'],
    ['Н', 'N'],
    ['О', 'O'],
    ['П', 'P'],
    ['Р', 'R'],
    ['С', 'S'],
    ['Т', 'T'],
    ['У', 'U'],
    ['Ф', 'F'],
    ['Х', 'H'],
    ['Ц', 'Ts'],
    ['Ч', 'Ch'],
    ['Ш', 'Sh'],
    ['Щ', 'Shch'],
    ['Ъ', 'symbol'],
    ['Ь', 'symbol'],
    ['Ы', 'Y'],
    ['Э', 'E'],
    ['Ю', 'Yu'],
    ['Я', 'Ya'],
    ['Ө', 'O'],
    ['Ң', 'N'],
    ['Ү', 'U'],
  ]);

  export function cyrillicToLatin(cyrillic) {
    return cyrillic
      .split('')
      .map((char) => {
        if (/[a-zA-Z]/.test(char)) {
          return char;
        }
  
        const isLowerCase = char === char.toLowerCase();
        if (isLowerCase) {
          const latin = cyrillicToLatinMap.get(char.toUpperCase());
          return latin ? latin.toLowerCase() : '';
        }
        const latin = cyrillicToLatinMap.get(char);
        return latin ?? '';
      })
      .map((item) => {
        if (item === 'symbol') {
          return '';
        }
  
        if (item) {
          return item;
        }
        return ' ';
      })
      .join('');
  }