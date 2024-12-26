import React, { useState } from 'react';
import soapRequest from '../XpodaApi/ApiBaglanti';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const LoginScreen = ({ setTicket, setUsername, setPassword }) => {
  const [username, setLocalUsername] = useState('');
  const [password, setLocalPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (!username || !password) {
        Alert.alert('Uyarı', 'Kullanıcı adı ve şifre alanları boş bırakılamaz.');
        return;
      }
      
      const result = await soapRequest.loginRequest(username, password);
      if (result !== null) {
        setTicket(result);
        setUsername(username);
        setPassword(password);        
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Giriş Başarısız', 'Giriş yapılamadı, lütfen bilgilerinizi kontrol edin.');
      }
    } catch (error) {
      Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Kullanıcı Adı</Text>
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adınızı Girin"
          value={username}
          onChangeText={setLocalUsername}
        />
        <Text style={styles.label}>Şifre</Text>
        <TextInput
          style={styles.input}
          placeholder="Şifrenizi Girin"
          value={password}
          onChangeText={setLocalPassword}
          secureTextEntry
        />
        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={isLoading}>
          <Text style={styles.buttonText}>
            {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default LoginScreen;
