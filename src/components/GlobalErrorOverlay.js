import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function GlobalErrorOverlay() {
  const [error, setError] = useState(null);

  useEffect(() => {
    function handleError(message, source, lineno, colno, errorObj) {
      setError({ message: message?.toString(), stack: (errorObj && errorObj.stack) || `${source}:${lineno}:${colno}` });
    }

    function handleRejection(event) {
      setError({ message: event?.reason?.message || String(event?.reason), stack: event?.reason?.stack });
    }

    window.addEventListener('error', (e) => handleError(e.message, e.filename, e.lineno, e.colno, e.error));
    window.addEventListener('unhandledrejection', (e) => handleRejection(e));

    return () => {
      window.removeEventListener('error', (e) => handleError(e.message, e.filename, e.lineno, e.colno, e.error));
      window.removeEventListener('unhandledrejection', (e) => handleRejection(e));
    };
  }, []);

  if (!error) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Runtime Error Detected</Text>
      <Text style={styles.message}>{error.message}</Text>
      <Text style={styles.stack}>{error.stack}</Text>
      <TouchableOpacity style={styles.dismiss} onPress={() => setError(null)}>
        <Text style={styles.dismissText}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'fixed', top: 10, left: 10, right: 10, zIndex: 9999, backgroundColor: '#fff7f7', borderColor: '#c00', borderWidth: 1, padding: 12, borderRadius: 8 },
  title: { fontWeight: 'bold', color: '#c00', marginBottom: 6 },
  message: { color: '#333', marginBottom: 8 },
  stack: { color: '#666', fontSize: 12, marginBottom: 8 },
  dismiss: { alignSelf: 'flex-end', padding: 6, backgroundColor: '#eee', borderRadius: 6 },
  dismissText: { color: '#333' }
});
