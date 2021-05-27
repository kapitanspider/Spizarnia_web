function trybZakupowy() {
  
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	queryBuilder.setSortBy( ["kategoriaZakupy DESC"] );
	Backendless.Data.of( "Lista_Zakupow" ).find(queryBuilder)
	.then( function( result ) {
		var lista="<table class='tabelaZakupow'><tr><td>Nazwa Produktu</td><td>Kategoria Zakupowa</td><td>Miara</td><td>Ilość</td><td>Ile kupujesz</td><td>Potwierdź zakup</td></tr>";
		var kategoria="";
		for(var i=0;i<result.length;i++)
		{
			if (kategoria!=result[i].kategoriaZakupy)
			{
				kategoria=result[i].kategoriaZakupy;
				lista+="</table><h2>"+kategoria+"</h2><table class='tabelaZakupow'>"
				
			}
			lista+="<tr><td>"+result[i].nazwaProduktu+"</td><td>"+result[i].miara+"</td><td>"+result[i].kategoriaZakupy+"</td><td>"+result[i].ilosc+"</td><td><input type='number' id='"+result[i].objectIdProduktu+"' value='"+result[i].ilosc+"'></td><td><button onclick=buy('"+result[i].objectIdProduktu+"')>Kup</button></td></tr>";
		}
		lista+="</table>";
		document.getElementById("content").innerHTML = lista;
		
	})
	.catch( function( error ) {
	});
	
}

function buy(idProduktu){
	console.log(idProduktu);
	ilosc = (document.getElementById(idProduktu).value*1);
	Backendless.Data.of( "Produkt" ).findById(idProduktu)
	.then( function( result ) {
	 console.log(result.ilosc);
	 result.ilosc += ilosc;
	 console.log(result.ilosc);
	Backendless.Data.of('Produkt').save(result);
	
	var whereClause = " objectIdProduktu = '"+idProduktu+"'";
	Backendless.Data.of( "Lista_Zakupow" ).bulkDelete(whereClause)
	.then( function( objectsDeleted ) {
		trybZakupowy();
  })
  })
}

trybZakupowy();