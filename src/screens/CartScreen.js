import { useContext } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppContext } from '../context/AppContext';

const ACCENT = '#F4845F';


const getImageSource = (image) =>
  typeof image === 'number' ? image : { uri: image };

export default function CartScreen() {
  const { cart, updateQty, checkout, isDarkMode } = useContext(AppContext);

  const dark        = isDarkMode;
  const bg          = dark ? '#0D0B1E' : '#F0EFF8';
  const cardBg      = dark ? '#1A1740' : '#FFFFFF';
  const textPrimary = dark ? '#FFFFFF' : '#1A1830';
  const textMuted   = dark ? '#9B97C8' : '#7A7899';
  const borderColor = dark ? '#2D2B55' : '#E8E5F0';

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (cart.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: bg, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 56 }}>🛒</Text>
        <Text style={{ color: textPrimary, fontSize: 18, fontWeight: '700', marginTop: 16 }}>
          Keranjang Kosong
        </Text>
        <Text style={{ color: textMuted, fontSize: 13, marginTop: 6 }}>
          Tambahkan produk dari halaman Home
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
        renderItem={({ item }) => (
          <View style={[styles.cartItem, { backgroundColor: cardBg }]}>
            
            <Image
              source={getImageSource(item.image)}
              style={styles.itemImg}
              resizeMode="cover"
            />

            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={{ color: textPrimary, fontWeight: '700', fontSize: 15 }}>
                {item.name}
              </Text>
              <Text style={{ color: ACCENT, fontWeight: '600', fontSize: 13, marginTop: 2 }}>
                Rp{item.price.toLocaleString('id-ID')}
              </Text>
              <Text style={{ color: textMuted, fontSize: 11, marginTop: 2 }}>
                Subtotal: Rp{(item.price * item.qty).toLocaleString('id-ID')}
              </Text>
            </View>

            
            <View style={styles.qtyRow}>
              <TouchableOpacity
                onPress={() => updateQty(item.id, -1)}
                style={[styles.qtyBtn, { backgroundColor: dark ? '#2D2B55' : '#EEE' }]}
                activeOpacity={0.7}
              >
                <Text style={{ color: ACCENT, fontSize: 18, fontWeight: '700', lineHeight: 22 }}>−</Text>
              </TouchableOpacity>

              <Text style={{ color: textPrimary, fontSize: 16, fontWeight: '700', marginHorizontal: 12, minWidth: 20, textAlign: 'center' }}>
                {item.qty}
              </Text>

              <TouchableOpacity
                onPress={() => updateQty(item.id, 1)}
                style={[styles.qtyBtn, { backgroundColor: ACCENT }]}
                activeOpacity={0.7}
              >
                <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '700', lineHeight: 22 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      
      <View style={[styles.summary, { backgroundColor: cardBg, borderColor }]}>
        {cart.map((item) => (
          <View key={item.id} style={styles.summaryRow}>
            <Text style={{ color: textMuted, fontSize: 13 }}>
              {item.name} ({item.qty}x)
            </Text>
            <Text style={{ color: textPrimary, fontSize: 13 }}>
              Rp{(item.price * item.qty).toLocaleString('id-ID')}
            </Text>
          </View>
        ))}

        <View style={[styles.divider, { borderColor }]} />

        <View style={styles.summaryRow}>
          <Text style={{ color: textPrimary, fontWeight: '700', fontSize: 16 }}>Total</Text>
          <Text style={{ color: ACCENT, fontWeight: '700', fontSize: 16 }}>
            Rp{total.toLocaleString('id-ID')}
          </Text>
        </View>

        <TouchableOpacity
          onPress={checkout}
          style={styles.checkoutBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  itemImg: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summary: {
    margin: 16,
    marginTop: 4,
    padding: 16,
    borderRadius: 20,
    borderWidth: 0.5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  divider: {
    borderTopWidth: 0.5,
    marginVertical: 10,
  },
  checkoutBtn: {
    backgroundColor: ACCENT,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
    elevation: 4,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  checkoutText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});