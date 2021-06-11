function addMiara() {
	var miara = 
	{
		name: document.getElementById("nazwa").value
	}
	if (miara.name.length>0)
	{
	const xhr = new XMLHttpRequest();
	xhr.open('POST','http://127.0.0.1:8080/measures');
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.onload = () =>{
	getMiary();
	};
	xhr.send(JSON.stringify(miara));
	}
	else{
		alert("Nazwa nie może być pusta");
	}
}

function getMiary(){
	var temp = document.getElementById("inputs").innerHTML;
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://127.0.0.1:8080/measures/all');
	xhr.responseType = 'json';
	xhr.onload = () =>{
	var lista = "<h2>Istniejące Miary</h2><table class='tabelaZakupow'>";
	for(var i=0;i<xhr.response.length;i++)
		{

			lista+="<tr><td>"+xhr.response[i].name+"</td></tr>";
		}
		lista+="</table>";
	lista+="<div id='inputs'></div>"
	document.getElementById("content").innerHTML = lista ;
	document.getElementById("inputs").innerHTML += temp;
	};
	xhr.send();
};
getMiary();