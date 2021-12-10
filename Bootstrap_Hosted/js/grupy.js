function createGroup(){
	var newGroup = document.getElementById("nazwaGrupy").value;
	const xhr = new XMLHttpRequest();
	xhr.open('POST','http://46.41.141.26:8080//groups?name='+newGroup);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		var groups = [];
		var names = [];
		try
		{
			groups = localStorage.getItem("groupsCodes").split(",");
			names = localStorage.getItem("groupsNames").split(",");
		}
		catch
		{
		groups.shift();
		names.shift();
		}
		groups.push(xhr.response.code);
		names.push(xhr.response.name);
		localStorage.setItem("groupsCodes", groups);
		localStorage.setItem("groupsNames", names);
		var tempstring= xhr.response.code+","+xhr.response.name;
		setActive(tempstring);
		refresh();
	}
	xhr.send();
}

function addGroup(){
	var newGroup = document.getElementById("kodGrupy").value.trim();
	const xhr = new XMLHttpRequest();
	xhr.open('GET','http://46.41.141.26:8080//groups?code='+newGroup);
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = () =>{
		try{
		var groups = [];
		var names = [];
		try
		{
		groups = localStorage.getItem("groupsCodes").split(",");
		names = localStorage.getItem("groupsNames").split(",");
		}
		catch
		{
		groups.shift();
		names.shift();
		}
		groups.push(xhr.response.code);
		names.push(xhr.response.name);
		localStorage.setItem("groupsCodes", groups);
		localStorage.setItem("groupsNames", names);
		var tempstring= xhr.response.code+","+xhr.response.name;
		setActive(tempstring);
		setGroups();
	}
	catch{
		alert("Błędny kod grupy !!!");
	}
	}
	xhr.send();
}

function displayGroupCreator(){
	var lista="<h3 class='text-center'>Nazwa Nowej Grupy:</h3><input class='text-center form-control' type='text' id='nazwaGrupy'><br><div class='d-flex justify-content-center'><button class='btn btn-primary' onclick='createGroup()'>Utwórz nową grupę</button></div>";
	document.getElementById('content').innerHTML = lista;
}

function displayGroupAdder()
{
	var lista="<h3 class='text-center'>Kod istniejącej grupy:</h3><input class='text-center form-control' type='text' id='kodGrupy'><br><div class='d-flex justify-content-center'><button class='btn btn-primary' onclick='addGroup()'>Dołącz do grupy</button></div>";
	document.getElementById('content').innerHTML = lista;
}

function removeGroup(i)
{
	var groups = [];
	var names = [];
	try
	{
		groups = localStorage.getItem("groupsCodes").split(",");
		names = localStorage.getItem("groupsNames").split(",");
		if(groups[0].length==0){
			groups.shift();
			names.shift();
		}
	}
	catch
	{
			
	}
	var grupa = names[i];
	var kod = groups[i];
	groups.splice(i,1);
	names.splice(i,1);
	localStorage.setItem("groupsCodes", groups);
	localStorage.setItem("groupsNames", names);
	//console.log(localStorage.getItem("ActiveGroupCode"));
	if(kod==localStorage.getItem("ActiveGroupCode"))
	{
		localStorage.removeItem("ActiveGroupCode");
		localStorage.removeItem("ActiveGroupName");
	}
	setGroups();
}

function setActive(code){
	//console.log(code);
	tab=code.split(",");
	localStorage.setItem("ActiveGroupCode", tab[0]);
	localStorage.setItem("ActiveGroupName", tab[1]);
	setGroups();
}

function showQR(code){
	//console.log(code);
	var qr;
	document.getElementById('content').innerHTML = '<div class="d-flex justify-content-center"><h1>Kod Grupy: '+code+'</h1></div><div class="d-flex justify-content-center"><canvas id="qr-code"></canvas></div><div class="d-flex justify-content-center"><button class="btn btn-primary float-right" onclick="refresh()">Wróć</button></div>';
	(function() {
                    qr = new QRious({
                    element: document.getElementById('qr-code'),
                    size: 200,
                    value: code
                });
            })();
                var qrtext = code;
                qr.set({
                    foreground: 'black',
                    size: 200,
                    value: qrtext
                });
}

function refresh(){
        window.location.reload("Refresh")
      }

function setGroups()
{
	var lista="<h3 class='text-center'>Twoje grupy:</h3><table class='table table-striped table-bordered' id='tabelaGrup'><tr><th>Kod</th><th>Nazwa</th></tr>";
	var groups = [];
	var names = [];
	try
	{
		groups = localStorage.getItem("groupsCodes").split(",");
		names = localStorage.getItem("groupsNames").split(",");
		if(groups[0].length==0){
			groups.shift();
			names.shift();
		}
	}
	catch
	{
	}
	for(var i = 0; i < groups.length ;i++)
	{
		if(localStorage.getItem("ActiveGroupCode")==groups[i]){
		lista+="<tr class='text-primary'><td>"+groups[i]+"</td><td>"+names[i]+"<br><button class='btn btn-primary float-right' onclick='showQR(`"+groups[i]+"`)'>QR</button><button class='btn btn-primary float-right' onclick='removeGroup("+i+")'>Opuść</button></td></tr>"
		}
		else{
		lista+="<tr><td>"+groups[i]+"</td><td>"+names[i]+"<button class='btn btn-primary float-right' onclick='showQR(`"+groups[i]+"`)'>QR</button><button class='btn btn-primary float-right' onclick='removeGroup("+i+")'>Opuść</button><button class='btn btn-primary float-right' onclick='setActive(`"+groups[i]+","+names[i]+"`)'>Wybierz</button></td></tr>"
		}
	}
	lista+="</table>";
	lista+="<div class='d-flex justify-content-center'><button class='btn btn-primary' onclick='displayGroupCreator()'>Utwórz nową grupę</button>&nbsp;<button class='btn btn-primary' onclick='displayGroupAdder()'>Dołącz do grupy</button></div>";
	document.getElementById("content").innerHTML = lista;
}
setGroups();