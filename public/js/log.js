import Practice from "./practice.js";

class Log {
  constructor() {
    this._user = null;
    this._practiceForm = null;

    this._onCreatePractice = this._onCreatePractice.bind(this);
  }

  setup() {
    this._practiceForm = document.querySelector("#createPractice");
    this._practiceForm.addEventListener("submit", this._onCreatePractice);
  }

  _onCreatePractice() {
    event.preventDefault();
    let practiceData = {
      user: this._user,
      day: this._practiceForm.day.value,
      from: this._practiceForm.from.value,
      to: this._practiceForm.to.value,
      location: this._practiceForm.location.value
    }
    let newPractice = new Practice(practiceData);
    let logSection = document.querySelector("#prevPractices");
    newPractice.addToDom(logSection);
  }
}

let log = new Log();
log.setup();
