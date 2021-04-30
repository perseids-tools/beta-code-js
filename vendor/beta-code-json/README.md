# Beta Code JSON

Map of Greek Beta Code characters to Unicode and from Unicode to Beta Code.

## Standard

The mappings in this repository aim mostly to conform to the TLG standard
specified [here](http://stephanus.tlg.uci.edu/encoding.php).

Not every application that uses Greek Beta Code follows the TLG standard exactly.
The mappings try to capture these nonstandard uses without breaking Beta Code encoded
according to the standard in the following ways:

* Lowercase Latin letters can be used in the Beta Code (e.g. `a`, `w=`)
* Uppercase Greek letters can be keyed 1. asterisk, 2. breathing, 3. accent, 4. iota subscript, 5. letter (e.g. `*(=|W`)
* Uppercase Greek letters can be keyed 1. asterisk, 2. letter, 3. breathing, 4. accent, 5. iota subscript (e.g. `*W(=|`)

## Example uses

* [https://github.com/perseids-tools/beta-code-js](https://github.com/perseids-tools/beta-code-js)
* [https://github.com/perseids-tools/beta-code-rb](https://github.com/perseids-tools/beta-code-rb)
* [https://github.com/perseids-tools/beta-code-py](https://github.com/perseids-tools/beta-code-py)
