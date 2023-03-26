import React from 'react';
import Copy from '../copy';
import './index.scss';

export default function BlockDetailItem(props) {
  return (<div className="block-detail-item">
    <div>{props.label}</div>
    {
      props.showCopy ? <Copy text={props.value} copyText={props.copyText} /> : <div>{props.value}</div>
    }
  </div>)
}
