import { load_session, delete_session } from "./sessions.js";
import { openTab } from "./tabs.js";

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

      // create the url list

      const url_list = create_url_list(session.tabs);

      // create options

      // ****** OPTION 1 ******
      const option1 = create_option("./images/load2_icon.svg", "Load");
      option1.addEventListener("click", () => load_session(session));

      // ****** OPTION 2 ******
      const option2 = create_option("./images/trash_icon.svg", "Delete");
      option2.addEventListener("click", () => delete_session(session));

      //  ***** OPTION 3 ******

      const option3 = create_option("./images/link_icon.svg", "Links");
      option3.addEventListener("click", () => show_url_list(url_list));

      //  create session options-container
      const session_options = document.createElement("div");
      session_options.classList.add("session-item-options");
      session_options.appendChild(option1);
      session_options.appendChild(option2);
      session_options.appendChild(option3);

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
      session_item_container.appendChild(url_list);
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

const create_url_list = (links) => {
   const url_list = document.createElement("div");
   url_list.classList.add("url-list");

   links.forEach((currentUrl) => {
      const link = document.createElement("p");
      link.textContent = currentUrl;
      link.title = currentUrl;
      link.addEventListener("click", () => openTab(currentUrl));
      link.classList.add("url_item");
      url_list.appendChild(link);
   });

   return url_list;
};

// TODO:  Refactor these functions

const showOptions = (session_options) => {
   session_options.style.display = "flex";
};

const hideOptions = (session_options) => {
   session_options.style.display = "none";
};

const show_url_list = (url_list) => {
   const element_styles = window.getComputedStyle(url_list);

   if (element_styles.display == "flex") {
      url_list.style.display = "none";

      return;
   }
   url_list.style.display = "flex";
};
