import dayjs from 'dayjs';

const testTx = {
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
};

function formatId(rawData) {
  // '12345678901'.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  return `${rawData.substring(0, 4)}-${rawData.length - 4}`;
}

function formatInputOutputBaseInfo(arr, isInput) {
  let text = '';
  let showId = false;
  if (!arr || !arr.length) {
    text = 'Block Reward';
  } else if (arr.length === 1) {
    text = formatId(arr[0].witness);
    showId = true;
  } else {
    text = isInput ? `${arr.length} Inputs` : `${arr.length} Outputs`;
  }

  return {
    text,
    showId,
  };
}

function formatInputOutputArr(arr, isInput) {
  const placeholder = isInput ? 'Block Reward' : 'Unknown';

  return (arr || []).map((item) => {
    return {
      isIdExist: !!item.witness,
      id: item.witness || placeholder,
      btcText: formatBTC(item.value),
    };
  });
}

function formatBTC(rawData) {
  return `${((rawData || 0) / 100000000).toFixed(8)} BTC`;
}

function getOutputSumBtcText(toArr) {
  const sum = toArr.reduce((result, item) => {
    return result + item.value;
  }, 0);

  return formatBTC(sum);
}

function formatData(rawData) {
  const { hash, time, inputs, outputs, fee } = rawData;
  const id = formatId(hash);
  const timeText = dayjs(time).format('DD/MM/YYYY HH:mm:ss');

  const { text: inputText, showId: showInputId } = formatInputOutputBaseInfo(inputs, true);

  const { text: outputText, showId: showOutputId } = formatInputOutputBaseInfo(outputs, false);

  return {
    id,
    timeText,
    inputText,
    showInputId,
    outputText,
    showOutputId,
    btcText: getOutputSumBtcText(outputs),
    feeText: `${fee} Sats`,
    inputs: formatInputOutputArr(inputs, true),
    outputs: formatInputOutputArr(outputs, false),
  };
}

function Home() {
  formatData(testTx);
  const hashVal = '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa';
  fetch(`https://blockchain.info/rawblock/${hashVal}`)
    .then((response) => response.json())
    .then((result) => {
      console.log('result', result);
    });

  return (
    <div>
      <div>
        <input type="text" />
        <div className="search-button">Search</div>
      </div>

      <div className="list">
        <div className="list-item">
          <div className="list-item-row-1">
            <div className="avatar" />

            <div className="list-item-info">
              <div>
                <div>
                  <div>0</div>
                  <div>ID:</div>
                  <div>aba-123</div>
                </div>

                <div>12/22/2020, 15:09:42</div>
              </div>

              <div>
                <div>
                  <div>From</div>
                  <div>Block Reward</div>
                </div>

                <div>
                  <div>To</div>
                  <div>4 Outputs</div>
                </div>
              </div>

              <div>
                <div>
                  <div>6.41583560 BTC</div>
                </div>

                <div>
                  <div>Fee</div>
                  <div>0 Sats</div>
                </div>
              </div>
            </div>

            <div className="icon-arrow" />
          </div>

          <div className="list-item-row-2">
            <div>
              <strong>From</strong>
              <div>
                <div>1</div>
                <div>
                  <div>1BL1Y3VjyRBM44vr2parCXb9HquGDU4bdA</div>
                  <div>0.00506000 BTC</div>
                </div>
              </div>
            </div>

            <div>
              <strong>To</strong>
              <div className="flex-row">
                <div>1</div>
                <div>
                  <div>1BL1Y3VjyRBM44vr2parCXb9HquGDU4bdA</div>
                  <div>0.00506000 BTC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
