$(document).ready(function(){
    //Sidebar JS
    $("#menu-toggle").click(function(e){
      e.preventDefault();
      $("#wrapper").toggleClass("menuDisplayed");
    });

    var gifs = ["cats", "dogs"];
    var favGifs = [""];
    var searchWord;

    function reset(){
        gifs = ["cats","dogs"];
        favGifs = [""];
        searchWord = "";
    }

    reset();
    loadButtons();

    function loadButtons(){       

            $(".searchButtons").empty();
            for (var i = 0; i < gifs.length; i++) {

                var gifDiv = $("<li>");

                gifDiv.html("<a>" + gifs[i] + "</a>")
                $(".searchButtons").append(gifDiv);           
            
            }

        }
    


    $("#addSearch").on("click", function(){
        var newOption = $("#searchInput").val();
        gifs.push(newOption);

        console.log(newOption)
        loadButtons();
    });
    
// var stillImg = response.data.images.original_still.url;
//                 var moveImg = response.data.image_original_url;
                
                





            
//             var url = "https://api.giphy.com/v1/gifs/random?api_key=Ew082cXq1TZjBFYEChwkSaW7PTDz3gjn&tag=" + searchWord + "limit=10";

//             $.ajax({
//                 url: queryURL,
//                 method: "GET"
//               })

//               .then(function(reponse) {
//                   $(".searchButtons").empty();



               


    


  });
  