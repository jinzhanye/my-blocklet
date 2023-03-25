import './index.scss';
import IconCopy from '../../assets/images/icon-copy.png'

export default function Index(props) {
  const copy = (text) => {
    console.log('copy text:', text);
  };

  return (
    <div
      className="copy"
      onClick={(evt) => {
        evt.stopPropagation();
        copy(props.text);
      }}>
      <span>{props.text}</span>
      <img src={IconCopy} />
    </div>
  );
}
