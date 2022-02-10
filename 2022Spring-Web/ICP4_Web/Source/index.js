function getGithubInfo(user, callback) {
    // Creating an instance of XMLHttpRequest class and send a GET request using it.

    var ghb = new XMLHttpRequest();
    ghb.open("GET", "https://api.github.com/users/"+user, true);
    ghb.onreadystatechange = function (e) {
        if (this.readyState === 4) {
            if (this.status === 200) {
                callback(ghb)
            } else {
                callback(ghb)
            }
        } else {
            console.log(ghb)
        }
    };
    ghb.send();
}
function noSuchUser(username) {
    // setting the elements  to display message
    $('#profile').hide();
    $("#error").show();
    $('#error').text("Username not found")
    // document.getElementById('error').innerText = 'Something';
}

function showUser(user) {
    $('#profile').show();
    $('#profile h5.card-title').text(user.login)
    $('#profile img.card-img-top').attr('src', user.avatar_url)
    $('#profile p.card-text').text('User Name : ' + user.name)
    $('#profile a').attr('href', "https://github.com/"+user.login)
    $("#error").hide();
}

$(document).ready(function () {
    $("#error").hide();

    $("#username").bind("change", () => {
        console.log("Changed")
    })
    $('#submit').bind('click', () => {
        console.log("clicked");
        let username =$('#username').val();
        if (username) {
            $('#error').text("")
            getGithubInfo(username, function(response) {
                //if the response is found display the user's details
                if (response && response.status == 200) {
                    showUser(JSON.parse(response.responseText));
                    // display nosuchuser message
                } else {
                    noSuchUser(username);
                }
            });
        } else {
            $('#profile').hide();
            $("#error").show();
            $('#error').text("Type username:")
        }

    })
    $('#profile').hide();
    $("#submit").on('click', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        console.log(e)
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            if (username) {
                $('#error').text("")
                getGithubInfo(username, function(response) {
                    //if the response is found display the user's details
                    if (response && response.status == 200) {
                        showUser(JSON.parse(response.responseText));
                        // display no such user message
                    } else {
                        noSuchUser(username);
                    }
                });
            } else {
                $('#profile').hide();
                $('#error').text("Type Username:")
            }
            //reset the text typed in the input
            $(this).val("");



        }
    })
});
