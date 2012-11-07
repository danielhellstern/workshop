// Query the database and select all rows
//
function renderEntries(tx) { 
	
	var db = window.openDatabase("Terminkalender", "1.0", "Terminkalender",
			1000000);
	
	//tx.executeSql('DROP TABLE IF EXISTS Termine');
	
	tx.executeSql('SELECT * FROM Termine', [], querySuccess, errorCB);

}




// Transaction success callback    
//    
function querySuccess(tx, result) {
	$('#Terminliste').empty();
	$.each(result.rows, function(index) {
		var row = result.rows.item(index);
		$('#Terminliste').append(
				'<li ><a href="#" ><h3 class="ui-li-heading" >' + row['Termin']
						+ '</h3><p class="ui-li-desc">Datum: ' + row['Datum']
						+ '</p></a></li>');
	});

	$('#Terminliste').listview();
	
	
	//Callback Message
	alert("render entries...");
}