export function LoadingToast() {
  return (
    <div
      className="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
      role="alert"
      tabIndex={-1}
      aria-labelledby="hs-toast-message-with-loading-indicator-label"
    >
      <div className="flex items-center p-4">
        <div
          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
          aria-label="loading"
        >
          <output className="sr-only">Loading...</output>
        </div>
        <p
          id="hs-toast-message-with-loading-indicator-label"
          className="ms-3 text-sm text-gray-700 dark:text-neutral-400"
        >
          Action in progress
        </p>
      </div>
    </div>
  );
}
