import React from 'react';
import { render, act , waitFor} from '@testing-library/react-native';
import SwiperView from '../SwiperView';

describe('SwiperView Component', () => {
  it('should call the API and set the state', async () => {

    // Set up a mock response for the API call
    const mockData = {
        data: [{
        id: '1',
        url: 'example.com'
        }]
    };

    jest.mock('axios', () => {
        return {
            get: jest.fn(() => Promise.resolve({ data: mockData }))
        };
    });
    // render the component
    const { getByTestId, unmount } = render(<SwiperView />);
    // Call the `useEffect` hook
    act(async () => {
      await waitFor( () =>   render(<SwiperView />) )
    });
    // Get the element with the testID
    const component = getByTestId('data-component');
    // Assert that the component contains the mock data
   expect(component).toHaveTextContent(JSON.stringify(mockData))
   
    // Unmount the component 
    unmount();
    // render it again 
    // const { getByTestId } = render(<SwiperView />);
    // Get the element with the testID again
    const component2 = getByTestId('data-component');
    // Assert that the component contains the mock data
    expect(component2).toHaveTextContent(JSON.stringify(mockData));
    // cleanup all instances 
    cleanup();

  });
});
