const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Export the function as a named export
exports.sendAppointmentNotification = functions.firestore
  .document('appointments/{appointmentId}')
  .onCreate((snapshot, context) => {
    const appointment = snapshot.data();
    const userId = appointment.participants[1]; // assuming the second participant is the one who receives the notification
    return admin.firestore().collection('student').doc(userId).get()
      .then(userDoc => {
        const messagingToken = userDoc.data().messagingToken;
        const message = {
          webpush: {
            notification: {
              title: 'New Appointment Scheduled',
              body: `You have a new appointment on ${appointment.start_time} with ${appointment.participants[0]}.`
            },
            fcmOptions: {
              link: 'https://example.com/appointments' // optional URL to open when the user clicks the notification
            }
          },
          token: messagingToken
        };
        return admin.messaging().send(message);
      })
      .then(() => console.log('Appointment notification sent'))
      .catch(err => console.error('Error sending appointment notification:', err));
  });


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
