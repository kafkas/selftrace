import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import SubmitButton from '../../components/Button/Submit';
import FormContainer from '../../components/FormContainer';
import Picker from '../../components/Picker';
import Text from '../../components/Text';
import { Wellbeing, ProgressStatus } from '../../data-types';
import * as Actions from '../../actions/auth/userInfo';
import { Dispatch, Action } from '../../actions';
import { ReduxRoot } from '../../reducers';
import styles from './styles';

interface WellbeingObject {
  value: Wellbeing;
  label: string;
  description: string;
  important: string;
  note: string;
}

interface WellbeingOptionMap {
  [key: Wellbeing]: Omit<WellbeingObject, 'value'>;
}

const mapStateToProps = (state: ReduxRoot) => ({
  currentWellbeing: state.auth.userInfo.wellbeing,
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

function FormScreen({
  currentWellbeing,
  progress,
  clearProgress,
  uploadUserInfo,
}: Props) {
  const [wellbeing, setWellbeing] = useState(currentWellbeing);

  const WELLBEING_OPTION_MAP: WellbeingOptionMap = {
    [Wellbeing.NotTested]: {
      label: i18n.t('form.options.well.label'),
      description: i18n.t('form.options.well.description'),
      important: i18n.t('form.options.well.important'),
      note: i18n.t('form.options.well.note'),
    },
    [Wellbeing.ShowingSymptoms]: {
      label: i18n.t('form.options.symptoms.label'),
      description: i18n.t('form.options.symptoms.description'),
      important: i18n.t('form.options.symptoms.important'),
      note: i18n.t('form.options.symptoms.note'),
    },
    [Wellbeing.TestedNegative]: {
      label: i18n.t('form.options.negative.label'),
      description: i18n.t('form.options.negative.description'),
      important: i18n.t('form.options.negative.important'),
      note: i18n.t('form.options.negative.note'),
    },
    [Wellbeing.TestedPositive]: {
      label: i18n.t('form.options.positive.label'),
      description: i18n.t('form.options.positive.description'),
      important: i18n.t('form.options.positive.important'),
      note: i18n.t('form.options.positive.note'),
    },
  };

  const WELLBEING_OPTIONS = Object.keys(WELLBEING_OPTION_MAP).map(rawVal => {
    const value: Wellbeing = Number(rawVal);
    return { value, ...WELLBEING_OPTION_MAP[value] };
  });

  const wellbeingObj: WellbeingObject | undefined =
    WELLBEING_OPTION_MAP[wellbeing];
  const submitDisabled = !wellbeing || currentWellbeing === wellbeing;

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
      <View style={styles.textContainer}>
        <Text style={styles.topText}>{i18n.t('form.topNote')}</Text>
      </View>
      <FormContainer progress={progress}>
        <Picker
          label={i18n.t('form.wellbeing')}
          displayValue={wellbeing ? WELLBEING_OPTION_MAP[wellbeing].label : ''}
          selectedValue={wellbeing}
          onValueChange={val => setWellbeing(val)}
          items={WELLBEING_OPTIONS}
        />
        {wellbeingObj && (
          <View style={styles.textContainer}>
            <Text style={styles.descriptionText}>
              {wellbeingObj.description}
            </Text>
            {!!wellbeingObj.important && (
              <View style={styles.noteSection}>
                <Text>
                  <Text style={styles.noteTitle}>
                    {i18n.t('form.important')}:{' '}
                  </Text>
                  <Text style={styles.noteText}>{wellbeingObj.important}</Text>
                </Text>
              </View>
            )}
            {!!wellbeingObj.note && (
              <View style={styles.noteSection}>
                <Text>
                  <Text style={styles.noteTitle}>{i18n.t('form.note')}: </Text>
                  <Text style={styles.noteText}>{wellbeingObj.note}</Text>
                </Text>
              </View>
            )}
          </View>
        )}
      </FormContainer>
      <SubmitButton
        label={i18n.t('buttons.update')}
        onPress={() => {
          uploadUserInfo({ wellbeing: wellbeing!.valueOf() });
        }}
        disabled={submitDisabled}
        loading={progress.status === ProgressStatus.REQUEST}
      />
    </ScrollView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FormScreen);
