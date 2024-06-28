export const saveTabs = async (session_name) => {
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
   await chrome.storage.local.set({ sessions: all_sessions });
};

export const openTab = async (url) => {
   await chrome.tabs.create({ url: url });
};
