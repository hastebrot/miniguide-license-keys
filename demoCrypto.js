// List of JavaScript Crypto libraries, https://gist.github.com/jo/8619441#gistcomment-1711368
// WebCrypto Polyfill for Node: https://github.com/PeculiarVentures/node-webcrypto-ossl
// https://github.com/diafygi/webcrypto-examples

const WebCrypto = require("node-webcrypto-ossl")
const { TextEncoder, TextDecoder } = require("text-encoder")
const webcrypto = new WebCrypto()

const nacl = require("tweetnacl")
const naclUtil = require("tweetnacl-util")

const run = action => action()

run(async () => {
  const keys = await webcrypto.subtle.generateKey({
    name: "RSASSA-PKCS1-v1_5",
    modulusLength: 1024,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: {
      name: "SHA-1"
    }
  }, false, ["sign", "verify"])

  const { privateKey, publicKey } = keys

  const data = new TextEncoder().encode("user:foo;version:1")
  const fakeData = new TextEncoder().encode("user:foo;version:2")

  const signature = await webcrypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    data
  )

  console.log("private key:", privateKey)
  console.log("public key:", publicKey)

  console.log("data:", naclUtil.encodeBase64(new Uint8Array(data)))
  console.log("signature:", naclUtil.encodeBase64(new Uint8Array(signature)))

  const result = await webcrypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    publicKey,
    signature,
    data
  )
  console.log(result)

  const fakeResult = await webcrypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    publicKey,
    signature,
    fakeData
  )
  console.log(fakeResult)
})
