function getProducts() {
  
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	queryBuilder.setSortBy( ["created"] );
	Backendless.Data.of( "Produkt" ).find(queryBuilder)
	.then( function( result ) {
		var lista="";
		for(var i=0;i<result.length;i++)
		{
			lista+="<div class='product' onclick="+'productEditor("'+result[i].objectId+'")'+">"+result[i].nazwaProduktu+"</div>";
		}
		// console.log(result.length);
		document.getElementById("content").innerHTML = lista;
		return(result)
	})
	.catch( function( error ) {
	});
}
function productEditor(id)
{
	// console.log(id);
	var lista="";
	document.getElementById("content").innerHTML = "";
	Backendless.Data.of( "Produkt" ).findById(id)
	.then( function( result ) {
	// console.log(result)
	lista+=result.nazwaProduktu
	document.getElementById("nag").innerHTML += lista;
	})
	document.getElementById("content").innerHTML += "<h3 id='nag'>Dodaj atrybut do produktu : </h3><input type='text' id='nazwaAtrybutu'><button onclick="+'dodajAtrybut("'+id+'")'+">Dodaj produkt</button>";
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	queryBuilder.setSortBy( ["created"] );
	var whereClause = 'objectIdProdukt = '+"'"+id+"'";
	queryBuilder.setWhereClause(whereClause);
	Backendless.Data.of( "Atrybuty" ).find(queryBuilder)
	.then( function( result ) {
		// console.log(result.length);
		var lista="";
		lista+="<table id='tabelaAtrybotow'>"
		for(var i=0;i<result.length;i++)
		{
			lista+="<tr><td>"+result[i].nazwa+"</td></tr>";
		}
		lista+="</table>"
		document.getElementById("content").innerHTML += lista
	})
	
}

function dodajAtrybut(id){
	var atrybut = {
		objectIdProdukt : id,
		nazwa: document.getElementById("nazwaAtrybutu").value,
	}
	// console.log(atrybut);
	const tableAtrybuty = Backendless.Data.of('Atrybuty');
	tableAtrybuty.save(atrybut)
      .then(function (object) {
		  	productEditor(id)
      })
}

getProducts();

