function addProduct() {
	var product = 
	{
		nazwaProduktu: document.getElementById("nazwaProduktu").value,
		ilosc: (document.getElementById("ilosc").value * 1),
		kategorieProdukty: document.getElementById("kategorieProdukty").value,
		kategorieZakupy: document.getElementById("kategorieZakupy").value,
		miara: document.getElementById("miara").value,
		autoZakup: document.getElementById("autoZakup").checked,
		progAutoZakupu: (document.getElementById("progAutoZakupu").value * 1)
	}
	const testTableStore = Backendless.Data.of('Produkt');
	testTableStore.save(product)
      .then(function (object) {
      })
	document.getElementById("content").innerHTML += "<h3>"+"Dodano produkt "+product.nazwaProduktu+"</h3>";
}

function fetchOptions(){
	console.log("XD")
	var whereClause = "lista = 'produkty'";
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	queryBuilder.setSortBy( ["created"] );
	queryBuilder.setWhereClause(whereClause);
	
	Backendless.Data.of( "Kategorie" ).find(queryBuilder)
	.then( function( result ) {
		var lista="";
		for(var i=0;i<result.length;i++)
		{
			//console.log(result[i].foo);
			lista+="<option value="+result[i].nazwa+">"+result[i].nazwa+"</option>";
		}
		console.log(result.length);
		document.getElementById("kategorieProdukty").innerHTML = lista;
		return(result)
	})
	.catch( function( error ) {
    // an error has occurred, the error code can be retrieved with fault.statusCode
	});
	
	var whereClause = "lista = 'zakupy'";
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	queryBuilder.setSortBy( ["created"] );
	queryBuilder.setWhereClause(whereClause);
	Backendless.Data.of( "Kategorie" ).find(queryBuilder)
	.then( function( result ) {
		var lista="";
		for(var i=0;i<result.length;i++)
		{
			//console.log(result[i].foo);
			lista+="<option value="+result[i].nazwa+">"+result[i].nazwa+"</option>";
		}
		console.log(result.length);
		document.getElementById("kategorieZakupy").innerHTML = lista;
		return(result)
	})
	.catch( function( error ) {
    // an error has occurred, the error code can be retrieved with fault.statusCode
	});
	
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	queryBuilder.setSortBy( ["created"] );
	Backendless.Data.of( "Miara" ).find(queryBuilder)
	.then( function( result ) {
		var lista="";
		for(var i=0;i<result.length;i++)
		{
			//console.log(result[i].foo);
			lista+="<option value="+result[i].nazwa+">"+result[i].nazwa+"</option>";
		}
		console.log(result.length);
		document.getElementById("miara").innerHTML = lista;
		return(result)
	})
	.catch( function( error ) {
    // an error has occurred, the error code can be retrieved with fault.statusCode
	});
}
fetchOptions();