// Create Redirect
const createSubmitBtn = document.getElementById("create-submit-btn");

const createData = {
  password: document.getElementById("create-password"),
  path: document.getElementById("create-path"),
  redirect: document.getElementById("create-redirect"),
  redirect_path: document.getElementById("create-redirect-path"),
};

async function createRedirect() {
  event.preventDefault();

  createSubmitBtn.setAttribute("disabled", true);
  createSubmitBtn.innerHTML = "Creating Redirect...";

  fetch("/api/redirects", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      password: createData.password.value,
    },
    body: JSON.stringify({
      path: createData.path.value,
      redirect: createData.redirect.value,
      redirect_path: createData.redirect_path.checked,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      createForm.reset();

      createForm.classList.add("hidden");

      createSubmitBtn.removeAttribute("disabled");
      createSubmitBtn.innerHTML = "Submit";

      if (data.code === "CREATED_REDIRECT") {
        document.getElementById("created-redirect").classList.remove("hidden");

        setTimeout(() => {
          document.getElementById("created-redirect").classList.add("hidden");
          createForm.classList.remove("hidden");
        }, 2500);
        return;
      }

      document.getElementById("create-error").classList.remove("hidden");
      document.getElementById("create-error-text").innerHTML = data.message;

      setTimeout(() => {
        document.getElementById("create-error").classList.add("hidden");
        document.getElementById("create-error-text").innerHTML = "";

        createForm.classList.remove("hidden");
      }, 2500);
    });
}

// Update Redirect
const updateSubmitBtn = document.getElementById("update-submit-btn");

const updateData = {
  password: document.getElementById("update-password"),
  path: document.getElementById("update-path"),
  redirect: document.getElementById("update-redirect"),
  redirect_path: document.getElementById("update-redirect-path"),
};

async function updateRedirect() {
  event.preventDefault();

  updateSubmitBtn.setAttribute("disabled", true);
  updateSubmitBtn.innerHTML = "Updating Redirect...";

  fetch("/api/redirects", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      password: updateData.password.value,
    },
    body: JSON.stringify({
      path: updateData.path.value,
      redirect: updateData.redirect.value,
      redirect_path: updateData.redirect_path.checked,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      updateForm.reset();

      updateForm.classList.add("hidden");

      updateSubmitBtn.removeAttribute("disabled");
      updateSubmitBtn.innerHTML = "Submit";

      if (data.code === "UPDATED_REDIRECT") {
        document.getElementById("updated-redirect").classList.remove("hidden");

        setTimeout(() => {
          document.getElementById("updated-redirect").classList.add("hidden");
          updateForm.classList.remove("hidden");
        }, 2500);
        return;
      }

      document.getElementById("update-error").classList.remove("hidden");
      document.getElementById("update-error-text").innerHTML = data.message;

      setTimeout(() => {
        document.getElementById("update-error").classList.add("hidden");
        document.getElementById("update-error-text").innerHTML = "";

        updateForm.classList.remove("hidden");
      }, 2500);
    });
}

// Delete Redirect
const deleteSubmitBtn = document.getElementById("delete-submit-btn");

const deleteData = {
  password: document.getElementById("delete-password"),
  path: document.getElementById("delete-path"),
};

async function deleteRedirect() {
  event.preventDefault();

  deleteSubmitBtn.setAttribute("disabled", true);
  deleteSubmitBtn.innerHTML = "Deleting Redirect...";

  fetch("/api/redirects", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      password: deleteData.password.value,
      path: deleteData.path.value,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      deleteForm.reset();

      deleteForm.classList.add("hidden");

      deleteSubmitBtn.removeAttribute("disabled");
      deleteSubmitBtn.innerHTML = "Submit";

      if (data.code === "DELETED_REDIRECT") {
        document.getElementById("deleted-redirect").classList.remove("hidden");

        setTimeout(() => {
          document.getElementById("deleted-redirect").classList.add("hidden");
          deleteForm.classList.remove("hidden");
        }, 2500);
        return;
      }

      document.getElementById("delete-error").classList.remove("hidden");
      document.getElementById("delete-error-text").innerHTML = data.message;

      setTimeout(() => {
        document.getElementById("delete-error").classList.add("hidden");
        document.getElementById("delete-error-text").innerHTML = "";

        deleteForm.classList.remove("hidden");
      }, 2500);
    });
}
