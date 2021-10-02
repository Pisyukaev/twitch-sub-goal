const initValue = {
  ['.goal_widget']: {
    ['border-color']: '#000000',
    ['background-color']: '#ffffff',
    ['border-width']: '5px',
    ['border-radius']: '30px',
  },
  ['.goal_widget__progress_bar']: {
    ['background-color']: '#bf94ff',
  },
  ['.goal_widget__image.tw-image']: {
    content:
      'https://static.twitchcdn.net/assets/subscribe-2d3225207e704bd2aa2d.svg',
  },
  ['.goal_widget__metadata> *:first-child']: {
    color: '#0e0e10',
  },
  ['.goal_widget__metadata> *:last-child']: {
    color: '#53535f',
  },
};

const setDefaultSettings = () => {
  chrome.storage.sync.set(initValue, () => console.log('Init settings'));
};

const handleUpdatedTabs = (tabId, changeInfo, tab) => {
  if (
    tab.url.match(/https:\/\/dashboard.twitch.tv\/u\/.+\/stream-manager/gm) &&
    changeInfo.status === 'complete'
  ) {
    chrome.storage.sync.get(null, (settings) => {
      if (Object.keys(settings).length === 0) {
        setDefaultSettings();

        return;
      }
    });

    chrome.tabs.sendMessage(tabId, { message: 'listen' });
  }
};

const handleListener = (request) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const [tab] = tabs;
    if (tab) {
      const { id: tabId } = tab;

      if (request.message === 'clear') {
        setDefaultSettings();

        chrome.tabs.sendMessage(tabId, { message: 'update' });
      }
    }
  });
};

chrome.tabs.onUpdated.addListener(handleUpdatedTabs);

chrome.runtime.onMessage.addListener(handleListener);
