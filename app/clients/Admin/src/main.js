'use strict';

var React = require('react');
var io = require('socket.io-client');

var Application = React.createFactory(require('./Components/Application.js'));
var makeMap = require('../../_common/js/makeMap.js');
var resetUpdate = require('../../_common/js/resetUpdate.js');
var serverAPI = require('../../_common/js/serverAPI.js');

var socket = io();

var errlog = console.error.bind(console);

function render(){
    React.render(new Application(topLevelStore), document.body);
}

function updateDB(data){
    // send request to server according to the desired table

    var delta = {};
    delta[data.field] = data.value;

    var obj = {
        id: data.id,
        delta: delta
    };
    
    switch (data.table){
        case 'place':
            serverAPI.updateRC(obj)
            .then(function(res){
                console.log('Places database updated successfully');
                var ant = topLevelStore.placeMap.get(res.id);
                Object.assign(ant, res);
                updateLocal(ant);
            })
            .catch(function(){
                console.log('Places database didn\'t update correctly');
                refreshView();
            });
            break;

        case 'sensor':
            serverAPI.updateSensor(obj)
            .then()
            ;
            break;

        default:
            console.log('No such table as ', data.table);
            break;
    }        

}

function updateLocal(ant){
    topLevelStore.placeMap.set(ant.installed_at, ant);
    topLevelStore.placeMap.set(ant.id, ant);

    render();
}

function refreshView(){

    var placesP = serverAPI.getAllPlacesInfos();
    var sensorsP = serverAPI.getAllSensors();

    Promise.all([placesP, sensorsP])
    .then(function(results){

        console.log('places', results[0]);
        console.log('sensors', results[1]);

        // topLevelStore.sensorMap = makeMap(sensors, 'id');
        // topLevelStore.placeMap = makeMap(sensors, 'installed_at');

        // resetUpdate(topLevelStore.sensorMap);

        // console.log('topLevelStore', topLevelStore);
        
        // render();
    })
    .catch(errlog);
}

var topLevelStore = {
    sensorMap: undefined,
    placeMap: undefined,
    onChange: updateDB
};

// Initial rendering
refreshView();

// THIS WILL BE NEEDED WHEN QUIPU SIGNAL IS INCORPORATED INTO DATA MSGS
// socket.on('data', function (msg){
//     var id = msg.socketMessage.sensor_id;
//     var signal = msg.socketMessage.quipu.signal;

//     var updatingAnt = topLevelStore.ants.get(id);
//     updatingAnt.signal = signal;

//     render();
// });

socket.on('status', function (msg) {

    // GET DATA
    var id = msg.sensorId;
    var status = msg.socketMessage;

    resetUpdate(topLevelStore.sensorMap);

    var updatingSensorMap = topLevelStore.sensorMap.get(id);
    updatingSensorMap.quipu_status = status.quipu.state;
    updatingSensorMap.signal = status.quipu.signal;
    updatingSensorMap.sense_status = status.sense;
    updatingSensorMap.latest_input = status.info.command;
    updatingSensorMap.latest_output = status.info.result;
    updatingSensorMap.isUpdating = true;
    
    // console.log('sensors', updatingSensors);

    render();

    setTimeout(function(){
        resetUpdate(topLevelStore.sensorMap);
        render();
    }, 200);

});



// // USE TO SIMULATE A STATUS SENDING TO SERVER FROM SENSOR

// var quipu = require('quipu/parser.js');
// var sendReq = require('../../_common/js/sendReq.js');

// setInterval(function(){

// 	var id = Math.floor(Math.random() * 28);

// 	quipu.encode({
// 		info: {
// 			command: 'connect3G',
// 			result: 'OK'
// 		},
// 		quipu: '3G_connected',
// 		sense: 'recording'
// 	})
// 	.then(function(msg){
// 		var toSend = {
// 			From: 'xxx' + id,
// 			Body: '2' + msg
// 		};

// 		console.log('Sending', toSend);
// 		sendReq('POST', '/twilio', toSend);
// 	})
// 	.catch(function(err){
// 		console.log(err);
// 	});

// }, 3000);

