export default {
  account_channels: {
    command: 'account_channels',
    account: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH',
    destination_account: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
    ledger_index: 'validated'
  },
  account_currencies: {
    command: 'account_currencies',
    account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
    strict: true,
    ledger_index: 'validated'
  },
  account_info: {
    command: 'account_info',
    account: 'rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn',
    strict: true,
    ledger_index: 'current',
    queue: true
  },
  account_lines: {
    command: 'account_lines',
    account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59'
  },
  account_nfts: {
    command: 'account_nfts',
    account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59'
  },
  account_objects: {
    command: 'account_objects',
    account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
    ledger_index: 'validated',
    type: 'state',
    deletion_blockers_only: false,
    limit: 10
  },
  account_offers: {
    command: 'account_offers',
    account: 'rpP2JgiMyTF5jR5hLG3xHCPi1knBb1v9cM'
  },
  account_tx: {
    command: 'account_tx',
    account: 'rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w',
    ledger_index_min: -1,
    ledger_index_max: -1,
    binary: false,
    limit: 2,
    forward: false
  },
  book_offers: {
    command: 'book_offers',
    taker: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
    taker_gets: {
      currency: 'XRP'
    },
    taker_pays: {
      currency: 'USD',
      issuer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'
    },
    limit: 10
  },
  channel_verify: {
    command: 'channel_verify',
    channel_id: '5DB01B7FFED6B67E6B0414DED11E051D2EE2B7619CE0EAA6286D67A3A4D5BDB3',
    signature: '304402204EF0AFB78AC23ED1C472E74F4299C0C21F1B21D07EFC0A3838A420F76D783A400220154FB11B6F54320666E4C36CA7F686C16A3A0456800BBC43746F34AF50290064',
    public_key: 'aB44YfzW24VDEJQ2UuLPV2PvqcPCSoLnL7y5M1EzhdW4LnK5xMS3',
    amount: '1000000'
  },
  deposit_authorized: {
    command: 'deposit_authorized',
    source_account: 'rEhxGqkqPPSxQ3P25J66ft5TwpzV14k2de',
    destination_account: 'rsUiUMpnrgxQp24dJYZDhmV4bE3aBtQyt8',
    ledger_index: 'validated'
  },
  fee: {
    command: 'fee'
  },
  gateway_balances: {
    command: 'gateway_balances',
    account: 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q',
    strict: true,
    hotwallet: ['rKm4uWpg9tfwbVSeATv4KxDe6mpE9yPkgJ', 'ra7JkEzrgeKHdzKgo4EUUVBnxggY4z37kt'],
    ledger_index: 'validated'
  },
  ledger: {
    command: 'ledger',
    ledger_index: 'validated',
    full: false,
    accounts: false,
    transactions: false,
    expand: false,
    owner_funds: false
  },
  ledger_closed: {
    command: 'ledger_closed'
  },
  ledger_current: {
    command: 'ledger_current'
  },
  ledger_data: {
    ledger_hash: '842B57C1CC0613299A686D3E9F310EC0422C84D3911E5056389AA7E5808A93C8',
    command: 'ledger_data',
    limit: 5,
    binary: true
  },
  ledger_entry: {
    command: 'ledger_entry',
    index: '7DB0788C020F02780A673DC74757F23823FA3014C1866E72CC4CD8B226CD6EF4',
    ledger_index: 'validated'
  },
  manifest: {
    command: 'manifest',
    public_key: 'nHUFE9prPXPrHcG3SkwP1UzAQbSphqyQkQK9ATXLZsfkezhhda3p'
  },
  noripple_check: {
    command: 'noripple_check',
    account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
    role: 'gateway',
    ledger_index: 'current',
    limit: 2,
    transactions: true
  },
  path_find: {
    command: 'path_find',
    subcommand: 'create',
    source_account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
    destination_account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
    destination_amount: {
      value: '0.001',
      currency: 'USD',
      issuer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'
    }
  },
  ping: {
    command: 'ping'
  },
  random: {
    command: 'random'
  },
  ripple_path_find: {
    command: 'ripple_path_find',
    source_account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
    source_currencies: [
      {
        currency: 'XRP'
      },
      {
        currency: 'USD'
      }
    ],
    destination_account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
    destination_amount: {
      value: '0.001',
      currency: 'USD',
      issuer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'
    }
  },
  server_info: {
    command: 'server_info'
  },
  server_state: {
    command: 'server_state'
  },
  submit: {
    command: 'submit',
    tx_blob: '1200002280000000240000001E61D4838D7EA4C6800000000000000000000000000055534400000000004B4E9C06F24296074F7BC48F92A97916C6DC5EA968400000000000000B732103AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB7447304502210095D23D8AF107DF50651F266259CC7139D0CD0C64ABBA3A958156352A0D95A21E02207FCF9B77D7510380E49FF250C21B57169E14E9B4ACFD314CEDC79DDD0A38B8A681144B4E9C06F24296074F7BC48F92A97916C6DC5EA983143E9D4A2B8AA0780F682D136F7A56D6724EF53754'
  },
  subscribe: {
    command: 'subscribe',
    accounts: ['rrpNnNLKrartuEqfJGpqyDwPj1AFPg9vn1']
  },
  transaction_entry: {
    command: 'transaction_entry',
    tx_hash: 'C53ECF838647FA5A4C780377025FEC7999AB4182590510CA461444B207AB74A9',
    ledger_index: 56865245
  },
  tx: {
    command: 'tx',
    transaction: 'C53ECF838647FA5A4C780377025FEC7999AB4182590510CA461444B207AB74A9',
    binary: false
  },
  tx_history: {
    command: 'tx_history',
    start: 0
  },
  unsubscribe: {
    command: 'unsubscribe',
    streams: ['ledger', 'server', 'transactions', 'transactions_proposed'],
    accounts: ['rrpNnNLKrartuEqfJGpqyDwPj1AFPg9vn1'],
    accounts_proposed: ['rrpNnNLKrartuEqfJGpqyDwPj1AFPg9vn1'],
    books: [
      {
        taker_pays: {
          currency: 'XRP'
        },
        taker_gets: {
          currency: 'USD',
          issuer: 'rUQTpMqAF5jhykj4FExVeXakrZpiKF6cQV'
        },
        both: true
      }
    ]
  }
}
