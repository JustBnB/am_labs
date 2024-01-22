import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function UnpaidProductsScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.8.121:8080/products')
      .then(response => {
        const unpaidProducts = response.data.filter(product => !product.paid);
        setProducts(unpaidProducts);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unpaid Products</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 15,
    fontSize: 18,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});