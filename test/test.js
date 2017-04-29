'use strict';

var expect = require('chai').expect;
var bc = require('../index');

describe('#greekToBetaCode', function() {
  it('should say hello world', function() {
    expect(bc.greekToBetaCode()).to.equal('xai=re w)= ko/sme');
  });
});

describe('#betaCodeToGreek', function() {
  it('should say hello world', function() {
    expect(bc.betaCodeToGreek()).to.equal('χαῖρε ὦ κόσμε');
  })
});
