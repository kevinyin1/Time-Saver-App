// Initialize Firebase
var config = {
    apiKey: "AIzaSyC4K9mxOykdlreSXVNeDvUTZpbj7q6uD9E",
    authDomain: "ekko-timer.firebaseapp.com",
    databaseURL: "https://ekko-timer.firebaseio.com",
    projectId: "ekko-timer",
    storageBucket: "ekko-timer.appspot.com",
    messagingSenderId: "601993912414"
};
firebase.initializeApp(config);
//ignore above as it is only the key for the firebase
//create events
function createEvents(title, date, time, location, notes){
    firebase.database().ref('events').push({
        //pushes the data into the database (firebase)
        title: title,
        date: date,
        time: time,
        location: location,
        notes: notes
    });
}

//create assignments
function createAssignment(title, date, subject, information, priority, time_needed){
    firebase.database().ref('assignments').push({
        //pushes the data into the database (firebase)
        title: title,
        date: date,
        subject: subject,
        information: information,
        priority: priority,
        time_needed: time_needed
    });
}
//pull events from the database (firebase)
function pullEvents(){
    var build = "";
    firebase.database().ref('events').on('value',function(snapshot){
        data = snapshot.val();
        template = "<hr>{{data.date}}<br>{{data.title}}<br>Location: {{data.location}}<br>Time: {{data.time}}<br>{{data.notes}}<br><button class='delete-event' onclick='deleteEvent(\"{{key}}\")'>Delete Event</button>";
        for (key in data){
            //accumulator
            //builds on the builds variable with strings of code
            build += Mustache.render(template,{key: key, data: data[key]});
        }
        //sets the html code in the output divider
        $('#output').html(build);
    });
}

//pull assignments from the database (firebase)
function pullAssignments(){
    var build;
    firebase.database().ref('assignments').orderByChild('date').on('value',function(snapshot){
        build = "";
        data = snapshot.val();
        template = "<hr>{{data.subject}}<br>{{data.title}}: {{data.information}}<br>Due Date: {{data.date}}<br>Priority: {{data.priority}}<br><button class='delete-assignment' onclick='deleteAssignment(\"{{key}}\")'>Delete Assignment</button>";
        for (key in data){
            //accumulator
            //builds on the builds variable with strings of code
            build += Mustache.render(template, {key: key, data: data[key]});
        }
        //sets the html code in the output divider
        $('#output').html(build);
    })
}
//delete the assignment from the database (firebase)
function deleteAssignment(delete_key){
    firebase.database().ref('assignments').child(delete_key).remove();
    // setTimeout(function () {
        window.location.href = "assignments.html"; //refreshs the page when deleting an assignment
    // }, 250);
}
//delete the event from the database (firebase)
function deleteEvent(delete_key){
    firebase.database().ref('events').child(delete_key).remove();
    // setTimeout(function () {
        window.location.href = "events.html"; //refreshs the page when deleting an event
    // }, 250);
}
//redirect the user to the home page
function changetoIndex(){
    window.location.href = "index.html";
}
