export function ErrorToast({ message }: { readonly message: string }) {
  return (
    <div
      id="error-toast"
      className="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
      role="alert"
      tabIndex={-1}
      aria-labelledby="hs-toast-error-example-label"
    >
      <div className="flex p-4">
        <div className="shrink-0">
          <svg
            className="shrink-0 size-4 text-red-500 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
          </svg>
        </div>
        <div className="ms-3">
          <p
            id="hs-toast-error-example-label"
            className="text-sm text-gray-700 dark:text-neutral-400"
          >
            {message}
          </p>
        </div>

        <div className="ms-auto">
          <button
            type="button"
            className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-white"
            aria-label="Close"
            data-hs-remove-element="#error-toast"
          >
            <span className="sr-only">Close</span>
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
