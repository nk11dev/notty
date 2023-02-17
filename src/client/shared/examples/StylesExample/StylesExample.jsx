import './StylesExample.scss';

const StylesExample = (props) => {

  return (
    <div className="example-text">
      {props.text}
    </div>
  );
}

export default StylesExample;