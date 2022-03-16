export default class Practice {
  constructor(data) {
    this.user = data.user;
    this.location = data.location;
    this.day = data.day;

    this._from = data.from;
    this._to = data.to;

    this.fromDate = null;
    this.toDate = null;
    this._convertToDate();
  }

  addToDom(parent) {
    let item = this._createPractice();
    parent.append(item);
  }

  _convertToDate(timeFrom, timeTo) {
    let currDate = new Date();

    let inputDate = this.day.split(" ");
    let day = parseInt(inputDate[1]);
    this.day = day;
    let month = this._stringToMonth(inputDate[0]);

    let inputFrom = this._from.split(" ");
    let inputTo = this._to.split(" ");
    if (inputFrom[1] == "PM" && inputFrom[0] != "12") {
      this._from = parseInt(inputFrom[0]) + 12;
    } else {
      this._from = parseInt(inputFrom[0]);
    }
    if (inputTo[1] == "PM" && inputTo[0] != "12") {
      this._to = parseInt(inputTo[0]) + 12;
    } else {
      this._to = parseInt(inputTo[0]);
    }

    this.fromDate = new Date(currDate.getYear(), month, this.day, this._from);
    this.toDate = new Date(currDate.getYear(), month, this.day, this._to);
  }

  _createPractice() {
    let templatePractice = document.querySelector(".template");
    let newPractice = templatePractice.cloneNode(true);
    newPractice.classList.remove("template");
    newPractice.classList.add("loggedPractice");

    newPractice.querySelector("#practiceDate").textContent = "Day: " + String(this.fromDate.getMonth() + 1) + "/" + String(this.day);
    newPractice.querySelector("#practiceDuration").textContent = "Duration: " + String(this.toDate.getHours() - this.fromDate.getHours())  + " Hrs";
    newPractice.querySelector("#practiceLocation").textContent = "Location: " + this.location;

    return newPractice;
  }

  _stringToMonth(str) {
    return new Date(Date.parse(str +" 1, 2022")).getMonth();
  }
}
