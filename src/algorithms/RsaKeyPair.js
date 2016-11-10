/**
 * Dependencies
 */
const crypto = require('webcrypto')
const base64url = require('base64url')

/**
 * RsaKeyPair
 */
class RsaKeyPair {

  /**
   * constructor
   */
  constructor (params) {
    let name = 'RSASSA-PKCS1-v1_5'
    let {alg, modulusLength, publicExponent, usages} = params
    let hashLengthValid = alg.match(/(256|384|512)$/)
    let hashLength = hashLengthValid && hashLengthValid.shift()
    let hash = { name: `SHA-${hashLength}` }

    if (!hashLength) {
      throw new DataError('Invalid hash length')
    }

    if (!modulusLength) {
      modulusLength = 4096
    }

    if (!publicExponent) {
      publicExponent = new Uint8Array([0x01, 0x00, 0x01])
    }

    if (!usages) {
      usages = ['sign', 'verify']
    }

    this.algorithm = {name, modulusLength, publicExponent, hash}
    this.extractable = true
    this.usages = usages
  }

  /**
   * generateKey
   */
  generateKey () {
    let {algorithm, extractable, usages} = this

    return crypto.subtle
      .generateKey(algorithm, extractable, usages)
      .then(this.setCryptoKeyPair)
      .then(this.setJwkKeyPair)
  }

  /**
   * setCryptoKeyPair
   */
  setCryptoKeyPair (cryptoKeyPair) {
    let result = {}

    Object.defineProperty(result, 'privateKey', {
      enumerable: false,
      value: cryptoKeyPair.privateKey
    })

    Object.defineProperty(result, 'publicKey', {
      enumerable: false,
      value: cryptoKeyPair.publicKey
    })

    return result
  }

  /**
   * setJwkKeyPair
   */
  setJwkKeyPair (result) {
    return Promise.all([
      crypto.subtle.exportKey('jwk', result.privateKey),
      crypto.subtle.exportKey('jwk', result.publicKey)
    ])
    .then(jwks => {
      let [privateJwk, publicJwk] = jwks

      result.privateJwk = Object.assign({
        kid: base64url(Buffer.from(crypto.getRandomValues(new Uint8Array(8))))
      }, privateJwk)

      result.publicJwk = Object.assign({
        kid: base64url(Buffer.from(crypto.getRandomValues(new Uint8Array(8))))
      }, publicJwk)

      return result
    })
  }
}

/**
 * Export
 */
module.exports = RsaKeyPair