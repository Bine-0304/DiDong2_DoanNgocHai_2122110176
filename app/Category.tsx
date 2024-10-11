import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const categories = [
    { id: '1', name: 'Pijama Đồ ngủ ngắn' },
    { id: '2', name: 'Pijama Đồ ngủ dài' },
    { id: '3', name: 'Pijama Họa tiết Doraemon' },
    { id: '4', name: 'Váy ngủ Pijama' },
];

const CategoryItem = ({ name }) => (
    <TouchableOpacity style={styles.categoryItem}>
        <Text style={styles.categoryText}>{name}</Text>
    </TouchableOpacity>
);

export default function Categories() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh Mục Pijama</Text>
            <FlatList
                data={categories}
                renderItem={({ item }) => <CategoryItem name={item.name} />}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

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
    },
});