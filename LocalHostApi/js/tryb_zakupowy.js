function trybZakupowy() {
  
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://localhost:8080/shopping-list/all-sorted-category-shopping?code='+localStorage.getItem("ActiveGroupCode"));
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista="<table class='table table-striped table-bordered'><thead><tr><th scope='col'>Nazwa Produktu</th><th scope='col'>Kategoria Produktu</th><th scope='col'>Miara</th><th scope='col'>Posiadana Ilość</th><th scope='col'>Ile kupujesz</th><th scope='col'>Potwierdź zakup</th></tr></thead>";
		var kategoria="";
		for(var i=0;i<xhr.response.length;i++)
		{
			if (kategoria!=xhr.response[i].product.categoryShopping.name)
			{
				kategoria=xhr.response[i].product.categoryShopping.name;
				lista+="<tr><th colspan='6'><h2 class='display-4 text-center'>"+kategoria+"</h2></th></tr>"
				
			}
			lista+="<tr><td>"+xhr.response[i].product.productName+"</td><td>"+xhr.response[i].product.categoryProduct.name+"</td><td>"+xhr.response[i].product.measure.name+"</td><td>"+xhr.response[i].product.quantity+"</td><td><input class='text-center form-control' type='number' id='"+xhr.response[i].id+"' value='"+xhr.response[i].quantityToBuy+"'></td><td><button class='btn btn-primary' onclick=buy('"+xhr.response[i].id+"')>Kup</button></td></tr>";
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
	xhr.open('POST','http://localhost:8080/shopping-list/buy/'+id+"?quantity="+quantity);
	xhr.responseType = 'json';
	xhr.onload = () =>{
	trybZakupowy();
	}
	xhr.send();

}

trybZakupowy();