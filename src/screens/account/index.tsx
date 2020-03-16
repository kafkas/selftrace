import React, { ReactElement, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import ButtonHighlight from '../../components/Button/Highlight';
import ScreenNavigator from '../../components/ScreenNavigator';
import * as Actions from '../../actions/auth/signout';
import { Action, Dispatch } from '../../actions';
import { ReduxRoot } from '../../reducers';
import { RED_COLOR } from '../../styles/colors';
import styles from './styles';

const mapStateToProps = (state: ReduxRoot) => ({
  progress: state.auth.signout.progress,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      signoutUser: Actions.signoutUser,
      clearProgress: () => (d: Dispatch) => d(Actions.clearSignoutProgress()),
    },
    dispatch
  );

interface Props
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

const AccountScreen = ({ signoutUser, clearProgress }: Props): ReactElement => {
  useEffect(
    () => () => {
      clearProgress();
    },
    [clearProgress]
  );

  return (
    <ScrollView style={styles.container}>
      <ScreenNavigator
        label={i18n.t('screens.account.profile')}
        screenKey='ProfileScreen'
      />
      <ScreenNavigator
        label={i18n.t('screens.account.updatePassword')}
        screenKey='PasswordUpdateScreen'
      />
      <ButtonHighlight
        label={i18n.t('buttons.signout')}
        labelColor={RED_COLOR}
        labelSize={16}
        onPress={(): void => {
          Alert.alert(
            i18n.t('alerts.signout.title'),
            i18n.t('alerts.signout.description'),
            [
              {
                text: i18n.t('alerts.signout.option1'),
                onPress: signoutUser,
              },
              { text: i18n.t('alerts.signout.cancel'), onPress: () => {} },
            ],
            { cancelable: false }
          );
        }}
        style={styles.signOutButton}
        containerStyle={styles.signOutButtonContainer}
      />
    </ScrollView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
