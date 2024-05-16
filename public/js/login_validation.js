const nodeById = (id) => document.getElementById(id);
const nodeByQuery = (query) => document.querySelectorAll(query);
const password_inputs = nodeByQuery("input[type='password']");
const showHidePass = nodeById("showHighPass");
const show_pass = nodeById("show_pass");
const hide_pass = nodeById("hide_pass");
let password_show = false;
const registerBtn = nodeById("registerBtn");
const forgotBtn = nodeById("forgotBtn");
const submitLogin = nodeById("submit-button")


const showhidepassword = () => {
  if (!password_show) {
      Array.from(password_inputs).map((ele) => {
          if (ele.type !== "hidden") ele.type = "text";
      });
      password_show = true;
      hide_pass.classList.remove("hidden");
      show_pass.classList.add("hidden");
  } else {
      Array.from(password_inputs).map((ele) => {
          if (ele.type !== "hidden") ele.type = "password";
      });
      password_show = false;
      hide_pass.classList.add("hidden");
      show_pass.classList.remove("hidden");
  }
}

function errorHandler(errorfield, message) {
  errorfield.style.display = "block";
  errorfield.textContent = message;
}
function validateForm() {
  let sapn = document.querySelectorAll("span");
  sapn.forEach((span) => {
    span.style.display = "none";
    span.classList.add("text-red-600");
  });

  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let passwordError = document.querySelector(".passwordError");
  let errorEmail = document.querySelector(".errorEmail");

  if (email.value == "") {
    errorHandler(errorEmail, "email is required");
    return false;
  } else {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.value.match(mailformat)) {
      errorHandler(errorEmail, "Enter Valid Email");
      isValid = false;
      return false;
    }
  }
  if (password.value == "") {
    errorHandler(passwordError, "Password is required");
    return false;
  }
  window.location.href = "/dashboard"
  return true;
  
}
submitLogin.addEventListener("click", () => validateForm())
showHidePass.addEventListener("click", () => showhidepassword());
forgotBtn.addEventListener("click",()=> window.location.pathname = "/auth/forgot_password");
registerBtn.addEventListener("click", ()=>window.location.pathname = "/register");