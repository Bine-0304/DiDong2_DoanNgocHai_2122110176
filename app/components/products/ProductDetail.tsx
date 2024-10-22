import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../contexts/AppContext';
import { ShoppingCart } from 'lucide-react-native';
import Header from '../layout/Header';
import ResponsiveMenu from '../layout/ResponsiveMenu';
const RelatedProductItem = ({ item, onPress }) => {
    const formatPrice = (price) => {
        const vndPrice = Math.round(price * 23000); // Chuyển USD sang VND
        // Tạo giá sale (giả lập) cho một số sản phẩm
        const salePrice = item.id % 2 === 0 ? Math.round(vndPrice * 0.8) : null;
        return { originalPrice: vndPrice, salePrice };
    };

    const prices = formatPrice(item.price);

    return (
        <TouchableOpacity style={styles.relatedProductItem} onPress={() => onPress(item.id)}>
            <Image
                source={{ uri: item.image }}
                style={styles.relatedProductImage}
                resizeMode="cover"
            />
            <Text style={styles.relatedProductName} numberOfLines={2}>
                {item.title}
            </Text>
            <View style={styles.relatedPriceContainer}>
                {prices.salePrice ? (
                    <>
                        <Text style={styles.relatedSalePrice}>
                            {prices.salePrice.toLocaleString('vi-VN')}đ
                        </Text>
                        <Text style={styles.relatedOriginalPrice}>
                            {prices.originalPrice.toLocaleString('vi-VN')}đ
                        </Text>
                    </>
                ) : (
                    <Text style={styles.relatedPrice}>
                        {prices.originalPrice.toLocaleString('vi-VN')}đ
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const ProductDetail = () => {
    const route = useRoute();
    const { productId } = route.params;
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingRelated, setLoadingRelated] = useState(true);
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProductDetail();
    }, [productId]);

    const fetchProductDetail = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            const data = await response.json();
            setProduct(data);
            fetchRelatedProducts(data.category);
        } catch (error) {
            console.error('Error fetching product details:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async (category) => {
        try {
            setLoadingRelated(true);
            const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
            const data = await response.json();
            // Loại bỏ sản phẩm hiện tại và giới hạn còn 4 sản phẩm
            const filtered = data
                .filter(item => item.id !== parseInt(productId))
                .slice(0, 4);
            setRelatedProducts(filtered);
        } catch (error) {
            console.error('Error fetching related products:', error);
        } finally {
            setLoadingRelated(false);
        }
    };

    const formatPrice = (price) => {
        const vndPrice = Math.round(price * 23000);
        const salePrice = product.id % 2 === 0 ? Math.round(vndPrice * 0.8) : null;
        return { originalPrice: vndPrice, salePrice };
    };

    const handleRelatedProductPress = (productId) => {
        navigation.push('ProductDetail', { productId });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Không tìm thấy sản phẩm</Text>
            </View>
        );
    }

    const prices = formatPrice(product.price);
    const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
    const decreaseQuantity = () => setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
    const { addToCart } = useAppContext();

    const handleBuyNow = () => {
        const cartItem = {
            id: product.id,
            title: product.title,
            price: prices.salePrice || prices.originalPrice,
            quantity: quantity,
            image: product.image,
        };
        navigation.navigate('Checkout', { cartItems: [cartItem] });
    };
    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                title: product.title,
                price: prices.salePrice || prices.originalPrice,
                quantity: quantity,
                image: product.image
            });
            navigation.navigate('Cart');
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ScrollView style={styles.scrollView}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.productImage}
                        resizeMode="contain" />
                    <View style={styles.infoContainer}>
                        <Text style={styles.productName}>{product.title}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={[styles.price, prices.salePrice && styles.strikethrough]}>
                                {prices.originalPrice.toLocaleString('vi-VN')}đ
                            </Text>
                            {prices.salePrice && (
                                <Text style={styles.salePrice}>
                                    {prices.salePrice.toLocaleString('vi-VN')}đ
                                </Text>
                            )}
                        </View>
                        <Text style={styles.categoryText}>
                            Danh mục: {product.category}
                        </Text>
                        <Text style={styles.sectionTitle}>Số lượng:</Text>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.sectionTitle}>Mô tả sản phẩm:</Text>
                        <Text style={styles.description}>{product.description}</Text>

                        {!loadingRelated && relatedProducts.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>Sản phẩm liên quan:</Text>
                                <FlatList
                                    data={relatedProducts}
                                    renderItem={({ item }) => (
                                        <RelatedProductItem
                                            item={item}
                                            onPress={handleRelatedProductPress} />
                                    )}
                                    keyExtractor={item => item.id.toString()}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.relatedList} />
                            </>
                        )}

                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                                <ShoppingCart name="shopping-cart" size={20} color="#fff" />
                                <Text style={styles.addToCartButtonText}>Add To Cart</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
                                <Text style={styles.buyButtonText}>Buy Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.menuWrapper}>
                <ResponsiveMenu />
            </View>
        </SafeAreaView>
    );
};

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
    productImage: {
        width: '100%',
        height: 300,
    },
    infoContainer: {
        padding: 15,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    categoryText: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
        marginBottom: 10,
        textTransform: 'capitalize',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        color: '#888',
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        marginRight: 10,
    },
    salePrice: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    quantityButton: {
        backgroundColor: '#e0e0e0',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 15,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
        color: '#666',
    },
    relatedList: {
        marginTop: 10,
        marginBottom: 20,
    },
    relatedProductItem: {
        width: 150,
        marginRight: 15,
    },
    relatedProductImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    relatedProductName: {
        fontSize: 16,
        marginTop: 5,
        height: 40,
    },
    relatedPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    relatedPrice: {
        fontSize: 14,
        color: 'black',
    },
    relatedSalePrice: {
        fontSize: 14,
        color: 'red',
        marginRight: 5,
    },
    relatedOriginalPrice: {
        fontSize: 12,
        color: 'gray',
        textDecorationLine: 'line-through',
    },

    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    addToCartButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginRight: 10,
    },
    addToCartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    buyButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    menuWrapper: {
        bottom: -40,
    },
});

export default ProductDetail;