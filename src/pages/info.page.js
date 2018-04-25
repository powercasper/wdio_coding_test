class InfoPage {
  get locators() {
    return {
      email:  "#email",
      url:    "#url",
      phone:  "#phone",
      buildJSONButton: "button#buildJSON",
      jsonOutput: "#json_output",
      showChats: "button#showChats",
      newChats: "#myChats ul:last-child li"
    }
  }
  get emailText() {
    browser.waitForVisible(this.locators.email, 3000);
    return browser.getText(this.locators.email);
  }
  get urlText() {
    browser.waitForVisible(this.locators.url, 3000);
    return browser.getText(this.locators.url);
  }
  get phoneText() {
    browser.waitForVisible(this.locators.phone, 3000);
    return browser.getText(this.locators.phone);
  }
  get jsonButton() {
    browser.waitForVisible(this.locators.buildJSONButton, 3000);
    return browser.element(this.locators.buildJSONButton);  
  }
  get jsonOutput() {
    browser.waitForVisible(this.locators.showChats, 3000);
    return browser.getText(this.locators.jsonOutput);  
  }
  get showChats() {
    browser.waitForVisible(this.locators.showChats, 3000);
    return browser.element(this.locators.showChats);   
  }
  parseData() {
    return {
      email:  parseInt(this.emailText.split('@')[0]),
      url:    parseInt(this.urlText.split('/')[4]),
      phone:  parseInt(this.phoneText.split('ext ')[1])
    }
  }
  parseJson() {
    this.jsonButton.click();
    let jsonOutput = JSON.parse(this.jsonOutput);

    return {
      email:  parseInt(jsonOutput.email.split('@')[0]),
      url:    parseInt(jsonOutput.url.split('/')[4]),
      phone:  parseInt(jsonOutput.phone.split('ext ')[1])
    }
  }
  parseNewChats() {
    browser.waitForVisible(this.locators.newChats, 5000);
    let chats = browser.$$(`${this.locators.newChats}`).reduce((elements, elem) => {
      let elementText = elem.getText().split(' @');
      let timeAndMessage = elementText[1].split('\n')
      let [time, message] = [timeAndMessage[0], timeAndMessage[1]]
      let parsedText = { sender: elementText[0], time, message }
      elements.push(parsedText);
      return elements;
    }, []);
    return chats;
  }
}

export default InfoPage;
