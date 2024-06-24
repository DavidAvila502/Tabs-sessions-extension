import { saveTabs } from "./utils/tabs.js";
import { load_list_sessions } from "./utils/sessions.js";

document.addEventListener("DOMContentLoaded", function () {
   const save_btn = document.getElementById("save-btn");
   const confirm_save_btn = document.getElementById("confirm-save");
   const cancel_save_btn = document.getElementById("cancel-save-btn");
   const load_btn = document.getElementById("load-btn");

   save_btn.addEventListener("click", () => {
      const save_screen = document.getElementsByClassName("save-screen")[0];
      save_screen.style.display = "flex";
   });

   load_btn.addEventListener("click", async () => {
      const main_menu = document.getElementsByClassName("menu-container")[0];
      const sessions_menu =
         document.getElementsByClassName("sessions-screen")[0];

      main_menu.style.display = "none";
      sessions_menu.style.display = "flex";

      await load_list_sessions();
   });

   confirm_save_btn.addEventListener("click", async () => {
      const save_screen = document.getElementsByClassName("save-screen")[0];

      const session_name = document.getElementById("session-name");

      if (session_name.value) {
         await saveTabs(session_name.value);
         save_screen.style.display = "none";
         session_name.value = "";
      }
   });

   cancel_save_btn.addEventListener("click", () => {
      const save_screen = document.getElementsByClassName("save-screen")[0];
      save_screen.style.display = "none";
   });
});
