
var okta = new OktaSignIn({
    baseUrl: "https://dev-661511.okta.comDashboard",
    clientId: "0oafwaecpGhADoejD4x6",
    authParams: {
      issuer: "https://dev-661511.okta.comDashboard/oauth2/default",
      responseType: ["token", "id_token"],
      display: "page"
    }
  });

  // Render the login form.
  function showLogin() {
    okta.renderEl({ el: "#okta-login-container" }, function(res) {}, function(err) {
      alert("Couldn't render the login form, something horrible must have happened. Please refresh the page.");
    });
  }

  // Determine whether or not we have a querystring.
function hasQueryString() {
    return location.href.indexOf("?") !== -1;
  }

  // Determine the room name and public URL for this chat session.
function getRoom() {
    var query = location.search && location.search.split("?")[1];
  
    if (query) {
      return (location.search && decodeURIComponent(query.split("=")[1]));
    }
  
    return okta.tokenManager.get("idToken").claims.email;
  }
  
  // Retrieve the absolute room URL.
  function getRoomURL() {
    return location.protocol + "//" + location.host + (location.path || "") + "?room=" + getRoom();
  }

  
  // Handle the user's login and what happens next.
function handleLogin() {
    // If the user is logging in for the first time...
    if (okta.token.hasTokensInUrl()) {
      okta.token.parseTokensFromUrl(
        function success(res) {
          // Save the tokens for later use, e.g. if the page gets refreshed:
          okta.tokenManager.add("accessToken", res[0]);
          okta.tokenManager.add("idToken", res[1]);
  
          // Redirect to this user's dedicated room URL.
          window.location = getRoomURL();
        }, function error(err) {
          alert("We weren't able to log you in, something horrible must have happened. Please refresh the page.");
        }
      );
    } else {
      okta.session.get(function(res) {
  
        // If the user is logged in...
        if (res.status === "ACTIVE") {
  
          // If the user is logged in on the home page, redirect to their room page.
          if (!hasQueryString()) {
            window.location = getRoomURL();
          }
  
          return;
        }
  
        // If we get here, the user is not logged in.
  
        // If there's a querystring in the URL, it means this person is in a
        // "room" so we should display our passive login notice. Otherwise,
        // we'll prompt them for login immediately.
        if (hasQueryString()) {
          document.getElementById("login").style.display = "block";
        } else {
          showLogin();
        }
      });
    }
  }

  handleLogin();