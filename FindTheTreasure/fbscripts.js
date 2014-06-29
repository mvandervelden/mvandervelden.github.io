// Author: Maarten van der Velden,
// e-mail: maarten DOT vdvelden AT gmail DOT com
// Date:   Aug 3 2012


//Facebook login: not used for now...
// $('gamemenu').grab(new Element('div.menu_message', {
//     id: 'auth-loggedout',
// }));
// $('auth-loggedout').grab(new Element('span', {
//     id: 'auth-loginlink',
//     html: 'You need to <a href="#">login</a> with your facebook account for multiplayer'
// }));
// $('gamemenu').grab(new Element('div.menu_message', {
//     id: 'auth-loggedin',
//     styles: {
//         display: 'none'
//     },
//     html: 'Hi '
// }));
// $('auth-loggedin').grab(new Element('span', {
//     id: 'auth-displayname'
// }));
// $('auth-loggedin').grab(new Element('span', {
//     id: 'auth-logoutlink',
//     html: ' <a href="#">logout</a>'
// }));
// init_facebook();


function init_facebook() {
    // Load the SDK Asynchronously
    (function(d){
       var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement('script'); js.id = id; js.async = true;
       js.src = "//connect.facebook.net/en_US/all.js";
       ref.parentNode.insertBefore(js, ref);
     }(document));

    // Init the SDK upon load
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '427995983897978', // App ID
        channelUrl : '//'+window.location.hostname+'/channel', // Path to your Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
      });

      // listen for and handle auth.statusChange events
      FB.Event.subscribe('auth.statusChange', function(response) {
        var name, uid, friends;
        if (response.authResponse) {
          // user has auth'd your app and is logged into Facebook
          FB.api('/me', function(me){
            if (me.first_name) {
              document.getElementById('auth-displayname').innerHTML = me.first_name;
            }
            name = me.name;
            uid = me.id;
          });
          FB.api('/me/friends', function(fs){
              friends = fs.data;
          });
          document.getElementById('auth-loggedout').style.display = 'none';
          document.getElementById('auth-loggedin').style.display = 'block';
        } else {
          // user has not auth'd your app, or is not logged into Facebook
          document.getElementById('auth-loggedout').style.display = 'block';
          document.getElementById('auth-loggedin').style.display = 'none';
        }
      });

      // respond to clicks on the login and logout links
      document.getElementById('auth-loginlink').addEventListener('click', function(){
        FB.login();
      });
      document.getElementById('auth-logoutlink').addEventListener('click', function(){
        FB.logout();
      }); 
    }
}

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
                console.log('Good to see you, ' + response.name + '.');
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    });
    // Additional initialization code here
}
