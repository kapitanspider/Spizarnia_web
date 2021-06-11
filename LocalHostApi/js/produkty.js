function getProducts() {
  
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://127.0.0.1:8080/products/all');
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista="";
		var kategoria=""
		for(var i=0;i<xhr.response.length;i++)
		{
			if(kategoria!=xhr.response[i].categoryProduct.name)
			{
				kategoria=xhr.response[i].categoryProduct.name;
				lista+="</table><h2>"+kategoria+"</h2><table class='tabelaZakupow'>"
			}
			lista+="<tr><td>"+xhr.response[i].productName+"</td><td>"+xhr.response[i].quantity+"</td><td><button onclick=productEditor('"+xhr.response[i].id+"')>Edytuj</button></td></tr>";
		}
		document.getElementById("content").innerHTML = lista;
	}
	xhr.send();
}
function productEditor(id)
{
	document.getElementById("content").innerHTML = "";
	document.getElementById("content").innerHTML += "<h3 id='nag'>Produkt: </h3>";
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://127.0.0.1:8080/products?id='+id);
	xhr.responseType = 'json';
	xhr.onload = () =>{
		var lista = "";
		lista+=xhr.response.productName;
	document.getElementById("nag").innerHTML += lista;
	document.getElementById("content").innerHTML +="<h4>Ilość</h4><input type='number'value='"+xhr.response.quantity+"' id='"+id+"'><button onclick="+'zmienilosc("'+id+'")'+">Zmień ilość</button>";
	var listaAtrybutów="<h3>Atrybuty:</h3>";
		if (xhr.response.attributeList.length>0){
			listaAtrybutów+="<table id='tabelaAtrybotow'>"
			for(var i=0;i<xhr.response.attributeList.length;i++)
			{
				listaAtrybutów+="<tr><td>"+xhr.response.attributeList[i].name+"</td></tr>";
			}
			listaAtrybutów+="</table>"
			document.getElementById("content").innerHTML += listaAtrybutów
		}
		document.getElementById("content").innerHTML += "<input type='text' id='nazwaAtrybutu'><button onclick="+'dodajAtrybut("'+id+'")'+">Dodaj atrybut</button>"
	}
	xhr.send()
	
	
}

function dodajAtrybut(id){
	var newAtt = document.getElementById("nazwaAtrybutu").value
	if (newAtt.length>0){
	const xhr = new XMLHttpRequest();
	xhr.open('PUT','http://127.0.0.1:8080/products/attribute/'+id+"?attributeName="+newAtt);
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
	xhr.open('PUT','http://127.0.0.1:8080/products/quantity/'+id+"?quantity="+quantity);
	xhr.responseType = 'json';
	xhr.onload = () =>{
	}
	xhr.send();
	
}

getProducts();

