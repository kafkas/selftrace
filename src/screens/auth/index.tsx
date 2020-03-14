import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Animated,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ButtonOpacity from '../../components/Button/Opacity';
import SubmitButton from '../../components/Button/Submit';
import FormContainer from '../../components/FormContainer';
import EmailInput from '../../components/TextInput/Email';
import PasswordInput from '../../components/TextInput/Password';
import ScrollingIndicator from '../../components/ScrollingIndicator';
import { useKeyboard } from '../../hooks';
import LogoAnimation from './LogoAnimation';
import TitleAnimation from './TitleAnimation';
import * as SignupActions from '../../actions/auth/signup';
import * as SigninActions from '../../actions/auth/signin';
import { ReduxRoot, isAuthDisabled } from '../../reducers';
import { ProgressStatus } from '../../data-types';
import AuthUtils from '../../util/AuthUtils';
import { W_WIDTH } from '../../styles';
import {
  PRIMARY_COLOR,
  INACTIVE_ICON_COLOR,
  INACTIVE_TEXT_COLOR,
} from '../../styles/colors';
import styles, { IMAGE_SIZE } from './styles';

const mapStateToProps = (state: ReduxRoot) => ({
  authDisabled: isAuthDisabled(state.auth),
  signupProgress: state.auth.signup.progress,
  signinProgress: state.auth.signin.progress,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      signupUser: SignupActions.signupUser,
      clearSignupProgress: () => (d: Dispatch) =>
        d(SignupActions.clearSignupProgress()),
      signinUser: SigninActions.signinUser,
      clearSigninProgress: () => (d: Dispatch) =>
        d(SigninActions.clearSigninProgress()),
    },
    dispatch
  );

interface Props
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

const AuthScreen = ({
  authDisabled,
  signupUser,
  signupProgress,
  clearSignupProgress,
  signinUser,
  signinProgress,
  clearSigninProgress,
  navigation,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, keyboardScale] = useKeyboard(false);

  const scrollXRef = useRef(new Animated.Value(0));
  const scrollX = scrollXRef.current;
  const safeScrollX = scrollX.interpolate({
    inputRange: [-5 * W_WIDTH, 0, W_WIDTH, 5 * W_WIDTH],
    outputRange: [-1, 0, 1, 2],
  });

  // Change activeIndex when scroll position reaches a certain threshold
  scrollX.addListener(({ value }): void => {
    if (activeIndex === 0 && value > W_WIDTH * 0.5) setActiveIndex(1);
    else if (activeIndex === 1 && value < W_WIDTH * 0.5) setActiveIndex(0);
  });

  useEffect(() => {
    return () => {
      scrollX.removeAllListeners();
    };
  }, [scrollX]);

  // Dismiss keyboard if activeIndex changes
  useEffect(() => {
    Keyboard.dismiss();
  }, [activeIndex]);

  const combinedProgress = signinProgress.status
    ? signinProgress
    : signupProgress;

  function clearProgress() {
    if (signupProgress.status) clearSignupProgress();
    if (signinProgress.status) clearSigninProgress();
  }

  useEffect(
    () => () => {
      clearSignupProgress();
      clearSigninProgress();
    },
    [clearSignupProgress, clearSigninProgress]
  );

  const submitDisabled =
    authDisabled ||
    !AuthUtils.isValidEmail(email) ||
    !AuthUtils.isValidPassword(password);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          alignItems: 'center',
          transform: [
            {
              translateY: keyboardScale.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -0.3 * IMAGE_SIZE],
              }),
            },
          ],
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formTopGap} />
        </TouchableWithoutFeedback>
        <LogoAnimation scrollX={safeScrollX} keyboardScale={keyboardScale} />
        <TitleAnimation
          scrollX={safeScrollX}
          keyboardScale={keyboardScale}
          active={!submitDisabled}
        />
        <FormContainer
          showErrorsOnly
          progress={combinedProgress}
          style={styles.formContainer}
        >
          <EmailInput
            value={email}
            onChangeText={text => {
              clearProgress();
              setEmail(text.toLowerCase());
            }}
          />
          <PasswordInput
            value={password}
            onChangeText={text => {
              clearProgress();
              setPassword(text);
            }}
          />
        </FormContainer>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          style={styles.pageScroller}
        >
          {[
            {
              id: 'signin',
              label: 'Sign in',
              onPress: () => signinUser(email, password),
              loading: signinProgress.status === ProgressStatus.REQUEST,
            },
            {
              id: 'signup',
              label: 'Sign up',
              onPress: () => signupUser(email, password),
              loading: signupProgress.status === ProgressStatus.REQUEST,
            },
          ].map(b => (
            <View key={b.id} style={styles.pageContainer}>
              <SubmitButton
                label={b.label}
                onPress={b.onPress}
                disabled={submitDisabled}
                loading={b.loading}
              />
              {b.id === 'signin' && (
                <ButtonOpacity
                  label='Forgot my password'
                  labelColor={INACTIVE_TEXT_COLOR}
                  labelWeight='500'
                  onPress={() => navigation.navigate('PasswordResetScreen')}
                  style={styles.forgotPasswordButton}
                />
              )}
            </View>
          ))}
        </ScrollView>
      </Animated.View>
      <ScrollingIndicator
        ballCount={2}
        scrollX={safeScrollX}
        activeColor={PRIMARY_COLOR.toString()}
        inactiveColor={INACTIVE_ICON_COLOR.toString()}
        style={styles.indicator}
      />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
