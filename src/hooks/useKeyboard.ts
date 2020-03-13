import { useState, useRef, useEffect } from 'react';
import { Keyboard, Animated } from 'react-native';

export function useKeyboard(initialVisible: boolean) {
  const [visible, setVisible] = useState(initialVisible);
  const scaleRef = useRef(new Animated.Value(initialVisible ? 1 : 0));
  const { current: scale } = scaleRef;

  useEffect(() => {
    function onKeyboardWillShow() {
      setVisible(true);
    }

    function onKeyboardWillHide() {
      setVisible(false);
    }

    Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
    Keyboard.addListener('keyboardWillHide', onKeyboardWillHide);

    return () => {
      Keyboard.removeListener('keyboardWillShow', onKeyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', onKeyboardWillHide);
    };
  }, []);

  useEffect(() => {
    Animated.timing(scale, {
      duration: 250,
      toValue: visible ? 1 : 0,
    }).start();
  }, [visible, scale]);

  return [visible, scale];
}
