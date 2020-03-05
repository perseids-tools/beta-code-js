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
// REGEX NOTE: word boundary \b doesn't work well with unicode
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

const maxBetaCodeCharacterLength = longestKeyLength(betaCodeToUnicode);

function greekToBetaCode(greek) {
  const greekCharacters = normalize(greek).split('');
  const betaCodeCharacters = [];
  let currentCharacter;
  let ii;

  for (ii = 0; ii < greekCharacters.length; ii += 1) {
    currentCharacter = greekCharacters[ii];

    if (Object.prototype.hasOwnProperty.call(unicodeToBetaCode, currentCharacter)) {
      betaCodeCharacters.push(unicodeToBetaCode[currentCharacter]);
    } else {
      betaCodeCharacters.push(currentCharacter);
    }
  }

  return betaCodeCharacters.join('');
}

function betaCodeToGreek(betaCode) {
  const betaCodeCharacters = normalize(betaCode).split('');
  const greekCharacters = [];
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

    // match the longest possible substring that's valid beta code, from left to right
    // for example 'e)' is valid beta code (ἐ) but 'e)/' is also valid beta code (ἕ)
    // the string 'e)/' should be interpreted as 'e)/' and not as 'e)' + '/'
    for (end = newStart; end <= maxLength; end += 1) {
      slice = betaCodeCharacters.slice(start, end).join('');

      if (Object.prototype.hasOwnProperty.call(betaCodeToUnicode, slice)) {
        currentCharacter = betaCodeToUnicode[slice];
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
