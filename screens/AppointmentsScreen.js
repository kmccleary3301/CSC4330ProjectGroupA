import { useState } from "react";
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppointmentForm from "../AppointmentForm";
import AppointmentList from "../AppointmentList";

function AppointmentsScreen() {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]);

  const handleAddAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Appointments Screen</Text>
    <View>
      <AppointmentForm onAddAppointment={handleAddAppointment} />
      <AppointmentList appointments={appointments} />
    </View>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate('HomeScreen')}
      />
    </View>
  );
}

export default AppointmentsScreen;