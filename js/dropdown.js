window.addEventListener("DOMContentLoaded", function() {
  const avatar = document.getElementById("user-photo");
  const menu   = document.getElementById("user-dropdown");

  if (avatar && menu) {
    avatar.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  } else {
    console.warn("Dropdown elements not found");
  }
});
