import { useContext } from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { AppContext } from '../context/AppContext';
import { PRODUCTS } from '../data/products';

const ACCENT = '#F4845F';


const getImageSource = (item) => {
  if (Platform.OS === 'web') {
    return { uri: item.imageUri };
  }
  return typeof item.image === 'number' ? item.image : { uri: item.imageUri };
};

export default function HomeScreen() {
  const { addToCart, addToWishlist, isWishlisted, isDarkMode } = useContext(AppContext);

  const dark        = isDarkMode;
  const bg          = dark ? '#0D0B1E' : '#F0EFF8';
  const cardBg      = dark ? '#1A1740' : '#FFFFFF';
  const slideBg     = dark ? '#1E1B3A' : '#FFFFFF';
  const imgBox      = dark ? '#13113A' : '#F4F0FF';
  const textPrimary = dark ? '#FFFFFF' : '#1A1830';
  const textMuted   = dark ? '#9B97C8' : '#9490B8';

  const discounts = ['30% off', '25% off', '20% off', '15% off', '35% off'];

  const renderProduct = ({ item }) => {
    const wishlisted = isWishlisted(item.id);
    return (
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <View style={[styles.imgBox, { backgroundColor: imgBox }]}>
          <Image
            source={getImageSource(item)}
            style={styles.productImg}
            resizeMode="cover"
          />
        </View>

        <View style={styles.cardBody}>
          <Text style={[styles.productName, { color: textPrimary }]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[styles.productPrice, { color: ACCENT }]}>
            Rp{item.price.toLocaleString('id-ID')}
          </Text>

          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={() => addToWishlist(item)}
              style={[
                styles.starBtn,
                {
                  backgroundColor: wishlisted
                    ? (dark ? '#2D1A12' : '#FFF4F0')
                    : (dark ? '#13113A' : '#F4F0FF'),
                  borderColor: wishlisted ? ACCENT : (dark ? '#2D2B55' : '#E0DDFF'),
                },
              ]}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 13, color: wishlisted ? ACCENT : textMuted }}>
                {wishlisted ? '★' : '☆'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => addToCart(item)}
              style={styles.plusBtn}
              activeOpacity={0.75}
            >
              <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bg }} showsVerticalScrollIndicator={false}>

      <View style={styles.swiperContainer}>
        <Swiper
          autoplay
          autoplayTimeout={3}
          activeDotColor={ACCENT}
          dotColor={dark ? '#2D2B55' : '#CCC'}
          paginationStyle={{ bottom: 12 }}
          showsButtons={false}
        >
          {PRODUCTS.slice(0, 5).map((p, i) => (
            <View key={p.id} style={[styles.slide, { backgroundColor: slideBg }]}>
              <Image
                source={getImageSource(p)}
                style={styles.slideImg}
                resizeMode="cover"
              />
              <View style={styles.slideBadge}>
                <Text style={styles.slideBadgeText}>{discounts[i]}</Text>
              </View>
              <View style={styles.slideTextWrap}>
                <Text style={styles.slideTag}>FEATURED</Text>
                <Text style={[styles.slideName, { color: textPrimary }]}>{p.name}</Text>
              </View>
            </View>
          ))}
        </Swiper>
      </View>

      <Text style={[styles.sectionLabel, { color: textPrimary }]}>Products</Text>

      <FlatList
        data={PRODUCTS}
        numColumns={3}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  swiperContainer: {
    height: 200,
    margin: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  slide: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  slideImg: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 110,
    height: 110,
    borderRadius: 16,
  },
  slideBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: ACCENT,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  slideBadgeText: { color: '#FFF', fontSize: 11, fontWeight: '800' },
  slideTextWrap: { maxWidth: '60%' },
  slideTag: {
    fontSize: 9, color: ACCENT, fontWeight: '800',
    letterSpacing: 1.5, marginBottom: 4,
  },
  slideName: { fontSize: 22, fontWeight: '800' },
  sectionLabel: {
    fontSize: 20, fontWeight: '800', marginLeft: 16, marginBottom: 10,
  },
  card: { flex: 1, margin: 5, borderRadius: 16, overflow: 'hidden' },
  imgBox: { width: '100%', aspectRatio: 1 },
  productImg: { width: '100%', height: '100%' },
  cardBody: { padding: 8 },
  productName: { fontSize: 11, fontWeight: '700', marginBottom: 2 },
  productPrice: { fontSize: 10, fontWeight: '700', marginBottom: 6 },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  starBtn: {
    width: 26, height: 26, borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  plusBtn: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: ACCENT,
    alignItems: 'center', justifyContent: 'center',
    elevation: 3,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, shadowRadius: 3,
  },
  plusText: {
    color: '#FFF', fontSize: 18, fontWeight: '800',
    lineHeight: 22, textAlign: 'center',
  },
});