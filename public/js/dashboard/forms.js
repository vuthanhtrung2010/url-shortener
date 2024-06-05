// Create Redirect Form
const create = document.getElementById("create");
const createForm = document.getElementById("create-redirect-form");
const createBtn = document.getElementById("create-btn");

// Show Form
async function showCreate() {
  hideUpdate();
  hideDelete();

  create.classList.remove("hidden");

  createBtn.setAttribute("onclick", "hideCreate()");
  createBtn.innerHTML = "Close Form";
  createBtn.classList.remove("mb-6");

  createBtn.classList.remove("bg-green-600");
  createBtn.classList.add("bg-red-700");
  createBtn.classList.remove("hover:bg-green-700");
  createBtn.classList.add("hover:bg-red-800");
  createBtn.classList.remove("focus:ring-green-300");
  createBtn.classList.add("focus:ring-red-400");
}

// Hide Form
async function hideCreate() {
  create.classList.add("hidden");
  createForm.reset();

  createBtn.setAttribute("onclick", "showCreate()");
  createBtn.innerHTML = "Create Redirect";
  createBtn.classList.add("mb-6");

  createBtn.classList.remove("bg-red-700");
  createBtn.classList.add("bg-green-600");
  createBtn.classList.remove("hover:bg-red-800");
  createBtn.classList.add("hover:bg-green-700");
  createBtn.classList.remove("focus:ring-red-400");
  createBtn.classList.add("focus:ring-green-300");
}

// Update Redirect Form
const update = document.getElementById("update");
const updateForm = document.getElementById("update-redirect-form");
const updateBtn = document.getElementById("update-btn");

// Show Form
async function showUpdate() {
  hideCreate();
  hideDelete();

  update.classList.remove("hidden");

  updateBtn.setAttribute("onclick", "hideUpdate()");
  updateBtn.innerHTML = "Close Form";
  updateBtn.classList.remove("mb-6");

  updateBtn.classList.remove("bg-yellow-600");
  updateBtn.classList.add("bg-red-700");
  updateBtn.classList.remove("hover:bg-yellow-700");
  updateBtn.classList.add("hover:bg-red-800");
  updateBtn.classList.remove("focus:ring-yellow-300");
  updateBtn.classList.add("focus:ring-red-400");
}

// Hide Form
async function hideUpdate() {
  update.classList.add("hidden");
  updateForm.reset();

  updateBtn.setAttribute("onclick", "showUpdate()");
  updateBtn.innerHTML = "Update Redirect";
  updateBtn.classList.add("mb-6");

  updateBtn.classList.remove("bg-red-700");
  updateBtn.classList.add("bg-yellow-600");
  updateBtn.classList.remove("hover:bg-red-800");
  updateBtn.classList.add("hover:bg-yellow-700");
  updateBtn.classList.remove("focus:ring-red-400");
  updateBtn.classList.add("focus:ring-yellow-300");
}

// Delete Redirect Form
const del = document.getElementById("delete");
const deleteForm = document.getElementById("delete-redirect-form");
const deleteBtn = document.getElementById("delete-btn");

// Show Form
async function showDelete() {
  hideCreate();
  hideUpdate();

  del.classList.remove("hidden");

  deleteBtn.setAttribute("onclick", "hideDelete()");
  deleteBtn.innerHTML = "Close Form";
  deleteBtn.classList.remove("mb-6");

  deleteBtn.classList.remove("bg-red-600");
  deleteBtn.classList.add("bg-red-700");
  deleteBtn.classList.remove("hover:bg-red-700");
  deleteBtn.classList.add("hover:bg-red-800");
  deleteBtn.classList.remove("focus:ring-red-300");
  deleteBtn.classList.add("focus:ring-red-400");
}

// Hide Form
async function hideDelete() {
  del.classList.add("hidden");
  deleteForm.reset();

  deleteBtn.setAttribute("onclick", "showDelete()");
  deleteBtn.innerHTML = "Delete Redirect";
  deleteBtn.classList.add("mb-6");

  deleteBtn.classList.remove("bg-red-700");
  deleteBtn.classList.add("bg-red-600");
  deleteBtn.classList.remove("hover:bg-red-800");
  deleteBtn.classList.add("hover:bg-red-700");
  deleteBtn.classList.remove("focus:ring-red-400");
  deleteBtn.classList.add("focus:ring-red-300");
}
