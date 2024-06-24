import { create_session_list_structure } from "./structures.js";

export const load_list_sessions = async () => {
   let localData = await chrome.storage.local.get("sessions");

   const all_sessions = localData.sessions;

   if (all_sessions) {
      create_session_list_structure(all_sessions);
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
