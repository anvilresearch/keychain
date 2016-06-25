'use strict'

/**
 * Dependencies
 */
const JWK = require('./JWK')

/**
 * EncryptedJWK
 *
 * @class
 * EncryptedJWK extends JWK and adds methods suitable for serializing and
 * deserializing a private key JWK.
 */
class EncryptedJWK extends JWK {

  /**
   * Serialize
   */
  toJWE () {}

  /**
   * Deserialize
   */
  static fromJWE () {}
}

/**
 * Export
 */
module.exports = EncryptedJWK
