import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItem,
  decreaseQty,
  increaseQty,
  removeItem,
} from '../redux/quantitySlice';

const CardItem = ({item}) => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // check if item is present in cart
  const isPresent = cartItems.some(element => element.id === item.id);

  // filter item to get the quantity of item
  const getQty = cartItems.filter(elem => elem.id === item.id);
  console.log('Item : ', item);
  return (
    <>
      <View style={styles.cardContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: item?.photoStoragePath
                  ? item?.photoStoragePath
                  : 'https://wallpapercave.com/wp/wp3376127.jpg',
              }}
              style={styles.cardImage}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item?.nameEnglish}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <View style={[styles.rowBetween, {width: '80%'}]}>
              <View style={styles.rowBetween}>
                <FontAwesome name="rupee" color="#000" size={15} />
                <Text style={styles.cardTitle}>{item?.price}</Text>
              </View>
              {!isPresent ? (
                <TouchableOpacity
                  style={[styles.buttonContainer, {justifyContent: 'center'}]}
                  onPress={() => dispatch(addItem(item))}>
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      getQty[0]?.qty > 1
                        ? dispatch(decreaseQty(item.id))
                        : dispatch(removeItem(item.id));
                    }}>
                    <Entypo name="minus" size={15} color="tomato" />
                  </TouchableOpacity>
                  <Text style={styles.buttonText}>{getQty[0]?.qty}</Text>
                  <TouchableOpacity
                    onPress={() => dispatch(increaseQty(item.id))}>
                    <Entypo name="plus" size={15} color="tomato" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
        {item?.maximumPerOrderQuantity === getQty[0]?.qty ? (
          <View style={styles.maxQty}>
            <Text style={{color: '#90f700', fontSize: 12}}>
              You have added maximum allowed quantity for this item
            </Text>
          </View>
        ) : null}
      </View>
    </>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    margin: 5,
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'tomato',
    padding: 5,
    borderRadius: 10,
    width: 80,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'tomato',
    fontSize: 14,
    fontWeight: '500',
  },
  maxQty: {
    backgroundColor: '#f8fcdb',
    padding: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
