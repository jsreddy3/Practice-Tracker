import Practice from "./Practice.js";
import User from "./User.js";

class Log {
  constructor() {
    this._user = null;
    this._practiceForm = null;
    this._onCreatePractice = this._onCreatePractice.bind(this);
  }

  setup() {
    this._practiceForm = document.querySelector("#createPractice");
    this._practiceForm.addEventListener("submit", this._onCreatePractice);
    this._addUsername();

  }

  async _addUsername() {
    let user_name = sessionStorage.getItem("user")
    document.querySelector("#username").innerText = user_name;
    this._user = await User.loadOrCreate(user_name);
    this._loadPractices();
  }

  async _onAddPractice() {
    
  }

  async _onCreatePractice() {
    event.preventDefault();
    let practiceData = {
      id: this._user.id,
      day: this._practiceForm.day.value,
      from: this._practiceForm.from.value,
      to: this._practiceForm.to.value,
      location: this._practiceForm.location.value
    }
    await this._user.addPractice(practiceData);
    let newPractice = new Practice(practiceData);
    this._loadPractices();
  }

  async _loadPractices() {
    let logSection = document.querySelector("#loggedPractices");
    while (logSection.firstChild) {
      logSection.removeChild(logSection.firstChild);
    }
    let practices = await this._user.getPractices();
    console.log(practices);
    for (let practice of practices) {
      let practiceData = {
        id: practice.user,
        day: practice.day,
        from: practice.from,
        to: practice.to,
        location: practice.location
      }
      let newPractice = new Practice(practiceData);
      let logSection = document.querySelector("#loggedPractices");
      newPractice.addToDom(logSection);
    }
  }
}

let log = new Log();
log.setup();
