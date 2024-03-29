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
    
    //adding an option to the list
    $("#addSearch").on("click", function(){
        var newOption = $("#searchInput").val().trim();
        gifs.push(newOption);

        loadButtons();

        $("#searchInput").val("");
    });

    //running the search from the search word buttons
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
                var rating = response.data[i].rating;
                var cardDiv = $("<div>");

                //creating the card that the gif will sit in
                $(cardDiv).addClass("card card-img-top gifCard");
                $(cardDiv).css({"width": "251px"});

                //adding the still img
                var gifImg = $("<img src=" + stillImg + ">");
                
                //adding the moving and still img as attributes
                $(gifImg).attr("move-still","still");
                $(gifImg).attr("moveSrc", moveImg);
                $(gifImg).attr("stillSrc", stillImg);
                $(gifImg).addClass("gifImg");

                //adding the favourite link            
                var favLink = $("<a>Add to Favourites</a>");
                $(favLink).addClass("card-link addFavs");

                //adding the copy to clipboard link
                var urlLink = $("<a>Copy link</a>");
                $(urlLink).addClass("card-link copyLink")

                //adding these links into a div
                var links = $("<div>");
                $(links).addClass("card-body links");
                $(links).append(favLink, urlLink);

                //adding the rating in its own div
                var ratingDiv = $("<div>");
                $(ratingDiv).addClass("card-body rating");
                $(ratingDiv).append("Rating: " + rating.toUpperCase());

                //adding the links and the img to the original gif card
                $(cardDiv).html(gifImg);
                $(cardDiv).append(links);
                $(cardDiv).append(ratingDiv);

                //adding the gif card to the DOM
                $(".card-columns").prepend(cardDiv);

            }
            
        });
    
    });
    
    //switching the gif between moving and still
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

    //adding favourites to the favourites box
    $(".card-columns").on("click", ".addFavs", function(){
        $(".favRow").show();
        var newFav = $(this).parent().parent();

        $(".favGifsBox").append(newFav);
        $(newFav).addClass("favGifCards");
        $(this).text("Remove");
        $(this).addClass("removeFav");
        favGifs++

    })

    //removing favourites from the favourites box   
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

    //copy link to the clipboard
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
  