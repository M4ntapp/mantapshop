import { useContext } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { AppContext } from '../context/AppContext';

const ACCENT = '#F4845F';

const getImageSource = (image) =>
  typeof image === 'number' ? image : { uri: image };

export default function WishlistScreen() {
  const { wishlist, removeFromWishlist, moveWishlistToCart, isDarkMode } =
    useContext(AppContext);

  const dark        = isDarkMode;
  const bg          = dark ? '#0D0B1E' : '#F0EFF8';
  const cardBg      = dark ? '#1A1740' : '#FFFFFF';
  const imgBox      = dark ? '#13113A' : '#F4F0FF';
  const textPrimary = dark ? '#FFFFFF' : '#1A1830';
  const textMuted   = dark ? '#9B97C8' : '#9490B8';

  const renderRightActions = (id) => (
    <TouchableOpacity
      onPress={() => removeFromWishlist(id)}
      style={styles.swipeDelete}
      activeOpacity={0.8}
    >
      <Text style={{ fontSize: 22 }}>🗑</Text>
      <Text style={{ color: '#FFF', fontSize: 11, fontWeight: '700', marginTop: 3 }}>Hapus</Text>
    </TouchableOpacity>
  );

  const renderLeftActions = (item) => (
    <TouchableOpacity
      onPress={() => moveWishlistToCart(item)}
      style={styles.swipeCart}
      activeOpacity={0.8}
    >
      <Text style={{ fontSize: 22 }}>🛒</Text>
      <Text style={{ color: '#FFF', fontSize: 11, fontWeight: '700', marginTop: 3 }}>Cart</Text>
    </TouchableOpacity>
  );

  if (wishlist.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: bg, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 60 }}>⭐</Text>
        <Text style={{ color: textPrimary, fontSize: 18, fontWeight: '700', marginTop: 16 }}>
          Wishlist Kosong
        </Text>
        <Text style={{ color: textMuted, fontSize: 13, marginTop: 6 }}>
          Tekan ☆ pada produk untuk menambahkan
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <Text style={{ color: textMuted, fontSize: 11, textAlign: 'center', paddingVertical: 10 }}>
        ← Geser kanan: ke Cart   |   Geser kiri: Hapus →
      </Text>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => renderRightActions(item.id)}
            renderLeftActions={() => renderLeftActions(item)}
            overshootRight={false}
            overshootLeft={false}
          >
            <View style={[styles.row, { backgroundColor: cardBg }]}>
              
              <View style={[styles.imgBox, { backgroundColor: imgBox }]}>
                <Image
                  source={getImageSource(item.image)}
                  style={styles.img}
                  resizeMode="cover"
                />
              </View>

              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={{ color: textPrimary, fontWeight: '700', fontSize: 15 }}>
                  {item.name}
                </Text>
                <Text style={{ color: ACCENT, fontWeight: '600', fontSize: 13, marginTop: 3 }}>
                  Rp{item.price.toLocaleString('id-ID')}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => moveWishlistToCart(item)}
                style={styles.cartBtn}
                activeOpacity={0.75}
              >
                <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '700' }}>+ Cart</Text>
              </TouchableOpacity>
            </View>
          </Swipeable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  imgBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  swipeDelete: {
    backgroundColor: '#E24B4A',
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    borderRadius: 16,
    marginBottom: 8,
    marginLeft: 6,
  },
  swipeCart: {
    backgroundColor: ACCENT,
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    borderRadius: 16,
    marginBottom: 8,
    marginRight: 6,
  },
  cartBtn: {
    backgroundColor: ACCENT,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    elevation: 3,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
});