import Practice from "./Practice.js";
import User from "./User.js";

class Log {
  constructor() {
    this._user = null;
    this._practiceForm = null;

    this._onCreatePractice = this._onCreatePractice.bind(this);
    this._onAddPractice = this._onAddPractice.bind(this);
    this._onLogOut = this._onLogOut.bind(this);
    this._onInstrument = this._onInstrument.bind(this);
  }

  setup() {
    this._practiceForm = document.querySelector("#createPractice");
    this._practiceForm.addEventListener("submit", this._onCreatePractice);

    let addPracticeButton = document.querySelector("#practiceLog");
    addPracticeButton.addEventListener("click", this._onAddPractice);

    let logOutButton = document.querySelector("#logOut");
    logOutButton.addEventListener("click", this._onLogOut);

    let instrumentButton = document.querySelector("#instrument");
    instrumentButton.addEventListener("click", this._onInstrument);
    this._addUsername();
  }

  async _addUsername() {
    let user_name = sessionStorage.getItem("user");
    document.querySelector("#username").innerText = user_name;
    this._user = await User.loadOrCreate(user_name);
    this._loadPractices();
  }

  _onInstrument() {
    window.location.replace("instruments.html");
  }

  _onLogOut() {
    window.location.replace("index.html");
  }

  _convertToString(hour) {
    if (hour >= 24 || hour == 0) {
      hour = "12 AM";
    } else if (hour > 12) {
      hour = (hour - 12) + " PM";
    } else if (hour == 12) {
      hour += " PM";
    } else {
      hour += " AM";
    }

    return hour;
  }

  // create default practice using current hour, one hour after current hour
  _onAddPractice() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let currDate = new Date();
    this._practiceForm.day.value = months[currDate.getMonth()] + " " + currDate.getDate();
    let hourFrom = currDate.getHours();
    // avoid edge cases involving midnight, as date objects don't handle this nicely
    if (hourFrom == 23) {
      hourFrom--;
    }
    if (hourFrom == 0) {
      hourFrom++;
    }
    let hourTo = hourFrom + 1;

    this._practiceForm.from.value = this._convertToString(hourFrom);
    this._practiceForm.to.value = this._convertToString(hourTo);
    this._practiceForm.location.value = "Home";
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
    this._practiceForm.reset();
  }

  async _loadPractices() {
    let logSection = document.querySelector("#loggedPractices");
    while (logSection.firstChild) {
      logSection.removeChild(logSection.firstChild);
    }
    let practices = await this._user.getPractices();
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
