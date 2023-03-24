function Home() {
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
