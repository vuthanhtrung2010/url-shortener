import apiRedirectsDelete from "../endpoints/api/redirects/delete";
import apiRedirectsGet from "../endpoints/api/redirects/get";
import apiRedirectsPatch from "../endpoints/api/redirects/patch";
import apiRedirectsPut from "../endpoints/api/redirects/put";
import dashboard from "../endpoints/dashboard";
import index from "../endpoints/index";
import info from "../endpoints/info";
import redirects from "../endpoints/redirects";

export default {
  api: {
    redirects: {
      delete: apiRedirectsDelete,
      get: apiRedirectsGet,
      patch: apiRedirectsPatch,
      put: apiRedirectsPut,
    },
  },
  dashboard: dashboard,
  index: index,
  info: info,
  redirects: redirects,
};
