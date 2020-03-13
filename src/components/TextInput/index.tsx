import React, { createRef } from 'react';
import {
  Animated,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  ViewStyle,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from '../Text';
import { FORM_INPUT_HEIGHT, W_WIDTH, W_MARGIN, MARGIN_X } from '../../styles';
import { MAIN_FONT_FAMILY } from '../../styles/typography';
import {
  WHITE_COLOR,
  INACTIVE_TEXT_COLOR,
  BORDER_COLOR,
  BLUE_COLOR,
} from '../../styles/colors';

const baseStyles = StyleSheet.create({
  container: {
    backgroundColor: WHITE_COLOR,
    width: W_WIDTH,
    height: FORM_INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: W_MARGIN,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    minWidth: 90,
    fontWeight: '600',
    marginRight: MARGIN_X,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: MAIN_FONT_FAMILY,
  },
});

export interface TextInputProps extends RNTextInputProps {
  label: string;
  labelStyle?: TextStyle;
  style?: ViewStyle;
  textInputStyle?: TextStyle;
}

export default class TextInput extends React.PureComponent<TextInputProps> {
  private isFocused: Animated.AnimatedValue;

  private labelColor: Animated.AnimatedInterpolation;

  private borderBottomColor: Animated.AnimatedInterpolation;

  private textInputRef: React.RefObject<RNTextInput>;

  constructor(props: TextInputProps) {
    super(props);
    this.isFocused = new Animated.Value(0); // 0: !focused, 1: focused
    this.labelColor = this.isFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [INACTIVE_TEXT_COLOR.toString(), BLUE_COLOR.toString()],
    });
    this.borderBottomColor = this.isFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [BORDER_COLOR.toString(), BLUE_COLOR.toString()],
    });
    this.textInputRef = createRef();
  }

  handleFocus = (): void => {
    const { onFocus } = this.props;
    Animated.timing(this.isFocused, {
      toValue: 1,
      duration: 250,
    }).start();
    if (onFocus) onFocus();
  };

  handleBlur = (): void => {
    const { onBlur } = this.props;
    Animated.timing(this.isFocused, {
      toValue: 0,
      duration: 250,
    }).start();
    if (onBlur) onBlur();
  };

  render() {
    const { label, labelStyle, style, textInputStyle, ...rest } = this.props;

    delete rest.onBlur;
    delete rest.onFocus;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (this.textInputRef.current) this.textInputRef.current.focus();
        }}
      >
        <Animated.View
          style={[
            baseStyles.container,
            { borderBottomColor: this.borderBottomColor },
            style,
          ]}
        >
          <Text
            animated
            style={[baseStyles.label, { color: this.labelColor }, labelStyle]}
          >
            {label}
          </Text>
          <RNTextInput
            ref={this.textInputRef}
            style={[baseStyles.textInput, textInputStyle]}
            allowFontScaling // d
            autoCapitalize='none'
            autoCompleteType='off' // android
            autoCorrect={false}
            autoFocus={false} // d
            blurOnSubmit
            caretHidden={false} // d
            clearButtonMode='while-editing' // ios
            clearTextOnFocus={false} // ios
            contextMenuHidden={false}
            dataDetectorTypes='none' // ios
            // defaultValue={undefined}
            disableFullscreenUI={false} // android
            editable
            enablesReturnKeyAutomatically // ios
            // importantForAutofill='auto' // android TODO: add
            // inlineImageLeft={undefined} android
            // inlineImagePadding={undefined} android
            // inputAccessoryViewID={undefined} // ios
            keyboardAppearance='dark' // ios
            keyboardType='default'
            // maxFontSizeMultiplier={undefined}
            maxLength={150}
            multiline={false}
            // numberOfLines={undefined} android
            onBlur={this.handleBlur}
            // onChange={undefined}
            // onChangeText={() => {}}
            // onContentSizeChange={undefined}
            // onEndEditing={undefined}
            onFocus={this.handleFocus}
            // onKeyPress={undefined}
            // onLayout={undefined}
            // onScroll={undefined}
            // onSelectionChange={undefined}
            onSubmitEditing={undefined}
            // placeholder='Enter a text'
            placeholderTextColor={INACTIVE_TEXT_COLOR.toString()}
            // returnKeyLabel='Done' // android
            returnKeyType='done'
            // rejectResponderTermination // ios TODO: add
            scrollEnabled // ios
            secureTextEntry={false}
            selectionColor={BLUE_COLOR.toString()}
            // selection
            // selectionState
            selectTextOnFocus={false}
            spellCheck={false}
            textContentType='none' // ios
            textBreakStrategy='highQuality' // android
            // value
            {...rest}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
