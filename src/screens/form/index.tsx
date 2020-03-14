import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SubmitButton from '../../components/Button/Submit';
import FormContainer from '../../components/FormContainer';
import Picker from '../../components/Picker';
import Text from '../../components/Text';
import { Wellbeing } from '../../data-types';
import * as Actions from '../../actions/auth/userInfo';
import { Dispatch, Action } from '../../actions';
import { ReduxRoot } from '../../reducers';
import styles from './styles';

interface WellbeingObject {
  value: Wellbeing;
  label: string;
  description: string;
  note: string;
}

interface WellbeingOptionMap {
  [key: Wellbeing]: Omit<WellbeingObject, 'value'>;
}

const WELLBEING_OPTION_MAP: WellbeingOptionMap = {
  [Wellbeing.NotTested]: {
    label: 'Feeling Well',
    description:
      "I have not been tested but don't show any of the coronavirus (COVID-19) symptoms. All is well!",
    note: '',
  },
  [Wellbeing.ShowingSymptoms]: {
    label: 'Showing Symptoms',
    description:
      'I have not been tested and I am feeling unwell. I think I am showing some of the coronavirus (COVID-19) symptoms.',
    note:
      'It may prove helpful to choose this option even if your symptoms are mild.',
  },
  [Wellbeing.TestedNegative]: {
    label: 'Tested Negative',
    description:
      "I have been tested. According to the results, I don't have coronavirus (COVID-19).",
    note: '',
  },
  [Wellbeing.TestedPositive]: {
    label: 'Tested Positive',
    description:
      'I have been tested. According to the results, I have coronavirus (COVID-19).',
    note: '',
  },
};

const WELLBEING_OPTIONS = Object.keys(WELLBEING_OPTION_MAP).map(rawVal => {
  const value: Wellbeing = Number(rawVal);
  return { value, ...WELLBEING_OPTION_MAP[value] };
});

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

  const wellbeingObj: WellbeingObject | undefined =
    WELLBEING_OPTION_MAP[wellbeing];
  const submitDisabled = !wellbeing;

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
        <Text style={styles.topText}>
          Please keep your well-being status up to date. You can choose one of
          the following options.
        </Text>
      </View>
      <FormContainer progress={progress}>
        <Picker
          label='Well-being'
          displayValue={wellbeing ? WELLBEING_OPTION_MAP[wellbeing].label : ''}
          selectedValue={wellbeing}
          onValueChange={val => setWellbeing(val)}
          // itemStyle={{ fontSize: 15 }}
          items={WELLBEING_OPTIONS}
        />
        {wellbeingObj && (
          <View style={styles.textContainer}>
            <Text style={styles.descriptionText}>
              {wellbeingObj.description}
            </Text>
            {!!wellbeingObj.note && (
              <View style={styles.noteSection}>
                <Text style={styles.noteTitle}>Note: </Text>
                <Text style={styles.noteText}>{wellbeingObj.note}</Text>
              </View>
            )}
          </View>
        )}
      </FormContainer>
      <SubmitButton
        label='Update'
        onPress={() => {
          uploadUserInfo({ wellbeing: wellbeing!.valueOf() });
        }}
        disabled={submitDisabled}
        loading={false}
      />
    </ScrollView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FormScreen);
