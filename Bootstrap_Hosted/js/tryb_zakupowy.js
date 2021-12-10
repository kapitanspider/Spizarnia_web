function trybZakupowy() {
  
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/shopping-list/all-sorted-category-shopping?code='+localStorage.getItem("ActiveGroupCode"));
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista="<table class='table table-striped table-bordered'><thead><tr><th scope='col'>Produkt</th><th>Atrybuty Produktu</th><th scope='col'>Kategoria Produktu</th><th scope='col'>Miara</th><th scope='col'>Posiadana Ilość</th><th scope='col'>Ile kupujesz</th><th scope='col'>Potwierdź zakup</th></tr></thead>";
		var kategoria="";
		console.log(xhr.response);
		for(var i=0;i<xhr.response.length;i++)
		{
			if (kategoria!=xhr.response[i].product.categoryShopping.name)
			{
				kategoria=xhr.response[i].product.categoryShopping.name;
				lista+="<tr><th colspan='7'><h2 class='text-center'>"+kategoria+"</h2></th></tr>"
				
			}
			lista+="<tr><td>"+xhr.response[i].product.productName+"</td><td><button class='btn btn-primary' onclick=showAttribs('"+xhr.response[i].product.id+"')>Atrybuty</button> <button class='btn btn-primary' onclick=barCodes('"+xhr.response[i].product.id+"')>Kody kreskowe</button></td><td>"+xhr.response[i].product.categoryProduct.name+"</td><td>"+xhr.response[i].product.measure.name+"</td><td>"+xhr.response[i].product.quantity+"</td><td><input class='text-center form-control' type='number' id='"+xhr.response[i].id+"' value='"+xhr.response[i].quantityToBuy+"'></td><td><button class='btn btn-primary' onclick=buy('"+xhr.response[i].id+"')>Kup</button></td></tr>";
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
	xhr.open('POST','http://46.41.141.26:8080/shopping-list/buy/'+id+"?quantity="+quantity);
	xhr.responseType = 'json';
	xhr.onload = () =>{
	trybZakupowy();
	}
	xhr.send();

}

function showAttribs(id)
{
	document.getElementById("content").innerHTML = "<h3 class='text-center' id='nag'>Produkt: </h3>"
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/products?id='+id);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		document.getElementById("nag").innerHTML += xhr.response.productName;
		var listaAtrybutów="<h3 class='text-center'>Atrybuty:</h3>";
		if (xhr.response.attributeList.length>0){
			listaAtrybutów+="<table class='table table-striped table-bordered text-center' id='tabelaAtrybotow'>"
			for(var i=0;i<xhr.response.attributeList.length;i++)
			{
				listaAtrybutów+="<tr><td>"+xhr.response.attributeList[i].name+"<button class='btn btn-primary float-right' onclick=removeAtt('"+xhr.response.attributeList[i].id+','+id+"')>usuń</button></td></tr>";
			}
			listaAtrybutów+="</table>"
			document.getElementById("content").innerHTML += listaAtrybutów;
		}
		else{
			listaAtrybutów+= "<p class='text-center'>Brak Atrybutów</p>";
			document.getElementById("content").innerHTML += listaAtrybutów;
		}
		document.getElementById("content").innerHTML += "<div class='d-flex justify-content-center'><input class='text-center form-control' type='text' id='nazwaAtrybutu'></div><br><div class='d-flex justify-content-center'><button class='btn btn-primary' onclick="+'dodajAtrybut("'+id+'")'+">Dodaj atrybut</button></div></br><div class='d-flex justify-content-center'><a href='tryb_zakupowy.html' class='btn btn-primary'>Wróć</a></div>";
	}
	xhr.send()
}
function dodajAtrybut(id){
	var newAtt = document.getElementById("nazwaAtrybutu").value
	if (newAtt.length>0){
	const xhr = new XMLHttpRequest();
	xhr.open('PUT','http://46.41.141.26:8080/products/attribute/'+id+"?attributeName="+newAtt);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
	showAttribs(id);
	}
	xhr.send();
	}
	else{
		alert("Atrybut nie może być pusty");
	}
}

function removeAtt(parse)
{
	var tab = parse.split(',')
	var product_id=tab[1];
	var id=tab[0];
	const xhr = new XMLHttpRequest();
	xhr.open('DELETE','http://46.41.141.26:8080/products/attribute/'+product_id+"?attributeId="+id);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		//console.log(xhr.response);
		 showAttribs(product_id);
	}
	xhr.send();
}

function barCodes(id){
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/products?id='+id);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		console.log(xhr.response);
		var lista=' ';
		var today = new Date() 
		if(xhr.response.barcodeList.length>0)
		{
			lista+="<h3 class='text-center'>Kody kreskowe:</h3><table class='table table-striped table-bordered text-center' id='listaBarCodow'>";
			for(i=0;i<xhr.response.barcodeList.length;i++)
			{
				
				lista+="<tr><td class='text-danger'>"+xhr.response.barcodeList[i].barcode+"</td><td>"+xhr.response.barcodeList[i].note+"</td>";
				lista+="<td><button class='btn btn-primary float-right' onclick=removeBarcode('"+id+','+xhr.response.barcodeList[i].id+"')>usuń</button></td></tr>"
			}
			lista+="</table>";
		}
		lista+="</br><div class='d-flex justify-content-center'><a href='tryb_zakupowy.html' class='btn btn-primary'>Wróć</a></div>";
		document.getElementById("content").innerHTML = lista;
	}
	xhr.send()
}

function removeBarcode(string){
	string=string.split(",");
	var id=string[0];
	var barcode=string[1];
	const xhr = new XMLHttpRequest();
	xhr.open('DELETE','http://46.41.141.26:8080/products/barcode/'+id+'?barcodeId='+barcode);
		xhr.responseType = 'json';
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = () =>{
			barCodes(id);
		};
	//console.log(JSON.stringify(product));
	xhr.send();
}
trybZakupowy();