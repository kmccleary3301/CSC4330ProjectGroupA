import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type RightIconType = keyof typeof MaterialCommunityIcons.glyphMap;

export const useTogglePasswordVisibility = () => {
  // password will not be initially visible
  // set the initial value to true because this will be the value fo secureTextEntry prop
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState<RightIconType>('eye');

  // function that toggles password visibility on a TextInput component on a password field
  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    setRightIcon(rightIcon === 'eye' ? 'eye-off' : 'eye');
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility
  };
};
