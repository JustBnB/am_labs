import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ListScreen from './ListScreen';
import UnpaidProductsScreen from './UnpaidProductsScreen';
import PaidProductsScreen from './PaidProductsScreen'




const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://10.0.2.2:3000/products')
      .then(response => {

        if(response.data && response.data.products) {
          setProducts(response.data.products);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  const renderScreen = (screenType) => {

    if(Array.isArray(products)) {
      switch(screenType) {
        case 'Paid':
          return <PaidProductsScreen products={products.filter(p => p.paid)} />;
        case 'Unpaid':
          return <UnpaidProductsScreen products={products.filter(p => !p.paid)} />;
        default:
          return <ListScreen products={products} />;
      }
    }

    return <Text>Ładowanie danych...</Text>;
  };

  return (
    <Tab.Navigator>
      <Tab.Screen name="List" children={() => renderScreen('List')} />
      <Tab.Screen name="Paid" children={() => renderScreen('Paid')} />
      <Tab.Screen name="Unpaid" children={() => renderScreen('Unpaid')} />
    </Tab.Navigator>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    productItem: {
      borderWidth: 1,
      borderColor: 'gray',
      width: 300,
      padding: 10,
      marginVertical: 5,
    },
  });
  
  export default HomeScreen;
  