export const longStringToShort = (string, toLetters = 3) => {
    let splitted = string.split(' ');
    if(splitted.length <= toLetters){
        return string;
    }

    return splitted.slice(0, toLetters).join(" ") + "...";
  };
  