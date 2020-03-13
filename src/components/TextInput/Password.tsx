import React from 'react';
import TextInput, { TextInputProps } from '.';

const PasswordInput = (props: TextInputProps) => (
  <TextInput
    label='Password'
    autoCompleteType='off'
    returnKeyType='go'
    secureTextEntry
    textContentType='oneTimeCode'
    keyboardType='default'
    {...props}
  />
);

export default React.memo(PasswordInput);
