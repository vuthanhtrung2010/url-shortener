"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

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
      submitButton.textContent = `${
        method.charAt(0).toUpperCase() + method.slice(1)
      }ing...`;
    }

    const response = await fetch(url, {
      method,
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
    }, 2500);
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
              className={`${
                isCreateShown ? "bg-red-700" : "bg-green-600"
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
                      "POST",
                      "Redirect created successfully",
                    )
                  }
                >
                  <div className="form-input mb-4">
                    <input
                      type="password"
                      name="password"
                      className="w-full text-sm"
                      required
                    />
                    <label>
                      <span style={{ transitionDelay: "0ms" }}>P</span>
                      <span style={{ transitionDelay: "50ms" }}>a</span>
                      <span style={{ transitionDelay: "100ms" }}>s</span>
                      <span style={{ transitionDelay: "150ms" }}>s</span>
                      <span style={{ transitionDelay: "200ms" }}>w</span>
                      <span style={{ transitionDelay: "250ms" }}>o</span>
                      <span style={{ transitionDelay: "300ms" }}>r</span>
                      <span style={{ transitionDelay: "350ms" }}>d</span>
                    </label>
                    <span className="input-border"></span>
                  </div>
                  <div className="form-input mb-4">
                    <input
                      type="text"
                      name="alias"
                      className="w-full text-sm"
                      required
                    />
                    <label>
                      <span style={{ transitionDelay: "0ms" }}>R</span>
                      <span style={{ transitionDelay: "50ms" }}>e</span>
                      <span style={{ transitionDelay: "100ms" }}>d</span>
                      <span style={{ transitionDelay: "150ms" }}>i</span>
                      <span style={{ transitionDelay: "200ms" }}>r</span>
                      <span style={{ transitionDelay: "250ms" }}>e</span>
                      <span style={{ transitionDelay: "300ms" }}>c</span>
                      <span style={{ transitionDelay: "350ms" }}>t</span>
                      <span style={{ transitionDelay: "400ms" }}> </span>
                      <span style={{ transitionDelay: "450ms" }}>P</span>
                      <span style={{ transitionDelay: "500ms" }}>a</span>
                      <span style={{ transitionDelay: "550ms" }}>t</span>
                      <span style={{ transitionDelay: "600ms" }}>h</span>
                    </label>
                    <span className="input-border"></span>
                  </div>
                  <div className="form-input mb-6">
                    <input
                      type="url"
                      name="url"
                      className="w-full text-sm"
                      required
                    />
                    <label>
                      <span style={{ transitionDelay: "0ms" }}>R</span>
                      <span style={{ transitionDelay: "50ms" }}>e</span>
                      <span style={{ transitionDelay: "100ms" }}>d</span>
                      <span style={{ transitionDelay: "150ms" }}>i</span>
                      <span style={{ transitionDelay: "200ms" }}>r</span>
                      <span style={{ transitionDelay: "250ms" }}>e</span>
                      <span style={{ transitionDelay: "300ms" }}>c</span>
                      <span style={{ transitionDelay: "350ms" }}>t</span>
                      <span style={{ transitionDelay: "400ms" }}> </span>
                      <span style={{ transitionDelay: "450ms" }}>U</span>
                      <span style={{ transitionDelay: "500ms" }}>R</span>
                      <span style={{ transitionDelay: "550ms" }}>L</span>
                    </label>
                    <span className="input-border"></span>
                  </div>
                  <button className="star-button" type="submit">
                    Submit
                    <div className="star-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        version="1.1"
                        className="svg-style"
                        viewBox="0 0 784.11 815.53"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs></defs>
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="star-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        version="1.1"
                        className="svg-style"
                        viewBox="0 0 784.11 815.53"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs></defs>
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="star-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        version="1.1"
                        className="svg-style"
                        viewBox="0 0 784.11 815.53"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs></defs>
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="star-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        version="1.1"
                        className="svg-style"
                        viewBox="0 0 784.11 815.53"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs></defs>
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="star-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        version="1.1"
                        className="svg-style"
                        viewBox="0 0 784.11 815.53"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs></defs>
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="star-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        version="1.1"
                        className="svg-style"
                        viewBox="0 0 784.11 815.53"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs></defs>
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </button>
                </form>
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
                <h2 className="text-2xl font-bold mb-4">
                  <FontAwesomeIcon icon={faPenToSquare} /> Update Redirect
                </h2>
                <form
                  onSubmit={(e) =>
                    handleFormSubmit(
                      e,
                      "/api/update",
                      "PATCH",
                      "Redirect updated successfully",
                    )
                  }
                >
                  <div className="form-input mb-4">
                    <input
                      type="password"
                      name="password"
                      className="w-full text-sm"
                      required
                    />
                    <label>
                      <span style={{ transitionDelay: "0ms" }}>P</span>
                      <span style={{ transitionDelay: "50ms" }}>a</span>
                      <span style={{ transitionDelay: "100ms" }}>s</span>
                      <span style={{ transitionDelay: "150ms" }}>s</span>
                      <span style={{ transitionDelay: "200ms" }}>w</span>
                      <span style={{ transitionDelay: "250ms" }}>o</span>
                      <span style={{ transitionDelay: "300ms" }}>r</span>
                      <span style={{ transitionDelay: "350ms" }}>d</span>
                    </label>
                    <span className="input-border"></span>
                  </div>
                  <div className="form-input mb-4">
                    <input
                      type="text"
                      name="alias"
                      className="w-full text-sm"
                      required
                    />
                    <label>
                      <span style={{ transitionDelay: "0ms" }}>R</span>
                      <span style={{ transitionDelay: "50ms" }}>e</span>
                      <span style={{ transitionDelay: "100ms" }}>d</span>
                      <span style={{ transitionDelay: "150ms" }}>i</span>
                      <span style={{ transitionDelay: "200ms" }}>r</span>
                      <span style={{ transitionDelay: "250ms" }}>e</span>
                      <span style={{ transitionDelay: "300ms" }}>c</span>
                      <span style={{ transitionDelay: "350ms" }}>t</span>
                      <span style={{ transitionDelay: "400ms" }}> </span>
                      <span style={{ transitionDelay: "450ms" }}>P</span>
                      <span style={{ transitionDelay: "500ms" }}>a</span>
                      <span style={{ transitionDelay: "550ms" }}>t</span>
                      <span style={{ transitionDelay: "600ms" }}>h</span>
                    </label>
                    <span className="input-border"></span>
                  </div>
                  <div className="form-input mb-6">
                    <input
                      type="url"
                      name="url"
                      className="w-full text-sm"
                      required
                    />
                    <label>
                      <span style={{ transitionDelay: "0ms" }}>R</span>
                      <span style={{ transitionDelay: "50ms" }}>e</span>
                      <span style={{ transitionDelay: "100ms" }}>d</span>
                      <span style={{ transitionDelay: "150ms" }}>i</span>
                      <span style={{ transitionDelay: "200ms" }}>r</span>
                      <span style={{ transitionDelay: "250ms" }}>e</span>
                      <span style={{ transitionDelay: "300ms" }}>c</span>
                      <span style={{ transitionDelay: "350ms" }}>t</span>
                      <span style={{ transitionDelay: "400ms" }}> </span>
                      <span style={{ transitionDelay: "450ms" }}>U</span>
                      <span style={{ transitionDelay: "500ms" }}>R</span>
                      <span style={{ transitionDelay: "550ms" }}>L</span>
                    </label>
                    <span className="input-border"></span>
                  </div>
                  <button className="star-button" type="submit">
                    Submit
                    <div className="star-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        version="1.1"
                        className="svg-style"
                        viewBox="0 0 784.11 815.53"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs></defs>
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="star-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        version="1.1"
                        className="svg-style"
                        viewBox="0 0 784.11 815.53"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs></defs>
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="star-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        version="1.1"
                        className="svg-style"
                        viewBox="0 0 784.11 815.53"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs></defs>
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="star-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        version="1.1"
                        className="svg-style"
                        viewBox="0 0 784.11 815.53"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs></defs>
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="star-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        version="1.1"
                        className="svg-style"
                        viewBox="0 0 784.11 815.53"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs></defs>
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="star-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        version="1.1"
                        className="svg-style"
                        viewBox="0 0 784.11 815.53"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs></defs>
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                          <path
                            className="fil0"
                            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </button>
                </form>
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
              <h2 className="text-2xl font-bold mb-4">
                <FontAwesomeIcon icon={faTrash} /> Delete Redirect
              </h2>
              <form
                onSubmit={(e) =>
                  handleFormSubmit(
                    e,
                    "/api/delete",
                    "DELETE",
                    "Redirect deleted successfully",
                  )
                }
              >
                <div className="form-input mb-4">
                  <input
                    type="password"
                    name="password"
                    className="w-full text-sm"
                    required
                  />
                  <label>
                    <span style={{ transitionDelay: "0ms" }}>P</span>
                    <span style={{ transitionDelay: "50ms" }}>a</span>
                    <span style={{ transitionDelay: "100ms" }}>s</span>
                    <span style={{ transitionDelay: "150ms" }}>s</span>
                    <span style={{ transitionDelay: "200ms" }}>w</span>
                    <span style={{ transitionDelay: "250ms" }}>o</span>
                    <span style={{ transitionDelay: "300ms" }}>r</span>
                    <span style={{ transitionDelay: "350ms" }}>d</span>
                  </label>
                  <span className="input-border"></span>
                </div>
                <div className="form-input mb-4">
                  <input
                    type="text"
                    name="alias"
                    className="w-full text-sm"
                    required
                  />
                  <label>
                    <span style={{ transitionDelay: "0ms" }}>R</span>
                    <span style={{ transitionDelay: "50ms" }}>e</span>
                    <span style={{ transitionDelay: "100ms" }}>d</span>
                    <span style={{ transitionDelay: "150ms" }}>i</span>
                    <span style={{ transitionDelay: "200ms" }}>r</span>
                    <span style={{ transitionDelay: "250ms" }}>e</span>
                    <span style={{ transitionDelay: "300ms" }}>c</span>
                    <span style={{ transitionDelay: "350ms" }}>t</span>
                    <span style={{ transitionDelay: "400ms" }}> </span>
                    <span style={{ transitionDelay: "450ms" }}>P</span>
                    <span style={{ transitionDelay: "500ms" }}>a</span>
                    <span style={{ transitionDelay: "550ms" }}>t</span>
                    <span style={{ transitionDelay: "600ms" }}>h</span>
                  </label>
                  <span className="input-border"></span>
                </div>
                <button className="star-button" type="submit">
                  Submit
                  <div className="star-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      className="svg-style"
                      viewBox="0 0 784.11 815.53"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs></defs>
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path
                          className="fil0"
                          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      className="svg-style"
                      viewBox="0 0 784.11 815.53"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs></defs>
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path
                          className="fil0"
                          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      className="svg-style"
                      viewBox="0 0 784.11 815.53"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs></defs>
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path
                          className="fil0"
                          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      className="svg-style"
                      viewBox="0 0 784.11 815.53"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs></defs>
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path
                          className="fil0"
                          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      className="svg-style"
                      viewBox="0 0 784.11 815.53"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs></defs>
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path
                          className="fil0"
                          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      className="svg-style"
                      viewBox="0 0 784.11 815.53"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs></defs>
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path
                          className="fil0"
                          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </button>
              </form>
            </div>
          )}
        </div>
        {message && (
          <div
            className={`mt-4 p-4 ${
              showSuccess ? "bg-green-600" : "bg-red-600"
            } text-white rounded-lg`}
          >
            {showSuccess && (
              <Image
                src="/assets/checkmark.svg"
                alt="Success"
                width={20}
                height={20}
                className="inline-block mr-2"
              />
            )}
            {message}
          </div>
        )}
      </main>
    </div>
  );
}
