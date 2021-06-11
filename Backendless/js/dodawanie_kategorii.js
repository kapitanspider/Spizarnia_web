function addCategory() {
	var category = 
	{
		lista: document.getElementById("lista").value,
		nazwa: document.getElementById("nazwa").value
	}
	const testTableStore = Backendless.Data.of('Kategorie');
	testTableStore.save(category)
      .then(function (object) {
		  
      })
	document.getElementById("content").innerHTML += "<h3>"+"Dodano kategorię "+category.nazwa+"</h3>";
}

function getCategories(){
	var temp = document.getElementById("content").innerHTML;
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	queryBuilder.setSortBy( ["lista"] );
	Backendless.Data.of( "Kategorie" ).find(queryBuilder)
	.then( function( result ) {
		var lista = "";
		var typ = "";
		for(var i=0;i<result.length;i++)
		{
			if(typ!=result[i].lista)
			{
				typ=result[i].lista;
				if (typ=="produkty")
				{
					lista+="<h2>Kategorie dla produktów</h2><table class='tabelaZakupow'>";
				}
				if (typ=="zakupy")
				{
					lista+="</table><h2>Kategorie dla zakupów</h2><table class='tabelaZakupow'>";
				}
			}
			lista+="<tr><td>"+result[i].nazwa+"</td></tr>";
		}
		console.log(lista);
	document.getElementById("content").innerHTML = lista ;
	document.getElementById("content").innerHTML += temp;
	})
	.catch( function( error ) {
    // an error has occurred, the error code can be retrieved with fault.statusCode
	});
}
getCategories();