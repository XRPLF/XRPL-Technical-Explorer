import crypto from 'crypto'

const hookHashToLedgerObjectHash = (hookHash) => {
  return crypto.createHash('SHA512')
    .update(Buffer.from('0044' + hookHash, 'hex'))
    .digest().slice(0, 32).toString('hex')
    .toUpperCase()
}

export {
  hookHashToLedgerObjectHash
}
