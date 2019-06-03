import React from 'react';

import { connect} from '../../store';
import Layout from '../../components/Layout';
import { incrementCount, decrementCount, incrementCountAndSetOrange, decrementCountAndSetRed } from '../../actions/countActions';
import { setColor } from '../../actions/currentColorActions';

function MyOtherComponent(props) {
  return (
    <Layout>
      <h1>My Other Component</h1>
      <p>Current Color: <span style={{ padding: '5px', backgroundColor: props.currentColor}}>{props.currentColor}</span></p>
      <p>Current count:<b>{props.count}</b></p>
        <div className="button-container">
            <button onClick={props.incrementCount}>INCREMENT</button>
            <button onClick={props.decrementCount}>DECREMENT</button>
            <button onClick={() => props.setColor('orange')}>SET_COLOR: ORANGE</button>
            <button onClick={props.incrementCountAndSetOrange}>INCREMENT & SET_COLOR: ORANGE</button>
            <button onClick={props.decrementCountAndSetRed}>DECREMENT & SET_COLOR: RED</button>
        </div>
    </Layout>
  )
}

const mapStateToProps = (state/*, ownProps*/) => {
  return {
    currentColor: state.colors.currentColor,
    count: state.count,
  }
};

const mapDispatchToProps = ({
    incrementCount,
    decrementCount,
    setColor,
    incrementCountAndSetOrange,
    decrementCountAndSetRed,
});

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(MyOtherComponent);
