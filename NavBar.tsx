import React, { useMemo } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  ImageSourcePropType,
} from "react-native";
import styles from './styles';

type NavBarContainerType = {
  dimensions?: ImageSourcePropType;
  dimensionsText?: ImageSourcePropType;


  apointmentsMarginTop?: number | string;
  apointmentsMarginLeft?: number | string;
  apointmentsMarginRight?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const NavBarContainer = ({
  dimensions,
  dimensionsText,
  apointmentsMarginTop,
  apointmentsMarginLeft,
  apointmentsMarginRight,
}: NavBarContainerType) => {
  const navigationBarStyle = useMemo(() => {
    return {
      ...getStyleValue("marginTop", apointmentsMarginTop),
      ...getStyleValue("marginLeft", apointmentsMarginLeft),
      ...getStyleValue("marginRight", apointmentsMarginRight),
    };
  }, [apointmentsMarginTop, apointmentsMarginLeft, apointmentsMarginRight]);

  return (
    <View
      style={[
        SS.navigationBar,
        {marginTop: 348},
        {marginLeft: 1},
        navigationBarStyle,
      ]}
    >
      <View style={[SS.profile, SS.profilePosition]}>
        <Text style={SS.profile1}>Profile</Text>
        <Image
          style={[SS.profileIcon, SS.iconPosition]}
          resizeMode="cover"
          source={require("../assets/icons/profile.png")}
        />
      </View>
      <View style={SS.more}>
        <Text style={[SS.more1, SS.more1Typo]}>More</Text>
        <Image
          style={[SS.moreIcon, SS.iconPosition]}
          resizeMode="cover"
          source={require("../assets/icons/more.png")}
        />
      </View>
      <View style={[SS.apointments, SS.profilePosition]}>
        <Text style={[SS.myAppointments, SS.more1Typo]}>
          My Appointments
        </Text>
        <Image
          style={SS.apointmentsIcon}
          resizeMode="cover"
          source={require("../assets/icons/appointments.png")}
        />
      </View>
      <View style={SS.home}>
        <Text style={[SS.myAppointments, SS.more1Typo]}>Home</Text>
        <Image
          style={[SS.homeIcon, SS.iconPosition]}
          resizeMode="cover"
          source={require("../assets/icons/home.png")}
        />
      </View>
    </View>
  );
    }
const SS = StyleSheet.create({
    profilePosition: {
      left: "50%",
      position: "absolute",
    },
    iconPosition: {
      overflow: "hidden",
      maxWidth: "100%",
      top: 0,
      position: "absolute",
    },
    more1Typo: {
      lineHeight: 13,
      fontSize: 12,
      textAlign: "left",
      color: "#182640",
      fontFamily: "url(../assets/fonts/sf-compact-display-regular) format('opentype')",
      bottom: 0,
      position: "absolute",
    },
    profile1: {
      fontSize: 12,
      lineHeight: 14,
      textAlign: "left",
      color: "#182640",
      fontFamily: "url(../assets/fonts/sf-compact-display-regular) format('opentype')",
      bottom: 0,
      left: 0,
      position: "absolute",
    },
    profileIcon: {
      right: 3,
      left: 3,
      height: 32,
    },
    profile: {
      marginLeft: 42,
      top: 8,
      width: 36,
      height: 52,
    },
    more1: {
      left: 1,
    },
    moreIcon: {
      right: 0,
      height: 7,
      left: 0,
    },
    more: {
      marginTop: -20,
      top: "50%",
      right: 24,
      width: 29,
      height: 33,
      position: "absolute",
    },
    myAppointments: {
      left: 0,
    },
    apointmentsIcon: {
      marginLeft: -21.97,
      width: 39,
      height: 39,
      top: 0,
      left: "50%",
      position: "absolute",
    },
    apointments: {
      marginLeft: -109,
      top: 9,
      width: 92,
      height: 51,
    },
    homeIcon: {
      right: 1,
      left: 2,
      height: 28,
    },
    home: {
      top: 10,
      left: 23,
      width: 31,
      height: 49,
      position: "absolute",
    },
    navigationBar: {
      backgroundColor: "#fae8cd",
      width: 432,
      height: 92,
    },
  });
  
  export default NavBarContainer;
  