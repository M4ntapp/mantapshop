import { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../context/AppContext';

const ACCENT = '#F4845F';

export default function ProfileScreen() {
  const { isDarkMode } = useContext(AppContext);

  const dark        = isDarkMode;
  const bg          = dark ? '#0D0B1E' : '#F0EFF8';
  const cardBg      = dark ? '#1A1740' : '#FFFFFF';
  const textPrimary = dark ? '#FFFFFF' : '#1A1830';
  const textMuted   = dark ? '#9B97C8' : '#7A7899';
  const borderColor = dark ? '#2D2B55' : '#E8E5F0';

  const infoRows = [
    { label: 'Nama',        value: 'Manuel Manatap Sianturi' },
    { label: 'NIM',         value: '00000094183' },
    { label: 'Kelas',       value: 'IF670-ALEN' },
    { label: 'Mata Kuliah', value: 'Cross Mobile Platform' },
    { label: 'Universitas', value: 'UMN' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: bg, padding: 16, justifyContent: 'center' }}>

      
      <View style={{ alignItems: 'center', zIndex: 1, marginBottom: -50 }}>
        <View style={styles.avatarRing}>
          <Image
            source={require('../../assets/images/profile.jpeg')}
            style={styles.avatarImg}
            resizeMode="cover"
          />
        </View>
      </View>

      
      <View style={[styles.infoCard, { backgroundColor: cardBg, borderColor }]}>
        
        <View style={{ height: 60 }} />

        <Text style={{ color: textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 14, textAlign: 'center' }}>
          INFORMASI MAHASISWA
        </Text>

        {infoRows.map((row, i) => (
          <View key={row.label}>
            <View style={styles.infoRow}>
              <Text style={{ color: textMuted, fontSize: 13 }}>{row.label}</Text>
              <Text
                style={{ color: textPrimary, fontSize: 13, fontWeight: '600', textAlign: 'right', flex: 1, marginLeft: 16 }}
                numberOfLines={1}
              >
                {row.value}
              </Text>
            </View>
            {i < infoRows.length - 1 && (
              <View style={[styles.divider, { borderColor }]} />
            )}
          </View>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  avatarRing: {
    width: 104,
    height: 104,
    borderRadius: 52,
    padding: 3,
    backgroundColor: ACCENT,
    elevation: 10,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  avatarImg: {
    width: 98,
    height: 98,
    borderRadius: 49,
  },
  infoCard: {
    borderRadius: 24,
    padding: 20,
    paddingTop: 10,
    borderWidth: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
  },
  divider: {
    borderTopWidth: 0.5,
  },
});