import { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useState } from 'react';

export function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const willShowSubscription = Keyboard.addListener('keyboardWillShow', e => setKeyboardHeight(e.endCoordinates.height));
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => setKeyboardHeight(0));
    return () => {
        willShowSubscription.remove();
      hideSubscription.remove();
    }
  }, [setKeyboardHeight]);

  return keyboardHeight;
}
