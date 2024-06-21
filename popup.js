document.addEventListener("DOMContentLoaded", function () {
   // buttons of menu save
   const menu_save_button = document.getElementById("menu-save-button");

   menu_save_button.addEventListener("click", () => {
      const save_screen = document.getElementsByClassName("save_screen")[0];
      save_screen.style.display = "flex";
   });

   // buttons of save screen
   const save_screen_save_button = document.getElementById(
      "save-screen-save-button"
   );
   save_screen_save_button.addEventListener("click", async () => {
      const save_screen = document.getElementsByClassName("save_screen")[0];

      let tabs = await chrome.tabs.query({});

      tabs.forEach((element) => {
         console.log(element.url);
      });

      save_screen.style.display = "none";
   });

   const save_screen_cancel_button = document.getElementById(
      "save-screen-cancel-button"
   );

   save_screen_cancel_button.addEventListener("click", () => {
      const save_screen = document.getElementsByClassName("save_screen")[0];
      save_screen.style.display = "none";
   });
});
