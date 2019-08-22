(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
'use strict';

var beta_code_to_unicode = require('./vendor/beta-code-json/beta_code_to_unicode.json');
var unicode_to_beta_code = require('./vendor/beta-code-json/unicode_to_beta_code.json');
var max_beta_code_character_length = _longestKeyLength(beta_code_to_unicode);

function greekToBetaCode (greek) {
  var greek_characters = _normalize(greek).split('');
  var beta_code_characters = [];
  var current_character, ii;

  for (ii = 0; ii < greek_characters.length; ii++) {
    current_character = greek_characters[ii];

    if (unicode_to_beta_code.hasOwnProperty(current_character)) {
      beta_code_characters.push(unicode_to_beta_code[current_character]);
    } else {
      beta_code_characters.push(current_character);
    }
  }

  return beta_code_characters.join('');
}

function betaCodeToGreek (beta_code) {
  var beta_code_characters = _normalize(beta_code).split('');
  var greek_characters = [];
  var start = 0;
  var end, slice, new_start, current_character, max_length;

  while (start <= beta_code_characters.length) {
    current_character = beta_code_characters[start];
    new_start = start + 1;
    max_length = _min(beta_code_characters.length, start + max_beta_code_character_length);

    // match the longest possible substring that's valid beta code, from left to right
    // for example 'e)' is valid beta code (ἐ) but 'e)/' is also valid beta code (ἕ)
    // the string 'e)/' should be interpreted as 'e)/' and not as 'e)' + '/'
    for (end = new_start; end <= max_length; end++) {
      slice = beta_code_characters.slice(start, end).join('');

      if (beta_code_to_unicode.hasOwnProperty(slice)) {
        current_character = beta_code_to_unicode[slice];
        new_start = end;
      }
    }

    greek_characters.push(current_character);
    start = new_start;
  }

  return _sigmaToEndOfWordSigma(greek_characters.join(''));
}

module.exports = {
  greekToBetaCode: greekToBetaCode,
  betaCodeToGreek: betaCodeToGreek
};

if (typeof window !== 'undefined') {
  window.greekToBetaCode = greekToBetaCode;
  window.betaCodeToGreek = betaCodeToGreek;
}

function _longestKeyLength (obj) {
  var key;
  var length = 0;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
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
function _sigmaToEndOfWordSigma (string) {
  return string.replace(/σ(?=[,.:;·\s]|$)/g, 'ς');
}

function _min (a, b) {
  return a < b ? a : b;
}

function _normalize (string) {
  if (string.normalize) {
    return string.normalize();
  }

  return string;
}
})();

},{"./vendor/beta-code-json/beta_code_to_unicode.json":2,"./vendor/beta-code-json/unicode_to_beta_code.json":3}],2:[function(require,module,exports){
module.exports={
  "#": "ʹ",
  "(": "ʽ",
  ")": "ʼ",
  "*(/A": "Ἅ",
  "*(/E": "Ἕ",
  "*(/H": "Ἥ",
  "*(/I": "Ἵ",
  "*(/O": "Ὅ",
  "*(/U": "Ὕ",
  "*(/W": "Ὥ",
  "*(/a": "Ἅ",
  "*(/e": "Ἕ",
  "*(/h": "Ἥ",
  "*(/i": "Ἵ",
  "*(/o": "Ὅ",
  "*(/u": "Ὕ",
  "*(/w": "Ὥ",
  "*(/|A": "ᾍ",
  "*(/|H": "ᾝ",
  "*(/|W": "ᾭ",
  "*(/|a": "ᾍ",
  "*(/|h": "ᾝ",
  "*(/|w": "ᾭ",
  "*(=A": "Ἇ",
  "*(=H": "Ἧ",
  "*(=I": "Ἷ",
  "*(=U": "Ὗ",
  "*(=W": "Ὧ",
  "*(=a": "Ἇ",
  "*(=h": "Ἧ",
  "*(=i": "Ἷ",
  "*(=u": "Ὗ",
  "*(=w": "Ὧ",
  "*(=|A": "ᾏ",
  "*(=|H": "ᾟ",
  "*(=|W": "ᾯ",
  "*(=|a": "ᾏ",
  "*(=|h": "ᾟ",
  "*(=|w": "ᾯ",
  "*(A": "Ἁ",
  "*(E": "Ἑ",
  "*(H": "Ἡ",
  "*(I": "Ἱ",
  "*(O": "Ὁ",
  "*(R": "Ῥ",
  "*(U": "Ὑ",
  "*(W": "Ὡ",
  "*(\\A": "Ἃ",
  "*(\\E": "Ἓ",
  "*(\\H": "Ἣ",
  "*(\\I": "Ἳ",
  "*(\\O": "Ὃ",
  "*(\\U": "Ὓ",
  "*(\\W": "Ὣ",
  "*(\\a": "Ἃ",
  "*(\\e": "Ἓ",
  "*(\\h": "Ἣ",
  "*(\\i": "Ἳ",
  "*(\\o": "Ὃ",
  "*(\\u": "Ὓ",
  "*(\\w": "Ὣ",
  "*(\\|A": "ᾋ",
  "*(\\|H": "ᾛ",
  "*(\\|W": "ᾫ",
  "*(\\|a": "ᾋ",
  "*(\\|h": "ᾛ",
  "*(\\|w": "ᾫ",
  "*(a": "Ἁ",
  "*(e": "Ἑ",
  "*(h": "Ἡ",
  "*(i": "Ἱ",
  "*(o": "Ὁ",
  "*(r": "Ῥ",
  "*(u": "Ὑ",
  "*(w": "Ὡ",
  "*(|A": "ᾉ",
  "*(|H": "ᾙ",
  "*(|W": "ᾩ",
  "*(|a": "ᾉ",
  "*(|h": "ᾙ",
  "*(|w": "ᾩ",
  "*)/A": "Ἄ",
  "*)/E": "Ἔ",
  "*)/H": "Ἤ",
  "*)/I": "Ἴ",
  "*)/O": "Ὄ",
  "*)/W": "Ὤ",
  "*)/a": "Ἄ",
  "*)/e": "Ἔ",
  "*)/h": "Ἤ",
  "*)/i": "Ἴ",
  "*)/o": "Ὄ",
  "*)/w": "Ὤ",
  "*)/|A": "ᾌ",
  "*)/|H": "ᾜ",
  "*)/|W": "ᾬ",
  "*)/|a": "ᾌ",
  "*)/|h": "ᾜ",
  "*)/|w": "ᾬ",
  "*)=A": "Ἆ",
  "*)=H": "Ἦ",
  "*)=I": "Ἶ",
  "*)=W": "Ὦ",
  "*)=a": "Ἆ",
  "*)=h": "Ἦ",
  "*)=i": "Ἶ",
  "*)=w": "Ὦ",
  "*)=|A": "ᾎ",
  "*)=|H": "ᾞ",
  "*)=|W": "ᾮ",
  "*)=|a": "ᾎ",
  "*)=|h": "ᾞ",
  "*)=|w": "ᾮ",
  "*)A": "Ἀ",
  "*)E": "Ἐ",
  "*)H": "Ἠ",
  "*)I": "Ἰ",
  "*)O": "Ὀ",
  "*)W": "Ὠ",
  "*)\\A": "Ἂ",
  "*)\\E": "Ἒ",
  "*)\\H": "Ἢ",
  "*)\\I": "Ἲ",
  "*)\\O": "Ὂ",
  "*)\\W": "Ὢ",
  "*)\\a": "Ἂ",
  "*)\\e": "Ἒ",
  "*)\\h": "Ἢ",
  "*)\\i": "Ἲ",
  "*)\\o": "Ὂ",
  "*)\\w": "Ὢ",
  "*)\\|A": "ᾊ",
  "*)\\|H": "ᾚ",
  "*)\\|W": "ᾪ",
  "*)\\|a": "ᾊ",
  "*)\\|h": "ᾚ",
  "*)\\|w": "ᾪ",
  "*)a": "Ἀ",
  "*)e": "Ἐ",
  "*)h": "Ἠ",
  "*)i": "Ἰ",
  "*)o": "Ὀ",
  "*)w": "Ὠ",
  "*)|A": "ᾈ",
  "*)|H": "ᾘ",
  "*)|W": "ᾨ",
  "*)|a": "ᾈ",
  "*)|h": "ᾘ",
  "*)|w": "ᾨ",
  "*+I": "Ϊ",
  "*+U": "Ϋ",
  "*+i": "Ϊ",
  "*+u": "Ϋ",
  "*/A": "Ά",
  "*/E": "Έ",
  "*/H": "Ή",
  "*/I": "Ί",
  "*/O": "Ό",
  "*/U": "Ύ",
  "*/W": "Ώ",
  "*/a": "Ά",
  "*/e": "Έ",
  "*/h": "Ή",
  "*/i": "Ί",
  "*/o": "Ό",
  "*/u": "Ύ",
  "*/w": "Ώ",
  "*A": "Α",
  "*A(": "Ἁ",
  "*A(/": "Ἅ",
  "*A(/|": "ᾍ",
  "*A(=": "Ἇ",
  "*A(=|": "ᾏ",
  "*A(\\": "Ἃ",
  "*A(\\|": "ᾋ",
  "*A(|": "ᾉ",
  "*A)": "Ἀ",
  "*A)/": "Ἄ",
  "*A)/|": "ᾌ",
  "*A)=": "Ἆ",
  "*A)=|": "ᾎ",
  "*A)\\": "Ἂ",
  "*A)\\|": "ᾊ",
  "*A)|": "ᾈ",
  "*A/": "Ά",
  "*A\\": "Ὰ",
  "*A|": "ᾼ",
  "*B": "Β",
  "*C": "Ξ",
  "*D": "Δ",
  "*E": "Ε",
  "*E(": "Ἑ",
  "*E(/": "Ἕ",
  "*E(\\": "Ἓ",
  "*E)": "Ἐ",
  "*E)/": "Ἔ",
  "*E)\\": "Ἒ",
  "*E/": "Έ",
  "*E\\": "Ὲ",
  "*F": "Φ",
  "*G": "Γ",
  "*H": "Η",
  "*H(": "Ἡ",
  "*H(/": "Ἥ",
  "*H(/|": "ᾝ",
  "*H(=": "Ἧ",
  "*H(=|": "ᾟ",
  "*H(\\": "Ἣ",
  "*H(\\|": "ᾛ",
  "*H(|": "ᾙ",
  "*H)": "Ἠ",
  "*H)/": "Ἤ",
  "*H)/|": "ᾜ",
  "*H)=": "Ἦ",
  "*H)=|": "ᾞ",
  "*H)\\": "Ἢ",
  "*H)\\|": "ᾚ",
  "*H)|": "ᾘ",
  "*H/": "Ή",
  "*H\\": "Ὴ",
  "*H|": "ῌ",
  "*I": "Ι",
  "*I(": "Ἱ",
  "*I(/": "Ἵ",
  "*I(=": "Ἷ",
  "*I(\\": "Ἳ",
  "*I)": "Ἰ",
  "*I)/": "Ἴ",
  "*I)=": "Ἶ",
  "*I)\\": "Ἲ",
  "*I+": "Ϊ",
  "*I/": "Ί",
  "*I\\": "Ὶ",
  "*J": "Σ",
  "*K": "Κ",
  "*L": "Λ",
  "*M": "Μ",
  "*N": "Ν",
  "*O": "Ο",
  "*O(": "Ὁ",
  "*O(/": "Ὅ",
  "*O(\\": "Ὃ",
  "*O)": "Ὀ",
  "*O)/": "Ὄ",
  "*O)\\": "Ὂ",
  "*O/": "Ό",
  "*O\\": "Ὸ",
  "*P": "Π",
  "*Q": "Θ",
  "*R": "Ρ",
  "*R(": "Ῥ",
  "*S": "Σ",
  "*S1": "Σ",
  "*S2": "Σ",
  "*S3": "Ϲ",
  "*T": "Τ",
  "*U": "Υ",
  "*U(": "Ὑ",
  "*U(/": "Ὕ",
  "*U(=": "Ὗ",
  "*U(\\": "Ὓ",
  "*U+": "Ϋ",
  "*U/": "Ύ",
  "*U\\": "Ὺ",
  "*W": "Ω",
  "*W(": "Ὡ",
  "*W(/": "Ὥ",
  "*W(/|": "ᾭ",
  "*W(=": "Ὧ",
  "*W(=|": "ᾯ",
  "*W(\\": "Ὣ",
  "*W(\\|": "ᾫ",
  "*W(|": "ᾩ",
  "*W)": "Ὠ",
  "*W)/": "Ὤ",
  "*W)/|": "ᾬ",
  "*W)=": "Ὦ",
  "*W)=|": "ᾮ",
  "*W)\\": "Ὢ",
  "*W)\\|": "ᾪ",
  "*W)|": "ᾨ",
  "*W/": "Ώ",
  "*W\\": "Ὼ",
  "*W|": "ῼ",
  "*X": "Χ",
  "*Y": "Ψ",
  "*Z": "Ζ",
  "*\\A": "Ὰ",
  "*\\E": "Ὲ",
  "*\\H": "Ὴ",
  "*\\I": "Ὶ",
  "*\\O": "Ὸ",
  "*\\U": "Ὺ",
  "*\\W": "Ὼ",
  "*\\a": "Ὰ",
  "*\\e": "Ὲ",
  "*\\h": "Ὴ",
  "*\\i": "Ὶ",
  "*\\o": "Ὸ",
  "*\\u": "Ὺ",
  "*\\w": "Ὼ",
  "*a": "Α",
  "*a(": "Ἁ",
  "*a(/": "Ἅ",
  "*a(/|": "ᾍ",
  "*a(=": "Ἇ",
  "*a(=|": "ᾏ",
  "*a(\\": "Ἃ",
  "*a(\\|": "ᾋ",
  "*a(|": "ᾉ",
  "*a)": "Ἀ",
  "*a)/": "Ἄ",
  "*a)/|": "ᾌ",
  "*a)=": "Ἆ",
  "*a)=|": "ᾎ",
  "*a)\\": "Ἂ",
  "*a)\\|": "ᾊ",
  "*a)|": "ᾈ",
  "*a/": "Ά",
  "*a\\": "Ὰ",
  "*a|": "ᾼ",
  "*b": "Β",
  "*c": "Ξ",
  "*d": "Δ",
  "*e": "Ε",
  "*e(": "Ἑ",
  "*e(/": "Ἕ",
  "*e(\\": "Ἓ",
  "*e)": "Ἐ",
  "*e)/": "Ἔ",
  "*e)\\": "Ἒ",
  "*e/": "Έ",
  "*e\\": "Ὲ",
  "*f": "Φ",
  "*g": "Γ",
  "*h": "Η",
  "*h(": "Ἡ",
  "*h(/": "Ἥ",
  "*h(/|": "ᾝ",
  "*h(=": "Ἧ",
  "*h(=|": "ᾟ",
  "*h(\\": "Ἣ",
  "*h(\\|": "ᾛ",
  "*h(|": "ᾙ",
  "*h)": "Ἠ",
  "*h)/": "Ἤ",
  "*h)/|": "ᾜ",
  "*h)=": "Ἦ",
  "*h)=|": "ᾞ",
  "*h)\\": "Ἢ",
  "*h)\\|": "ᾚ",
  "*h)|": "ᾘ",
  "*h/": "Ή",
  "*h\\": "Ὴ",
  "*h|": "ῌ",
  "*i": "Ι",
  "*i(": "Ἱ",
  "*i(/": "Ἵ",
  "*i(=": "Ἷ",
  "*i(\\": "Ἳ",
  "*i)": "Ἰ",
  "*i)/": "Ἴ",
  "*i)=": "Ἶ",
  "*i)\\": "Ἲ",
  "*i+": "Ϊ",
  "*i/": "Ί",
  "*i\\": "Ὶ",
  "*j": "Σ",
  "*k": "Κ",
  "*l": "Λ",
  "*m": "Μ",
  "*n": "Ν",
  "*o": "Ο",
  "*o(": "Ὁ",
  "*o(/": "Ὅ",
  "*o(\\": "Ὃ",
  "*o)": "Ὀ",
  "*o)/": "Ὄ",
  "*o)\\": "Ὂ",
  "*o/": "Ό",
  "*o\\": "Ὸ",
  "*p": "Π",
  "*q": "Θ",
  "*r": "Ρ",
  "*r(": "Ῥ",
  "*s": "Σ",
  "*s1": "Σ",
  "*s2": "Σ",
  "*s3": "Ϲ",
  "*t": "Τ",
  "*u": "Υ",
  "*u(": "Ὑ",
  "*u(/": "Ὕ",
  "*u(=": "Ὗ",
  "*u(\\": "Ὓ",
  "*u+": "Ϋ",
  "*u/": "Ύ",
  "*u\\": "Ὺ",
  "*w": "Ω",
  "*w(": "Ὡ",
  "*w(/": "Ὥ",
  "*w(/|": "ᾭ",
  "*w(=": "Ὧ",
  "*w(=|": "ᾯ",
  "*w(\\": "Ὣ",
  "*w(\\|": "ᾫ",
  "*w(|": "ᾩ",
  "*w)": "Ὠ",
  "*w)/": "Ὤ",
  "*w)/|": "ᾬ",
  "*w)=": "Ὦ",
  "*w)=|": "ᾮ",
  "*w)\\": "Ὢ",
  "*w)\\|": "ᾪ",
  "*w)|": "ᾨ",
  "*w/": "Ώ",
  "*w\\": "Ὼ",
  "*w|": "ῼ",
  "*x": "Χ",
  "*y": "Ψ",
  "*z": "Ζ",
  "*|A": "ᾼ",
  "*|H": "ῌ",
  "*|W": "ῼ",
  "*|a": "ᾼ",
  "*|h": "ῌ",
  "*|w": "ῼ",
  "+": " ̈",
  ",": ",",
  "-": "-",
  ".": ".",
  "/": " ́",
  ":": "·",
  ";": ";",
  "=": " ͂",
  "A": "α",
  "A(": "ἁ",
  "A(/": "ἅ",
  "A(/|": "ᾅ",
  "A(=": "ἇ",
  "A(=|": "ᾇ",
  "A(\\": "ἃ",
  "A(\\|": "ᾃ",
  "A(|": "ᾁ",
  "A)": "ἀ",
  "A)/": "ἄ",
  "A)/|": "ᾄ",
  "A)=": "ἆ",
  "A)=|": "ᾆ",
  "A)\\": "ἂ",
  "A)\\|": "ᾂ",
  "A)|": "ᾀ",
  "A/": "ά",
  "A/|": "ᾴ",
  "A=": "ᾶ",
  "A=|": "ᾷ",
  "A\\": "ὰ",
  "A\\|": "ᾲ",
  "A|": "ᾳ",
  "B": "β",
  "C": "ξ",
  "D": "δ",
  "E": "ε",
  "E(": "ἑ",
  "E(/": "ἕ",
  "E(\\": "ἓ",
  "E)": "ἐ",
  "E)/": "ἔ",
  "E)\\": "ἒ",
  "E/": "έ",
  "E\\": "ὲ",
  "F": "φ",
  "G": "γ",
  "H": "η",
  "H(": "ἡ",
  "H(/": "ἥ",
  "H(/|": "ᾕ",
  "H(=": "ἧ",
  "H(=|": "ᾗ",
  "H(\\": "ἣ",
  "H(\\|": "ᾓ",
  "H(|": "ᾑ",
  "H)": "ἠ",
  "H)/": "ἤ",
  "H)/|": "ᾔ",
  "H)=": "ἦ",
  "H)=|": "ᾖ",
  "H)\\": "ἢ",
  "H)\\|": "ᾒ",
  "H)|": "ᾐ",
  "H/": "ή",
  "H/|": "ῄ",
  "H=": "ῆ",
  "H=|": "ῇ",
  "H\\": "ὴ",
  "H\\|": "ῂ",
  "H|": "ῃ",
  "I": "ι",
  "I(": "ἱ",
  "I(/": "ἵ",
  "I(=": "ἷ",
  "I(\\": "ἳ",
  "I)": "ἰ",
  "I)/": "ἴ",
  "I)=": "ἶ",
  "I)\\": "ἲ",
  "I+": "ϊ",
  "I/": "ί",
  "I/+": "ΐ",
  "I=": "ῖ",
  "I=+": "ῗ",
  "I\\": "ὶ",
  "I\\+": "ῒ",
  "J": "ς",
  "K": "κ",
  "L": "λ",
  "M": "μ",
  "N": "ν",
  "O": "ο",
  "O(": "ὁ",
  "O(/": "ὅ",
  "O(\\": "ὃ",
  "O)": "ὀ",
  "O)/": "ὄ",
  "O)\\": "ὂ",
  "O/": "ό",
  "O\\": "ὸ",
  "P": "π",
  "Q": "θ",
  "R": "ρ",
  "R(": "ῥ",
  "R)": "ῤ",
  "S": "σ",
  "S1": "σ",
  "S2": "ς",
  "S3": "ϲ",
  "T": "τ",
  "U": "υ",
  "U(": "ὑ",
  "U(/": "ὕ",
  "U(=": "ὗ",
  "U(\\": "ὓ",
  "U)": "ὐ",
  "U)/": "ὔ",
  "U)=": "ὖ",
  "U)\\": "ὒ",
  "U+": "ϋ",
  "U/": "ύ",
  "U/+": "ΰ",
  "U=": "ῦ",
  "U=+": "ῧ",
  "U\\": "ὺ",
  "U\\+": "ῢ",
  "W": "ω",
  "W(": "ὡ",
  "W(/": "ὥ",
  "W(/|": "ᾥ",
  "W(=": "ὧ",
  "W(=|": "ᾧ",
  "W(\\": "ὣ",
  "W(\\|": "ᾣ",
  "W(|": "ᾡ",
  "W)": "ὠ",
  "W)/": "ὤ",
  "W)/|": "ᾤ",
  "W)=": "ὦ",
  "W)=|": "ᾦ",
  "W)\\": "ὢ",
  "W)\\|": "ᾢ",
  "W)|": "ᾠ",
  "W/": "ώ",
  "W/|": "ῴ",
  "W=": "ῶ",
  "W=|": "ῷ",
  "W\\": "ὼ",
  "W\\|": "ῲ",
  "W|": "ῳ",
  "X": "χ",
  "Y": "ψ",
  "Z": "ζ",
  "\\": "`",
  "_": "—",
  "a": "α",
  "a(": "ἁ",
  "a(/": "ἅ",
  "a(/|": "ᾅ",
  "a(=": "ἇ",
  "a(=|": "ᾇ",
  "a(\\": "ἃ",
  "a(\\|": "ᾃ",
  "a(|": "ᾁ",
  "a)": "ἀ",
  "a)/": "ἄ",
  "a)/|": "ᾄ",
  "a)=": "ἆ",
  "a)=|": "ᾆ",
  "a)\\": "ἂ",
  "a)\\|": "ᾂ",
  "a)|": "ᾀ",
  "a/": "ά",
  "a/|": "ᾴ",
  "a=": "ᾶ",
  "a=|": "ᾷ",
  "a\\": "ὰ",
  "a\\|": "ᾲ",
  "a|": "ᾳ",
  "b": "β",
  "c": "ξ",
  "d": "δ",
  "e": "ε",
  "e(": "ἑ",
  "e(/": "ἕ",
  "e(\\": "ἓ",
  "e)": "ἐ",
  "e)/": "ἔ",
  "e)\\": "ἒ",
  "e/": "έ",
  "e\\": "ὲ",
  "f": "φ",
  "g": "γ",
  "h": "η",
  "h(": "ἡ",
  "h(/": "ἥ",
  "h(/|": "ᾕ",
  "h(=": "ἧ",
  "h(=|": "ᾗ",
  "h(\\": "ἣ",
  "h(\\|": "ᾓ",
  "h(|": "ᾑ",
  "h)": "ἠ",
  "h)/": "ἤ",
  "h)/|": "ᾔ",
  "h)=": "ἦ",
  "h)=|": "ᾖ",
  "h)\\": "ἢ",
  "h)\\|": "ᾒ",
  "h)|": "ᾐ",
  "h/": "ή",
  "h/|": "ῄ",
  "h=": "ῆ",
  "h=|": "ῇ",
  "h\\": "ὴ",
  "h\\|": "ῂ",
  "h|": "ῃ",
  "i": "ι",
  "i(": "ἱ",
  "i(/": "ἵ",
  "i(=": "ἷ",
  "i(\\": "ἳ",
  "i)": "ἰ",
  "i)/": "ἴ",
  "i)=": "ἶ",
  "i)\\": "ἲ",
  "i+": "ϊ",
  "i/": "ί",
  "i/+": "ΐ",
  "i=": "ῖ",
  "i=+": "ῗ",
  "i\\": "ὶ",
  "i\\+": "ῒ",
  "j": "ς",
  "k": "κ",
  "l": "λ",
  "m": "μ",
  "n": "ν",
  "o": "ο",
  "o(": "ὁ",
  "o(/": "ὅ",
  "o(\\": "ὃ",
  "o)": "ὀ",
  "o)/": "ὄ",
  "o)\\": "ὂ",
  "o/": "ό",
  "o\\": "ὸ",
  "p": "π",
  "q": "θ",
  "r": "ρ",
  "r(": "ῥ",
  "r)": "ῤ",
  "s": "σ",
  "s1": "σ",
  "s2": "ς",
  "s3": "ϲ",
  "t": "τ",
  "u": "υ",
  "u(": "ὑ",
  "u(/": "ὕ",
  "u(=": "ὗ",
  "u(\\": "ὓ",
  "u)": "ὐ",
  "u)/": "ὔ",
  "u)=": "ὖ",
  "u)\\": "ὒ",
  "u+": "ϋ",
  "u/": "ύ",
  "u/+": "ΰ",
  "u=": "ῦ",
  "u=+": "ῧ",
  "u\\": "ὺ",
  "u\\+": "ῢ",
  "w": "ω",
  "w(": "ὡ",
  "w(/": "ὥ",
  "w(/|": "ᾥ",
  "w(=": "ὧ",
  "w(=|": "ᾧ",
  "w(\\": "ὣ",
  "w(\\|": "ᾣ",
  "w(|": "ᾡ",
  "w)": "ὠ",
  "w)/": "ὤ",
  "w)/|": "ᾤ",
  "w)=": "ὦ",
  "w)=|": "ᾦ",
  "w)\\": "ὢ",
  "w)\\|": "ᾢ",
  "w)|": "ᾠ",
  "w/": "ώ",
  "w/|": "ῴ",
  "w=": "ῶ",
  "w=|": "ῷ",
  "w\\": "ὼ",
  "w\\|": "ῲ",
  "w|": "ῳ",
  "x": "χ",
  "y": "ψ",
  "z": "ζ"
}

},{}],3:[function(require,module,exports){
module.exports={
  " ́": "/",
  " ̈": "+",
  " ͂": "=",
  ",": ",",
  "-": "-",
  ".": ".",
  ";": ";",
  "`": "\\",
  "·": ":",
  "ʹ": "#",
  "ʼ": ")",
  "ʽ": "(",
  "Ά": "*/a",
  "Έ": "*/e",
  "Ή": "*/h",
  "Ί": "*/i",
  "Ό": "*/o",
  "Ύ": "*/u",
  "Ώ": "*/w",
  "ΐ": "i/+",
  "Α": "*a",
  "Β": "*b",
  "Γ": "*g",
  "Δ": "*d",
  "Ε": "*e",
  "Ζ": "*z",
  "Η": "*h",
  "Θ": "*q",
  "Ι": "*i",
  "Κ": "*k",
  "Λ": "*l",
  "Μ": "*m",
  "Ν": "*n",
  "Ξ": "*c",
  "Ο": "*o",
  "Π": "*p",
  "Ρ": "*r",
  "Σ": "*s",
  "Τ": "*t",
  "Υ": "*u",
  "Φ": "*f",
  "Χ": "*x",
  "Ψ": "*y",
  "Ω": "*w",
  "Ϊ": "*+i",
  "Ϋ": "*+u",
  "ά": "a/",
  "έ": "e/",
  "ή": "h/",
  "ί": "i/",
  "ΰ": "u/+",
  "α": "a",
  "β": "b",
  "γ": "g",
  "δ": "d",
  "ε": "e",
  "ζ": "z",
  "η": "h",
  "θ": "q",
  "ι": "i",
  "κ": "k",
  "λ": "l",
  "μ": "m",
  "ν": "n",
  "ξ": "c",
  "ο": "o",
  "π": "p",
  "ρ": "r",
  "ς": "s",
  "σ": "s",
  "τ": "t",
  "υ": "u",
  "φ": "f",
  "χ": "x",
  "ψ": "y",
  "ω": "w",
  "ϊ": "i+",
  "ϋ": "u+",
  "ό": "o/",
  "ύ": "u/",
  "ώ": "w/",
  "ϲ": "s3",
  "Ϲ": "*s3",
  "ἀ": "a)",
  "ἁ": "a(",
  "ἂ": "a)\\",
  "ἃ": "a(\\",
  "ἄ": "a)/",
  "ἅ": "a(/",
  "ἆ": "a)=",
  "ἇ": "a(=",
  "Ἀ": "*)a",
  "Ἁ": "*(a",
  "Ἂ": "*)\\a",
  "Ἃ": "*(\\a",
  "Ἄ": "*)/a",
  "Ἅ": "*(/a",
  "Ἆ": "*)=a",
  "Ἇ": "*(=a",
  "ἐ": "e)",
  "ἑ": "e(",
  "ἒ": "e)\\",
  "ἓ": "e(\\",
  "ἔ": "e)/",
  "ἕ": "e(/",
  "Ἐ": "*)e",
  "Ἑ": "*(e",
  "Ἒ": "*)\\e",
  "Ἓ": "*(\\e",
  "Ἔ": "*)/e",
  "Ἕ": "*(/e",
  "ἠ": "h)",
  "ἡ": "h(",
  "ἢ": "h)\\",
  "ἣ": "h(\\",
  "ἤ": "h)/",
  "ἥ": "h(/",
  "ἦ": "h)=",
  "ἧ": "h(=",
  "Ἠ": "*)h",
  "Ἡ": "*(h",
  "Ἢ": "*)\\h",
  "Ἣ": "*(\\h",
  "Ἤ": "*)/h",
  "Ἥ": "*(/h",
  "Ἦ": "*)=h",
  "Ἧ": "*(=h",
  "ἰ": "i)",
  "ἱ": "i(",
  "ἲ": "i)\\",
  "ἳ": "i(\\",
  "ἴ": "i)/",
  "ἵ": "i(/",
  "ἶ": "i)=",
  "ἷ": "i(=",
  "Ἰ": "*)i",
  "Ἱ": "*(i",
  "Ἲ": "*)\\i",
  "Ἳ": "*(\\i",
  "Ἴ": "*)/i",
  "Ἵ": "*(/i",
  "Ἶ": "*)=i",
  "Ἷ": "*(=i",
  "ὀ": "o)",
  "ὁ": "o(",
  "ὂ": "o)\\",
  "ὃ": "o(\\",
  "ὄ": "o)/",
  "ὅ": "o(/",
  "Ὀ": "*)o",
  "Ὁ": "*(o",
  "Ὂ": "*)\\o",
  "Ὃ": "*(\\o",
  "Ὄ": "*)/o",
  "Ὅ": "*(/o",
  "ὐ": "u)",
  "ὑ": "u(",
  "ὒ": "u)\\",
  "ὓ": "u(\\",
  "ὔ": "u)/",
  "ὕ": "u(/",
  "ὖ": "u)=",
  "ὗ": "u(=",
  "Ὑ": "*(u",
  "Ὓ": "*(\\u",
  "Ὕ": "*(/u",
  "Ὗ": "*(=u",
  "ὠ": "w)",
  "ὡ": "w(",
  "ὢ": "w)\\",
  "ὣ": "w(\\",
  "ὤ": "w)/",
  "ὥ": "w(/",
  "ὦ": "w)=",
  "ὧ": "w(=",
  "Ὠ": "*)w",
  "Ὡ": "*(w",
  "Ὢ": "*)\\w",
  "Ὣ": "*(\\w",
  "Ὤ": "*)/w",
  "Ὥ": "*(/w",
  "Ὦ": "*)=w",
  "Ὧ": "*(=w",
  "ὰ": "a\\",
  "ὲ": "e\\",
  "ὴ": "h\\",
  "ὶ": "i\\",
  "ὸ": "o\\",
  "ὺ": "u\\",
  "ὼ": "w\\",
  "ᾀ": "a)|",
  "ᾁ": "a(|",
  "ᾂ": "a)\\|",
  "ᾃ": "a(\\|",
  "ᾄ": "a)/|",
  "ᾅ": "a(/|",
  "ᾆ": "a)=|",
  "ᾇ": "a(=|",
  "ᾈ": "*)|a",
  "ᾉ": "*(|a",
  "ᾊ": "*)\\|a",
  "ᾋ": "*(\\|a",
  "ᾌ": "*)/|a",
  "ᾍ": "*(/|a",
  "ᾎ": "*)=|a",
  "ᾏ": "*(=|a",
  "ᾐ": "h)|",
  "ᾑ": "h(|",
  "ᾒ": "h)\\|",
  "ᾓ": "h(\\|",
  "ᾔ": "h)/|",
  "ᾕ": "h(/|",
  "ᾖ": "h)=|",
  "ᾗ": "h(=|",
  "ᾘ": "*)|h",
  "ᾙ": "*(|h",
  "ᾚ": "*)\\|h",
  "ᾛ": "*(\\|h",
  "ᾜ": "*)/|h",
  "ᾝ": "*(/|h",
  "ᾞ": "*)=|h",
  "ᾟ": "*(=|h",
  "ᾠ": "w)|",
  "ᾡ": "w(|",
  "ᾢ": "w)\\|",
  "ᾣ": "w(\\|",
  "ᾤ": "w)/|",
  "ᾥ": "w(/|",
  "ᾦ": "w)=|",
  "ᾧ": "w(=|",
  "ᾨ": "*)|w",
  "ᾩ": "*(|w",
  "ᾪ": "*)\\|w",
  "ᾫ": "*(\\|w",
  "ᾬ": "*)/|w",
  "ᾭ": "*(/|w",
  "ᾮ": "*)=|w",
  "ᾯ": "*(=|w",
  "ᾲ": "a\\|",
  "ᾳ": "a|",
  "ᾴ": "a/|",
  "ᾶ": "a=",
  "ᾷ": "a=|",
  "Ὰ": "*\\a",
  "ᾼ": "*|a",
  "᾽": "'",
  "ῂ": "h\\|",
  "ῃ": "h|",
  "ῄ": "h/|",
  "ῆ": "h=",
  "ῇ": "h=|",
  "Ὲ": "*\\e",
  "Ὴ": "*\\h",
  "ῌ": "*|h",
  "ῒ": "i\\+",
  "ῖ": "i=",
  "ῗ": "i=+",
  "Ὶ": "*\\i",
  "ῢ": "u\\+",
  "ῤ": "r)",
  "ῥ": "r(",
  "ῦ": "u=",
  "ῧ": "u=+",
  "Ὺ": "*\\u",
  "Ῥ": "*(r",
  "ῲ": "w\\|",
  "ῳ": "w|",
  "ῴ": "w/|",
  "ῶ": "w=",
  "ῷ": "w=|",
  "Ὸ": "*\\o",
  "Ὼ": "*\\w",
  "ῼ": "*|w",
  "—": "_"
}

},{}]},{},[1]);
