import { load_session, delete_session } from "./sessions.js";

export const create_session_list_structure = (all_sessions) => {
   const sessions_list = document.getElementsByClassName(
      "sessions-list-container"
   )[0];

   sessions_list.replaceChildren();

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
      const option1 = create_option("./images/load2_icon.svg", "Load");
      option1.addEventListener("click", () => load_session(session));

      // ****** OPTION 2 ******
      const option2 = create_option("./images/trash_icon.svg", "Delete");
      option2.addEventListener("click", () => delete_session(session));

      //  create session options-container
      const session_options = document.createElement("div");
      session_options.classList.add("session-item-options");
      session_options.appendChild(option1);
      session_options.appendChild(option2);

      // create title container
      const title_container = document.createElement("div");
      title_container.classList.add("session-item-title-container");

      //   Add children to title container
      title_container.appendChild(session_name);
      title_container.appendChild(session_options);
      title_container.addEventListener("mouseenter", () =>
         showOptions(session_options)
      );

      //   add events to title container
      title_container.addEventListener("mouseleave", () =>
         hideOptions(session_options)
      );

      session_item_container.appendChild(title_container);
      sessions_list.appendChild(session_item_container);
   });
};

const create_option = (icon, option_name) => {
   const option = document.createElement("div");
   option.classList.add("option");

   const img = document.createElement("img");
   img.src = icon;
   img.alt = option_name;

   const option_text = document.createElement("p");
   option_text.textContent = option_name;
   option_text.classList.add("option_title");

   option.appendChild(img);
   option.appendChild(option_text);

   return option;
};
// TODO:  Refactor these functions

const showOptions = (session_options) => {
   session_options.style.display = "flex";
};

const hideOptions = (session_options) => {
   session_options.style.display = "none";
};
