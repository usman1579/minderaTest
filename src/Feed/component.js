import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const CustomButton = props => {
  return (
    <TouchableOpacity 
     onPress={props.onPress}
     style={styles.buttonContainer}>
      <Ionicons name={props.name} color="#6BD88E" size={35} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 56,
    width: 56,
    borderRadius: 56,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
