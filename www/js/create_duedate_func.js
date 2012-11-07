function addEntry() {
	
	// Wait for Cordova to load
	//
	
	document.addEventListener("deviceready", onDeviceReady, false);
	
	
	
	// Cordova is ready    
	//
	function onDeviceReady() {
		var db = window.openDatabase("Terminkalender", "1.0", "Terminkalender",
				1000000);
		db.transaction(populateDB, errorCB, successCB);
	}

	// Populate the database
	//
	function populateDB(tx) {
		// Option, to clear the table
		// tx.executeSql('DROP TABLE IF EXISTS Termine');
		tx
				.executeSql('CREATE TABLE IF NOT EXISTS Termine
						(id INTEGER PRIMARY KEY AUTOINCREMENT, Termin TEXT NOT NULL, Datum TEXT NOT NULL)');


		
		// Insert duedate into table
		//
		tx.executeSql('INSERT INTO Termine(Termin,Datum) VALUES (\"'
				+ String($("#titleLabel").val()) + '\",\"'
				+ String($("#dateLabel").val()) + '\")');
		
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
		db.transaction(queryDB, errorCB);
	}

	// Query the database
	//
	function queryDB(tx) {

		tx.executeSql('SELECT * FROM Termine', [], querySuccess, errorCB);

	}

	
	// Transaction success callback    
	//    
	function querySuccess(tx, result) {
		// Get number of table entries
		//
		var len = result.rows.length;
		
		// Iterate to last modified entry
		//
		var row = result.rows.item(len - 1);
		//Add last modified entry to listview on index.htm
		//Manipulate the DOM with $('#').append
		$('#Terminliste').append(
				'<li ><a href="#" ><h3 class="ui-li-heading" >' + row['Termin']
						+ '</h3><p class="ui-li-desc" >Datum: ' + row['Datum']
						+ '</p></a></li>');
		
		// To display the added entry in the listview container
		//
		$('#Terminliste').listview("refresh");
		
		//Resets the INPUT fields on page edit_page.html,
		//all elements from class text_input
		//
		$('.text_input').val("");
		
		//Callback Message
		alert('create duedate!...');

	}

}