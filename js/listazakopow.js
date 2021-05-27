function getlista() {
  
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	queryBuilder.setSortBy( ["kategoriaZakupy DESC"] );
	Backendless.Data.of( "Lista_Zakupow" ).find(queryBuilder)
	.then( function( result ) {
		var lista="<table class='tabelaZakupow'><tr><td>Nazwa Produktu</td><td>Kategoria Zakupowa</td><td>Miara</td><td>Ilość</td></tr>";
		var kategoria="";
		for(var i=0;i<result.length;i++)
		{
			if (kategoria!=result[i].kategoriaZakupy)
			{
				kategoria=result[i].kategoriaZakupy;
				lista+="</table><h2>"+kategoria+"</h2><table class='tabelaZakupow'>"
				
			}
			lista+="<tr><td>"+result[i].nazwaProduktu+"</td><td>"+result[i].kategoriaZakupy+"</td><td>"+result[i].miara+"</td><td>"+result[i].ilosc+"</td></tr>";
		}
		lista+="</table>";
		lista+="<button onclick='addToList()'>Dodaj produkt do listy zakupów</button>"
		document.getElementById("content").innerHTML = lista;
		
	})
	.catch( function( error ) {
	});
	
}
function autoadd(){
	var whereClause = "autoZakup = 1 and nazwaProduktu not in(Lista_Zakupow[].nazwaProduktu) and ilosc < progAutoZakupu";
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	queryBuilder.setSortBy( ["created"] );
	queryBuilder.setWhereClause(whereClause);
	Backendless.Data.of( "Produkt" ).find(queryBuilder)
	.then( function( result ) {
	for(var i=0;i<result.length;i++)
	{
		var obiekt = {
			miara : result[i].miara,
			nazwaProduktu: result[i].nazwaProduktu,
			kategoriaZakupy: result[i].kategorieZakupy,
			ilosc: result[i].progAutoZakupu - result[i].ilosc,
			objectIdProduktu: result[i].objectId
		}
		console.log(obiekt)
	const tableAtrybuty = Backendless.Data.of('Lista_Zakupow');
	tableAtrybuty.save(obiekt)
      .then(function (object) {
    })
	}
	getlista();
	})
	
}

function addToList(){
	lista="";
	lista+="<h3>Produkt</h3>"
	lista+="<select  type='text' id='produkt'></select>"
	lista+="<h3>Kategorie Zakupy</h3>"
	lista+="<select  type='text' id='kategorieZakupy'></select>"
	lista+="<h3>Miara</h3>"
	lista+="<select  type='text' id='miara'></select>"
	lista+="<h2>Ilość</h2>"
	lista+="<input type='number' id='ilosc'>"
	lista+="<button onclick='addToListDB()'>Dodaj</button>"
	document.getElementById("content").innerHTML = lista;
	
	
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
			//// console.log(result[i].foo);
			lista+="<option value="+result[i].nazwa+">"+result[i].nazwa+"</option>";
		}
		// console.log(result.length);
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
			//// console.log(result[i].foo);
			lista+="<option value="+result[i].nazwa+">"+result[i].nazwa+"</option>";
		}
		// console.log(result.length);
		document.getElementById("miara").innerHTML = lista;
		return(result)
	})
	.catch( function( error ) {
    // an error has occurred, the error code can be retrieved with fault.statusCode
	});
	
	
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	queryBuilder.setSortBy( ["created"] );
	Backendless.Data.of( "Produkt" ).find(queryBuilder)
	.then( function( result ) {
		var lista="";
		for(var i=0;i<result.length;i++)
		{
			//// console.log(result[i].foo);
			lista+="<option value="+result[i].nazwaProduktu+">"+result[i].nazwaProduktu+"</option>";
		}
		// console.log(result.length);
		document.getElementById("produkt").innerHTML = lista;
		return(result)
	})
	.catch( function( error ) {
    // an error has occurred, the error code can be retrieved with fault.statusCode
	});
}

function addToListDB(){
	var obiekt = {
		miara : document.getElementById("miara").value,
		nazwaProduktu: document.getElementById("produkt").value,
		kategoriaZakupy: document.getElementById("kategorieZakupy").value,
		ilosc: (document.getElementById("ilosc").value *1),
		objectIdProduktu: null
	}
	var whereClause = "nazwaProduktu = '"+obiekt.nazwaProduktu+"'";
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	queryBuilder.setSortBy( ["created"] );
	queryBuilder.setWhereClause(whereClause);
	Backendless.Data.of( "Produkt" ).find(queryBuilder)
	.then( function( result ) {
		obiekt.objectIdProduktu=result[0].objectId;
		const tableAtrybuty = Backendless.Data.of('Lista_Zakupow');
		tableAtrybuty.save(obiekt)
		.then(function (object) {
			getlista()
		})
	})
	
	
	
}
autoadd()