import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import CardItem from '../components/Item';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Cart = () => {
  // get cart data
  const cartData = useSelector(state => state.cart);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return cartData.reduce((acc, it) => acc + it.qty * it.price, 0);
  }, [cartData]);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={cartData}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CardItem item={item} />}
        ListFooterComponent={() => (
          <View style={styles.totalCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.text}>Total</Text>
              <View style={styles.rowBetween}>
                <FontAwesome name="rupee" color="tomato" size={15} />
                <Text style={[styles.text, {color: 'tomato'}]}>
                  {totalPrice}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  totalCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 5,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
