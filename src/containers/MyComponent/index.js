import React, { useEffect } from 'react';

import { connect } from '../../store';
import { useFormInput } from '../../hooks/formInput';
import Layout from '../../components/Layout';
import LoadingBar from '../../components/LoadingBar';
import { incrementCount } from '../../actions/countActions';
import { fetchColors } from '../../actions/currentColorActions';
import './index.css';

function MyComponent(props) {
  const { setValue: setColor, ...color} = useFormInput(props.colors.currentColor);

  useEffect(() => {
    setColor(props.colors.currentColor)
  }, [props.colors.currentColor]);

  useEffect(() => {
    props.getColors();
  }, []);

  return (
    <Layout>
      <h1>My Component</h1>
      <p>Current Color: <span style={{ padding: '5px', backgroundColor: props.colors.currentColor}}>{props.colors.currentColor}</span></p>
      <p>Current count:<b>{props.count}</b></p>
      <div className="button-container">
        <button onClick={props.increment}>INCREMENT</button>
        <button onClick={props.decrement}>DECREMENT</button>
        <button onClick={props.reset}>RESET</button>
        <input {...color} />
        <button onClick={() => props.setColor(color.value)}>SET_COLOR</button>
      </div>
      <div className="colors-container">
        <LoadingBar isLoading={props.colors.status === 'PENDING'} />
        {props.colors.items.map((colorItem, index) => (
          <div
            key={index}
            style={{ backgroundColor: colorItem }}
            onClick={() => props.setColor(colorItem)}
            className="color-item" />
        ))}
      </div>
    </Layout>
  )
}

const mapStateToProps = (state/*, ownProps*/) => {
  return {
    colors: state.colors,
    count: state.count,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch(incrementCount()),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' }),
    setColor: color => dispatch({ type: 'SET_COLOR', payload: color }),
    getColors: () => dispatch(fetchColors())
  }
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(MyComponent)
