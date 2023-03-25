import './index.scss';

export default function Index(props) {
  const copy = (text) => {
    console.log('copy text:', text);
  };

  return (
    <div
      className="copy"
      onClick={() => {
        copy(props.text);
      }}>
      {props.text}
    </div>
  );
}
