import { useContext, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { AppContext } from '../context/AppContext';

const ACCENT = '#F4845F';


function HistoryDetail({ trx, onBack, dark }) {
  const bg         = dark ? '#0D0B1E' : '#F0EFF8';
  const cardBg     = dark ? '#1A1740' : '#FFFFFF';
  const textPrimary   = dark ? '#FFFFFF' : '#1A1830';
  const textSecondary = dark ? '#9B97C8' : '#7A7899';
  const borderColor   = dark ? '#2D2B55' : '#E8E5F0';

  return (
    <View style={{ flex: 1, backgroundColor: bg, padding: 16 }}>
      <TouchableOpacity onPress={onBack} style={{ marginBottom: 20 }}>
        <Text style={{ color: ACCENT, fontSize: 15, fontWeight: '600' }}>← Back</Text>
      </TouchableOpacity>

      <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
        <Text style={{ color: ACCENT, fontWeight: '700', fontSize: 18, marginBottom: 4 }}>
          Code: {trx.id}
        </Text>
        <Text style={{ color: textSecondary, fontSize: 12, marginBottom: 20 }}>
          {trx.date}
        </Text>

        <Text style={{ color: textPrimary, fontWeight: '700', fontSize: 14, marginBottom: 10 }}>
          Products:
        </Text>

        {trx.items.map((item, i) => (
          <View key={item.id} style={[styles.detailRow, { borderColor }]}>
            <Text style={{ color: textSecondary, fontSize: 13, flex: 1 }}>
              {i + 1}. {item.name} ({item.qty}x)
            </Text>
            <Text style={{ color: textPrimary, fontSize: 13, fontWeight: '600' }}>
              = Rp{(item.price * item.qty).toLocaleString('id-ID')}
            </Text>
          </View>
        ))}

        <View style={[styles.divider, { borderColor }]} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: textPrimary, fontWeight: '700', fontSize: 16 }}>Total</Text>
          <Text style={{ color: ACCENT, fontWeight: '700', fontSize: 16 }}>
            Rp{trx.total.toLocaleString('id-ID')}
          </Text>
        </View>
      </View>
    </View>
  );
}


export default function HistoryScreen() {
  const { history, isDarkMode } = useContext(AppContext);
  const [filterText, setFilterText] = useState('');
  const [selectedTrx, setSelectedTrx] = useState(null);

  const dark = isDarkMode;
  const bg         = dark ? '#0D0B1E' : '#F0EFF8';
  const cardBg     = dark ? '#1A1740' : '#FFFFFF';
  const textPrimary   = dark ? '#FFFFFF' : '#1A1830';
  const textSecondary = dark ? '#9B97C8' : '#7A7899';
  const borderColor   = dark ? '#2D2B55' : '#E8E5F0';
  const inputBg    = dark ? '#1A1740' : '#FFFFFF';

  if (selectedTrx) {
    return (
      <HistoryDetail
        trx={selectedTrx}
        onBack={() => setSelectedTrx(null)}
        dark={dark}
      />
    );
  }

  const filtered = history.filter((t) =>
    t.id.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: bg, padding: 16 }}>
      
      <TextInput
        placeholder="Filter by Transaction ID..."
        placeholderTextColor={textSecondary}
        value={filterText}
        onChangeText={setFilterText}
        style={[styles.input, { backgroundColor: inputBg, color: textPrimary, borderColor }]}
      />

      
      {history.length === 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 56 }}>📋</Text>
          <Text style={{ color: textPrimary, fontSize: 18, fontWeight: '700', marginTop: 16 }}>
            Belum Ada Transaksi
          </Text>
          <Text style={{ color: textSecondary, fontSize: 13, marginTop: 6 }}>
            Checkout dari Cart untuk melihat riwayat
          </Text>
        </View>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: ACCENT, fontWeight: '700', fontSize: 16, marginBottom: 4 }}>
                  Code: {item.id}
                </Text>
                <Text style={{ color: textSecondary, fontSize: 12, marginBottom: 8 }}>
                  {item.date}
                </Text>
                <Text style={{ color: textPrimary, fontSize: 14, fontWeight: '600' }}>
                  Total: Rp{item.total.toLocaleString('id-ID')}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedTrx(item)}
                style={styles.detailBtn}
                activeOpacity={0.8}
              >
                <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 13 }}>Detail</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          filterText.length > 0 ? (
            <Text style={{ color: textSecondary, textAlign: 'center', marginTop: 24 }}>
              Tidak ada transaksi dengan ID "{filterText}"
            </Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    fontSize: 14,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 0.5,
  },
  detailBtn: {
    backgroundColor: ACCENT,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
  },
  divider: {
    borderTopWidth: 0.5,
    marginVertical: 12,
  },
});