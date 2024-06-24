export const load_list_sessions = async () => {
   const sessions_list = document.getElementsByClassName(
      "sessions-list-container"
   )[0];

   sessions_list.replaceChildren();

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
         option1.addEventListener("click", () => load_session(session));

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
         option2.addEventListener("click", () => delete_session(session));

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

export const load_session = async (session) => {
   let tabs = await chrome.tabs.query({});

   let tabIds = tabs.map((tab) => tab.id);

   await Promise.resolve(
      session.tabs.map(async (tab) => await chrome.tabs.create({ url: tab }))
   );

   chrome.tabs.remove(tabIds);
};

export const delete_session = async (session) => {
   // get sessions stored
   let localData = await chrome.storage.local.get("sessions");

   let all_sessions = localData.sessions;

   console.log(all_sessions);

   all_sessions = all_sessions.filter(
      (current_session) => current_session.session_name != session.session_name
   );

   await chrome.storage.local.set({ sessions: all_sessions });

   await load_list_sessions();
};

// TODO:  Refactor these functions

const showOptions = (session_options) => {
   session_options.style.display = "flex";
};

const hideOptions = (session_options) => {
   session_options.style.display = "none";
};
