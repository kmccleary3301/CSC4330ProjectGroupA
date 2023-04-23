import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Badge, Surface, Title } from 'react-native-paper';

const IconSize = 24;
const blue = '#182640';
const tan = '#FAE8CD'; 
const lightBlue = '#C9D3FF';

const AppHeader = ({
  style,
  menu,
  back,
  title,
  right,
  // onRightPress,
  // optionalBtn,
  // optionalBtnPress,
  // rightComponent,
  headerBg,
  iconColor,
  // titleAlight,
  // optionalBadge,
  tintColor,
  onMenuPress,
  onLogoutPress,
}) => {
  const LeftView = () => (
    <View style={styles.view}>
      {menu && (
        <TouchableOpacity onPress={onMenuPress}>
          <Image
            source={require('./src/assets/icons/menu.png')}
            style={{ width: IconSize, height: IconSize, tintColor: iconColor }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      
    </View>
  );

  const RightView = () => (
    <View style={[styles.view, styles.rightView]} />
  );
  

  const TitleView = () => (
    <View style={styles.titleView}>
      {!title && (
        <Image
          source={require('./src/assets/icons/more.png')}
          style={{ ...styles.logo, tintColor }}
          resizeMode="contain"
        />
      )}
      {title && (
        <Image
        source={require('./src/assets/logos/blue.png')}
        style={{ ...styles.logo }}
        resizeMode="contain"
      />
      )}
    </View>
  );
  
  

  return (
    <Surface
      style={[styles.header, style, { backgroundColor: headerBg || tan }]}
    >
      <LeftView />
      <TitleView />
      <RightView />
    </Surface>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    elevation: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  view: {
    marginHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
  },
  rightView: {
    justifyContent: 'flex-end',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 40,
  },
});
