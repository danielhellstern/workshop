
//Event handler, waiting for pagecreate of #startPage callback
//
$('#startPage').live('pagecreate', function(event) {
	
	onDeviceReady();
});



//Starts the connection to database
//
function onDeviceReady() {
	var db = window.openDatabase("Terminkalender", "1.0", "Terminkalender",
			1000000);
	db.transaction(populateDB, errorCB, successCB);
}

// Populate the database
//
function populateDB(tx) {
	
	//tx.executeSql('DROP TABLE IF EXISTS Termine');
	tx
			.executeSql('CREATE TABLE IF NOT EXISTS Termine 	(id INTEGER PRIMARY KEY AUTOINCREMENT, Termin TEXT NOT NULL, Datum TEXT NOT NULL)');


}

// Transaction error callback
//
function errorCB(tx, err) {
	alert("Error processing SQL: " + err);
}


// Transaction success callback
//
function successCB() {
	
	var db = window.openDatabase("Terminkalender", "1.0", "Terminkalender",
			1000000);
	db.transaction(renderEntries, errorCB);
	
	//Callback Message
	alert("db success!...");
}

