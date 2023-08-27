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
  submit_multisigned: {
    command: 'submit',
    tx_json: {
      Account: 'rEuLyBCvcw4CFmzv8RepSiAoNgF8tTGJQC',
      Fee: '30000',
      Flags: 262144,
      LimitAmount: {
        currency: 'USD',
        issuer: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
        value: '100'
      },
      Sequence: 2,
      Signers: [
        {
          Signer: {
            Account: 'rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW',
            SigningPubKey: '02B3EC4E5DD96029A647CFA20DA07FE1F85296505552CCAC114087E66B46BD77DF',
            TxnSignature: '30450221009C195DBBF7967E223D8626CA19CF02073667F2B22E206727BFE848FF42BEAC8A022048C323B0BED19A988BDBEFA974B6DE8AA9DCAE250AA82BBD1221787032A864E5'
          }
        },
        {
          Signer: {
            Account: 'rUpy3eEg8rqjqfUoLeBnZkscbKbFsKXC3v',
            SigningPubKey: '028FFB276505F9AC3F57E8D5242B386A597EF6C40A7999F37F1948636FD484E25B',
            TxnSignature: '30440220680BBD745004E9CFB6B13A137F505FB92298AD309071D16C7B982825188FD1AE022004200B1F7E4A6A84BB0E4FC09E1E3BA2B66EBD32F0E6D121A34BA3B04AD99BC1'
          }
        }
      ],
      SigningPubKey: '',
      TransactionType: 'TrustSet',
      hash: 'BD636194C48FD7A100DE4C972336534C8E710FD008C0F3CF7BC5BF34DAF3C3E6'
    }
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

export const groupedCommands = [
  {
    title: 'Account Methods',
    items: [
      {
        name: 'account_channels',
        link: '/account_channels',
        href: 'https://docs',
        json: {
          command: 'account_channels',
          account: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH',
          destination_account: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
          ledger_index: 'validated'
        }
      },
      {
        name: 'account_currencies',
        link: '/account_currencies',
        href: 'https://docs',
        json: {
          command: 'account_currencies',
          account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
          strict: true,
          ledger_index: 'validated'
        }
      },
      {
        name: 'account_info',
        link: '/account_info',
        href: 'https://docs',
        json: {
          command: 'account_info',
          account: 'rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn',
          strict: true,
          ledger_index: 'current',
          queue: true
        }
      },
      {
        name: 'account_lines',
        link: '/account_lines',
        href: 'https://docs',
        json: {
          command: 'account_lines',
          account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59'
        }
      },
      {
        name: 'account_nfts',
        link: '/account_nfts',
        href: 'https://docs',
        json: {
          command: 'account_nfts',
          account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59'
        }
      },
      {
        name: 'account_objects',
        link: '/account_objects',
        href: 'https://docs',
        json: {
          command: 'account_objects',
          account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
          ledger_index: 'validated',
          type: 'state',
          deletion_blockers_only: false,
          limit: 10
        }
      },
      {
        name: 'account_offers',
        link: '/account_offers',
        href: 'https://docs',
        json: {
          command: 'account_offers',
          account: 'rpP2JgiMyTF5jR5hLG3xHCPi1knBb1v9cM'
        }
      },
      {
        name: 'account_tx',
        link: '/account_tx',
        href: 'https://docs',
        json: {
          command: 'account_tx',
          account: 'rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w',
          ledger_index_min: -1,
          ledger_index_max: -1,
          binary: false,
          limit: 2,
          forward: false
        }
      },
      {
        name: 'gateway_balances',
        link: '/gateway_balances',
        href: 'https://docs',
        json: {
          command: 'gateway_balances',
          account: 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q',
          strict: true,
          hotwallet: ['rKm4uWpg9tfwbVSeATv4KxDe6mpE9yPkgJ', 'ra7JkEzrgeKHdzKgo4EUUVBnxggY4z37kt'],
          ledger_index: 'validated'
        }
      },
      {
        name: 'noripple_check',
        link: '/noripple_check',
        href: 'https://docs',
        json: {
          command: 'noripple_check',
          account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
          role: 'gateway',
          ledger_index: 'current',
          limit: 2,
          transactions: true
        }
      }
    ]
  },
  {
    title: 'Ledger Methods',
    items: [
      {
        name: 'ledger',
        link: '/ledger',
        href: 'https://docs',
        json: {
          command: 'ledger',
          ledger_index: 'validated',
          full: false,
          accounts: false,
          transactions: false,
          expand: false,
          owner_funds: false
        }
      },
      {
        name: 'ledger_closed',
        link: '/ledger_closed',
        href: 'https://docs',
        json: {
          command: 'ledger_closed'
        }
      },
      {
        name: 'ledger_current',
        link: '/ledger_current',
        href: 'https://docs',
        json: {
          command: 'ledger_current'
        }
      },
      {
        name: 'ledger_data',
        link: '/ledger_data',
        href: 'https://docs',
        json: {
          ledger_hash: '842B57C1CC0613299A686D3E9F310EC0422C84D3911E5056389AA7E5808A93C8',
          command: 'ledger_data',
          limit: 5,
          binary: true
        }
      },
      {
        name: 'ledger_entry',
        link: '/ledger_entry',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          index: '7DB0788C020F02780A673DC74757F23823FA3014C1866E72CC4CD8B226CD6EF4',
          ledger_index: 'validated'
        }
      }
    ]
  },
  {
    title: 'Transaction Methods',
    items: [
      {
        name: 'submit',
        link: '/submit',
        href: 'https://docs',
        json: {
          command: 'submit',
          tx_blob: '1200002280000000240000001E61D4838D7EA4C6800000000000000000000000000055534400000000004B4E9C06F24296074F7BC48F92A97916C6DC5EA968400000000000000B732103AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB7447304502210095D23D8AF107DF50651F266259CC7139D0CD0C64ABBA3A958156352A0D95A21E02207FCF9B77D7510380E49FF250C21B57169E14E9B4ACFD314CEDC79DDD0A38B8A681144B4E9C06F24296074F7BC48F92A97916C6DC5EA983143E9D4A2B8AA0780F682D136F7A56D6724EF53754'
        }
      },
      {
        name: 'submit_multisigned',
        link: '/submit_multisigned',
        href: 'https://docs',
        json: {
          command: 'submit_multisigned',
          tx_json: {
            Account: 'rEuLyBCvcw4CFmzv8RepSiAoNgF8tTGJQC',
            Fee: '30000',
            Flags: 262144,
            LimitAmount: {
              currency: 'USD',
              issuer: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
              value: '100'
            },
            Sequence: 2,
            Signers: [
              {
                Signer: {
                  Account: 'rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW',
                  SigningPubKey: '02B3EC4E5DD96029A647CFA20DA07FE1F85296505552CCAC114087E66B46BD77DF',
                  TxnSignature: '30450221009C195DBBF7967E223D8626CA19CF02073667F2B22E206727BFE848FF42BEAC8A022048C323B0BED19A988BDBEFA974B6DE8AA9DCAE250AA82BBD1221787032A864E5'
                }
              },
              {
                Signer: {
                  Account: 'rUpy3eEg8rqjqfUoLeBnZkscbKbFsKXC3v',
                  SigningPubKey: '028FFB276505F9AC3F57E8D5242B386A597EF6C40A7999F37F1948636FD484E25B',
                  TxnSignature: '30440220680BBD745004E9CFB6B13A137F505FB92298AD309071D16C7B982825188FD1AE022004200B1F7E4A6A84BB0E4FC09E1E3BA2B66EBD32F0E6D121A34BA3B04AD99BC1'
                }
              }
            ],
            SigningPubKey: '',
            TransactionType: 'TrustSet',
            hash: 'BD636194C48FD7A100DE4C972336534C8E710FD008C0F3CF7BC5BF34DAF3C3E6'
          }
        }
      },
      {
        name: 'transaction_entry',
        link: '/transaction_entry',
        href: 'https://docs',
        json: {
          command: 'transaction_entry',
          tx_hash: 'E08D6E9754025BA2534A78707605E0601F03ACE063687A0CA1BDDACFCD1698C7',
          ledger_index: 348734
        }
      },
      {
        name: 'tx',
        link: '/tx',
        href: 'https://docs',
        json: {
          command: 'tx',
          transaction: 'E08D6E9754025BA2534A78707605E0601F03ACE063687A0CA1BDDACFCD1698C7',
          binary: false
        }
      }
    ]
  },
  {
    title: 'Order Book Methods',
    items: [
      {
        name: 'book_offers',
        link: '/book_offers',
        href: 'https://docs',
        json: {
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
        }
      },
      {
        name: 'deposit_authorized',
        link: '/deposit_authorized',
        href: 'https://docs',
        json: {
          command: 'deposit_authorized',
          source_account: 'rEhxGqkqPPSxQ3P25J66ft5TwpzV14k2de',
          destination_account: 'rsUiUMpnrgxQp24dJYZDhmV4bE3aBtQyt8',
          ledger_index: 'validated'
        }
      },
      {
        name: 'path_find',
        link: '/path_find',
        href: 'https://docs',
        json: {
          command: 'path_find',
          subcommand: 'create',
          source_account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
          destination_account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
          destination_amount: {
            value: '0.001',
            currency: 'USD',
            issuer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'
          }
        }
      },
      {
        name: 'ripple_path_find',
        link: '/ripple_path_find',
        href: 'https://docs',
        json: {
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
        }
      }
    ]
  },
  {
    title: 'Subscription Methods',
    items: [
      {
        name: 'subscribe',
        link: '/subscribe',
        href: 'https://docs',
        json: {
          command: 'subscribe',
          accounts: ['rrpNnNLKrartuEqfJGpqyDwPj1AFPg9vn1']
        }
      },
      {
        name: 'unsubscribe',
        link: '/unsubscribe',
        href: 'https://docs',
        json: {
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
    ]
  },
  {
    title: 'Server Info Methods',
    items: [
      {
        name: 'fee',
        link: '/fee',
        href: 'https://docs',
        json: {
          command: 'fee',
          tx_blob: '1200002280000000240000001E61D4838D7EA4C6800000000000000000000000000055534400000000004B4E9C06F24296074F7BC48F92A97916C6DC5EA968400000000000000B732103AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB7447304502210095D23D8AF107DF50651F266259CC7139D0CD0C64ABBA3A958156352A0D95A21E02207FCF9B77D7510380E49FF250C21B57169E14E9B4ACFD314CEDC79DDD0A38B8A681144B4E9C06F24296074F7BC48F92A97916C6DC5EA983143E9D4A2B8AA0780F682D136F7A56D6724EF53754'
        }
      },
      {
        name: 'server_info',
        link: '/server_info',
        href: 'https://docs',
        json: {
          command: 'server_info'
        }
      },
      {
        name: 'server_state',
        link: '/server_state',
        href: 'https://docs',
        json: {
          command: 'server_state'
        }
      }
    ]
  },
  {
    title: 'Util Methods',
    items: [
      {
        name: 'ping',
        link: '/ping',
        href: 'https://docs',
        json: {
          command: 'ping'
        }
      },
      {
        name: 'random',
        link: '/random',
        href: 'https://docs',
        json: {
          command: 'random'
        }
      }
    ]
  }
]
