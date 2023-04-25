import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { db } from "../../firebase";
import { Ionicons } from "@expo/vector-icons";
import {Picker} from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { Firestore, doc, getDoc, setDoc, collection } from "firebase/firestore";

const blue = '#182640';
const tan = '#FAE8CD';
const lightBlue = '#C9D3FF';

const ScheduleAvailabilityScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [repeatOption, setRepeatOption] = useState(false);
  const [customFrequency, setCustomFrequency] = useState("Daily");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [open, setOpen] = useState(false);
  const [openStartTimePicker, setOpenStartTimePicker] = useState(false);
  const [openEndTimePicker, setOpenEndTimePicker] = useState(false);
  const [toggleCheckbox, setToggleCheckbox] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false);

  const navigation = useNavigation();

  const validateTime = (startTime, endTime) => {
    const duration = endTime - startTime;
    const maxDuration = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    return duration > 0 && duration <= maxDuration;
  };

  const createAppointments = async () => {
    const startDate = selectedDate;
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 3); // Set a cut-off of 3 months
  
    let appointmentDates = [];
    // Generate appointment dates based on the selected repeat option
    if (repeatOption === "Never") {
      appointmentDates.push(selectedDate);
    } else if (repeatOption === "Every Day") {
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        appointmentDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (repeatOption === "Every Week") {
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const currentDay = currentDate.getDay();
        if (selectedDays.includes(currentDay)) {
          appointmentDates.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (repeatOption === "Every Month") {
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        if (selectedDates.includes(currentDate.getDate())) {
          appointmentDates.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (repeatOption === "Custom") {
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const currentDay = currentDate.getDay();
        const currentDayOfMonth = currentDate.getDate();
        if (
          (customFrequency === "Daily") ||
          (customFrequency === "Weekly" && selectedDays.includes(currentDay)) ||
          (customFrequency === "Monthly" && selectedDates.includes(currentDayOfMonth))
        ) {
          appointmentDates.push(new Date(currentDate));
        }
  
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  
    // Create open appointments in Firebase
    for (const date of appointmentDates) {
      // Create appointment object with appropriate details
      const appointment = {
        date: date,
        startTime: startTime,
        endTime: endTime,
        // other necessary details
      };
  
      // Add appointment to Firebase
      try {
        //await db.collection("appointments").add(appointment);
        await setDoc(doc(db, "appointments", "test"+toString(date)), appointment);
        console.log("Appointment added successfully");
      } catch (error) {
        console.error("Error adding appointment: ", error);
      }
    }
  };

  const onConfirm = async () => {
    if (selectedDate && startTime && endTime && validateTime(startTime, endTime)) {
      await createAppointments();
      setIsConfirmed(true);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } else {
      alert("Please make sure you have selected a date and a valid time range.");
    }
  };

  const showDatePicker = () => {
    setOpen(true);
  };
  
  const onDismissSingle = () => {
    setOpen(false);
  };
  
  const onConfirmSingle = (params) => {
    setOpen(false);
    setSelectedDate(params.date);
  };
  
  const showTimePickerStart = () => {
    setOpenStartTimePicker(true);
  };
  
  const onDismissStartTime = () => {
    setOpenStartTimePicker(false);
  };
  
  const onConfirmStartTime = ({ hours, minutes }) => {
    if (hours !== undefined && minutes !== undefined) {
      const selectedTime = new Date();
      selectedTime.setHours(hours);
      selectedTime.setMinutes(minutes);
      console.log(selectedTime);
      setOpenStartTimePicker(false);
      setStartTime(selectedTime);
    } else {
      console.log("no time selected");
    }
  };
  
  const onConfirmEndTime = ({ hours, minutes }) => {
    if (hours !== undefined && minutes !== undefined) {
      const selectedTime = new Date();
      selectedTime.setHours(hours);
      selectedTime.setMinutes(minutes);
      setOpenEndTimePicker(false);
      setEndTime(selectedTime);
    }
  };
  
  const showTimePickerEnd = () => {
    setOpenEndTimePicker(true);
  };
  
  const onDismissEndTime = () => {
    setOpenEndTimePicker(false);
  };

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    isConfirmed ? (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>Confirmed</Text>
        </View>
      ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Availability</Text>
    <View>
      <View >
      <View style={[styles.dateContainer]}>
          <Text style={[styles.label,{marginRight:15}]}>Date:</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Ionicons name="calendar" size={32} color={tan} />
          </TouchableOpacity>
          {selectedDate && <Text style={styles.selectedDate}>{selectedDate.toLocaleDateString()}</Text>}
        </View>
       
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={selectedDate}
          onConfirm={onConfirmSingle}
          label="Select date"
        />
      </View>

      <View>
      <Text style={[styles.label,{marginBottom:0} ]}>Time:</Text>
        <TouchableOpacity onPress={showTimePickerStart} style={styles.timeButton}>
          <Text style={styles.timeButtonText}>{startTime ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Select start time"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showTimePickerEnd} style={styles.timeButton}>
          <Text style={styles.timeButtonText}>{endTime ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Select end time"}</Text>
        </TouchableOpacity>
        <TimePickerModal
          visible={openStartTimePicker}
          onDismiss={onDismissStartTime}
          onConfirm={onConfirmStartTime}
          label="Select a starting time"
          inputType="keyboard"
          //time = {startTime}
          keyboardIcon="keyboard-outline"
          clockIcon="clock-outline"
        />
        <TimePickerModal
          visible={openEndTimePicker}
          onDismiss={onDismissEndTime}
          onConfirm={onConfirmEndTime}
          label="Select an ending time"
          inputType="keyboard"
        />
      </View>

      <View style = {styles.dateContainer}> 
        <Text style={[styles.label, {marginRight:20}]}>Repeat?</Text>
        <Checkbox
        disabled={false}
        value={repeatOption}
        onValueChange={(newValue) => setRepeatOption(newValue)}
        />
      </View>

      {repeatOption && (
        <>
          <View>
            <Text style={[styles.label,{marginTop:5}]}>Frequency</Text>
            <Picker
                selectedValue={customFrequency}
                onValueChange={(itemValue) => setCustomFrequency(itemValue)}
                style={[styles.picker, {marginTop: 0}]}
            >
                <Picker.Item label="Daily" value="Daily" />
                <Picker.Item label="Weekly" value="Weekly" />
                <Picker.Item label="Monthly" value="Monthly" />
            </Picker>
          </View>
          {customFrequency === "Weekly" && (
            <View>
              <Text style={[styles.label,{marginTop:0}]}>Select Days</Text>
              <View style={styles.dayOptionsContainer}>
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
                <View style={styles.dayOption} key={index}>
                    <Text style={styles.dayText}>{day}</Text>
                    <Checkbox
                    title={day}
                    checked={selectedDays.includes(index)}
                    onPress={() => {
                        setSelectedDays((prevSelectedDays) => {
                        if (prevSelectedDays.includes(index)) {
                            return prevSelectedDays.filter((prevIndex) => prevIndex !== index);
                        } else {
                            return [...prevSelectedDays, index];
                        }
                        });
                    }}
                    />
                </View>
                ))}
            </View>
            </View>
          )}
          {customFrequency === "Monthly" && (
             <View>
                <Text style={styles.label}>Select Dates</Text>
                <Button onPress={() => setShowDatePicker(true)} title="Select Dates" />
             <DatePickerModal
                visible={showDatePicker}
                onDismiss={() => setShowDatePicker(false)}
                mode="multiple"
                onConfirm={(dates) => {
                    setShowDatePicker(false);
                    setSelectedDates(dates.map((date) => new Date(date)));
                  }}
                date={selectedDates}
            />
            </View>
        )}
        </>
      )}
</View>
<View style={styles.buttonContainer}>
  <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
    <Text style={styles.buttonText}>Cancel</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
    <Text style={styles.buttonText}>Confirm</Text>
  </TouchableOpacity>
</View>
</View>
      )
  );
};
     
const styles = StyleSheet.create({
    picker: {
        backgroundColor: tan,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 5,
        alignSelf: 'center',
        width: 250,
        marginBottom: 30,
      },
      pickerText: {
        fontSize: 16,
        color: blue,
      },
    container: {
    flex: 1,
    //padding: 20,
    backgroundColor: blue,
    alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop:15,
        marginBottom: 20,
        color: tan,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginBottom: 20,
      },
      cancelButton: {
        backgroundColor: blue,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        borderColor: tan,
        borderWidth: 4,
      },
      confirmButton: {
        backgroundColor: blue,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        borderColor: tan,
        borderWidth: 4,
      },
      buttonText: {
        color: tan,
        fontSize: 16,
        fontWeight: 'bold',
      },
      title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: tan,
        fontFamily: 'Vikendi',
        marginTop: 30,
      },
      table: {
        marginTop: 20,
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        maxHeight: '40%',
      },
      tableRow: {
        flexDirection: 'row',
      },
      headerEntry: {
        backgroundColor: 'white',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 5,
        fontSize: 10,
        height: 40,
        width: '25%',
        justifyContent: 'center',
      },
      entry: {
        backgroundColor: tan,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        fontSize: 10,
        height: 40,
        width: '25%',
        justifyContent: 'center',
      },
      selectedEntry: {
        backgroundColor: lightBlue,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        fontSize: 10,
        height: 40,
        width: '25%',
        justifyContent: 'center',
      },
      selectedRow: {
        backgroundColor: lightBlue,
        flexDirection: 'row',
      },
      button: {
        width: '28%',
        height: '8%',
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 30,
        borderColor: tan,
        borderWidth: 4.5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: blue,
      },
      scheduleButton: {
        width: '32%',
        height: '8%',
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 30,
        borderColor: tan,
        borderWidth: 4.5,
        paddingTop: 5,
        //padding: 0,
        //alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: tan,
      },
      scheduleButtonText: {
        color: blue,
        fontSize: 20,
        fontFamily: 'Vikendi',
        
        //fontWeight: 'bold',
      },
      buttonText: {
        color: tan,
        fontSize: 20,
        fontFamily: 'SF',
        fontWeight: 'bold',
      },
      buttonContent: {
        //height: 50,
      },
      dateContainer: {
        flexDirection: "row",
        alignItems: "center",
      },
      selectedDate: {
        marginLeft: 15,
        fontSize: 22,
        color: tan,
        fontWeight: "bold",
        fontFamily: 'SF',
      },
      timeButton: {
        backgroundColor: tan,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 15,
        alignSelf: 'center',
        width: 250,
      },
      timeButtonText: {
        fontSize: 16,
        color: blue,
      },
      dayOptionsContainer: {
        flexDirection: 'column',
    },
    '@media (min-width: 500px) and (orientation: landscape)': {
        dayOptionsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
    },
    dayOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      dayText: {
        color: tan,
        marginRight: 10,
      },
      confirmationContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
confirmationText: {
  fontSize: 30,
  color: tan,
},
    });
    
    export default ScheduleAvailabilityScreen;