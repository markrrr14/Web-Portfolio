// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll(':scope > li:not(.dropdown) > a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== Navbar Dropdown Menu (Vanilla JavaScript Activity) =====
// Required selectors
const dropdownButton = document.querySelector("#dropdownBtn");
const dropdownMenu = document.querySelector("#dropdownMenu");

// Bonus 3: second independent dropdown
const dropdownButton2 = document.querySelector("#dropdownBtn2");
const dropdownMenu2 = document.querySelector("#dropdownMenu2");

// Helper: update arrow indicator + aria-expanded (Bonus 2)
function updateDropdownState(button, menu) {
  const isOpen = menu.classList.contains("show");
  button.setAttribute("aria-expanded", isOpen ? "true" : "false");
  const arrow = button.querySelector(".arrow");
  if (arrow) {
    arrow.textContent = isOpen ? "▲" : "▼";
  }
}

// Helper: close a dropdown
function closeDropdown(button, menu) {
  if (menu.classList.contains("show")) {
    menu.classList.remove("show");
    updateDropdownState(button, menu);
  }
}

// Required click event + classList.toggle() for main dropdown
dropdownButton.addEventListener("click", function (event) {
  event.stopPropagation();
  // Close the other dropdown so they work independently (Bonus 3)
  closeDropdown(dropdownButton2, dropdownMenu2);
  dropdownMenu.classList.toggle("show");
  updateDropdownState(dropdownButton, dropdownMenu);
});

// Second dropdown (Bonus 3 — Multiple Dropdowns)
dropdownButton2.addEventListener("click", function (event) {
  event.stopPropagation();
  closeDropdown(dropdownButton, dropdownMenu);
  dropdownMenu2.classList.toggle("show");
  updateDropdownState(dropdownButton2, dropdownMenu2);
});

// Bonus 1: Close when clicking outside
document.addEventListener("click", function (event) {
  if (!event.target.closest(".dropdown")) {
    closeDropdown(dropdownButton, dropdownMenu);
    closeDropdown(dropdownButton2, dropdownMenu2);
  }
});

// Close dropdown after choosing a link (keeps mobile nav usable - Bonus 4)
dropdownMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    closeDropdown(dropdownButton, dropdownMenu);
    navLinks.classList.remove("open");
  });
});
dropdownMenu2.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    closeDropdown(dropdownButton2, dropdownMenu2);
    navLinks.classList.remove("open");
  });
});

// Close dropdown with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeDropdown(dropdownButton, dropdownMenu);
    closeDropdown(dropdownButton2, dropdownMenu2);
  }
});

// Typed terminal line
const phrases = ["building software.", "designing interfaces.", "training models.", "learning, always."];
const typedEl = document.getElementById('typedText');
let phraseIdx = 0, charIdx = 0, deleting = false;

function typeLoop(){
  const current = phrases[phraseIdx];
  if(!deleting){
    typedEl.textContent = current.slice(0, ++charIdx);
    if(charIdx === current.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if(charIdx === 0){ deleting = false; phraseIdx = (phraseIdx+1) % phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 40 : 70);
}
typeLoop();
