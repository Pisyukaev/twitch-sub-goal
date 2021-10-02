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

// CONSTANTS
const INPUT_CLASS =
  'ScInputBase-sc-1wz0osy-0 ScInput-sc-m6vr9t-0 XFvNK InjectLayout-sc-588ddc-0 tw-input twitch-input';
const LABEL_CLASS = 'ScFormLabel-sc-1oiqww5-0 joDIoX tw-form-label label';
const TEXTAREA_CLASS =
  'ScInputBase-sc-1wz0osy-0 ScTextArea-sc-1ywwys8-0 kYJGMC InjectLayout-sc-588ddc-0 iZLAMf tw-textarea tw-textarea--no-resize';
const BTN_CLASS =
  'ScCoreButton-sc-1qn4ixc-0 ScCoreButtonDestructive-sc-1qn4ixc-4 iIWcIf clear-settings-btn';
const WIDGET = '.goal_widget';
const PROGRESS_BAR = '.goal_widget__progress_bar';
const IMAGE = '.goal_widget__image.tw-image';
const LEFT_TEXT = '.goal_widget__metadata> *:first-child';
const RIGHT_TEXT = '.goal_widget__metadata> *:last-child';

let isMounted = false;

const createOption = ({
  tagName,
  name,
  id,
  className,
  labelText,
  tagType,
  onChange,
  onInput,
}) => {
  const option = document.createElement('div');
  option.className = 'settings-option';
  const label = document.createElement('label');
  label.className = LABEL_CLASS;
  label.textContent = labelText;
  const tag = document.createElement(tagName);
  tag.name = name;

  if (onChange) {
    tag.onchange = onChange;
  }

  if (onInput) {
    tag.oninput = onInput;
  }

  if (tagType) {
    tag.type = tagType;
  }

  if (className) {
    tag.className = className;
  }

  if (id) {
    tag.id = id;
  }

  option.appendChild(label);
  option.appendChild(tag);

  return option;
};

const updateSettings = () => {
  chrome.storage.sync.get(null, (settings) => {
    if (Object.keys(settings).length === 0) {
      return;
    }

    const {
      [WIDGET]: widget,
      [PROGRESS_BAR]: pg,
      [IMAGE]: image,
      [LEFT_TEXT]: leftText,
      [RIGHT_TEXT]: rightText,
    } = settings;

    const wbc = document.getElementById('widget-border-color');
    const wbw = document.getElementById('widget-border-width');
    const wbr = document.getElementById('widget-border-radius');
    const wbg = document.getElementById('widget-background-color');
    const progressBar = document.getElementById('pg-background-color');
    const img = document.getElementById('img-content');
    const lt = document.getElementById('lt-color');
    const rt = document.getElementById('rt-color');

    wbc.value = widget['border-color'];
    wbw.value = parseInt(widget['border-width']);
    wbr.value = parseInt(widget['border-radius']);
    wbg.value = widget['background-color'];
    progressBar.value = pg['background-color'];
    img.value = image['content'].match(/\b(https?:\/\/\S*\b)/g)[0];
    lt.value = leftText['color'];
    rt.value = rightText['color'];

    const cssStyles = Css.of(settings);

    const textArea = document.getElementById('textarea-sub-goal');
    textArea.value = cssStyles;
  });
};

const handleWidgetMounted = () => {
  const dialog = document.querySelector('.tw-modal');

  const settingsContainer = document.createElement('div');
  settingsContainer.className = 'Layout-sc-nxg1ff-0 gLWtoa settings-container';

  const textArea = createOption({
    id: 'textarea-sub-goal',
    tagName: 'textarea',
    name: 'color',
    labelText: 'CSS',
    className: TEXTAREA_CLASS,
  });

  const handleSaveOption =
    (className) =>
    ({ target: { value, name } }) => {
      chrome.storage.sync.get(null, (item) => {
        const isNumber = value == Number(value);
        const isImg = className === IMAGE;
        const prevOptions = item[className];
        const newOptions = {
          ...item,
          [className]: {
            ...prevOptions,
            [name]: isNumber ? `${value}px` : isImg ? `url(${value})` : value,
          },
        };

        const cssStyles = Css.of(newOptions);
        const textAreaCSS = document.getElementById('textarea-sub-goal');

        textAreaCSS.value = cssStyles;

        chrome.storage.sync.set(newOptions, () => {
          console.log(
            `Set option ${name}: ${value} for classname ${className}`
          );
        });

        chrome.runtime.sendMessage({ message: 'save', settings: newOptions });
      });
    };

  const borderColor = createOption({
    id: 'widget-border-color',
    tagName: 'input',
    name: 'border-color',
    tagType: 'color',
    labelText: 'Border color',
    onChange: handleSaveOption(WIDGET),
  });

  const borderWidth = createOption({
    id: 'widget-border-width',
    tagName: 'input',
    name: 'border-width',
    tagType: 'number',
    labelText: 'Border width',
    className: INPUT_CLASS,
    onChange: handleSaveOption(WIDGET),
  });

  const borderRadius = createOption({
    id: 'widget-border-radius',
    tagName: 'input',
    name: 'border-radius',
    tagType: 'number',
    labelText: 'Border radius',
    className: INPUT_CLASS,
    onChange: handleSaveOption(WIDGET),
  });

  const containerBGColor = createOption({
    id: 'widget-background-color',
    tagName: 'input',
    name: 'background-color',
    tagType: 'color',
    labelText: 'Progress bar background color',
    onChange: handleSaveOption(WIDGET),
  });

  const progressBarColor = createOption({
    id: 'pg-background-color',
    tagName: 'input',
    name: 'background-color',
    tagType: 'color',
    labelText: 'Progress bar color',
    onChange: handleSaveOption(PROGRESS_BAR),
  });

  const image = createOption({
    id: 'img-content',
    tagName: 'input',
    name: 'content',
    tagType: 'text',
    labelText: 'Image',
    className: `${INPUT_CLASS} image-input`,
    onChange: handleSaveOption(IMAGE),
  });

  const leftTextColor = createOption({
    id: 'lt-color',
    tagName: 'input',
    name: 'color',
    tagType: 'color',
    labelText: 'Left text',
    onChange: handleSaveOption(LEFT_TEXT),
  });

  const rightTextColor = createOption({
    id: 'rt-color',
    tagName: 'input',
    name: 'color',
    tagType: 'color',
    labelText: 'Right text',
    onChange: handleSaveOption(RIGHT_TEXT),
  });

  const clearButton = document.createElement('button');
  clearButton.textContent = 'DEFAULT';
  clearButton.className = BTN_CLASS;
  clearButton.onclick = () => {
    chrome.runtime.sendMessage({ message: 'clear' });
  };

  settingsContainer.appendChild(borderColor);
  settingsContainer.appendChild(borderWidth);
  settingsContainer.appendChild(borderRadius);
  settingsContainer.appendChild(containerBGColor);
  settingsContainer.appendChild(progressBarColor);
  settingsContainer.appendChild(image);
  settingsContainer.appendChild(leftTextColor);
  settingsContainer.appendChild(rightTextColor);
  settingsContainer.appendChild(textArea);
  settingsContainer.appendChild(clearButton);

  dialog.appendChild(settingsContainer);

  updateSettings();
};

const handleListener = (request) => {
  if (request.message === 'listen' && !isMounted) {
    isMounted = true;
    document.arrive('.goal_widget', handleWidgetMounted);
  }

  if (request.message === 'update') {
    updateSettings();
  }

  return true;
};

chrome.runtime.onMessage.addListener(handleListener);
