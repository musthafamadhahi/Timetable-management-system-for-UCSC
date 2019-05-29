const functions = require('firebase-functions');
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

admin.initializeApp()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'schedulemanager1@gmail.com',
        pass: 'dnnzutdnpcnqyzlj'
    }
});

exports.sendMail = functions.firestore.document('messages/{document}').onCreate(event => {

    const dest = "pasindusenerath@gmail.com";
     const LecturerID = event.data().LecturerID;
     const reason = event.data().Reason;
     const date = event.data().Date;
     const time = event.data().Time;
     const newdate = event.data().NewDate;
     const newtime = event.data().NewTime;
     const subject = event.data().Subject;

    
    const mailOption = {
        from: 'Schedule Manager <pasindusenerath@gmail.com>',
        to: dest,
        subject: 'Requesting Reschedule',
        html: `<h3> Details of Request </h3>
                <p> <b>Lecturer Code     :</b> ${LecturerID} </p>
                <p> <b>Lecture Date      :</b> ${date}</p>
                <p> <b>Lecture Time      :</b> ${time}</p>
                <p> <b>Requested Date    :</b> ${newdate}</p>
                <p> <b>Requested Time    :</b> ${newtime}</p>
                <p> <b>Subject           :</b> ${subject}</p>
                <p> <b>Reason            :</b> ${reason}</p>`
    }

    return transporter.sendMail(mailOption, (err, info) => {
        if(err){
            console.log('Error'+ err)
            return;
        }else{
            console.log('message Sent')
            return
        }
    })
})



exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.id, {
            admin: true
        });
    }).then(() => {
        return{
            message: '${data.email} has been made an admin Successfully!'
        }
    }).catch(err => {
        return err;
    });
});

exports.addSuperAdminRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.id, {
            superadmin: true
        });
    }).then(() => {
        return{
            message: '${data.email} has been made as Super Admin Successfully!'
        }
    }).catch(err => {
        return err;
    });
});

exports.addLecturerRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.id, {
            lecturer: true
        });
    }).then(() => {
        return{
            message: '${data.email} has been made as Lecturer Successfully!'
        }
    }).catch(err => {
        return err;
    });
});