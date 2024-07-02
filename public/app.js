function myFunction() {
    var selectElement = document.getElementById("categorySelect");
    var selectedValue = selectElement.value;
    window.location.href = "/category/" + selectedValue;
  }


  
  /*function initBurgerMenu() {
    const menuNavbar = document.getElementById("menu-navbar");
    const menuButton = document.getElementById("menu-button");
    
    if (menuNavbar && menuButton) {
      menuButton.addEventListener("click", () => {
        menuNavbar.classList.toggle("expanded");
      });
    } else {
      console.error("menuNavbar or menuButton not found");
    }
  }
  
  // Initialize the burger menu
  initBurgerMenu();*/

