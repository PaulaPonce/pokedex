$(document).ready(function(){
	$("#activate-sidenav").sideNav();
	$(".modal").modal();

	$("#search").on("click", function(event){
		event.preventDefault();

		//Input value
		var inputVal = $("input[type=search]").val();
		var pokeURL = "https://pokeapi.co/api/v1/pokemon/" + inputVal;
		console.log(inputVal);

		// new URL for 3rd GET request
		var pokeURL2 = "https://pokeapi.co/api/v2/pokemon/" + inputVal;

		/*
		var ajaxName = $.ajax({
			url: "http://pokeapi.co/api/v2/pokemon/" + pokeName,
			dataType: "json",
			method: "GET"
		});
		console.log(ajaxName);
		*/

		//Find pokemon by name or number
		$.getJSON(pokeURL, function(data){
			//console.log(data);
			
			var pokeID = data.national_id;
			var pokeName = data.name;
			var pokeHeight = data.height;
			var pokeWeight = data.weight;

			var pokeAbility1 = data.abilities[0].name;
			if(data.abilities.length == 2){
				var pokeAbility2 = data.abilities[1].name;
				var pokeAbility3 = null;
			}else if(data.abilities.length == 3){
				var pokeAbility2 = data.abilities[1].name;
				var pokeAbility3 = data.abilities[2].name;
			}

			var pokeType1 = data.types[0].name; //data.types[0].type.name;		
			if(data.types.length == 2){
				var pokeType2 = data.types[1].name;
			}else{
				var pokeType2 = null;
			}

			// concatenate new URL for 2nd GET request
			var descriptionURI = "https://pokeapi.co" + data.descriptions[0].resource_uri;
			// this var will hold the description string
			var pokeDescription = "";

			// 2nd GET request to get description
			$.getJSON(descriptionURI, function(data2){
				//console.log(data2);
				pokeDescription = data2.description;
			});

			// 3rd GET request to get an image
			$.getJSON(pokeURL2, function(data3){
				//console.log(data3);
				//console.log(JSON.stringify(data, null, "  "));
				var imageURI = data3.sprites.front_default;
            
				console.log("Number: ", pokeID);
				console.log("Name: ", pokeName);
				console.log("Ability 1: ", pokeAbility1);
				console.log("Ability 2: ", pokeAbility2);
				console.log("Ability 3: ", pokeAbility3);
				console.log("Type 1: ", pokeType1);
				console.log("Type 2: ", pokeType2);
				console.log("Height: ", pokeHeight);
				console.log("Weight: ", pokeWeight);
				console.log("Description URI: ", descriptionURI);
				console.log("Description: ", pokeDescription);
				console.log("Image URI: ", imageURI);

				// append data to HTML
				var li = "";

				li += "<p><b>Height:</b> " + pokeHeight + "</p>";
				li += "<p><b>Weight:</b> " + pokeWeight + "</p>";

				// only display Ability3 if it is not null
				if(pokeAbility3 != null){
					$("#pokeDetails2").append("<p><b>Abilities: </b><br>" + pokeAbility1 + "<br>" + pokeAbility2 +"'<br>" + pokeAbility3 + "</p>");
				}else{
					$("#pokeDetails2").append("<p><b>Abilities: </b><br>" + pokeAbility1 + "<br>" + pokeAbility2 + "</p>");
				}
				
				// only display Type 2 if it is not null
				if (pokeType2 != null){
					$("#pokeDetails3").append("<p><b>Type:</b> " + pokeType1 + " " + pokeType2 + "</p>");
				}else{
					$("#pokeDetails3").append("<p><b>Type:</b> " + pokeType1 + "</p>");
				}

				li += "</li>";

				// empty the listview
				//$("#pokeData").empty();

				// append elements to modal
				$("#pokeName").append("<h1>#" + pokeID + " " + pokeName + "</h1>")
				$("#pokeScript").append("<img src='" + imageURI + "'><div class='row'><div class='col s12 center-align'><img class='icon' src='assets/icon/pokeball_gray.png'><img class='icon' src='assets/icon/valentines-heart.png'><img class='icon' src='assets/icon/data.png'></div></div>");
				$("#pokeDescription").append("<p>" + pokeDescription + "</p>");
				$("#pokeDetails1").append(li);
			});
		}); //2nd and 3rd GET requests are nested in success function of 1st GET request
	});
})
