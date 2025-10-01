import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onPress, style, textStyle }) => {
  const [disabled, setDisabled] = useState(false);

  const handlePress = () => {
    setDisabled(true);  // disable immediately
    onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabledButton]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {disabled ? `${text}...` : text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#a5b4fc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
