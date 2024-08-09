import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logoffRequest, insertDataRequest } from '../XpodaApi/ApiBaglanti';

const HomeScreen = ({ username, password, ticket }) => {
  const navigation = useNavigation();
  const [currencyCode, setCurrencyCode] = useState('');
  const [banknoteBuying, setBanknoteBuying] = useState('');
  const [banknoteSelling, setBanknoteSelling] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await logoffRequest(username, password, ticket);
      if (result !== null) {
        Alert.alert('Çıkış Başarılı', 'Başarıyla çıkış yaptınız.');
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Çıkış Başarısız', 'Çıkış yapılamadı, lütfen tekrar deneyin.');
      }
    } catch (error) {
      Alert.alert('Çıkış Hatası', 'Çıkış yapılırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currencyCode || !banknoteBuying || !banknoteSelling) {
      Alert.alert('Hata', 'Tüm alanları doldurmanız gerekmektedir.');
      return;
    }

    setLoading(true);
    try {
      const result = await insertDataRequest(username, password, currencyCode, banknoteSelling, banknoteBuying, ticket);
      if (result !== null) {
        Alert.alert('Kayıt Başarılı', 'Başarıyla kayıt yaptınız.');
      } else {
        Alert.alert('Kayıt Başarısız', 'Kayıt yapılamadı.');
      }
    } catch (error) {
      Alert.alert('Kayıt Hatası', 'Kayıt yapılırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Kur"
        value={currencyCode}
        onChangeText={setCurrencyCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Banka Alış"
        value={banknoteBuying}
        onChangeText={setBanknoteBuying}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Banka Satış"
        value={banknoteSelling}
        onChangeText={setBanknoteSelling}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.saveButtonText}>Kaydet</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Çıkış Yap</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#ff3333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;
