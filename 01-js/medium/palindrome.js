/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== "!" && str[i] !== "," && str[i] !== "?" && str[i] !== ".") {
      newStr += str[i];
    }
  }
  if (
    newStr.toLowerCase().split(" ").join("") ===
    newStr.toLowerCase().split(" ").join("").split("").reverse().join("")
  )
    return true;
  else if (str.toLowerCase() === str.toLowerCase().split("").reverse().join(""))
    return true;
  else if (
    str.toLowerCase().split(" ").join("") ===
    str.toLowerCase().split(" ").join("").split("").reverse().join("")
  )
    return true;
  else return false;
}

module.exports = isPalindrome;
