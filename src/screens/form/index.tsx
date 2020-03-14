import React, { useState } from 'react';
import { View } from 'react-native';
import Picker from '../../components/Picker';
import Text from '../../components/Text';
import { Wellbeing } from '../../data-types';
import styles from './styles';

interface WellbeingOption {
  [key: Wellbeing]: {
    label: string;
    description: string;
    note: string;
  };
}

const WELLBEING_OPTION_MAP = {
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
    note: 'Choosing this option may be helpful even if your symptoms are mild.',
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

function FormScreen() {
  const [wellbeing, setWellbeing] = useState(undefined);

  return (
    <View style={styles.container}>
      {wellbeing ? (
        <Text>{WELLBEING_OPTION_MAP[wellbeing].description}</Text>
      ) : (
        <Text>Please choose one of the following options.</Text>
      )}
      <Picker
        label='Well-being'
        displayValue={wellbeing ? WELLBEING_OPTION_MAP[wellbeing].label : ''}
        selectedValue={wellbeing}
        onValueChange={val => setWellbeing(val)}
        // itemStyle={{ fontSize: 15 }}
        items={WELLBEING_OPTIONS}
      />
    </View>
  );
}

export default FormScreen;
