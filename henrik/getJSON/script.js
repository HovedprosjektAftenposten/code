urlString = "jsonData.js"

// Document-ready
$(function(){
	settEvents();
});


function settEvents(){
	$('#btnHentData').click(function(){
		hentData();
	});	
	$('#btnHentTekst').click(function(){
		hentJSONTekst();
	});
}

// Henter data fra json, omgjør det til en HTML-string og legger de til #sectData
function hentData(){	
	var htmlString = "";
	$.getJSON(urlString, function(jsonData){
		$.each(jsonData.articles, function(i, item){
			var id = item.id;
			var title = item.title;
			var content = item.content;
			
			htmlString += wrapTxt(id, "h1");
			htmlString += wrapTxt(title, "h2");
			htmlString += wrapTxt(content, "p");
		})
		$('#sectData').html(htmlString);
	})
	.error(function(jsonStatus){
		alert(JSON.stringify(jsonStatus));
	});
}

// Henter data fra json, omgjør det til en lesbar string og legger den til #sectData
function hentJSONTekst(){
	$.getJSON(urlString, function(jsonData){
		var jsonString = JSON.stringify(jsonData);
					
		$('#sectData').html("<xmp>" + jsonString + "</xmp>");
	})
	.error(function(jsonStatus){
		alert(JSON.stringify(jsonStatus));
	});
}

// Wrap-funksjon for å forenkle konstruksjon av HTML-string fra json
function wrapTxt(text, tag){
	return "<" + tag + ">" + text + "</" + tag + ">";	
}
	