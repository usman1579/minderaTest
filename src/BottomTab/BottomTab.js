import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feed from '../Feed/SwiperView';
import Chat from '../Chat/Chat';
import User from '../User/User';

const Tab = createBottomTabNavigator();

function CustomTab({state, descriptors, navigation}) {
  return (
    <View style={styles.absolutePosition}>
      <View style={styles.containerPosition}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const TouchableIconContainer = props => (
            <TouchableOpacity
              accessibilityRole="button"
              // accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={props.testID}
              onPress={onPress}>
              {props.children}
            </TouchableOpacity>
          );

          if (label == 'Feed') {
            return (
              <TouchableIconContainer testID={'tab1'} key={route.key}>
                <Ionicon
                  name="logo-octocat"
                  size={25}
                  color={isFocused ? '#EC537E' : '#434141'}
                  style={{}}
                />
              </TouchableIconContainer>
            );
          } else if (label == 'Chat') {
            return (
              <TouchableIconContainer testID={'tab2'} key={route.key}>
                <Ionicon
                  name="ios-chatbubble-outline"
                  size={25}
                  color={isFocused ? '#EC537E' : '#434141'}
                  style={{}}
                />
              </TouchableIconContainer>
            );
          } else {
            return (
              <TouchableIconContainer testID={'tab3'} key={route.key}>
                <Ionicon
                  name="person-outline"
                  size={25}
                  color={isFocused ? '#EC537E' : '#434141'}
                  style={{}}
                />
              </TouchableIconContainer>
            );
          }
        })}
      </View>
    </View>
  );
}

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      //   CustomTab Code
      tabBar={props => <CustomTab {...props} />}>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  absolutePosition: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  containerPosition: {
    flexDirection: 'row',
    height: 44,
    width: 156,
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: 'rgba(191, 191, 192, 0.3)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 16,
  },
});
