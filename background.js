class Css {
  static of(json) {
    const selectors = Object.keys(json);
    return selectors
      .map((selector) => {
        const definition = json[selector];
        const rules = Object.keys(definition);
        const result = rules
          .map((rule) => {
            return `${rule}:${definition[rule]}`;
          })
          .join(';');
        return `${selector}{${result}}`;
      })
      .join('\n');
  }
}

const initValue = {
  ['.Layout-sc-nxg1ff-0.kLKpNe.goal_widget']: {
    ['border-color']: '#000000',
    ['background-color']: '#ffffff',
    ['border-width']: '5px',
    ['border-radius']: '30px',
  },
  ['.Layout-sc-nxg1ff-0.DxHxY.goal_widget__progress_bar']: {
    ['background-color']: '#bf94ff',
  },
  ['.goal_widget__image.tw-image']: {
    content:
      'https://static.twitchcdn.net/assets/subscribe-2d3225207e704bd2aa2d.svg',
  },
  ['.Layout-sc-nxg1ff-0.dgBHOj.goal_widget__body .Layout-sc-nxg1ff-0.xAfNg']: {
    color: '#0e0e10',
  },
  ['.Layout-sc-nxg1ff-0.jqfenf.goal_widget__contributions']: {
    color: '#53535f',
  },
};

const insertCSS = (tabId, objOfCss) => {
  const css = Css.of(objOfCss);

  chrome.scripting.insertCSS(
    {
      target: { tabId },
      css: css,
    },
    () => {
      console.log('CSS is loading!');
    }
  );
};

const setDefaultSettings = (tabId) => {
  chrome.storage.sync.set(initValue, () => {
    insertCSS(tabId, initValue);

    console.log('Init settings');
  });
};

const handleUpdatedTabs = (tabId, changeInfo, tab) => {
  if (
    tab.url.match(/https:\/\/dashboard.twitch.tv\/u\/.+\/stream-manager/gm) &&
    changeInfo.status === 'complete'
  ) {
    chrome.storage.sync.get(null, (settings) => {
      if (Object.keys(settings).length === 0) {
        setDefaultSettings(tabId);

        return;
      }

      insertCSS(tabId, settings);
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
        setDefaultSettings(tabId);

        chrome.tabs.sendMessage(tabId, { message: 'update' });
      }

      if (request.message === 'save') {
        const { settings } = request;

        insertCSS(tabId, settings);
      }
    }
  });
};

chrome.tabs.onUpdated.addListener(handleUpdatedTabs);

chrome.runtime.onMessage.addListener(handleListener);
