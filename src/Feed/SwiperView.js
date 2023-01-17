import React, {useRef, useState, useEffect} from 'react';
import Swiper from 'react-native-deck-swiper';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {CustomButton} from './component';

const SwiperView = props => {
  const swiper = useRef();
  const [cards, setCards] = useState([]);
  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [limit, setLimit] = useState(10);

  const callCatApi = async () => {
    try {
      await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}`)
        .then(resp => resp.json())
        .then(function (response) {
          setCards(response);
          setSwipedAllCards(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let mount = () => callCatApi();
    mount();
  }, []);

  const renderCard = (card, index) => {
    return (
      <View style={styles.cardContainer}>
        {/* Background Image */}
        <ImageBackground
          source={{uri: card?.url}}
          style={styles.ImageBackground}
          resizeMode="cover">
          {/* Bottom style in the the Card */}
          <View style={styles.viewContainer}>
            {/* Top Text */}
            <View style={styles.TextLayout}>
              <Text style={styles.text}>Cat</Text>
              <Text style={styles.text}>{card?.id}</Text>
            </View>
            {/* Bottom Text */}
            <Text style={styles.bottomText}>Egypt</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const onSwipedLeft = (index, item) => {
    const Data = {
      image_id: item?.id,
      sub_id: 'user-123',
      value: -1,
    };
    sendResponse(Data);
  };

  const onSwipedRight = (index, item) => {
    const Data = {
      image_id: item?.id,
      sub_id: 'user-123',
      value: 1,
    };
    sendResponse(Data);
  };

  const sendResponse = async data => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    try {
      await fetch('https://api.thecatapi.com/v1/votes', requestOptions).then(
        response => {
          response.json().then(data => {
            console.log(data);
          });
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onSwipedAllCards = () => {
    setSwipedAllCards(true);
    setLimit(prev => prev + +10);
    callCatApi();
  };

  const swipeLeft = () => {
    swiper.current.swipeLeft();
  };

  return (
    <View style={styles.container}>
      {/* Use this Activity inditor While getting paginated Data show Loader */}
      {swipedAllCards ? (
        <View style={styles.activityIndicatorView}>
          <ActivityIndicator />
        </View>
      ) : (
        <View
          testID="data-component"
          style={{
            flex: 3,
          }}>
          <Swiper
            ref={swiper}
            // onSwiped={() => onSwiped('general')}
            onSwipedLeft={(item, index) => onSwipedLeft(item, index)}
            onSwipedRight={(item, index) => onSwipedRight(item, index)}
            // onSwipedTop={() => onSwiped('top')}
            // onSwipedBottom={() => onSwiped('bottom')}
            // onTapCard={swipeLeft}
            cards={cards}
            cardIndex={cardIndex}
            cardVerticalMargin={200}
            renderCard={renderCard}
            onSwipedAll={onSwipedAllCards}
            swipedAllCards={swipedAllCards}
            stackSize={3}
            stackSeparation={1}
            backgroundColor={'#E5E5E5'}
            overlayLabels={{
              bottom: {
                title: 'BLEAH',
                style: {
                  label: {
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    borderWidth: 1,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                },
              },
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    borderWidth: 1,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 10,
                    marginLeft: -30,
                  },
                },
              },
              right: {
                title: 'LIKE',
                style: {
                  label: {
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    borderWidth: 1,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 10,
                    marginLeft: 30,
                  },
                },
              },
              top: {
                title: 'SUPER LIKE',
                style: {
                  label: {
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    borderWidth: 1,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                },
              },
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard>
          </Swiper>
        </View>
      )}

      {/*  Lower Button For Like and Dislike */}
      {swipedAllCards ? null : (
        <View style={styles.buttonsContainer}>
          <CustomButton
            onPress={() => swiper.current.swipeLeft()}
            name="close"
          />
          <CustomButton
            onPress={() => swiper.current.swipeRight()}
            name="heart"
          />
        </View>
      )}
    </View>
  );
};

export default SwiperView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  card: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
  buttonsContainer: {
    flexDirection: 'row',
    height: 52,
    width: 156,
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
  },
  cardContainer: {
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'transparent',
  },
  ImageBackground: {
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },
  viewContainer: {
    position: 'absolute',
    height: 48,
    width: '90%',
    backgroundColor: 'white',
    zIndex: 1000,
    bottom: 0,
    alignSelf: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  TextLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },
  text: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  bottomText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#BFBFC0',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  activityIndicatorView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
