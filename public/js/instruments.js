import Practice from "./Practice.js";
import User from "./User.js";

class InstrumentChoicePage {
  constructor() {
    this._user = null;
    this._updateButton = null;

    this._onReturn = this._onReturn.bind(this);
  }

  setup() {
    this._updateButton = document.querySelector("#update");
    this._updateButton.addEventListener("click", this._onUpdate);

    let returnButton = document.querySelector("#backToLog");
    returnButton.addEventListener("click", this._onReturn);
  }

  _onReturn() {
    window.location.replace("practicelog.html");
  }
}

let instrumentChoice = new InstrumentChoicePage();
instrumentChoice.setup();
