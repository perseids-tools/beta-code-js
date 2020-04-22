const betaCodeToUnicode = require('./vendor/beta-code-json/beta_code_to_unicode.json');
const unicodeToBetaCode = require('./vendor/beta-code-json/unicode_to_beta_code.json');

function longestKeyLength(obj) {
  const keys = Object.keys(obj);
  let ii;
  let key;
  let length = 0;

  for (ii = 0; ii < keys.length; ii += 1) {
    key = keys[ii];

    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key.length > length) {
        length = key.length;
      }
    }
  }

  return length;
}

// this function replaces σ with ς when:
//   - at the end of a line
//   - followed by whitespace
//   - followed by a punctuation character
// REGEX NOTE: word boundary \b doesn't work well with Unicode
function sigmaToEndOfWordSigma(string) {
  return string.replace(/σ(?=[,.:;·\s]|$)/g, 'ς');
}

function min(a, b) {
  return a < b ? a : b;
}

function normalize(string) {
  if (string.normalize) {
    return string.normalize();
  }

  return string;
}

function mergeObjects(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const retObj = {};
  let key;
  let ii;

  for (ii = 0; ii < keys1.length; ii += 1) {
    key = keys1[ii];

    retObj[key] = obj1[key];
  }

  for (ii = 0; ii < keys2.length; ii += 1) {
    key = keys2[ii];

    retObj[key] = obj2[key];
  }

  return retObj;
}

function greekToBetaCode(greek, customMap) {
  const greekCharacters = normalize(greek).split('');
  const betaCodeCharacters = [];
  const map = mergeObjects(unicodeToBetaCode, customMap || {});
  let currentCharacter;
  let ii;

  for (ii = 0; ii < greekCharacters.length; ii += 1) {
    currentCharacter = greekCharacters[ii];

    if (Object.prototype.hasOwnProperty.call(map, currentCharacter)) {
      betaCodeCharacters.push(map[currentCharacter]);
    } else {
      betaCodeCharacters.push(currentCharacter);
    }
  }

  return betaCodeCharacters.join('');
}

function betaCodeToGreek(betaCode, customMap) {
  const betaCodeCharacters = normalize(betaCode).split('');
  const greekCharacters = [];
  const map = mergeObjects(betaCodeToUnicode, customMap || {});
  const maxBetaCodeCharacterLength = longestKeyLength(map);
  let start = 0;
  let end;
  let slice;
  let newStart;
  let currentCharacter;
  let maxLength;

  while (start <= betaCodeCharacters.length) {
    currentCharacter = betaCodeCharacters[start];
    newStart = start + 1;
    maxLength = min(betaCodeCharacters.length, start + maxBetaCodeCharacterLength);

    // match the longest possible substring that's valid Beta Code, from left to right
    // for example 'e)' is valid Beta Code (ἐ) but 'e)/' is also valid Beta Code (ἕ)
    // the string 'e)/' should be interpreted as 'e)/' and not as 'e)' + '/'
    for (end = newStart; end <= maxLength; end += 1) {
      slice = betaCodeCharacters.slice(start, end).join('');

      if (Object.prototype.hasOwnProperty.call(map, slice)) {
        currentCharacter = map[slice];
        newStart = end;
      }
    }

    greekCharacters.push(currentCharacter);
    start = newStart;
  }

  return sigmaToEndOfWordSigma(greekCharacters.join(''));
}

module.exports = {
  greekToBetaCode,
  betaCodeToGreek,
};
