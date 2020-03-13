import React from 'react';
import TextInput, { TextInputProps } from '.';

const EmailInput = (props: TextInputProps) => (
  <TextInput
    label='Email'
    autoCompleteType='email'
    returnKeyType='next'
    textContentType='emailAddress'
    keyboardType='email-address'
    {...props}
  />
);

export default React.memo(EmailInput);
