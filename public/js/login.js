import User from "./User.js";
import Practice from "./Practice.js";

const loginPractice = async () => {
  event.preventDefault();
  let loginForm = document.querySelector("#login");
  let user = await User.loadOrCreate(loginForm.userid.value);
  window.location.replace("practicelog.html");
}

const main = () => {
  document.querySelector("#login").addEventListener("submit", loginPractice);
};

main();
