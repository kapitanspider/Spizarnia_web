function getProducts() {
  
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setPageSize(100);
	queryBuilder.setSortBy( ["created"] );
	Backendless.Data.of( "Produkt" ).find(queryBuilder)
	.then( function( result ) {
		var lista="";
		for(var i=0;i<result.length;i++)
		{
			lista+="<div class='product' onclick="+'editProduct("'+result[i].objectId+'")'+"><table><tr><td>"+result[i].nazwaProduktu+"</td><td>"+result[i].ilosc+"</td></tr></table></div>";
		}
		console.log(result.length);
		document.getElementById("content").innerHTML = lista;
		return(result)
	})
	.catch( function( error ) {
	});
}
getProducts();

function editProduct(id)
{
	console.log(id);
}

