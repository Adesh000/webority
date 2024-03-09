import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import CardItem from '../components/Item';
import Button from '../components/Button';
import {data} from '../utils/Data';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Home = ({navigation}) => {
  const [productData, setProductData] = useState(data);

  // filter data based on id
  const filterData = id => {
    const filteredProductData = data.filter(elem => elem.id === id);
    setProductData(filteredProductData);
  };

  // get cart data and calculate total price
  const cart = useSelector(state => state.cart);
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, it) => acc + it.qty * it.price, 0);
  }, [cart]);
  console.log('Products : ', productData);
  return (
    <View style={styles.mainContainer}>
      <View style={{marginBottom: 10}}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Button
              title={item.cafeteriaMenuType.nameEnglish}
              index={item.id}
              setProductData={filterData}
              selected={productData[0].cafeteriaMenuType?.nameEnglish}
            />
          )}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{backgroundColor: '#fff', padding: 10}}>
        <FlatList
          data={productData[0]?.cafeteriaMenuItems}
          keyExtractor={item => item.id}
          renderItem={({item}) => <CardItem item={item} />}
          ListHeaderComponent={() => (
            <Text style={styles.heading}>
              {productData[0].cafeteriaMenuType?.nameEnglish ?? 'All Items'}
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartButton}>
          <View>
            <Text style={{color: '#fff'}}>{cart.length} items added</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <FontAwesome name="rupee" color="#fff" size={15} />
              <Text style={styles.btnTitle}>{totalPrice}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.btnTitle}>View Cart</Text>
            <AntDesign name="caretright" color="#fff" size={15} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  cartButton: {
    backgroundColor: '#fff',
    elevation: 3,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'tomato',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: '100%',
  },
  btnTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginVertical: 10,
    marginLeft: 5,
  },
});
