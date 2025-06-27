const menuBtn = document.getElementById("menuBtn");
const navSidebar = document.getElementById("navSidebar");
const closeNav = document.getElementById("closeNav");

menuBtn.addEventListener("click", () => {
    navSidebar.classList.remove("-translate-x-full");
});

closeNav.addEventListener("click", () => {
    navSidebar.classList.add("-translate-x-full");
});