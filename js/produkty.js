function getProducts() {
  
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	queryBuilder.setSortBy( ["kategorieProdukty DESC"] );
	Backendless.Data.of( "Produkt" ).find(queryBuilder)
	.then( function( result ) {
		var lista="";
		for(var i=0;i<result.length;i++)
		{
			lista+="<div class='product' onclick="+'productEditor("'+result[i].objectId+'")'+">Nazwa: "+result[i].nazwaProduktu+"</br>"+" Ilość: "+result[i].ilosc+"</br>Kategoria: "+result[i].kategorieProdukty+"</div>";
		}
		document.getElementById("content").innerHTML = lista;
		return(result)
	})
	.catch( function( error ) {
	});
}
function productEditor(id)
{
	console.log(id);
	var lista="";
	document.getElementById("content").innerHTML = "";
	document.getElementById("content").innerHTML += "<h3 id='nag'>Produkt: </h3>";
	Backendless.Data.of( "Produkt" ).findById(id)
	.then( function( result ) {
	// console.log(result)
	lista+=result.nazwaProduktu;
	document.getElementById("nag").innerHTML += lista;
	document.getElementById("content").innerHTML +="<h4>Ilość</h4><input type='number'value='"+result.ilosc+"' id='"+id+"'><button onclick="+'zmienilosc("'+id+'")'+">Zmień ilość</button>";
	})
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	queryBuilder.setSortBy( ["created"] );
	var whereClause = 'objectIdProdukt = '+"'"+id+"'";
	queryBuilder.setWhereClause(whereClause);
	Backendless.Data.of( "Atrybuty" ).find(queryBuilder)
	.then( function( result ) {
		// console.log(result.length);
		var lista="<h3>Atrybuty:</h3>";
		if (result.length>0){
			lista+="<table id='tabelaAtrybotow'>"
			for(var i=0;i<result.length;i++)
			{
				lista+="<tr><td>"+result[i].nazwa+"</td></tr>";
			}
			lista+="</table>"
			document.getElementById("content").innerHTML += lista
		}
		document.getElementById("content").innerHTML += "<input type='text' id='nazwaAtrybutu'><button onclick="+'dodajAtrybut("'+id+'")'+">Dodaj atrybut</button>"
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

function zmienilosc(id){
	Backendless.Data.of( "Produkt" ).findById(id)
	.then( function( result ) {
	result.ilosc=(document.getElementById(id).value*1);
	console.log(result);
	Backendless.Data.of('Produkt').save(result);
	})
	
}

getProducts();

