$(document).ready(function()
{
              
    var userNameArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
    
    // Below is a $.each() loop, which iterates through the given usernames.
    $.each(userNameArr, function(index)
    {    
        // Here, there are two sets of <li>'s – with each having its own unique ID – to preserve the order of both the channels and their status. 
        $("#list1").append("<li id = '" + index + "'></li>");
        $("#list2").append("<li id = '0" + index + "'></li>");
        
        // First JSON call. Here, we obtain the channel's name and its logo, assigning them to their unique bullet point in #list1.      
        $.getJSON("https://wind-bow.gomix.me/twitch-api/users/" + userNameArr[index] + "?callback=?", function (dataChannel)
        {
            $('#' + index).append( "<img src ='" +  dataChannel.logo + "'>" + "<a target = '_blank' href = 'https://www.twitch.tv/" + dataChannel.name + "'>" + dataChannel.display_name + "</a>");
        }); 
            
        // Second JSON call. Here, we obtain the channel's status, assigning it to the same ID number (however to #list2, which begins with 0 for distinction's sake) in order to match its channel. 
        // In addition, a class is added to "<li></li>"'s of both the channel and its status to indicate whether the channel is online or offline. This is comes into use later on when these two 
        // classes are used to display the online/offline channels.
        $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + userNameArr[index] + "?callback=?", function(dataStatus)
        {
            if (dataStatus.stream !== null)
            {
                $("#0" + index).append("<li style = 'color: yellow'>" + dataStatus.stream.game + "</li>");
                $("#" + index).addClass("Online");
                $("#0" + index).addClass("Online");
            }
            else if (dataStatus.stream === null)
            {
                $("#0" + index).append("<li style = 'color: silver'>Offline</li>");
                $("#" + index).addClass("Offline");
                $("#0" + index).addClass("Offline");
            }    
        });  
            
    });  
        
    // Finally, the "Online" and the "Offline" classes are put into use to help the user display the online, offline or all of the channels.    
    $("#on").on("click", function()
    {
        $(".Online").show();
        $(".Offline").hide();
    });
    
    $("#off").on("click", function()
    {
        $(".Offline").show();
        $(".Online").hide();
    });
    $("#all").on("click", function()
    {
        $(".Offline").show();
        $(".Online").show();
    });
      
});
    
