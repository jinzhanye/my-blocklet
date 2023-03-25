import { useState } from 'react';
import dayjs from 'dayjs';
import './index.scss';
import ReactPaginate from 'react-paginate';
import Copy from '../../components/copy';
// import Pager from '../../components/pager';

let testTxs = [
  {
    hash: 'ecbaf13b3c726f7f3b03bc2578def60dc6c41259bc07ac4af2a6a7bfc09ce337',
    ver: 2,
    vin_sz: 3,
    vout_sz: 1,
    size: 536,
    weight: 1175,
    fee: 93431,
    relayed_by: '0.0.0.0',
    lock_time: 662462,
    tx_index: 1966423263409396,
    double_spend: false,
    time: 1608620982,
    block_index: 662463,
    block_height: 662463,
    inputs: [
      {
        sequence: 4294967294,
        witness:
          '0247304402207ccd670d9e8ab968e31d4858be19311cd1e6b8d6a4a2d3c576b7ca6c50d7f47a02204e6950a2f073169d14e7da3541b4b48abdea6ccac89d1a65e9ea26bc9c2afc3e012102d7d92bcf252355fe944ecb76f3e5e6afebc1748a784656d9a7fd8203b5131ad9',
        script: '',
        index: 0,
        prev_out: {
          addr: 'bc1qq5l34rvg7lzynr2cv8m3jf0cne8au0g6kn7s4x',
          n: 0,
          script: '0014053f1a8d88f7c4498d5861f71925f89e4fde3d1a',
          spending_outpoints: [
            {
              n: 0,
              tx_index: 1966423263409396,
            },
          ],
          spent: true,
          tx_index: 6259734792976457,
          type: 0,
          value: 851770,
        },
      },
      {
        sequence: 4294967294,
        witness:
          '02473044022027724715d97cf477cd8eff532523d52760a190aacf7754c5a3cbc0b67ef02de8022014c12e4f7bf56cafb104fa85fa564489bd887b895bd86cd431589656c5e2493f012102338d2f0ddc12292ae89614521ef36eb6a22cf2b8bc04b0df1691e64f44f208d9',
        script: '16001427710c80f6751e0a036c403254f5813725618c84',
        index: 1,
        prev_out: {
          addr: '39B8Q3Z3hhva3RWn55qqjxkaaF9BaRe6dG',
          n: 0,
          script: 'a9145219ee887d27caced4018ef75711c8b71f04ee7387',
          spending_outpoints: [
            {
              n: 1,
              tx_index: 1966423263409396,
            },
          ],
          spent: true,
          tx_index: 973819361762426,
          type: 0,
          value: 209661,
        },
      },
      {
        sequence: 4294967294,
        witness:
          '0247304402204a9f2cc763b902332490fbd48153587725682e12c787b52c4efe14298d126159022078c6b367095f4b4160e75e72aa0db6cc7f94c3c2d1299bdae74223b7fc05f9be012102f21cae887977bf0635b7795c3bb0221c8bcb013e72b568a2f585eb13e59d9b39',
        script: '1600149ba3afcea31d6c5a43aa7a49fef9457be71c0a51',
        index: 2,
        prev_out: {
          addr: '39mGiGTiPaX67Kxp77zx2XpojD8k1ivaZ2',
          n: 0,
          script: 'a914588f03c9f83d0db6ac1236955dccff4339cb4fda87',
          spending_outpoints: [
            {
              n: 2,
              tx_index: 1966423263409396,
            },
          ],
          spent: true,
          tx_index: 6429141544781108,
          type: 0,
          value: 3000000,
        },
      },
    ],
    out: [
      {
        type: 0,
        spent: true,
        value: 3968000,
        spending_outpoints: [
          {
            tx_index: 6788440544731550,
            n: 0,
          },
        ],
        n: 0,
        tx_index: 1966423263409396,
        script: '76a9141c045845e00a160397b2cc62b9876bb6d9835e4d88ac',
        addr: '13Z98FkiVvMNDqvWAZKWnNg3F66GR8gUie',
      },
    ],
  },
];

testTxs = testTxs.concat(testTxs).concat(testTxs);
testTxs = testTxs.concat(testTxs).concat(testTxs);
testTxs = testTxs.concat(testTxs).concat(testTxs);
testTxs = testTxs.concat(testTxs).concat(testTxs);

function formatId(rawData) {
  if (!rawData) {
    return '-';
  }
  // '12345678901'.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  return `${rawData.substring(0, 4)}-${rawData.substring(rawData.length - 4, rawData.length)}`;
}

function formatInputBaseInfo(arr) {
  let text = '';
  let isIdExist = false;
  if (!arr || !arr.length) {
    text = 'Block Reward';
  } else if (arr.length === 1) {
    text = formatId(arr[0].witness);
    isIdExist = true;
  } else {
    text = `${arr.length} Inputs`;
  }

  return {
    text,
    isIdExist,
  };
}

function formatOutputBaseInfo(arr) {
  let text = '';
  let isIdExist = false;
  if (!arr || !arr.length) {
    text = '-';
  } else if (arr.length === 1) {
    text = formatId(arr[0].addr);
    isIdExist = true;
  } else {
    text = `${arr.length} Outputs`;
  }

  return {
    text,
    isIdExist,
  };
}

function formatInputArr(arr) {
  const placeholder = 'Block Reward';

  return (arr || []).map((item) => {
    return {
      isIdExist: !!item.addr,
      id: item.addr || placeholder,
      btcText: formatBTC(item.value),
    };
  });
}

function formatOutputArr(arr) {
  const placeholder = 'Unknown';

  return (arr || []).map((item) => {
    return {
      isIdExist: !!item.addr,
      id: item.addr || placeholder,
      btcText: formatBTC(item.value),
    };
  });
}

function formatBTC(rawData) {
  return `${((rawData || 0) / 100000000).toFixed(8)} BTC`;
}

function formatFee(rawData) {
  if (rawData < 1000) {
    return rawData;
  }

  return `${(rawData / 1000).toFixed(1)}K Sats`;
}

function getOutputSumBtcText(toArr) {
  const sum = toArr.reduce((result, item) => {
    return result + item.value;
  }, 0);

  return formatBTC(sum);
}

function formatData(rawData) {
  return rawData?.map((item, index) => {
    const { hash, time, inputs, out, fee } = item;
    const id = formatId(hash);
    const timeText = dayjs(time).format('DD/MM/YYYY HH:mm:ss');

    const { text: inputText, isIdExist: isInputIdExist } = formatInputBaseInfo(inputs, true);

    const { text: outputText, isIdExist: isOutputIdExist } = formatOutputBaseInfo(out, false);

    return {
      id,
      index,
      timeText,
      inputText,
      isInputIdExist,
      outputText,
      isOutputIdExist,
      btcText: getOutputSumBtcText(out),
      feeText: formatFee(fee),
      inputOutput: [
        {
          title: 'From',
          arr: formatInputArr(inputs),
        },
        {
          title: 'To',
          arr: formatOutputArr(out),
        },
      ],
    };
  });
}

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [openFlags, setOpenFlags] = useState(new Array(10).fill(false));
  const [txs, setTxs] = useState(formatData(testTxs));
  // setTxs(formatData(testTxs));

  const toggle = (txItemIndex) => {
    const newOpenFlags = [...openFlags];
    newOpenFlags[txItemIndex] = !newOpenFlags[txItemIndex];
    setOpenFlags(newOpenFlags);
  };

  const onSearch = async () => {
    // const hashVal = '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa';

    try {
      // const response = await fetch(`https://blockchain.info/rawblock/${inputValue}`);
      // const result = await response.json();
      // setTxs(formatData(result?.tx));
      setTxs(formatData(testTxs));
    } catch (err) {
      alert('fetch data error, please try again');
    }
  };

  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentTxs = txs.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(txs.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % txs.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="home">
      <div className="search-container">
        <input
          type="text"
          placeholder="Please input hash"
          onChange={(evt) => {
            setInputValue(evt.target.value);
          }}
        />
        <div className="search-button" onClick={onSearch}>
          Search
        </div>
      </div>

      <div className="list">
        {currentTxs.map((txItem, txItemLoopIndex) => {
          const openHeight = `${
            Math.max(txItem.inputOutput[0].arr.length, txItem.inputOutput[1].arr.length) * 50 + 40
          }px`;

          return (
            <div
              className="list-item"
              key={txItem.index}
              onClick={() => {
                toggle(txItemLoopIndex);
              }}>
              <div className="list-item-row-1">
                {/* <div className="avatar" /> */}

                {txItem.isInputIdExist ? (
                  <div className="avatar-tx">TX</div>
                ) : (
                  <div className="avatar-block-reward">
                    <div className="avatar-block-reward-icon" />
                  </div>
                )}

                <div className="list-item-container">
                  <div>
                    <div className="list-item-base">
                      <span className="mr4">{txItem.index}</span>
                      <span className="grey mr5">ID:</span>
                      <Copy text={txItem.id} />
                    </div>

                    <div className="grey">{txItem.timeText}</div>
                  </div>

                  <div>
                    <div>
                      <span className="mr5">From</span>
                      <span className="grey">{txItem.inputText}</span>
                    </div>

                    <div>
                      <span className="mr5">To</span>
                      <span className="grey">{txItem.outputText}</span>
                    </div>
                  </div>

                  <div className="value-container">
                    <div>
                      <div>{txItem.btcText}</div>
                    </div>

                    <div>
                      <span className="fee-label mr4">Fee</span>
                      <span>{txItem.feeText}</span>
                    </div>
                  </div>
                </div>

                <div className={`${openFlags[txItemLoopIndex] ? 'icon-arrow-up' : 'icon-arrow-down'}`} />
              </div>

              <div
                className={`list-item-row-2 ${openFlags[txItemLoopIndex] ? 'list-item-row-2--open' : ''}`}
                style={{ height: `${openFlags[txItemLoopIndex] ? openHeight : '0'}` }}>
                {txItem.inputOutput.map((item, itemIndex) => {
                  return (
                    <div key={itemIndex} className="in-and-out-container">
                      <strong>{item.title}</strong>
                      <div>
                        {item.arr.map((record, recordIndex) => {
                          return (
                            <div key={recordIndex} className="record-container">
                              <strong className="record-num">{recordIndex + 1}</strong>
                              <div className="record-info">
                                {record.isIdExist ? <Copy text={record.id} /> : <div>{record.id}</div>}

                                <div>{record.btcText}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pager">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}
