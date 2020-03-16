import React, { ReactElement, useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import SubmitButton from '../../components/Button/Submit';
import FormContainer from '../../components/FormContainer';
import PasswordInput from '../../components/TextInput/Password';
import { ProgressStatus } from '../../data-types';
import AuthUtils from '../../util/AuthUtils';
import { ReduxRoot } from '../../reducers';
import * as Actions from '../../actions/auth/updatePassword';
import { Action, Dispatch } from '../../actions';
import styles from './styles';

const mapStateToProps = (state: ReduxRoot) => ({
  progress: state.auth.updatePassword.progress,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      updateUserPassword: Actions.updateUserPassword,
      clearProgress: () => (d: Dispatch) =>
        d(Actions.clearUpdatePasswordProgress()),
    },
    dispatch
  );

interface Props
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

const PasswordResetScreen = ({
  progress,
  updateUserPassword,
  clearProgress,
}: Props): ReactElement => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const disabled =
    password1 !== password2 ||
    !AuthUtils.isValidPassword(password1) ||
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
        <PasswordInput
          value={password1}
          onChangeText={text => {
            if (progress.status !== ProgressStatus.NIL) clearProgress();
            setPassword1(text);
          }}
          placeholder={i18n.t('inputs.newPasswordPlaceholder')}
        />
        <PasswordInput
          value={password2}
          onChangeText={text => {
            if (progress.status !== ProgressStatus.NIL) clearProgress();
            setPassword2(text);
          }}
          placeholder={i18n.t('inputs.confirmPasswordPlaceholder')}
        />
      </FormContainer>
      <SubmitButton
        label={i18n.t('buttons.update')}
        onPress={() => {
          updateUserPassword(password1);
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
