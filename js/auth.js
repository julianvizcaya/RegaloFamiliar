const navigationEntry = performance.getEntriesByType("navigation")[0];
const isReload = navigationEntry?.type === "reload";
const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

if (isReload || !isAuthenticated) {
  sessionStorage.removeItem("isAuthenticated");
  window.location.href = "index.html";
}