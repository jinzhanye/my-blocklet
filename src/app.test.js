import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './app';

describe('App component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('search by hash', async () => {
    const mockData = {
      bits: 386863986,
      block_index: 662463,
      fee: 16583560,
      hash: '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa',
      height: 662463,
      main_chain: true,
      mrkl_root: 'b88a02199d8e3ea977aa66457801994031eeb6ca79bb16a4d09211af4e84f6ed',
      n_tx: 912,
      next_block: ['0000000000000000000ef9c073beedafb33a4f1874b80ac16500516e782f5b85'],
      nonce: 1285091394,
      prev_block: '0000000000000000000c9129f5a064d82c01682fc84819257f10ea1eccdb2b25',
      size: 1482301,
      time: 1608620982,
      tx: [
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
      ],
      ver: 536870912,
      weight: 3999475,
    };
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const jsdomAlert = window.alert;
    window.alert = () => {};

    render(<App />);

    fireEvent.change(screen.getByRole('searchInput'), {
      target: { value: '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa' },
    });

    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByRole('listItem')).toBeInTheDocument();

    window.alert = jsdomAlert;
  });
});
