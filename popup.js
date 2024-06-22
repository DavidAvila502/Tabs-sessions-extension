document.addEventListener("DOMContentLoaded", function () {
   const save_btn = document.getElementById("save-btn");
   const confirm_save_btn = document.getElementById("confirm-save");
   const cancel_save_btn = document.getElementById("cancel-save-btn");
   const load_btn = document.getElementById("load-btn");

   save_btn.addEventListener("click", () => {
      const save_screen = document.getElementsByClassName("save-screen")[0];
      save_screen.style.display = "flex";
   });

   load_btn.addEventListener("click", () => {
      const main_menu = document.getElementsByClassName("menu-container")[0];
      const sessions_menu =
         document.getElementsByClassName("sessions-screen")[0];

      main_menu.style.display = "none";
      sessions_menu.style.display = "flex";
   });

   confirm_save_btn.addEventListener("click", async () => {
      const save_screen = document.getElementsByClassName("save-screen")[0];

      const session_name = document.getElementById("session-name").value;

      if (session_name) {
         await saveTabs(session_name);
         save_screen.style.display = "none";
      }
   });

   cancel_save_btn.addEventListener("click", () => {
      const save_screen = document.getElementsByClassName("save-screen")[0];
      save_screen.style.display = "none";
   });
});

const saveTabs = async (session_name) => {
   //create session structure
   const current_sesion = { session_name: session_name, tabs: [] };

   // get current tabs
   let tabs = await chrome.tabs.query({});
   tabs.forEach((tab) => {
      current_sesion.tabs.push(tab.url);
   });

   // get sessions stored
   let localData = await chrome.storage.local.get("sessions");

   let all_sessions = localData.sessions;
   // add current session to the sessions list
   !all_sessions
      ? (all_sessions = [current_sesion])
      : all_sessions.push(current_sesion);

   // save data
   await chrome.storage.local.set({ sessions: all_sessions }, () => {
      console.log("Data saved.");
      console.log(all_sessions);
   });
};
