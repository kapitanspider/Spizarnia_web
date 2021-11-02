function getProducts() {
  
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080//products/all-sorted-category-product');
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista="<table class='table table-striped table-bordered'>";
		var kategoria=""
		for(var i=0;i<xhr.response.length;i++)
		{
			if(kategoria!=xhr.response[i].categoryProduct.name)
			{
				kategoria=xhr.response[i].categoryProduct.name;
				lista+="<tr><th colspan='3'><h2 class='display-4 text-center'>"+kategoria+"</h2></th></tr>"
			}
			lista+="<tr><td>"+xhr.response[i].productName+"</td><td>"+xhr.response[i].quantity+"</td><td><button class='btn btn-primary' onclick=productEditor('"+xhr.response[i].id+"')>&#10132;</button></td></tr>";
		}
		document.getElementById("content").innerHTML = lista;
	}
	xhr.send();
}
function productEditor(id)
{
	document.getElementById("content").innerHTML = "";
	document.getElementById("content").innerHTML += "<h3 class='display-4 text-center' id='nag'>Produkt: </h3>";
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080/products?id='+id);
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista = "";
		lista+=xhr.response.productName;
	document.getElementById("nag").innerHTML += lista;
	document.getElementById("content").innerHTML +="<h4 class='display-4 text-center'>Ilość:</h4><div class='d-flex justify-content-center'><input class='text-center form-control' type='number' value='"+xhr.response.quantity+"' id='"+id+"'></div><br><div class='d-flex justify-content-center'><button class='btn btn-primary' onclick="+'zmienilosc("'+id+'")'+">Zmień ilość</button></div>";
	var listaAtrybutów="<h3 class='display-4 text-center'>Atrybuty:</h3>";
		if (xhr.response.attributeList.length>0){
			listaAtrybutów+="<table class='table table-striped table-bordered text-center' id='tabelaAtrybotow'>"
			for(var i=0;i<xhr.response.attributeList.length;i++)
			{
				listaAtrybutów+="<tr><td>"+xhr.response.attributeList[i].name+"</td></tr>";
			}
			listaAtrybutów+="</table>"
			document.getElementById("content").innerHTML += listaAtrybutów;
		}
		else{
			listaAtrybutów+= "<p class='text-center'>Brak Atrybutów</p>";
			document.getElementById("content").innerHTML += listaAtrybutów;
		}
		document.getElementById("content").innerHTML += "<div class='d-flex justify-content-center'><input class='text-center form-control' type='text' id='nazwaAtrybutu'></div><br><div class='d-flex justify-content-center'><button class='btn btn-primary' onclick="+'dodajAtrybut("'+id+'")'+">Dodaj atrybut</button></div>"
	}
	xhr.send()
	
	
}

function dodajAtrybut(id){
	var newAtt = document.getElementById("nazwaAtrybutu").value
	if (newAtt.length>0){
	const xhr = new XMLHttpRequest();
	xhr.open('PUT','http://46.41.141.26:8080/products/attribute/'+id+"?attributeName="+newAtt);
	xhr.responseType = 'json';
	xhr.onload = () =>{
	productEditor(id);
	}
	xhr.send();
	}
	else{
		alert("Atrybut nie może być pusty");
	}
}

function zmienilosc(id){
	quantity = (document.getElementById(id).value*1)
	const xhr = new XMLHttpRequest();
	xhr.open('PUT','http://46.41.141.26:8080/products/quantity/'+id+"?quantity="+quantity);
	xhr.responseType = 'json';
	xhr.onload = () =>{
	}
	xhr.send();
}

getProducts();

