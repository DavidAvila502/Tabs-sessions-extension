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

      await load_sessions();
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

const load_sessions = async () => {
   const sessions_list = document.getElementsByClassName(
      "sessions-list-container"
   )[0];

   let localData = await chrome.storage.local.get("sessions");

   const all_sessions = localData.sessions;

   if (all_sessions) {
      all_sessions.forEach((session) => {
         // create a main div
         const session_item_container = document.createElement("div");
         session_item_container.classList.add("session-item");

         // create a title
         const session_name = document.createElement("p");
         session_name.textContent = session.session_name;
         session_name.classList.add("title3");

         // create options

         // ****** OPTION 1 ******

         const option1 = document.createElement("div");
         option1.classList.add("option");

         const img1 = document.createElement("img");
         img1.src = "./images/load2_icon.svg";
         img1.alt = "load icon";

         const option_text1 = document.createElement("p");
         option_text1.textContent = "Load";
         option1.classList.add("option_title");

         option1.appendChild(img1);
         option1.appendChild(option_text1);
         option1.addEventListener("click", () =>
            load_sessions_tabs(session.tabs)
         );

         // ****** OPTION 2 ******
         const option2 = document.createElement("div");
         option2.classList.add("option");

         const img2 = document.createElement("img");
         img2.src = "./images/trash_icon.svg";
         img2.alt = "trash icon";

         const option_text2 = document.createElement("p");
         option_text2.textContent = "Delete";
         option2.classList.add("option_title");

         option2.appendChild(img2);
         option2.appendChild(option_text2);

         //  create session options-container
         const session_options = document.createElement("div");
         session_options.classList.add("session-item-options");
         session_options.appendChild(option1);
         session_options.appendChild(option2);

         // create title container
         const title_container = document.createElement("div");
         title_container.classList.add("session-item-title-container");

         title_container.appendChild(session_name);
         title_container.appendChild(session_options);
         title_container.addEventListener("mouseenter", () =>
            showOptions(session_options)
         );
         title_container.addEventListener("mouseleave", () =>
            hideOptions(session_options)
         );

         session_item_container.appendChild(title_container);
         sessions_list.appendChild(session_item_container);
      });
   }
};

const load_sessions_tabs = async (session_tabs) => {
   let tabs = await chrome.tabs.query({});

   let tabIds = tabs.map((tab) => tab.id);

   await Promise.resolve(
      session_tabs.map(async (tab) => await chrome.tabs.create({ url: tab }))
   );

   chrome.tabs.remove(tabIds);
};

const showOptions = (session_options) => {
   session_options.style.display = "flex";
};

const hideOptions = (session_options) => {
   session_options.style.display = "none";
};
