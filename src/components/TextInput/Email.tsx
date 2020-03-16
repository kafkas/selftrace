import React from 'react';
import i18n from 'i18n-js';
import TextInput, { TextInputProps } from '.';

const EmailInput = (props: TextInputProps) => (
  <TextInput
    label={i18n.t('inputs.email')}
    autoCompleteType='email'
    returnKeyType='next'
    textContentType='emailAddress'
    keyboardType='email-address'
    {...props}
  />
);

export default React.memo(EmailInput);
