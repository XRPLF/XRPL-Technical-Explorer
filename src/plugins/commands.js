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
      },
      {
        name: 'ledger_entry_account_root',
        link: '/ledger_entry_account_root',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          account_root: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
          ledger_index: 'validated'
        }
      },
      {
        name: 'ledger_entry_amm',
        link: '/ledger_entry_amm',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          amm: {
            asset: {
              currency: 'XRP'
            },
            asset2: {
              currency: 'TST',
              issuer: 'rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd'
            }
          },
          ledger_index: 'validated'
        }
      },
      {
        name: 'ledger_entry_directory_node',
        link: '/ledger_entry_directory_node',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          directory: {
            owner: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
            sub_index: 0
          },
          ledger_index: 'validated'
        }
      },
      {
        name: 'ledger_entry_nft_page',
        link: '/ledger_entry_nft_page',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          nft_page: '255DD86DDF59D778081A06D02701E9B2C9F4F01DFFFFFFFFFFFFFFFFFFFFFFFF',
          ledger_index: 'validated'
        }
      },
      {
        name: 'ledger_entry_offer',
        link: '/ledger_entry_offer',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          offer: {
            account: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
            seq: 359
          },
          ledger_index: 'validated'
        }
      },
      {
        name: 'ledger_entry_ripple_state',
        link: '/ledger_entry_ripple_state',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          ripple_state: {
            accounts: [
              'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
              'rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW'
            ],
            currency: 'USD'
          },
          ledger_index: 'validated'
        }
      },
      {
        name: 'ledger_entry_check',
        link: '/ledger_entry_check',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          check: 'C4A46CCD8F096E994C4B0DEAB6CE98E722FC17D7944C28B95127C2659C47CBEB',
          ledger_index: 'validated'
        }
      },
      {
        name: 'ledger_entry_escrow',
        link: '/ledger_entry_escrow',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          escrow: {
            owner: 'rL4fPHi2FWGwRGRQSH7gBcxkuo2b9NTjKK',
            seq: 126
          },
          ledger_index: 'validated'
        }
      },
      {
        name: 'ledger_entry_pay_channel',
        link: '/ledger_entry_pay_channel',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          payment_channel: 'C7F634794B79DB40E87179A9D1BF05D05797AE7E92DF8E93FD6656E8C4BE3AE7',
          ledger_index: 'validated'
        }
      },
      {
        name: 'ledger_entry_deposit_preauth',
        link: '/ledger_entry_deposit_preauth',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          deposit_preauth: {
            owner: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
            authorized: 'ra5nK24KXen9AHvsdFTKHSANinZseWnPcX'
          },
          ledger_index: 'validated'
        }
      },
      {
        name: 'ledger_entry_ticket',
        link: '/ledger_entry_ticket',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          ticket: {
            account: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
            ticket_seq: 389
          },
          ledger_index: 'validated'
        }
      },
      {
        name: 'ledger_entry_uri_token',
        link: '/ledger_entry_uri_token',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          uri_token: {
            issuer: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
            uri: '68747470733A2F2F746573742E636F6D'
          }
        }
      },
      {
        name: 'ledger_entry_hook',
        link: '/ledger_entry_hook',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          hook: {
            account: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh'
          }
        }
      },
      {
        name: 'ledger_entry_hook_definition',
        link: '/ledger_entry_hook_definition',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          hook_definition: 'C7F634794B79DB40E87179A9D1BF05D05797AE7E92DF8E93FD6656E8C4BE3AE7'
        }
      },
      {
        name: 'ledger_entry_emitted_txn',
        link: '/ledger_entry_emitted_txn',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          emitted_txn: 'C7F634794B79DB40E87179A9D1BF05D05797AE7E92DF8E93FD6656E8C4BE3AE7'
        }
      },
      {
        name: 'ledger_entry_hook_state',
        link: '/ledger_entry_hook_state',
        href: 'https://docs',
        json: {
          command: 'ledger_entry',
          hook_state: {
            account: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
            key: '7DB0788C020F02780A673DC74757F23823FA3014C1866E72CC4CD8B226CD6EF4',
            namespace_id: '4FF9961269BF7630D32E15276569C94470174A5DA79FA567C0F62251AA9A36B9'
          }
        }
      },
      {
        name: 'account_namespace',
        link: '/account_namespace',
        href: 'https://docs',
        json: {
          command: 'account_namespace',
          account: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
          namespace_id: '4FF9961269BF7630D32E15276569C94470174A5DA79FA567C0F62251AA9A36B9'
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
        name: 'nft_buy_offers',
        link: '/nft_buy_offers',
        href: 'https://docs',
        json: {
          command: 'nft_buy_offers',
          nft_id: '00090000D0B007439B080E9B05BF62403911301A7B1F0CFAA048C0A200000007',
          ledger_index: 'validated'
        }
      },
      {
        name: 'nft_sell_offers',
        link: '/nft_sell_offers',
        href: 'https://docs',
        json: {
          command: 'nft_sell_offers',
          nft_id: '00090000D0B007439B080E9B05BF62403911301A7B1F0CFAA048C0A200000007',
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
      },
      {
        name: 'amm_info',
        link: '/amm_info',
        href: 'https://docs',
        json: {
          command: 'amm_info',
          asset: {
            currency: 'XRP'
          },
          asset2: {
            currency: 'TST',
            issuer: 'rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd'
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
      },
      {
        name: 'server_definitions',
        link: '/server_definitions',
        href: 'https://docs',
        json: {
          command: 'server_definitions'
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
