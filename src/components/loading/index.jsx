import './index.scss';

export default function Loading(props) {
  return props.isLoading ? <div className="loading" /> : '';
}
