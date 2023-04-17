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
        iconSource={require('./assets/icons/home2x.png')}
        screenName="HomeScreen"
        text="Home"
      />
      <NavBarItem
        iconSource={require('./assets/icons/appointments2x.png')}
        screenName="AppointmentsScreen"
        text="My Appointments"
      />
       <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
        <NavBarItem 
          iconSource={require('./assets/icons/profile2x.png')}
          screenName="ProfileScreen"
          text="Profile"
        />
      </TouchableOpacity>
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
    fontFamily: "SFBold",
  },
  activeIcon: {
    tintColor: "#76A9D2",
  },
  activeText: {
    color: "#76A9D2",
  },
});

export default NavBarContainer;
