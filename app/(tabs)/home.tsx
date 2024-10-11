import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import ResponsiveMenu from '../ResponsiveMenu';
import Banner from '../Banner';
import Header from '../Header';
import Categories from '../Category';
import FeaturedProducts from '../featuredProduct';
import NewProducts from '../newProduct';
import Footer from '../Footer';

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Header />
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Banner />
                    <NewProducts/>
                    <Categories/>
                    <FeaturedProducts/>
                    <Footer />
                </ScrollView>
            </View>
            <ResponsiveMenu/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
});