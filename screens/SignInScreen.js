import React from 'react'
import { View, Button, StyleSheet, TextInput, Text, AsyncStorage } from 'react-native'

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Necesitas estar logueado',
  }

  state = {
    username: '',
    password: '',
  }

  _handleAuthButtonPress = async () => {
    const { username, password } = this.state

    const res = await fetch('https://superclasico-movil.now.sh/auth', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    })
    const json = await res.json()
    await AsyncStorage.setItem('jwt', json.jwt)

    this.props.navigation.navigate('App')
  }

  handleUsernameChange = username => this.setState({ username })
  handlePasswordChange = password => this.setState({ password })

  render() {
    const { username, password } = this.state
    const loginButtonDisabled = !username || !password

    return (
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          value={username}
          onChangeText={this.handleUsernameChange}
        />
        <TextInput
          autoCapitalize="none"
          textContentType="password"
          style={styles.input}
          value={password}
          onChangeText={this.handlePasswordChange}
        />

        <Button disabled={loginButtonDisabled} title="Login" onPress={this._handleAuthButtonPress} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 25,
    width: 200,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    margin: 5,
    backgroundColor: '#aeaeae',
    borderRadius: 5,
  },
})
