import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../constants';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

const Select = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  return (
    <View style={styles.container} className="m-4">
      <TouchableOpacity style={styles.selectButton} onPress={toggleOptions}>
      <Icon name={showOptions ? 'arrow-drop-up' : 'arrow-drop-down'} size={24} color="#2B2B2B" />

        <Text style={styles.selectButtonText}>
          {selectedOption ? selectedOption : 'Select an option'}
        </Text>
      </TouchableOpacity>

      {showOptions && (
        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handleOptionSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.gray ,
    borderRadius:5,
    borderColor:colors.dark,
    borderWidth:0.5,
    height:48,
    
  },
  selectButtonText: {
    fontSize: 14,
    color: colors.dark,
    opacity:0.5,
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderRadius: 4,
    marginTop: 8,
    maxHeight: 200,
    overflow: 'scroll',
    zIndex:10,
    borderRadius:5,
    padding:4,
  },
  optionItem: {
    padding: 8, 
    borderBottomWidth:0.5,
    borderBottomColor:colors.gray,
    
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    textAlign: "right",
  },
});

export default Select;