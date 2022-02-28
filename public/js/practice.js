export default class Practice {
  constructor(data) {
    this.user = data.user;
    this.day = data.day;
    this.timeFrom = data.from;
    this.timeTo = data.to;
    this.location = data.location;
  }

  addToDom(parent) {
    let item = this._createPractice();
    parent.append(item);
  }

  _createPractice() {
    let container = document.createElement("div");
    container.classList.add("loggedPractice");

    let paragraphHeader = document.createElement("h4");
    container.append(paragraphHeader);
    paragraphHeader.innerHTML = "Logged Practice Session:"

    let paragraph = document.createElement("p");
    container.append(paragraph);
    paragraph.innerHTML = "On " + this.day + ", you practiced from " + this.timeFrom + " to " + this.timeTo + " at " + this.location + ".";

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    container.append(editButton);

    return container;
  }
}
