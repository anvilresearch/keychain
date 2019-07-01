/**
 * Dependencies
 */
const SupportedAlgorithms = require('./SupportedAlgorithms')
const RsaKeyPair = require('./RsaKeyPair')
const EcdsaKeyPair = require('./EcdsaKeyPair')

/**
 * Supported Algorithms
 */
let supportedAlgorithms = new SupportedAlgorithms()

/**
 * RSASSA-PKCS1-v1_5
 */
supportedAlgorithms.define('RS256', 'generateKey', RsaKeyPair)
supportedAlgorithms.define('RS384', 'generateKey', RsaKeyPair)
supportedAlgorithms.define('RS512', 'generateKey', RsaKeyPair)
supportedAlgorithms.define('RS256', 'importKey', RsaKeyPair)
supportedAlgorithms.define('RS384', 'importKey', RsaKeyPair)
supportedAlgorithms.define('RS512', 'importKey', RsaKeyPair)

/**
 * ECDSA
 */
supportedAlgorithms.define('KS256', 'generateKey', EcdsaKeyPair)
supportedAlgorithms.define('KS384', 'generateKey', EcdsaKeyPair)
supportedAlgorithms.define('KS512', 'generateKey', EcdsaKeyPair)
supportedAlgorithms.define('KS256', 'importKey', EcdsaKeyPair)
supportedAlgorithms.define('KS384', 'importKey', EcdsaKeyPair)
supportedAlgorithms.define('KS512', 'importKey', EcdsaKeyPair)

/**
 * Export
 */
module.exports = supportedAlgorithms
