$(document).ready(function(){
    //Sidebar JS
    $("#menu-toggle").click(function(e){
      e.preventDefault();
      $("#wrapper").toggleClass("menuDisplayed");
    });

    var gifs = ["cats", "dogs"];
    var favGifs;
    var searchWord;

    function reset(){
        gifs = ["cats","dogs"];
        favGifs = 0;
        $(".favGifsBox").hide();
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
        var newOption = $("#searchInput").val().trim();
        gifs.push(newOption);

        loadButtons();

        $("#searchInput").val("");
    });


    $(".searchButtons").on("click", "li", function(){
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
                    var moveImg = response.data[i].images.original.url;
                    var cardDiv = $("<div>");

                    $(cardDiv).addClass("card");
                    var gifImg = $("<img src=" + stillImg + ">");
                    
                    $(gifImg).attr("move-still","still");
                    $(gifImg).attr("moveSrc", moveImg);
                    $(gifImg).attr("stillSrc", stillImg);
                    $(gifImg).addClass("gifCard")
                    
                    var favLink = $("<a>Add to Favourites</a>");
                    $(favLink).addClass("card-link addFavs");

                    $(cardDiv).html(gifImg)
                    $(cardDiv).append(favLink)

                    $(".card-columns").prepend(cardDiv);

                }
            
    })
    
    });
    
    $(".card-columns").on("click", ".gifCard", function(){
        

        var state = $(this).attr("move-still")
        console.log(state)
        
        if (state == "still"){
            $(this).attr("src", $(this).attr("moveSrc"));
            $(this).attr("move-still","move")
        
        }else if (state == "move"){
            $(this).attr("src", $(this).attr("stillSrc"));
            $(this).attr("move-still", "still");
        }

        
    });

    //add favourites    
    $(".card-columns").on("click", ".addFavs", function(){
        $(".favGifsBox").show();
        var newFav = $(this).parent();
        console.log(newFav)

        $(".favGifsBox").append(newFav);
        $(newFav).addClass("favGifCards");
        $(this).text("Remove from Favourites");
        $(this).addClass("removeFav");
        favGifs++

    })
    //remove favourites    
    $(".favGifsBox").on("click", ".removeFav", function(){

        var rmFav = $(this).parent();

        $(".card-columns").append(rmFav);
        $(rmFav).removeClass("favGifCards");
        $(this).text("Add to Favourites");
        $(this).removeClass("removeFav");
        favGifs--

        if(favGifs == 0){
            $(".favGifsBox").hide();
        
        }else{
            $(".favGifsBox").show();
        }

})



  });
  