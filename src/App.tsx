import React from 'react';
// import { StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { SplashScreen } from 'expo';
import { connect } from 'react-redux';
import Layout from './nav';
import * as Actions from './actions/auth/status';
import { ReduxRoot } from './reducers';
import { AuthStatus } from './data-types';

const mapStateToProps = (state: ReduxRoot) => ({
  authStatus: state.auth.status,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      subscribeToAuthStateChange: Actions.subscribeToAuthStateChange,
    },
    dispatch
  );

interface Props
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

class App extends React.PureComponent<Props> {
  unsubscribeFromAuthStateChange: ReturnType<
    ReturnType<
      ReturnType<typeof mapDispatchToProps>['subscribeToAuthStateChange']
    >
  >;

  componentDidMount() {
    SplashScreen.preventAutoHide();
    // StatusBar.setBarStyle('dark-content');
    this.unsubscribeFromAuthStateChange = this.props.subscribeToAuthStateChange();
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.authStatus === AuthStatus.Checking &&
      this.props.authStatus !== AuthStatus.Checking
    ) {
      SplashScreen.hide();
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromAuthStateChange();
  }

  render() {
    return <Layout authStatus={this.props.authStatus} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
