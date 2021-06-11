function addMiara() {
	var miara = 
	{
		nazwa: document.getElementById("nazwa").value
	}
	const testTableStore = Backendless.Data.of('Miara');
	testTableStore.save(miara)
      .then(function (object) {
		  
      })
	document.getElementById("content").innerHTML += "<h3>"+"Dodano kategorię "+miara.nazwa+"</h3>";
}

function getMiary(){
	var temp = document.getElementById("content").innerHTML;
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	Backendless.Data.of( "Miara" ).find(queryBuilder)
	.then( function( result ) {
		var lista = "<table class='tabelaZakupow'><h2>Istniejące Miary</h2>";
		for(var i=0;i<result.length;i++)
		{

			lista+="<tr><td>"+result[i].nazwa+"</td></tr>";
		}
		lista+="</table>";
	document.getElementById("content").innerHTML = lista ;
	document.getElementById("content").innerHTML += temp;
	})
	.catch( function( error ) {
    // an error has occurred, the error code can be retrieved with fault.statusCode
	});
}
getMiary();