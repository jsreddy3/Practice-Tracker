import Practice from "./Practice.js";
import User from "./User.js";

class InstrumentChoicePage {
  constructor() {
    this._user = null;
    this._updateButton = null;
    this._selectedInstrument = null;

    this._onReturn = this._onReturn.bind(this);
    this._onUpdate = this._onUpdate.bind(this);
  }

  setup() {
    this._updateButton = document.querySelector("#update");
    this._updateButton.addEventListener("click", this._onUpdate);

    let returnButton = document.querySelector("#backToLog");
    returnButton.addEventListener("click", this._onReturn);

    this._user = sessionStorage.getItem("user");
    this._selectedInstrument = sessionStorage.getItem("instrument");
    this._highlightSelected();
  }

  async _onUpdate() {
    let instruments = document.querySelectorAll("input");
    for (let instrument of instruments) {
      if (instrument.checked) {
        await apiRequest("PATCH", "/users/" + this._user + "/instrument", {instrument: instrument.id});
      }
    }
    window.location.replace("practicelog.html");
  }

  _onReturn() {
    window.location.replace("practicelog.html");
  }

  _highlightSelected() {
    let instruments = document.querySelectorAll("input");
    for (let instrument of instruments) {
      if (instrument.id == this._selectedInstrument) {
        instrument.checked = true;
      }
    }
  }
}

let instrumentChoice = new InstrumentChoicePage();
instrumentChoice.setup();
