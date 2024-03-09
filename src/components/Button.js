import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Button = ({title, setProductData, index, selected}) => {
  return (
    <TouchableOpacity
      style={[
        styles.mainContainer,
        {backgroundColor: selected === title ? 'tomato' : '#fff'},
      ]}
      onPress={() => setProductData(index)}>
      <Text
        style={[styles.text, {color: selected === title ? '#FFF' : '#000'}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});
