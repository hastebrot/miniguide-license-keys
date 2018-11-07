const { Uint8Array, Uint32Array, Float64Array } = require("core-js/es6/typed")
const typed = require("core-js/es6/typed")
const nacl = require("tweetnacl")

// console.log(nacl.hash(new typed.Uint8Array([1, 2, 3])))

window.nacl = nacl
window.Uint8Array = Uint8Array
window.Uint32Array = Uint32Array
window.Float64Array = Float64Array
