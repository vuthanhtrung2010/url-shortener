import { useState } from "react";
import { Form, MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to my URL Shortener" },
  ];
};

export default function Dashboard() {
  const [isCreateShown, setCreateShown] = useState(false);
  const [isUpdateShown, setUpdateShown] = useState(false);
  const [isDeleteShown, setDeleteShown] = useState(false);
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    url: string,
    method: string,
    successMessage: string
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const submitButton = form.querySelector("button[type='submit']");

    if (submitButton) {
      submitButton.setAttribute("disabled", "true");
      submitButton.textContent = `${method.charAt(0).toUpperCase() + method.slice(1)}ing...`;
    }

    const response = await fetch(url, {
      method,
      body: formData,
    });

    const result = await response.json();

    if (submitButton) {
      submitButton.removeAttribute("disabled");
      submitButton.textContent = "Submit";
    }

    if (response.ok) {
      setMessage(successMessage);
      form.reset();
    } else {
      setMessage(result.message);
    }

    setTimeout(() => setMessage(""), 2500);
  };

  const toggleForm = (formType: "create" | "update" | "delete") => {
    setCreateShown(formType === "create" ? !isCreateShown : false);
    setUpdateShown(formType === "update" ? !isUpdateShown : false);
    setDeleteShown(formType === "delete" ? !isDeleteShown : false);
  };

  return (
    <div className="p-8 max-w-md m-auto bg-zinc-900 text-white text-center">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>

      <main>
        <div className="space-y-6">
          <div>
            <button
              className={`${
                isCreateShown ? "bg-red-700" : "bg-green-600"
              } hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-6`}
              onClick={() => toggleForm("create")}
            >
              {isCreateShown ? "Close Form" : "Create Redirect"}
            </button>
            {isCreateShown && (
              <div className="mt-6 mb-10">
                <h2 className="text-2xl font-bold mb-4">Create Redirect</h2>
                <Form method="post" onSubmit={(e) => handleFormSubmit(e, "/api/create", "POST", "Redirect created successfully")}>
                  <input
                    type="password"
                    name="password"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 mb-4"
                    placeholder="Password"
                    required
                  />
                  <input
                    type="text"
                    name="alias"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 mb-4"
                    placeholder="Redirect path"
                    required
                  />
                  <input
                    type="url"
                    name="url"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 mb-6"
                    placeholder="Redirect URL"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Submit
                  </button>
                </Form>
              </div>
            )}
          </div>

          <div>
            <button
              className={`${
                isUpdateShown ? "bg-red-700" : "bg-yellow-600"
              } hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-6`}
              onClick={() => toggleForm("update")}
            >
              {isUpdateShown ? "Close Form" : "Update Redirect"}
            </button>
            {isUpdateShown && (
              <div className="mt-6 mb-10">
                <h2 className="text-2xl font-bold mb-4">Update Redirect</h2>
                <Form method="post" onSubmit={(e) => handleFormSubmit(e, "/api/update", "PATCH", "Redirect updated successfully")}>
                  <input
                    type="password"
                    name="password"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 mb-4"
                    placeholder="Password"
                    required
                  />
                  <input
                    type="text"
                    name="alias"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 mb-4"
                    placeholder="Redirect path"
                    required
                  />
                  <input
                    type="url"
                    name="url"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 mb-6"
                    placeholder="Redirect URL"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Submit
                  </button>
                </Form>
              </div>
            )}
          </div>

          <button
            className={`${
              isDeleteShown ? "bg-red-700" : "bg-red-600"
            } hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-6`}
            onClick={() => toggleForm("delete")}
          >
            {isDeleteShown ? "Close Form" : "Delete Redirect"}
          </button>
          {isDeleteShown && (
            <div className="mt-6 mb-10">
              <h2 className="text-2xl font-bold mb-4">Delete Redirect</h2>
              <Form method="post" onSubmit={(e) => handleFormSubmit(e, "/api/delete", "DELETE", "Redirect deleted successfully")}>
                <input
                  type="password"
                  name="password"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 mb-4"
                  placeholder="Password"
                  required
                />
                <input
                  type="text"
                  name="alias"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 mb-4"
                  placeholder="Redirect path"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              </Form>
            </div>
          )}
        </div>
        {message && (
          <div
            className={`mt-4 p-4 ${message.includes("successfully") ? "bg-green-600" : "bg-red-600"} text-white rounded-lg`}
          >
            {message}
          </div>
        )}
      </main>
    </div>
  );
}
