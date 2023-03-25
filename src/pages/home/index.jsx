import React, { useState } from 'react';
import dayjs from 'dayjs';
import './index.scss';
import ReactPaginate from 'react-paginate';
import Copy from '../../components/copy';
import Loading from '../../components/loading';

function formatId(rawData) {
  if (!rawData) {
    return '-';
  }
  return `${rawData.substring(0, 4)}-${rawData.substring(rawData.length - 4, rawData.length)}`;
}

function formatInputBaseInfo(arr) {
  let text = '';
  let isIdExist = false;
  if (!arr || !arr.length || (arr.length === 1 && !arr[0]?.prev_out?.addr)) {
    text = 'Block Reward';
  } else if (arr.length === 1 && arr[0]?.prev_out?.addr) {
    text = formatId(arr[0]?.prev_out?.addr);
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
      isIdExist: !!item?.prev_out?.addr,
      id: item?.prev_out?.addr || placeholder,
      btcText: formatBTC(item?.prev_out?.value),
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

function formatTx(rawData, rawStartIndex) {
  let index = rawStartIndex;

  return rawData?.map((item) => {
    const { hash, time, inputs, out, fee } = item;
    const id = formatId(hash);
    const timeText = dayjs(time * 1000).format('DD/MM/YYYY HH:mm:ss');

    const { text: inputText, isIdExist: isInputIdExist } = formatInputBaseInfo(inputs, true);

    const { text: outputText, isIdExist: isOutputIdExist } = formatOutputBaseInfo(out, false);

    return {
      id,
      index: index++,
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

let rawTxData;

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [openFlags, setOpenFlags] = useState();
  const [loading, setLoading] = useState(false);
  const [currentTxs, setCurrentTxs] = useState([]);

  const itemsPerPage = 15;
  const [pageCount, setPageCount] = useState(0);

  const toggle = (txItemIndex) => {
    const newOpenFlags = [...openFlags];
    newOpenFlags[txItemIndex] = !newOpenFlags[txItemIndex];
    setOpenFlags(newOpenFlags);
  };

  const onSearch = async () => {
    // const hashVal = '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa';

    try {
      setLoading(true);
      const response = await fetch(`https://blockchain.info/rawblock/${inputValue}`);
      const result = await response.json();

      if (result.error) {
        alert(result?.message);
        return;
      }

      rawTxData = result?.tx;
      const newPageCount = Math.ceil(rawTxData.length / itemsPerPage);
      setPageCount(newPageCount);
      refreshCurrentTxs(0);
    } catch (err) {
      console.error('error:', err);
      alert('fetch data error, please try again');
    } finally {
      setLoading(false);
    }
  };

  const refreshCurrentTxs = (newOffset) => {
    const endOffset = newOffset + itemsPerPage;
    const newCurrentTxs = formatTx(rawTxData.slice(newOffset, endOffset), newOffset);
    setCurrentTxs(newCurrentTxs);
    setOpenFlags(new Array(newCurrentTxs.length).fill(false));
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % rawTxData.length;
    refreshCurrentTxs(newOffset);
  };

  return (
    <div className="home">
      <Loading isLoading={loading} />
      <div className="search-container">
        <input
          role="searchInput"
          type="text"
          placeholder="Please input hash"
          onChange={(evt) => {
            setInputValue(evt.target.value);
          }}
        />
        <div className="search-button"
             role="button"
             onClick={onSearch}>
          Search
        </div>
      </div>

      <div className="list">
        {currentTxs.map((txItem, txItemLoopIndex) => {
          const isPc = window.innerWidth >= 600;
          const openHeight = isPc
            ? `${Math.max(txItem.inputOutput[0].arr.length, txItem.inputOutput[1].arr.length) * 50 + 30}px`
            : `${(txItem.inputOutput[0].arr.length + txItem.inputOutput[1].arr.length) * 50 + 80}px`;

          return (
            <div
              className="list-item"
              role="listItem"
              key={txItem.index}
              onClick={() => {
                toggle(txItemLoopIndex);
              }}>
              <div className="list-item-row-1">
                {txItem.inputText !== 'Block Reward' ? (
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
                      {txItem.isInputIdExist ? (
                        <Copy text={txItem.inputText} />
                      ) : (
                        <span className="grey">{txItem.inputText}</span>
                      )}
                    </div>

                    <div>
                      <span className="mr5">To</span>
                      {txItem.isOutputIdExist ? (
                        <Copy text={txItem.outputText} />
                      ) : (
                        <span className="grey">{txItem.outputText}</span>
                      )}
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

      {pageCount > 0 ? (
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
      ) : null}
    </div>
  );
}
