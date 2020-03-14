import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthUtils from '../../util/AuthUtils';
import SubmitButton from '../../components/Button/Submit';
import FormContainer from '../../components/FormContainer';
import EmailInput from '../../components/TextInput/Email';
import { ProgressStatus } from '../../data-types';
import * as Actions from '../../actions/auth/resetPassword';
import { Action, Dispatch } from '../../actions';
import { ReduxRoot } from '../../reducers';
import styles from './styles';

const mapStateToProps = (state: ReduxRoot) => ({
  progress: state.auth.resetPassword.progress,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      resetUserPassword: Actions.resetUserPassword,
      clearProgress: () => (d: Dispatch) =>
        d(Actions.clearResetPasswordProgress()),
    },
    dispatch
  );

interface Props
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

const PasswordResetScreen = ({
  progress,
  resetUserPassword,
  clearProgress,
}: Props) => {
  const [email, setEmail] = useState('');

  const disabled =
    !AuthUtils.isValidEmail(email) ||
    progress.status === ProgressStatus.REQUEST ||
    progress.status === ProgressStatus.SUCCESS;

  useEffect(
    () => () => {
      clearProgress();
    },
    [clearProgress]
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <FormContainer progress={progress}>
        <EmailInput
          value={email}
          onChangeText={text => {
            if (progress.status !== ProgressStatus.NIL) clearProgress();
            setEmail(text.toLowerCase());
          }}
          style={styles.input}
        />
      </FormContainer>
      <SubmitButton
        label='Reset'
        onPress={() => {
          resetUserPassword(email);
        }}
        disabled={disabled}
        loading={progress.status === ProgressStatus.REQUEST}
      />
    </ScrollView>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetScreen);
