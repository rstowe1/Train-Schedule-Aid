// Initialize Firebase
var config = {
  apiKey: "AIzaSyDSVxqf2KYRLdpYiP9xhHbJKs0Skq0oJko",
  authDomain: "train-sched-hw.firebaseapp.com",
  databaseURL: "https://train-sched-hw.firebaseio.com",
  projectId: "train-sched-hw",
  storageBucket: "train-sched-hw.appspot.com",
  messagingSenderId: "374181506535"
};
firebase.initializeApp(config);

var database = firebase.database();

$('#add-train-btn').on('click', function (event) {
  event.preventDefault();

  var tName = $('#name-input').val().trim();
  var tDest = $('#dest-input').val().trim();
  var tStart = moment($('#start-input').val().trim(), 'HH:mm').format('X');
  var tFreq = $('#freq-input').val().trim();

  var newTrain = {
    name: tName,
    dest: tDest,
    start: tStart,
    freq: tFreq
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.start);
  console.log(newTrain.freq);

  alert('You have added a new train, \n look at the table to see the schedule');

  $('#name-input').val('');
  $('#dest-input').val('');
  $('#start-input').val('');
  $('#freq-input').val('');
});

database.ref().on('child_added', function (childSnapShot) {
  console.log(childSnapShot.val());

  var Name = childSnapShot.val().name;
  var Dest = childSnapShot.val().dest;
  var Start = childSnapShot.val().start;
  var Freq = childSnapShot.val().freq;

  console.log(Name);
  console.log(Dest);
  console.log(Start);
  console.log(Freq);

  var makeItSnazzy = moment.unix(Start).format('HH:mm');

  // var calculateThatTime = moment().diff(moment(makeItSnazzy, 'X'), 'HH:mm');

  // var countItDown = moment().starOf(calculateThatTime).fromNow();

  $('#trainSchedule > tbody').append('<tr><td>' + Name + '</td><td>' + Dest + '</td><td>' + Freq + '</td><td>' + 'fml' + '</td><td>' + 'fml' + '</td></tr>');
});

