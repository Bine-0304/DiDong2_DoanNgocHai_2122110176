import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CategoryItem = ({ name, onPress }) => (
    <TouchableOpacity 
        style={styles.categoryItem}
        onPress={onPress}
    >
        <Text style={styles.categoryText}>{name}</Text>
    </TouchableOpacity>
);

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryPress = (category) => {
        navigation.navigate('ProductCategory', { category });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh Mục Sản Phẩm</Text>
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <CategoryItem 
                        name={item} 
                        onPress={() => handleCategoryPress(item)}/>
                )}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
    },
    categoryItem: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 20,
    },
    categoryText: {
        fontSize: 16,
        color: '#000',
    },
});

export default Categories;