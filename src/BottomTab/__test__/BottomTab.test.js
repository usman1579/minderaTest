import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import BottomTab from '../BottomTab';

describe('CustomTab Test', () => {
  const tree = render(<BottomTab />)
  expect(tree).toMatchSnapshot();

  it('renders tabs correctly', () => {
    const { getByTestId } = render(<BottomTab />);
    const FeedScreen = getByTestId('FeedScreen');
    const ChatScreen = getByTestId('ChatScreen');
    const UserScreen = getByTestId('UserScreen');
    expect(FeedScreen).toBeTruthy();
    expect(ChatScreen).toBeTruthy();
    expect(UserScreen).toBeTruthy();
  });

  it('navigate to correct screen', () => {
    const { getByTestId } = render(<CustomTab />);
    const tab1 = getByTestId('tab1');
    fireEvent.press(tab1);
    const screen1 = getByTestId('FeedScreen');
    expect(screen1).toBeTruthy();
    const tab2 = getByTestId('tab2');
    fireEvent.press(tab2);
    const screen2 = getByTestId('ChatScreen');
    expect(screen2).toBeTruthy();

    const tab3 = getByTestId('tab3');
    fireEvent.press(tab3);
    const screen3 = getByTestId('UserScreen');
    expect(screen3).toBeTruthy();
  });

  
});