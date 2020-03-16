import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import SubmitButton from '../../components/Button/Submit';
import FormContainer from '../../components/FormContainer';
import EmailInput from '../../components/TextInput/Email';
import { ProgressStatus } from '../../data-types';
import * as Actions from '../../actions/auth/userInfo';
import AuthUtils from '../../util/AuthUtils';
import { Action, Dispatch } from '../../actions';
import { ReduxRoot } from '../../reducers';
import styles from './styles';

const mapStateToProps = (state: ReduxRoot) => ({
  currentEmail: state.auth.userInfo.email,
  progress: state.auth.userInfo.progress,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      uploadUserInfo: Actions.uploadUserInfo,
      clearProgress: () => (d: Dispatch) =>
        d(Actions.clearUpdateUserInfoProgress()),
    },
    dispatch
  );

interface Props
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

const ProfileScreen = ({
  currentEmail,
  progress,
  uploadUserInfo,
  clearProgress,
}: Props) => {
  const [email, setEmail] = useState(currentEmail);
  const submitDisabled =
    !AuthUtils.isValidEmail(email) || email === currentEmail;

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
        />
      </FormContainer>
      <SubmitButton
        label={i18n.t('buttons.update')}
        onPress={() => {
          uploadUserInfo({ email });
        }}
        disabled={submitDisabled}
        loading={false}
      />
    </ScrollView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
