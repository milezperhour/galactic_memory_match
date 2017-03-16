$(document).ready(function() {
    $('.back').click(card_clicked);
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy + "%");
    $(".reset").click(function(){
        games_played++;
        $('.games-played .value').text(games_played);
        $(".back").removeClass("hide_back");  //flips cards to back on reset button
        reset_stats();
    });

});

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts  = 0;
var accuracy = 0;
var games_played = 0;
var cards_can_be_clicked = true;

function card_clicked(){
    if(!cards_can_be_clicked){
        return;
    }

    $(this).toggleClass('hide_back');
    if (first_card_clicked===null){
        first_card_clicked=this;
        return;
    }
    else{
        cards_can_be_clicked=false;
        second_card_clicked=this;
        attempts++;
        display_stats();

        if($(first_card_clicked).attr('class')===$(second_card_clicked).attr('class')){
            matches++;
            match_counter++;
            display_stats();
            first_card_clicked=null;
            second_card_clicked=null;
            cards_can_be_clicked=true;
            if (match_counter===total_possible_matches){
                console.log("You Won!");  //Displays a message that the user won
            }
            else{
                return;
            }

        }
        else{
            setTimeout (timeOut, 2000);
            return;
        }
    } // end of: check if both card clicked are equal
} //end of: card clicked function

function timeOut(){
    $(first_card_clicked).toggleClass('hide_back');
    $(second_card_clicked).toggleClass('hide_back');
    first_card_clicked=null;
    second_card_clicked=null;
    cards_can_be_clicked = true;
}

function display_stats(){
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    if (attempts === 0){
        accuracy = 0 + "%";
    }
    else {
        accuracy = Math.floor((matches / attempts) * 100) + "%";
    }
    $('.accuracy .value').text(accuracy);
}

function reset_stats(){
    matches=0;
    attempts=0;
    accuracy=0;
    display_stats();
}