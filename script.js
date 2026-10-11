console.log("jede to");

function buildPathString(length){
	prot = "";
	reservoir = [];
	for(i=0; i<length; i++){
		pick = 0; //inicializacia
		while(1){
			pick = Math.floor(Math.random() * length); //0 az length-1
			if(!reservoir.includes(pick)){
				reservoir.push(pick);
				break;
			}
		}
		prot+= pick.toString() + "x";
	}
	return prot;
}
function reloadVrstvy(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			evalReloadVrstvy(this);
		}
	};
	xmlhttp.open("GET", "levels.xml", true);
	xmlhttp.send();
}
function evalReloadVrstvy(xml) {
	var i;
	var xmlDoc = xml.responseXML;
	var realLevelsCount = xmlDoc.getElementsByTagName("level").length;
	
	if(Cookies.get("LASTSIZE") != realLevelsCount){
		Cookies.set("LASTSIZE", realLevelsCount);
		Cookies.set("TREK", buildPathString(realLevelsCount));
		Cookies.set("NOWTH", "0");
	}
	document.getElementById("bigtctl").innerHTML = "DH - Lvl " + Cookies.get("NOWTH") + " (0 az " + (realLevelsCount-1).toString() + ") na " + Cookies.get("TREK");
	console.log("RLC=" + Cookies.get("LASTSIZE") + " TREK=" + Cookies.get("TREK") + " NOWTH=" + Cookies.get("NOWTH"));

	var level = parseInt(Cookies.get("TREK").split("x")[parseInt(Cookies.get("NOWTH"))]);
	console.log(level.toString() + " is now used.");
	
	var valsWA = [];
	var loadedVals = xmlDoc.getElementsByTagName("level")[level].getElementsByTagName("value");
	var table="<table class=\"center\"><tr>";
	for (i = 0; i < 16; i++) {
		n = i.toString(2);
		n = "0000".substr(n.length) + n;
		table += "<td><img class=\"sneakCls\" src=\"obr/";
		if(i < loadedVals.length){
			table += loadedVals[i].childNodes[0].nodeValue;
			valsWA.push(loadedVals[i].childNodes[0].nodeValue);
		}
		else{
			table += "free";
		}
		table += ".png\"><br>" + "<div class=\"tctl\">" + n + "</div>" + "</td>";
	}
	table += "</tr></table>"
	document.getElementById("vrstvaHore").innerHTML = table;
	
	levelUp = 1;
	var table="<table class=\"center\"><tr>";
	for (i = 0; i < 16; i++) {
		n = i.toString(2);
		n = "0000".substr(n.length) + n;
		
		globcol = 0;
		
		for(j = 0 ; j < 7; j++){
			let scope = {
				a: i&8,
				b: i&4,
				c: i&2,
				d: i&1,
				A: i&8,
				B: i&4,
				C: i&2,
				D: i&1
			}
			enabler = math.evaluate(document.getElementById(String.fromCharCode(97 + j)).value.replace(/!/g, "not "),scope);
			globcol += !!enabler * parseInt(Math.pow(2, j));
		}
		if(i < loadedVals.length){
			if(valsWA[i] != globcol.toString()){
				levelUp = 0;
			}
		}
		table += "<td><img class=\"sneakCls\" src=\"obr/" +	globcol + ".png\"><br>" + "<div class=\"tctl\">" + n + "</div>" + "</td>";
	}
	table += "</tr></table>";
	document.getElementById("vrstvaDole").innerHTML = table;
	
	if(levelUp == 1){
		tmp = parseInt(Cookies.get("NOWTH"));
		tmp += 1; 
		if(tmp >= realLevelsCount){
			Cookies.remove("LASTSIZE");
		}
		else{
			Cookies.set("NOWTH", tmp.toString());
		}
		reloadVrstvy();
	}
}
function howPressArea(id){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			evalHowPressArea(id, this);
		}
	};
	xmlhttp.open("GET", "levels.xml", true);
	xmlhttp.send();
}
function evalHowPressArea(id, xml){
	var xmlDoc = xml.responseXML;
	
	var level = parseInt(Cookies.get("TREK").split("x")[parseInt(Cookies.get("NOWTH"))]);
	
	var targetVals = xmlDoc.getElementsByTagName("level")[level].getElementsByTagName("fillin");
	
	var ourTarget = targetVals[id.charCodeAt(0) - 97].childNodes[0].nodeValue;
	
	document.getElementById(id).value = ourTarget;
}
function lbulbLogic(){
	$( function() {
		$( "#lbulb" ).draggable();
		$( "#a" ).droppable({
			drop: function(event,ui){
				howPressArea("a");
				reloadVrstvy();
			}
		} );
		$( "#b" ).droppable({
			drop: function(event,ui){
				howPressArea("b");
				reloadVrstvy();
			}
		} );
		$( "#c" ).droppable({
			drop: function(event,ui){
				howPressArea("c");
				reloadVrstvy();
			}
		} );
		$( "#d" ).droppable({
			drop: function(event,ui){
				howPressArea("d");
				reloadVrstvy();
			}
		} );
		$( "#e" ).droppable({
			drop: function(event,ui){
				howPressArea("e");
				reloadVrstvy();
			}
		} );
		$( "#f" ).droppable({
			drop: function(event,ui){
				howPressArea("f");
				reloadVrstvy();
			}
		} );
		$( "#g" ).droppable({
			drop: function(event,ui){
				howPressArea("g");
				reloadVrstvy();
			}
		} );
	});
}
function sunBlast(){
	howPressArea("a");
	howPressArea("b");
	howPressArea("c");
	howPressArea("d");
	howPressArea("e");
	howPressArea("f");
	howPressArea("g");
}
function toggleGuide(){
	if($("#navod").css("display") == "block"){
		$("#navod").css("display", "none");
	}
	else{
		$("#navod").css("display", "block");
	}
}