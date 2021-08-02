function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(unescape(document.cookie));
  var ca = decodedCookie.split(";");
  console.log("----> decodeCookie", decodedCookie);
  console.log("----> ca", ca);
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(name.length, c.length);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookieHour(name, value, hours) {
  var now = new Date();
  var time = now.getTime();
  time += 3600 * 1000 * hours;
  console.log("---->Time", time);
  now.setTime(time);
  document.cookie = name + "=" + escape(value) + ";path/; expires=" + now.toUTCString() + ";";
}