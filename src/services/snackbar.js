export const showSnackbar = (message) => {
  var snackbar = document.getElementById("snackbar")
  snackbar.className = "show";
  snackbar.innerHTML = message;
  setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
};