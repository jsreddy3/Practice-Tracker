import apiRequest from "./api.js";

export default class User {
  static async loadOrCreate(id) {
    let user = await apiRequest("GET", "/users/" + id);
    if (user.error) {
      user = await apiRequest("POST", "/users/", {"id":id});
      let practice = await apiRequest("POST", "/users/" + id + "/instrument", {id: id, instrument:"violin"});
    }

    let returnedUser = new User(user);
    return returnedUser;
  }

  constructor(data) {
    this.id = data.id;
    this.posts = data.posts;
  }

  async addPractice(data) {
    await apiRequest("POST", "/users/" + this.id + "/practices", data);
  }

  async getPractices() {
    let practices = await apiRequest("GET", "/users/" + this.id + "/practices");
    return practices["practices"];
  }

  async getInstrument() {
    let instrument = await apiRequest("GET", "/users/" + this.id + "/instrument");
    return instrument;
  }
}
