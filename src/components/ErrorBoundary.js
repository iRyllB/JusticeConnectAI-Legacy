import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    // Also log to console so Vercel or browser console shows the stack
    console.error('Captured error in ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Application Error</Text>
          <Text style={styles.message}>{String(this.state.error)}</Text>
          <Text style={styles.info}>{this.state.info?.componentStack}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#c00', marginBottom: 10 },
  message: { color: '#333' },
  info: { marginTop: 10, color: '#666' }
});
