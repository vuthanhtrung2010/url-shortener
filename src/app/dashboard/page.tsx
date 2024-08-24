"use client";

import { SuccessToast } from "@/components/Toasts/success";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { StarButton } from "@/components/star-button";
import { PasswordForm } from "@/components/Forms/password-from";
import { RedirectPathForm } from "@/components/Forms/redirect-path-form";
import { RedirectURLForm } from "@/components/Forms/redirect-url-form";
import { ErrorToast } from "@/components/Toasts/error";

export default function Dashboard() {
  const [isCreateShown, setIsCreateShown] = useState(false);
  const [isUpdateShown, setIsUpdateShown] = useState(false);
  const [isDeleteShown, setIsDeleteShown] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    url: string,
    method: string,
    successMessage: string,
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const submitButton = form.querySelector("button[type='submit']");

    if (submitButton) {
      submitButton.setAttribute("disabled", "true");
      submitButton.textContent = `${method.charAt(0).toUpperCase() + method.slice(1)
        }ing...`.replace(/e([^e]*)$/i, '$1');
    }

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    let result;
    let responseOk = response.ok;

    try {
      result = await response.json();
    } catch (error) {
      console.error(error);
      responseOk = false;
      result = { message: "An error occurred. Please try again later." };
    }

    if (submitButton) {
      submitButton.removeAttribute("disabled");
      submitButton.textContent = "Submit";
    }

    if (responseOk) {
      setMessage(successMessage);
      setShowSuccess(true);
      form.reset();
    } else {
      setMessage(result.message);
      setShowSuccess(false);
    }

    setTimeout(() => {
      setMessage("");
      setShowSuccess(false);
    }, 5000);
  };

  const toggleForm = (formType: "create" | "update" | "delete") => {
    setIsCreateShown(formType === "create" ? !isCreateShown : false);
    setIsUpdateShown(formType === "update" ? !isUpdateShown : false);
    setIsDeleteShown(formType === "delete" ? !isDeleteShown : false);
  };

  return (
    <div className="p-8 max-w-md m-auto text-white text-center bg-backgroundColor">
      <header className="mb-6">
        <h1
          style={{ fontFamily: "'Leckerli One', cursive", fontSize: "3rem" }}
          className="text-3xl font-bold"
        >
          Dashboard
        </h1>
      </header>

      <main>
        <div className="space-y-6">
          <div>
            <button
              className={`${isCreateShown ? "bg-red-700" : "bg-green-600"
                } hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-6`}
              onClick={() => toggleForm("create")}
            >
              {isCreateShown ? "Close Form" : "Create Redirect"}
            </button>
            {isCreateShown && (
              <div className="mt-6 mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <FontAwesomeIcon icon={faPlus} /> Create Redirect
                </h2>
                <form
                  onSubmit={(e) =>
                    handleFormSubmit(
                      e,
                      "/api/create",
                      "create",
                      "Redirect created successfully",
                    )
                  }
                >
                  <PasswordForm />
                  <RedirectPathForm required_form={false} />
                  <RedirectURLForm />
                  <StarButton />
                </form>
              </div>
            )}
          </div>

          <div>
            <button
              className={`${isUpdateShown ? "bg-red-700" : "bg-yellow-600"
                } hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-6`}
              onClick={() => toggleForm("update")}
            >
              {isUpdateShown ? "Close Form" : "Update Redirect"}
            </button>
            {isUpdateShown && (
              <div className="mt-6 mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <FontAwesomeIcon icon={faPenToSquare} /> Update Redirect
                </h2>
                <form
                  onSubmit={(e) =>
                    handleFormSubmit(
                      e,
                      "/api/update",
                      "update",
                      "Redirect updated successfully",
                    )
                  }
                >
                  <PasswordForm />
                  <RedirectPathForm required_form={true} />
                  <RedirectURLForm />
                  <StarButton />
                </form>
              </div>
            )}
          </div>

          <button
            className={`${isDeleteShown ? "bg-red-700" : "bg-red-600"
              } hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-6`}
            onClick={() => toggleForm("delete")}
          >
            {isDeleteShown ? "Close Form" : "Delete Redirect"}
          </button>
          {isDeleteShown && (
            <div className="mt-6 mb-10">
              <h2 className="text-2xl font-bold mb-4">
                <FontAwesomeIcon icon={faTrash} /> Delete Redirect
              </h2>
              <form
                onSubmit={(e) =>
                  handleFormSubmit(
                    e,
                    "/api/delete",
                    "delete",
                    "Redirect deleted successfully",
                  )
                }
              >
                <PasswordForm />
                <RedirectPathForm required_form={true} />
                <StarButton />
              </form>
            </div>
          )}
        </div>
        {message && (
          <div className="bottom-right space-y-3">
            {showSuccess ? <SuccessToast message={message} /> : <ErrorToast message={message} />}
          </div>
        )}
      </main>
    </div>
  );
}
