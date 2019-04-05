import React from 'react';

import { connect} from '../../store';
import Layout from '../../components/Layout';

function MyOtherComponent(props) {
  return (
    <Layout>
      <h1>My Other Component</h1>
      <p>Current Color: <span style={{ padding: '5px', backgroundColor: props.currentColor}}>{props.currentColor}</span></p>
      <p>Current count:<b>{props.count}</b></p>
    </Layout>
  )
}

const mapStateToProps = (state/*, ownProps*/) => {
  return {
    currentColor: state.colors.currentColor,
    count: state.count,
  }
};

const withStore = connect(mapStateToProps);

export default withStore(MyOtherComponent);
