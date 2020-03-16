import React from 'react';
import i18n from 'i18n-js';
import TextInput, { TextInputProps } from '.';

const PasswordInput = (props: TextInputProps) => (
  <TextInput
    label={i18n.t('inputs.password')}
    autoCompleteType='off'
    returnKeyType='go'
    secureTextEntry
    textContentType='oneTimeCode'
    keyboardType='default'
    {...props}
  />
);

export default React.memo(PasswordInput);
