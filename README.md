# Beta Code JS

## Overview

Converts Greek beta code to Greek characters and vice versa.

## Try it Out

[https://apps.perseids.org/beta-code/](https://apps.perseids.org/beta-code/)

## Installation

`yarn add beta-code-js`

or

`npm install beta-code-js`

## Usage

```javascript
import { greekToBetaCode, betaCodeToGreek } from 'beta-code-js';

greekToBetaCode('χαῖρε ὦ κόσμε');
// => 'xai=re w)= ko/sme'

betaCodeToGreek('mh=nin a)/eide qea\\ *phlhi+a/dew *)axilh=os');
// => 'μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος'
```

or

```javascript
var bc = require('beta-code-js');

bc.greekToBetaCode('χαῖρε ὦ κόσμε');
// => 'xai=re w)= ko/sme'

bc.betaCodeToGreek('mh=nin a)/eide qea\\ *phlhi+a/dew *)axilh=os');
// => 'μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος'

```

## Usage in Browser

```html
<html>
<script src="bundle/beta-code.js"></script>

<body>
  <script>
    console.log(greekToBetaCode('χαῖρε ὦ κόσμε'));
    // => 'xai=re w)= ko/sme'

    console.log(betaCodeToGreek('mh=nin a)/eide qea\\ *phlhi+a/dew *)axilh=os'));
    // => 'μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος'
  </script>
</body>
</html>
```

## Setup

`yarn install`

## Tests

`yarn test`

## Building for Browser

`yarn bundle`

## Updating JSON

```bash
git subtree pull --prefix vendor/beta-code-json/ https://github.com/zfletch/beta-code-json master --squash
```

In the case of a merge conflict:

```bash
git checkout --theirs vendor/beta-code-json/
git add vendor/beta-code-json
git commit
```

## Publishing

* Bump version in `package.json`
* Run `yarn bundle`
* Commit and push to GitHub
* On GitHub, create a new release
* Run `npm publish`

## Notes

For the mappings between beta code and Unicode, see [https://github.com/zfletch/beta-code-json](https://github.com/zfletch/beta-code-json).
For an example of this package being used, see [https://github.com/zfletch/beta-code-converter-js](https://github.com/zfletch/beta-code-converter-js).
