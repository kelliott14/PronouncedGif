$(document).ready(function(){
    //Sidebar JS
    $("#menu-toggle").click(function(e){
      e.preventDefault();
      $("#wrapper").toggleClass("menuDisplayed");
    });

    //Variables
    var gifs = ["cats", "dogs"];
    var favGifs;

    //Resetting the page on load
    function reset(){
        gifs = ["cats","dogs"];
        favGifs = 0;
        $(".favRow").hide();
        searchWord = "";
    }

    reset();
    loadButtons();

    //loading the search buttons
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
               
                for (var i = 0; i < 10; i++){
                    var stillImg = response.data[i].images.original_still.url;
                    var moveImg = response.data[i].images.original.url;
                    var cardDiv = $("<div>");

                    $(cardDiv).addClass("card card-img-top gifCard");
                    $(cardDiv).css({"width": "251px"})

                    var gifImg = $("<img src=" + stillImg + ">");
                    
                    $(gifImg).attr("move-still","still");
                    $(gifImg).attr("moveSrc", moveImg);
                    $(gifImg).attr("stillSrc", stillImg);
                    $(gifImg).addClass("gifImg")
                    
                    var favLink = $("<a>Add to Favourites</a>");
                    $(favLink).addClass("card-link addFavs");

                    var urlLink = $("<a>Copy link</a>");
                    $(urlLink).addClass("card-link copyLink")

                    var links = $("<div>");
                    $(links).addClass("card-body links");

                    $(links).append(favLink, urlLink);

                    $(cardDiv).html(gifImg);
                    $(cardDiv).append(links);

                    $(".card-columns").prepend(cardDiv);

                }
            
    })
    
    });
    
    $("body").on("click", ".gifImg", function(){
        

        var state = $(this).attr("move-still")
        
        
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
        $(".favRow").show();
        var newFav = $(this).parent().parent();
        

        $(".favGifsBox").append(newFav);
        $(newFav).addClass("favGifCards");
        $(this).text("Remove");
        $(this).addClass("removeFav");
        favGifs++

    })
    //remove favourites    
    $(".favGifsBox").on("click", ".removeFav", function(){

        var rmFav = $(this).parent().parent();

        $(".card-columns").append(rmFav);
        $(rmFav).removeClass("favGifCards");
        $(this).text("Add to Favourites");
        $(this).removeClass("removeFav");
        favGifs--

        if(favGifs == 0){
            $(".favRow").hide();
        
        }else{
            $(".favRow").show();
        }

    });

    //copy link
    $("body").on("click", ".copyLink", function(){

        $(".copyLink").text("Copy link");
        var thisGifCard = $(this).parent().parent();
        var thisImg = thisGifCard.children("img");
        var thisMoveSrc = thisImg.attr("moveSrc");
        
        var thisURL = $("<input>").val(thisMoveSrc).appendTo("body").select();
            
        document.execCommand("copy");
        
        $(this).text("Copied!")

        $(thisURL).hide();
    })



  });
  