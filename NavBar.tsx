import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import {
  useNavigation,
  useRoute,
  //StackNavigationProp,
  useIsFocused,
} from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "./types"; // Import your RootStackParamList type from the types file
import profileIcon from './assets/icons/profile2x.png';
import appointmentsIcon from './assets/icons/appointments2x.png';
import homeIcon from './assets/icons/home2x.png';


type NavBarItemProps = {
  iconSource: ImageSourcePropType;
  screenName: keyof RootStackParamList;
  text: string;
};

const NavBarContainer = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  const NavBarItem: React.FC<NavBarItemProps> = ({
    iconSource,
    screenName,
    text,
  }) => {
    const onPress = () => {
      navigation.navigate(screenName);
    };

    const isFocused = useIsFocused();

    return (
      <TouchableOpacity style={styles.navBarIcon} onPress={onPress}>
        <Image
          style={[
            styles.icon,
            route.name === screenName && isFocused ? styles.activeIcon : null,
          ]}
          resizeMode="cover"
          source={iconSource}
        />
        <Text
          style={[
            styles.text,
            route.name === screenName && isFocused ? styles.activeText : null,
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.navigationBar}>
      <NavBarItem
        iconSource={homeIcon}
        screenName="HomeScreen"
        text="Home"
      />
      <NavBarItem
        iconSource={appointmentsIcon}
        screenName="AppointmentsScreen"
        text="My Appointments"
      />
      <NavBarItem 
        iconSource={profileIcon}
        screenName="ProfileScreen"
        text="Profile"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: "row",
    backgroundColor: "#fae8cd",
    height: 92,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 22,
  },
  navBarIcon: {
    alignItems: "center",
  },
  icon: {
    width: 36,
    height: 37,
  },
  text: {
    fontSize: 12,
    lineHeight: 14,
    color: "#182640",
    fontFamily: "SF Compact Display Regular",
  },
  activeIcon: {
    tintColor: "#76A9D2",
  },
  activeText: {
    color: "#76A9D2",
  },
});

export default NavBarContainer;
