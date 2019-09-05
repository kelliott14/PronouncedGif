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
                gifDiv.attr("searchword", gifs[i]);
                $(".searchButtons").append(gifDiv);           
            
            }

        }
    

    $("#addSearch").on("click", function(){
        var newOption = $("#searchInput").val();
        gifs.push(newOption);

        loadButtons();
    });


    $("li").on("click", function(){
        var keyword = $(this).attr("searchword");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + keyword + "&api_key=Ew082cXq1TZjBFYEChwkSaW7PTDz3gjn&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
              })
             
              .then(function(response) {
                
                  console.log(response)
                
                for (var i = 0; i < 10; i++){
                    var stillImg = response.data[i].images.original_still.url;
                   // var moveImg = response.data[i].url;
                    var cardDiv = $("<div>");

                    $(cardDiv).addClass("card");
                    $(cardDiv).html("<img src=" + stillImg + ">");
                    $(cardDiv).attr("move-still","still");
                    
                    $(".card-columns").prepend(cardDiv);

                }
    })
    
    });
    
    


  });
  