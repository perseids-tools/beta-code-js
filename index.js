(function () {
'use strict';

function greekToBetaCode () {
  return 'xai=re w)= ko/sme';
}

function betaCodeToGreek () {
  return 'χαῖρε ὦ κόσμε';
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    greekToBetaCode: greekToBetaCode,
    betaCodeToGreek: betaCodeToGreek
  };
} else if (typeof window !== 'undefined') {
  window.greekToBetaCode = greekToBetaCode;
  window.betaCodeToGreek = betaCodeToGreek;
}
})();
