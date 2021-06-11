function trybZakupowy() {
  
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://127.0.0.1:8080/shopping-list/all');
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista="<table class='tabelaZakupow'><tr><td>Nazwa Produktu</td><td>Kategoria Produktu</td><td>Miara</td><td>Ilość</td><td>Ile kupujesz</td><td>Potwierdź zakup</td></tr>";
		var kategoria="";
		for(var i=0;i<xhr.response.length;i++)
		{
			if (kategoria!=xhr.response[i].product.categoryShopping.name)
			{
				kategoria=xhr.response[i].product.categoryShopping.name;
				lista+="</table><h2>"+kategoria+"</h2><table class='tabelaZakupow'>"
				
			}
			lista+="<tr><td>"+xhr.response[i].product.productName+"</td><td>"+xhr.response[i].product.categoryProduct.name+"</td><td>"+xhr.response[i].product.measure.name+"</td><td>"+xhr.response[i].product.quantity+"</td><td><input type='number' id='"+xhr.response[i].id+"' value='"+xhr.response[i].quantityToBuy+"'></td><td><button onclick=buy('"+xhr.response[i].id+"')>Kup</button></td></tr>";
		}
		lista+="</table>";
		document.getElementById("content").innerHTML = lista;
		
	}
	xhr.send();
}

function buy(id){
	console.log(id);
	quantity = document.getElementById(id).value;
	console.log(quantity);
	const xhr = new XMLHttpRequest();
	xhr.open('POST','http://127.0.0.1:8080/shopping-list/buy/'+id+"?quantity="+quantity);
	xhr.responseType = 'json';
	xhr.onload = () =>{
	trybZakupowy();
	}
	xhr.send();

}

trybZakupowy();