function LoginScreen() {
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleLogin = async () => {
      if (!username || !password) {
        setErrorMessage('Please enter your username and password.');
        return;
      }
    
      try {
        const response = await fetch('https://example.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
    
        const result = await response.json();
    
        if (result.success) {
          // Login successful, navigate to the home screen
          
        } else {
          // Login failed, show an error message
          setErrorMessage('Invalid username or password. Please try again.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('An error occurred while logging in. Please try again later.');
      }
    };
    
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logos/blue.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>Enter your credentials below</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder='Enter username'
            autoCapitalize='none'
            autoCorrect={false}
            textContentType='username'
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={styles.inputField}
            placeholder='Enter password'
            autoCapitalize='none'
            autoCorrect={false}
            textContentType='password'
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <View style={styles.passwordVisibilityContainer}>
            <Pressable onPress={handlePasswordVisibility}>
              <Text style={styles.link}>{showPassword ? 'Hide' : 'Show'}</Text>
            </Pressable>
          </View>
        </View>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Don't have an account?</Text>
          <Pressable >
            <Text style={styles.link}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  