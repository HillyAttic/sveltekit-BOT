var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// .svelte-kit/output/server/chunks/server-errors.js
function throw_error(code, message, options2, caller) {
  const error2 = new Error(`${code}
${message}
https://svelte.dev/e/kit/${code}`, options2?.cause === void 0 ? void 0 : { cause: options2.cause });
  error2.name = "SvelteKit error";
  if (options2?.stackless) error2.stack = "";
  else Error.captureStackTrace?.(error2, caller);
  throw error2;
}
function capture_error(fn) {
  try {
    fn();
  } catch (error2) {
    return error2;
  }
}
function action_data_not_serializable(_values, options2) {
  throw_error("action_data_not_serializable", _values?.path !== void 0 ? `Data returned from action inside \`${_values.id}\` is not serializable: ${_values.message} (\`${_values.path}\`)` : `Data returned from action inside \`${_values.id}\` is not serializable: ${_values.message}`, options2, action_data_not_serializable);
}
function action_default_with_named(_values, options2) {
  throw_error("action_default_with_named", `When using named actions, the default action cannot be used. See the docs for more info: https://svelte.dev/docs/kit/form-actions#Named-actions`, options2, action_default_with_named);
}
function action_name_reserved(_values, options2) {
  throw_error("action_name_reserved", `Cannot use reserved action name \`default\``, options2, action_name_reserved);
}
function action_response_not_serializable(_values, options2) {
  throw_error("action_response_not_serializable", `Data returned from action inside \`${_values.id}\` is not serializable. Form actions need to return plain objects or \`fail()\`. E.g. \`return { success: true }\` or \`return fail(400, { message: "invalid" });\``, options2, action_response_not_serializable);
}
function action_throw_fail(_values, options2) {
  throw_error("action_throw_fail", `Cannot \`throw fail()\`. Use \`return fail()\``, options2, action_throw_fail);
}
function client_address_unsupported(_values, options2) {
  throw_error("client_address_unsupported", `\`${_values.adapter}\` does not specify \`getClientAddress\`. Please raise an issue`, options2, client_address_unsupported);
}
function cookies_serialize_before_route(_values, options2) {
  throw_error("cookies_serialize_before_route", `Cannot serialize cookies until after the route is determined`, options2, cookies_serialize_before_route);
}
function cookies_set_after_response(_values, options2) {
  throw_error("cookies_set_after_response", `Cannot use \`cookies.set(...)\` after the response has been generated`, options2, cookies_set_after_response);
}
function csp_report_only_missing_report(_values, options2) {
  throw_error("csp_report_only_missing_report", `\`content-security-policy-report-only\` must be specified with either the \`report-to\` or \`report-uri\` directives, or both`, options2, csp_report_only_missing_report);
}
function endpoint_invalid_response(_values, options2) {
  throw_error("endpoint_invalid_response", `Invalid response from route \`${_values.path}\`: handler should return a \`Response\` object`, options2, endpoint_invalid_response);
}
function handle_error_hook_failed(_values, options2) {
  throw_error("handle_error_hook_failed", `The \`handleError\` hook failed`, options2, handle_error_hook_failed);
}
function header_already_set(_values, options2) {
  throw_error("header_already_set", `\`${_values.name}\` header is already set`, options2, header_already_set);
}
function load_fetch_cors(_values, options2) {
  throw_error("load_fetch_cors", `CORS error: ${_values.reason} \`Access-Control-Allow-Origin\` header is present on the requested resource`, options2, load_fetch_cors);
}
function load_not_plain_object(_values, options2) {
  throw_error("load_not_plain_object", `Data returned from \`load\` while rendering \`${_values.id}\` is not a plain object`, options2, load_not_plain_object);
}
function load_not_serializable(_values, options2) {
  throw_error("load_not_serializable", `Data returned from \`load\` while rendering \`${_values.id}\` is not serializable: ${_values.message} (\`${_values.path}\`). If you need to serialize/deserialize custom types, use transport hooks: https://svelte.dev/docs/kit/hooks#transport.`, options2, load_not_serializable);
}
function load_promise_not_serializable(_values, options2) {
  throw_error("load_promise_not_serializable", `Failed to serialize promise while rendering \`${_values.id}\``, options2, load_promise_not_serializable);
}
function load_response_header_not_serialized(_values, options2) {
  throw_error("load_response_header_not_serialized", `Failed to get response header \`${_values.name}\` \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://svelte.dev/docs/kit/hooks#handle (at \`${_values.id}\`)`, options2, load_response_header_not_serialized);
}
function prerender_actions(_values, options2) {
  throw_error("prerender_actions", `Cannot prerender pages with actions`, options2, prerender_actions);
}
function prerender_endpoint_methods(_values, options2) {
  throw_error("prerender_endpoint_methods", `Cannot prerender a \`+server\` file with ${_values.methods} or fallback handlers (\`${_values.id}\`)`, options2, prerender_endpoint_methods);
}
function prerender_endpoint_not_prerenderable(_values, options2) {
  throw_error("prerender_endpoint_not_prerenderable", `\`${_values.id}\` is not prerenderable`, options2, prerender_endpoint_not_prerenderable);
}
function prerender_nonce(_values, options2) {
  throw_error("prerender_nonce", `Cannot use prerendering if \`config.csp.mode === 'nonce'\``, options2, prerender_nonce);
}
function prerender_template_nonce(_values, options2) {
  throw_error("prerender_template_nonce", `Cannot use prerendering if page template contains \`${_values.tag}\``, options2, prerender_template_nonce);
}
function server_api_unavailable(_values, options2) {
  throw_error("server_api_unavailable", `Cannot call \`${_values.name}\` on the server`, options2, server_api_unavailable);
}
function set_headers_after_response(_values, options2) {
  throw_error("set_headers_after_response", `Cannot use \`setHeaders(...)\` after the response has been generated`, options2, set_headers_after_response);
}
function set_headers_cookie(_values, options2) {
  throw_error("set_headers_cookie", `Use \`event.cookies.set(name, value, options)\` instead of \`event.setHeaders\` to set cookies`, options2, set_headers_cookie);
}
function url_search_unavailable_prerender(_values, options2) {
  throw_error("url_search_unavailable_prerender", `Cannot access \`url.${_values.property}\` on a page with prerendering enabled`, options2, url_search_unavailable_prerender);
}
var init_server_errors = __esm({
  ".svelte-kit/output/server/chunks/server-errors.js"() {
    "use strict";
    __name(throw_error, "throw_error");
    __name(capture_error, "capture_error");
    __name(action_data_not_serializable, "action_data_not_serializable");
    __name(action_default_with_named, "action_default_with_named");
    __name(action_name_reserved, "action_name_reserved");
    __name(action_response_not_serializable, "action_response_not_serializable");
    __name(action_throw_fail, "action_throw_fail");
    __name(client_address_unsupported, "client_address_unsupported");
    __name(cookies_serialize_before_route, "cookies_serialize_before_route");
    __name(cookies_set_after_response, "cookies_set_after_response");
    __name(csp_report_only_missing_report, "csp_report_only_missing_report");
    __name(endpoint_invalid_response, "endpoint_invalid_response");
    __name(handle_error_hook_failed, "handle_error_hook_failed");
    __name(header_already_set, "header_already_set");
    __name(load_fetch_cors, "load_fetch_cors");
    __name(load_not_plain_object, "load_not_plain_object");
    __name(load_not_serializable, "load_not_serializable");
    __name(load_promise_not_serializable, "load_promise_not_serializable");
    __name(load_response_header_not_serialized, "load_response_header_not_serialized");
    __name(prerender_actions, "prerender_actions");
    __name(prerender_endpoint_methods, "prerender_endpoint_methods");
    __name(prerender_endpoint_not_prerenderable, "prerender_endpoint_not_prerenderable");
    __name(prerender_nonce, "prerender_nonce");
    __name(prerender_template_nonce, "prerender_template_nonce");
    __name(server_api_unavailable, "server_api_unavailable");
    __name(set_headers_after_response, "set_headers_after_response");
    __name(set_headers_cookie, "set_headers_cookie");
    __name(url_search_unavailable_prerender, "url_search_unavailable_prerender");
  }
});

// .svelte-kit/output/server/chunks/functions.js
function noop() {
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done) return result;
    done = true;
    return result = fn();
  };
}
function disallow_on_server(name, parens = "(...)") {
  return () => {
    server_api_unavailable({ name: `${name}${parens}` });
  };
}
var init_functions = __esm({
  ".svelte-kit/output/server/chunks/functions.js"() {
    "use strict";
    init_server_errors();
    __name(noop, "noop");
    __name(once, "once");
    __name(disallow_on_server, "disallow_on_server");
  }
});

// node_modules/@sveltejs/kit/src/exports/internal/shared.js
var HttpError, HandledHttpError, Redirect, SvelteKitError, ActionFailure, ValidationError;
var init_shared = __esm({
  "node_modules/@sveltejs/kit/src/exports/internal/shared.js"() {
    HttpError = class {
      static {
        __name(this, "HttpError");
      }
      /**
       * @param {App.Error} error
       */
      constructor(error2) {
        this.status = error2.status;
        this.body = error2;
      }
      toString() {
        return JSON.stringify(this.body);
      }
    };
    HandledHttpError = class extends HttpError {
      static {
        __name(this, "HandledHttpError");
      }
    };
    Redirect = class {
      static {
        __name(this, "Redirect");
      }
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location) {
        try {
          new Headers({ location });
        } catch {
          throw new Error(
            `Invalid redirect location ${JSON.stringify(location)}: this string contains characters that cannot be used in HTTP headers`
          );
        }
        this.status = status;
        this.location = location;
      }
    };
    SvelteKitError = class extends Error {
      static {
        __name(this, "SvelteKitError");
      }
      /**
       * @param {number} status
       * @param {string} text
       * @param {string} message
       */
      constructor(status, text2, message) {
        super(message);
        this.status = status;
        this.text = text2;
      }
    };
    ActionFailure = class {
      static {
        __name(this, "ActionFailure");
      }
      /**
       * @param {number} status
       * @param {T} data
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    };
    ValidationError = class extends Error {
      static {
        __name(this, "ValidationError");
      }
      /**
       * @param {StandardSchemaV1.Issue[]} issues
       * @param {{ name?: string; file?: string }} [remote]
       */
      constructor(issues, remote) {
        super("Validation failed");
        this.name = "ValidationError";
        this.issues = issues;
        this.remote = remote;
      }
    };
  }
});

// node_modules/esm-env/true.js
var true_default;
var init_true = __esm({
  "node_modules/esm-env/true.js"() {
    true_default = true;
  }
});

// node_modules/esm-env/dev-fallback.js
var node_env, dev_fallback_default;
var init_dev_fallback = __esm({
  "node_modules/esm-env/dev-fallback.js"() {
    node_env = "production";
    dev_fallback_default = node_env && !node_env.toLowerCase().startsWith("prod");
  }
});

// node_modules/esm-env/false.js
var init_false = __esm({
  "node_modules/esm-env/false.js"() {
  }
});

// node_modules/esm-env/index.js
var init_esm_env = __esm({
  "node_modules/esm-env/index.js"() {
    init_true();
    init_dev_fallback();
    init_false();
  }
});

// node_modules/@sveltejs/kit/src/pathname.js
var init_pathname = __esm({
  "node_modules/@sveltejs/kit/src/pathname.js"() {
  }
});

// node_modules/@sveltejs/kit/src/constants.js
var MUTATIVE_METHODS, BODY_DEPENDENT_METHODS, SRC_ROOT, IN_WEBCONTAINER;
var init_constants = __esm({
  "node_modules/@sveltejs/kit/src/constants.js"() {
    MUTATIVE_METHODS = ["POST", "PUT", "PATCH", "DELETE"];
    BODY_DEPENDENT_METHODS = [...MUTATIVE_METHODS, "QUERY"];
    SRC_ROOT = import.meta.dirname;
    IN_WEBCONTAINER = !!globalThis.process?.versions?.webcontainer;
  }
});

// node_modules/@sveltejs/kit/src/messages/internal/server.js
var init_server = __esm({
  "node_modules/@sveltejs/kit/src/messages/internal/server.js"() {
  }
});

// node_modules/@sveltejs/kit/src/messages/server-errors.js
var init_server_errors2 = __esm({
  "node_modules/@sveltejs/kit/src/messages/server-errors.js"() {
    init_server();
  }
});

// node_modules/@sveltejs/kit/src/exports/internal/server/event.js
function try_get_request_store() {
  return sync_store ?? als?.getStore() ?? null;
}
function with_request_store(store, fn) {
  try {
    sync_store = store;
    return als ? als.run(store, fn) : fn();
  } finally {
    if (!IN_WEBCONTAINER) {
      sync_store = null;
    }
  }
}
var sync_store, als;
var init_event = __esm({
  "node_modules/@sveltejs/kit/src/exports/internal/server/event.js"() {
    init_constants();
    init_server_errors2();
    sync_store = null;
    import("node:async_hooks").then((hooks2) => als = new hooks2.AsyncLocalStorage()).catch(() => {
    });
    __name(try_get_request_store, "try_get_request_store");
    __name(with_request_store, "with_request_store");
  }
});

// node_modules/@sveltejs/kit/src/exports/internal/server/remote-functions.js
var init_remote_functions = __esm({
  "node_modules/@sveltejs/kit/src/exports/internal/server/remote-functions.js"() {
    init_server_errors2();
    init_esm_env();
  }
});

// node_modules/@sveltejs/kit/src/telemetry.js
var noop_span, noop_span_context;
var init_telemetry = __esm({
  "node_modules/@sveltejs/kit/src/telemetry.js"() {
    noop_span = {
      spanContext() {
        return noop_span_context;
      },
      setAttribute() {
        return this;
      },
      setAttributes() {
        return this;
      },
      addEvent() {
        return this;
      },
      setStatus() {
        return this;
      },
      updateName() {
        return this;
      },
      end() {
        return this;
      },
      isRecording() {
        return false;
      },
      recordException() {
        return this;
      },
      addLink() {
        return this;
      },
      addLinks() {
        return this;
      }
    };
    noop_span_context = {
      traceId: "",
      spanId: "",
      traceFlags: 0
    };
  }
});

// node_modules/@sveltejs/kit/src/exports/internal/server/telemetry.js
async function record_span({ name, attributes: attributes2, fn }) {
  if (otel === null) {
    return fn(noop_span);
  }
  const { SpanStatusCode, tracer } = await otel;
  return tracer.startActiveSpan(name, { attributes: attributes2 }, async (span) => {
    try {
      return await fn(span);
    } catch (error2) {
      if (error2 instanceof HttpError) {
        span.setAttributes({
          [`${name}.result.type`]: "known_error",
          [`${name}.result.status`]: error2.status,
          [`${name}.result.message`]: error2.body.message
        });
        if (error2.status >= 500) {
          span.recordException({
            name: "HttpError",
            message: error2.body.message
          });
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error2.body.message
          });
        }
      } else if (error2 instanceof Redirect) {
        span.setAttributes({
          [`${name}.result.type`]: "redirect",
          [`${name}.result.status`]: error2.status,
          [`${name}.result.location`]: error2.location
        });
      } else if (error2 instanceof Error) {
        span.setAttributes({
          [`${name}.result.type`]: "unknown_error"
        });
        span.recordException({
          name: error2.name,
          message: error2.message,
          // conditional so this compiles under consumers' `exactOptionalPropertyTypes`
          ...error2.stack !== void 0 && { stack: error2.stack }
        });
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error2.message
        });
      } else {
        span.setAttributes({
          [`${name}.result.type`]: "unknown_error"
        });
        span.setStatus({ code: SpanStatusCode.ERROR });
      }
      throw error2;
    } finally {
      span.end();
    }
  });
}
var otel;
var init_telemetry2 = __esm({
  "node_modules/@sveltejs/kit/src/exports/internal/server/telemetry.js"() {
    init_shared();
    init_telemetry();
    init_server_errors2();
    otel = null;
    __name(record_span, "record_span");
  }
});

// node_modules/@sveltejs/kit/src/exports/internal/server/index.js
function get_origin() {
  const request = try_get_request_store()?.event.request;
  return request && new URL(request.url).origin;
}
function merge_tracing(event_like, current) {
  return {
    ...event_like,
    tracing: {
      ...event_like.tracing,
      current
    }
  };
}
var init_server2 = __esm({
  "node_modules/@sveltejs/kit/src/exports/internal/server/index.js"() {
    init_event();
    init_event();
    init_remote_functions();
    init_telemetry2();
    init_shared();
    __name(get_origin, "get_origin");
    __name(merge_tracing, "merge_tracing");
  }
});

// node_modules/@sveltejs/kit/src/messages/internal/shared.js
function throw_error3(code, message, caller) {
  const error2 = new Error(`${code}
${message}
https://svelte.dev/e/kit/${code}`);
  error2.name = "SvelteKit error";
  Error.captureStackTrace?.(error2, caller);
  throw error2;
}
var verbose, bold, normal;
var init_shared2 = __esm({
  "node_modules/@sveltejs/kit/src/messages/internal/shared.js"() {
    verbose = false;
    bold = "font-weight: bold";
    normal = "font-weight: normal";
    __name(throw_error3, "throw_error");
  }
});

// node_modules/@sveltejs/kit/src/messages/shared-errors.js
function invalid_error_status(_values) {
  if (dev_fallback_default || !true_default && verbose) {
    throw_error3("invalid_error_status", `HTTP error status codes must be between 400 and 599 \u2014 ${_values.status} is invalid`, invalid_error_status);
  }
  throw new Error("https://svelte.dev/e/kit/invalid_error_status");
}
function invalid_redirect_status(_values) {
  if (dev_fallback_default || !true_default && verbose) {
    throw_error3("invalid_redirect_status", `Redirect status codes must be between 300 and 308 \u2014 ${_values.status} is invalid`, invalid_redirect_status);
  }
  throw new Error("https://svelte.dev/e/kit/invalid_redirect_status");
}
function redirect_external_javascript(_values) {
  if (dev_fallback_default || !true_default && verbose) {
    throw_error3("redirect_external_javascript", `Cannot redirect to \`${_values.location}\` with \`{ external: true }\`. The \`javascript:\` and \`data:\` protocols must be explicitly listed in the \`external\` allowlist`, redirect_external_javascript);
  }
  throw new Error("https://svelte.dev/e/kit/redirect_external_javascript");
}
function redirect_external_not_allowed(_values) {
  if (dev_fallback_default || !true_default && verbose) {
    throw_error3("redirect_external_not_allowed", `Cannot redirect to external URL \`${_values.location}\`. To redirect to an external URL, pass \`{ external: true }\` or an allowlist of permitted origins as the third argument to \`redirect\``, redirect_external_not_allowed);
  }
  throw new Error("https://svelte.dev/e/kit/redirect_external_not_allowed");
}
function redirect_external_not_in_allowlist(_values) {
  if (dev_fallback_default || !true_default && verbose) {
    throw_error3("redirect_external_not_in_allowlist", `Cannot redirect to \`${_values.location}\`: URL origin is not included in the \`external\` allowlist`, redirect_external_not_in_allowlist);
  }
  throw new Error("https://svelte.dev/e/kit/redirect_external_not_in_allowlist");
}
function redirect_external_option_invalid(_values) {
  if (dev_fallback_default || !true_default && verbose) {
    throw_error3("redirect_external_option_invalid", `\`redirect\` \`options.external\` must be \`true\` or an array of allowed origins`, redirect_external_option_invalid);
  }
  throw new Error("https://svelte.dev/e/kit/redirect_external_option_invalid");
}
var init_shared_errors = __esm({
  "node_modules/@sveltejs/kit/src/messages/shared-errors.js"() {
    init_esm_env();
    init_shared2();
    __name(invalid_error_status, "invalid_error_status");
    __name(invalid_redirect_status, "invalid_redirect_status");
    __name(redirect_external_javascript, "redirect_external_javascript");
    __name(redirect_external_not_allowed, "redirect_external_not_allowed");
    __name(redirect_external_not_in_allowlist, "redirect_external_not_in_allowlist");
    __name(redirect_external_option_invalid, "redirect_external_option_invalid");
  }
});

// node_modules/@sveltejs/kit/src/utils/url.js
function matches_external_allowlist_entry(location, allowed3) {
  if (location === allowed3) return true;
  try {
    const allow = new URL(allowed3);
    const loc = new URL(location, allow);
    return loc.protocol === allow.protocol && loc.host === allow.host;
  } catch {
    return false;
  }
}
var internal;
var init_url = __esm({
  "node_modules/@sveltejs/kit/src/utils/url.js"() {
    init_esm_env();
    init_shared_errors();
    init_server_errors2();
    internal = new URL("a://");
    __name(matches_external_allowlist_entry, "matches_external_allowlist_entry");
  }
});

// node_modules/@sveltejs/kit/src/exports/url.js
function is_external_location(location) {
  const origin2 = get_origin();
  try {
    return !matches_external_allowlist_entry(location, origin2 ?? REDIRECT_BASE);
  } catch {
    return true;
  }
}
function is_javascript_location(location) {
  try {
    return javascript_protocols.has(new URL(location, REDIRECT_BASE).protocol);
  } catch {
    return false;
  }
}
function validate_redirect_location(location, options2) {
  if (!is_external_location(location)) return;
  const external = options2?.external;
  if (!external) {
    redirect_external_not_allowed({ location: JSON.stringify(location) });
  }
  if (external === true) {
    if (is_javascript_location(location)) {
      redirect_external_javascript({ location: JSON.stringify(location) });
    }
    return;
  }
  if (Array.isArray(external)) {
    if (!external.some((allowed3) => matches_external_allowlist_entry(location, allowed3))) {
      redirect_external_not_in_allowlist({ location: JSON.stringify(location) });
    }
    return;
  }
  redirect_external_option_invalid();
}
var REDIRECT_BASE, javascript_protocols;
var init_url2 = __esm({
  "node_modules/@sveltejs/kit/src/exports/url.js"() {
    init_server2();
    init_url();
    init_shared_errors();
    REDIRECT_BASE = "https://sveltekit-redirect.invalid";
    __name(is_external_location, "is_external_location");
    javascript_protocols = /* @__PURE__ */ new Set(["javascript:", "data:"]);
    __name(is_javascript_location, "is_javascript_location");
    __name(validate_redirect_location, "validate_redirect_location");
  }
});

// node_modules/@sveltejs/kit/src/messages/shared-warnings.js
function error_body_deprecated(_values) {
  if (dev_fallback_default) {
    console.warn(
      `%c[sveltekit] ${"error_body_deprecated"}
%c${`Passing an \`App.Error\` body as the second argument is deprecated \u2014 pass the \`message\` as the second argument, and any additional properties as the third`}
https://svelte.dev/e/kit/${"error_body_deprecated"}`,
      bold,
      normal
    );
  } else {
    console.warn("https://svelte.dev/e/kit/error_body_deprecated");
  }
}
var init_shared_warnings = __esm({
  "node_modules/@sveltejs/kit/src/messages/shared-warnings.js"() {
    init_esm_env();
    init_shared2();
    __name(error_body_deprecated, "error_body_deprecated");
  }
});

// node_modules/@sveltejs/kit/src/version.js
var init_version = __esm({
  "node_modules/@sveltejs/kit/src/version.js"() {
  }
});

// node_modules/@sveltejs/kit/src/exports/index.js
function error(status, message, properties) {
  if ((!true_default || dev_fallback_default) && (isNaN(status) || status < 400 || status > 599)) {
    invalid_error_status({ status: String(status) });
  }
  if (message !== void 0 && typeof message !== "string") {
    if (dev_fallback_default) {
      error_body_deprecated();
    }
    ({ message, ...properties } = message);
  }
  throw new HttpError({ ...properties, status, message: message ?? `Error: ${status}` });
}
function redirect(status, location, options2) {
  if ((!true_default || dev_fallback_default) && (isNaN(status) || status < 300 || status > 308)) {
    invalid_redirect_status({ status: String(status) });
  }
  const href = location.toString();
  validate_redirect_location(href, options2);
  throw new Redirect(
    // @ts-ignore
    status,
    href
  );
}
function isRedirect(e) {
  return e instanceof Redirect;
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers3 = new Headers(init2?.headers);
  if (!headers3.has("content-length")) {
    headers3.set("content-length", text_encoder.encode(body).byteLength.toString());
  }
  if (!headers3.has("content-type")) {
    headers3.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers: headers3
  });
}
function text(body, init2) {
  const headers3 = new Headers(init2?.headers);
  if (!headers3.has("content-length")) {
    const encoded = text_encoder.encode(body);
    headers3.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers3
    });
  }
  return new Response(body, {
    ...init2,
    headers: headers3
  });
}
var text_encoder;
var init_exports = __esm({
  "node_modules/@sveltejs/kit/src/exports/index.js"() {
    init_shared();
    init_esm_env();
    init_pathname();
    init_url2();
    init_shared_errors();
    init_shared_warnings();
    init_version();
    text_encoder = new TextEncoder();
    __name(error, "error");
    __name(redirect, "redirect");
    __name(isRedirect, "isRedirect");
    __name(json, "json");
    __name(text, "text");
  }
});

// node_modules/@sveltejs/kit/src/exports/internal/index.js
var init_internal = __esm({
  "node_modules/@sveltejs/kit/src/exports/internal/index.js"() {
    init_server2();
  }
});

// node_modules/devalue/src/constants.js
var UNDEFINED, HOLE, NAN, POSITIVE_INFINITY, NEGATIVE_INFINITY, NEGATIVE_ZERO, SPARSE, MAX_ARRAY_LEN, MAX_ARRAY_INDEX;
var init_constants2 = __esm({
  "node_modules/devalue/src/constants.js"() {
    UNDEFINED = -1;
    HOLE = -2;
    NAN = -3;
    POSITIVE_INFINITY = -4;
    NEGATIVE_INFINITY = -5;
    NEGATIVE_ZERO = -6;
    SPARSE = -7;
    MAX_ARRAY_LEN = 2 ** 32 - 1;
    MAX_ARRAY_INDEX = MAX_ARRAY_LEN - 1;
  }
});

// node_modules/devalue/src/utils.js
function is_primitive(thing) {
  return thing === null || typeof thing !== "object" && typeof thing !== "function";
}
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getPrototypeOf(proto) === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function is_buffer(thing) {
  return typeof Buffer !== "undefined" && Buffer.isBuffer(thing);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol2) => Object.getOwnPropertyDescriptor(object, symbol2).enumerable
  );
}
function stringify_key(key) {
  return is_identifier.test(key) ? "." + key : "[" + JSON.stringify(key) + "]";
}
function is_valid_array_index(n) {
  if (!Number.isInteger(n)) return false;
  if (n < 0) return false;
  if (n > MAX_ARRAY_INDEX) return false;
  return true;
}
function is_valid_array_len(n) {
  if (!Number.isInteger(n)) return false;
  if (n < 0) return false;
  if (n > MAX_ARRAY_LEN) return false;
  return true;
}
function is_valid_array_index_string(s2) {
  if (s2.length === 0) return false;
  if (s2.length > 1 && s2.charCodeAt(0) === 48) return false;
  for (let i = 0; i < s2.length; i++) {
    const c = s2.charCodeAt(i);
    if (c < 48 || c > 57) return false;
  }
  return is_valid_array_index(+s2);
}
function array_index_cut(keys) {
  for (var i = keys.length - 1; i >= 0; i--) {
    if (is_valid_array_index_string(keys[i])) {
      break;
    }
  }
  return i + 1;
}
function valid_array_indices(array2) {
  const keys = Object.keys(array2);
  keys.length = array_index_cut(keys);
  return keys;
}
var escaped, DevalueError, object_proto_names, is_identifier;
var init_utils = __esm({
  "node_modules/devalue/src/utils.js"() {
    init_constants2();
    escaped = {
      "<": "\\u003C",
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    DevalueError = class extends Error {
      static {
        __name(this, "DevalueError");
      }
      /**
       * @param {string} message
       * @param {string[]} keys
       * @param {any} [value] - The value that failed to be serialized
       * @param {any} [root] - The root value being serialized
       */
      constructor(message, keys, value, root) {
        super(message);
        this.name = "DevalueError";
        this.path = keys.join("");
        this.value = value;
        this.root = root;
      }
    };
    __name(is_primitive, "is_primitive");
    object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
    __name(is_plain_object, "is_plain_object");
    __name(get_type, "get_type");
    __name(is_buffer, "is_buffer");
    __name(get_escaped_char, "get_escaped_char");
    __name(stringify_string, "stringify_string");
    __name(enumerable_symbols, "enumerable_symbols");
    is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
    __name(stringify_key, "stringify_key");
    __name(is_valid_array_index, "is_valid_array_index");
    __name(is_valid_array_len, "is_valid_array_len");
    __name(is_valid_array_index_string, "is_valid_array_index_string");
    __name(array_index_cut, "array_index_cut");
    __name(valid_array_indices, "valid_array_indices");
  }
});

// node_modules/devalue/src/uneval.js
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  let primitives;
  function stringify_cached_primitive(thing) {
    if (typeof thing === "string" && thing.length >= MIN_STRING_LENGTH || typeof thing === "bigint") {
      primitives ??= /* @__PURE__ */ new Map();
      let literal = primitives.get(thing);
      if (literal === void 0) {
        literal = stringify_primitive(thing);
        primitives.set(thing, literal);
      }
      return literal;
    }
    return stringify_primitive(thing);
  }
  __name(stringify_cached_primitive, "stringify_cached_primitive");
  function walk(thing) {
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing, (value2) => uneval(value2, replacer));
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      if (typeof thing === "function") {
        throw new DevalueError(`Cannot stringify a function`, keys, thing, value);
      }
      const type = get_type(thing);
      switch (type) {
        case "BigInt":
        case "String":
          walk(thing.valueOf());
          return;
        case "Number":
        case "Boolean":
        case "Date":
        case "RegExp":
        case "URL":
        case "URLSearchParams":
          return;
        case "Array":
          for (const i of valid_array_indices(thing)) {
            keys.push(`[${i}]`);
            walk(thing[i]);
            keys.pop();
          }
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key, value2] of thing) {
            keys.push(`.get(${is_primitive(key) ? stringify_cached_primitive(key) : "..."})`);
            walk(key);
            walk(value2);
            keys.pop();
          }
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
        case "DataView":
          if (!is_buffer(thing)) walk(thing.buffer);
          return;
        case "ArrayBuffer":
          return;
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          return;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(`Cannot stringify arbitrary non-POJOs`, keys, thing, value);
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(`Cannot stringify POJOs with symbolic keys`, keys, thing, value);
          }
          for (const key of Object.keys(thing)) {
            if (key === "__proto__") {
              throw new DevalueError(
                `Cannot stringify objects with __proto__ keys`,
                keys,
                thing,
                value
              );
            }
            keys.push(stringify_key(key));
            walk(thing[key]);
            keys.pop();
          }
      }
    } else if (typeof thing === "symbol") {
      throw new DevalueError(`Cannot stringify a Symbol primitive`, keys, thing, value);
    } else if (typeof thing === "string" && thing.length >= MIN_STRING_LENGTH || typeof thing === "bigint") {
      counts.set(thing, (counts.get(thing) || 0) + 1);
    }
  }
  __name(walk, "walk");
  walk(value);
  const names = /* @__PURE__ */ new Map();
  const repeated = [];
  counts.forEach((count, thing) => {
    if (count > 1) repeated.push([thing, count]);
  });
  repeated.sort((a, b) => b[1] - a[1]).forEach(([thing, count]) => {
    const name = get_name(names.size);
    if (is_primitive(thing)) {
      const length = stringify_cached_primitive(thing).length;
      if (length * count <= length + (count + 1) * name.length + 25) return;
    }
    names.set(thing, name);
  });
  function stringify3(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
      case "BigInt":
        return `Object(${stringify3(thing.valueOf())})`;
      case "RegExp":
        const { source, flags } = thing;
        return flags ? `new RegExp(${stringify_string(source)},"${flags}")` : `new RegExp(${stringify_string(source)})`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "URL":
        return `new URL(${stringify_string(thing.toString())})`;
      case "URLSearchParams":
        return `new URLSearchParams(${stringify_string(thing.toString())})`;
      case "Array": {
        let has_holes = false;
        let result = "[";
        for (let i = 0; i < thing.length; i += 1) {
          if (i > 0) result += ",";
          if (Object.hasOwn(thing, i)) {
            result += stringify3(thing[i]);
          } else if (!has_holes) {
            const populated_keys = valid_array_indices(thing);
            const population = populated_keys.length;
            const d = String(thing.length).length;
            const array2 = stringify_sparse_array(thing.length);
            const hole_cost = thing.length + 2;
            const sparse_cost = array2.length + 18 + population * (d + 2);
            if (hole_cost > sparse_cost) {
              const entries = populated_keys.map((k) => `${k}:${stringify3(thing[k])}`).join(",");
              return `Object.assign(${array2},{${entries}})`;
            }
            has_holes = true;
          }
        }
        const tail = thing.length === 0 || Object.hasOwn(thing, thing.length - 1) ? "" : ",";
        return result + tail + "]";
      }
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify3).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Float16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        if (is_buffer(thing)) thing = new Uint8Array(thing);
        let str2 = `new ${type}`;
        if (!names.has(thing.buffer)) {
          str2 += `([${stringify_typed_array_elements(type, thing.buffer)}])`;
        } else {
          str2 += `(${stringify3(thing.buffer)})`;
        }
        if (thing.byteLength !== thing.buffer.byteLength) {
          const start = thing.byteOffset / thing.BYTES_PER_ELEMENT;
          const end = start + thing.length;
          str2 += `.subarray(${start},${end})`;
        }
        return str2;
      }
      case "DataView": {
        let str2 = `new DataView`;
        if (!names.has(thing.buffer)) {
          str2 += `(new Uint8Array([${new Uint8Array(thing.buffer)}]).buffer`;
        } else {
          str2 += `(${stringify3(thing.buffer)}`;
        }
        if (thing.byteLength !== thing.buffer.byteLength) {
          str2 += `,${thing.byteOffset},${thing.byteLength}`;
        }
        return str2 + ")";
      }
      case "ArrayBuffer": {
        const ui8 = new Uint8Array(thing);
        return `new Uint8Array([${ui8.toString()}]).buffer`;
      }
      case "Temporal.Duration":
      case "Temporal.Instant":
      case "Temporal.PlainDate":
      case "Temporal.PlainTime":
      case "Temporal.PlainDateTime":
      case "Temporal.PlainMonthDay":
      case "Temporal.PlainYearMonth":
      case "Temporal.ZonedDateTime":
        return `${type}.from(${stringify_string(thing.toString())})`;
      default:
        const keys2 = Object.keys(thing);
        const obj = keys2.map((key) => `${safe_key(key)}:${stringify3(thing[key])}`).join(",");
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return keys2.length > 0 ? `{${obj},__proto__:null}` : `{__proto__:null}`;
        }
        return `{${obj}}`;
    }
  }
  __name(stringify3, "stringify");
  const str = stringify3(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    const reconstructions = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_cached_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "BigInt": {
          const primitive = thing.valueOf();
          if (names.has(primitive)) {
            values.push("{}");
            reconstructions.push(`${name}=Object(${stringify3(primitive)})`);
          } else {
            values.push(`Object(${stringify3(primitive)})`);
          }
          break;
        }
        case "RegExp":
          const { source, flags } = thing;
          const regexp = flags ? `new RegExp(${stringify_string(source)},"${flags}")` : `new RegExp(${stringify_string(source)})`;
          values.push(regexp);
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "URL":
          values.push(`new URL(${stringify_string(thing.toString())})`);
          break;
        case "URLSearchParams":
          values.push(`new URLSearchParams(${stringify_string(thing.toString())})`);
          break;
        case "Array": {
          const populated_keys = valid_array_indices(thing);
          values.push(
            thing.length > 32 + 2 * populated_keys.length ? stringify_sparse_array(thing.length) : `Array(${thing.length})`
          );
          for (const i of populated_keys) {
            statements.push(`${name}[${i}]=${stringify3(thing[i])}`);
          }
          break;
        }
        case "Set": {
          values.push(`new Set`);
          const adds = Array.from(thing).map((v) => `.add(${stringify3(v)})`);
          if (adds.length > 0) statements.push(name + adds.join(""));
          break;
        }
        case "Map": {
          values.push(`new Map`);
          const sets = Array.from(thing).map(
            ([k, v]) => `.set(${stringify3(k)}, ${stringify3(v)})`
          );
          if (sets.length > 0) statements.push(name + sets.join(""));
          break;
        }
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          if (is_buffer(thing)) thing = new Uint8Array(thing);
          let str2 = `new ${type}`;
          if (!names.has(thing.buffer)) {
            str2 += `([${stringify_typed_array_elements(type, thing.buffer)}])`;
          } else {
            str2 += `(${stringify3(thing.buffer)})`;
          }
          if (thing.byteLength !== thing.buffer.byteLength) {
            const start = thing.byteOffset / thing.BYTES_PER_ELEMENT;
            const end = start + thing.length;
            str2 += `.subarray(${start},${end})`;
          }
          values.push(`{}`);
          reconstructions.push(`${name}=${str2}`);
          break;
        }
        case "DataView": {
          let str2 = `new DataView`;
          if (!names.has(thing.buffer)) {
            str2 += `(new Uint8Array([${new Uint8Array(thing.buffer)}]).buffer`;
          } else {
            str2 += `(${stringify3(thing.buffer)}`;
          }
          if (thing.byteLength !== thing.buffer.byteLength) {
            str2 += `,${thing.byteOffset},${thing.byteLength}`;
          }
          str2 += ")";
          values.push(`{}`);
          reconstructions.push(`${name}=${str2}`);
          break;
        }
        case "ArrayBuffer":
          values.push(`new Uint8Array([${new Uint8Array(thing)}]).buffer`);
          break;
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          values.push(`${type}.from(${stringify_string(thing.toString())})`);
          break;
        default:
          values.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach((key) => {
            statements.push(`${name}${safe_prop(key)}=${stringify3(thing[key])}`);
          });
      }
    });
    statements.push(`return ${str}`);
    const body = [...reconstructions, ...statements].join(";");
    if (params.length > 65534) {
      return `(function(){var[${params.join(",")}]=arguments[0];${body}}([${values.join(",")}]))`;
    }
    return `(function(${params.join(",")}){${body}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function stringify_sparse_array(length) {
  return `(function(a){a[${MAX_ARRAY_INDEX}]=0;delete a[${MAX_ARRAY_INDEX}];a.length=${length};return a}([]))`;
}
function stringify_typed_array_elements(type, buffer2) {
  const array2 = new /** @type {any} */
  globalThis[type](buffer2);
  if (type === "BigInt64Array" || type === "BigUint64Array") {
    return Array.from(array2, (element) => `${element}n`).join(",");
  }
  if (array2 instanceof Float32Array || array2 instanceof Float64Array || typeof Float16Array !== "undefined" && array2 instanceof Float16Array) {
    return Array.from(array2, (element) => Object.is(element, -0) ? "-0" : `${element}`).join(",");
  }
  return array2.toString();
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escape_unsafe_chars(JSON.stringify(key));
}
function safe_prop(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? `.${key}` : `[${escape_unsafe_chars(JSON.stringify(key))}]`;
}
function stringify_primitive(thing) {
  const type = typeof thing;
  if (type === "string") return stringify_string(thing);
  if (thing === void 0) return "void 0";
  if (thing === 0 && 1 / thing < 0) return "-0";
  const str = String(thing);
  if (type === "number") return str.replace(/^(-)?0\./, "$1.");
  if (type === "bigint") return thing + "n";
  return str;
}
var chars, MIN_STRING_LENGTH, unsafe_chars, reserved;
var init_uneval = __esm({
  "node_modules/devalue/src/uneval.js"() {
    init_constants2();
    init_utils();
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    MIN_STRING_LENGTH = 128;
    unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
    reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
    __name(uneval, "uneval");
    __name(stringify_sparse_array, "stringify_sparse_array");
    __name(stringify_typed_array_elements, "stringify_typed_array_elements");
    __name(get_name, "get_name");
    __name(escape_unsafe_char, "escape_unsafe_char");
    __name(escape_unsafe_chars, "escape_unsafe_chars");
    __name(safe_key, "safe_key");
    __name(safe_prop, "safe_prop");
    __name(stringify_primitive, "stringify_primitive");
  }
});

// node_modules/devalue/src/base64.js
function encode_native(array_buffer) {
  return new Uint8Array(array_buffer).toBase64();
}
function decode_native(base64) {
  return Uint8Array.fromBase64(base64).buffer;
}
function encode_buffer(array_buffer) {
  return Buffer.from(array_buffer).toString("base64");
}
function decode_buffer(base64) {
  return Uint8Array.from(Buffer.from(base64, "base64")).buffer;
}
function encode_legacy(array_buffer) {
  const array2 = new Uint8Array(array_buffer);
  let binary = "";
  const chunk_size = 32768;
  for (let i = 0; i < array2.length; i += chunk_size) {
    const chunk = array2.subarray(i, i + chunk_size);
    binary += String.fromCharCode.apply(null, chunk);
  }
  return btoa(binary);
}
function decode_legacy(base64) {
  const binary_string = atob(base64);
  const len = binary_string.length;
  const array2 = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    array2[i] = binary_string.charCodeAt(i);
  }
  return array2.buffer;
}
var native, buffer, encode64, decode64;
var init_base64 = __esm({
  "node_modules/devalue/src/base64.js"() {
    __name(encode_native, "encode_native");
    __name(decode_native, "decode_native");
    __name(encode_buffer, "encode_buffer");
    __name(decode_buffer, "decode_buffer");
    __name(encode_legacy, "encode_legacy");
    __name(decode_legacy, "decode_legacy");
    native = typeof Uint8Array.fromBase64 === "function";
    buffer = typeof process === "object" && process.versions?.node !== void 0;
    encode64 = native ? encode_native : buffer ? encode_buffer : encode_legacy;
    decode64 = native ? decode_native : buffer ? decode_buffer : decode_legacy;
  }
});

// node_modules/devalue/src/operations.js
function merge_operations(defaults, overrides) {
  if (!overrides) return defaults;
  const merged = (
    /** @type {T} */
    {}
  );
  for (
    const key of
    /** @type {(keyof T)[]} */
    Object.keys(defaults)
  ) {
    merged[key] = overrides[key] ?? defaults[key];
  }
  return merged;
}
var NOT_PLAIN, SYMBOL_KEYS, stringify_operations, default_stringify_operations, array_buffer_byte_length, shared_array_buffer_byte_length, parse_operations, default_parse_operations;
var init_operations = __esm({
  "node_modules/devalue/src/operations.js"() {
    init_constants2();
    init_utils();
    __name(merge_operations, "merge_operations");
    NOT_PLAIN = /* @__PURE__ */ Object.freeze({ kind: "not-plain" });
    SYMBOL_KEYS = /* @__PURE__ */ Object.freeze({ kind: "symbol-keys" });
    stringify_operations = {
      identify: /* @__PURE__ */ __name((value) => value, "identify"),
      typeOf: /* @__PURE__ */ __name((value) => value === null ? "null" : typeof value, "typeOf"),
      toPrimitive: /* @__PURE__ */ __name((value) => value, "toPrimitive"),
      tagOf: /* @__PURE__ */ __name((value) => get_type(value), "tagOf"),
      isThenable: /* @__PURE__ */ __name((value) => typeof value.then === "function", "isThenable"),
      toPromise: /* @__PURE__ */ __name((thenable) => Promise.resolve(thenable), "toPromise"),
      unbox: /* @__PURE__ */ __name((boxed) => boxed.valueOf(), "unbox"),
      toISOString: /* @__PURE__ */ __name((date) => isNaN(date.getDate()) ? "" : date.toISOString(), "toISOString"),
      toStringValue: /* @__PURE__ */ __name((value) => value.toString(), "toStringValue"),
      regExpInfo: /* @__PURE__ */ __name((regexp) => ({ source: regexp.source, flags: regexp.flags }), "regExpInfo"),
      valuesOf: /* @__PURE__ */ __name((set) => set, "valuesOf"),
      entriesOf: /* @__PURE__ */ __name((map) => map, "entriesOf"),
      viewInfo: /* @__PURE__ */ __name((view) => {
        if (is_buffer(view)) view = new Uint8Array(view);
        return {
          buffer: view.buffer,
          byteOffset: view.byteOffset,
          byteLength: view.byteLength,
          length: view.length,
          bufferByteLength: view.buffer.byteLength
        };
      }, "viewInfo"),
      toArrayBuffer: /* @__PURE__ */ __name((buffer2) => buffer2, "toArrayBuffer"),
      lengthOf: /* @__PURE__ */ __name((array2) => array2.length, "lengthOf"),
      hasOwn: /* @__PURE__ */ __name((value, key) => Object.hasOwn(value, key), "hasOwn"),
      indicesOf: /* @__PURE__ */ __name((array2) => valid_array_indices(array2), "indicesOf"),
      shapeOf: /* @__PURE__ */ __name((value) => {
        if (!is_plain_object(value)) return NOT_PLAIN;
        if (enumerable_symbols(value).length > 0) return SYMBOL_KEYS;
        return {
          kind: Object.getPrototypeOf(value) === null ? "null-proto" : "plain",
          keys: Object.keys(value)
        };
      }, "shapeOf"),
      get: /* @__PURE__ */ __name((value, key) => value[key], "get")
    };
    default_stringify_operations = /* @__PURE__ */ Object.freeze(stringify_operations);
    array_buffer_byte_length = Object.getOwnPropertyDescriptor(
      ArrayBuffer.prototype,
      "byteLength"
    ).get;
    shared_array_buffer_byte_length = typeof SharedArrayBuffer === "undefined" ? void 0 : Object.getOwnPropertyDescriptor(SharedArrayBuffer.prototype, "byteLength").get;
    parse_operations = {
      fromPrimitive: /* @__PURE__ */ __name((primitive) => primitive, "fromPrimitive"),
      fromISOString: /* @__PURE__ */ __name((iso) => new Date(iso), "fromISOString"),
      fromStringValue: /* @__PURE__ */ __name((tag, text2) => {
        if (tag === "URL") return new URL(text2);
        if (tag === "URLSearchParams") return new URLSearchParams(text2);
        return Temporal[tag.slice(9)].from(text2);
      }, "fromStringValue"),
      fromArrayBuffer: /* @__PURE__ */ __name((buffer2) => buffer2, "fromArrayBuffer"),
      fromRegExpInfo: /* @__PURE__ */ __name((source, flags) => new RegExp(source, flags), "fromRegExpInfo"),
      fromViewInfo: /* @__PURE__ */ __name((tag, buffer2, byteOffset, length) => {
        try {
          array_buffer_byte_length.call(buffer2);
        } catch (error2) {
          if (!shared_array_buffer_byte_length) throw error2;
          shared_array_buffer_byte_length.call(buffer2);
        }
        const Constructor = (
          /** @type {any} */
          globalThis[tag]
        );
        return byteOffset !== void 0 ? new Constructor(buffer2, byteOffset, length) : new Constructor(buffer2);
      }, "fromViewInfo"),
      box: /* @__PURE__ */ __name((value) => Object(value), "box"),
      createArray: /* @__PURE__ */ __name((length) => new Array(length), "createArray"),
      createSparseArray: /* @__PURE__ */ __name((length) => {
        const array2 = [];
        array2[MAX_ARRAY_INDEX] = void 0;
        delete array2[MAX_ARRAY_INDEX];
        array2.length = length;
        return array2;
      }, "createSparseArray"),
      createObject: /* @__PURE__ */ __name(() => ({}), "createObject"),
      createNullPrototypeObject: /* @__PURE__ */ __name(() => /* @__PURE__ */ Object.create(null), "createNullPrototypeObject"),
      createSet: /* @__PURE__ */ __name(() => /* @__PURE__ */ new Set(), "createSet"),
      createMap: /* @__PURE__ */ __name(() => /* @__PURE__ */ new Map(), "createMap"),
      set: /* @__PURE__ */ __name((target, key, value) => {
        target[key] = value;
      }, "set"),
      addValue: /* @__PURE__ */ __name((set, value) => {
        set.add(value);
      }, "addValue"),
      addEntry: /* @__PURE__ */ __name((map, key, value) => {
        map.set(key, value);
      }, "addEntry")
    };
    default_parse_operations = /* @__PURE__ */ Object.freeze(parse_operations);
  }
});

// node_modules/devalue/src/parse.js
function parse(serialized, revivers, options2) {
  return unflatten(JSON.parse(serialized), revivers, options2);
}
function unflatten(parsed, revivers, options2) {
  const ops = merge_operations(default_parse_operations, options2?.operations);
  if (typeof parsed === "number") return hydrate(parsed, true);
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid input");
  }
  const values = (
    /** @type {any[]} */
    parsed
  );
  const hydrated = Array(values.length);
  let hydrating = null;
  function hydrate(index20, standalone = false) {
    if (index20 === UNDEFINED) return ops.fromPrimitive(void 0);
    if (index20 === NAN) return ops.fromPrimitive(NaN);
    if (index20 === POSITIVE_INFINITY) return ops.fromPrimitive(Infinity);
    if (index20 === NEGATIVE_INFINITY) return ops.fromPrimitive(-Infinity);
    if (index20 === NEGATIVE_ZERO) return ops.fromPrimitive(-0);
    if (standalone || typeof index20 !== "number") {
      throw new Error(`Invalid input`);
    }
    if (index20 in hydrated) return hydrated[index20];
    if (index20 >= values.length) {
      throw new Error(`Invalid input`);
    }
    const value = values[index20];
    if (!value || typeof value !== "object") {
      hydrated[index20] = ops.fromPrimitive(value);
    } else if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const type = value[0];
        const reviver = revivers && Object.hasOwn(revivers, type) ? revivers[type] : void 0;
        if (reviver) {
          let i = value[1];
          if (typeof i !== "number") {
            i = values.push(value[1]) - 1;
          }
          if (Object.hasOwn(hydrated, i)) {
            return hydrated[index20] = reviver(hydrated[i]);
          }
          hydrating ??= /* @__PURE__ */ new Set();
          if (hydrating.has(i)) {
            throw new Error("Invalid circular reference");
          }
          hydrating.add(i);
          hydrated[index20] = reviver(hydrate(i));
          hydrating.delete(i);
          return hydrated[index20];
        }
        switch (type) {
          case "Date":
            hydrated[index20] = ops.fromISOString(value[1]);
            break;
          case "Set":
            const set = ops.createSet();
            hydrated[index20] = set;
            for (let i = 1; i < value.length; i += 1) {
              ops.addValue(set, hydrate(value[i]));
            }
            break;
          case "Map":
            const map = ops.createMap();
            hydrated[index20] = map;
            for (let i = 1; i < value.length; i += 2) {
              ops.addEntry(map, hydrate(value[i]), hydrate(value[i + 1]));
            }
            break;
          case "RegExp":
            hydrated[index20] = ops.fromRegExpInfo(value[1], value[2]);
            break;
          case "Object": {
            const wrapped_index = value[1];
            if (typeof values[wrapped_index] === "object" && values[wrapped_index][0] !== "BigInt") {
              throw new Error("Invalid input");
            }
            hydrated[index20] = ops.box(hydrate(wrapped_index));
            break;
          }
          case "BigInt":
            hydrated[index20] = ops.fromPrimitive(BigInt(value[1]));
            break;
          case "null":
            const obj = ops.createNullPrototypeObject();
            hydrated[index20] = obj;
            for (let i = 1; i < value.length; i += 2) {
              const key = value[i];
              if (typeof key !== "string") {
                throw new Error("Cannot parse an object with a non-string key");
              }
              if (key === "__proto__") {
                throw new Error("Cannot parse an object with a `__proto__` property");
              }
              ops.set(obj, key, hydrate(value[i + 1]));
            }
            break;
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Float16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "BigInt64Array":
          case "BigUint64Array":
          case "DataView": {
            if (values[value[1]][0] !== "ArrayBuffer") {
              throw new Error("Invalid data");
            }
            const buffer2 = hydrate(value[1]);
            hydrated[index20] = ops.fromViewInfo(type, buffer2, value[2], value[3]);
            break;
          }
          case "ArrayBuffer": {
            const base64 = value[1];
            if (typeof base64 !== "string") {
              throw new Error("Invalid ArrayBuffer encoding");
            }
            hydrated[index20] = ops.fromArrayBuffer(decode64(base64));
            break;
          }
          case "URL":
          case "URLSearchParams":
          case "Temporal.Duration":
          case "Temporal.Instant":
          case "Temporal.PlainDate":
          case "Temporal.PlainTime":
          case "Temporal.PlainDateTime":
          case "Temporal.PlainMonthDay":
          case "Temporal.PlainYearMonth":
          case "Temporal.ZonedDateTime": {
            hydrated[index20] = ops.fromStringValue(type, value[1]);
            break;
          }
          default:
            throw new Error(`Unknown type ${type}`);
        }
      } else if (value[0] === SPARSE) {
        const len = value[1];
        if (!is_valid_array_len(len)) {
          throw new Error("Invalid input");
        }
        const array2 = ops.createSparseArray(len);
        hydrated[index20] = array2;
        for (let i = 2; i < value.length; i += 2) {
          const idx = value[i];
          if (!is_valid_array_index(idx) || idx >= len) {
            throw new Error("Invalid input");
          }
          ops.set(array2, idx, hydrate(value[i + 1]));
        }
      } else {
        const array2 = ops.createArray(value.length);
        hydrated[index20] = array2;
        for (let i = 0; i < value.length; i += 1) {
          const n = value[i];
          if (n === HOLE) continue;
          ops.set(array2, i, hydrate(n));
        }
      }
    } else {
      const object = ops.createObject();
      hydrated[index20] = object;
      for (const key of Object.keys(value)) {
        if (key === "__proto__") {
          throw new Error("Cannot parse an object with a `__proto__` property");
        }
        ops.set(object, key, hydrate(value[key]));
      }
    }
    return hydrated[index20];
  }
  __name(hydrate, "hydrate");
  return hydrate(0);
}
var init_parse = __esm({
  "node_modules/devalue/src/parse.js"() {
    init_base64();
    init_constants2();
    init_operations();
    init_utils();
    __name(parse, "parse");
    __name(unflatten, "unflatten");
  }
});

// node_modules/devalue/src/stringify.js
function stringify(value, reducers, options2) {
  const stringified = run(false, value, reducers, options2);
  return typeof stringified === "string" ? stringified : `[${stringified.join(",")}]`;
}
function run(async, value, reducers, options2) {
  const ops = merge_operations(default_stringify_operations, options2?.operations);
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  if (reducers) {
    for (const key of Object.getOwnPropertyNames(reducers)) {
      custom.push({ key, fn: reducers[key] });
    }
  }
  const keys = [];
  let p = 0;
  function flatten(thing, index21) {
    const type = ops.typeOf(thing);
    if (type === "undefined") return UNDEFINED;
    let number;
    if (type === "number") {
      number = /** @type {number} */
      ops.toPrimitive(thing);
      if (Number.isNaN(number)) return NAN;
      if (number === Infinity) return POSITIVE_INFINITY;
      if (number === -Infinity) return NEGATIVE_INFINITY;
      if (number === 0 && 1 / number < 0) return NEGATIVE_ZERO;
    }
    const id = ops.identify(thing);
    if (indexes.has(id)) return (
      /** @type {number} */
      indexes.get(id)
    );
    index21 ??= p++;
    indexes.set(id, index21);
    for (const { key, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index21] = `["${key}",${flatten(value2)}]`;
        return index21;
      }
    }
    if (type === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys, thing, value);
    } else if (type === "symbol") {
      throw new DevalueError(`Cannot stringify a Symbol primitive`, keys, thing, value);
    }
    let str = "";
    if (type !== "object") {
      str = stringify_primitive2(type === "number" ? number : ops.toPrimitive(thing));
    } else if (ops.isThenable(thing)) {
      if (!async) {
        throw new DevalueError(
          `Cannot stringify a Promise or thenable \u2014 use stringifyAsync instead`,
          keys,
          thing,
          value
        );
      }
      str = ops.toPromise(thing).then((value2) => {
        const i = flatten(value2, index21);
        if (i < 0) stringified[index21] = i;
      });
      str.catch(() => {
      });
    } else {
      const tag = ops.tagOf(thing);
      switch (tag) {
        case "Number":
        case "String":
        case "Boolean":
        case "BigInt":
          str = `["Object",${flatten(ops.unbox(thing))}]`;
          break;
        case "Date":
          str = `["Date","${ops.toISOString(thing)}"]`;
          break;
        case "URL":
          str = `["URL",${stringify_string(ops.toStringValue(thing))}]`;
          break;
        case "URLSearchParams":
          str = `["URLSearchParams",${stringify_string(ops.toStringValue(thing))}]`;
          break;
        case "RegExp":
          const { source, flags } = ops.regExpInfo(thing);
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array": {
          let mostly_dense = false;
          const length = ops.lengthOf(thing);
          str = "[";
          for (let i = 0; i < length; i += 1) {
            if (i > 0) str += ",";
            if (ops.hasOwn(thing, i)) {
              keys.push(`[${i}]`);
              str += flatten(ops.get(thing, i));
              keys.pop();
            } else if (mostly_dense) {
              str += HOLE;
            } else {
              const populated_keys = ops.indicesOf(thing);
              const population = populated_keys.length;
              const d = String(length).length;
              const hole_cost = (length - population) * 3;
              const sparse_cost = 4 + d + population * (d + 1);
              if (hole_cost > sparse_cost) {
                str = "[" + SPARSE + "," + length;
                for (let j = 0; j < populated_keys.length; j++) {
                  const key = populated_keys[j];
                  keys.push(`[${key}]`);
                  str += "," + key + "," + flatten(ops.get(thing, key));
                  keys.pop();
                }
                break;
              } else {
                mostly_dense = true;
                str += HOLE;
              }
            }
          }
          str += "]";
          break;
        }
        case "Set":
          str = '["Set"';
          for (const value2 of ops.valuesOf(thing)) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key, value2] of ops.entriesOf(thing)) {
            const key_type = ops.typeOf(key);
            const key_is_primitive = key_type !== "object" && key_type !== "function" && key_type !== "symbol";
            keys.push(
              `.get(${key_is_primitive ? stringify_primitive2(ops.toPrimitive(key)) : "..."})`
            );
            str += `,${flatten(key)},${flatten(value2)}`;
            keys.pop();
          }
          str += "]";
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          const info = ops.viewInfo(thing);
          str = '["' + tag + '",' + flatten(info.buffer);
          if (info.byteLength !== info.bufferByteLength) {
            str += `,${info.byteOffset},${info.length}`;
          }
          str += "]";
          break;
        }
        case "DataView": {
          const info = ops.viewInfo(thing);
          str = '["' + tag + '",' + flatten(info.buffer);
          if (info.byteLength !== info.bufferByteLength) {
            str += `,${info.byteOffset},${info.byteLength}`;
          }
          str += "]";
          break;
        }
        case "ArrayBuffer": {
          const base64 = encode64(ops.toArrayBuffer(thing));
          str = `["ArrayBuffer","${base64}"]`;
          break;
        }
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          str = `["${tag}",${stringify_string(ops.toStringValue(thing))}]`;
          break;
        default: {
          const shape = ops.shapeOf(thing);
          if (shape.kind === "not-plain") {
            throw new DevalueError(`Cannot stringify arbitrary non-POJOs`, keys, thing, value);
          }
          if (shape.kind === "symbol-keys") {
            throw new DevalueError(`Cannot stringify POJOs with symbolic keys`, keys, thing, value);
          }
          if (shape.kind === "null-proto") {
            str = '["null"';
            for (const key of shape.keys) {
              if (key === "__proto__") {
                throw new DevalueError(
                  `Cannot stringify objects with __proto__ keys`,
                  keys,
                  thing,
                  value
                );
              }
              keys.push(stringify_key(key));
              str += `,${stringify_string(key)},${flatten(ops.get(thing, key))}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key of shape.keys) {
              if (key === "__proto__") {
                throw new DevalueError(
                  `Cannot stringify objects with __proto__ keys`,
                  keys,
                  thing,
                  value
                );
              }
              if (started) str += ",";
              started = true;
              keys.push(stringify_key(key));
              str += `${stringify_string(key)}:${flatten(ops.get(thing, key))}`;
              keys.pop();
            }
            str += "}";
          }
        }
      }
    }
    stringified[index21] = str;
    return index21;
  }
  __name(flatten, "flatten");
  const index20 = flatten(value);
  if (index20 < 0) return `${index20}`;
  return stringified;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string") return stringify_string(thing);
  if (thing === void 0) return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO.toString();
  if (type === "bigint") return `["BigInt","${thing}"]`;
  return String(thing);
}
var init_stringify = __esm({
  "node_modules/devalue/src/stringify.js"() {
    init_utils();
    init_constants2();
    init_base64();
    init_operations();
    __name(stringify, "stringify");
    __name(run, "run");
    __name(stringify_primitive2, "stringify_primitive");
  }
});

// node_modules/devalue/index.js
var init_devalue = __esm({
  "node_modules/devalue/index.js"() {
    init_uneval();
    init_parse();
    init_stringify();
  }
});

// .svelte-kit/output/server/entries/hooks.server.js
var hooks_server_exports = {};
__export(hooks_server_exports, {
  handle: () => handle
});
async function verifyTokenEdge(token) {
  try {
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return null;
    const payload2 = token.slice(0, dotIndex);
    const sig = token.slice(dotIndex + 1);
    const secret = process.env.JWT_SECRET;
    if (!secret) return null;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(secret), {
      name: "HMAC",
      hash: "SHA-256"
    }, false, ["sign"]);
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload2));
    if (sig !== btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")) return null;
    const userJson = atob(payload2.replace(/-/g, "+").replace(/_/g, "/"));
    const user = JSON.parse(userJson);
    if (user.email === process.env.ADMIN_EMAIL && user.isAdmin) return user;
    return null;
  } catch {
    return null;
  }
}
var handle;
var init_hooks_server = __esm({
  ".svelte-kit/output/server/entries/hooks.server.js"() {
    "use strict";
    init_exports();
    __name(verifyTokenEdge, "verifyTokenEdge");
    handle = /* @__PURE__ */ __name(async ({ event, resolve: resolve2 }) => {
      if (event.url.pathname.startsWith("/admin")) {
        const token = event.cookies.get("auth_token");
        if (!(token ? await verifyTokenEdge(token) : null)?.isAdmin) throw redirect(303, "/");
      }
      return resolve2(event);
    }, "handle");
  }
});

// .svelte-kit/output/server/chunks/internal.js
function enable_verbose_errors() {
  verbose2 = true;
}
function throw_error4(code, message, caller) {
  const error2 = /* @__PURE__ */ new Error(`${code}
${message}
https://svelte.dev/e/kit/${code}`);
  error2.name = "SvelteKit error";
  Error.captureStackTrace?.(error2, caller);
  throw error2;
}
function set_assets(path2) {
  assets = path2;
}
function stream_from_iterable(iterable) {
  if (ReadableStream.from) return ReadableStream.from(iterable);
  const iterator = iterable[Symbol.asyncIterator]();
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) controller.close();
      else controller.enqueue(value);
    },
    async cancel(reason) {
      await iterator.return?.(reason);
    }
  });
}
function stream_text(head2, chunks) {
  return stream_from_iterable((async function* () {
    yield text_encoder2.encode(head2);
    for await (const chunk of chunks) if (chunk) yield text_encoder2.encode(chunk);
  })());
}
function base64_encode(bytes) {
  if (globalThis.Buffer) return globalThis.Buffer.from(bytes).toString("base64");
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}
function base64_decode(encoded) {
  if (globalThis.Buffer) {
    const buffer2 = globalThis.Buffer.from(encoded, "base64");
    return new Uint8Array(buffer2);
  }
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
function has_data_suffix2(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix2(pathname) {
  if (pathname.endsWith(".html")) return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix2(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) return pathname.slice(0, -16) + ".html";
  return pathname.slice(0, -12);
}
function has_resolution_suffix2(pathname) {
  return pathname.endsWith(ROUTE_SUFFIX) || pathname.endsWith(HTML_ROUTE_SUFFIX);
}
function add_resolution_suffix2(pathname) {
  if (pathname.endsWith(".html")) return pathname.replace(/\.html$/, HTML_ROUTE_SUFFIX);
  return pathname.replace(/\/$/, "") + ROUTE_SUFFIX;
}
function strip_resolution_suffix2(pathname) {
  if (pathname.endsWith(HTML_ROUTE_SUFFIX)) return pathname.slice(0, -15) + ".html";
  return pathname.slice(0, -11);
}
function form_field_array_conflict(_values) {
  if (verbose2) throw_error4("form_field_array_conflict", `Invalid array key \`${_values.key}\``, form_field_array_conflict);
  throw new Error("https://svelte.dev/e/kit/form_field_array_conflict");
}
function form_field_duplicate(_values) {
  if (verbose2) throw_error4("form_field_duplicate", `Form cannot contain duplicated keys \u2014 \`${_values.name}\` has ${_values.count} values`, form_field_duplicate);
  throw new Error("https://svelte.dev/e/kit/form_field_duplicate");
}
function form_field_forbidden_key(_values) {
  if (verbose2) throw_error4("form_field_forbidden_key", `Invalid key \`${_values.key}\`: This key is not allowed to prevent prototype pollution.`, form_field_forbidden_key);
  throw new Error("https://svelte.dev/e/kit/form_field_forbidden_key");
}
function form_field_invalid_name(_values) {
  if (verbose2) throw_error4("form_field_invalid_name", `Invalid field name \`${_values.name}\`: field names are written in JS object notation, so keys that would need quoting are not supported. See https://svelte.dev/docs/kit/remote-functions#form-Fields`, form_field_invalid_name);
  throw new Error("https://svelte.dev/e/kit/form_field_invalid_name");
}
function form_field_unbound(_values) {
  if (verbose2) throw_error4("form_field_unbound", `Form contained a field that wasn't created with \`form.fields.as(...)\`: \`${_values.name}\``, form_field_unbound);
  throw new Error("https://svelte.dev/e/kit/form_field_unbound");
}
function invalid_export(_values) {
  if (verbose2) throw_error4("invalid_export", _values?.file !== void 0 ? `Invalid export \`${_values.key}\` in \`${_values.file}\` (valid exports are ${_values.exports}, or anything with a \`'_'\` prefix)` : `Invalid export \`${_values.key}\` (valid exports are ${_values.exports}, or anything with a \`'_'\` prefix)`, invalid_export);
  throw new Error("https://svelte.dev/e/kit/invalid_export");
}
function invalid_export_location(_values) {
  if (verbose2) throw_error4("invalid_export_location", _values?.file !== void 0 ? `Invalid export \`${_values.key}\` in \`${_values.file}\` (\`${_values.key}\` is a valid export in ${_values.locations})` : `Invalid export \`${_values.key}\` (\`${_values.key}\` is a valid export in ${_values.locations})`, invalid_export_location);
  throw new Error("https://svelte.dev/e/kit/invalid_export_location");
}
function param_matcher_async(_values) {
  if (verbose2) throw_error4("param_matcher_async", `Async param matchers are not supported`, param_matcher_async);
  throw new Error("https://svelte.dev/e/kit/param_matcher_async");
}
function param_matcher_result_invalid(_values) {
  if (verbose2) throw_error4("param_matcher_result_invalid", `Param matcher must return a string, number, boolean, or bigint`, param_matcher_result_invalid);
  throw new Error("https://svelte.dev/e/kit/param_matcher_result_invalid");
}
function url_hash_unavailable2(_values) {
  if (verbose2) throw_error4("url_hash_unavailable", `Cannot access \`event.url.hash\`. Consider using \`page.url.hash\` inside a component instead`, url_hash_unavailable2);
  throw new Error("https://svelte.dev/e/kit/url_hash_unavailable");
}
function run_matcher(matcher, value) {
  const result = matcher["~standard"].validate(value);
  if (result instanceof Promise) param_matcher_async();
  if (result.issues) return { success: false };
  const parsed = result.value;
  if (typeof parsed !== "string" && typeof parsed !== "number" && typeof parsed !== "boolean" && typeof parsed !== "bigint") param_matcher_result_invalid();
  return {
    success: true,
    value: parsed
  };
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest) value = "";
      else continue;
    }
    const decoded = decodeURIComponent(value);
    if (param.matcher) {
      const outcome = run_matcher(matchers[param.matcher], decoded);
      if (!outcome.success) {
        if (param.optional && param.chained) {
          buffered++;
          continue;
        }
        return;
      }
      result[param.name] = outcome.value;
    } else result[param.name] = decoded;
    const next_param = params[i + 1];
    const next_value = values[i + 1];
    if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) buffered = 0;
    if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) buffered = 0;
  }
  if (buffered) return;
  return result;
}
function find_route(path2, routes, matchers) {
  for (const route of routes) {
    const match = route.pattern.exec(path2);
    if (!match) continue;
    const matched = exec(match, route.params, matchers);
    if (matched) return {
      route,
      params: matched
    };
  }
  return null;
}
function resolve(base, path2) {
  if (path2[0] === "/" && path2[1] === "/") return path2;
  let url2 = new URL(base, internal2);
  url2 = new URL(path2, url2);
  return url2.protocol === internal2.protocol ? url2.pathname + url2.search + url2.hash : url2.href;
}
function relative_pathname(from, to) {
  const segment = to.replace(/\/$/, "").split("/").at(-1);
  return from.endsWith("/") ? `../${segment}` : `./${segment}/`;
}
function normalize_path(path2, trailing_slash) {
  if (path2 === "/" || trailing_slash === "ignore") return path2;
  if (trailing_slash === "never") return path2.endsWith("/") ? path2.slice(0, -1) : path2;
  else if (trailing_slash === "always" && !path2.endsWith("/")) return path2 + "/";
  return path2;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function make_trackable(url2, callback, search_params_callback, allow_hash = false) {
  const tracked = new URL(url2);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, { get(obj, key) {
      if (key === "get" || key === "getAll" || key === "has") return (param, ...rest) => {
        search_params_callback(param);
        return obj[key](param, ...rest);
      };
      callback();
      const value = Reflect.get(obj, key);
      return typeof value === "function" ? value.bind(obj) : value;
    } }),
    enumerable: true,
    configurable: true
  });
  const tracked_url_properties = [
    "href",
    "pathname",
    "search",
    "toString",
    "toJSON"
  ];
  if (allow_hash) tracked_url_properties.push("hash");
  for (const property of tracked_url_properties) Object.defineProperty(tracked, property, {
    get() {
      callback();
      return url2[property];
    },
    enumerable: true,
    configurable: true
  });
  tracked[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = (_depth, opts, inspect) => {
    return inspect(url2, opts);
  };
  tracked.searchParams[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = (_depth, opts, inspect) => {
    return inspect(url2.searchParams, opts);
  };
  if (!allow_hash) disable_hash(tracked);
  return tracked;
}
function disable_hash(url2) {
  allow_nodejs_console_log(url2);
  Object.defineProperty(url2, "hash", { get() {
    return url_hash_unavailable2();
  } });
}
function disable_search(url2) {
  allow_nodejs_console_log(url2);
  for (const property of ["search", "searchParams"]) Object.defineProperty(url2, property, { get() {
    return url_search_unavailable_prerender({ property });
  } });
}
function allow_nodejs_console_log(url2) {
  url2[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = (_depth, opts, inspect) => {
    return inspect(new URL(url2), opts);
  };
}
async function get_hooks() {
  let handle2;
  let handleFetch;
  let handleError;
  let init2;
  ({ handle: handle2, handleFetch, handleError, init: init2 } = await Promise.resolve().then(() => (init_hooks_server(), hooks_server_exports)));
  let reroute;
  let transport;
  return {
    handle: handle2,
    handleFetch,
    handleError,
    init: init2,
    reroute,
    transport
  };
}
function set_nested_value(object, field, value) {
  deep_set(object, split_path(field.name), value);
}
function parse_form_key(form_id, key) {
  const suffix = "/" + form_id;
  let name = key;
  let image_coordinate = "";
  if (name.startsWith("i:") && (name.endsWith(suffix + ".x") || name.endsWith(suffix + ".y"))) {
    image_coordinate = name[name.length - 1];
    name = name.slice(0, -2);
  }
  if (!name.endsWith(suffix)) form_field_unbound({ name });
  name = name.slice(0, -suffix.length);
  let type = null;
  if (name.startsWith("n:")) {
    name = name.slice(2);
    type = "number";
  } else if (name.startsWith("b:")) {
    name = name.slice(2);
    type = "boolean";
  } else if (name.startsWith("i:")) {
    name = name.slice(2);
    type = "number";
  }
  const is_array2 = name.endsWith("[]");
  if (is_array2) name = name.slice(0, -2);
  if (image_coordinate) name += "." + image_coordinate;
  return {
    name,
    type,
    is_array: is_array2
  };
}
function coerce_form_value(type, value) {
  if (Array.isArray(value)) return value.map((value2) => coerce_form_value(type, value2));
  if (type === "number") return value === "" ? void 0 : parseFloat(value);
  if (type === "boolean") return value === "on";
  return value;
}
function group_formdata(data) {
  const grouped = /* @__PURE__ */ new Map();
  for (const [name, value] of data) {
    const values = grouped.get(name);
    if (values) values.push(value);
    else grouped.set(name, [value]);
  }
  return grouped;
}
function convert_formdata(form_id, data) {
  const result = {};
  for (const [field_name, values] of group_formdata(data)) {
    const field = parse_form_key(form_id, field_name);
    const entries = values.filter((entry) => typeof entry === "string" || entry.name !== "" || entry.size > 0);
    if (entries.length === 0 && !field.is_array) continue;
    if (entries.length > 1 && !field.is_array) form_field_duplicate({
      name: field.name,
      count: String(entries.length)
    });
    set_nested_value(result, field, coerce_form_value(field.type, field.is_array ? entries : entries[0]));
  }
  return result;
}
async function deserialize_binary_form(request, form_id) {
  if (request.headers.get("content-type") !== "application/x-sveltekit-formdata") {
    const form_data = await request.formData();
    return {
      data: convert_formdata(form_id, form_data),
      meta: {},
      form_data
    };
  }
  if (!request.body) throw deserialize_error("no body");
  const reader = request.body.getReader();
  const chunks = [];
  function get_chunk(index20) {
    if (index20 in chunks) return chunks[index20];
    let i = chunks.length;
    while (i <= index20) {
      const previous = chunks[i - 1] ?? Promise.resolve(void 0);
      chunks[i] = previous.then(() => reader.read()).then((chunk) => chunk.value);
      i++;
    }
    return chunks[index20];
  }
  __name(get_chunk, "get_chunk");
  async function get_buffer(offset, length) {
    const parts = [];
    let total = 0;
    for await (const part of read_range(get_chunk, offset, length)) {
      parts.push(part);
      total += part.byteLength;
    }
    if (total < length || parts.length === 0) return null;
    if (parts.length === 1) return parts[0];
    const buffer2 = new Uint8Array(length);
    let cursor = 0;
    for (const part of parts) {
      buffer2.set(part, cursor);
      cursor += part.byteLength;
    }
    return buffer2;
  }
  __name(get_buffer, "get_buffer");
  const header = await get_buffer(0, HEADER_BYTES);
  if (!header) throw deserialize_error("too short");
  if (header[0] !== BINARY_FORM_VERSION) throw deserialize_error(`got version ${header[0]}, expected version ${BINARY_FORM_VERSION}`);
  const header_view = new DataView(header.buffer, header.byteOffset, header.byteLength);
  const data_length = header_view.getUint32(1, true);
  const file_offsets_length = header_view.getUint16(5, true);
  const data_buffer = await get_buffer(HEADER_BYTES, data_length);
  if (!data_buffer) throw deserialize_error("data too short");
  let file_offsets;
  let files_start_offset;
  if (file_offsets_length > 0) {
    const file_offsets_buffer = await get_buffer(HEADER_BYTES + data_length, file_offsets_length);
    if (!file_offsets_buffer) throw deserialize_error("file offset table too short");
    const parsed_offsets = JSON.parse(text_decoder.decode(file_offsets_buffer));
    if (!Array.isArray(parsed_offsets) || parsed_offsets.some((n) => typeof n !== "number" || !Number.isInteger(n) || n < 0)) throw deserialize_error("invalid file offset table");
    file_offsets = parsed_offsets;
    files_start_offset = HEADER_BYTES + data_length + file_offsets_length;
  }
  const file_spans = [];
  const [data, meta] = parse(text_decoder.decode(data_buffer), { File: /* @__PURE__ */ __name(([name, type, size, last_modified, index20]) => {
    if (typeof name !== "string" || typeof type !== "string" || !Number.isSafeInteger(size) || size < 0 || !Number.isSafeInteger(last_modified) || !Number.isSafeInteger(index20) || index20 < 0 || file_offsets === void 0) throw deserialize_error("invalid file metadata");
    let offset = file_offsets[index20];
    if (offset === void 0) throw deserialize_error("duplicate file offset table index");
    file_offsets[index20] = void 0;
    offset += files_start_offset;
    file_spans.push({
      offset,
      size
    });
    return new Proxy(new LazyFile(name, type, size, last_modified, get_chunk, offset), { getPrototypeOf() {
      return File.prototype;
    } });
  }, "File") });
  file_spans.sort((a, b) => a.offset - b.offset || a.size - b.size);
  for (let i = 1; i < file_spans.length; i++) {
    const previous = file_spans[i - 1];
    const current = file_spans[i];
    const previous_end = previous.offset + previous.size;
    if (previous_end < current.offset) throw deserialize_error("gaps in file data");
    if (previous_end > current.offset) throw deserialize_error("overlapping file data");
  }
  (async () => {
    let has_more = true;
    while (has_more) has_more = !!await get_chunk(chunks.length);
  })().catch(noop);
  return {
    data,
    meta,
    form_data: null
  };
}
function deserialize_error(message) {
  return new SvelteKitError(400, "Bad Request", `Could not deserialize binary form: ${message}`);
}
async function* read_range(get_chunk, offset, length) {
  let chunk_start = 0;
  for (let index20 = 0; ; index20++) {
    const chunk = await get_chunk(index20);
    if (!chunk) return;
    const chunk_end = chunk_start + chunk.byteLength;
    if (chunk_end > offset) {
      yield chunk.subarray(Math.max(0, offset - chunk_start), Math.min(chunk.byteLength, offset + length - chunk_start));
      if (offset + length <= chunk_end) return;
    }
    chunk_start = chunk_end;
  }
}
function split_path(path2) {
  if (!path_regex.test(path2)) form_field_invalid_name({ name: path2 });
  return path2.split(/\.|\[|\]/).filter(Boolean);
}
function check_prototype_pollution(key) {
  if (key === "__proto__" || key === "constructor" || key === "prototype") form_field_forbidden_key({ key });
}
function deep_set(object, keys, value) {
  let current = object;
  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i];
    check_prototype_pollution(key);
    const is_array2 = /^\d+$/.test(keys[i + 1]);
    const inner = Object.hasOwn(current, key) ? current[key] : void 0;
    const exists = inner != null;
    if (exists && is_array2 !== Array.isArray(inner)) form_field_array_conflict({ key: keys[i + 1] });
    if (!exists) {
      if (value === DELETE_KEY) return;
      current[key] = is_array2 ? [] : {};
    }
    current = current[key];
  }
  const final_key = keys[keys.length - 1];
  check_prototype_pollution(final_key);
  if (value === DELETE_KEY) delete current[final_key];
  else current[final_key] = value;
}
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /^[ \t]*([^/ \t]+)\/([^; \t]+)[ \t]*(?:;[ \t]*q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({
        type,
        subtype,
        q: +q,
        i
      });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) return b.q - a.q;
    if (a.subtype === "*" !== (b.subtype === "*")) return a.subtype === "*" ? 1 : -1;
    if (a.type === "*" !== (b.type === "*")) return a.type === "*" ? 1 : -1;
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex((part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*"));
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function matches_content_type(header, ...types) {
  const type = header?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return matches_content_type(request.headers.get("content-type"), "application/x-www-form-urlencoded", "multipart/form-data", "text/plain", BINARY_FORM_CONTENT_TYPE);
}
function init_transport(transport) {
  const transporters = Object.entries(transport);
  has_custom_transporters = transporters.length > 0;
  const replacer = /* @__PURE__ */ __name((thing) => {
    for (const key of Object.keys(transport)) {
      const encoded = transport[key].encode(thing);
      if (encoded) return `app.decode('${key}', ${uneval(encoded, replacer)})`;
    }
  }, "replacer");
  encoders = Object.fromEntries(transporters.map(([k, v]) => [k, v.encode]));
  decoders = Object.fromEntries(transporters.map(([k, v]) => [k, v.decode]));
  uneval2 = /* @__PURE__ */ __name((data) => uneval(data, replacer), "uneval");
  stringify2 = /* @__PURE__ */ __name((data) => stringify(data, encoders), "stringify");
  parse2 = /* @__PURE__ */ __name((data) => parse(data, decoders), "parse");
}
function fetch_cache_url(url2, page2) {
  return url2.origin === page2.origin ? url2.href.slice(page2.origin.length) : url2.href;
}
function create_remote_arg_revivers() {
  const remote_fns_revivers = {
    /** @type {(value: unknown) => unknown} */
    [remote_object]: (value) => value,
    /** @type {(value: unknown) => Map<unknown, unknown>} */
    [remote_map]: (value) => {
      if (!Array.isArray(value)) throw new Error("Invalid data for Map reviver");
      const map = /* @__PURE__ */ new Map();
      for (const item of value) {
        if (!Array.isArray(item) || item.length !== 2 || typeof item[0] !== "string" || typeof item[1] !== "string") throw new Error("Invalid data for Map reviver");
        const [key, val] = item;
        map.set(parse3(key), parse3(val));
      }
      return map;
    },
    /** @type {(value: unknown) => Set<unknown>} */
    [remote_set]: (value) => {
      if (!Array.isArray(value)) throw new Error("Invalid data for Set reviver");
      const set = /* @__PURE__ */ new Set();
      for (const item of value) {
        if (typeof item !== "string") throw new Error("Invalid data for Set reviver");
        set.add(parse3(item));
      }
      return set;
    },
    /** @type {(value: any) => File} */
    [remote_file]: (value) => {
      if (!value || typeof value !== "object" || typeof value.name !== "string" || typeof value.type !== "string" || typeof value.size !== "number" || typeof value.lastModified !== "number" || !(value.data instanceof ArrayBuffer)) throw new Error("Invalid data for File reviver");
      const { data, name, ...meta } = value;
      return new File([data], name, meta);
    }
  };
  const all_revivers = {
    ...decoders,
    ...remote_fns_revivers
  };
  const parse3 = /* @__PURE__ */ __name((data) => parse(data, all_revivers), "parse");
  return all_revivers;
}
function parse_remote_arg(string) {
  if (!string) return void 0;
  const json_string = text_decoder.decode(base64_decode(string.replaceAll("-", "+").replaceAll("_", "/")));
  return parse(json_string, create_remote_arg_revivers());
}
function create_remote_key(id, payload2) {
  return id + "/" + payload2;
}
function split_remote_key(key) {
  const i = key.lastIndexOf("/");
  if (i === -1) throw new Error(`Invalid remote key: ${key}`);
  return {
    id: key.slice(0, i),
    payload: key.slice(i + 1)
  };
}
function set_error_stack(error2, stack) {
  try {
    Reflect.set(error2, "stack", stack);
  } catch {
  }
  return error2.stack;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return error2;
}
function get_status(error2) {
  return error2 instanceof HttpError || error2 instanceof SvelteKitError ? error2.status : 500;
}
function handle_error_async_without_async_svelte(_values) {
  console.warn("https://svelte.dev/e/kit/handle_error_async_without_async_svelte");
}
function handle_error_and_jsonify(event, state2, error2) {
  if (error2 instanceof HandledHttpError) return error2.body;
  let caught;
  if (error2 instanceof HttpError) caught = {
    kind: "app",
    error: error2.body
  };
  else if (error2 instanceof SvelteKitError) caught = {
    kind: "framework",
    error: {
      status: error2.status,
      message: error2.text
    }
  };
  else if (error2 instanceof ValidationError) caught = {
    kind: "validation",
    error: {
      status: 400,
      message: "Bad Request"
    },
    issues: error2.issues,
    remote: error2.remote
  };
  else {
    caught = {
      kind: "unknown",
      error: error2
    };
    let e = error2;
    while (e instanceof Error) {
      fix_stack_trace(e);
      e = e.cause;
    }
  }
  const fallback = caught.kind === "unknown" ? {
    status: 500,
    message: "Internal Error"
  } : caught.error;
  function merge(body) {
    return {
      ...fallback,
      ...body
    };
  }
  __name(merge, "merge");
  let result;
  try {
    const input = {
      ...caught,
      event
    };
    result = with_request_store({
      event,
      state: state2
    }, () => hooks.handleError(input));
  } catch (hook_error) {
    log_handle_error_hook_failure(error2, hook_error);
    return {
      status: fallback.status,
      message: "Internal Error"
    };
  }
  if (result instanceof Promise) {
    if (state2.is_in_render) {
      handle_error_async_without_async_svelte();
      result.catch((hook_error) => log_handle_error_hook_failure(error2, hook_error));
      return {
        status: fallback.status,
        message: "Internal Error"
      };
    }
    return result.then(merge, (hook_error) => {
      log_handle_error_hook_failure(error2, hook_error);
      return {
        status: fallback.status,
        message: "Internal Error"
      };
    });
  }
  return merge(result);
}
function log_handle_error_hook_failure(error2, hook_error) {
  const failure = capture_error(() => handle_error_hook_failed(void 0, { cause: coalesce_to_error(hook_error) }));
  failure.stack = `${failure.name}: ${failure.message}`;
  console.error(failure);
  if (error2 instanceof SvelteKitError) console.error(`Original error: ${error2.status} ${error2.text}: ${error2.message}`);
  else console.error("Original error:", error2);
}
function default_handle_error({ kind, error: error2, issues, remote }) {
  if (kind === "validation") {
    let fn;
    if (remote?.name && remote.file) fn = `${remote.name} (${remote.file})`;
    else if (remote?.name) fn = remote.name;
    console.error(`Remote function ${fn ? fn + " " : ""}schema validation failed:`, issues);
    return;
  }
  if (kind !== "unknown") return;
  let e = error2;
  while (e instanceof Error) {
    if (e.stack) console.error(e.stack);
    e = e.cause;
  }
  if (e) console.error(String(e));
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: { allow: allowed_methods(mod).join(", ") }
  });
}
function allowed_methods(mod) {
  const allowed3 = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod && !("HEAD" in mod)) allowed3.push("HEAD");
  return allowed3;
}
function redirect_response(status, location) {
  return new Response(void 0, {
    status,
    headers: { location }
  });
}
function is_prerendering(state2) {
  return !!state2.prerendering || state2.prerender_default === true;
}
function with_version_header(response) {
  response.headers.set("x-sveltekit-version", "1795096132895");
  return response;
}
function throw_devalue_error(event, error2) {
  const id = event.route.id;
  if (error2.path) load_not_serializable({
    id,
    message: error2.message,
    path: error2.path
  }, { cause: error2 });
  if (error2.path === "") load_not_plain_object({ id }, { cause: error2 });
  throw new Error(error2.message, { cause: error2 });
}
function serialize_uses(node) {
  const uses = {};
  if (node.uses && node.uses.dependencies.size > 0) uses.dependencies = Array.from(node.uses.dependencies);
  if (node.uses && node.uses.search_params.size > 0) uses.search_params = Array.from(node.uses.search_params);
  if (node.uses && node.uses.params.size > 0) uses.params = Array.from(node.uses.params);
  if (node.uses?.parent) uses.parent = 1;
  if (node.uses?.route) uses.route = 1;
  if (node.uses?.url) uses.url = 1;
  return uses;
}
function has_prerendered_path(pathname) {
  return manifest.prerendered_routes.has(pathname) || pathname.at(-1) === "/" && manifest.prerendered_routes.has(pathname.slice(0, -1));
}
function get_node_type(node_id) {
  const filename = node_id?.split("/")?.at(-1);
  if (!filename) return "unknown";
  return filename.split(".").slice(0, -1).join(".");
}
function is_action_json_request(event) {
  return negotiate(event.request.headers.get("accept") ?? "*/*", ["application/json", "text/html"]) === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, state2, server2) {
  return action_result_json(event, state2, await handle_action_request(event, state2, server2));
}
async function action_result_json(event, state2, result) {
  if (result.type === "redirect") return action_json(result);
  if (result.type === "error") {
    const error2 = await handle_error_and_jsonify(event, state2, result.error);
    return action_json({
      ...result,
      error: error2
    }, { status: error2.status });
  }
  if (result.type === "success" && !result.data) return action_json({
    ...result,
    status: 204,
    data: void 0
  });
  try {
    return action_json({
      ...result,
      data: try_serialize(result.data, stringify2, event.route.id)
    }, { status: result.status });
  } catch (error2) {
    return action_result_json(event, state2, action_error_result(error2, result.location));
  }
}
function get_action_location(url2) {
  const location = new URL(url2);
  for (const key of location.searchParams.keys()) if (key.startsWith("/")) {
    location.searchParams.delete(key);
    break;
  }
  return (location.pathname.startsWith("//") ? "/." + location.pathname : location.pathname) + location.search;
}
function method_not_allowed_result(event, location) {
  event.setHeaders({ allow: "GET" });
  return {
    type: "error",
    location,
    error: new SvelteKitError(405, "Method Not Allowed", `POST method not allowed. No form actions exist for this page`)
  };
}
function action_error_result(error2, location) {
  const err = normalize_error(error2);
  if (err instanceof Redirect) return {
    type: "redirect",
    status: err.status,
    location: err.location
  };
  return {
    type: "error",
    location,
    error: err
  };
}
function action_json_redirect(redirect2) {
  return action_json({
    type: "redirect",
    status: redirect2.status,
    location: redirect2.location
  });
}
function action_json(data, init2) {
  return with_version_header(Response.json(data, init2));
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, state2, server2) {
  const actions = server2?.actions;
  const location = get_action_location(event.url);
  if (!actions) return method_not_allowed_result(event, location);
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, state2, actions);
    if (data instanceof ActionFailure) return {
      type: "failure",
      status: data.status,
      location,
      data: data.data
    };
    else return {
      type: "success",
      status: 200,
      location,
      data
    };
  } catch (error2) {
    return action_error_result(error2 instanceof ActionFailure ? capture_error(() => action_throw_fail()) : error2, location);
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) action_default_with_named();
}
async function call_action(event, state2, actions) {
  const url2 = new URL(event.request.url);
  let name = "default";
  for (const param of url2.searchParams) if (param[0].startsWith("/")) {
    name = param[0].slice(1);
    if (name === "default") action_name_reserved();
    break;
  }
  if (!Object.hasOwn(actions, name)) throw new SvelteKitError(404, "Not Found", `No action with name '${name}' found`);
  const action = actions[name];
  if (!is_form_content_type(event.request)) throw new SvelteKitError(415, "Unsupported Media Type", `Form actions expect form-encoded data \u2014 received ${event.request.headers.get("content-type")}`);
  return record_span({
    name: "sveltekit.form_action",
    attributes: {
      "sveltekit.form_action.name": name,
      "http.route": event.route.id || "unknown"
    },
    fn: /* @__PURE__ */ __name(async (current) => {
      const traced_event = merge_tracing(event, current);
      const result = await with_request_store({
        event: traced_event,
        state: state2
      }, () => action(traced_event));
      if (result instanceof ActionFailure) current.setAttributes({
        "sveltekit.form_action.result.type": "failure",
        "sveltekit.form_action.result.status": result.status
      });
      return result;
    }, "fn")
  });
}
function uneval_action_response(data, route_id) {
  return try_serialize(data, uneval2, route_id);
}
function try_serialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (error2) {
    if (data instanceof Response) action_response_not_serializable({ id: route_id }, { cause: error2 });
    if ("path" in error2) {
      const values = {
        id: route_id,
        message: error2.message
      };
      action_data_not_serializable(error2.path === "" ? values : {
        ...values,
        path: `data${error2.path}`
      }, { cause: error2 });
    }
    throw error2;
  }
}
function create_live_query_response(event, state2, internals, arg) {
  const cancellation = new AbortController();
  const live_event = {
    ...event,
    request: new Request(event.request, { signal: AbortSignal.any([event.request.signal, cancellation.signal]) })
  };
  const generator = internals.run(live_event, state2, arg);
  let open = true;
  let pulling = false;
  let stream_controller;
  let keep_alive;
  let result;
  function schedule_keep_alive() {
    clearTimeout(keep_alive);
    keep_alive = setTimeout(() => {
      if (!open) return;
      if ((stream_controller.desiredSize ?? 0) > 0) stream_controller.enqueue(text_encoder2.encode(": keep-alive\n\n"));
      schedule_keep_alive();
    }, KEEP_ALIVE_INTERVAL);
  }
  __name(schedule_keep_alive, "schedule_keep_alive");
  function send(data) {
    if (!open) return;
    stream_controller.enqueue(text_encoder2.encode("data: " + JSON.stringify(data) + "\n\n"));
    schedule_keep_alive();
  }
  __name(send, "send");
  function teardown(cancelled) {
    if (!open) return;
    open = false;
    clearTimeout(keep_alive);
    cancellation.abort();
    if (!cancelled) stream_controller.close();
    generator.return(void 0).catch(() => {
    });
  }
  __name(teardown, "teardown");
  event.request.signal.addEventListener("abort", () => teardown(true), { once: true });
  return new Response(new ReadableStream({
    start(controller) {
      stream_controller = controller;
      schedule_keep_alive();
    },
    async pull() {
      if (!open || pulling) return;
      pulling = true;
      try {
        while (open) {
          const { value, done } = await generator.next();
          if (!open) return;
          if (done) {
            teardown(false);
            return;
          }
          if (result !== (result = stringify2(value))) {
            send({
              type: "result",
              result
            });
            return;
          }
        }
      } catch (error2) {
        if (!open) return;
        if (error2 instanceof Redirect) send({
          type: "redirect",
          location: error2.location
        });
        else send({
          type: "error",
          error: await handle_error_and_jsonify(event, state2, error2)
        });
        teardown(false);
      } finally {
        pulling = false;
      }
    },
    cancel() {
      teardown(true);
    }
  }), { headers: {
    "cache-control": "private, no-store",
    "content-type": "text/event-stream"
  } });
}
async function handle_remote_call(event, state2, id) {
  return record_span({
    name: "sveltekit.remote.call",
    attributes: { "sveltekit.remote.call.id": id },
    fn: /* @__PURE__ */ __name(async (current) => {
      const traced_event = merge_tracing(event, current);
      return with_version_header(await with_request_store({
        event: traced_event,
        state: state2
      }, () => handle_remote_call_internal(traced_event, state2, id)));
    }, "fn")
  });
}
async function get_remote_function(id, manifest3) {
  const first_slash = id.indexOf("/");
  if (first_slash === -1) return;
  const second_slash = id.indexOf("/", first_slash + 1);
  const hash2 = id.substring(0, first_slash);
  let name;
  let additional_args = "";
  if (second_slash === -1) name = id.substring(first_slash + 1);
  else {
    name = id.substring(first_slash + 1, second_slash);
    additional_args = id.substring(second_slash + 1);
  }
  const remotes = manifest3.remotes;
  if (!Object.hasOwn(remotes, hash2)) return;
  const module2 = await remotes[hash2]();
  if (!Object.hasOwn(module2.default, name)) return;
  return {
    fn: module2.default[name],
    name,
    additional_args
  };
}
async function handle_remote_call_internal(event, state2, id) {
  const remote = await get_remote_function(id, manifest);
  if (!remote) error(404);
  const { fn, additional_args } = remote;
  const internals = fn.__;
  event.tracing.current.setAttributes({
    "sveltekit.remote.call.type": internals.type,
    "sveltekit.remote.call.name": internals.name
  });
  const headers3 = state2.prerendering ? void 0 : { "cache-control": "private, no-store" };
  try {
    const data = {};
    switch (internals.type) {
      case "query_live":
        if (event.request.method !== "GET") throw new SvelteKitError(405, "Method Not Allowed", `\`query.live\` functions must be invoked via GET request, not ${event.request.method}`);
        return create_live_query_response(event, state2, internals, parse_remote_arg(new URL(event.request.url).searchParams.get("payload")));
      case "query_batch": {
        if (event.request.method !== "POST") throw new SvelteKitError(405, "Method Not Allowed", `\`query.batch\` functions must be invoked via POST request, not ${event.request.method}`);
        const { payloads } = await event.request.json();
        const args = await Promise.all(payloads.map((payload2) => parse_remote_arg(payload2)));
        data._ = await with_request_store({
          event,
          state: state2
        }, () => internals.run(args));
        break;
      }
      case "form": {
        if (event.request.method !== "POST") throw new SvelteKitError(405, "Method Not Allowed", `\`form\` functions must be invoked via POST request, not ${event.request.method}`);
        if (!is_form_content_type(event.request)) throw new SvelteKitError(415, "Unsupported Media Type", `\`form\` functions expect form-encoded data \u2014 received ${event.request.headers.get("content-type")}`);
        const { data: input, meta, form_data } = await deserialize_binary_form(event.request, internals.id);
        state2.remote.requested = create_requested_map(meta.remote_refreshes);
        if (additional_args && !("id" in input)) input.id = JSON.parse(decodeURIComponent(additional_args));
        const fn2 = internals.fn;
        data._ = await with_request_store({
          event,
          state: {
            ...state2,
            is_in_remote_form_or_command: true
          }
        }, () => fn2(input, meta, form_data));
        if (data._.issues) return Response.json({
          type: "result",
          data: stringify2(data)
        }, { headers: headers3 });
        break;
      }
      case "command": {
        const { payload: payload2, refreshes } = await event.request.json();
        state2.remote.requested = create_requested_map(refreshes);
        const arg = parse_remote_arg(payload2);
        data._ = await with_request_store({
          event,
          state: {
            ...state2,
            is_in_remote_form_or_command: true
          }
        }, () => fn(arg));
        break;
      }
      case "prerender":
        data._ = await with_request_store({
          event,
          state: state2
        }, () => fn(parse_remote_arg(additional_args)));
        break;
      case "query": {
        const payload2 = new URL(event.request.url).searchParams.get("payload");
        data._ = await with_request_store({
          event,
          state: state2
        }, () => fn(parse_remote_arg(payload2)));
        break;
      }
    }
    await collect_remote_data(data, event, state2);
    if (state2.remote.ignored?.size) data.i = Array.from(state2.remote.ignored);
    return Response.json({
      type: "result",
      data: stringify2(data)
    }, { headers: headers3 });
  } catch (error2) {
    if (error2 instanceof Redirect) {
      const data = await collect_remote_data({ redirect: error2.location }, event, state2);
      return Response.json({
        type: "result",
        data: stringify2(data)
      }, { headers: headers3 });
    }
    const transformed = await handle_error_and_jsonify(event, state2, error2);
    return Response.json({
      type: "error",
      error: transformed
    }, {
      status: state2.prerendering ? transformed.status : void 0,
      headers: { "cache-control": "private, no-store" }
    });
  }
}
async function collect_remote_data(data, event, state2) {
  function convert_error(error2) {
    return Promise.resolve(handle_error_and_jsonify(event, state2, error2));
  }
  __name(convert_error, "convert_error");
  const promises = [];
  const processed = /* @__PURE__ */ new Set();
  if (state2.remote.explicit) {
    const { explicit } = state2.remote;
    const inflight = [];
    const drain = /* @__PURE__ */ __name(() => {
      for (const [remote_key, { internals, fn }] of explicit) {
        explicit.delete(remote_key);
        if (processed.has(remote_key)) continue;
        processed.add(remote_key);
        data.r = true;
        const type = internals.type === "query_live" ? "l" : internals.type[0];
        inflight.push(fn().then((v) => {
          (data[type] ??= {})[remote_key] = { v };
          drain();
        }, async (e) => {
          if (!(e instanceof Redirect)) (data[type] ??= {})[remote_key] = { e: await convert_error(e) };
          drain();
        }));
      }
    }, "drain");
    drain();
    for (const promise of inflight) await promise;
  }
  if (state2.remote.implicit) for (const [internals, record] of state2.remote.implicit) {
    if (!internals.id) continue;
    for (const key in record) {
      const remote_key = internals.type === "form" ? key : create_remote_key(internals.id, key);
      if (processed.has(remote_key)) continue;
      const type = internals.type === "query_live" ? "l" : internals.type[0];
      const promise = state2.remote.data?.get(internals)?.[key] ?? record[key]();
      let resolved = true;
      await Promise.race([Promise.resolve(promise).then((v) => {
        if (resolved) ((data[type] ??= {})[remote_key] ??= {}).v = v;
      }, (e) => {
        if (e instanceof Redirect) return;
        if (resolved) promises.push(convert_error(e).then((e2) => {
          ((data[type] ??= {})[remote_key] ??= {}).e = e2;
        }));
      }), Promise.resolve().then(() => resolved = false)]);
    }
  }
  await Promise.all(promises);
  return data;
}
function create_requested_map(refreshes) {
  const requested = /* @__PURE__ */ new Map();
  for (const key of refreshes ?? []) {
    const parts = split_remote_key(key);
    const existing = requested.get(parts.id);
    if (existing) existing.add(parts.payload);
    else requested.set(parts.id, /* @__PURE__ */ new Set([parts.payload]));
  }
  return requested;
}
async function handle_remote_form_post(event, state2, id) {
  return record_span({
    name: "sveltekit.remote.form.post",
    attributes: { "sveltekit.remote.form.post.id": id },
    fn: /* @__PURE__ */ __name((current) => {
      const traced_event = merge_tracing(event, current);
      return with_request_store({
        event: traced_event,
        state: state2
      }, () => handle_remote_form_post_internal(traced_event, state2, id));
    }, "fn")
  });
}
async function handle_remote_form_post_internal(event, state2, id) {
  const location = get_action_location(event.url);
  const remote = await get_remote_function(id, manifest);
  if (!remote) return method_not_allowed_result(event, location);
  let form = remote.fn;
  const action_id = remote.additional_args;
  if (action_id) form = with_request_store({
    event,
    state: state2
  }, () => form.for(JSON.parse(action_id)));
  try {
    const __ = form.__;
    const { data, meta, form_data } = await deserialize_binary_form(event.request, __.id);
    if (action_id && !("id" in data)) data.id = JSON.parse(decodeURIComponent(action_id));
    await with_request_store({
      event,
      state: {
        ...state2,
        is_in_remote_form_or_command: true
      }
    }, () => __.fn(data, meta, form_data));
    return {
      type: "success",
      status: 200,
      location
    };
  } catch (e) {
    return action_error_result(e, location);
  }
}
function has_remote_prefix(url2) {
  return url2.pathname.startsWith(`/${app_dir}/remote/`);
}
function strip_remote_prefix(url2) {
  return url2.pathname.replace(`/${app_dir}/remote/`, "");
}
function get_remote_id(url2) {
  return has_remote_prefix(url2) && strip_remote_prefix(url2);
}
function get_remote_action(url2) {
  return url2.searchParams.get("/remote");
}
function set_fix_stack_trace(fn) {
  fix_stack_trace = fn;
}
function get_source_map(file) {
  if (source_maps.has(file)) return source_maps.get(file);
  try {
    let source;
    let directory = path.dirname(file);
    const code = fs.readFileSync(file, "utf8");
    const url2 = Array.from(code.matchAll(/\/\/[#@]\s*sourceMappingURL=(\S+)/g)).at(-1)?.[1];
    if (url2?.startsWith("data:")) {
      const comma = url2.indexOf(",");
      const metadata = url2.slice(5, comma);
      const data = url2.slice(comma + 1);
      source = metadata.endsWith(";base64") ? Buffer.from(data, "base64").toString() : decodeURIComponent(data);
    } else {
      const map_file = url2 ? path.resolve(path.dirname(file), decodeURIComponent(url2)) : `${file}.map`;
      if (fs.existsSync(map_file)) {
        directory = path.dirname(map_file);
        source = fs.readFileSync(map_file, "utf8");
      }
    }
    if (source) {
      const source_map = {
        map: new module.SourceMap(JSON.parse(source)),
        directory
      };
      source_maps.set(file, source_map);
      return source_map;
    }
  } catch {
  }
  source_maps.set(file, null);
  return null;
}
function trace(file, line, column) {
  const source_map = get_source_map(file);
  if (!source_map) return null;
  const entry = source_map.map.findEntry(line, column);
  if (entry && "originalSource" in entry && entry.originalSource && typeof entry.originalLine === "number" && typeof entry.originalColumn === "number") {
    const traced = {
      file: entry.originalSource.startsWith("file:") ? url.fileURLToPath(entry.originalSource) : path.resolve(source_map.directory, entry.originalSource),
      line: entry.originalLine + 1,
      column: entry.originalColumn + 1
    };
    return trace(traced.file, traced.line - 1, traced.column - 1) ?? traced;
  }
  let regions = source_regions.get(file);
  if (!regions) {
    let source2;
    regions = fs.readFileSync(file, "utf8").split("\n").map((line2) => {
      const start = line2.match(/^\/\/#region (.+)$/);
      if (start) source2 = start[1];
      if (line2 === "//#endregion") source2 = void 0;
      return source2;
    });
    source_regions.set(file, regions);
  }
  const source = regions[line];
  if (source) return { file: source };
  return null;
}
function set_read_implementation(read) {
  read_implementation = /* @__PURE__ */ __name((file) => {
    const result = read(file);
    if (result instanceof ReadableStream) return result;
    return stream_from_iterable((async function* () {
      const stream = await result;
      if (stream) yield* stream;
    })());
  }, "read_implementation");
}
function set_manifest(value) {
  manifest = value;
}
function set_hooks(value) {
  hooks = value;
}
var verbose2, assets, app_dir, symbol, state, text_encoder2, text_decoder, DATA_SUFFIX, HTML_DATA_SUFFIX, ROUTE_SUFFIX, HTML_ROUTE_SUFFIX, escape_sequence_pattern, internal2, error_template_default, options, DELETE_KEY, BINARY_FORM_CONTENT_TYPE, BINARY_FORM_VERSION, HEADER_BYTES, LazyFile, path_regex, uneval2, stringify2, parse2, encoders, decoders, has_custom_transporters, INVALIDATED_PARAM, TRAILING_SLASH_PARAM, remote_object, remote_map, remote_set, remote_file, remote_arg_marker, ENDPOINT_METHODS, MUTATIVE_METHODS2, BODY_DEPENDENT_METHODS2, PAGE_METHODS, IN_WEBCONTAINER2, REROUTED_URL_HEADER, KEEP_ALIVE_INTERVAL, fs, url, path, module, cwd, relative, fix_stack_trace, source_maps, source_regions, styleText, read_implementation, manifest, hooks;
var init_internal2 = __esm({
  ".svelte-kit/output/server/chunks/internal.js"() {
    "use strict";
    init_server_errors();
    init_functions();
    init_exports();
    init_internal();
    init_server2();
    init_devalue();
    verbose2 = false;
    __name(enable_verbose_errors, "enable_verbose_errors");
    __name(throw_error4, "throw_error");
    assets = "";
    app_dir = "_app";
    __name(set_assets, "set_assets");
    symbol = /* @__PURE__ */ Symbol.for("sveltekit.global_state");
    state = globalThis[symbol] ??= {};
    text_encoder2 = new TextEncoder();
    __name(stream_from_iterable, "stream_from_iterable");
    __name(stream_text, "stream_text");
    text_decoder = new TextDecoder();
    __name(base64_encode, "base64_encode");
    __name(base64_decode, "base64_decode");
    DATA_SUFFIX = "/__data.json";
    HTML_DATA_SUFFIX = ".html__data.json";
    __name(has_data_suffix2, "has_data_suffix");
    __name(add_data_suffix2, "add_data_suffix");
    __name(strip_data_suffix2, "strip_data_suffix");
    ROUTE_SUFFIX = "/__route.js";
    HTML_ROUTE_SUFFIX = ".html__route.js";
    __name(has_resolution_suffix2, "has_resolution_suffix");
    __name(add_resolution_suffix2, "add_resolution_suffix");
    __name(strip_resolution_suffix2, "strip_resolution_suffix");
    __name(form_field_array_conflict, "form_field_array_conflict");
    __name(form_field_duplicate, "form_field_duplicate");
    __name(form_field_forbidden_key, "form_field_forbidden_key");
    __name(form_field_invalid_name, "form_field_invalid_name");
    __name(form_field_unbound, "form_field_unbound");
    __name(invalid_export, "invalid_export");
    __name(invalid_export_location, "invalid_export_location");
    __name(param_matcher_async, "param_matcher_async");
    __name(param_matcher_result_invalid, "param_matcher_result_invalid");
    __name(url_hash_unavailable2, "url_hash_unavailable");
    escape_sequence_pattern = /\[([ux])\+([^\]]+)\]/;
    __name(run_matcher, "run_matcher");
    __name(exec, "exec");
    new RegExp(`${escape_sequence_pattern.source}|${/\[(\[)?(\.\.\.)?([\w-]+?)(?:=([\w-]+))?\]\]?/g.source}`, "g");
    __name(find_route, "find_route");
    internal2 = new URL("a://");
    __name(resolve, "resolve");
    __name(relative_pathname, "relative_pathname");
    __name(normalize_path, "normalize_path");
    __name(decode_pathname, "decode_pathname");
    __name(make_trackable, "make_trackable");
    __name(disable_hash, "disable_hash");
    __name(disable_search, "disable_search");
    __name(allow_nodejs_console_log, "allow_nodejs_console_log");
    error_template_default = /* @__PURE__ */ __name(({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n", "error_template_default");
    options = {
      app_template_contains_nonce: false,
      csp: {
        "mode": "auto",
        "directives": {
          "upgrade-insecure-requests": false,
          "block-all-mixed-content": false
        },
        "reportOnly": {
          "upgrade-insecure-requests": false,
          "block-all-mixed-content": false
        }
      },
      csrf_trusted_origins: [],
      service_worker_options: void 0,
      templates: {
        app: /* @__PURE__ */ __name(({ head: head2, body, assets: assets3, nonce, env: env2 }) => '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <meta name="theme-color" content="#7c3aed" />\n    <meta name="apple-mobile-web-app-capable" content="yes" />\n    <meta name="apple-mobile-web-app-status-bar-style" content="default" />\n    <meta name="apple-mobile-web-app-title" content="JPCO Admin" />\n    <link rel="manifest" href="/manifest.webmanifest" />\n    <link rel="icon" href="/registration_karo_logo.png" />\n    <link rel="apple-touch-icon" href="/registration_karo_logo.png" />\n    ' + head2 + '\n  </head>\n  <body data-sveltekit-preload-data="hover">\n    <div style="display: contents">' + body + "</div>\n  </body>\n</html>\n", "app"),
        error: error_template_default
      }
    };
    __name(get_hooks, "get_hooks");
    __name(set_nested_value, "set_nested_value");
    __name(parse_form_key, "parse_form_key");
    __name(coerce_form_value, "coerce_form_value");
    DELETE_KEY = {};
    __name(group_formdata, "group_formdata");
    __name(convert_formdata, "convert_formdata");
    BINARY_FORM_CONTENT_TYPE = "application/x-sveltekit-formdata";
    BINARY_FORM_VERSION = 0;
    HEADER_BYTES = 7;
    __name(deserialize_binary_form, "deserialize_binary_form");
    __name(deserialize_error, "deserialize_error");
    __name(read_range, "read_range");
    LazyFile = class LazyFile2 {
      static {
        __name(this, "LazyFile");
      }
      /** @type {(index: number) => Promise<Uint8Array<ArrayBuffer> | undefined>} */
      #get_chunk;
      /** @type {number} */
      #offset;
      /**
      * @param {string} name
      * @param {string} type
      * @param {number} size
      * @param {number} last_modified
      * @param {(index: number) => Promise<Uint8Array<ArrayBuffer> | undefined>} get_chunk
      * @param {number} offset
      */
      constructor(name, type, size, last_modified, get_chunk, offset) {
        this.name = name;
        this.type = type;
        this.size = size;
        this.lastModified = last_modified;
        this.webkitRelativePath = "";
        this.#get_chunk = get_chunk;
        this.#offset = offset;
        this.arrayBuffer = this.arrayBuffer.bind(this);
        this.bytes = this.bytes.bind(this);
        this.slice = this.slice.bind(this);
        this.stream = this.stream.bind(this);
        this.text = this.text.bind(this);
      }
      /** @type {ArrayBuffer | undefined} */
      #buffer;
      async arrayBuffer() {
        this.#buffer ??= await new Response(this.stream()).arrayBuffer();
        return this.#buffer;
      }
      async bytes() {
        return new Uint8Array(await this.arrayBuffer());
      }
      /**
      * @param {number=} start
      * @param {number=} end
      * @param {string=} contentType
      */
      slice(start = 0, end = this.size, contentType = this.type) {
        if (start < 0) start = Math.max(this.size + start, 0);
        else start = Math.min(start, this.size);
        if (end < 0) end = Math.max(this.size + end, 0);
        else end = Math.min(end, this.size);
        const size = Math.max(end - start, 0);
        return new LazyFile2(this.name, contentType, size, this.lastModified, this.#get_chunk, this.#offset + start);
      }
      stream() {
        const range = read_range(this.#get_chunk, this.#offset, this.size);
        const size = this.size;
        return stream_from_iterable((async function* () {
          let cursor = 0;
          for await (const chunk of range) {
            cursor += chunk.byteLength;
            yield chunk;
          }
          if (cursor < size) throw new Error("incomplete file data");
        })());
      }
      async text() {
        return text_decoder.decode(await this.arrayBuffer());
      }
    };
    path_regex = /^[a-zA-Z_$]\w*(\.[a-zA-Z_$]\w*|\[\d+\])*$/;
    __name(split_path, "split_path");
    __name(check_prototype_pollution, "check_prototype_pollution");
    __name(deep_set, "deep_set");
    __name(negotiate, "negotiate");
    __name(matches_content_type, "matches_content_type");
    __name(is_form_content_type, "is_form_content_type");
    uneval2 = /* @__PURE__ */ __name(() => {
      throw new Error("");
    }, "uneval");
    stringify2 = /* @__PURE__ */ __name(() => {
      throw new Error("");
    }, "stringify");
    parse2 = /* @__PURE__ */ __name(() => {
      throw new Error("");
    }, "parse");
    encoders = {};
    decoders = {};
    has_custom_transporters = false;
    __name(init_transport, "init_transport");
    __name(fetch_cache_url, "fetch_cache_url");
    INVALIDATED_PARAM = "x-sveltekit-invalidated";
    TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
    remote_object = "__skrao";
    remote_map = "__skram";
    remote_set = "__skras";
    remote_file = "__skraf";
    remote_arg_marker = Symbol(remote_object);
    __name(create_remote_arg_revivers, "create_remote_arg_revivers");
    __name(parse_remote_arg, "parse_remote_arg");
    __name(create_remote_key, "create_remote_key");
    __name(split_remote_key, "split_remote_key");
    __name(set_error_stack, "set_error_stack");
    __name(coalesce_to_error, "coalesce_to_error");
    __name(normalize_error, "normalize_error");
    __name(get_status, "get_status");
    __name(handle_error_async_without_async_svelte, "handle_error_async_without_async_svelte");
    __name(handle_error_and_jsonify, "handle_error_and_jsonify");
    __name(log_handle_error_hook_failure, "log_handle_error_hook_failure");
    __name(default_handle_error, "default_handle_error");
    ENDPOINT_METHODS = [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "QUERY"
    ];
    MUTATIVE_METHODS2 = [
      "POST",
      "PUT",
      "PATCH",
      "DELETE"
    ];
    BODY_DEPENDENT_METHODS2 = [...MUTATIVE_METHODS2, "QUERY"];
    PAGE_METHODS = [
      "GET",
      "POST",
      "HEAD"
    ];
    import.meta.dirname;
    IN_WEBCONTAINER2 = !!globalThis.process?.versions?.webcontainer;
    REROUTED_URL_HEADER = "x-sveltekit-rerouted-url";
    __name(method_not_allowed, "method_not_allowed");
    __name(allowed_methods, "allowed_methods");
    __name(redirect_response, "redirect_response");
    __name(is_prerendering, "is_prerendering");
    __name(with_version_header, "with_version_header");
    __name(throw_devalue_error, "throw_devalue_error");
    __name(serialize_uses, "serialize_uses");
    __name(has_prerendered_path, "has_prerendered_path");
    __name(get_node_type, "get_node_type");
    __name(is_action_json_request, "is_action_json_request");
    __name(handle_action_json_request, "handle_action_json_request");
    __name(action_result_json, "action_result_json");
    __name(get_action_location, "get_action_location");
    __name(method_not_allowed_result, "method_not_allowed_result");
    __name(action_error_result, "action_error_result");
    __name(action_json_redirect, "action_json_redirect");
    __name(action_json, "action_json");
    __name(is_action_request, "is_action_request");
    __name(handle_action_request, "handle_action_request");
    __name(check_named_default_separate, "check_named_default_separate");
    __name(call_action, "call_action");
    __name(uneval_action_response, "uneval_action_response");
    __name(try_serialize, "try_serialize");
    KEEP_ALIVE_INTERVAL = 3e4;
    __name(create_live_query_response, "create_live_query_response");
    __name(handle_remote_call, "handle_remote_call");
    __name(get_remote_function, "get_remote_function");
    __name(handle_remote_call_internal, "handle_remote_call_internal");
    __name(collect_remote_data, "collect_remote_data");
    __name(create_requested_map, "create_requested_map");
    __name(handle_remote_form_post, "handle_remote_form_post");
    __name(handle_remote_form_post_internal, "handle_remote_form_post_internal");
    __name(has_remote_prefix, "has_remote_prefix");
    __name(strip_remote_prefix, "strip_remote_prefix");
    __name(get_remote_id, "get_remote_id");
    __name(get_remote_action, "get_remote_action");
    fs = globalThis.process?.getBuiltinModule?.("node:fs");
    url = globalThis.process?.getBuiltinModule?.("node:url");
    path = globalThis.process?.getBuiltinModule?.("node:path");
    module = globalThis.process?.getBuiltinModule?.("node:module");
    cwd = globalThis.process?.cwd?.();
    relative = cwd ? (file) => path.relative(cwd, file) : (file) => file;
    fix_stack_trace = /* @__PURE__ */ __name((error2) => {
      if (!error2.stack || !fs) return;
      let end = 0;
      set_error_stack(error2, error2.stack.split("\n").map((line, i) => {
        const match = line.match(/^ {4}at.+(file:\/\/\/.*):(\d+):(\d+)(\)?)$/);
        if (!match) {
          if (!line.includes("node:internal/")) end = i + 1;
          return line;
        }
        const file = url.fileURLToPath(match[1]);
        const traced = trace(file, Number(match[2]) - 1, Number(match[3]) - 1);
        if (!/[\\/]node_modules[\\/]/.test(traced?.file ?? file)) end = i + 1;
        if (traced?.line) {
          const location = `${match[1]}:${match[2]}:${match[3]}`;
          const original = `${relative(traced.file)}:${traced.line}:${traced.column}`;
          return line.replace(location, original);
        }
        if (traced) return `${line.replace(match[1], relative(file))} [${traced.file}]`;
        return line;
      }).slice(0, end).join("\n"));
    }, "fix_stack_trace");
    __name(set_fix_stack_trace, "set_fix_stack_trace");
    source_maps = /* @__PURE__ */ new Map();
    source_regions = /* @__PURE__ */ new Map();
    __name(get_source_map, "get_source_map");
    __name(trace, "trace");
    styleText = globalThis.process?.getBuiltinModule?.("node:util")?.styleText ?? ((_format, text2) => text2);
    read_implementation = false;
    manifest = false;
    hooks = false;
    __name(set_read_implementation, "set_read_implementation");
    __name(set_manifest, "set_manifest");
    __name(set_hooks, "set_hooks");
  }
});

// .svelte-kit/output/server/env.js
function set_env(env2) {
}
var explicit_public_env, rendered_env;
var init_env = __esm({
  ".svelte-kit/output/server/env.js"() {
    "use strict";
    explicit_public_env = {};
    rendered_env = {};
    __name(set_env, "set_env");
  }
});

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var init_clsx = __esm({
  "node_modules/clsx/dist/clsx.mjs"() {
    __name(r, "r");
    __name(clsx, "clsx");
  }
});

// .svelte-kit/output/server/chunks/server2.js
function escape_html(value, is_attr) {
  const str = String(value ?? "");
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function deferred() {
  var resolve2;
  var reject;
  return {
    promise: new Promise((res, rej) => {
      resolve2 = res;
      reject = rej;
    }),
    resolve: resolve2,
    reject
  };
}
function attr(name, value, is_boolean = false) {
  if (name === "hidden" && value !== "until-found") is_boolean = true;
  if (value == null || is_boolean && !value && value !== "") return "";
  const normalized = has_own_property.call(replacements, name) && replacements[name].get(value) || value;
  return ` ${name}${is_boolean ? `=""` : `="${escape_html(normalized, true)}"`}`;
}
function clsx$1(value) {
  if (typeof value === "object") return clsx(value);
  else return value ?? "";
}
function to_class(value, hash2, directives) {
  var classname = value == null ? "" : "" + value;
  if (hash2) classname = classname ? classname + " " + hash2 : hash2;
  if (directives) {
    for (var key of Object.keys(directives)) if (directives[key]) classname = classname ? classname + " " + key : key;
    else if (classname.length) {
      var len = key.length;
      var a = 0;
      while ((a = classname.indexOf(key, a)) >= 0) {
        var b = a + len;
        if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
        else a = b;
      }
    }
  }
  return classname === "" ? null : classname;
}
function append_styles(styles, important = false) {
  var separator = important ? " !important;" : ";";
  var css = "";
  for (var key of Object.keys(styles)) {
    var value = styles[key];
    if (value != null && value !== "") css += " " + key + ": " + value + separator;
  }
  return css;
}
function to_css_name(name) {
  if (name[0] !== "-" || name[1] !== "-") return name.toLowerCase();
  return name;
}
function to_style(value, styles) {
  if (styles) {
    var new_style = "";
    var normal_styles;
    var important_styles;
    if (Array.isArray(styles)) {
      normal_styles = styles[0];
      important_styles = styles[1];
    } else normal_styles = styles;
    if (value) {
      value = String(value).replaceAll(/\/\*.*?\*\//g, "").trim();
      var in_str = false;
      var in_apo = 0;
      var in_comment = false;
      var reserved_names = [];
      if (normal_styles) reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
      if (important_styles) reserved_names.push(...Object.keys(important_styles).map(to_css_name));
      var start_index = 0;
      var name_index = -1;
      const len = value.length;
      for (var i = 0; i < len; i++) {
        var c = value[i];
        if (in_comment) {
          if (c === "/" && value[i - 1] === "*") in_comment = false;
        } else if (in_str) {
          if (in_str === c) in_str = false;
        } else if (c === "/" && value[i + 1] === "*") in_comment = true;
        else if (c === '"' || c === "'") in_str = c;
        else if (c === "(") in_apo++;
        else if (c === ")") in_apo--;
        if (!in_comment && in_str === false && in_apo === 0) {
          if (c === ":" && name_index === -1) name_index = i;
          else if (c === ";" || i === len - 1) {
            if (name_index !== -1) {
              var name = to_css_name(value.substring(start_index, name_index).trim());
              if (!reserved_names.includes(name)) {
                if (c !== ";") i++;
                var property = value.substring(start_index, i).trim();
                new_style += " " + property + ";";
              }
            }
            start_index = i + 1;
            name_index = -1;
          }
        }
      }
    }
    if (normal_styles) new_style += append_styles(normal_styles);
    if (important_styles) new_style += append_styles(important_styles, true);
    new_style = new_style.trim();
    return new_style === "" ? null : new_style;
  }
  return value == null ? null : String(value);
}
function lifecycle_outside_component(name) {
  throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
}
function get_parent_context(context3) {
  let parent = context3.p;
  while (parent !== null && parent.c === null) parent = parent.p;
  return parent?.c ?? null;
}
function get_or_init_context_map(context3, name) {
  if (context3 === null) lifecycle_outside_component(name);
  return context3.c ??= new Map(get_parent_context(context3) || void 0);
}
function is_boolean_attribute(name) {
  return DOM_BOOLEAN_ATTRIBUTES.includes(name);
}
function async_local_storage_unavailable() {
  const error2 = /* @__PURE__ */ new Error(`async_local_storage_unavailable
The node API \`AsyncLocalStorage\` is not available, but is required to use async server rendering.
https://svelte.dev/e/async_local_storage_unavailable`);
  error2.name = "Svelte error";
  throw error2;
}
function await_invalid() {
  const error2 = /* @__PURE__ */ new Error(`await_invalid
Encountered asynchronous work while rendering synchronously.
https://svelte.dev/e/await_invalid`);
  error2.name = "Svelte error";
  throw error2;
}
function html_deprecated() {
  const error2 = /* @__PURE__ */ new Error(`html_deprecated
The \`html\` property of server render results has been deprecated. Use \`body\` instead.
https://svelte.dev/e/html_deprecated`);
  error2.name = "Svelte error";
  throw error2;
}
function invalid_csp() {
  const error2 = /* @__PURE__ */ new Error(`invalid_csp
\`csp.nonce\` was set while \`csp.hash\` was \`true\`. These options cannot be used simultaneously.
https://svelte.dev/e/invalid_csp`);
  error2.name = "Svelte error";
  throw error2;
}
function invalid_id_prefix() {
  const error2 = /* @__PURE__ */ new Error(`invalid_id_prefix
The \`idPrefix\` option cannot include \`--\`.
https://svelte.dev/e/invalid_id_prefix`);
  error2.name = "Svelte error";
  throw error2;
}
function server_context_required() {
  const error2 = /* @__PURE__ */ new Error(`server_context_required
Could not resolve \`render\` context.
https://svelte.dev/e/server_context_required`);
  error2.name = "Svelte error";
  throw error2;
}
function set_ssr_context(v) {
  ssr_context = v;
}
function getContext(key) {
  return get_or_init_context_map(ssr_context, "getContext").get(key);
}
function push(fn) {
  ssr_context = {
    p: ssr_context,
    c: null,
    r: null,
    i: false
  };
}
function pop() {
  ssr_context = ssr_context.p;
}
function unresolved_hydratable(key, stack) {
  console.warn(`https://svelte.dev/e/unresolved_hydratable`);
}
function get_render_context() {
  const store = context ?? als2?.getStore();
  if (!store) server_context_required();
  return store;
}
async function with_render_context(fn) {
  context = { hydratable: {
    lookup: /* @__PURE__ */ new Map(),
    comparisons: [],
    unresolved_promises: /* @__PURE__ */ new Map()
  } };
  if (in_webcontainer()) {
    const { promise, resolve: resolve2 } = deferred();
    const previous_render = current_render;
    current_render = promise;
    await previous_render;
    return fn().finally(resolve2);
  }
  try {
    if (als2 === null) async_local_storage_unavailable();
    return als2.run(context, fn);
  } finally {
    context = null;
  }
}
function init_render_context() {
  als_import ??= import("node:async_hooks").then((hooks2) => {
    als2 = new hooks2.AsyncLocalStorage();
  }).then(noop2, noop2);
  return als_import;
}
function in_webcontainer() {
  return !!globalThis.process?.versions?.webcontainer;
}
async function sha256(data) {
  text_encoder3 ??= new TextEncoder();
  crypto2 ??= globalThis.crypto?.subtle?.digest ? globalThis.crypto : (await obfuscated_import("node:crypto")).webcrypto;
  return base64_encode2(await crypto2.subtle.digest("SHA-256", text_encoder3.encode(data)));
}
function base64_encode2(bytes) {
  if (globalThis.Buffer) return globalThis.Buffer.from(bytes).toString("base64");
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}
function render(component20, options2 = {}) {
  if (options2.csp?.hash && options2.csp.nonce) invalid_csp();
  return Renderer.render(component20, options2);
}
function head(hash2, renderer, fn) {
  renderer.head((renderer2) => {
    renderer2.push(`<!--${hash2}-->`);
    renderer2.child(fn);
    renderer2.push(EMPTY_COMMENT);
  });
}
function attributes(attrs, css_hash, classes, styles, flags = 0) {
  if (styles) attrs.style = to_style(attrs.style, styles);
  if (attrs.class) attrs.class = clsx$1(attrs.class);
  if (css_hash || classes) attrs.class = to_class(attrs.class, css_hash, classes);
  let attr_str = "";
  let name;
  const is_html = (flags & 1) === 0;
  const lowercase = (flags & 2) === 0;
  const is_input = (flags & 4) !== 0;
  const names = Object.keys(attrs);
  outer: for (let i = 0; i < names.length; i++) {
    name = names[i];
    if (typeof attrs[name] === "function") continue;
    if (name[0] === "$" && name[1] === "$") continue;
    if (name === "" || INVALID_ATTR_NAME_CHAR_REGEX.test(name)) continue;
    var value = attrs[name];
    var lower = name.toLowerCase();
    if (lowercase) name = lower;
    if (lower.length > 2 && lower.startsWith("on")) continue;
    if (is_input) {
      if (name === "defaultvalue" || name === "defaultchecked") {
        name = name === "defaultvalue" ? "value" : "checked";
        if (name in attrs) continue;
        for (let j = 0; j < names.length; j++) if (names[j].toLowerCase() === name) continue outer;
      }
    }
    attr_str += attr(name, value, is_html && is_boolean_attribute(name));
  }
  return attr_str;
}
function attr_class(value, hash2, directives) {
  var result = to_class(value, hash2, directives);
  return result ? ` class="${escape_html(result, true)}"` : "";
}
function ensure_array_like(array_like_or_iterator) {
  if (array_like_or_iterator) return array_like_or_iterator.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  return [];
}
function once2(get_value) {
  let value = UNINITIALIZED;
  return () => {
    if (value === UNINITIALIZED) value = get_value();
    return value;
  };
}
function derived(fn) {
  const get_value = ssr_context === null ? fn : once2(fn);
  let updated_value;
  return function(new_value) {
    if (arguments.length === 0) return updated_value ?? get_value();
    updated_value = new_value;
    return updated_value;
  };
}
var UNINITIALIZED, ATTR_REGEX, CONTENT_REGEX, is_array, has_own_property, noop2, replacements, whitespace, STALE_REACTION, async_mode_flag, BLOCK_OPEN, BLOCK_CLOSE, EMPTY_COMMENT, DOM_BOOLEAN_ATTRIBUTES, ssr_context, current_render, context, als2, als_import, text_encoder3, crypto2, obfuscated_import, RenderResult, Renderer, SSRState, INVALID_ATTR_NAME_CHAR_REGEX;
var init_server22 = __esm({
  ".svelte-kit/output/server/chunks/server2.js"() {
    "use strict";
    init_devalue();
    init_clsx();
    UNINITIALIZED = /* @__PURE__ */ Symbol("uninitialized");
    ATTR_REGEX = /[&"<]/g;
    CONTENT_REGEX = /[&<]/g;
    __name(escape_html, "escape_html");
    is_array = Array.isArray;
    Array.prototype.indexOf;
    Array.prototype.includes;
    Array.prototype;
    has_own_property = Object.prototype.hasOwnProperty;
    noop2 = /* @__PURE__ */ __name(() => {
    }, "noop");
    __name(deferred, "deferred");
    replacements = { translate: /* @__PURE__ */ new Map([[true, "yes"], [false, "no"]]) };
    __name(attr, "attr");
    __name(clsx$1, "clsx$1");
    whitespace = [..." 	\n\r\f\xA0\v\uFEFF"];
    __name(to_class, "to_class");
    __name(append_styles, "append_styles");
    __name(to_css_name, "to_css_name");
    __name(to_style, "to_style");
    STALE_REACTION = new class StaleReactionError extends Error {
      static {
        __name(this, "StaleReactionError");
      }
      name = "StaleReactionError";
      message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
    }();
    globalThis.document?.contentType;
    __name(lifecycle_outside_component, "lifecycle_outside_component");
    async_mode_flag = false;
    __name(get_parent_context, "get_parent_context");
    __name(get_or_init_context_map, "get_or_init_context_map");
    BLOCK_OPEN = `<!--[-->`;
    BLOCK_CLOSE = `<!--]-->`;
    EMPTY_COMMENT = `<!---->`;
    DOM_BOOLEAN_ATTRIBUTES = [
      "allowfullscreen",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "disabled",
      "formnovalidate",
      "indeterminate",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "seamless",
      "selected",
      "webkitdirectory",
      "defer",
      "disablepictureinpicture",
      "disableremoteplayback"
    ];
    __name(is_boolean_attribute, "is_boolean_attribute");
    [...DOM_BOOLEAN_ATTRIBUTES];
    __name(async_local_storage_unavailable, "async_local_storage_unavailable");
    __name(await_invalid, "await_invalid");
    __name(html_deprecated, "html_deprecated");
    __name(invalid_csp, "invalid_csp");
    __name(invalid_id_prefix, "invalid_id_prefix");
    __name(server_context_required, "server_context_required");
    ssr_context = null;
    __name(set_ssr_context, "set_ssr_context");
    __name(getContext, "getContext");
    __name(push, "push");
    __name(pop, "pop");
    __name(unresolved_hydratable, "unresolved_hydratable");
    current_render = null;
    context = null;
    __name(get_render_context, "get_render_context");
    __name(with_render_context, "with_render_context");
    als2 = null;
    als_import = null;
    __name(init_render_context, "init_render_context");
    __name(in_webcontainer, "in_webcontainer");
    obfuscated_import = /* @__PURE__ */ __name((module_name) => import(
      /* @vite-ignore */
      module_name
    ), "obfuscated_import");
    __name(sha256, "sha256");
    __name(base64_encode2, "base64_encode");
    RenderResult = class {
      static {
        __name(this, "RenderResult");
      }
      /** @type {() => AccumulatedContent} */
      #render;
      /** @type {() => Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }>} */
      #render_async;
      /** @type {AccumulatedContent | undefined} */
      #sync;
      /** @type {{ script: '' }} */
      #hashes = { script: "" };
      /** @type {Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }> | undefined} */
      #promise;
      /**
      * @param {() => AccumulatedContent} render
      * @param {() => Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }>} render_async
      */
      constructor(render2, render_async) {
        this.#render = render2;
        this.#render_async = render_async;
      }
      #get() {
        return this.#sync ??= this.#render();
      }
      get html() {
        return this.#get().body;
      }
      get head() {
        return this.#get().head;
      }
      get body() {
        return this.#get().body;
      }
      get hashes() {
        return this.#hashes;
      }
      /**
      * This is not type-safe, but honestly it's the best I can do right now, and it's a straightforward function.
      *
      * @template TResult1
      * @template [TResult2=never]
      * @param {(value: SyncRenderOutput) => TResult1} onfulfilled
      * @param {(reason: unknown) => TResult2} onrejected
      */
      then(onfulfilled, onrejected) {
        if (!async_mode_flag) {
          const result = this.#get();
          const user_result = onfulfilled({
            head: result.head,
            body: result.body,
            html: result.body,
            hashes: { script: [] }
          });
          return Promise.resolve(user_result);
        }
        this.#promise ??= this.#render_async().then((result) => {
          Object.defineProperty(result, "html", { get: /* @__PURE__ */ __name(() => {
            html_deprecated();
          }, "get") });
          return result;
        });
        return this.#promise.then((result) => onfulfilled(result), onrejected);
      }
    };
    Renderer = class Renderer2 {
      static {
        __name(this, "Renderer");
      }
      /**
      * The contents of the renderer.
      * @type {RendererItem[]}
      */
      #out = [];
      /**
      * Any `onDestroy` callbacks registered during execution of this renderer.
      * @type {(() => void)[] | undefined}
      */
      #on_destroy = void 0;
      /**
      * Whether this renderer is a component body.
      * @type {boolean}
      */
      #is_component_body = false;
      /**
      * If set, this renderer is an error boundary. When async collection
      * of the children fails, the failed snippet is rendered instead.
      * @type {{
      * 	failed: (renderer: Renderer, error: unknown, reset: () => void) => void;
      * 	transformError: (error: unknown) => unknown;
      * 	context: SSRContext | null;
      * } | null}
      */
      #boundary = null;
      /**
      * The type of string content that this renderer is accumulating.
      * @type {RendererType}
      */
      type;
      /** @type {Renderer | undefined} */
      #parent;
      /**
      * Asynchronous work associated with this renderer
      * @type {Promise<void> | undefined}
      */
      promise = void 0;
      /**
      * State which is associated with the content tree as a whole.
      * It will be re-exposed, uncopied, on all children.
      * @type {SSRState}
      * @readonly
      */
      global;
      /**
      * State that is local to the branch it is declared in.
      * It will be shallow-copied to all children.
      *
      * @type {{ select_value: any, multiple: boolean }}
      */
      local;
      /**
      * @param {SSRState} global
      * @param {Renderer | undefined} [parent]
      */
      constructor(global, parent) {
        this.#parent = parent;
        this.global = global;
        this.local = parent ? { ...parent.local } : {
          select_value: void 0,
          multiple: false
        };
        this.type = parent ? parent.type : "body";
      }
      /**
      * @param {(renderer: Renderer) => void} fn
      */
      head(fn) {
        const head2 = new Renderer2(this.global, this);
        head2.type = "head";
        this.#out.push(head2);
        head2.child(fn);
      }
      /**
      * @param {Array<Promise<void>>} blockers
      * @param {(renderer: Renderer) => void} fn
      */
      async_block(blockers, fn) {
        this.#out.push(BLOCK_OPEN);
        this.async(blockers, fn);
        this.#out.push(BLOCK_CLOSE);
      }
      /**
      * @param {Array<Promise<void>>} blockers
      * @param {(renderer: Renderer) => void} fn
      */
      async(blockers, fn) {
        let callback = fn;
        if (blockers.length > 0) {
          const context3 = ssr_context;
          callback = /* @__PURE__ */ __name((renderer) => {
            return Promise.all(blockers).then(() => {
              const previous_context = ssr_context;
              try {
                set_ssr_context(context3);
                return fn(renderer);
              } finally {
                set_ssr_context(previous_context);
              }
            });
          }, "callback");
        }
        this.child(callback);
      }
      /**
      * @param {Array<() => void>} thunks
      */
      run(thunks) {
        const context3 = ssr_context;
        let promise = Promise.resolve(thunks[0]());
        const promises = [promise];
        if (context3 !== null && thunks.length > 1) context3.i = true;
        for (const fn of thunks.slice(1)) {
          promise = promise.then(() => {
            const previous_context = ssr_context;
            set_ssr_context(context3);
            try {
              return fn();
            } finally {
              set_ssr_context(previous_context);
            }
          });
          promises.push(promise);
        }
        promise.catch(noop2);
        this.promise = this.global.track(promise);
        return promises;
      }
      /**
      * @param {(renderer: Renderer) => MaybePromise<void>} fn
      */
      child_block(fn) {
        this.#out.push(BLOCK_OPEN);
        this.child(fn);
        this.#out.push(BLOCK_CLOSE);
      }
      /**
      * Create a child renderer. The child renderer inherits the state from the parent,
      * but has its own content.
      * @param {(renderer: Renderer) => MaybePromise<void>} fn
      */
      child(fn) {
        const child = new Renderer2(this.global, this);
        this.#out.push(child);
        const parent = ssr_context;
        set_ssr_context({
          ...ssr_context,
          p: parent,
          c: null,
          r: child,
          i: ssr_context?.i ?? false
        });
        const result = fn(child);
        set_ssr_context(parent);
        if (result instanceof Promise) {
          result.catch(noop2);
          result.finally(() => set_ssr_context(null)).catch(noop2);
          if (child.global.mode === "sync") await_invalid();
          child.promise = child.global.track(result);
        }
        return child;
      }
      /**
      * Render children inside an error boundary. If the children throw and the API-level
      * `transformError` transform handles the error (doesn't re-throw), the `failed` snippet is
      * rendered instead. Otherwise the error propagates.
      *
      * @param {{ failed?: (renderer: Renderer, error: unknown, reset: () => void) => void }} props
      * @param {(renderer: Renderer) => MaybePromise<void>} children_fn
      */
      boundary(props, children_fn) {
        const child = new Renderer2(this.global, this);
        this.#out.push(child);
        const parent_context = ssr_context;
        if (props.failed) child.#boundary = {
          failed: props.failed,
          transformError: this.global.transformError,
          context: parent_context
        };
        set_ssr_context({
          ...ssr_context,
          p: parent_context,
          c: null,
          r: child,
          i: ssr_context?.i ?? false
        });
        try {
          const result = children_fn(child);
          set_ssr_context(parent_context);
          if (result instanceof Promise) {
            if (child.global.mode === "sync") await_invalid();
            result.catch(noop2);
            child.promise = child.global.track(result);
          }
        } catch (error2) {
          set_ssr_context(parent_context);
          const failed_snippet = props.failed;
          if (!failed_snippet) throw error2;
          const result = this.global.transformError(error2);
          child.#out.length = 0;
          child.#boundary = null;
          if (result instanceof Promise) {
            if (this.global.mode === "sync") await_invalid();
            child.promise = child.global.track(
              /** @type {Promise<unknown>} */
              result.then((transformed) => {
                set_ssr_context(parent_context);
                child.#out.push(Renderer2.#serialize_failed_boundary(transformed));
                failed_snippet(child, transformed, noop2);
                child.#out.push(BLOCK_CLOSE);
              })
            );
            child.promise.catch(noop2);
          } else {
            child.#out.push(Renderer2.#serialize_failed_boundary(result));
            failed_snippet(child, result, noop2);
            child.#out.push(BLOCK_CLOSE);
          }
        }
      }
      /**
      * Create a component renderer. The component renderer inherits the state from the parent,
      * but has its own content. It is treated as an ordering boundary for ondestroy callbacks.
      * @param {(renderer: Renderer) => MaybePromise<void>} fn
      * @param {Function} [component_fn]
      * @returns {void}
      */
      component(fn, component_fn) {
        push(component_fn);
        this.child((renderer) => {
          renderer.#is_component_body = true;
          return fn(renderer);
        });
        pop();
      }
      /**
      * @param {Record<string, any>} attrs
      * @param {(renderer: Renderer) => void} fn
      * @param {string | undefined} [css_hash]
      * @param {Record<string, boolean> | undefined} [classes]
      * @param {Record<string, string> | undefined} [styles]
      * @param {number | undefined} [flags]
      * @param {boolean | undefined} [is_rich]
      * @returns {void}
      */
      select(attrs, fn, css_hash, classes, styles, flags, is_rich) {
        const { value, defaultValue, ...select_attrs } = attrs;
        if (select_attrs.multiple === "") select_attrs.multiple = true;
        this.push(`<select${attributes(select_attrs, css_hash, classes, styles, flags)}>`);
        this.child((renderer) => {
          renderer.local.select_value = value === void 0 ? defaultValue : value;
          renderer.local.multiple = !!select_attrs.multiple;
          fn(renderer);
        });
        this.push(`${is_rich ? "<!>" : ""}</select>`);
      }
      /**
      * @param {Record<string, any>} attrs
      * @param {string | number | boolean | ((renderer: Renderer) => void)} body
      * @param {string | undefined} [css_hash]
      * @param {Record<string, boolean> | undefined} [classes]
      * @param {Record<string, string> | undefined} [styles]
      * @param {number | undefined} [flags]
      * @param {boolean | undefined} [is_rich]
      */
      option(attrs, body, css_hash, classes, styles, flags, is_rich) {
        this.#out.push(`<option${attributes(attrs, css_hash, classes, styles, flags)}`);
        const close = /* @__PURE__ */ __name((renderer, value, { head: head2, body: body2 }) => {
          if (has_own_property.call(attrs, "value")) value = attrs.value;
          var select_value = this.local.select_value;
          if (this.local.multiple && is_array(select_value) ? select_value.includes(value) : value === select_value) renderer.#out.push(' selected=""');
          renderer.#out.push(`>${body2}${is_rich ? "<!>" : ""}</option>`);
          if (head2) renderer.head((child) => child.push(head2));
        }, "close");
        if (typeof body === "function") this.child((renderer) => {
          const r2 = new Renderer2(this.global, this);
          body(r2);
          if (this.global.mode === "async") return r2.#collect_content_async().then((content) => {
            close(renderer, content.body.replaceAll("<!---->", ""), content);
          });
          else {
            const content = r2.#collect_content();
            close(renderer, content.body.replaceAll("<!---->", ""), content);
          }
        });
        else close(this, body, { body: escape_html(body) });
      }
      /**
      * @param {(renderer: Renderer) => void} fn
      */
      title(fn) {
        const path2 = this.get_path();
        const close = /* @__PURE__ */ __name((head2) => {
          this.global.set_title(head2, path2);
        }, "close");
        this.child((renderer) => {
          const r2 = new Renderer2(renderer.global, renderer);
          fn(r2);
          if (renderer.global.mode === "async") return r2.#collect_content_async().then((content) => {
            close(content.head);
          });
          else {
            const content = r2.#collect_content();
            close(content.head);
          }
        });
      }
      /**
      * @param {string | (() => Promise<string>)} content
      */
      push(content) {
        if (typeof content === "function") this.child(async (renderer) => renderer.push(await content()));
        else this.#out.push(content);
      }
      /**
      * @param {() => void} fn
      */
      on_destroy(fn) {
        (this.#on_destroy ??= []).push(fn);
      }
      /**
      * @returns {number[]}
      */
      get_path() {
        return this.#parent ? [...this.#parent.get_path(), this.#parent.#out.indexOf(this)] : [];
      }
      /**
      * @deprecated this is needed for legacy component bindings
      */
      copy() {
        const copy = new Renderer2(this.global, this.#parent);
        copy.type = this.type;
        copy.#out = this.#out.map((item) => item instanceof Renderer2 ? item.copy() : item);
        copy.promise = this.promise;
        return copy;
      }
      /**
      * @param {Renderer} other
      * @deprecated this is needed for legacy component bindings
      */
      subsume(other) {
        if (this.global.mode !== other.global.mode) throw new Error("invariant: A renderer cannot switch modes. If you're seeing this, there's a compiler bug. File an issue!");
        this.local = other.local;
        this.#out = other.#out.map((item, i) => {
          const current = this.#out[i];
          if (current instanceof Renderer2 && item instanceof Renderer2) {
            current.subsume(item);
            return current;
          }
          return item;
        });
        this.promise = other.promise;
        this.type = other.type;
      }
      get length() {
        return this.#out.length;
      }
      /**
      * Creates the hydration comment that marks the start of a failed boundary.
      * The error is JSON-serialized and embedded inside an HTML comment for the client
      * to parse during hydration. The JSON is escaped to prevent `-->` or `<!--` sequences
      * from breaking out of the comment (XSS). Uses unicode escapes which `JSON.parse()`
      * handles transparently.
      * @param {unknown} error
      * @returns {string}
      */
      static #serialize_failed_boundary(error2) {
        return `<!--[?${JSON.stringify(error2).replace(/>/g, "\\u003e").replace(/</g, "\\u003c")}-->`;
      }
      /**
      * Only available on the server and when compiling with the `server` option.
      * Takes a component and returns an object with `body` and `head` properties on it, which you can use to populate the HTML when server-rendering your app.
      * @template {Record<string, any>} Props
      * @param {Component<Props>} component
      * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp }} [options]
      * @returns {RenderOutput}
      */
      static render(component20, options2 = {}) {
        return new RenderResult(() => Renderer2.#render(component20, options2), () => init_render_context().then(() => with_render_context(() => Renderer2.#render_async(component20, options2))));
      }
      /**
      * Collect all of the `onDestroy` callbacks registered during rendering. In an async context, this is only safe to call
      * after awaiting `collect_async`.
      *
      * Child renderers are "porous" and don't affect execution order, but component body renderers
      * create ordering boundaries. Within a renderer, callbacks run in order until hitting a component boundary.
      * @returns {Iterable<() => void>}
      */
      *#collect_on_destroy() {
        for (const component20 of this.#traverse_components()) yield* component20.#collect_ondestroy();
      }
      /**
      * Performs a depth-first search of renderers, yielding the deepest components first, then additional components as we backtrack up the tree.
      * @returns {Iterable<Renderer>}
      */
      *#traverse_components() {
        for (const child of this.#out) if (typeof child !== "string") yield* child.#traverse_components();
        if (this.#is_component_body) yield this;
      }
      /**
      * @returns {Iterable<() => void>}
      */
      *#collect_ondestroy() {
        if (this.#on_destroy) for (const fn of this.#on_destroy) yield fn;
        for (const child of this.#out) if (child instanceof Renderer2 && !child.#is_component_body) yield* child.#collect_ondestroy();
      }
      /**
      * Runs every `onDestroy` callback in this renderer tree. On a failed render,
      * cleanup errors are suppressed so they do not mask the render error.
      * @param {boolean} suppress_errors
      */
      #run_on_destroy(suppress_errors) {
        let first_error;
        let has_error = false;
        for (const cleanup of this.#collect_on_destroy()) try {
          cleanup();
        } catch (error2) {
          if (!suppress_errors && !has_error) {
            first_error = error2;
            has_error = true;
          }
        }
        if (has_error) throw first_error;
      }
      /**
      * @param {'sync' | 'async'} mode
      * @param {{ idPrefix?: string; csp?: Csp; transformError?: (error: unknown) => unknown }} options
      * @returns {Renderer}
      */
      static #create(mode, options2) {
        if (options2.idPrefix?.includes("--")) invalid_id_prefix();
        return new Renderer2(new SSRState(mode, options2.idPrefix ? options2.idPrefix + "-" : "", options2.csp, options2.transformError));
      }
      /**
      * Render a component. Throws if any of the children are performing asynchronous work.
      *
      * @template {Record<string, any>} Props
      * @param {Component<Props>} component
      * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string }} options
      * @returns {AccumulatedContent}
      */
      static #render(component20, options2) {
        var previous_context = ssr_context;
        const renderer = Renderer2.#create("sync", options2);
        let result;
        let render_error;
        let failed = false;
        try {
          try {
            Renderer2.#open_render(renderer, component20, options2);
            result = Renderer2.#close_render(renderer.#collect_content(), renderer);
          } catch (error2) {
            render_error = error2;
            failed = true;
          }
          renderer.#run_on_destroy(failed);
          if (failed) throw render_error;
          return result;
        } finally {
          renderer.global.abort();
          set_ssr_context(previous_context);
        }
      }
      /**
      * Render a component.
      *
      * @template {Record<string, any>} Props
      * @param {Component<Props>} component
      * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp }} options
      * @returns {Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }>}
      */
      static async #render_async(component20, options2) {
        const previous_context = ssr_context;
        const renderer = Renderer2.#create("async", options2);
        let result;
        let render_error;
        let failed = false;
        try {
          try {
            Renderer2.#open_render(renderer, component20, options2);
            const content = await renderer.#collect_content_async();
            const hydratables = await renderer.#collect_hydratables();
            if (hydratables !== null) content.head = hydratables + content.head;
            result = Renderer2.#close_render(content, renderer);
          } catch (error2) {
            render_error = error2;
            failed = true;
            renderer.global.abort();
            await renderer.global.settle();
          }
          renderer.#run_on_destroy(failed);
          if (failed) throw render_error;
          return result;
        } finally {
          set_ssr_context(previous_context);
          renderer.global.abort();
        }
      }
      /**
      * Collect all of the code from the `out` array and return it as a string, or a promise resolving to a string.
      * @param {AccumulatedContent} content
      * @returns {AccumulatedContent}
      */
      #collect_content(content = {
        head: "",
        body: ""
      }) {
        for (const item of this.#out) if (typeof item === "string") content[this.type] += item;
        else if (item instanceof Renderer2) item.#collect_content(content);
        return content;
      }
      /**
      * Collect all of the code from the `out` array and return it as a string.
      * @param {AccumulatedContent} content
      * @returns {Promise<AccumulatedContent>}
      */
      async #collect_content_async(content = {
        head: "",
        body: ""
      }) {
        await this.promise;
        for (const item of this.#out) if (typeof item === "string") content[this.type] += item;
        else if (item instanceof Renderer2) {
          if (item.#boundary) {
            const boundary_content = {
              head: "",
              body: ""
            };
            try {
              await item.#collect_content_async(boundary_content);
              content.head += boundary_content.head;
              content.body += boundary_content.body;
            } catch (error2) {
              const { context: context3, failed, transformError } = item.#boundary;
              set_ssr_context(context3);
              let promise = transformError(error2);
              set_ssr_context(null);
              let transformed = await promise;
              set_ssr_context(context3);
              const failed_renderer = new Renderer2(item.global, item);
              failed_renderer.type = item.type;
              failed_renderer.#out.push(Renderer2.#serialize_failed_boundary(transformed));
              failed(failed_renderer, transformed, noop2);
              failed_renderer.#out.push(BLOCK_CLOSE);
              await failed_renderer.#collect_content_async(content);
            }
          } else await item.#collect_content_async(content);
        }
        return content;
      }
      async #collect_hydratables() {
        const ctx = get_render_context().hydratable;
        for (const [_, key] of ctx.unresolved_promises) unresolved_hydratable(key, ctx.lookup.get(key)?.stack ?? "<missing stack trace>");
        for (const comparison of ctx.comparisons) await comparison;
        return await this.#hydratable_block(ctx);
      }
      /**
      * @template {Record<string, any>} Props
      * @param {Renderer} renderer
      * @param {import('svelte').Component<Props>} component
      * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp; transformError?: (error: unknown) => unknown }} options
      * @returns {void}
      */
      static #open_render(renderer, component20, options2) {
        var previous_context = ssr_context;
        try {
          set_ssr_context({
            p: null,
            c: options2.context ?? null,
            r: renderer,
            i: false
          });
          renderer.push(BLOCK_OPEN);
          component20(renderer, options2.props ?? {});
          renderer.push(BLOCK_CLOSE);
        } finally {
          set_ssr_context(previous_context);
        }
      }
      /**
      * @param {AccumulatedContent} content
      * @param {Renderer} renderer
      * @returns {AccumulatedContent & { hashes: { script: Sha256Source[] } }}
      */
      static #close_render(content, renderer) {
        let head2 = content.head + renderer.global.get_title();
        let body = content.body;
        for (const { hash: hash2, code } of renderer.global.css) head2 += `<style id="${hash2}">${code}</style>`;
        return {
          head: head2,
          body,
          hashes: { script: renderer.global.csp.script_hashes }
        };
      }
      /**
      * @param {HydratableContext} ctx
      */
      async #hydratable_block(ctx) {
        if (ctx.lookup.size === 0) return null;
        let entries = [];
        let has_promises = false;
        for (const [k, v] of ctx.lookup) {
          if (v.promises) {
            has_promises = true;
            for (const p of v.promises) await p;
          }
          entries.push(`[${uneval(k)},${v.serialized}]`);
        }
        let prelude = `const h = (window.__svelte ??= {}).h ??= new Map();`;
        if (has_promises) prelude = `const r = (v) => Promise.resolve(v);
				${prelude}`;
        const body = `
			{
				${prelude}

				for (const [k, v] of [
					${entries.join(",\n					")}
				]) {
					h.set(k, v);
				}
			}
		`;
        let csp_attr = "";
        if (this.global.csp.nonce) csp_attr = ` nonce="${this.global.csp.nonce}"`;
        else if (this.global.csp.hash) {
          const hash2 = await sha256(body);
          this.global.csp.script_hashes.push(`sha256-${hash2}`);
        }
        return `
		<script${csp_attr}>${body}<\/script>`;
      }
    };
    SSRState = class {
      static {
        __name(this, "SSRState");
      }
      /** @readonly @type {Csp & { script_hashes: Sha256Source[] }} */
      csp;
      /** @readonly @type {'sync' | 'async'} */
      mode;
      /** @readonly @type {() => string} */
      uid;
      /** @readonly @type {Set<{ hash: string; code: string }>} */
      css = /* @__PURE__ */ new Set();
      /** @type {Set<Promise<unknown>>} */
      #pending = /* @__PURE__ */ new Set();
      /** @type {AbortController | null} */
      #controller = null;
      #aborted = false;
      /**
      * `transformError` passed to `render`. Called when an error boundary catches an error.
      * Throws by default if unset in `render`.
      * @type {(error: unknown) => unknown}
      */
      transformError;
      /** @type {{ path: number[], value: string }} */
      #title = {
        path: [],
        value: ""
      };
      /**
      * @param {'sync' | 'async'} mode
      * @param {string} id_prefix
      * @param {Csp} csp
      * @param {((error: unknown) => unknown) | undefined} [transformError]
      */
      constructor(mode, id_prefix = "", csp = { hash: false }, transformError) {
        this.mode = mode;
        this.csp = {
          ...csp,
          script_hashes: []
        };
        this.transformError = transformError ?? ((error2) => {
          throw error2;
        });
        let uid = 1;
        this.uid = () => `${id_prefix}s${uid++}`;
      }
      /**
      * @template T
      * @param {Promise<T>} promise
      * @returns {Promise<T>}
      */
      track(promise) {
        this.#pending.add(promise);
        promise.then(() => this.#pending.delete(promise), () => this.#pending.delete(promise));
        return promise;
      }
      async settle() {
        while (this.#pending.size > 0) await Promise.allSettled([...this.#pending]);
      }
      abort() {
        if (this.#aborted) return;
        this.#aborted = true;
        this.#controller?.abort(STALE_REACTION);
      }
      get_abort_signal() {
        const controller = this.#controller ??= new AbortController();
        if (this.#aborted) controller.abort(STALE_REACTION);
        return controller.signal;
      }
      get_title() {
        return this.#title.value;
      }
      /**
      * Performs a depth-first (lexicographic) comparison using the path. Rejects sets
      * from earlier than or equal to the current value.
      * @param {string} value
      * @param {number[]} path
      */
      set_title(value, path2) {
        const current = this.#title.path;
        let i = 0;
        let l = Math.min(path2.length, current.length);
        while (i < l && path2[i] === current[i]) i += 1;
        if (path2[i] === void 0) return;
        if (current[i] === void 0 || path2[i] > current[i]) {
          this.#title.path = path2;
          this.#title.value = value;
        }
      }
    };
    INVALID_ATTR_NAME_CHAR_REGEX = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    __name(render, "render");
    __name(head, "head");
    __name(attributes, "attributes");
    __name(attr_class, "attr_class");
    __name(ensure_array_like, "ensure_array_like");
    __name(once2, "once");
    __name(derived, "derived");
  }
});

// .svelte-kit/output/server/chunks/navigation.js
var afterNavigate;
var init_navigation = __esm({
  ".svelte-kit/output/server/chunks/navigation.js"() {
    "use strict";
    init_functions();
    afterNavigate = noop;
    disallow_on_server("disableScrollHandling", "()");
    disallow_on_server("goto");
    disallow_on_server("invalidate");
    disallow_on_server("invalidateAll", "()");
    disallow_on_server("refreshAll", "()");
    disallow_on_server("preloadCode");
    disallow_on_server("preloadData");
    disallow_on_server("pushState");
    disallow_on_server("replaceState");
  }
});

// node_modules/cookie/dist/index.js
function parseCookie(str, options2) {
  const obj = new NullObject();
  const len = str.length;
  if (len < 2)
    return obj;
  const dec = options2?.decode ?? defaultDecode;
  let index20 = 0;
  do {
    const eqIdx = eqIndex(str, index20, len);
    if (eqIdx === len)
      break;
    const endIdx = endIndex(str, index20, len);
    if (eqIdx > endIdx) {
      index20 = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = valueSlice(str, index20, eqIdx);
    if (obj[key] === void 0) {
      obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
    }
    index20 = endIdx + 1;
  } while (index20 < len);
  return obj;
}
function stringifySetCookie(cookie, options2) {
  const enc = options2?.encode ?? defaultEncode;
  if (!cookieNameRegExp.test(cookie.name)) {
    throw new TypeError(`cookie name is invalid: ${cookie.name}`);
  }
  const value = cookie.value == null ? "" : enc(cookie.value);
  if (enc !== defaultEncode && !cookieValueRegExp.test(value)) {
    throw new TypeError(`cookie value is invalid: ${cookie.value}`);
  }
  let str = cookie.name + "=" + value;
  if (cookie.maxAge !== void 0) {
    if (!Number.isSafeInteger(cookie.maxAge)) {
      throw new TypeError(`cookie maxAge is invalid: ${cookie.maxAge}`);
    }
    str += "; Max-Age=" + cookie.maxAge;
  }
  if (cookie.domain) {
    if (!domainValueRegExp.test(cookie.domain)) {
      throw new TypeError(`cookie domain is invalid: ${cookie.domain}`);
    }
    str += "; Domain=" + cookie.domain;
  }
  if (cookie.path) {
    if (!pathValueRegExp.test(cookie.path)) {
      throw new TypeError(`cookie path is invalid: ${cookie.path}`);
    }
    str += "; Path=" + cookie.path;
  }
  if (cookie.expires) {
    const year = cookie.expires.getUTCFullYear();
    if (!(year >= 1601 && year <= 9999)) {
      throw new TypeError(`cookie expires is invalid: ${cookie.expires}`);
    }
    str += "; Expires=" + cookie.expires.toUTCString();
  }
  if (cookie.httpOnly) {
    str += "; HttpOnly";
  }
  if (cookie.secure) {
    str += "; Secure";
  }
  if (cookie.partitioned) {
    str += "; Partitioned";
  }
  if (cookie.priority) {
    const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError(`cookie priority is invalid: ${cookie.priority}`);
    }
  }
  if (cookie.sameSite) {
    const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
    switch (sameSite) {
      case true:
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError(`cookie sameSite is invalid: ${cookie.sameSite}`);
    }
  }
  return str;
}
function parseSetCookie(str, options2) {
  const dec = options2?.decode ?? defaultDecode;
  const len = str.length;
  const endIdx = endIndex(str, 0, len);
  let eqIdx = eqIndex(str, 0, len);
  const setCookie = eqIdx < endIdx ? {
    name: valueSlice(str, 0, eqIdx),
    value: dec(valueSlice(str, eqIdx + 1, endIdx))
  } : { name: "", value: dec(valueSlice(str, 0, endIdx)) };
  let index20 = endIdx + 1;
  while (index20 < len) {
    const endIdx2 = endIndex(str, index20, len);
    if (eqIdx < index20)
      eqIdx = eqIndex(str, index20, len);
    const attr2 = eqIdx < endIdx2 ? valueSlice(str, index20, eqIdx) : valueSlice(str, index20, endIdx2);
    const val = eqIdx < endIdx2 ? valueSlice(str, eqIdx + 1, endIdx2) : void 0;
    switch (attr2.toLowerCase()) {
      case "httponly":
        setCookie.httpOnly = true;
        break;
      case "secure":
        setCookie.secure = true;
        break;
      case "partitioned":
        setCookie.partitioned = true;
        break;
      case "domain":
        setCookie.domain = val;
        break;
      case "path":
        setCookie.path = val;
        break;
      case "max-age":
        if (val && maxAgeRegExp.test(val))
          setCookie.maxAge = Number(val);
        break;
      case "expires":
        if (!val)
          break;
        const date = new Date(val);
        if (Number.isFinite(date.valueOf()))
          setCookie.expires = date;
        break;
      case "priority":
        if (!val)
          break;
        const priority = val.toLowerCase();
        if (priority === "low" || priority === "medium" || priority === "high") {
          setCookie.priority = priority;
        }
        break;
      case "samesite":
        if (!val)
          break;
        const sameSite = val.toLowerCase();
        if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
          setCookie.sameSite = sameSite;
        }
        break;
    }
    index20 = endIdx2 + 1;
  }
  return setCookie;
}
function endIndex(str, min, len) {
  const index20 = str.indexOf(";", min);
  return index20 === -1 ? len : index20;
}
function eqIndex(str, min, len) {
  const index20 = str.indexOf("=", min);
  return index20 === -1 ? len : index20;
}
function valueSlice(str, min, max) {
  if (min === max)
    return "";
  let start = min;
  let end = max;
  do {
    const code = str.charCodeAt(start);
    if (code !== 32 && code !== 9)
      break;
  } while (++start < end);
  while (end > start) {
    const code = str.charCodeAt(end - 1);
    if (code !== 32 && code !== 9)
      break;
    end--;
  }
  return str.slice(start, end);
}
function defaultDecode(str) {
  if (str.indexOf("%") === -1)
    return str;
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
}
function defaultEncode(str) {
  return cookieOctetInvalidRegExp.test(str) ? encodeURIComponent(str) : str;
}
var cookieNameRegExp, cookieValueRegExp, cookieOctetInvalidRegExp, domainValueRegExp, pathValueRegExp, maxAgeRegExp, NullObject;
var init_dist = __esm({
  "node_modules/cookie/dist/index.js"() {
    cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    cookieOctetInvalidRegExp = /[\u0000-\u0020\u007F-\uFFFF",;\\%]/;
    domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    maxAgeRegExp = /^-?\d+$/;
    NullObject = /* @__PURE__ */ (() => {
      const C = /* @__PURE__ */ __name(function() {
      }, "C");
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    __name(parseCookie, "parseCookie");
    __name(stringifySetCookie, "stringifySetCookie");
    __name(parseSetCookie, "parseSetCookie");
    __name(endIndex, "endIndex");
    __name(eqIndex, "eqIndex");
    __name(valueSlice, "valueSlice");
    __name(defaultDecode, "defaultDecode");
    __name(defaultEncode, "defaultEncode");
  }
});

// .svelte-kit/output/server/chunks/instance.js
var instance_exports = {};
__export(instance_exports, {
  init: () => init,
  respond: () => respond,
  set_env: () => set_env
});
async function render_endpoint(event, state2, mod) {
  const method = event.request.method;
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && !mod.HEAD && mod.GET) handler = mod.GET;
  if (!handler) return method_not_allowed(mod, method);
  const prerender = mod.prerender ?? state2.prerender_default;
  if (prerender && (mod.fallback || BODY_DEPENDENT_METHODS2.some((method2) => mod[method2]))) prerender_endpoint_methods({
    methods: BODY_DEPENDENT_METHODS2.join(", "),
    id: event.route.id
  });
  if (state2.prerendering && !state2.prerendering.inside_reroute && !prerender) {
    if (state2.depth > 0) prerender_endpoint_not_prerenderable({ id: event.route.id });
    else return new Response(void 0, { status: 204 });
  }
  try {
    const response = await record_span({
      name: "sveltekit.endpoint",
      attributes: {
        "http.route": event.route.id || "unknown",
        "http.method": method
      },
      fn: /* @__PURE__ */ __name(async (current) => {
        const traced_event = merge_tracing(event, current);
        return with_request_store({
          event: traced_event,
          state: state2
        }, () => handler(traced_event));
      }, "fn")
    });
    if (!(response instanceof Response)) endpoint_invalid_response({ path: event.url.pathname });
    if (state2.prerendering && (!state2.prerendering.inside_reroute || prerender)) {
      const cloned = new Response(response.clone().body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      cloned.headers.set("x-sveltekit-prerender", String(prerender));
      if (state2.prerendering.inside_reroute && prerender) {
        cloned.headers.set("x-sveltekit-routeid", encodeURI(event.route.id));
        state2.prerendering.dependencies.set(event.url.pathname, {
          response: cloned,
          body: null
        });
      } else return cloned;
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) return new Response(void 0, {
      status: e.status,
      headers: { location: e.location }
    });
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers3 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) return true;
  if (method === "POST" && headers3.get("x-sveltekit-action") === "true") return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function route_id_resolution_pathname(route_id) {
  return add_resolution_suffix2(`/${app_dir}${ROUTES_PREFIX}${route_id === "/" ? "" : route_id}`);
}
function is_route_id_resolution_path(pathname) {
  const prefix = `/${app_dir}${ROUTES_PREFIX}`;
  return pathname === prefix || pathname.startsWith(prefix + "/");
}
function extract_route_id(pathname) {
  return pathname.slice(`/_app${ROUTES_PREFIX}`.length) || "/";
}
function build_error_chain(branch, errors, load) {
  const chain = [void 0];
  let last_idx = -1;
  for (let i = 1; i < branch.length; i += 1) {
    if (!branch[i]) continue;
    let j = i - 1;
    while (j > last_idx + 1 && errors[j] == null) j -= 1;
    last_idx = j;
    const error2 = errors[j];
    chain.push(error2 == null ? void 0 : load(error2)?.catch(() => void 0));
  }
  return Promise.all(chain);
}
function* nearest_error_pages(i, branch, errors) {
  while (i--) {
    const error2 = errors[i];
    if (error2 != null) {
      let j = i;
      while (!branch[j]) j -= 1;
      yield {
        error: error2,
        idx: j + 1
      };
    }
  }
}
function create_async_iterator() {
  let resolved = -1;
  const deferred2 = [];
  return {
    async *iterate(transform = (x) => x) {
      for (let i = 0; i < deferred2.length; i += 1) yield transform(await deferred2[i].promise);
    },
    add: /* @__PURE__ */ __name((promise) => {
      const next = Promise.withResolvers();
      next.promise.catch(noop);
      deferred2.push(next);
      promise.then((value) => {
        deferred2[++resolved].resolve(value);
      }, (error2) => {
        deferred2[++resolved].reject(error2);
      });
    }, "add")
  };
}
function server_data_serializer(event, state2) {
  let promise_id = 1;
  let max_nodes = -1;
  const iterator = create_async_iterator();
  const global = "__sveltekit_132s7ck";
  function get_replacer(index20) {
    return /* @__PURE__ */ __name(function replacer(thing) {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        const promise = thing.then(
          /** @param {any} data */
          (data) => ({ data })
        ).catch(
          /** @param {any} error */
          async (error2) => ({ error: await handle_error_and_jsonify(event, state2, error2) })
        ).then(
          /**
          * @param {{data: any; error: any}} result
          */
          async ({ data, error: error2 }) => {
            let str;
            try {
              str = uneval(error2 ? [, error2] : [data], replacer);
            } catch (serialization_error) {
              error2 = await handle_error_and_jsonify(event, state2, capture_error(() => load_promise_not_serializable({ id: event.route.id }, { cause: serialization_error })));
              str = uneval([, error2], replacer);
            }
            return {
              index: index20,
              str: `${global}.resolve(${id}, ${str.includes("app.decode") ? `(app) => ${str}` : `() => ${str}`})`
            };
          }
        );
        iterator.add(promise);
        return `${global}.defer(${id})`;
      } else for (const key in encoders) {
        const encoded = encoders[key](thing);
        if (encoded) return `app.decode('${key}', ${uneval(encoded, replacer)})`;
      }
    }, "replacer");
  }
  __name(get_replacer, "get_replacer");
  const strings = [];
  return {
    set_max_nodes(i) {
      max_nodes = i;
    },
    add_node(i, node) {
      try {
        if (!node) {
          strings[i] = "null";
          return;
        }
        const payload2 = {
          type: "data",
          data: node.data,
          uses: serialize_uses(node)
        };
        if (node.slash) payload2.slash = node.slash;
        strings[i] = uneval(payload2, get_replacer(i));
      } catch (error2) {
        error2.path = error2.path.slice(1);
        throw_devalue_error(event, error2);
      }
    },
    get_data(csp) {
      const open = `<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>`;
      const close = `<\/script>
`;
      return {
        data: `[${compact(max_nodes > -1 ? strings.slice(0, max_nodes) : strings).join(",")}]`,
        chunks: promise_id > 1 ? iterator.iterate(({ index: index20, str }) => {
          if (max_nodes > -1 && index20 >= max_nodes) return "";
          return open + str + close;
        }) : null
      };
    }
  };
}
function server_data_serializer_json(event, state2) {
  let promise_id = 1;
  const iterator = create_async_iterator();
  const reducers = {
    ...encoders,
    /** @param {any} thing */
    Promise: /* @__PURE__ */ __name((thing) => {
      if (typeof thing?.then !== "function") return;
      const id = promise_id++;
      let key = "data";
      const promise = thing.catch(
        /** @param {any} error */
        async (error2) => {
          key = "error";
          return handle_error_and_jsonify(event, state2, error2);
        }
      ).then(
        /** @param {any} value */
        async (value) => {
          let str;
          try {
            str = stringify(value, reducers);
          } catch (serialization_error) {
            const error2 = await handle_error_and_jsonify(event, state2, capture_error(() => load_promise_not_serializable({ id: event.route.id }, { cause: serialization_error })));
            key = "error";
            str = stringify(error2, reducers);
          }
          return `{"type":"chunk","id":${id},"${key}":${str}}
`;
        }
      );
      iterator.add(promise);
      return id;
    }, "Promise")
  };
  const strings = [];
  return {
    add_node(i, node) {
      try {
        if (!node) {
          strings[i] = "null";
          return;
        }
        if (node.type === "error" || node.type === "skip") {
          strings[i] = JSON.stringify(node);
          return;
        }
        strings[i] = `{"type":"data","data":${stringify(node.data, reducers)},"uses":${JSON.stringify(serialize_uses(node))}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
      } catch (error2) {
        error2.path = "data" + error2.path;
        throw_devalue_error(event, error2);
      }
    },
    get_data() {
      return {
        data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
        chunks: promise_id > 1 ? iterator.iterate() : null
      };
    }
  };
}
async function load_server_data({ event, state: state2, node, parent }) {
  if (!node?.server) return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const load = node.server.load;
  const slash = node.server.trailingSlash;
  if (!load) return {
    type: "data",
    data: null,
    uses,
    slash
  };
  const url2 = make_trackable(event.url, () => {
    if (is_tracking) uses.url = true;
  }, (param) => {
    if (is_tracking) uses.search_params.add(param);
  });
  if (is_prerendering(state2)) disable_search(url2);
  return {
    type: "data",
    data: await record_span({
      name: "sveltekit.load",
      attributes: {
        "sveltekit.load.node_id": node.server_id || "unknown",
        "sveltekit.load.node_type": get_node_type(node.server_id),
        "sveltekit.load.environment": "server",
        "http.route": event.route.id || "unknown"
      },
      fn: /* @__PURE__ */ __name(async (current) => {
        const traced_event = merge_tracing(event, current);
        return await with_request_store({
          event: traced_event,
          state: state2
        }, () => load.call(null, {
          ...traced_event,
          fetch: /* @__PURE__ */ __name((info, init2) => {
            new URL(info instanceof Request ? info.url : info, event.url);
            return event.fetch(info, init2);
          }, "fetch"),
          /** @param {string[]} deps */
          depends: /* @__PURE__ */ __name((...deps) => {
            for (const dep of deps) {
              const { href } = new URL(dep, event.url);
              uses.dependencies.add(href);
            }
          }, "depends"),
          params: new Proxy(event.params, { get: /* @__PURE__ */ __name((target, key) => {
            if (is_tracking) uses.params.add(key);
            return target[key];
          }, "get") }),
          parent: /* @__PURE__ */ __name(async () => {
            if (is_tracking) uses.parent = true;
            return parent();
          }, "parent"),
          route: new Proxy(event.route, { get: /* @__PURE__ */ __name((target, key) => {
            if (is_tracking) uses.route = true;
            return target[key];
          }, "get") }),
          url: url2,
          untrack(fn) {
            is_tracking = false;
            try {
              return fn();
            } finally {
              is_tracking = true;
            }
          }
        }));
      }, "fn")
    }) ?? null,
    uses,
    slash
  };
}
async function load_data({ event, state: state2, fetched, node, parent, server_data_promise, resolve_opts, csr }) {
  const server_data_node = await server_data_promise;
  const load = node?.universal?.load;
  if (!load) return server_data_node?.data ?? null;
  return await record_span({
    name: "sveltekit.load",
    attributes: {
      "sveltekit.load.node_id": node.universal_id || "unknown",
      "sveltekit.load.node_type": get_node_type(node.universal_id),
      "sveltekit.load.environment": "server",
      "http.route": event.route.id || "unknown"
    },
    fn: /* @__PURE__ */ __name(async (current) => {
      const traced_event = merge_tracing(event, current);
      return await with_request_store({
        event: traced_event,
        state: state2
      }, () => load.call(null, {
        url: event.url,
        params: event.params,
        data: server_data_node?.data ?? null,
        route: event.route,
        fetch: create_universal_fetch(event, state2.prerendering, fetched, csr, resolve_opts),
        setHeaders: event.setHeaders,
        depends: noop,
        parent,
        untrack: /* @__PURE__ */ __name((fn) => fn(), "untrack"),
        tracing: traced_event.tracing
      }));
    }, "fn")
  }) ?? null;
}
function create_universal_fetch(event, prerendering2, fetched, csr, resolve_opts) {
  const universal_fetch = /* @__PURE__ */ __name(async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url2 = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url2.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (prerendering2) {
        dependency = {
          response,
          body: null
        };
        prerendering2.dependencies.set(url2.pathname, dependency);
      }
    } else if (url2.protocol === "https:" || url2.protocol === "http:") {
      if ((input instanceof Request ? input.mode : init2?.mode ?? "cors") === "no-cors") response = new Response("", {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
      else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") load_fetch_cors({ reason: acao ? "Incorrect" : "No" });
      }
    }
    let teed_body;
    const proxy = new Proxy(response, { get(response2, key, receiver) {
      async function push_fetched(body, is_b64) {
        const status_number = Number(response2.status);
        if (isNaN(status_number)) throw new Error(`response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`);
        const request_body = input instanceof Request && cloned_body ? await new Response(cloned_body).text() : init2?.body;
        if (request_body && typeof request_body !== "string" && !ArrayBuffer.isView(request_body)) return;
        fetched.push({
          url: fetch_cache_url(url2, event.url),
          method: event.request.method,
          request_body,
          request_headers: cloned_headers,
          response_body: body,
          response: response2,
          is_b64
        });
      }
      __name(push_fetched, "push_fetched");
      if (key === "body") {
        if (response2.body === null) return null;
        if (teed_body) return teed_body;
        const [a, b] = response2.body.tee();
        (async () => {
          const result = new Uint8Array(await new Response(a).arrayBuffer());
          if (dependency) dependency.body = new Uint8Array(result);
          push_fetched(base64_encode(result), true);
        })().catch(noop);
        return teed_body = b;
      }
      if (key === "arrayBuffer") return async () => {
        const buffer2 = await response2.arrayBuffer();
        const bytes = new Uint8Array(buffer2);
        if (dependency) dependency.body = bytes;
        if (buffer2 instanceof ArrayBuffer) await push_fetched(base64_encode(bytes), true);
        return buffer2;
      };
      async function text2() {
        const body = await response2.text();
        if (body === "" && NULL_BODY_STATUS.includes(response2.status)) {
          await push_fetched(void 0, false);
          return;
        }
        if (!body || typeof body === "string") await push_fetched(body, false);
        if (dependency) dependency.body = body;
        return body;
      }
      __name(text2, "text");
      if (key === "text") return text2;
      if (key === "json") return async () => {
        const body = await text2();
        return body ? JSON.parse(body) : void 0;
      };
      const value = Reflect.get(response2, key, response2);
      if (value instanceof Function) return Object.defineProperties(
        /**
        * @this {any}
        */
        function() {
          return Reflect.apply(value, this === receiver ? response2 : this, arguments);
        },
        {
          name: { value: value.name },
          length: { value: value.length }
        }
      );
      return value;
    } });
    if (csr) {
      const get = response.headers.get;
      response.headers.get = (key) => {
        const lower = key.toLowerCase();
        const value = get.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          if (!resolve_opts.filterSerializedResponseHeaders(lower, value)) load_response_header_not_serialized({
            name: lower,
            id: event.route.id
          });
        }
        return value;
      };
      const get_set_cookie = response.headers.getSetCookie;
      response.headers.getSetCookie = () => {
        const values = get_set_cookie.call(response.headers);
        for (const value of values) if (!resolve_opts.filterSerializedResponseHeaders("set-cookie", value)) load_response_header_not_serialized({
          name: "set-cookie",
          id: event.route.id
        });
        return values;
      };
    }
    return proxy;
  }, "universal_fetch");
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(noop);
    return response;
  };
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) if (typeof value === "string") {
    let i = value.length;
    while (i) hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else if (ArrayBuffer.isView(value)) {
    const buffer2 = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    let i = buffer2.length;
    while (i) hash2 = hash2 * 33 ^ buffer2[--i];
  } else throw new TypeError("value must be a string or TypedArray");
  return (hash2 >>> 0).toString(36);
}
function hash_request(headers3, body) {
  const values = [];
  if (headers3) values.push([...new Headers(headers3)].join(","));
  if (body) values.push(body);
  return hash(...values);
}
function escape_html2(str, is_attr) {
  const dict = is_attr ? escape_html_attr_dict : escape_html_dict;
  return str.replace(is_attr ? escape_html_attr_regex : escape_html_regex, (match) => dict[match] ?? `&#${match.charCodeAt(0)};`);
}
function serialize_data(fetched, filter, prerendering2 = false) {
  const headers3 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key, value] of fetched.response.headers) {
    if (filter(key, value)) headers3[key] = value;
    if (key === "cache-control") cache_control = value;
    else if (key === "age") age = value;
    else if (key === "vary" && value.trim() === "*") varyAny = true;
  }
  const payload2 = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers3,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload2).replace(pattern, (match) => replacements2[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url="${escape_html2(fetched.url, true)}"`
  ];
  if (fetched.is_b64) attrs.push("data-b64");
  if (fetched.request_headers || fetched.request_body) attrs.push(`data-hash="${hash_request(fetched.request_headers, fetched.request_body)}"`);
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64_encode(array);
}
async function sha2562(content) {
  const digest = await crypto.subtle.digest("SHA-256", text_encoder2.encode(content));
  return base64_encode(new Uint8Array(digest));
}
function generate_route_object(route, url2, client) {
  const { errors, layouts, leaf } = route;
  const paths = resolve_paths(url2.pathname);
  const nodes = [
    ...errors,
    ...layouts.map((l) => l?.[1]),
    leaf[1]
  ].filter((n) => typeof n === "number").map((n) => `'${n}': () => ${create_client_import(client.nodes?.[n], paths)}`).join(",\n		");
  return [
    `{
	id: ${s(route.id)}`,
    `errors: ${s(route.errors)}`,
    `layouts: ${s(route.layouts)}`,
    `leaf: ${s(route.leaf)}`,
    `nodes: {
		${nodes}
	}
}`
  ].join(",\n	");
}
function resolve_paths(pathname) {
  const relative_base = pathname.slice(0).split("/").slice(2).map(() => "..").join("/") || ".";
  return {
    base: relative_base,
    assets: !assets || assets[0] === "/" && assets !== "/_svelte_kit_assets" ? relative_base : assets
  };
}
function client_path(path2, { base, assets: assets3 }) {
  return path2[0] === "/" ? base + path2 : `${assets3}/${path2}`;
}
function create_client_import(import_path, paths) {
  return import_path ? `import('${client_path(import_path, paths)}')` : "Promise.resolve({})";
}
async function resolve_route(resolved_path, url2) {
  if (!manifest.client?.routes) return text("Server-side route resolution disabled", { status: 400 });
  try {
    const matchers = await manifest.matchers();
    const result = find_route(resolved_path, manifest.client.routes, matchers);
    return create_server_routing_response(result?.route ?? null, result?.params ?? {}, url2, manifest.client).response;
  } catch {
    return text("Error resolving route", { status: 500 });
  }
}
function resolve_route_by_id(route_id, url2) {
  if (!manifest.client?.routes) return text("Server-side route resolution disabled", { status: 400 });
  try {
    const route = manifest.client.routes.find((r2) => r2.id === route_id);
    if (route) return create_server_routing_response(route, null, url2, manifest.client).response;
    if (manifest.routes.some((r2) => r2.id === route_id && !r2.page)) return text("export const endpoint_only = true;", { headers: js_headers() });
    return create_server_routing_response(null, null, url2, manifest.client).response;
  } catch {
    return text("Error resolving route", { status: 500 });
  }
}
function js_headers() {
  return new Headers({ "content-type": "application/javascript; charset=utf-8" });
}
function create_server_routing_response(route, params, url2, client) {
  const headers3 = js_headers();
  let body = "";
  if (route) {
    const csr_route = generate_route_object(route, url2, client);
    body = `${create_css_import(route, url2, client)}export const route = ${csr_route};`;
    if (params !== null) body += `
export const params = ${uneval(params)}`;
  }
  return {
    response: text(body, { headers: headers3 }),
    body
  };
}
function create_css_import(route, url2, client) {
  const { errors, layouts, leaf } = route;
  const paths = resolve_paths(url2.pathname);
  let css = "";
  for (const node of [
    ...errors,
    ...layouts.map((l) => l?.[1]),
    leaf[1]
  ]) {
    if (typeof node !== "number") continue;
    const node_css = client.css?.[node];
    for (const css_path of node_css ?? []) css += `'${client_path(css_path, paths)}',`;
  }
  if (!css) return "";
  return `${create_client_import(client.start, paths)}.then(x => x.load_css([${css}]));
`;
}
function Root($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { page: page2, components, onerror, tree, form, error: error2 } = $$props;
    let mounted = false;
    let navigated = false;
    let title = "";
    afterNavigate(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      } else mounted = true;
    });
    function node($$renderer3, n, depth) {
      const Component = derived(() => n.component);
      const Error3 = derived(() => n.error);
      const data = derived(() => n.data);
      function failed($$renderer4, error3) {
        if (Error3()) {
          $$renderer4.push("<!--[-->");
          Error3()($$renderer4, { error: error3 });
          $$renderer4.push("<!--]-->");
        } else {
          $$renderer4.push("<!--[!-->");
          $$renderer4.push("<!--]-->");
        }
      }
      __name(failed, "failed");
      $$renderer3.boundary({ failed: Error3() ? failed : void 0 }, ($$renderer4) => {
        $$renderer4.push(`<!--[-->`);
        if (n.child) {
          $$renderer4.push("<!--[0-->");
          if (Component()) {
            $$renderer4.push("<!--[-->");
            Component()($$renderer4, {
              data: data(),
              form,
              params: page2.params,
              children: /* @__PURE__ */ __name(($$renderer5) => {
                node($$renderer5, n.child, depth + 1);
              }, "children"),
              $$slots: { default: true }
            });
            $$renderer4.push("<!--]-->");
          } else {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push("<!--]-->");
          }
        } else {
          $$renderer4.push("<!--[-1-->");
          if (Component()) {
            $$renderer4.push("<!--[-->");
            Component()($$renderer4, {
              data: data(),
              form,
              params: page2.params,
              error: error2
            });
            $$renderer4.push("<!--]-->");
          } else {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push("<!--]-->");
          }
        }
        $$renderer4.push(`<!--]-->`);
        $$renderer4.push(`<!--]-->`);
      });
    }
    __name(node, "node");
    node($$renderer2, tree, 0);
    $$renderer2.push(`<!----> `);
    if (mounted) {
      $$renderer2.push(`<!--[0--><div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px">`);
      if (navigated) $$renderer2.push(`<!--[0-->${escape_html(title)}`);
      else $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<!--]--></div>`);
    } else $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]-->`);
  });
}
async function render_response({ branch, fetched, page_config, status, error: error2 = null, event, state: state2, resolve_opts, action_result, data_serializer, error_components }) {
  if (is_prerendering(state2)) {
    if (options.csp.mode === "nonce") prerender_nonce();
    if (options.app_template_contains_nonce) prerender_template_nonce({ tag: "%sveltekit.nonce%" });
  }
  const client = manifest.client;
  const modulepreloads = new Set(client?.imports);
  const stylesheets20 = new Set(client?.stylesheets);
  const fonts20 = new Map(client?.fonts.map((font) => [font.file, font]));
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base = "";
  let assets$1 = assets;
  let base_expression = s("");
  const csp = new Csp(options.csp, { prerender: is_prerendering(state2) });
  if (!state2.prerendering?.fallback) {
    ({ base, assets: assets$1 } = resolve_paths(event.url.pathname));
    base_expression = `new URL(${s(base)}, location).pathname.slice(0, -1)`;
  }
  if (page_config.ssr) {
    const props = new Props({
      page: {
        error: error2,
        params: event.params,
        route: event.route,
        status,
        url: event.url,
        data: {},
        form: form_value,
        shallow: null,
        state: {}
      },
      tree: new RenderNode(await branch[0].node.component?.(), void 0),
      form: form_value,
      error: error2 ?? void 0
    });
    let current_node = props.tree;
    let data2 = props.page.data;
    for (let i = 0; i < branch.length; i += 1) {
      const node = branch[i];
      data2 = {
        ...data2,
        ...node.data
      };
      current_node.data = data2;
      if (i < branch.length - 1) current_node = current_node.child = new RenderNode(await branch[i + 1].node.component?.(), error_components?.[i + 1]);
    }
    props.page.data = data2;
    const render_state = {
      ...state2,
      is_in_render: true
    };
    const render_opts = {
      context: /* @__PURE__ */ new Map([["__request__", { page: props.page }]]),
      csp: csp.script_needs_nonce ? { nonce: csp.nonce } : { hash: csp.script_needs_hash },
      transformError: error_components ? (e) => {
        if (isRedirect(e)) throw e;
        const handled = handle_error_and_jsonify(event, render_state, e);
        if (handled instanceof Promise) return handled.then((e2) => {
          error2 = e2;
          props.page.error = error2;
          props.page.status = status = error2.status;
          return error2;
        });
        error2 = handled;
        props.page.error = error2;
        props.page.status = status = error2.status;
        return error2;
      } : void 0
    };
    globalThis.fetch;
    try {
      rendered = await with_request_store({
        event,
        state: render_state
      }, async () => {
        return render(Root, {
          ...render_opts,
          props
        });
      });
      if (rendered.hashes) csp.add_script_hashes(rendered.hashes.script);
    } finally {
    }
  } else rendered = {
    head: "",
    body: "",
    hashes: { script: [] }
  };
  for (const { node } of branch) {
    for (const url2 of node.imports) modulepreloads.add(url2);
    for (const url2 of node.stylesheets) stylesheets20.add(url2);
    for (const font of node.fonts) fonts20.set(font.file, font);
    if (node.inline_styles && !client?.inline) Object.entries(await node.inline_styles()).forEach(([filename, css]) => {
      if (typeof css === "string") {
        inline_styles.set(filename, css);
        return;
      }
      inline_styles.set(filename, css(`${assets$1}/${app_dir}/immutable/assets`, assets$1));
    });
  }
  const head2 = new Head(rendered.head);
  let body = rendered.body;
  const prefixed = /* @__PURE__ */ __name((path2) => client_path(path2, {
    base,
    assets: assets$1
  }), "prefixed");
  const style = client?.inline ? client.inline?.style : Array.from(inline_styles.values()).join("\n");
  if (style) {
    const attributes2 = [];
    if (csp.style_needs_nonce) attributes2.push(`nonce="${csp.nonce}"`);
    await csp.add_style(style);
    head2.add_style(style, attributes2);
  }
  const add_preload = /* @__PURE__ */ __name((path2, attributes2) => {
    head2.add_link_tag(path2, attributes2);
  }, "add_preload");
  for (const dep of stylesheets20) {
    const path2 = prefixed(dep);
    const attributes2 = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) attributes2.push("disabled", 'media="(max-width: 0)"');
    head2.add_stylesheet(path2, attributes2);
  }
  for (const { file, filename } of fonts20.values()) {
    const path2 = prefixed(file);
    if (resolve_opts.preload({
      type: "font",
      path: path2,
      filename
    })) add_preload(path2, [
      'rel="preload"',
      'as="font"',
      `type="font/${file.slice(file.lastIndexOf(".") + 1)}"`,
      "crossorigin"
    ]);
  }
  const global = "__sveltekit_132s7ck";
  const { data, chunks } = data_serializer.get_data(csp);
  if (page_config.ssr && page_config.csr) body += `
			${fetched.map((item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, is_prerendering(state2))).join("\n			")}`;
  if (page_config.csr && client) {
    const route = client.routes?.find((r2) => r2.id === event.route.id) ?? null;
    const load_env_eagerly = client.uses_env_dynamic_public && is_prerendering(state2);
    if (load_env_eagerly) modulepreloads.add(`${app_dir}/env.js`);
    if (!client.inline) for (const dep of modulepreloads) {
      const path2 = prefixed(dep);
      if (resolve_opts.preload({
        type: "js",
        path: path2
      })) add_preload(path2, ['rel="modulepreload"']);
    }
    if (client.routes && state2.prerendering && !state2.prerendering.fallback) {
      const pathname = add_resolution_suffix2(event.url.pathname);
      state2.prerendering.dependencies.set(pathname, create_server_routing_response(route, event.params, new URL(pathname, event.url), client));
      if (route && !state2.prerendering.resolved_route_ids.has(route.id)) {
        state2.prerendering.resolved_route_ids.add(route.id);
        const id_pathname = "" + route_id_resolution_pathname(route.id);
        state2.prerendering.dependencies.set(id_pathname, create_server_routing_response(route, null, new URL(id_pathname, event.url), client));
      }
    }
    const blocks = [];
    const properties = [`base: ${base_expression}`, `version: ${s("1795096132895")}`];
    if (assets) properties.push(`assets: ${s(assets)}`);
    if (client.uses_env_dynamic_public) properties.push(`env: ${load_env_eagerly ? "null" : uneval(rendered_env)}`);
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      let app_declaration = "";
      if (has_custom_transporters) {
        if (client.inline) app_declaration = `const app = ${global}.app.app;`;
        else if (client.app) app_declaration = `const kit = await import(${s(prefixed(client.start))});
							kit.init(${global});
							const app = await import(${s(prefixed(client.app))});`;
        else app_declaration = `const { app } = await import(${s(prefixed(client.start))});`;
      }
      const prelude = app_declaration ? `${app_declaration}
							const [data, error] = fn(app);` : `const [data, error] = fn();`;
      properties.push(`resolve: async (id, fn) => {
							${prelude}

							const try_to_resolve = () => {
								if (!deferred.has(id)) {
									setTimeout(try_to_resolve, 0);
									return;
								}
								const { fulfil, reject } = deferred.get(id);
								deferred.delete(id);
								if (error) reject(error);
								else fulfil(data);
							}
							try_to_resolve();
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = {
        form: "null",
        error: "null"
      };
      if (form_value) serialized.form = uneval_action_response(form_value, event.route.id);
      if (error2) serialized.error = uneval(error2);
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        `data: ${data}`,
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200 && !error2) hydrate.push(`status: ${status}`);
      if (client.routes) {
        if (route) {
          const stringified = generate_route_object(route, event.url, client).replaceAll("\n", "\n							");
          hydrate.push(`params: ${uneval(event.params)}`, `server_route: ${stringified}`);
        }
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate.join(`,
${indent}	`)}
${indent}}`);
    }
    const remote_data = await collect_remote_data({}, event, state2);
    const serialized_data = Object.keys(remote_data).length > 0 ? `${global}.data = ${uneval2(remote_data)};

						` : "";
    const boot = client.inline ? `${client.inline.script}

					${serialized_data}${global}.app.start(${args.join(", ")});` : client.app ? `import(${s(prefixed(client.start))}).then(async (kit) => {
						kit.init(${global});
						const app = await import(${s(prefixed(client.app))});
						${serialized_data}kit.start(app, ${args.join(", ")});
					});` : `import(${s(prefixed(client.start))}).then((app) => {
						${serialized_data}app.start(${args.join(", ")})
					});`;
    if (load_env_eagerly) blocks.push(`import(${s(`${base}/${app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						${boot.replace(/\n/g, "\n	")}
					});`);
    else blocks.push(boot);
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    await csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers3 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (is_prerendering(state2)) {
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) head2.add_http_equiv(csp_headers);
    if (state2.prerendering?.cache) head2.add_http_equiv(`<meta http-equiv="cache-control" content="${escape_html2(state2.prerendering.cache, true)}">`);
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) headers3.set("content-security-policy", csp_header);
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) headers3.set("content-security-policy-report-only", report_only_header);
  }
  const html = options.templates.app({
    head: head2.build(),
    body,
    assets: assets$1,
    nonce: csp.nonce,
    env: explicit_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) headers3.set("etag", `"${hash(transformed)}"`);
  return chunks ? new Response(stream_text(transformed + "\n", chunks), {
    status,
    headers: headers3
  }) : text(transformed, {
    status,
    headers: headers3
  });
}
function join_or(items) {
  return items.length > 1 ? `${items.slice(0, -1).join(", ")} or ${items.at(-1)}` : items[0];
}
function validator(expected) {
  function validate(module2, file) {
    if (!module2) return;
    for (const key in module2) {
      if (key[0] === "_" || expected.has(key)) continue;
      const locations = valid_locations(key, file?.slice(file.lastIndexOf(".")));
      if (locations.length > 0) invalid_export_location({
        key,
        locations: join_or(locations),
        file: file || void 0
      });
      invalid_export({
        key,
        exports: [...expected.values()].join(", "),
        file: file || void 0
      });
    }
  }
  __name(validate, "validate");
  return validate;
}
function valid_locations(key, ext = ".js") {
  const locations = [];
  if (valid_layout_exports.has(key)) locations.push(`+layout${ext}`);
  if (valid_page_exports.has(key)) locations.push(`+page${ext}`);
  if (valid_layout_server_exports.has(key)) locations.push(`+layout.server${ext}`);
  if (valid_page_server_exports.has(key)) locations.push(`+page.server${ext}`);
  if (valid_server_exports.has(key)) locations.push(`+server${ext}`);
  return locations;
}
async function respond_with_error({ event, state: state2, error: error2, resolve_opts }) {
  if (event.isDataRequest) return handle_fatal_error(event, state2, error2);
  if (event.request.headers.get("x-sveltekit-error")) {
    const transformed = await handle_error_and_jsonify(event, state2, error2);
    return static_error_page(transformed.status, transformed.message);
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest.nodes[0]();
    const nodes = new PageNodes([default_layout]);
    const ssr = nodes.ssr();
    const csr = nodes.csr();
    const data_serializer = server_data_serializer(event, state2);
    const transformed = await handle_error_and_jsonify(event, state2, error2);
    if (ssr) {
      state2.error = true;
      const server_data_promise = load_server_data({
        event,
        state: state2,
        node: default_layout,
        parent: /* @__PURE__ */ __name(async () => ({}), "parent")
      });
      const server_data = await server_data_promise;
      data_serializer.add_node(0, server_data);
      const data = await load_data({
        event,
        state: state2,
        fetched,
        node: default_layout,
        parent: /* @__PURE__ */ __name(async () => ({}), "parent"),
        resolve_opts,
        server_data_promise,
        csr
      });
      branch.push({
        node: default_layout,
        server_data,
        data
      }, {
        node: await manifest.nodes[1](),
        data: null,
        server_data: null
      });
    }
    return await render_response({
      page_config: {
        ssr,
        csr
      },
      status: transformed.status,
      error: transformed,
      branch,
      error_components: [],
      fetched,
      event,
      state: state2,
      resolve_opts,
      data_serializer
    });
  } catch (e) {
    if (e instanceof Redirect) return redirect_response(e.status, e.location);
    const transformed = await handle_error_and_jsonify(event, state2, e);
    return static_error_page(transformed.status, transformed.message);
  }
}
function static_error_page(status, message) {
  let page2 = options.templates.error({
    status,
    message: escape_html2(message)
  });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, state2, error2) {
  const body = await handle_error_and_jsonify(event, state2, error2);
  const status = body.status;
  const type = negotiate(event.request.headers.get("accept") || "text/html", ["application/json", "text/html"]);
  if (event.isDataRequest || type === "application/json") return Response.json(body, { status });
  return static_error_page(status, body.message);
}
async function render_page(event, state2, page2, nodes, resolve_opts) {
  if (state2.depth > MAX_DEPTH) return text(`Not found: ${event.url.pathname}`, { status: 404 });
  if (is_action_json_request(event)) {
    const node = await manifest.nodes[page2.leaf]();
    return handle_action_json_request(event, state2, node?.server);
  }
  try {
    const leaf_node = nodes.page();
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      const remote_id = get_remote_action(event.url);
      if (remote_id) action_result = await handle_remote_form_post(event, state2, remote_id);
      else action_result = await handle_action_request(event, state2, leaf_node.server);
      if (action_result?.type === "redirect") return redirect_response(action_result.status, action_result.location);
      if (action_result?.type === "error") status = get_status(action_result.error);
      if (action_result?.type === "failure") status = action_result.status;
    }
    const should_prerender = nodes.prerender();
    if (should_prerender) {
      if (leaf_node.server?.actions) prerender_actions();
    } else if (state2.prerendering) return new Response(void 0, { status: 204 });
    state2.prerender_default = should_prerender;
    const should_prerender_data = nodes.should_prerender_data();
    const data_pathname = add_data_suffix2(event.url.pathname);
    const fetched = [];
    const ssr = nodes.ssr();
    const csr = nodes.csr();
    if (ssr === false && !(is_prerendering(state2) && should_prerender_data)) return await render_response({
      branch: compact(nodes.data).map((node) => {
        return {
          node,
          data: null,
          server_data: null
        };
      }),
      fetched,
      page_config: {
        ssr: false,
        csr
      },
      status,
      error: null,
      event,
      state: state2,
      resolve_opts,
      data_serializer: server_data_serializer(event, state2)
    });
    const branch = [];
    let load_error = null;
    const data_serializer = server_data_serializer(event, state2);
    const data_serializer_json = is_prerendering(state2) && should_prerender_data ? server_data_serializer_json(event, state2) : null;
    const server_promises = nodes.data.map((node, i) => {
      if (load_error) throw load_error;
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") throw action_result.error;
          const server_data = await load_server_data({
            event,
            state: state2,
            node,
            parent: /* @__PURE__ */ __name(async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent) Object.assign(data, parent.data);
              }
              return data;
            }, "parent")
          });
          if (node) data_serializer.add_node(i, server_data);
          data_serializer_json?.add_node(i, server_data);
          return server_data;
        } catch (e) {
          load_error = e;
          throw load_error;
        }
      });
    });
    const load_promises = nodes.data.map((node, i) => {
      if (load_error) throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            state: state2,
            fetched,
            node,
            parent: /* @__PURE__ */ __name(async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) Object.assign(data, await load_promises[j]);
              return data;
            }, "parent"),
            resolve_opts,
            server_data_promise: server_promises[i],
            csr
          });
        } catch (e) {
          load_error = e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises) p.catch(noop);
    for (const p of load_promises) p.catch(noop);
    for (let i = 0; i < nodes.data.length; i += 1) {
      const node = nodes.data[i];
      if (node) try {
        const server_data = await server_promises[i];
        const data = await load_promises[i];
        branch.push({
          node,
          server_data,
          data
        });
      } catch (e) {
        const err = normalize_error(e);
        if (err instanceof Redirect) {
          if (state2.prerendering && should_prerender_data) {
            const body = JSON.stringify({
              type: "redirect",
              status: err.status,
              location: err.location
            });
            state2.prerendering.dependencies.set(data_pathname, {
              response: text(body),
              body
            });
          }
          return redirect_response(err.status, err.location);
        }
        const error2 = await handle_error_and_jsonify(event, state2, err);
        const status2 = error2.status;
        for (const { error: index20, idx } of nearest_error_pages(i, branch, page2.errors)) {
          const node2 = await manifest.nodes[index20]();
          data_serializer.set_max_nodes(idx);
          const layouts = compact(branch.slice(0, idx));
          const nodes2 = new PageNodes(layouts.map((layout) => layout.node));
          const error_branch = layouts.concat({
            node: node2,
            data: null,
            server_data: null
          });
          return await render_response({
            event,
            state: state2,
            resolve_opts,
            page_config: {
              ssr: nodes2.ssr(),
              csr: nodes2.csr()
            },
            status: status2,
            error: error2,
            error_components: await load_error_components(ssr, error_branch, page2),
            branch: error_branch,
            fetched,
            data_serializer
          });
        }
        return static_error_page(status2, error2.message);
      }
      else branch.push(null);
    }
    if (state2.prerendering && data_serializer_json) {
      let { data, chunks } = data_serializer_json.get_data();
      if (chunks) for await (const chunk of chunks) data += chunk;
      state2.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      state: state2,
      resolve_opts,
      page_config: {
        csr,
        ssr
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched,
      data_serializer: !ssr ? server_data_serializer(event, state2) : data_serializer,
      error_components: await load_error_components(ssr, branch, page2)
    });
  } catch (e) {
    if (e instanceof Redirect) return redirect_response(e.status, e.location);
    return await respond_with_error({
      event,
      state: state2,
      error: e,
      resolve_opts
    });
  }
}
function load_error_components(ssr, branch, page2) {
  if (!ssr) return void 0;
  return build_error_chain(branch, page2.errors, (idx) => manifest.nodes[idx]?.().then((e) => e.component?.()));
}
function get_self_origin(paths_origin, url_origin) {
  return paths_origin || url_origin;
}
function is_csrf_forbidden({ request, request_origin, self_origin, trusted_origins }) {
  return (!request.headers.get("content-type") || is_form_content_type(request)) && mutating_form_methods.has(request.method) && request_origin !== self_origin && (!request_origin || !trusted_origins.includes(request_origin));
}
function is_remote_forbidden({ request, request_origin, self_origin }) {
  return request.method !== "GET" && request_origin !== self_origin;
}
async function render_data(event, state2, route, invalidated_data_nodes, trailing_slash) {
  if (!route.page) return with_version_header(new Response(void 0, { status: 404 }));
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url2 = new URL(event.url);
    url2.pathname = normalize_path(url2.pathname, trailing_slash);
    const new_event = {
      ...event,
      url: url2
    };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) return { type: "skip" };
          const node = n == void 0 ? n : await manifest.nodes[n]();
          return load_server_data({
            event: new_event,
            state: state2,
            node,
            parent: /* @__PURE__ */ __name(async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await functions[j]();
                if (parent) Object.assign(data2, parent.data);
              }
              return data2;
            }, "parent")
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) return { type: "skip" };
      return fn();
    });
    const data_serializer = server_data_serializer_json(event, state2);
    await Promise.all(promises.map(async (p, i) => {
      const node = await p.catch(async (error2) => {
        if (error2 instanceof Redirect) throw error2;
        return {
          type: "error",
          error: await handle_error_and_jsonify(event, state2, error2)
        };
      });
      data_serializer.add_node(i, node);
    }));
    const { data, chunks } = data_serializer.get_data();
    if (!chunks) return json_response(data);
    return with_version_header(new Response(stream_text(data, chunks), { headers: {
      "content-type": "text/sveltekit-data",
      "cache-control": "private, no-store"
    } }));
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) return redirect_json_response(error2);
    else {
      const transformed = await handle_error_and_jsonify(event, state2, error2);
      return json_response(transformed, transformed.status);
    }
  }
}
function json_response(json2, status = 200) {
  return with_version_header(text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  }));
}
function redirect_json_response(redirect2) {
  return json_response({
    type: "redirect",
    status: redirect2.status,
    location: redirect2.location
  });
}
function generate_cookie_key(domain, path2, name) {
  return `${domain || ""}${path2}?${encodeURIComponent(name)}`;
}
function get_cookies(request, url2) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = parseCookie(header, { decode: /* @__PURE__ */ __name((value) => value, "decode") });
  let default_cookies;
  function parse_header(opts) {
    return opts?.decode ? parseCookie(header, opts) : default_cookies ??= parseCookie(header);
  }
  __name(parse_header, "parse_header");
  function matches_url(cookie) {
    return domain_matches(url2.hostname, cookie.options.domain) && path_matches(url2.pathname, cookie.options.path);
  }
  __name(matches_url, "matches_url");
  let normalized_url;
  const new_cookies = /* @__PURE__ */ new Map();
  const defaults = {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: !(url2.hostname === "localhost" && url2.protocol === "http:")
  };
  const cookies = {
    get(name, opts) {
      let best_match;
      for (const c of new_cookies.values()) if (c.name === name && matches_url(c) && (!best_match || c.options.path.length > best_match.options.path.length)) best_match = c;
      if (best_match) return best_match.options.maxAge === 0 ? void 0 : best_match.value;
      return parse_header(opts)[name];
    },
    getAll(opts) {
      const cookies2 = { ...parse_header(opts) };
      const lookup = /* @__PURE__ */ new Map();
      for (const c of new_cookies.values()) if (matches_url(c)) {
        const existing = lookup.get(c.name);
        if (!existing || c.options.path.length > existing.options.path.length) lookup.set(c.name, c);
      }
      for (const c of lookup.values()) if (c.options.maxAge === 0) delete cookies2[c.name];
      else cookies2[c.name] = c.value;
      return Object.entries(cookies2).filter(([, value]) => value != null).map(([name, value]) => ({
        name,
        value
      }));
    },
    set(name, value, options2) {
      set_internal(name, value, {
        ...defaults,
        ...options2
      });
    },
    delete(name, options2) {
      cookies.set(name, "", {
        ...options2,
        maxAge: 0
      });
    },
    parse: parseSetCookie,
    serialize(name, value, { encode, ...options2 } = {}) {
      let path2 = options2.path ?? "/";
      if (!options2.domain || options2.domain === url2.hostname) {
        if (!normalized_url) cookies_serialize_before_route();
        path2 = resolve(normalized_url, path2);
      }
      return stringifySetCookie({
        name,
        value,
        ...defaults,
        ...options2,
        path: path2
      }, { encode });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = { ...initial_cookies };
    for (const cookie of new_cookies.values()) {
      if (!domain_matches(destination.hostname, cookie.options.domain)) continue;
      if (!path_matches(destination.pathname, cookie.options.path)) continue;
      const encoder = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder(cookie.value);
    }
    if (header2) {
      const parsed = parseCookie(header2, { decode: /* @__PURE__ */ __name((value) => value, "decode") });
      for (const name in parsed) combined_cookies[name] = parsed[name];
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  __name(get_cookie_header, "get_cookie_header");
  const internal_queue = [];
  function set_internal(name, value, options2) {
    if (!normalized_url) {
      internal_queue.push(() => set_internal(name, value, options2));
      return;
    }
    let path2 = options2.path ?? "/";
    if (!options2.domain || options2.domain === url2.hostname) path2 = resolve(normalized_url, path2);
    const cookie_key = generate_cookie_key(options2.domain, path2, name);
    const cookie = {
      name,
      value,
      options: {
        ...options2,
        path: path2
      }
    };
    new_cookies.set(cookie_key, cookie);
  }
  __name(set_internal, "set_internal");
  function set_trailing_slash(trailing_slash) {
    normalized_url = normalize_path(url2.pathname, trailing_slash);
    internal_queue.forEach((fn) => fn());
  }
  __name(set_trailing_slash, "set_trailing_slash");
  return {
    cookies,
    new_cookies,
    get_cookie_header,
    set_internal,
    set_trailing_slash
  };
}
function domain_matches(hostname, constraint) {
  if (!constraint) return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized) return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path2, constraint) {
  if (!constraint) return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path2 === normalized) return true;
  return path2.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers3, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: { encode, ...options2 } } = new_cookie;
    headers3.append("set-cookie", stringifySetCookie({
      name,
      value,
      ...options2
    }, { encode }));
    if (options2.path.endsWith(".html")) {
      const path2 = add_data_suffix2(options2.path);
      headers3.append("set-cookie", stringifySetCookie({
        name,
        value,
        ...options2,
        path: path2
      }, { encode }));
    }
  }
}
function transient_fields() {
  return {
    remote: {
      data: null,
      explicit: null,
      implicit: null,
      forms: null,
      requested: null,
      ignored: null,
      batches: null,
      live_iterators: null
    },
    is_in_remote_function: false,
    is_in_remote_form_or_command: false,
    is_in_remote_query: false,
    is_in_remote_prerender: false,
    is_in_render: false
  };
}
function create_request_state(options2) {
  return {
    getClientAddress: options2.getClientAddress,
    platform: options2.platform,
    read: options2.read,
    before_handle: options2.before_handle,
    emulator: options2.emulator,
    prerendering: options2.prerendering,
    prerender_default: void 0,
    error: false,
    depth: 0,
    rerouted_url: null,
    ...transient_fields()
  };
}
function fork_state_for_subrequest(state2) {
  return {
    ...state2,
    ...transient_fields(),
    depth: state2.depth + 1
  };
}
function create_fetch({ event, state: state2, get_cookie_header, set_internal }) {
  const server_fetch = /* @__PURE__ */ __name(async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return hooks.handleFetch({
      event,
      request: original_request,
      fetch: /* @__PURE__ */ __name(async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url2 = new URL(request.url);
        if (!request.headers.has("origin")) request.headers.set("origin", event.url.origin);
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url2.origin !== event.url.origin || url2.origin === event.url.origin)) request.headers.delete("origin");
        const decoded = decodeURIComponent(url2.pathname);
        if (url2.origin !== event.url.origin || "") {
          if (`.${url2.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url2, request.headers.get("cookie"));
            if (cookie) request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const filename = (decoded.startsWith(assets) ? decoded.slice(assets.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest.assets.has(filename) || filename in manifest.server_assets;
        const is_asset_html = manifest.assets.has(filename_html) || filename_html in manifest.server_assets;
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state2.read) {
            const type = is_asset ? manifest.mime_types[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state2.read(file), { headers: type ? { "content-type": type } : {} });
          } else if (read_implementation && file in manifest.server_assets) {
            const length = manifest.server_assets[file];
            const type = manifest.mime_types[file.slice(file.lastIndexOf("."))];
            return new Response(read_implementation(file), { headers: {
              "Content-Length": "" + length,
              "Content-Type": type
            } });
          }
          return await fetch(request, { redirect: "manual" });
        }
        if (has_prerendered_path(decoded)) return await fetch(request, { redirect: "manual" });
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url2, request.headers.get("cookie"));
          if (cookie) request.headers.set("cookie", cookie);
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) request.headers.set("authorization", authorization);
        }
        if (!request.headers.has("accept")) request.headers.set("accept", "*/*");
        const accept_language = event.request.headers.get("accept-language");
        if (accept_language && !request.headers.has("accept-language")) request.headers.set("accept-language", accept_language);
        const response = await internal_fetch(request, state2);
        for (const str of response.headers.getSetCookie()) {
          const { name, value, ...cookie_options } = parseSetCookie(str, { decode: /* @__PURE__ */ __name((v) => v, "decode") });
          set_internal(name, value, {
            path: cookie_options.path ?? (url2.pathname.split("/").slice(0, -1).join("/") || "/"),
            encode: /* @__PURE__ */ __name((value2) => value2, "encode"),
            ...cookie_options
          });
        }
        return response;
      }, "fetch")
    });
  }, "server_fetch");
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(noop);
    return response;
  };
}
function normalize_fetch_input(info, init2, url2) {
  if (info instanceof Request) return info;
  return new Request(typeof info === "string" ? new URL(info, url2) : info, init2);
}
async function internal_fetch(request, state2) {
  if (request.signal?.aborted) throw new DOMException("The operation was aborted.", "AbortError");
  const subrequest_state = fork_state_for_subrequest(state2);
  if (!request.signal) return await respond$1(request, subrequest_state);
  let remove_abort_listener = noop;
  const abort_promise = new Promise((_, reject) => {
    const on_abort = /* @__PURE__ */ __name(() => {
      reject(new DOMException("The operation was aborted.", "AbortError"));
    }, "on_abort");
    request.signal.addEventListener("abort", on_abort, { once: true });
    remove_abort_listener = /* @__PURE__ */ __name(() => request.signal.removeEventListener("abort", on_abort), "remove_abort_listener");
  });
  return Promise.race([respond$1(request, subrequest_state), abort_promise]).finally(remove_abort_listener);
}
function get_public_env(request) {
  const env2 = rendered_env;
  payload ??= uneval(env2);
  etag ??= `W/${Date.now()}`;
  headers ??= new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  });
  if (request.headers.get("if-none-match") === etag) return new Response(void 0, {
    status: 304,
    headers
  });
  return new Response(`export const env=${payload}`, { headers });
}
async function internal_respond(request, state2) {
  const url2 = new URL(request.url);
  const is_route_resolution_request = has_resolution_suffix2(url2.pathname);
  const is_data_request = has_data_suffix2(url2.pathname);
  const remote_id = get_remote_id(url2);
  {
    const request_origin = request.headers.get("origin");
    const self_origin = get_self_origin(void 0, url2.origin);
    if (remote_id) {
      if (is_remote_forbidden({
        request,
        request_origin,
        self_origin
      })) return Response.json({ message: "Cross-site remote requests are forbidden" }, { status: 403 });
    } else if (is_csrf_forbidden({
      request,
      request_origin,
      self_origin,
      trusted_origins: options.csrf_trusted_origins
    })) {
      const message = `Cross-site ${request.method} form submissions are forbidden`;
      const opts = { status: 403 };
      if (request.headers.get("accept") === "application/json") return Response.json({ message }, opts);
      return text(message, opts);
    }
  }
  let invalidated_data_nodes;
  let skip_route_resolution = false;
  let is_route_id_resolution_request = false;
  if (is_route_resolution_request) {
    url2.pathname = strip_resolution_suffix2(url2.pathname);
    is_route_id_resolution_request = is_route_id_resolution_path(url2.pathname);
  } else if (is_data_request) {
    url2.pathname = strip_data_suffix2(url2.pathname) + (url2.searchParams.get("x-sveltekit-trailing-slash") === "1" ? "/" : "") || "/";
    url2.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url2.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url2.searchParams.delete(INVALIDATED_PARAM);
  } else if (remote_id) {
    const pathname = request.headers.get("x-sveltekit-pathname");
    if (pathname === null) skip_route_resolution = true;
    else {
      url2.pathname = pathname;
      url2.search = request.headers.get("x-sveltekit-search") ?? "";
    }
  }
  for (const key of url2.searchParams.keys()) if (key.startsWith("x-sveltekit-")) return text(`Cannot use reserved query parameter "${key}"`, { status: 400 });
  const headers3 = {};
  const { cookies, new_cookies, get_cookie_header, set_internal, set_trailing_slash } = get_cookies(request, url2);
  const event = {
    cookies,
    fetch: null,
    getClientAddress: state2.getClientAddress || (() => {
      client_address_unsupported({ adapter: "@sveltejs/adapter-cloudflare" });
    }),
    locals: {},
    params: {},
    platform: state2.emulator?.platform ? await state2.emulator.platform({
      config: {},
      prerender: !!state2.prerendering?.fallback
    }) : state2.platform,
    request,
    route: { id: null },
    setHeaders: /* @__PURE__ */ __name((new_headers) => {
      for (const key in new_headers) {
        const lower = key.toLowerCase();
        const value = new_headers[key];
        if (lower === "set-cookie") set_headers_cookie();
        else if (lower in headers3) {
          if (lower === "server-timing") headers3[lower] += ", " + value;
          else header_already_set({ name: key });
        } else {
          headers3[lower] = value;
          if (state2.prerendering && lower === "cache-control") state2.prerendering.cache = value;
        }
      }
    }, "setHeaders"),
    url: url2,
    isDataRequest: is_data_request,
    isSubRequest: state2.depth > 0,
    isRemoteRequest: !!remote_id
  };
  event.fetch = create_fetch({
    event,
    state: state2,
    get_cookie_header,
    set_internal
  });
  let resolved_path = url2.pathname;
  if (!remote_id && !is_route_id_resolution_request) {
    const prerendering_reroute_state = state2.prerendering?.inside_reroute;
    try {
      if (state2.prerendering) state2.prerendering.inside_reroute = true;
      resolved_path = await hooks.reroute({
        url: new URL(url2),
        fetch: event.fetch
      }) ?? url2.pathname;
      if (!manifest.routes.length && resolved_path !== url2.pathname) state2.rerouted_url = denormalise_url({
        request_url: request.url,
        resolved_path,
        is_data_request,
        is_route_resolution_request
      }).toString();
    } catch {
      return text("Internal Server Error", { status: 500 });
    } finally {
      if (state2.prerendering) state2.prerendering.inside_reroute = prerendering_reroute_state;
    }
  }
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  let trailing_slash = "never";
  let page_nodes;
  let decoded_pathname;
  try {
    resolved_path = decode_pathname(resolved_path);
    decoded_pathname = decode_pathname(url2.pathname);
  } catch {
    resolved_path = null;
    return await handle2();
  }
  if (resolved_path !== decoded_pathname && !state2.prerendering?.fallback && has_prerendered_path(resolved_path)) {
    const url3 = denormalise_url({
      request_url: request.url,
      resolved_path,
      is_data_request,
      is_route_resolution_request
    });
    try {
      const response = await fetch(new Request(url3, request), { redirect: "manual" });
      const headers4 = new Headers(response.headers);
      if (headers4.has("content-encoding")) {
        headers4.delete("content-encoding");
        headers4.delete("content-length");
      }
      return new Response(response.body, {
        headers: headers4,
        status: response.status,
        statusText: response.statusText
      });
    } catch (error2) {
      return await handle_fatal_error(event, state2, error2);
    }
  }
  let route = null;
  if (is_route_resolution_request) {
    if (is_route_id_resolution_request) return resolve_route_by_id(extract_route_id(resolved_path), new URL(request.url));
    return resolve_route(resolved_path, new URL(request.url));
  }
  if (resolved_path === `/_app/env.js`) return get_public_env(request);
  if (!remote_id && resolved_path.startsWith(`/_app`)) {
    const headers4 = new Headers();
    headers4.set("cache-control", "public, max-age=0, must-revalidate");
    return text("Not found", {
      status: 404,
      headers: headers4
    });
  }
  if (!state2.prerendering?.fallback && !skip_route_resolution) try {
    const matchers = await manifest.matchers();
    const result = find_route(resolved_path, manifest.routes, matchers);
    if (result) {
      route = result.route;
      event.route = { id: route.id };
      event.params = result.params;
    }
  } catch (e) {
    return await handle_fatal_error(event, state2, e);
  }
  try {
    page_nodes = route?.page ? new PageNodes(await load_page_nodes(route.page)) : void 0;
    if (route && !remote_id) {
      if (url2.pathname === "" || url2.pathname === "/") trailing_slash = "always";
      else if (page_nodes) trailing_slash = page_nodes.trailing_slash();
      else if (route.endpoint) trailing_slash = (await route.endpoint()).trailingSlash ?? "never";
      if (!is_data_request) {
        const normalized = normalize_path(url2.pathname, trailing_slash);
        if (normalized !== url2.pathname && !state2.prerendering?.fallback) return new Response(void 0, {
          status: 308,
          headers: {
            "x-sveltekit-normalize": "1",
            location: relative_pathname(url2.pathname, normalized) + (url2.search === "?" ? "" : url2.search)
          }
        });
      }
      if (state2.before_handle || state2.emulator?.platform) {
        let config = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender = node.prerender ?? prerender;
        } else if (page_nodes) {
          config = page_nodes.get_config() ?? config;
          prerender = state2.prerender_default = page_nodes.prerender();
        }
        if (state2.emulator?.platform) event.platform = await state2.emulator.platform({
          config,
          prerender
        });
        if (state2.before_handle) return await state2.before_handle(event, config, prerender, handle2);
      }
    }
    return await handle2();
  } catch (e) {
    if (e instanceof Redirect) try {
      const response = is_data_request || remote_id ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, new_cookies.values());
      return response;
    } catch (err) {
      return await handle_fatal_error(event, state2, err);
    }
    return await handle_fatal_error(event, state2, e);
  }
  async function handle2() {
    set_trailing_slash(trailing_slash);
    if (state2.prerendering && !state2.prerendering.fallback && !state2.prerendering.inside_reroute) disable_search(url2);
    const response = await record_span({
      name: "sveltekit.handle.root",
      attributes: {
        "http.route": event.route.id || "unknown",
        "http.method": event.request.method,
        "http.url": event.url.href,
        "sveltekit.is_data_request": is_data_request,
        "sveltekit.is_sub_request": event.isSubRequest
      },
      fn: /* @__PURE__ */ __name(async (root_span) => {
        const traced_event = {
          ...event,
          tracing: {
            enabled: false,
            root: root_span,
            current: root_span
          }
        };
        return await with_request_store({
          event: traced_event,
          state: state2
        }, () => hooks.handle({
          event: traced_event,
          resolve: /* @__PURE__ */ __name((event2, opts) => {
            return record_span({
              name: "sveltekit.resolve",
              attributes: { "http.route": event2.route.id || "unknown" },
              fn: /* @__PURE__ */ __name((resolve_span) => {
                return with_request_store(null, () => resolve2(merge_tracing(event2, resolve_span), page_nodes, opts).then((response2) => {
                  for (const key in headers3) {
                    const value = headers3[key];
                    response2.headers.set(key, value);
                  }
                  add_cookies_to_headers(response2.headers, new_cookies.values());
                  if (state2.prerendering && event2.route.id !== null) response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
                  resolve_span.setAttributes({
                    "http.response.status_code": response2.status,
                    "http.response.body.size": response2.headers.get("content-length") || "unknown"
                  });
                  return response2;
                }));
              }, "fn")
            });
          }, "resolve")
        }));
      }, "fn")
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) if_none_match_value = if_none_match_value.substring(2);
      const etag2 = response.headers.get("etag");
      if (if_none_match_value === etag2) {
        const headers4 = new Headers({ etag: etag2 });
        for (const key of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary"
        ]) {
          const value = response.headers.get(key);
          if (value) headers4.set(key, value);
        }
        for (const cookie of response.headers.getSetCookie()) headers4.append("set-cookie", cookie);
        return new Response(void 0, {
          status: 304,
          headers: headers4
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) return redirect_json_response(new Redirect(response.status, location));
    }
    return response;
  }
  __name(handle2, "handle");
  async function resolve2(event2, page_nodes2, opts) {
    try {
      if (opts) resolve_opts = {
        transformPageChunk: opts.transformPageChunk || default_transform,
        filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
        preload: opts.preload || default_preload
      };
      if (resolved_path === null) return await respond_with_error({
        event: event2,
        state: state2,
        error: new SvelteKitError(400, "Malformed URI", `Failed to decode URI: ${event2.url.pathname}`),
        resolve_opts
      });
      if (state2.prerendering?.fallback) return await render_response({
        event: event2,
        state: state2,
        page_config: {
          ssr: false,
          csr: true
        },
        status: 200,
        error: null,
        branch: [{
          node: await manifest.nodes[0](),
          data: null,
          server_data: null
        }],
        fetched: [],
        resolve_opts,
        data_serializer: server_data_serializer(event2, state2)
      });
      if (remote_id) return await handle_remote_call(event2, state2, remote_id);
      if (route) {
        const method = event2.request.method;
        let response2;
        if (is_data_request) response2 = await render_data(event2, state2, route, invalidated_data_nodes, trailing_slash);
        else {
          let endpoint;
          if (route.endpoint && (!route.page || !state2.prerendering && is_endpoint_request(event2))) {
            endpoint = await route.endpoint();
            if (route.page && (method === "GET" || method === "HEAD" || method === "POST")) {
              if (!(method === "POST" ? !!(endpoint.POST || endpoint.fallback) : !!(endpoint.GET || endpoint.fallback || method === "HEAD" && endpoint.HEAD))) endpoint = void 0;
            }
          }
          if (endpoint) response2 = await render_endpoint(event2, state2, endpoint);
          else if (route.page) {
            if (!page_nodes2) throw new Error("page_nodes not found. This should never happen");
            else if (page_methods.has(method)) response2 = await render_page(event2, state2, route.page, page_nodes2, resolve_opts);
            else {
              const allowed_methods2 = new Set(allowed_page_methods);
              if ((await manifest.nodes[route.page.leaf]())?.server?.actions) allowed_methods2.add("POST");
              if (method === "OPTIONS") response2 = new Response(null, {
                status: 204,
                headers: { allow: [...allowed_methods2].join(", ") }
              });
              else {
                const mod = Object.fromEntries([...allowed_methods2].map((m) => [m, true]));
                response2 = method_not_allowed(mod, method);
              }
            }
          } else throw new Error("Route is neither page nor endpoint. This should never happen");
        }
        if ((request.method === "GET" || request.method === "HEAD") && route.page && route.endpoint) {
          const vary = response2.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response2 = new Response(response2.body, {
              status: response2.status,
              statusText: response2.statusText,
              headers: new Headers(response2.headers)
            });
            response2.headers.append("Vary", "Accept");
          }
        }
        return response2;
      }
      if (state2.error && event2.isSubRequest) {
        const headers4 = new Headers(request.headers);
        headers4.set("x-sveltekit-error", "true");
        return await fetch(request, {
          headers: headers4,
          redirect: "manual"
        });
      }
      if (state2.error) return text("Internal Server Error", { status: 500 });
      if (state2.depth === 0) {
        if (!state2.prerendering && is_data_request && invalidated_data_nodes?.length === 1 && invalidated_data_nodes[0]) return await render_data(event2, state2, { page: {
          layouts: [],
          leaf: 0
        } }, invalidated_data_nodes, "ignore");
        if (non_html_fetch_destinations.has(event2.request.headers.get("sec-fetch-dest") ?? "")) return text("Not Found", {
          status: 404,
          headers: { vary: "Sec-Fetch-Dest" }
        });
        return await respond_with_error({
          event: event2,
          state: state2,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state2.prerendering) return text("not found", { status: 404 });
      const response = await fetch(request, { redirect: "manual" });
      return new Response(response.body, response);
    } catch (e) {
      return await handle_fatal_error(event2, state2, e);
    } finally {
      event2.cookies.set = () => {
        cookies_set_after_response();
      };
      event2.setHeaders = () => {
        set_headers_after_response();
      };
    }
  }
  __name(resolve2, "resolve");
}
function load_page_nodes(page2) {
  return Promise.all([...page2.layouts.map((n) => n == void 0 ? n : manifest.nodes[n]()), manifest.nodes[page2.leaf]()]);
}
function propagate_context(fn) {
  return async (req, ...rest) => {
    if (otel === null) return fn(req, ...rest);
    const { propagation, context: context3 } = await otel;
    const c = propagation.extract(context3.active(), Object.fromEntries(req.headers));
    return context3.with(c, async () => {
      return await fn(req, ...rest);
    });
  };
}
function denormalise_url({ request_url, resolved_path, is_data_request, is_route_resolution_request }) {
  const url2 = new URL(request_url);
  url2.pathname = is_data_request ? add_data_suffix2(resolved_path) : is_route_resolution_request ? add_resolution_suffix2(resolved_path) : resolved_path;
  return url2;
}
async function init() {
  await (init_promise ??= (async () => {
    try {
      const module2 = await get_hooks();
      set_hooks({
        handle: module2.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
        handleError: module2.handleError || default_handle_error,
        handleFetch: module2.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
        reroute: module2.reroute || noop
      });
      init_transport(module2.transport ?? {});
      if (module2.init) await module2.init();
    } catch (e) {
      throw e;
    }
  })());
}
async function respond_to(request, options2) {
  const request_state = create_request_state(options2);
  const response = await respond$1(request, request_state);
  if (request_state.rerouted_url) response.headers.set(REROUTED_URL_HEADER, request_state.rerouted_url);
  if (request.method === "HEAD" && response.body !== null) {
    response.body.cancel().catch(noop);
    return new Response(null, response);
  }
  return response;
}
function serialise(fn) {
  let current = null;
  return async (...args) => {
    const { promise, resolve: resolve2 } = Promise.withResolvers();
    const previous = current;
    current = promise;
    await previous;
    return fn(...args).finally(resolve2);
  };
}
var ROUTES_PREFIX, NULL_BODY_STATUS, s, escape_html_attr_dict, escape_html_dict, escape_regex, escape_html_attr_regex, escape_html_regex, replacements2, pattern, array, quoted, crypto_pattern, BaseProvider, CspProvider, CspReportOnlyProvider, Csp, Props, RenderNode, Head, valid_layout_exports, valid_page_exports, valid_layout_server_exports, valid_page_server_exports, valid_server_exports, validate_layout_exports, validate_page_exports, validate_layout_server_exports, validate_page_server_exports, PageNodes, MAX_DEPTH, mutating_form_methods, payload, etag, headers, default_transform, default_filter, default_preload, non_html_fetch_destinations, page_methods, allowed_page_methods, respond$1, init_promise, respond;
var init_instance = __esm({
  ".svelte-kit/output/server/chunks/instance.js"() {
    "use strict";
    init_functions();
    init_internal2();
    init_server_errors();
    init_env();
    init_server22();
    init_navigation();
    init_exports();
    init_internal();
    init_server2();
    init_devalue();
    init_dist();
    __name(render_endpoint, "render_endpoint");
    __name(is_endpoint_request, "is_endpoint_request");
    __name(compact, "compact");
    ROUTES_PREFIX = "/routes";
    __name(route_id_resolution_pathname, "route_id_resolution_pathname");
    __name(is_route_id_resolution_path, "is_route_id_resolution_path");
    __name(extract_route_id, "extract_route_id");
    __name(build_error_chain, "build_error_chain");
    __name(nearest_error_pages, "nearest_error_pages");
    __name(create_async_iterator, "create_async_iterator");
    __name(server_data_serializer, "server_data_serializer");
    __name(server_data_serializer_json, "server_data_serializer_json");
    NULL_BODY_STATUS = [
      101,
      103,
      204,
      205,
      304
    ];
    __name(load_server_data, "load_server_data");
    __name(load_data, "load_data");
    __name(create_universal_fetch, "create_universal_fetch");
    __name(hash, "hash");
    __name(hash_request, "hash_request");
    s = JSON.stringify;
    escape_html_attr_dict = {
      "&": "&amp;",
      '"': "&quot;"
    };
    escape_html_dict = {
      "&": "&amp;",
      "<": "&lt;"
    };
    escape_regex = /* @__PURE__ */ __name((dict) => new RegExp(`[${Object.keys(dict).join("")}]|\\p{Surrogate}`, "gu"), "escape_regex");
    escape_html_attr_regex = escape_regex(escape_html_attr_dict);
    escape_html_regex = escape_regex(escape_html_dict);
    __name(escape_html2, "escape_html");
    replacements2 = {
      "<": "\\u003C",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    pattern = new RegExp(`[${Object.keys(replacements2).join("")}]`, "g");
    __name(serialize_data, "serialize_data");
    array = /* @__PURE__ */ new Uint8Array(16);
    __name(generate_nonce, "generate_nonce");
    __name(sha2562, "sha256");
    quoted = /* @__PURE__ */ new Set([
      "self",
      "unsafe-eval",
      "unsafe-hashes",
      "unsafe-inline",
      "none",
      "strict-dynamic",
      "report-sample",
      "report-sha256",
      "report-sha384",
      "report-sha512",
      "wasm-unsafe-eval",
      "script"
    ]);
    crypto_pattern = /^(nonce|sha\d\d\d)-/;
    BaseProvider = class {
      static {
        __name(this, "BaseProvider");
      }
      /** @type {boolean} */
      #use_hashes;
      /** @type {boolean} */
      script_needs_csp;
      /** @type {boolean} */
      #script_src_needs_csp;
      /** @type {boolean} */
      #script_src_elem_needs_csp;
      /** @type {boolean} */
      style_needs_csp;
      /** @type {boolean} */
      #style_src_needs_csp;
      /** @type {boolean} */
      #style_src_attr_needs_csp;
      /** @type {boolean} */
      #style_src_elem_needs_csp;
      /** @type {import('types').CspDirectives} */
      #directives;
      /** @type {Set<import('types').Csp.Source>} */
      #script_src = /* @__PURE__ */ new Set();
      /** @type {Set<import('types').Csp.Source>} */
      #script_src_elem = /* @__PURE__ */ new Set();
      /** @type {Set<import('types').Csp.Source>} */
      #style_src = /* @__PURE__ */ new Set();
      /** @type {Set<import('types').Csp.Source>} */
      #style_src_attr = /* @__PURE__ */ new Set();
      /** @type {Set<import('types').Csp.Source>} */
      #style_src_elem = /* @__PURE__ */ new Set();
      /** @type {boolean} */
      script_needs_nonce;
      /** @type {boolean} */
      style_needs_nonce;
      /** @type {boolean} */
      script_needs_hash;
      /**
      * @param {boolean} use_hashes
      * @param {import('types').CspDirectives} directives
      */
      constructor(use_hashes, directives) {
        this.#use_hashes = use_hashes;
        this.#directives = directives;
        const d = this.#directives;
        const effective_script_src = d["script-src"] || d["default-src"];
        const script_src_elem = d["script-src-elem"];
        const effective_style_src = d["style-src"] || d["default-src"];
        const style_src_attr = d["style-src-attr"];
        const style_src_elem = d["style-src-elem"];
        const style_needs_csp = /* @__PURE__ */ __name((directive) => !!directive && !directive.some((value) => value === "unsafe-inline"), "style_needs_csp");
        const script_needs_csp = /* @__PURE__ */ __name((directive) => !!directive && (!directive.some((value) => value === "unsafe-inline") || directive.some((value) => value === "strict-dynamic")), "script_needs_csp");
        this.#script_src_needs_csp = script_needs_csp(effective_script_src);
        this.#script_src_elem_needs_csp = script_needs_csp(script_src_elem);
        this.#style_src_needs_csp = style_needs_csp(effective_style_src);
        this.#style_src_attr_needs_csp = style_needs_csp(style_src_attr);
        this.#style_src_elem_needs_csp = style_needs_csp(style_src_elem);
        this.script_needs_csp = this.#script_src_needs_csp || this.#script_src_elem_needs_csp;
        this.style_needs_csp = this.#style_src_needs_csp || this.#style_src_attr_needs_csp || this.#style_src_elem_needs_csp;
        this.script_needs_nonce = this.script_needs_csp && !this.#use_hashes;
        this.style_needs_nonce = this.style_needs_csp && !this.#use_hashes;
        this.script_needs_hash = this.script_needs_csp && this.#use_hashes;
      }
      /** @param {CspSource} source */
      add_script(source) {
        if (this.#script_src_needs_csp) this.#script_src.add(source);
        if (this.#script_src_elem_needs_csp) this.#script_src_elem.add(source);
      }
      /** @param {CspSource} source */
      add_style(source) {
        if (!this.style_needs_csp) return;
        if (this.#style_src_needs_csp) this.#style_src.add(source);
        if (this.#style_src_attr_needs_csp) this.#style_src_attr.add(source);
        if (this.#style_src_elem_needs_csp) {
          const sha256_empty_comment_hash = "sha256-9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
          const d = this.#directives;
          if (d["style-src-elem"] && !d["style-src-elem"].includes(sha256_empty_comment_hash) && !this.#style_src_elem.has(sha256_empty_comment_hash)) this.#style_src_elem.add(sha256_empty_comment_hash);
          if (source !== sha256_empty_comment_hash) this.#style_src_elem.add(source);
        }
      }
      /**
      * @param {boolean} [is_meta]
      */
      get_header(is_meta = false) {
        const header = [];
        const directives = { ...this.#directives };
        const merge_sources = /* @__PURE__ */ __name((key, sources, base) => {
          if (sources.size > 0) directives[key] = [...base || [], ...sources];
        }, "merge_sources");
        merge_sources("style-src", this.#style_src, directives["style-src"] || directives["default-src"]);
        merge_sources("style-src-attr", this.#style_src_attr, directives["style-src-attr"]);
        merge_sources("style-src-elem", this.#style_src_elem, directives["style-src-elem"]);
        merge_sources("script-src", this.#script_src, directives["script-src"] || directives["default-src"]);
        merge_sources("script-src-elem", this.#script_src_elem, directives["script-src-elem"]);
        for (const key in directives) {
          if (is_meta && (key === "frame-ancestors" || key === "report-uri" || key === "sandbox")) continue;
          const value = directives[key];
          if (!value) continue;
          const directive = [key];
          if (Array.isArray(value)) for (const source of value) directive.push(quoted.has(source) || crypto_pattern.test(source) ? `'${source}'` : source);
          header.push(directive.join(" "));
        }
        return header.join("; ");
      }
    };
    CspProvider = class extends BaseProvider {
      static {
        __name(this, "CspProvider");
      }
      get_meta() {
        const content = this.get_header(true);
        if (!content) return;
        return `<meta http-equiv="content-security-policy" content="${escape_html2(content, true)}">`;
      }
    };
    CspReportOnlyProvider = class extends BaseProvider {
      static {
        __name(this, "CspReportOnlyProvider");
      }
      /**
      * @param {boolean} use_hashes
      * @param {import('types').CspDirectives} directives
      */
      constructor(use_hashes, directives) {
        super(use_hashes, directives);
        if (Object.values(directives).some((v) => !!v) && !directives["report-to"]?.length && !directives["report-uri"]?.length) csp_report_only_missing_report();
      }
    };
    Csp = class {
      static {
        __name(this, "Csp");
      }
      /** @readonly */
      nonce = generate_nonce();
      /** @type {CspProvider} */
      csp_provider;
      /** @type {CspReportOnlyProvider} */
      report_only_provider;
      /** @type {boolean} */
      #use_hashes;
      /**
      * @param {import('./types.js').CspConfig} config
      * @param {import('./types.js').CspOpts} opts
      */
      constructor({ mode, directives, reportOnly }, { prerender }) {
        this.#use_hashes = mode === "hash" || mode === "auto" && prerender;
        this.csp_provider = new CspProvider(this.#use_hashes, directives);
        this.report_only_provider = new CspReportOnlyProvider(this.#use_hashes, reportOnly);
      }
      /**
      * @param {string} content
      * @returns {Promise<CspSource>}
      */
      async #get_source(content) {
        return this.#use_hashes ? `sha256-${await sha2562(content)}` : `nonce-${this.nonce}`;
      }
      get script_needs_hash() {
        return this.csp_provider.script_needs_hash || this.report_only_provider.script_needs_hash;
      }
      get script_needs_nonce() {
        return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
      }
      get style_needs_nonce() {
        return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
      }
      /** @param {string} content */
      async add_script(content) {
        if (!this.csp_provider.script_needs_csp && !this.report_only_provider.script_needs_csp) return;
        const source = await this.#get_source(content);
        if (this.csp_provider.script_needs_csp) this.csp_provider.add_script(source);
        if (this.report_only_provider.script_needs_csp) this.report_only_provider.add_script(source);
      }
      /** @param {`sha256-${string}`[]} hashes */
      add_script_hashes(hashes) {
        for (const hash2 of hashes) {
          this.csp_provider.add_script(hash2);
          this.report_only_provider.add_script(hash2);
        }
      }
      /** @param {string} content */
      async add_style(content) {
        if (!this.csp_provider.style_needs_csp && !this.report_only_provider.style_needs_csp) return;
        const source = await this.#get_source(content);
        this.csp_provider.add_style(source);
        this.report_only_provider.add_style(source);
      }
    };
    __name(generate_route_object, "generate_route_object");
    __name(resolve_paths, "resolve_paths");
    __name(client_path, "client_path");
    __name(create_client_import, "create_client_import");
    __name(resolve_route, "resolve_route");
    __name(resolve_route_by_id, "resolve_route_by_id");
    __name(js_headers, "js_headers");
    __name(create_server_routing_response, "create_server_routing_response");
    __name(create_css_import, "create_css_import");
    __name(Root, "Root");
    Props = class {
      static {
        __name(this, "Props");
      }
      /** @type {Page} */
      page;
      /**
      * An array of the `+layout.svelte` and `+page.svelte` component instances
      * that currently live on the page — used for capturing and restoring snapshots.
      * It's updated/manipulated through `bind:this` in `Root.svelte`.
      * @type {Array<Record<string, any>>}
      * @deprecated only used for `export const snapshot` — TODO 4.0 get rid
      */
      components = [];
      /** @type {any} */
      form;
      /** @type {App.Error | undefined} */
      error;
      /** @type {RenderNode} */
      tree;
      /** @type {(error: unknown, reset: () => void) => void} */
      onerror;
      /**
      * @param {{
      *   page: Page;
      *   tree: RenderNode;
      *   form: any;
      *   error: App.Error | undefined;
      *   onerror?: (error: unknown, reset: () => void) => void;
      * }} props
      */
      constructor({ page: page2, tree, form, error: error2, onerror = noop }) {
        this.page = page2;
        this.tree = tree;
        this.onerror = onerror;
        this.form = form;
        this.error = error2;
      }
    };
    RenderNode = class {
      static {
        __name(this, "RenderNode");
      }
      /** @type {Component} */
      component;
      /** @type {Component | undefined} */
      error;
      /** @type {Record<string, any>} */
      data = {};
      /** @type {RenderNode | undefined} */
      child;
      /**
      *
      * @param {Component} component
      * @param {Component | undefined} error
      */
      constructor(component20, error2) {
        this.component = component20;
        this.error = error2;
      }
    };
    __name(render_response, "render_response");
    Head = class {
      static {
        __name(this, "Head");
      }
      #rendered;
      /** @type {string[]} */
      #http_equiv = [];
      /** @type {string[]} */
      #link_tags = [];
      /** @type {string[]} */
      #style_tags = [];
      /** @type {string[]} */
      #stylesheet_links = [];
      /**
      * @param {string} rendered
      */
      constructor(rendered) {
        this.#rendered = rendered;
      }
      build() {
        return [
          ...this.#http_equiv,
          ...this.#link_tags,
          this.#rendered,
          ...this.#style_tags,
          ...this.#stylesheet_links
        ].join("\n		");
      }
      /**
      * @param {string} style
      * @param {string[]} attributes
      */
      add_style(style, attributes2) {
        this.#style_tags.push(`<style${attributes2.length ? " " + attributes2.join(" ") : ""}>${style}</style>`);
      }
      /**
      * @param {string} href
      * @param {string[]} attributes
      */
      add_stylesheet(href, attributes2) {
        this.#stylesheet_links.push(`<link href="${href}" ${attributes2.join(" ")}>`);
      }
      /**
      * @param {string} href
      * @param {string[]} attributes
      */
      add_link_tag(href, attributes2) {
        this.#link_tags.push(`<link href="${href}" ${attributes2.join(" ")}>`);
      }
      /** @param {string} tag */
      add_http_equiv(tag) {
        this.#http_equiv.push(tag);
      }
    };
    __name(join_or, "join_or");
    __name(validator, "validator");
    __name(valid_locations, "valid_locations");
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([
      ...valid_layout_server_exports,
      "actions",
      "entries"
    ]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "QUERY",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    PageNodes = class {
      static {
        __name(this, "PageNodes");
      }
      /** All layout nodes and the page node, if any */
      data;
      /**
      * @param {Array<import('types').SSRNode | undefined>} nodes
      */
      constructor(nodes) {
        this.data = nodes;
      }
      layouts() {
        return this.data.slice(0, -1);
      }
      page() {
        return this.data.at(-1);
      }
      validate() {
        for (const layout of this.layouts()) if (layout) {
          validate_layout_server_exports(layout.server, layout.server_id);
          validate_layout_exports(layout.universal, layout.universal_id);
        }
        const page2 = this.page();
        if (page2) {
          validate_page_server_exports(page2.server, page2.server_id);
          validate_page_exports(page2.universal, page2.universal_id);
        }
      }
      /**
      * @template {'prerender' | 'ssr' | 'csr' | 'trailingSlash'} Option
      * @param {Option} option
      * @returns {(UniversalNode | ServerNode)[Option] | undefined}
      */
      #get_option(option) {
        return this.data.reduce((value, node) => {
          return node?.universal?.[option] ?? node?.server?.[option] ?? value;
        }, void 0);
      }
      csr() {
        return this.#get_option("csr") ?? true;
      }
      ssr() {
        return this.#get_option("ssr") ?? true;
      }
      prerender() {
        return this.#get_option("prerender") ?? false;
      }
      trailing_slash() {
        return this.#get_option("trailingSlash") ?? "never";
      }
      get_config() {
        let current = {};
        for (const node of this.data) {
          if (!node?.universal?.config && !node?.server?.config) continue;
          current = {
            ...current,
            ...node?.server?.config,
            ...node?.universal?.config
          };
        }
        return Object.keys(current).length ? current : void 0;
      }
      should_prerender_data() {
        return this.data.some((node) => node?.server?.load || node?.server?.trailingSlash !== void 0);
      }
    };
    __name(respond_with_error, "respond_with_error");
    __name(static_error_page, "static_error_page");
    __name(handle_fatal_error, "handle_fatal_error");
    MAX_DEPTH = 10;
    __name(render_page, "render_page");
    __name(load_error_components, "load_error_components");
    mutating_form_methods = /* @__PURE__ */ new Set([
      "POST",
      "PUT",
      "PATCH",
      "DELETE"
    ]);
    __name(get_self_origin, "get_self_origin");
    __name(is_csrf_forbidden, "is_csrf_forbidden");
    __name(is_remote_forbidden, "is_remote_forbidden");
    __name(render_data, "render_data");
    __name(json_response, "json_response");
    __name(redirect_json_response, "redirect_json_response");
    __name(generate_cookie_key, "generate_cookie_key");
    __name(get_cookies, "get_cookies");
    __name(domain_matches, "domain_matches");
    __name(path_matches, "path_matches");
    __name(add_cookies_to_headers, "add_cookies_to_headers");
    __name(transient_fields, "transient_fields");
    __name(create_request_state, "create_request_state");
    __name(fork_state_for_subrequest, "fork_state_for_subrequest");
    __name(create_fetch, "create_fetch");
    __name(normalize_fetch_input, "normalize_fetch_input");
    __name(internal_fetch, "internal_fetch");
    __name(get_public_env, "get_public_env");
    default_transform = /* @__PURE__ */ __name(({ html }) => html, "default_transform");
    default_filter = /* @__PURE__ */ __name(() => false, "default_filter");
    default_preload = /* @__PURE__ */ __name(({ type }) => type === "js" || type === "css", "default_preload");
    non_html_fetch_destinations = /* @__PURE__ */ new Set([
      "audio",
      "audioworklet",
      "font",
      "image",
      "json",
      "manifest",
      "paintworklet",
      "report",
      "script",
      "serviceworker",
      "sharedworker",
      "style",
      "track",
      "video",
      "webidentity",
      "worker",
      "xslt"
    ]);
    page_methods = /* @__PURE__ */ new Set([
      "GET",
      "HEAD",
      "POST"
    ]);
    allowed_page_methods = /* @__PURE__ */ new Set([
      "GET",
      "HEAD",
      "OPTIONS"
    ]);
    respond$1 = propagate_context(internal_respond);
    __name(internal_respond, "internal_respond");
    __name(load_page_nodes, "load_page_nodes");
    __name(propagate_context, "propagate_context");
    __name(denormalise_url, "denormalise_url");
    __name(init, "init");
    __name(respond_to, "respond_to");
    __name(serialise, "serialise");
    respond = IN_WEBCONTAINER2 ? serialise(respond_to) : respond_to;
  }
});

// .svelte-kit/output/server/chunks/index-server.js
var init_index_server = __esm({
  ".svelte-kit/output/server/chunks/index-server.js"() {
    "use strict";
    init_server22();
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    children($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    "use strict";
    init_server22();
    init_index_server();
    __name(_layout, "_layout");
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    "use strict";
    index = 0;
    component = /* @__PURE__ */ __name(async () => component_cache ??= (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default, "component");
    imports = ["_app/immutable/nodes/0.ynzt47LZ.js", "_app/immutable/chunks/CXfzALsx.js"];
    stylesheets = ["_app/immutable/assets/0.BIWr_fX6.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/chunks/state.js
function context2() {
  return getContext("__request__");
}
var page;
var init_state = __esm({
  ".svelte-kit/output/server/chunks/state.js"() {
    "use strict";
    init_index_server();
    init_server22();
    init_server_errors();
    __name(context2, "context");
    page = {
      get data() {
        return context2().page.data;
      },
      get error() {
        return context2().page.error;
      },
      get form() {
        return context2().page.form;
      },
      get params() {
        return context2().page.params;
      },
      get route() {
        return context2().page.route;
      },
      get shallow() {
        return context2().page.shallow;
      },
      get state() {
        return context2().page.state;
      },
      get status() {
        return context2().page.status;
      },
      get url() {
        return context2().page.url;
      }
    };
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
function Error2($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`);
  });
}
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    "use strict";
    init_server22();
    init_state();
    __name(Error2, "Error");
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    "use strict";
    index2 = 1;
    component2 = /* @__PURE__ */ __name(async () => component_cache2 ??= (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default, "component");
    imports2 = ["_app/immutable/nodes/1.BVl_4ggd.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/CNQRwAtN.js", "_app/immutable/entry/payload.DSmR2FwN.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/chunks/CJPY86v1.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/chunks/auth.svelte.js
var AuthStore, auth;
var init_auth_svelte = __esm({
  ".svelte-kit/output/server/chunks/auth.svelte.js"() {
    "use strict";
    init_server22();
    AuthStore = class {
      static {
        __name(this, "AuthStore");
      }
      user = null;
      loading = true;
      token = null;
      get isAdmin() {
        return this.user?.isAdmin ?? false;
      }
      constructor() {
      }
      getToken() {
        return this.token;
      }
      async restore() {
        const storedToken = localStorage.getItem("auth_token");
        if (!storedToken) {
          this.loading = false;
          return;
        }
        try {
          const res = await fetch("/api/auth/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: storedToken })
          });
          if (res.ok) {
            const data = await res.json();
            this.user = data.user;
            this.token = storedToken;
            document.cookie = `auth_token=${storedToken}; path=/; SameSite=Strict`;
          } else this.clear();
        } catch (error2) {
          console.error("Token verification failed:", error2);
          this.clear();
        } finally {
          this.loading = false;
        }
      }
      async signIn(email, password) {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password
          })
        });
        if (!res.ok) {
          const error2 = await res.json();
          throw new Error(error2.error || "Login failed");
        }
        const data = await res.json();
        this.user = data.user;
        this.token = data.token;
        localStorage.setItem("auth_token", data.token);
        document.cookie = `auth_token=${data.token}; path=/; SameSite=Strict`;
      }
      signOut() {
        this.clear();
        this.user = null;
        this.token = null;
      }
      clear() {
        localStorage.removeItem("auth_token");
        document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
      }
    };
    auth = new AuthStore();
  }
});

// .svelte-kit/output/server/entries/pages/admin/_layout.svelte.js
var layout_svelte_exports2 = {};
__export(layout_svelte_exports2, {
  default: () => _layout2
});
function AdminGuard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    if (auth.loading) $$renderer2.push(`<!--[0--><div class="min-h-screen bg-surface flex items-center justify-center"><div class="text-center"><div class="relative inline-block mb-6"><div class="w-14 h-14 rounded-none bg-ink flex items-center justify-center shadow-bold"><svg class="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"${attr("stroke-width", 1.5)}><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"></path></svg></div> <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-accent"></div></div> <div class="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3"></div> <p class="text-xs text-ink-muted font-mono uppercase tracking-widest">Verifying access...</p></div></div>`);
    else if (auth.user && auth.isAdmin) {
      $$renderer2.push("<!--[1-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]-->`);
  });
}
function _layout2($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const nav = [
      ["Dashboard", "/admin"],
      ["Employee Management", "/admin/employees"],
      ["Video & Learning", "/admin/learning"],
      ["Assessment Builder", "/admin/assessment"],
      ["Question Bank", "/admin/questions"],
      ["Scorecards & Results", "/admin/scorecards"],
      ["Certificate Management", "/admin/certificates"],
      ["Reminder Management", "/admin/reminders"],
      ["User Flows", "/admin/flows"],
      ["Reports & Analytics", "/admin/reports"],
      ["City & Zone", "/admin/cityzone"],
      ["Settings", "/admin/settings"]
    ];
    let { children } = $$props;
    AdminGuard($$renderer2, {
      children: /* @__PURE__ */ __name(($$renderer3) => {
        $$renderer3.push(`<div class="h-screen flex overflow-hidden bg-surface"><aside class="w-60 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col"><div class="px-5 py-5 border-b border-sidebar-border"><h1 class="text-lg font-semibold text-ink leading-none">Edventure</h1> <p class="mt-1.5 text-[11px] text-ink-muted">Learning admin</p></div> <nav class="flex-1 overflow-y-auto py-2" aria-label="Admin"><!--[-->`);
        const each_array = ensure_array_like(nav);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let [label, href] = each_array[$$index];
          const active = href === "/admin" ? page.url.pathname === "/admin" : page.url.pathname.startsWith(href);
          $$renderer3.push(`<a${attr("href", href)}${attr("aria-current", active ? "page" : void 0)}${attr_class(`group relative flex items-center px-5 py-2 text-[13px] transition-colors ${active ? "text-accent bg-accent-light font-medium" : "text-ink-secondary hover:bg-surface-hover hover:text-ink"}`)}>`);
          if (active) $$renderer3.push(`<!--[0--><span class="absolute left-0 top-1 bottom-1 w-[2px] bg-accent" aria-hidden="true"></span>`);
          else $$renderer3.push("<!--[-1-->");
          $$renderer3.push(`<!--]--> ${escape_html(label)}</a>`);
        }
        $$renderer3.push(`<!--]--></nav> <div class="px-5 py-4 border-t border-sidebar-border"><button class="text-[12px] text-ink-muted hover:text-accent">Sign out</button></div></aside> <main class="flex-1 overflow-y-auto"><div class="mx-auto w-full max-w-[1200px]">`);
        children($$renderer3);
        $$renderer3.push(`<!----></div></main></div>`);
      }, "children"),
      $$slots: { default: true }
    });
  });
}
var init_layout_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/_layout.svelte.js"() {
    "use strict";
    init_server22();
    init_state();
    init_navigation();
    init_auth_svelte();
    __name(AdminGuard, "AdminGuard");
    __name(_layout2, "_layout");
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    "use strict";
    index3 = 2;
    component3 = /* @__PURE__ */ __name(async () => component_cache3 ??= (await Promise.resolve().then(() => (init_layout_svelte2(), layout_svelte_exports2))).default, "component");
    imports3 = ["_app/immutable/nodes/2.Djew8JG7.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/CNQRwAtN.js", "_app/immutable/entry/payload.DSmR2FwN.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/chunks/CJPY86v1.js", "_app/immutable/chunks/D3tqHbWA.js", "_app/immutable/chunks/C0rW5HeC.js"];
    stylesheets3 = [];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => _page
});
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    let password = "";
    let loading = false;
    $$renderer2.push(`<div class="min-h-screen bg-surface flex items-center justify-center p-4 relative overflow-hidden"><div class="fixed top-0 left-0 w-64 h-64 bg-accent/5 -translate-x-1/2 -translate-y-1/2 rotate-45 pointer-events-none"></div> <div class="fixed bottom-0 right-0 w-96 h-96 bg-teal/5 translate-x-1/3 translate-y-1/3 rotate-12 pointer-events-none"></div> <div class="fixed top-1/4 right-8 w-2 h-32 bg-accent/20 rotate-45 pointer-events-none hidden lg:block"></div> <div class="fixed bottom-1/4 left-8 w-2 h-24 bg-teal/20 -rotate-12 pointer-events-none hidden lg:block"></div> <div class="w-full max-w-sm relative z-10"><div class="mb-10 animate-slide-up"><div class="flex items-start gap-4 mb-6"><div class="relative"><div class="w-16 h-16 rounded-none bg-ink flex items-center justify-center shadow-bold"><svg class="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"${attr("stroke-width", 1.5)}><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"></path></svg></div> <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-accent"></div></div> <div class="pt-2"><span class="eyebrow block mb-1">Admin Portal</span> <h1 class="text-4xl font-display font-bold text-ink tracking-tight leading-none">JPCO<span class="text-accent">.</span></h1></div></div> <div class="accent-line pl-3"><p class="text-sm text-ink-secondary font-medium">WhatsApp Document Retrieval System</p> <p class="text-xs text-ink-muted mt-0.5">Sign in to your admin account to continue</p></div></div> <div class="bg-white border-2 border-ink/10 shadow-bold p-6 animate-slide-up" style="animation-delay: 100ms">`);
    $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]--> <form class="space-y-5"><div><label for="email" class="eyebrow block mb-2">Email Address</label> <input id="email" type="email"${attr("value", email)} placeholder="admin@jpco.com" class="w-full px-4 py-3 bg-surface border-2 border-ink/10 rounded-none text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent focus:ring-0 transition-all font-mono" required=""${attr("disabled", loading, true)}/></div> <div><label for="password" class="eyebrow block mb-2">Password</label> <input id="password" type="password"${attr("value", password)} placeholder="Enter your password" class="w-full px-4 py-3 bg-surface border-2 border-ink/10 rounded-none text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent focus:ring-0 transition-all font-mono" required=""${attr("disabled", loading, true)}/></div> <button type="submit"${attr("disabled", loading, true)} class="w-full py-3 bg-accent text-white text-sm font-bold uppercase tracking-wider rounded-none hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-bold hover:shadow-glow-accent">`);
    $$renderer2.push(`<!--[-1-->Sign In`);
    $$renderer2.push(`<!--]--></button></form></div> <p class="text-center text-[11px] text-ink-muted mt-6 animate-fade-in">JPCO \xA9 ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} \u2014 WhatsApp Bot v2.0</p></div></div>`);
  });
}
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    "use strict";
    init_server22();
    init_navigation();
    init_auth_svelte();
    __name(_page, "_page");
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    "use strict";
    index4 = 3;
    component4 = /* @__PURE__ */ __name(async () => component_cache4 ??= (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default, "component");
    imports4 = ["_app/immutable/nodes/3.lRf8tlVY.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/D3tqHbWA.js", "_app/immutable/entry/payload.DSmR2FwN.js", "_app/immutable/chunks/CNQRwAtN.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/chunks/C0rW5HeC.js"];
    stylesheets4 = [];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => _page2
});
function _page2($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="p-6"><h2 class="text-xl font-semibold text-ink mb-1">Dashboard</h2> <p class="text-xs text-ink-muted mb-5">Edventure learning overview</p> `);
    $$renderer2.push(`<!--[0--><p class="text-ink-muted text-sm">Loading\u2026</p>`);
    $$renderer2.push(`<!--]--></div>`);
  });
}
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/_page.svelte.js"() {
    "use strict";
    init_server22();
    init_index_server();
    init_auth_svelte();
    __name(_page2, "_page");
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    "use strict";
    index5 = 4;
    component5 = /* @__PURE__ */ __name(async () => component_cache5 ??= (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default, "component");
    imports5 = ["_app/immutable/nodes/4.BqXSGcQk.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/C0rW5HeC.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/entry/payload.DSmR2FwN.js"];
    stylesheets5 = [];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/chunks/admin-data.js
function headers2() {
  return {
    Authorization: "Bearer " + auth.getToken(),
    "Content-Type": "application/json"
  };
}
async function listData(collection) {
  const res = await fetch("/api/admin/data/" + collection, { headers: headers2() });
  if (!res.ok) throw new Error("Failed to load " + collection);
  return res.json();
}
async function updateData(collection, id, data) {
  const res = await fetch("/api/admin/data/" + collection + "/" + id, {
    method: "PUT",
    headers: headers2(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to update");
  return res.json();
}
var init_admin_data = __esm({
  ".svelte-kit/output/server/chunks/admin-data.js"() {
    "use strict";
    init_auth_svelte();
    __name(headers2, "headers");
    __name(listData, "listData");
    __name(updateData, "updateData");
  }
});

// .svelte-kit/output/server/entries/pages/admin/assessment/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => _page3
});
function _page3($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let questions = [];
    let videos = [];
    let title = "";
    let selected = [];
    let moduleId = "";
    function videoLabel(v) {
      return (v.moduleNumber ? `Module ${v.moduleNumber} \u2014 ` : "") + v.title;
    }
    __name(videoLabel, "videoLabel");
    $$renderer2.push(`<div class="p-6"><h2 class="text-xl font-semibold text-ink mb-4">Assessment Builder</h2> <div class="bg-white border border-surface-border rounded p-4 mb-4 space-y-3 max-w-lg"><h3 class="font-semibold text-ink text-sm">${escape_html("Create assessment")}</h3> <input${attr("value", title)} placeholder="Assessment title" class="w-full px-3 py-2 border rounded text-sm"/> <div><p class="text-xs text-ink-muted mb-1">Select questions</p> `);
    if (questions.length === 0) $$renderer2.push(`<!--[0--><p class="text-xs text-ink-muted">No questions in bank yet.</p>`);
    else $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]--> <div class="space-y-1 max-h-40 overflow-y-auto"><!--[-->`);
    const each_array = ensure_array_like(questions);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let q = each_array[$$index];
      $$renderer2.push(`<label class="flex items-center gap-2 text-sm"><input type="checkbox"${attr("checked", selected.includes(q.id), true)}/> ${escape_html(q.text)}</label>`);
    }
    $$renderer2.push(`<!--]--></div></div> <label class="block text-xs text-ink-muted">Linked video (asked after FINISH on that video) `);
    $$renderer2.select({
      value: moduleId,
      class: "w-full px-3 py-2 border rounded text-sm mt-1"
    }, ($$renderer3) => {
      $$renderer3.option({ value: "" }, ($$renderer4) => {
        $$renderer4.push(`Not linked`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(videos);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let v = each_array_1[$$index_1];
        $$renderer3.option({ value: v.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(videoLabel(v))}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</label> <div class="flex gap-2"><button class="px-4 py-2 text-sm font-medium bg-accent text-white rounded">${escape_html("Create Assessment")}</button> `);
    $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]--></div></div> `);
    $$renderer2.push(`<!--[0--><p class="text-ink-muted text-sm">Loading\u2026</p>`);
    $$renderer2.push(`<!--]--> `);
    $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]--></div>`);
  });
}
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/assessment/_page.svelte.js"() {
    "use strict";
    init_server22();
    init_index_server();
    init_admin_data();
    __name(_page3, "_page");
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6
});
var index6, component_cache6, component6, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    "use strict";
    index6 = 5;
    component6 = /* @__PURE__ */ __name(async () => component_cache6 ??= (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default, "component");
    imports6 = ["_app/immutable/nodes/5.DqjCb-ks.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/D6ZJoV_C.js", "_app/immutable/chunks/C0rW5HeC.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/entry/payload.DSmR2FwN.js"];
    stylesheets6 = [];
    fonts6 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/certificates/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => _page4
});
function _page4($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="p-6"><div class="flex items-start justify-between gap-4 mb-4"><div><h2 class="text-xl font-semibold text-ink">Certificate Management</h2> <p class="text-xs text-ink-muted">Generated automatically when the employee completes every video and passes every mapped assessment
        (retakes count). Use Generate to backfill employees who already qualified.</p></div> <button${attr("disabled", false, true)} class="px-4 py-2 text-sm font-medium whitespace-nowrap bg-accent text-white rounded disabled:opacity-50 shrink-0">${escape_html("Generate certificates")}</button></div> `);
    $$renderer2.push(`<!--[0--><p class="text-ink-muted text-sm">Loading\u2026</p>`);
    $$renderer2.push(`<!--]--> `);
    $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]--></div>`);
  });
}
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/certificates/_page.svelte.js"() {
    "use strict";
    init_server22();
    init_index_server();
    init_admin_data();
    init_auth_svelte();
    __name(_page4, "_page");
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  stylesheets: () => stylesheets7
});
var index7, component_cache7, component7, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    "use strict";
    index7 = 6;
    component7 = /* @__PURE__ */ __name(async () => component_cache7 ??= (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default, "component");
    imports7 = ["_app/immutable/nodes/6.Cg9y9HYW.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/D6ZJoV_C.js", "_app/immutable/chunks/C0rW5HeC.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/entry/payload.DSmR2FwN.js"];
    stylesheets7 = [];
    fonts7 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/cityzone/_page.svelte.js
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => _page5
});
function _page5($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let cities = [];
    let zones = [];
    let cityInput = "";
    let cityZone = "";
    let zoneInput = "";
    let loading = true;
    let toast = null;
    function showToast(m) {
      toast = m;
      setTimeout(() => toast = null, 2500);
    }
    __name(showToast, "showToast");
    async function load() {
      loading = true;
      try {
        cities = await listData("cities");
        zones = await listData("zones");
      } catch {
        showToast("Failed to load");
      } finally {
        loading = false;
      }
    }
    __name(load, "load");
    async function setCityZone(city, zone) {
      await updateData("cities", city.id, { zone });
      await load();
    }
    __name(setCityZone, "setCityZone");
    $$renderer2.push(`<div class="p-6"><h2 class="text-xl font-semibold text-ink mb-4">City &amp; Zone Management</h2> `);
    if (loading) $$renderer2.push(`<!--[0--><p class="text-ink-muted text-sm">Loading\u2026</p>`);
    else {
      $$renderer2.push(`<!--[-1--><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><h3 class="font-semibold text-ink mb-2">Cities</h3> <div class="flex gap-2 mb-3"><input${attr("value", cityInput)} placeholder="City name" class="px-3 py-2 border rounded text-sm flex-1"/> `);
      $$renderer2.select({
        value: cityZone,
        class: "px-3 py-2 border rounded text-sm"
      }, ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`No zone`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(zones);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let z = each_array[$$index];
          $$renderer3.option({ value: z.name }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(z.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      });
      $$renderer2.push(` <button class="px-4 py-2 text-sm font-medium bg-accent text-white rounded">Add</button></div> <ul class="space-y-1"><!--[-->`);
      const each_array_1 = ensure_array_like(cities);
      for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
        let c = each_array_1[$$index_2];
        $$renderer2.push(`<li class="bg-white border border-surface-border rounded px-3 py-1.5 text-sm flex items-center justify-between gap-2"><span class="flex-1">${escape_html(c.name)}</span> `);
        $$renderer2.select({
          value: c.zone || "",
          onchange: /* @__PURE__ */ __name((e) => setCityZone(c, e.currentTarget.value), "onchange"),
          class: "px-2 py-1 border rounded text-xs"
        }, ($$renderer3) => {
          $$renderer3.option({ value: "" }, ($$renderer4) => {
            $$renderer4.push(`No zone`);
          });
          $$renderer3.push(`<!--[-->`);
          const each_array_2 = ensure_array_like(zones);
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let z = each_array_2[$$index_1];
            $$renderer3.option({ value: z.name }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(z.name)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        });
        $$renderer2.push(` <button class="text-xs text-danger hover:underline">Delete</button></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div> <div><h3 class="font-semibold text-ink mb-2">Zones</h3> <div class="flex gap-2 mb-3"><input${attr("value", zoneInput)} placeholder="Zone name" class="px-3 py-2 border rounded text-sm flex-1"/> <button class="px-4 py-2 text-sm font-medium bg-accent text-white rounded">Add</button></div> <ul class="space-y-1"><!--[-->`);
      const each_array_3 = ensure_array_like(zones);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let z = each_array_3[$$index_3];
        $$renderer2.push(`<li class="bg-white border border-surface-border rounded px-3 py-1.5 text-sm flex items-center justify-between">${escape_html(z.name)} <button class="text-xs text-danger hover:underline">Delete</button></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (toast) $$renderer2.push(`<!--[0--><div class="fixed top-4 right-4 px-4 py-2 rounded text-sm text-white bg-ink">${escape_html(toast)}</div>`);
    else $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]--></div>`);
  });
}
var init_page_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/cityzone/_page.svelte.js"() {
    "use strict";
    init_server22();
    init_index_server();
    init_admin_data();
    __name(_page5, "_page");
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  component: () => component8,
  fonts: () => fonts8,
  imports: () => imports8,
  index: () => index8,
  stylesheets: () => stylesheets8
});
var index8, component_cache8, component8, imports8, stylesheets8, fonts8;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    "use strict";
    index8 = 7;
    component8 = /* @__PURE__ */ __name(async () => component_cache8 ??= (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default, "component");
    imports8 = ["_app/immutable/nodes/7.BDNVjLfX.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/D6ZJoV_C.js", "_app/immutable/chunks/C0rW5HeC.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/entry/payload.DSmR2FwN.js"];
    stylesheets8 = [];
    fonts8 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/employees/_page.svelte.js
var page_svelte_exports6 = {};
__export(page_svelte_exports6, {
  default: () => _page6
});
function _page6($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-ink">Employee Management</h2> <button class="px-4 py-2 text-sm font-medium whitespace-nowrap bg-accent text-white rounded">${escape_html("+ Add Employee")}</button></div> `);
    $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]--> `);
    $$renderer2.push(`<!--[0--><p class="text-ink-muted">Loading\u2026</p>`);
    $$renderer2.push(`<!--]--> `);
    $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]--></div>`);
  });
}
var init_page_svelte6 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/employees/_page.svelte.js"() {
    "use strict";
    init_server22();
    init_index_server();
    init_auth_svelte();
    __name(_page6, "_page");
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  component: () => component9,
  fonts: () => fonts9,
  imports: () => imports9,
  index: () => index9,
  stylesheets: () => stylesheets9
});
var index9, component_cache9, component9, imports9, stylesheets9, fonts9;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    "use strict";
    index9 = 8;
    component9 = /* @__PURE__ */ __name(async () => component_cache9 ??= (await Promise.resolve().then(() => (init_page_svelte6(), page_svelte_exports6))).default, "component");
    imports9 = ["_app/immutable/nodes/8.DdWJMDSq.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/C0rW5HeC.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/entry/payload.DSmR2FwN.js"];
    stylesheets9 = [];
    fonts9 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/flows/_page.svelte.js
var page_svelte_exports7 = {};
__export(page_svelte_exports7, {
  default: () => _page7
});
function _page7($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let flows = [];
    let query = page.url.searchParams.get("phone") ?? "";
    derived(() => flows.filter((f) => {
      const q = query.trim().toLowerCase();
      return !q || f.clientName.toLowerCase().includes(q) || f.phone.includes(q);
    }));
    $$renderer2.push(`<div class="p-6"><div class="flex items-center justify-between mb-4 gap-4"><div><h2 class="text-xl font-semibold text-ink">User Flows</h2> <p class="text-xs text-ink-muted">One entry per Hi \u2192 completion run, with exact step times (IST).</p></div> <input${attr("value", query)} placeholder="Search name or phone" class="px-3 py-2 border border-surface-border rounded text-sm w-64"/></div> `);
    $$renderer2.push(`<!--[0--><p class="text-ink-muted text-sm">Loading\u2026</p>`);
    $$renderer2.push(`<!--]--></div>`);
  });
}
var init_page_svelte7 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/flows/_page.svelte.js"() {
    "use strict";
    init_server22();
    init_index_server();
    init_state();
    init_auth_svelte();
    __name(_page7, "_page");
  }
});

// .svelte-kit/output/server/nodes/9.js
var __exports10 = {};
__export(__exports10, {
  component: () => component10,
  fonts: () => fonts10,
  imports: () => imports10,
  index: () => index10,
  stylesheets: () => stylesheets10
});
var index10, component_cache10, component10, imports10, stylesheets10, fonts10;
var init__10 = __esm({
  ".svelte-kit/output/server/nodes/9.js"() {
    "use strict";
    index10 = 9;
    component10 = /* @__PURE__ */ __name(async () => component_cache10 ??= (await Promise.resolve().then(() => (init_page_svelte7(), page_svelte_exports7))).default, "component");
    imports10 = ["_app/immutable/nodes/9.BYcPwBwD.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/CNQRwAtN.js", "_app/immutable/entry/payload.DSmR2FwN.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/chunks/CJPY86v1.js", "_app/immutable/chunks/C0rW5HeC.js"];
    stylesheets10 = [];
    fonts10 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/learning/_page.svelte.js
var page_svelte_exports8 = {};
__export(page_svelte_exports8, {
  default: () => _page8
});
function _page8($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="p-6"><h2 class="text-xl font-semibold text-ink mb-4">Video &amp; Learning Management</h2> <div class="bg-white border border-surface-border rounded p-4 mb-5 max-w-lg space-y-3"><h3 class="font-semibold text-ink">${escape_html("Add Video")}</h3> <input${attr("value", "")} placeholder="Video title" class="w-full px-3 py-2 border rounded text-sm"/> <input${attr("value", "")} placeholder="Video link (https://\u2026)" class="w-full px-3 py-2 border rounded text-sm"/> <div class="grid grid-cols-2 gap-3"><input${attr("value", "")} placeholder="Module number" class="px-3 py-2 border rounded text-sm"/> <input${attr("value", "")} placeholder="Description (optional)" class="px-3 py-2 border rounded text-sm"/></div> <div class="flex gap-2"><button${attr("disabled", false, true)} class="px-4 py-2 text-sm font-medium bg-accent text-white rounded disabled:opacity-50">${escape_html("Add Video")}</button> `);
    $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]--></div></div> `);
    $$renderer2.push(`<!--[0--><p class="text-ink-muted text-sm">Loading\u2026</p>`);
    $$renderer2.push(`<!--]--> `);
    $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]--></div>`);
  });
}
var init_page_svelte8 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/learning/_page.svelte.js"() {
    "use strict";
    init_server22();
    init_index_server();
    init_admin_data();
    __name(_page8, "_page");
  }
});

// .svelte-kit/output/server/nodes/10.js
var __exports11 = {};
__export(__exports11, {
  component: () => component11,
  fonts: () => fonts11,
  imports: () => imports11,
  index: () => index11,
  stylesheets: () => stylesheets11
});
var index11, component_cache11, component11, imports11, stylesheets11, fonts11;
var init__11 = __esm({
  ".svelte-kit/output/server/nodes/10.js"() {
    "use strict";
    index11 = 10;
    component11 = /* @__PURE__ */ __name(async () => component_cache11 ??= (await Promise.resolve().then(() => (init_page_svelte8(), page_svelte_exports8))).default, "component");
    imports11 = ["_app/immutable/nodes/10.VaXjQ_Vu.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/D6ZJoV_C.js", "_app/immutable/chunks/C0rW5HeC.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/entry/payload.DSmR2FwN.js"];
    stylesheets11 = [];
    fonts11 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/questions/_page.svelte.js
var page_svelte_exports9 = {};
__export(page_svelte_exports9, {
  default: () => _page9
});
function _page9($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let text2 = "";
    let type = "mcq";
    let marks = 1;
    let options2 = [
      "",
      "",
      "",
      ""
    ];
    let correctIndex = null;
    function correctText() {
      return "";
    }
    __name(correctText, "correctText");
    $$renderer2.push(`<div class="p-6"><h2 class="text-xl font-semibold text-ink mb-1">Question Bank</h2> <p class="text-xs text-ink-muted mb-4">Set the correct answer here so assessments are scored automatically.</p> <div class="bg-white border border-surface-border rounded p-4 mb-5 max-w-2xl space-y-3"><h3 class="font-semibold text-ink text-sm">${escape_html("Add question")}</h3> <input${attr("value", text2)} placeholder="Question text" class="w-full px-3 py-2 border rounded text-sm"/> <div class="grid grid-cols-2 gap-3"><label class="block text-xs text-ink-muted">Type `);
    $$renderer2.select({
      value: type,
      class: "w-full px-3 py-2 border rounded text-sm mt-1"
    }, ($$renderer3) => {
      $$renderer3.option({ value: "mcq" }, ($$renderer4) => {
        $$renderer4.push(`MCQ`);
      });
      $$renderer3.option({ value: "short" }, ($$renderer4) => {
        $$renderer4.push(`Short Answer`);
      });
      $$renderer3.option({ value: "truefalse" }, ($$renderer4) => {
        $$renderer4.push(`True/False`);
      });
    });
    $$renderer2.push(`</label> <label class="block text-xs text-ink-muted">Marks <input type="number" min="1"${attr("value", marks)} class="w-full px-3 py-2 border rounded text-sm mt-1"/></label></div> `);
    {
      $$renderer2.push(`<!--[0--><div><p class="text-xs text-ink-muted mb-1">Options. Select the radio button beside the correct answer.</p> <div class="space-y-2"><!--[-->`);
      const each_array = ensure_array_like(options2);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        each_array[i];
        $$renderer2.push(`<div class="flex items-center gap-2 text-sm"><input type="radio"${attr("checked", correctIndex === i, true)}${attr("value", i)}${attr("aria-label", "Correct answer is option " + (i + 1))}/> <input${attr("value", options2[i])}${attr("placeholder", "Option " + (i + 1))} class="flex-1 px-3 py-2 border rounded text-sm"/> `);
        if (correctIndex === i) $$renderer2.push(`<!--[0--><span class="text-[11px] font-bold text-accent w-16 shrink-0">\u2713 Correct</span>`);
        else $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div> <p${attr_class(`text-xs mt-2 ${correctText() ? "text-ink-muted" : "text-danger"}`)}>Correct answer: ${escape_html(correctText() || "none selected yet, click a radio button")}</p></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="flex gap-2"><button class="px-4 py-2 text-sm font-medium bg-accent text-white rounded">${escape_html("Add")}</button> `);
    $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]--></div></div> `);
    $$renderer2.push(`<!--[0--><p class="text-ink-muted text-sm">Loading\u2026</p>`);
    $$renderer2.push(`<!--]--> `);
    $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]--></div>`);
  });
}
var init_page_svelte9 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/questions/_page.svelte.js"() {
    "use strict";
    init_server22();
    init_index_server();
    init_admin_data();
    __name(_page9, "_page");
  }
});

// .svelte-kit/output/server/nodes/11.js
var __exports12 = {};
__export(__exports12, {
  component: () => component12,
  fonts: () => fonts12,
  imports: () => imports12,
  index: () => index12,
  stylesheets: () => stylesheets12
});
var index12, component_cache12, component12, imports12, stylesheets12, fonts12;
var init__12 = __esm({
  ".svelte-kit/output/server/nodes/11.js"() {
    "use strict";
    index12 = 11;
    component12 = /* @__PURE__ */ __name(async () => component_cache12 ??= (await Promise.resolve().then(() => (init_page_svelte9(), page_svelte_exports9))).default, "component");
    imports12 = ["_app/immutable/nodes/11.4QtNI7gV.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/D6ZJoV_C.js", "_app/immutable/chunks/C0rW5HeC.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/entry/payload.DSmR2FwN.js"];
    stylesheets12 = [];
    fonts12 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/reminders/_page.svelte.js
var page_svelte_exports10 = {};
__export(page_svelte_exports10, {
  default: () => _page10
});
function _page10($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="p-6"><div class="flex items-center justify-between mb-4"><div><h2 class="text-xl font-semibold text-ink">Reminder Management</h2> <p class="text-xs text-ink-muted">Configure reminder timing, messages and track every reminder.</p></div> <button class="px-4 py-2 text-sm font-medium bg-accent text-white rounded hover:bg-accent-hover">Process Due Now</button></div> <div class="flex gap-1 mb-5 border-b border-surface-border"><button${attr_class(`px-4 py-2 text-sm -mb-px border-b-2 border-accent text-accent font-semibold`)}>Video Deliveries</button> <button${attr_class(`px-4 py-2 text-sm -mb-px border-b-2 border-transparent text-ink-muted`)}>Configuration</button> <button${attr_class(`px-4 py-2 text-sm -mb-px border-b-2 border-transparent text-ink-muted`)}>Reminder History</button></div> `);
    $$renderer2.push(`<!--[0--><p class="text-ink-muted">Loading\u2026</p>`);
    $$renderer2.push(`<!--]--></div> `);
    $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]-->`);
  });
}
var init_page_svelte10 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/reminders/_page.svelte.js"() {
    "use strict";
    init_server22();
    init_index_server();
    init_auth_svelte();
    __name(_page10, "_page");
  }
});

// .svelte-kit/output/server/nodes/12.js
var __exports13 = {};
__export(__exports13, {
  component: () => component13,
  fonts: () => fonts13,
  imports: () => imports13,
  index: () => index13,
  stylesheets: () => stylesheets13
});
var index13, component_cache13, component13, imports13, stylesheets13, fonts13;
var init__13 = __esm({
  ".svelte-kit/output/server/nodes/12.js"() {
    "use strict";
    index13 = 12;
    component13 = /* @__PURE__ */ __name(async () => component_cache13 ??= (await Promise.resolve().then(() => (init_page_svelte10(), page_svelte_exports10))).default, "component");
    imports13 = ["_app/immutable/nodes/12.DeVzK260.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/C0rW5HeC.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/entry/payload.DSmR2FwN.js"];
    stylesheets13 = [];
    fonts13 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/reports/_page.svelte.js
var page_svelte_exports11 = {};
__export(page_svelte_exports11, {
  default: () => _page11
});
function _page11($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let deliveries = [];
    let history = [];
    derived(() => {
      return {
        sent: history.filter((x) => x.deliveryStatus === "Sent" || x.deliveryStatus === "Delivered").length,
        failed: history.filter((x) => x.deliveryStatus === "Failed").length,
        cancelled: history.filter((x) => x.deliveryStatus === "Cancelled").length,
        scheduled: history.filter((x) => x.deliveryStatus === "Scheduled").length,
        completed: deliveries.filter((d) => d.status === "completed").length,
        pending: deliveries.filter((d) => d.status !== "completed").length,
        total: deliveries.length
      };
    });
    $$renderer2.push(`<div class="p-6"><h2 class="text-xl font-semibold text-ink mb-4">Reports &amp; Analytics</h2> `);
    $$renderer2.push(`<!--[0--><p class="text-ink-muted text-sm">Loading\u2026</p>`);
    $$renderer2.push(`<!--]--></div>`);
  });
}
var init_page_svelte11 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/reports/_page.svelte.js"() {
    "use strict";
    init_server22();
    init_index_server();
    init_auth_svelte();
    __name(_page11, "_page");
  }
});

// .svelte-kit/output/server/nodes/13.js
var __exports14 = {};
__export(__exports14, {
  component: () => component14,
  fonts: () => fonts14,
  imports: () => imports14,
  index: () => index14,
  stylesheets: () => stylesheets14
});
var index14, component_cache14, component14, imports14, stylesheets14, fonts14;
var init__14 = __esm({
  ".svelte-kit/output/server/nodes/13.js"() {
    "use strict";
    index14 = 13;
    component14 = /* @__PURE__ */ __name(async () => component_cache14 ??= (await Promise.resolve().then(() => (init_page_svelte11(), page_svelte_exports11))).default, "component");
    imports14 = ["_app/immutable/nodes/13.C4k48klH.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/C0rW5HeC.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/entry/payload.DSmR2FwN.js"];
    stylesheets14 = [];
    fonts14 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/scorecards/_page.svelte.js
var page_svelte_exports12 = {};
__export(page_svelte_exports12, {
  default: () => _page12
});
function _page12($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="p-6"><div class="flex items-center justify-between mb-4"><div><h2 class="text-xl font-semibold text-ink">Scorecards &amp; Results</h2> <p class="text-xs text-ink-muted">Pending Evaluation = a question has no answer key yet. Add keys in Question Bank, then re-grade.</p></div> <button${attr("disabled", false, true)} class="px-4 py-2 text-sm font-medium bg-accent text-white rounded disabled:opacity-50">${escape_html("Re-grade pending")}</button></div> `);
    $$renderer2.push(`<!--[0--><p class="text-ink-muted text-sm">Loading\u2026</p>`);
    $$renderer2.push(`<!--]--> `);
    $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]--></div>`);
  });
}
var init_page_svelte12 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/scorecards/_page.svelte.js"() {
    "use strict";
    init_server22();
    init_index_server();
    init_admin_data();
    init_auth_svelte();
    __name(_page12, "_page");
  }
});

// .svelte-kit/output/server/nodes/14.js
var __exports15 = {};
__export(__exports15, {
  component: () => component15,
  fonts: () => fonts15,
  imports: () => imports15,
  index: () => index15,
  stylesheets: () => stylesheets15
});
var index15, component_cache15, component15, imports15, stylesheets15, fonts15;
var init__15 = __esm({
  ".svelte-kit/output/server/nodes/14.js"() {
    "use strict";
    index15 = 14;
    component15 = /* @__PURE__ */ __name(async () => component_cache15 ??= (await Promise.resolve().then(() => (init_page_svelte12(), page_svelte_exports12))).default, "component");
    imports15 = ["_app/immutable/nodes/14.B0amvRDb.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/D6ZJoV_C.js", "_app/immutable/chunks/C0rW5HeC.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/entry/payload.DSmR2FwN.js"];
    stylesheets15 = [];
    fonts15 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/settings/_page.svelte.js
var page_svelte_exports13 = {};
__export(page_svelte_exports13, {
  default: () => _page13
});
function _page13($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="p-6"><h2 class="text-xl font-semibold text-ink mb-4">Settings</h2> `);
    $$renderer2.push(`<!--[0--><p class="text-ink-muted text-sm">Loading\u2026</p>`);
    $$renderer2.push(`<!--]--> `);
    $$renderer2.push("<!--[-1-->");
    $$renderer2.push(`<!--]--></div>`);
  });
}
var init_page_svelte13 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/settings/_page.svelte.js"() {
    "use strict";
    init_server22();
    init_index_server();
    init_admin_data();
    __name(_page13, "_page");
  }
});

// .svelte-kit/output/server/nodes/15.js
var __exports16 = {};
__export(__exports16, {
  component: () => component16,
  fonts: () => fonts16,
  imports: () => imports16,
  index: () => index16,
  stylesheets: () => stylesheets16
});
var index16, component_cache16, component16, imports16, stylesheets16, fonts16;
var init__16 = __esm({
  ".svelte-kit/output/server/nodes/15.js"() {
    "use strict";
    index16 = 15;
    component16 = /* @__PURE__ */ __name(async () => component_cache16 ??= (await Promise.resolve().then(() => (init_page_svelte13(), page_svelte_exports13))).default, "component");
    imports16 = ["_app/immutable/nodes/15.DCX83WBW.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/D6ZJoV_C.js", "_app/immutable/chunks/C0rW5HeC.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/entry/payload.DSmR2FwN.js"];
    stylesheets16 = [];
    fonts16 = [];
  }
});

// .svelte-kit/output/server/entries/pages/delete-data/_page.svelte.js
var page_svelte_exports14 = {};
__export(page_svelte_exports14, {
  default: () => _page14
});
function _page14($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("nbbtwd", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Data Deletion | JPCO WhatsApp Bot</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-surface relative overflow-hidden"><div class="fixed top-10 left-10 w-64 h-64 bg-danger/5 rotate-12 pointer-events-none"></div> <div class="fixed bottom-0 right-10 w-72 h-72 bg-accent/5 -rotate-6 pointer-events-none"></div> <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10"><div class="mb-12 animate-slide-up"><div class="flex items-center gap-3 mb-6"><div class="w-1.5 h-8 bg-danger"></div> <span class="eyebrow text-danger">Privacy</span></div> <h1 class="text-4xl md:text-5xl font-display font-bold text-ink tracking-tight leading-none mb-3">Data <span class="text-danger">Deletion</span> Instructions</h1> <p class="text-base text-ink-secondary leading-relaxed mt-4 max-w-lg">We respect your privacy and your right to control your personal data.
        If you wish to delete your data from our WhatsApp chatbot service, please follow the instructions below.</p></div> <div class="bg-white border-2 border-ink/8 shadow-card p-8 md:p-10 space-y-10 animate-slide-up" style="animation-delay: 100ms"><section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-danger"></div> <h2 class="text-xl font-display font-bold text-ink">What Data Will Be Deleted</h2></div> <p class="text-ink-secondary mb-3">When you request data deletion, we will remove:</p> <div class="space-y-2"><!--[-->`);
    const each_array = ensure_array_like([
      "Your phone number and WhatsApp profile information",
      "All messages and conversation history",
      "Documents and files you have submitted",
      "Any personal information associated with your account"
    ]);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let item = each_array[i];
      $$renderer2.push(`<div class="flex items-start gap-3 pl-3 py-1.5 border-l-2 border-danger/30"><span class="text-danger font-bold text-sm leading-none mt-0.5">\u2022</span> <span class="text-sm text-ink-secondary">${escape_html(item)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section><div class="flex items-center gap-2 mb-6"><div class="w-1 h-6 bg-accent"></div> <h2 class="text-xl font-display font-bold text-ink">How to Request Data Deletion</h2></div> <div class="border-2 border-accent/20 bg-accent/5 p-5 relative"><div class="absolute top-0 left-0 w-2 h-full bg-accent"></div> <p class="eyebrow text-accent mb-2">Option 1: Via WhatsApp</p> <p class="text-ink-secondary text-sm">Send a message to our WhatsApp chatbot with the text:  <span class="font-mono bg-accent/10 text-accent px-2 py-1 border border-accent/20">"Delete my data"</span> 
            or  <span class="font-mono bg-accent/10 text-accent px-2 py-1 border border-accent/20">"Remove my information"</span></p></div> <div class="border-2 border-teal/20 bg-teal/5 p-5 mt-4 relative"><div class="absolute top-0 left-0 w-2 h-full bg-teal"></div> <p class="eyebrow text-teal mb-2">Option 2: Via Email</p> <p class="text-ink-secondary text-sm">Send an email to  <span class="font-mono bg-teal/10 text-teal px-2 py-1 border border-teal/20">[email]</span> 
            with the subject  <span class="font-mono bg-teal/10 text-teal px-2 py-1 border border-teal/20">"Data Deletion Request"</span> 
            and include your WhatsApp phone number in the message.</p></div></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-teal"></div> <h2 class="text-xl font-display font-bold text-ink">Processing Time</h2></div> <p class="text-ink-secondary leading-relaxed">We will process your data deletion request within 30 days. You will receive a confirmation
          once your data has been successfully deleted from our systems.</p></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-accent"></div> <h2 class="text-xl font-display font-bold text-ink">Data Retention Exceptions</h2></div> <p class="text-ink-secondary mb-3">Please note that we may retain certain information if required by law or for legitimate business purposes, such as:</p> <div class="space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like([
      "Legal compliance and regulatory requirements",
      "Fraud prevention and security purposes",
      "Resolving disputes or enforcing agreements"
    ]);
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let item = each_array_1[i];
      $$renderer2.push(`<div class="flex items-start gap-3 pl-3 py-1.5 border-l-2 border-accent/30"><span class="text-accent font-bold text-sm leading-none mt-0.5">\u2022</span> <span class="text-sm text-ink-secondary">${escape_html(item)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-accent"></div> <h2 class="text-xl font-display font-bold text-ink">Questions?</h2></div> <p class="text-ink-secondary leading-relaxed">If you have any questions about data deletion or need assistance, please contact us
          through our WhatsApp chatbot or email us at  <span class="font-mono bg-surface px-1.5 py-0.5 border border-ink/10 text-ink">[email]</span>.</p></section> <section class="pt-6 border-t-2 border-ink/8"><p class="text-sm text-ink-muted">For more information about how we handle your data, please review our  <a href="/privacy" class="text-accent hover:text-accent-hover font-medium border-b border-accent/30 hover:border-accent/60 transition-colors">Privacy Policy</a>.</p></section></div> <p class="text-center text-[11px] text-ink-muted mt-10">JPCO \xA9 ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} \u2014 All rights reserved</p></div></div>`);
  });
}
var init_page_svelte14 = __esm({
  ".svelte-kit/output/server/entries/pages/delete-data/_page.svelte.js"() {
    "use strict";
    init_server22();
    __name(_page14, "_page");
  }
});

// .svelte-kit/output/server/nodes/16.js
var __exports17 = {};
__export(__exports17, {
  component: () => component17,
  fonts: () => fonts17,
  imports: () => imports17,
  index: () => index17,
  stylesheets: () => stylesheets17
});
var index17, component_cache17, component17, imports17, stylesheets17, fonts17;
var init__17 = __esm({
  ".svelte-kit/output/server/nodes/16.js"() {
    "use strict";
    index17 = 16;
    component17 = /* @__PURE__ */ __name(async () => component_cache17 ??= (await Promise.resolve().then(() => (init_page_svelte14(), page_svelte_exports14))).default, "component");
    imports17 = ["_app/immutable/nodes/16.CmfNqodS.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/A_38xYZE.js"];
    stylesheets17 = [];
    fonts17 = [];
  }
});

// .svelte-kit/output/server/entries/pages/privacy/_page.svelte.js
var page_svelte_exports15 = {};
__export(page_svelte_exports15, {
  default: () => _page15
});
function _page15($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("7ke6fz", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Privacy Policy | JPCO WhatsApp Bot</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-surface relative overflow-hidden"><div class="fixed top-20 right-0 w-72 h-72 bg-accent/5 rotate-12 pointer-events-none"></div> <div class="fixed bottom-0 left-10 w-40 h-40 bg-teal/5 -rotate-12 pointer-events-none"></div> <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10"><div class="mb-12 animate-slide-up"><div class="flex items-center gap-3 mb-6"><div class="w-1.5 h-8 bg-accent"></div> <span class="eyebrow">Legal</span></div> <h1 class="text-4xl md:text-5xl font-display font-bold text-ink tracking-tight leading-none mb-3">Privacy <span class="text-accent">Policy</span></h1> <p class="text-sm text-ink-muted font-mono">Last updated: ${escape_html((/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }))}</p></div> <div class="bg-white border-2 border-ink/8 shadow-card p-8 md:p-10 space-y-10 animate-slide-up" style="animation-delay: 100ms"><section><p class="text-ink-secondary leading-relaxed">This Privacy Policy describes how we collect, use, and protect your personal information when you use our WhatsApp chatbot service operated by JPCO.</p></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-accent"></div> <h2 class="text-xl font-display font-bold text-ink">Information We Collect</h2></div> <p class="text-ink-secondary mb-3">We collect the following types of information:</p> <div class="space-y-2"><!--[-->`);
    const each_array = ensure_array_like([
      "Phone number and WhatsApp profile information",
      "Messages and interactions with our chatbot",
      "Documents and files you share with us",
      "Usage data and interaction patterns"
    ]);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let item = each_array[i];
      $$renderer2.push(`<div class="flex items-start gap-3 pl-3 py-1.5 border-l-2 border-accent/30"><span class="text-accent font-bold text-sm leading-none mt-0.5">\u2022</span> <span class="text-sm text-ink-secondary">${escape_html(item)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-teal"></div> <h2 class="text-xl font-display font-bold text-ink">How We Use Your Information</h2></div> <p class="text-ink-secondary mb-3">We use your information to:</p> <div class="space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like([
      "Provide and improve our chatbot services",
      "Process and manage document submissions",
      "Communicate with you about your requests",
      "Ensure security and prevent fraud",
      "Comply with legal obligations"
    ]);
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let item = each_array_1[i];
      $$renderer2.push(`<div class="flex items-start gap-3 pl-3 py-1.5 border-l-2 border-teal/30"><span class="text-teal font-bold text-sm leading-none mt-0.5">\u2022</span> <span class="text-sm text-ink-secondary">${escape_html(item)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-success"></div> <h2 class="text-xl font-display font-bold text-ink">Data Storage and Security</h2></div> <p class="text-ink-secondary leading-relaxed">We store your data securely using industry-standard encryption and security practices.
          Your documents are stored in secure cloud storage with access controls and encryption at rest and in transit.</p></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-accent"></div> <h2 class="text-xl font-display font-bold text-ink">Data Sharing</h2></div> <p class="text-ink-secondary mb-3">We do not sell your personal information. We may share your data with:</p> <div class="space-y-2"><!--[-->`);
    const each_array_2 = ensure_array_like([
      "Service providers who help us operate our platform",
      "Legal authorities when required by law",
      "Third parties with your explicit consent"
    ]);
    for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
      let item = each_array_2[i];
      $$renderer2.push(`<div class="flex items-start gap-3 pl-3 py-1.5 border-l-2 border-accent/30"><span class="text-accent font-bold text-sm leading-none mt-0.5">\u2022</span> <span class="text-sm text-ink-secondary">${escape_html(item)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-[#7048e8]"></div> <h2 class="text-xl font-display font-bold text-ink">Your Rights</h2></div> <p class="text-ink-secondary mb-3">You have the right to:</p> <div class="space-y-2"><!--[-->`);
    const each_array_3 = ensure_array_like([
      "Access your personal data",
      "Request correction of inaccurate data",
      "Request deletion of your data",
      "Opt-out of communications",
      "Export your data"
    ]);
    for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
      let item = each_array_3[i];
      $$renderer2.push(`<div class="flex items-start gap-3 pl-3 py-1.5 border-l-2 border-[#7048e8]/30"><span class="text-[#7048e8] font-bold text-sm leading-none mt-0.5">\u2022</span> <span class="text-sm text-ink-secondary">${escape_html(item)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-accent"></div> <h2 class="text-xl font-display font-bold text-ink">Data Retention</h2></div> <p class="text-ink-secondary leading-relaxed">We retain your personal information for as long as necessary to provide our services
          and comply with legal obligations. You may request deletion of your data at any time.</p></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-teal"></div> <h2 class="text-xl font-display font-bold text-ink">Contact Us</h2></div> <p class="text-ink-secondary leading-relaxed">If you have questions about this Privacy Policy or wish to exercise your rights,
          please contact us through our WhatsApp chatbot or email us at <span class="font-mono text-ink bg-surface px-1.5 py-0.5 border border-ink/10">[email]</span>.</p></section></div> <p class="text-center text-[11px] text-ink-muted mt-10">JPCO \xA9 ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} \u2014 All rights reserved</p></div></div>`);
  });
}
var init_page_svelte15 = __esm({
  ".svelte-kit/output/server/entries/pages/privacy/_page.svelte.js"() {
    "use strict";
    init_server22();
    __name(_page15, "_page");
  }
});

// .svelte-kit/output/server/nodes/17.js
var __exports18 = {};
__export(__exports18, {
  component: () => component18,
  fonts: () => fonts18,
  imports: () => imports18,
  index: () => index18,
  stylesheets: () => stylesheets18
});
var index18, component_cache18, component18, imports18, stylesheets18, fonts18;
var init__18 = __esm({
  ".svelte-kit/output/server/nodes/17.js"() {
    "use strict";
    index18 = 17;
    component18 = /* @__PURE__ */ __name(async () => component_cache18 ??= (await Promise.resolve().then(() => (init_page_svelte15(), page_svelte_exports15))).default, "component");
    imports18 = ["_app/immutable/nodes/17.DmUw9WWt.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/A_38xYZE.js"];
    stylesheets18 = [];
    fonts18 = [];
  }
});

// .svelte-kit/output/server/entries/pages/terms/_page.svelte.js
var page_svelte_exports16 = {};
__export(page_svelte_exports16, {
  default: () => _page16
});
function _page16($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("1e0rsuc", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Terms of Service | JPCO WhatsApp Bot</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-surface relative overflow-hidden"><div class="fixed top-0 right-20 w-56 h-56 bg-teal/5 rotate-45 pointer-events-none"></div> <div class="fixed bottom-20 left-0 w-80 h-80 bg-accent/5 -rotate-12 pointer-events-none"></div> <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10"><div class="mb-12 animate-slide-up"><div class="flex items-center gap-3 mb-6"><div class="w-1.5 h-8 bg-accent"></div> <span class="eyebrow">Legal</span></div> <h1 class="text-4xl md:text-5xl font-display font-bold text-ink tracking-tight leading-none mb-3">Terms of <span class="text-accent">Service</span></h1> <p class="text-sm text-ink-muted font-mono">Last updated: ${escape_html((/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }))}</p></div> <div class="bg-white border-2 border-ink/8 shadow-card p-8 md:p-10 space-y-10 animate-slide-up" style="animation-delay: 100ms"><section><p class="text-ink-secondary leading-relaxed">By using our WhatsApp chatbot service, you agree to these Terms of Service.
          Please read them carefully before using our services.</p></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-accent"></div> <h2 class="text-xl font-display font-bold text-ink">Acceptance of Terms</h2></div> <p class="text-ink-secondary leading-relaxed">By accessing or using our service, you agree to be bound by these Terms of Service
          and all applicable laws and regulations. If you do not agree with any of these terms,
          you are prohibited from using our service.</p></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-teal"></div> <h2 class="text-xl font-display font-bold text-ink">Service Description</h2></div> <p class="text-ink-secondary leading-relaxed">Our service provides an automated WhatsApp chatbot that helps you submit and manage documents.
          We reserve the right to modify, suspend, or discontinue any part of the service at any time.</p></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-accent"></div> <h2 class="text-xl font-display font-bold text-ink">User Responsibilities</h2></div> <p class="text-ink-secondary mb-3">You agree to:</p> <div class="space-y-2"><!--[-->`);
    const each_array = ensure_array_like([
      "Provide accurate and complete information",
      "Use the service only for lawful purposes",
      "Not attempt to interfere with or disrupt the service",
      "Not upload malicious files or content",
      "Respect intellectual property rights",
      "Maintain the confidentiality of your account"
    ]);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let item = each_array[i];
      $$renderer2.push(`<div class="flex items-start gap-3 pl-3 py-1.5 border-l-2 border-accent/30"><span class="text-accent font-bold text-sm leading-none mt-0.5">\u2022</span> <span class="text-sm text-ink-secondary">${escape_html(item)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-teal"></div> <h2 class="text-xl font-display font-bold text-ink">Document Submission</h2></div> <p class="text-ink-secondary leading-relaxed">When you submit documents through our service, you represent that you have the right
          to share those documents and that they do not violate any laws or third-party rights.
          We are not responsible for the content of documents you submit.</p></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-accent"></div> <h2 class="text-xl font-display font-bold text-ink">Intellectual Property</h2></div> <p class="text-ink-secondary leading-relaxed">The service and its original content, features, and functionality are owned by us
          and are protected by international copyright, trademark, and other intellectual property laws.</p></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-danger"></div> <h2 class="text-xl font-display font-bold text-ink">Limitation of Liability</h2></div> <p class="text-ink-secondary leading-relaxed">We provide the service "as is" without warranties of any kind. We shall not be liable
          for any indirect, incidental, special, consequential, or punitive damages resulting from
          your use of or inability to use the service.</p></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-[#7048e8]"></div> <h2 class="text-xl font-display font-bold text-ink">Termination</h2></div> <p class="text-ink-secondary leading-relaxed">We may terminate or suspend your access to the service immediately, without prior notice,
          for any reason, including breach of these Terms of Service.</p></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-success"></div> <h2 class="text-xl font-display font-bold text-ink">Changes to Terms</h2></div> <p class="text-ink-secondary leading-relaxed">We reserve the right to modify these terms at any time. We will notify users of any
          material changes. Your continued use of the service after changes constitutes acceptance
          of the new terms.</p></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-teal"></div> <h2 class="text-xl font-display font-bold text-ink">Governing Law</h2></div> <p class="text-ink-secondary leading-relaxed">These Terms shall be governed by and construed in accordance with applicable laws,
          without regard to conflict of law provisions.</p></section> <section><div class="flex items-center gap-2 mb-4"><div class="w-1 h-6 bg-accent"></div> <h2 class="text-xl font-display font-bold text-ink">Contact Information</h2></div> <p class="text-ink-secondary leading-relaxed">If you have any questions about these Terms of Service, please contact us through
          our WhatsApp chatbot or email us at <span class="font-mono text-ink bg-surface px-1.5 py-0.5 border border-ink/10">[email]</span>.</p></section></div> <p class="text-center text-[11px] text-ink-muted mt-10">JPCO \xA9 ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} \u2014 All rights reserved</p></div></div>`);
  });
}
var init_page_svelte16 = __esm({
  ".svelte-kit/output/server/entries/pages/terms/_page.svelte.js"() {
    "use strict";
    init_server22();
    __name(_page16, "_page");
  }
});

// .svelte-kit/output/server/nodes/18.js
var __exports19 = {};
__export(__exports19, {
  component: () => component19,
  fonts: () => fonts19,
  imports: () => imports19,
  index: () => index19,
  stylesheets: () => stylesheets19
});
var index19, component_cache19, component19, imports19, stylesheets19, fonts19;
var init__19 = __esm({
  ".svelte-kit/output/server/nodes/18.js"() {
    "use strict";
    index19 = 18;
    component19 = /* @__PURE__ */ __name(async () => component_cache19 ??= (await Promise.resolve().then(() => (init_page_svelte16(), page_svelte_exports16))).default, "component");
    imports19 = ["_app/immutable/nodes/18.Di1zO8Or.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/A_38xYZE.js"];
    stylesheets19 = [];
    fonts19 = [];
  }
});

// .svelte-kit/output/server/chunks/rolldown-runtime.js
var __defProp2, __exportAll;
var init_rolldown_runtime = __esm({
  ".svelte-kit/output/server/chunks/rolldown-runtime.js"() {
    "use strict";
    __defProp2 = Object.defineProperty;
    __exportAll = /* @__PURE__ */ __name((all, no_symbols) => {
      let target = {};
      for (var name in all) __defProp2(target, name, {
        get: all[name],
        enumerable: true
      });
      if (!no_symbols) __defProp2(target, Symbol.toStringTag, { value: "Module" });
      return target;
    }, "__exportAll");
  }
});

// .svelte-kit/output/server/chunks/firebase-admin.js
var firebase_admin_exports = {};
__export(firebase_admin_exports, {
  n: () => getFirestore,
  r: () => getStorage,
  t: () => firebase_admin_exports2
});
function getAccount() {
  if (account) return account;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set");
  account = JSON.parse(raw);
  return account;
}
function base64Url(input) {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function pemToBytes(pem) {
  const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}
async function importKey() {
  return crypto.subtle.importKey("pkcs8", pemToBytes(getAccount().private_key), {
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256"
  }, false, ["sign"]);
}
async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 6e4) return cachedToken.value;
  const now = Math.floor(Date.now() / 1e3);
  const header = base64Url(new TextEncoder().encode(JSON.stringify({
    alg: "RS256",
    typ: "JWT"
  })));
  const claims = base64Url(new TextEncoder().encode(JSON.stringify({
    iss: getAccount().client_email,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  })));
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", await importKey(), new TextEncoder().encode(`${header}.${claims}`));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${base64Url(signature)}`
    })
  });
  if (!res.ok) throw new Error(`Google token request failed: ${res.status} ${await res.text()}`);
  const body = await res.json();
  cachedToken = {
    value: body.access_token,
    expiresAt: Date.now() + body.expires_in * 1e3
  };
  return cachedToken.value;
}
async function authedFetch(url2, init2 = {}) {
  const headers3 = new Headers(init2.headers);
  headers3.set("Authorization", `Bearer ${await getAccessToken()}`);
  if (init2.body && !headers3.has("Content-Type")) headers3.set("Content-Type", "application/json");
  let res = await fetch(url2, {
    ...init2,
    headers: headers3
  });
  if (res.status === 401) {
    cachedToken = null;
    headers3.set("Authorization", `Bearer ${await getAccessToken()}`);
    res = await fetch(url2, {
      ...init2,
      headers: headers3
    });
  }
  return res;
}
async function jsonRequest(url2, init2) {
  const res = await authedFetch(url2, init2);
  if (!res.ok) throw new Error(`${init2?.method || "GET"} ${url2} failed: ${res.status} ${await res.text()}`);
  return await res.json();
}
function encodeValue(value) {
  if (value === null || value === void 0) return { nullValue: null };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(encodeValue) } };
  if (typeof value === "object") return { mapValue: { fields: encodeFields(value) } };
  return { nullValue: null };
}
function encodeFields(data) {
  const fields = {};
  for (const [key, value] of Object.entries(data)) if (value !== void 0) fields[key] = encodeValue(value);
  return fields;
}
function decodeValue(value) {
  if (!value) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("nullValue" in value) return null;
  if ("timestampValue" in value) return value.timestampValue;
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(decodeValue);
  if ("mapValue" in value) return decodeFields(value.mapValue.fields || {});
  return null;
}
function decodeFields(fields) {
  const data = {};
  for (const [key, value] of Object.entries(fields || {})) data[key] = decodeValue(value);
  return data;
}
async function sha256Hex(input) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
var firebase_admin_exports2, FIRESTORE_BASE, STORAGE_BASE, account, cachedToken, OPS, documentsBase, documentName, Query, CollectionReference, DocumentReference, WriteBatch, Firestore, firestore, getFirestore, bucketName, StorageFile, Bucket, Storage, storage, getStorage;
var init_firebase_admin = __esm({
  ".svelte-kit/output/server/chunks/firebase-admin.js"() {
    "use strict";
    init_rolldown_runtime();
    firebase_admin_exports2 = /* @__PURE__ */ __exportAll({ getFirestore: /* @__PURE__ */ __name(() => getFirestore, "getFirestore") });
    FIRESTORE_BASE = "https://firestore.googleapis.com/v1";
    STORAGE_BASE = "https://storage.googleapis.com";
    account = null;
    cachedToken = null;
    __name(getAccount, "getAccount");
    __name(base64Url, "base64Url");
    __name(pemToBytes, "pemToBytes");
    __name(importKey, "importKey");
    __name(getAccessToken, "getAccessToken");
    __name(authedFetch, "authedFetch");
    __name(jsonRequest, "jsonRequest");
    __name(encodeValue, "encodeValue");
    __name(encodeFields, "encodeFields");
    __name(decodeValue, "decodeValue");
    __name(decodeFields, "decodeFields");
    OPS = {
      "==": "EQUAL",
      "!=": "NOT_EQUAL",
      "<": "LESS_THAN",
      "<=": "LESS_THAN_OR_EQUAL",
      ">": "GREATER_THAN",
      ">=": "GREATER_THAN_OR_EQUAL",
      "array-contains": "ARRAY_CONTAINS",
      "array-contains-any": "ARRAY_CONTAINS_ANY",
      in: "IN",
      "not-in": "NOT_IN"
    };
    documentsBase = /* @__PURE__ */ __name(() => `${FIRESTORE_BASE}/projects/${getAccount().project_id}/databases/(default)/documents`, "documentsBase");
    documentName = /* @__PURE__ */ __name((path2) => `projects/${getAccount().project_id}/databases/(default)/documents/${path2}`, "documentName");
    Query = class Query2 {
      static {
        __name(this, "Query");
      }
      db;
      path;
      filters;
      ordering;
      max;
      constructor(db, path2, filters = [], ordering = null, max = null) {
        this.db = db;
        this.path = path2;
        this.filters = filters;
        this.ordering = ordering;
        this.max = max;
      }
      where(field, op, value) {
        return new Query2(this.db, this.path, [...this.filters, {
          field,
          op,
          value
        }], this.ordering, this.max);
      }
      orderBy(field, dir = "asc") {
        return new Query2(this.db, this.path, this.filters, {
          field,
          dir: dir === "desc" ? "DESCENDING" : "ASCENDING"
        }, this.max);
      }
      limit(n) {
        return new Query2(this.db, this.path, this.filters, this.ordering, n);
      }
      async get() {
        const segments = this.path.split("/");
        const collectionId = segments.pop();
        const parent = segments.join("/");
        const url2 = parent ? `${documentsBase()}/${parent}:runQuery` : `${documentsBase()}:runQuery`;
        const fieldFilters = this.filters.map((f) => ({ fieldFilter: {
          field: { fieldPath: f.field },
          op: OPS[f.op] || "EQUAL",
          value: encodeValue(f.value)
        } }));
        const structuredQuery = { from: [{ collectionId }] };
        if (fieldFilters.length === 1) structuredQuery.where = fieldFilters[0];
        if (fieldFilters.length > 1) structuredQuery.where = { compositeFilter: {
          op: "AND",
          filters: fieldFilters
        } };
        if (this.ordering) structuredQuery.orderBy = [{
          field: { fieldPath: this.ordering.field },
          direction: this.ordering.dir
        }];
        if (this.max !== null) structuredQuery.limit = this.max;
        const docs = (await jsonRequest(url2, {
          method: "POST",
          body: JSON.stringify({ structuredQuery })
        })).filter((r2) => r2.document).map((r2) => {
          return {
            id: String(r2.document.name).split("/").pop(),
            ref: new DocumentReference(this.db, String(r2.document.name).split("/documents/")[1]),
            data: /* @__PURE__ */ __name(() => decodeFields(r2.document.fields), "data")
          };
        });
        return {
          docs,
          empty: docs.length === 0,
          size: docs.length
        };
      }
    };
    CollectionReference = class extends Query {
      static {
        __name(this, "CollectionReference");
      }
      doc(id) {
        return new DocumentReference(this.db, `${this.path}/${id}`);
      }
      async add(data) {
        const res = await jsonRequest(`${documentsBase()}/${this.path}`, {
          method: "POST",
          body: JSON.stringify({ fields: encodeFields(data) })
        });
        return new DocumentReference(this.db, String(res.name).split("/documents/")[1]);
      }
    };
    DocumentReference = class {
      static {
        __name(this, "DocumentReference");
      }
      db;
      path;
      constructor(db, path2) {
        this.db = db;
        this.path = path2;
      }
      get id() {
        return this.path.split("/").pop();
      }
      collection(name) {
        return new CollectionReference(this.db, `${this.path}/${name}`);
      }
      async get() {
        const res = await authedFetch(`${documentsBase()}/${this.path}`);
        if (res.status === 404) return {
          exists: false,
          id: this.id,
          ref: this,
          data: /* @__PURE__ */ __name(() => void 0, "data")
        };
        if (!res.ok) throw new Error(`GET ${this.path} failed: ${res.status} ${await res.text()}`);
        const doc = await res.json();
        return {
          exists: true,
          id: this.id,
          ref: this,
          data: /* @__PURE__ */ __name(() => decodeFields(doc.fields), "data")
        };
      }
      async set(data) {
        await jsonRequest(`${documentsBase()}/${this.path}`, {
          method: "PATCH",
          body: JSON.stringify({ fields: encodeFields(data) })
        });
      }
      async update(data) {
        const params = new URLSearchParams();
        for (const field of Object.keys(data)) params.append("updateMask.fieldPaths", field);
        await jsonRequest(`${documentsBase()}/${this.path}?${params}`, {
          method: "PATCH",
          body: JSON.stringify({ fields: encodeFields(data) })
        });
      }
      async delete() {
        await jsonRequest(`${documentsBase()}/${this.path}`, { method: "DELETE" });
      }
    };
    WriteBatch = class {
      static {
        __name(this, "WriteBatch");
      }
      db;
      writes = [];
      constructor(db) {
        this.db = db;
      }
      update(ref, data) {
        this.writes.push({
          update: {
            name: documentName(ref.path),
            fields: encodeFields(data)
          },
          updateMask: { fieldPaths: Object.keys(data) }
        });
      }
      delete(ref) {
        this.writes.push({ delete: documentName(ref.path) });
      }
      async commit() {
        if (this.writes.length === 0) return;
        await jsonRequest(`${documentsBase()}:commit`, {
          method: "POST",
          body: JSON.stringify({ writes: this.writes })
        });
        this.writes = [];
      }
    };
    Firestore = class {
      static {
        __name(this, "Firestore");
      }
      collection(path2) {
        return new CollectionReference(this, path2);
      }
      batch() {
        return new WriteBatch(this);
      }
    };
    firestore = null;
    getFirestore = /* @__PURE__ */ __name(() => {
      if (!firestore) firestore = new Firestore();
      return firestore;
    }, "getFirestore");
    bucketName = /* @__PURE__ */ __name(() => process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${getAccount().project_id}.firebasestorage.app`, "bucketName");
    StorageFile = class {
      static {
        __name(this, "StorageFile");
      }
      bucket;
      path;
      constructor(bucket, path2) {
        this.bucket = bucket;
        this.path = path2;
      }
      get name() {
        return this.path;
      }
      /** Upload (create or replace) a file's contents. */
      async save(data, opts = {}) {
        const contentType = opts.contentType || "application/octet-stream";
        const body = typeof data === "string" ? new TextEncoder().encode(data) : data instanceof Uint8Array ? data : new Uint8Array(data);
        const res = await authedFetch(`${STORAGE_BASE}/upload/storage/v1/b/${this.bucket.name}/o?uploadType=media&name=${encodeURIComponent(this.path)}`, {
          method: "POST",
          headers: { "Content-Type": contentType },
          body
        });
        if (!res.ok) throw new Error(`SAVE ${this.path} failed: ${res.status} ${await res.text()}`);
      }
      async delete(opts = {}) {
        const res = await authedFetch(`${STORAGE_BASE}/storage/v1/b/${this.bucket.name}/o/${encodeURIComponent(this.path)}`, { method: "DELETE" });
        if (!res.ok && !(opts.ignoreNotFound && res.status === 404)) throw new Error(`DELETE ${this.path} failed: ${res.status} ${await res.text()}`);
      }
      async getSignedUrl(opts) {
        const method = opts.action === "write" ? "PUT" : "GET";
        const host = "storage.googleapis.com";
        const now = /* @__PURE__ */ new Date();
        const datestamp = now.toISOString().slice(0, 10).replace(/-/g, "");
        const timestamp = now.toISOString().replace(/[^\dTZ]/g, "").slice(0, 15) + "Z";
        const scope = `${datestamp}/auto/storage/goog4_request`;
        const credential = `${getAccount().client_email}/${scope}`;
        const expires = Math.max(1, Math.floor((opts.expires - Date.now()) / 1e3));
        const canonicalUri = `/${this.bucket.name}/${this.path.split("/").map(encodeURIComponent).join("/")}`;
        const signed = [["host", host]];
        if (opts.action === "write" && opts.contentType) signed.push(["content-type", opts.contentType]);
        signed.sort((a, b) => a[0] < b[0] ? -1 : 1);
        const canonicalHeaders = signed.map(([k, v]) => `${k}:${v}
`).join("");
        const signedHeaders = signed.map(([k]) => k).join(";");
        const query = [
          ["X-Goog-Algorithm", "GOOG4-RSA-SHA256"],
          ["X-Goog-Credential", credential],
          ["X-Goog-Date", timestamp],
          ["X-Goog-Expires", String(expires)],
          ["X-Goog-SignedHeaders", signedHeaders]
        ].sort((a, b) => a[0] < b[0] ? -1 : 1).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
        const stringToSign = `GOOG4-RSA-SHA256
${timestamp}
${scope}
${await sha256Hex([
          method,
          canonicalUri,
          query,
          canonicalHeaders,
          signedHeaders,
          "UNSIGNED-PAYLOAD"
        ].join("\n"))}`;
        const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", await importKey(), new TextEncoder().encode(stringToSign));
        return [`https://${host}${canonicalUri}?${query}&X-Goog-Signature=${Array.from(new Uint8Array(signature)).map((b) => b.toString(16).padStart(2, "0")).join("")}`];
      }
    };
    Bucket = class {
      static {
        __name(this, "Bucket");
      }
      name;
      constructor(name) {
        this.name = name;
      }
      file(path2) {
        return new StorageFile(this, path2);
      }
      async getFiles(opts = {}) {
        const files = [];
        let pageToken;
        do {
          const params = new URLSearchParams({ maxResults: "1000" });
          if (opts.prefix) params.set("prefix", opts.prefix);
          if (pageToken) params.set("pageToken", pageToken);
          const res = await jsonRequest(`${STORAGE_BASE}/storage/v1/b/${this.name}/o?${params}`);
          for (const item of res.items || []) files.push(new StorageFile(this, item.name));
          pageToken = res.nextPageToken;
        } while (pageToken);
        return [files, void 0];
      }
    };
    Storage = class {
      static {
        __name(this, "Storage");
      }
      bucket(name) {
        return new Bucket(name || bucketName());
      }
    };
    storage = null;
    getStorage = /* @__PURE__ */ __name(() => {
      if (!storage) storage = new Storage();
      return storage;
    }, "getStorage");
    __name(sha256Hex, "sha256Hex");
  }
});

// .svelte-kit/output/server/chunks/simple-auth.js
import { createHmac, timingSafeEqual } from "crypto";
function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET environment variable is required");
  return secret;
}
function validateCredentials(email, password) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return null;
  if (email === adminEmail && password === adminPassword) return {
    email,
    isAdmin: true
  };
  return null;
}
function generateToken(user) {
  const payload2 = Buffer.from(JSON.stringify(user)).toString("base64url");
  return `${payload2}.${createHmac("sha256", getSecret()).update(payload2).digest("base64url")}`;
}
function verifyToken(token) {
  try {
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return null;
    const payload2 = token.slice(0, dotIndex);
    const sig = token.slice(dotIndex + 1);
    const expectedSig = createHmac("sha256", getSecret()).update(payload2).digest("base64url");
    const sigBuf = Buffer.from(sig);
    const expectedBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) return null;
    const user = JSON.parse(Buffer.from(payload2, "base64url").toString());
    if (user.email === process.env.ADMIN_EMAIL && user.isAdmin) return user;
    return null;
  } catch {
    return null;
  }
}
var init_simple_auth = __esm({
  ".svelte-kit/output/server/chunks/simple-auth.js"() {
    "use strict";
    __name(getSecret, "getSecret");
    __name(validateCredentials, "validateCredentials");
    __name(generateToken, "generateToken");
    __name(verifyToken, "verifyToken");
  }
});

// .svelte-kit/output/server/chunks/auth-middleware.js
async function verifyAdminToken(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) return {
      authorized: false,
      error: "No authorization token provided"
    };
    const token = authHeader.split("Bearer ")[1];
    const user = verifyToken(token);
    if (!user || !user.isAdmin) return {
      authorized: false,
      error: "User is not an admin"
    };
    return {
      authorized: true,
      userId: user.email
    };
  } catch (error2) {
    console.error("Token verification error:", error2);
    return {
      authorized: false,
      error: "Invalid or expired token"
    };
  }
}
function unauthorizedResponse(message = "Unauthorized") {
  return json({ error: message }, { status: 401 });
}
var init_auth_middleware = __esm({
  ".svelte-kit/output/server/chunks/auth-middleware.js"() {
    "use strict";
    init_simple_auth();
    init_exports();
    __name(verifyAdminToken, "verifyAdminToken");
    __name(unauthorizedResponse, "unauthorizedResponse");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/categories/_server.ts.js
var server_ts_exports = {};
__export(server_ts_exports, {
  GET: () => GET,
  POST: () => POST
});
var GET, POST;
var init_server_ts = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/categories/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_auth_middleware();
    init_exports();
    GET = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const doc = await getFirestore().collection("config").doc("categories").get();
        if (!doc.exists) return json({ categories: {} });
        return json({ categories: doc.data()?.categories || {} });
      } catch (error2) {
        console.error("Error fetching categories:", error2);
        return json({ error: "Failed to fetch categories" }, { status: 500 });
      }
    }, "GET");
    POST = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const { categories } = await request.json();
        await getFirestore().collection("config").doc("categories").set({
          categories,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        });
        return json({ success: true });
      } catch (error2) {
        console.error("Error saving categories:", error2);
        return json({ error: "Failed to save categories" }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/chunks/phone.js
function normalizePhone(raw) {
  return raw.replace(/\D/g, "");
}
var init_phone = __esm({
  ".svelte-kit/output/server/chunks/phone.js"() {
    "use strict";
    __name(normalizePhone, "normalizePhone");
  }
});

// .svelte-kit/output/server/chunks/learning-service.js
async function getRegistrationConfig() {
  try {
    const doc = await getFirestore().collection("config").doc("registration").get();
    const data = doc.exists ? doc.data() : {};
    return {
      employeeIdPattern: typeof data.employeeIdPattern === "string" && data.employeeIdPattern ? data.employeeIdPattern : DEFAULT_EMPLOYEE_ID_PATTERN,
      consentVersion: typeof data.consentVersion === "string" ? data.consentVersion : "v1"
    };
  } catch (error2) {
    console.error("[learning] registration config read failed, using defaults:", error2);
    return {
      employeeIdPattern: DEFAULT_EMPLOYEE_ID_PATTERN,
      consentVersion: "v1"
    };
  }
}
async function getCities() {
  return (await getFirestore().collection("cities").get()).docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: String(data.name ?? "").trim(),
      zone: String(data.zone ?? "").trim()
    };
  }).filter((c) => c.name);
}
function moduleKey(module2) {
  return String(module2.moduleNumber ?? module2.title);
}
async function getActiveModules() {
  return (await getFirestore().collection("learningModules").get()).docs.map((d) => ({
    ...d.data(),
    id: d.id
  })).filter((m) => m.title && m.active !== false && m.status !== "inactive").sort((a, b) => {
    const av = parseInt(String(a.moduleNumber ?? ""), 10);
    const bv = parseInt(String(b.moduleNumber ?? ""), 10);
    return (Number.isFinite(av) ? av : a.order ?? Number.MAX_SAFE_INTEGER) - (Number.isFinite(bv) ? bv : b.order ?? Number.MAX_SAFE_INTEGER);
  });
}
async function getCompletedModuleKeys(phone) {
  const snap = await getFirestore().collection("videoDeliveries").where("phone", "==", normalizePhone(phone)).get();
  return new Set(snap.docs.filter((d) => d.data().status === "completed").map((d) => String(d.data().moduleNumber ?? d.data().videoTitle)));
}
async function getNextModule(phone) {
  const [modules, completed] = await Promise.all([getActiveModules(), getCompletedModuleKeys(phone)]);
  return modules.find((m) => !completed.has(moduleKey(m))) ?? null;
}
async function getAssessmentForModule(module2) {
  if (!module2) return null;
  const assessments = (await getFirestore().collection("assessments").get()).docs.map((d) => ({
    ...d.data(),
    id: d.id
  }));
  return assessments.find((a) => a.moduleId === module2.id) ?? (module2.moduleNumber ? assessments.find((a) => String(a.moduleNumber ?? "") === String(module2.moduleNumber)) : void 0) ?? null;
}
async function getQuestionsByIds(ids) {
  if (ids.length === 0) return [];
  const snap = await getFirestore().collection("questions").get();
  const byId = new Map(snap.docs.map((d) => [d.id, {
    ...d.data(),
    id: d.id
  }]));
  return ids.map((id) => byId.get(id)).filter((q) => !!q);
}
function questionOptions(question) {
  if (Array.isArray(question.options) && question.options.length > 0) return question.options.map(String);
  if (question.type === "truefalse" || question.type === "true_false") return ["True", "False"];
  return [];
}
function evaluateQuestions(questions, answers, passingPercentage = 40) {
  let totalMarks = 0;
  let marksObtained = 0;
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  let pendingManual = false;
  for (const q of questions) {
    const marks = Number(q.marks) || 1;
    totalMarks += marks;
    const raw = (answers[q.id] ?? "").trim();
    if (!raw) {
      unanswered++;
      continue;
    }
    const options2 = questionOptions(q);
    const given = raw.startsWith("opt_") ? options2[Number(raw.slice(4))] ?? "" : raw;
    if (q.correctAnswer === void 0 || q.correctAnswer === null || q.correctAnswer === "") {
      pendingManual = true;
      continue;
    }
    const expected = typeof q.correctAnswer === "number" ? options2[q.correctAnswer] ?? "" : String(q.correctAnswer);
    if (q.keywords?.length ? q.keywords.some((k) => given.toLowerCase().includes(String(k).toLowerCase())) : given.trim().toLowerCase() === expected.trim().toLowerCase()) {
      marksObtained += marks;
      correct++;
    } else incorrect++;
  }
  const percentage = totalMarks > 0 ? Math.round(marksObtained / totalMarks * 1e4) / 100 : 0;
  return {
    totalQuestions: questions.length,
    totalMarks,
    marksObtained,
    correct,
    incorrect,
    unanswered,
    percentage,
    pendingManual,
    result: pendingManual ? "PENDING" : percentage >= passingPercentage ? "PASS" : "FAIL"
  };
}
async function resetEmployeeProgress(phone, employeeId) {
  const db = getFirestore();
  const normalized = normalizePhone(phone);
  const [deliveries, reminders, submissions, scorecards, certificates] = await Promise.all([
    db.collection("videoDeliveries").where("phone", "==", normalized).get(),
    db.collection("scheduledReminders").where("phone", "==", normalized).get(),
    employeeId ? db.collection("assessmentSubmissions").where("employeeId", "==", employeeId).get() : null,
    employeeId ? db.collection("scorecards").where("employeeId", "==", employeeId).get() : null,
    employeeId ? db.collection("certificates").where("employeeId", "==", employeeId).get() : null
  ]);
  const batch = db.batch();
  for (const d of deliveries.docs) batch.delete(d.ref);
  for (const d of reminders.docs) batch.delete(d.ref);
  for (const d of submissions?.docs ?? []) batch.delete(d.ref);
  for (const d of scorecards?.docs ?? []) batch.delete(d.ref);
  for (const d of certificates?.docs ?? []) batch.delete(d.ref);
  await batch.commit();
}
async function saveAssessmentResult(input) {
  const db = getFirestore();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const result = input.evaluation.result;
  const status = result === "PENDING" ? "Pending Evaluation" : result;
  const submissionRef = await db.collection("assessmentSubmissions").add({
    employeeId: input.employee.employeeId,
    employeeName: input.employee.name,
    assessmentId: input.assessmentId,
    assessmentTitle: input.assessmentTitle,
    moduleNumber: input.moduleNumber ?? "",
    answers: input.answers,
    totalQuestions: input.evaluation.totalQuestions,
    correctAnswers: input.evaluation.correct,
    incorrectAnswers: input.evaluation.incorrect,
    unanswered: input.evaluation.unanswered,
    totalMarks: input.evaluation.totalMarks,
    marksObtained: input.evaluation.marksObtained,
    percentage: input.evaluation.percentage,
    result,
    status,
    submittedAt: now
  });
  await db.collection("scorecards").add({
    employeeName: input.employee.name,
    employeeId: input.employee.employeeId,
    moduleNumber: input.moduleNumber ?? "",
    videoTitle: input.videoTitle,
    assessmentTitle: input.assessmentTitle,
    totalQuestions: input.evaluation.totalQuestions,
    correctAnswers: input.evaluation.correct,
    incorrectAnswers: input.evaluation.incorrect,
    unanswered: input.evaluation.unanswered,
    totalMarks: input.evaluation.totalMarks,
    marksObtained: input.evaluation.marksObtained,
    percentage: input.evaluation.percentage,
    result,
    status,
    score: input.evaluation.marksObtained,
    total: input.evaluation.totalMarks,
    completionDate: now,
    timeTakenSeconds: input.timeTakenSeconds,
    submissionId: submissionRef.id,
    createdAt: now
  });
  return {
    submissionId: submissionRef.id,
    result
  };
}
var DEFAULT_EMPLOYEE_ID_PATTERN;
var init_learning_service = __esm({
  ".svelte-kit/output/server/chunks/learning-service.js"() {
    "use strict";
    init_firebase_admin();
    init_phone();
    DEFAULT_EMPLOYEE_ID_PATTERN = "^[A-Za-z0-9._-]{3,30}$";
    __name(getRegistrationConfig, "getRegistrationConfig");
    __name(getCities, "getCities");
    __name(moduleKey, "moduleKey");
    __name(getActiveModules, "getActiveModules");
    __name(getCompletedModuleKeys, "getCompletedModuleKeys");
    __name(getNextModule, "getNextModule");
    __name(getAssessmentForModule, "getAssessmentForModule");
    __name(getQuestionsByIds, "getQuestionsByIds");
    __name(questionOptions, "questionOptions");
    __name(evaluateQuestions, "evaluateQuestions");
    __name(resetEmployeeProgress, "resetEmployeeProgress");
    __name(saveAssessmentResult, "saveAssessmentResult");
  }
});

// .svelte-kit/output/server/chunks/message-sender.js
function sleep(ms) {
  return new Promise((resolve2) => setTimeout(resolve2, ms));
}
function getWhatsAppConfig() {
  const whatsappToken = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.PHONE_NUMBER_ID;
  if (!whatsappToken) throw new Error("WHATSAPP_TOKEN environment variable is required");
  if (!phoneNumberId) throw new Error("PHONE_NUMBER_ID environment variable is required");
  return {
    url: `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
    token: whatsappToken
  };
}
async function sendWhatsAppRequest(payload2) {
  const { url: url2, token } = getWhatsAppConfig();
  const body = JSON.stringify(payload2);
  let lastError = /* @__PURE__ */ new Error("Unknown error");
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    if (attempt > 0) await sleep(BASE_DELAY_MS * Math.pow(2, attempt - 1));
    try {
      const response = await fetch(url2, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body
      });
      if (response.ok) return;
      const errorBody = await response.text();
      console.error(`WhatsApp API error (attempt ${attempt + 1}):`, errorBody);
      if (response.status >= 400 && response.status < 500) throw new Error(`WhatsApp API returned status ${response.status}: ${errorBody}`);
      lastError = /* @__PURE__ */ new Error(`WhatsApp API returned status ${response.status}`);
    } catch (err) {
      if (err instanceof Error && /status 4\d\d/.test(err.message)) throw err;
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }
  throw lastError;
}
async function sendMessage(to, text2) {
  await sendWhatsAppRequest({
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: text2 }
  });
}
async function sendDocument(to, documentUrl, filename, caption) {
  await sendWhatsAppRequest({
    messaging_product: "whatsapp",
    to,
    type: "document",
    document: {
      link: documentUrl,
      filename,
      ...caption && { caption }
    }
  });
}
async function sendInteractiveButtons(to, body, buttons) {
  await sendWhatsAppRequest({
    messaging_product: "whatsapp",
    to,
    type: "interactive",
    interactive: {
      type: "button",
      body: { text: body },
      action: { buttons: buttons.map((b) => ({
        type: "reply",
        reply: {
          id: b.id,
          title: b.title
        }
      })) }
    }
  });
}
async function sendInteractiveList(to, body, buttonText, sections) {
  await sendWhatsAppRequest({
    messaging_product: "whatsapp",
    to,
    type: "interactive",
    interactive: {
      type: "list",
      body: { text: body },
      action: {
        button: buttonText,
        sections
      }
    }
  });
}
var MAX_RETRIES, BASE_DELAY_MS;
var init_message_sender = __esm({
  ".svelte-kit/output/server/chunks/message-sender.js"() {
    "use strict";
    MAX_RETRIES = 3;
    BASE_DELAY_MS = 500;
    __name(sleep, "sleep");
    __name(getWhatsAppConfig, "getWhatsAppConfig");
    __name(sendWhatsAppRequest, "sendWhatsAppRequest");
    __name(sendMessage, "sendMessage");
    __name(sendDocument, "sendDocument");
    __name(sendInteractiveButtons, "sendInteractiveButtons");
    __name(sendInteractiveList, "sendInteractiveList");
  }
});

// .svelte-kit/output/server/chunks/certificate-service.js
function ascii(value) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\x20-\x7E]/g, "?");
}
function escapeText(value) {
  return ascii(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}
function textWidth(value, size, bold2) {
  return ascii(value).length * size * (bold2 ? 0.56 : 0.5);
}
function centredLine(text2, size, y, bold2, rgb = "0.1 0.12 0.2") {
  const x = Math.round((PAGE_W - textWidth(text2, size, bold2)) / 2);
  return `${rgb} rg BT /${bold2 ? "F2" : "F1"} ${size} Tf ${x} ${y} Td (${escapeText(text2)}) Tj ET`;
}
function issueDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return ascii(iso);
  return new Date(d.getTime() + 198e5).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });
}
function buildContent(input) {
  const org = input.orgName || "Edventure";
  return [
    "q",
    "1 1 1 rg 0 0 842 595 re f",
    `${ACCENT} RG 3 w 24 24 794 547 re S`,
    `${ACCENT} RG 1 w 46 46 750 503 re S`,
    `${ACCENT} rg 46 46 750 8 re f`,
    "Q",
    centredLine("CERTIFICATE OF COMPLETION", 30, 452, true, ACCENT),
    centredLine("This is to certify that", 14, 396, false),
    centredLine(input.employeeName, 36, 342, true),
    centredLine("has successfully completed the", 13, 302, false),
    centredLine(input.course, 20, 268, true),
    centredLine("completing every learning video and passing all assessments", 11, 238, false, "0.35 0.38 0.45"),
    `${ACCENT} RG 1 w 250 205 m 592 205 l S`,
    centredLine(`Date of Issue: ${issueDate(input.issuedAt)}`, 12, 176, false, "0.35 0.38 0.45"),
    centredLine(`Certificate ID: ${input.certificateNumber}`, 12, 158, false, "0.35 0.38 0.45"),
    centredLine(org, 14, 100, true, ACCENT)
  ].join("\n");
}
function buildCertificatePdf(input) {
  const content = buildContent(input);
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    `<< /Length ${content.length} >>
stream
${content}
endstream`
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((object, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj
${object}
endobj
`;
  });
  const xrefStart = pdf.length;
  pdf += `xref
0 ${objects.length + 1}
0000000000 65535 f 
`;
  for (const offset of offsets) pdf += `${String(offset).padStart(10, "0")} 00000 n 
`;
  pdf += `trailer
<< /Size ${objects.length + 1} /Root 1 0 R >>
startxref
${xrefStart}
%%EOF
`;
  return new TextEncoder().encode(pdf);
}
async function getCertificateDelayMinutes() {
  try {
    const doc = await getFirestore().collection("settings").doc("app").get();
    const raw = doc.exists ? doc.data().certificateDelayMinutes : void 0;
    const value = Number(raw);
    if (!Number.isFinite(value)) return 0;
    return Math.min(MAX_DELAY_MINUTES, Math.max(0, Math.round(value)));
  } catch (error2) {
    console.error("[certificates] delay setting read failed, sending immediately:", error2);
    return 0;
  }
}
async function evaluate(employeeId, phone) {
  const db = getFirestore();
  const normalized = normalizePhone(phone);
  const [modules, assessmentsSnap, deliveriesSnap, cardsSnap] = await Promise.all([
    getActiveModules(),
    db.collection("assessments").get(),
    db.collection("videoDeliveries").where("phone", "==", normalized).get(),
    db.collection("scorecards").where("employeeId", "==", employeeId).get()
  ]);
  const assessments = assessmentsSnap.docs.map((d) => ({
    ...d.data(),
    id: d.id
  }));
  const completed = new Set(deliveriesSnap.docs.filter((d) => d.data().status === "completed").map((d) => String(d.data().moduleNumber ?? d.data().videoTitle)));
  const passedVideos = new Set(cardsSnap.docs.filter((d) => d.data().result === "PASS").map((d) => String(d.data().videoTitle ?? "")));
  const missing = [];
  for (const m of modules) {
    if (!completed.has(moduleKey(m))) {
      missing.push(`${m.title}: video not completed`);
      continue;
    }
    const assessment = assessments.find((a) => a.moduleId === m.id) ?? (m.moduleNumber ? assessments.find((a) => String(a.moduleNumber ?? "") === String(m.moduleNumber)) : void 0);
    if (assessment && !passedVideos.has(m.title)) missing.push(`${m.title}: ${assessment.title} not passed`);
  }
  return missing;
}
async function issueCertificateIfComplete(phone, employee) {
  const db = getFirestore();
  const employeeId = employee.employeeId;
  if (!employeeId) return null;
  const existing = await db.collection("certificates").where("employeeId", "==", employeeId).limit(1).get();
  if (!existing.empty) {
    const doc = existing.docs[0];
    return {
      certificate: {
        ...doc.data(),
        id: doc.id
      },
      created: false
    };
  }
  if ((await evaluate(employeeId, phone)).length > 0) return null;
  const certificate = {
    certificateNumber: `EDV-${employeeId}`,
    employeeId,
    employeeName: employee.name,
    phone: normalizePhone(phone),
    course: COURSE,
    issuedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  const ref = await db.collection("certificates").add(certificate);
  const issued = {
    ...certificate,
    id: ref.id
  };
  await scheduleCertificateDelivery(issued);
  return {
    certificate: issued,
    created: true
  };
}
async function scheduleCertificateDelivery(certificate) {
  if (!certificate.id || !certificate.phone) return;
  try {
    const db = getFirestore();
    const delay = await getCertificateDelayMinutes();
    const scheduledFor = new Date(Date.now() + delay * 6e4).toISOString();
    await db.collection("certificates").doc(certificate.id).update({
      deliveryStatus: "scheduled",
      scheduledFor
    });
    const queued = {
      ...certificate,
      deliveryStatus: "scheduled",
      scheduledFor
    };
    if (delay === 0) await deliverCertificate(queued);
  } catch (error2) {
    console.error("[certificates] scheduling failed:", error2);
  }
}
async function deliverCertificate(certificate) {
  if (!certificate.id || !certificate.phone) return false;
  const db = getFirestore();
  try {
    const pdf = buildCertificatePdf({
      employeeName: certificate.employeeName,
      course: certificate.course,
      certificateNumber: certificate.certificateNumber,
      issuedAt: certificate.issuedAt
    });
    const path2 = `certificates/${certificate.certificateNumber}.pdf`;
    const file = getStorage().bucket().file(path2);
    await file.save(pdf, { contentType: "application/pdf" });
    const [url2] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 828e5
    });
    await sendDocument(certificate.phone, url2, `${certificate.certificateNumber}.pdf`, `Congratulations ${certificate.employeeName}! Your Edventure certificate is attached.`);
    await db.collection("certificates").doc(certificate.id).update({
      deliveryStatus: "sent",
      sentAt: (/* @__PURE__ */ new Date()).toISOString(),
      pdfPath: path2
    });
    return true;
  } catch (error2) {
    console.error("[certificates] delivery failed:", error2);
    try {
      await db.collection("certificates").doc(certificate.id).update({
        deliveryStatus: "failed",
        error: error2 instanceof Error ? error2.message : String(error2)
      });
    } catch {
    }
    return false;
  }
}
async function processDueCertificates() {
  const db = getFirestore();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const snap = await db.collection("certificates").where("deliveryStatus", "==", "scheduled").get();
  let sent = 0;
  let failed = 0;
  for (const doc of snap.docs) {
    const certificate = {
      ...doc.data(),
      id: doc.id
    };
    if ((certificate.scheduledFor ?? "") > now) continue;
    if (await deliverCertificate(certificate)) sent++;
    else failed++;
  }
  return {
    sent,
    failed
  };
}
async function generateMissingCertificates() {
  const usersSnap = await getFirestore().collection("users").get();
  let created = 0;
  let skipped = 0;
  for (const doc of usersSnap.docs) {
    const user = doc.data();
    const employeeId = String(user.employeeId ?? "");
    const phone = user.phones?.[0] ?? user.phone ?? "";
    if (!employeeId || !phone || !user.name) {
      skipped++;
      continue;
    }
    try {
      if ((await issueCertificateIfComplete(phone, {
        employeeId,
        name: String(user.name),
        city: String(user.city ?? ""),
        zone: String(user.zone ?? ""),
        managerName: String(user.managerName ?? "")
      }))?.created) created++;
      else skipped++;
    } catch (error2) {
      console.error("[certificates] issue failed for", employeeId, error2);
      skipped++;
    }
  }
  return {
    created,
    skipped
  };
}
var PAGE_W, PAGE_H, ACCENT, COURSE, MAX_DELAY_MINUTES;
var init_certificate_service = __esm({
  ".svelte-kit/output/server/chunks/certificate-service.js"() {
    "use strict";
    init_firebase_admin();
    init_learning_service();
    init_message_sender();
    init_phone();
    PAGE_W = 842;
    PAGE_H = 595;
    ACCENT = "0.11 0.31 0.85";
    __name(ascii, "ascii");
    __name(escapeText, "escapeText");
    __name(textWidth, "textWidth");
    __name(centredLine, "centredLine");
    __name(issueDate, "issueDate");
    __name(buildContent, "buildContent");
    __name(buildCertificatePdf, "buildCertificatePdf");
    COURSE = "Edventure Learning Program";
    MAX_DELAY_MINUTES = 1440;
    __name(getCertificateDelayMinutes, "getCertificateDelayMinutes");
    __name(evaluate, "evaluate");
    __name(issueCertificateIfComplete, "issueCertificateIfComplete");
    __name(scheduleCertificateDelivery, "scheduleCertificateDelivery");
    __name(deliverCertificate, "deliverCertificate");
    __name(processDueCertificates, "processDueCertificates");
    __name(generateMissingCertificates, "generateMissingCertificates");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/certificates/generate/_server.ts.js
var server_ts_exports2 = {};
__export(server_ts_exports2, {
  POST: () => POST2
});
var POST2;
var init_server_ts2 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/certificates/generate/_server.ts.js"() {
    "use strict";
    init_certificate_service();
    init_auth_middleware();
    init_exports();
    POST2 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const result = await generateMissingCertificates();
        return json(result);
      } catch (error2) {
        console.error("Certificate generation failed:", error2);
        return json({ error: "Failed to generate certificates" }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/certificates/_id_/send/_server.ts.js
var server_ts_exports3 = {};
__export(server_ts_exports3, {
  POST: () => POST3
});
var POST3;
var init_server_ts3 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/certificates/_id_/send/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_certificate_service();
    init_auth_middleware();
    init_exports();
    POST3 = /* @__PURE__ */ __name(async ({ request, params }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const db = getFirestore();
        const snap = await db.collection("certificates").doc(params.id).get();
        if (!snap.exists) return json({ error: "Certificate not found" }, { status: 404 });
        const certificate = {
          ...snap.data(),
          id: snap.id
        };
        let phone = certificate.phone;
        if (!phone && certificate.employeeId) {
          const users = await db.collection("users").where("employeeId", "==", certificate.employeeId).limit(1).get();
          const user = users.empty ? null : users.docs[0].data();
          phone = user?.phones?.[0] ?? user?.phone ?? "";
        }
        if (!phone) return json({ error: "No WhatsApp number on file for this employee \u2014 ask them to register first" }, { status: 400 });
        if (!await deliverCertificate({
          ...certificate,
          phone: String(phone)
        })) return json({ error: "WhatsApp delivery failed \u2014 check the server logs" }, { status: 502 });
        return json({ ok: true });
      } catch (error2) {
        console.error("Certificate send failed:", error2);
        return json({ error: "Failed to send certificate" }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/clients/_server.ts.js
var server_ts_exports4 = {};
__export(server_ts_exports4, {
  GET: () => GET2,
  POST: () => POST4
});
var GET2, POST4;
var init_server_ts4 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/clients/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_phone();
    init_auth_middleware();
    init_exports();
    GET2 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const clients = (await getFirestore().collection("users").get()).docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        return json(clients);
      } catch (error2) {
        console.error("Error fetching clients:", error2);
        return json({ error: "Failed to fetch clients" }, { status: 500 });
      }
    }, "GET");
    POST4 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const db = getFirestore();
        const { name, phones, gstNumber } = await request.json();
        if (!name || !phones || !Array.isArray(phones) || phones.length === 0) return json({ error: "Name and at least one phone number are required" }, { status: 400 });
        if (gstNumber) {
          if (gstNumber.length !== 15 || !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstNumber)) return json({ error: "Invalid GST number format" }, { status: 400 });
          if (!(await db.collection("users").where("gstNumber", "==", gstNumber).limit(1).get()).empty) return json({ error: "GST number already exists for another client" }, { status: 400 });
        }
        const normalizedPhones = phones.map((p) => normalizePhone(p));
        const docData = {
          name,
          phones: normalizedPhones,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        if (gstNumber) docData.gstNumber = gstNumber;
        const docRef = await db.collection("users").add(docData);
        return json({
          id: docRef.id,
          name,
          phones: normalizedPhones,
          gstNumber
        }, { status: 201 });
      } catch (error2) {
        console.error("Error creating client:", error2);
        return json({ error: "Failed to create client" }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/chunks/storage-service.js
async function generateSignedUrl(filePath) {
  const [url2] = await getStorage().bucket().file(filePath).getSignedUrl({
    action: "read",
    expires: Date.now() + 36e5
  });
  return url2;
}
async function deleteFile(filePath) {
  await getStorage().bucket().file(filePath).delete();
}
var init_storage_service = __esm({
  ".svelte-kit/output/server/chunks/storage-service.js"() {
    "use strict";
    init_firebase_admin();
    __name(generateSignedUrl, "generateSignedUrl");
    __name(deleteFile, "deleteFile");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/clients/_id_/_server.ts.js
var server_ts_exports5 = {};
__export(server_ts_exports5, {
  DELETE: () => DELETE,
  PUT: () => PUT
});
var PUT, DELETE;
var init_server_ts5 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/clients/_id_/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_storage_service();
    init_phone();
    init_auth_middleware();
    init_exports();
    PUT = /* @__PURE__ */ __name(async ({ request, params }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const db = getFirestore();
        const { name, phones, gstNumber } = await request.json();
        if (!name || !phones || !Array.isArray(phones) || phones.length === 0) return json({ error: "Name and at least one phone number are required" }, { status: 400 });
        if (gstNumber) {
          if (gstNumber.length !== 15 || !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstNumber)) return json({ error: "Invalid GST number format" }, { status: 400 });
          if ((await db.collection("users").where("gstNumber", "==", gstNumber).limit(2).get()).docs.filter((doc) => doc.id !== params.id).length > 0) return json({ error: "GST number already exists for another client" }, { status: 400 });
        }
        const normalizedPhones = phones.map((p) => normalizePhone(p));
        const updateData2 = {
          name,
          phones: normalizedPhones
        };
        if (gstNumber) updateData2.gstNumber = gstNumber;
        await db.collection("users").doc(params.id).update(updateData2);
        return json({
          id: params.id,
          name,
          phones: normalizedPhones,
          gstNumber
        });
      } catch (error2) {
        console.error("Error updating client:", error2);
        return json({ error: "Failed to update client" }, { status: 500 });
      }
    }, "PUT");
    DELETE = /* @__PURE__ */ __name(async ({ request, params }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const db = getFirestore();
        if (!(await db.collection("users").doc(params.id).get()).exists) return json({ error: "Client not found" }, { status: 404 });
        const docsSnapshot = await db.collection("documents").where("clientId", "==", params.id).get();
        for (const doc of docsSnapshot.docs) {
          const data = doc.data();
          if (data.filePath) try {
            await deleteFile(data.filePath);
          } catch (error2) {
            console.error(`Error deleting file ${data.filePath}:`, error2);
          }
        }
        const batch = db.batch();
        for (const doc of docsSnapshot.docs) batch.delete(doc.ref);
        batch.delete(db.collection("users").doc(params.id));
        await batch.commit();
        return json({ success: true });
      } catch (error2) {
        console.error("Error deleting client:", error2);
        return json({ error: "Failed to delete client" }, { status: 500 });
      }
    }, "DELETE");
  }
});

// .svelte-kit/output/server/chunks/document-categories.js
var document_categories_exports = {};
__export(document_categories_exports, {
  n: () => document_categories_exports2,
  t: () => CATEGORIES
});
var document_categories_exports2, ALL_FISCAL_YEARS, CATEGORIES;
var init_document_categories = __esm({
  ".svelte-kit/output/server/chunks/document-categories.js"() {
    "use strict";
    init_rolldown_runtime();
    document_categories_exports2 = /* @__PURE__ */ __exportAll({ CATEGORIES: /* @__PURE__ */ __name(() => CATEGORIES, "CATEGORIES") });
    ALL_FISCAL_YEARS = [
      "FY 2021-22",
      "FY 2022-23",
      "FY 2023-24",
      "FY 2024-25",
      "FY 2025-26",
      "FY 2026-27",
      "FY 2027-28",
      "FY 2028-29",
      "FY 2029-30"
    ];
    CATEGORIES = {
      "Audit Report": {
        fiscalYears: [...ALL_FISCAL_YEARS],
        subCategories: []
      },
      "Financial Statements": {
        fiscalYears: [...ALL_FISCAL_YEARS],
        subCategories: []
      },
      "GST Related Documents": {
        fiscalYears: [...ALL_FISCAL_YEARS],
        subCategories: ["GSTR-1", "GSTR-3B"]
      },
      "Income Tax Documents": {
        fiscalYears: [...ALL_FISCAL_YEARS],
        subCategories: [
          "ITR",
          "Acknowledgement",
          "Computation"
        ]
      },
      "Incorporation & Other Documents": {
        fiscalYears: [],
        subCategories: []
      },
      "TDS reports": {
        fiscalYears: [...ALL_FISCAL_YEARS],
        subCategories: []
      },
      "GST user ID and PDF": {
        fiscalYears: [],
        subCategories: []
      }
    };
    Object.keys(CATEGORIES);
  }
});

// .svelte-kit/output/server/chunks/document-service.js
function parseWebhookPayload(body) {
  try {
    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message) return null;
    const messageId = message.id;
    if (message.type === "text") return {
      from: message.from,
      messageId,
      text: message.text.body
    };
    if (message.type === "interactive") {
      const interactive = message.interactive;
      if (interactive?.type === "button_reply") return {
        from: message.from,
        messageId,
        text: interactive.button_reply.title,
        interactiveReplyId: interactive.button_reply.id
      };
      if (interactive?.type === "list_reply") return {
        from: message.from,
        messageId,
        text: interactive.list_reply.title,
        interactiveReplyId: interactive.list_reply.id
      };
    }
    return null;
  } catch {
    return null;
  }
}
function sanitizeMessageBody(text2) {
  return text2.trim();
}
async function findAllUsersByPhone(phone) {
  const normalizedPhone = normalizePhone(phone);
  const db = getFirestore();
  let snapshot = await db.collection("users").where("phones", "array-contains", normalizedPhone).get();
  if (snapshot.empty) snapshot = await db.collection("users").where("phone", "==", normalizedPhone).get();
  if (snapshot.empty) return [];
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      phones: data.phones || (data.phone ? [data.phone] : []),
      name: data.name,
      gstNumber: data.gstNumber,
      employeeId: data.employeeId,
      city: data.city,
      zone: data.zone,
      managerName: data.managerName,
      consentStatus: data.consentStatus,
      consentAt: data.consentAt,
      consentVersion: data.consentVersion
    };
  });
}
async function saveUserProfile(phone, clientId, profile) {
  const db = getFirestore();
  const normalizedPhone = normalizePhone(phone);
  let id;
  if (clientId) {
    await db.collection("users").doc(clientId).update(profile);
    id = clientId;
  } else id = (await db.collection("users").add({
    phones: [normalizedPhone],
    ...profile
  })).id;
  userCache.delete(normalizedPhone);
  return id;
}
async function resetUserProfile(phone) {
  const db = getFirestore();
  const normalizedPhone = normalizePhone(phone);
  const users = await findAllUsersByPhone(normalizedPhone);
  const cleared = {
    employeeId: null,
    name: null,
    city: null,
    zone: null,
    managerName: null,
    consentStatus: null,
    consentAt: null,
    consentVersion: null
  };
  for (const user of users) await db.collection("users").doc(user.id).update(cleared);
  userCache.delete(normalizedPhone);
}
async function saveBotSession(phone, session) {
  await getFirestore().collection("sessions").doc(phone).set(session);
}
async function clearBotSession(phone) {
  await getFirestore().collection("sessions").doc(normalizePhone(phone)).delete();
}
async function getBotSession(phone) {
  const doc = await getFirestore().collection("sessions").doc(phone).get();
  if (!doc.exists) return null;
  const data = doc.data();
  if (new Date(data.expiresAt) < /* @__PURE__ */ new Date()) {
    await doc.ref.delete();
    return null;
  }
  return data;
}
async function getCategories() {
  const now = Date.now();
  if (categoriesCache.data && now - categoriesCache.timestamp < CATEGORIES_TTL_MS) {
    console.log("[getCategories] Returning CACHED categories (age:", Math.floor((now - categoriesCache.timestamp) / 1e3), "seconds)");
    return categoriesCache.data;
  }
  if (categoriesCache.loading) {
    console.log("[getCategories] Waiting for in-flight request");
    return categoriesCache.loading;
  }
  console.log("[getCategories] Cache miss or expired, fetching from Firestore");
  categoriesCache.loading = fetchCategoriesFromFirestore();
  try {
    const result = await categoriesCache.loading;
    categoriesCache.data = result;
    categoriesCache.timestamp = now;
    console.log("[getCategories] Cache updated with", Object.keys(result).length, "categories");
    return result;
  } finally {
    categoriesCache.loading = null;
  }
}
async function fetchCategoriesFromFirestore() {
  try {
    const db = getFirestore();
    console.log("[fetchCategoriesFromFirestore] Reading config/categories...");
    const doc = await db.collection("config").doc("categories").get();
    console.log("[fetchCategoriesFromFirestore] Doc exists:", doc.exists);
    if (doc.exists) {
      const data = doc.data();
      const categoryKeys = data?.categories ? Object.keys(data.categories) : [];
      console.log("[fetchCategoriesFromFirestore] Category keys:", categoryKeys);
      if (data?.categories && categoryKeys.length > 0) {
        console.log("[fetchCategoriesFromFirestore] Returning", categoryKeys.length, "categories from Firestore");
        return data.categories;
      } else console.warn("[fetchCategoriesFromFirestore] Doc exists but categories empty");
    } else console.warn("[fetchCategoriesFromFirestore] Doc does NOT exist");
  } catch (error2) {
    console.error("[fetchCategoriesFromFirestore] ERROR:", error2 instanceof Error ? error2.message : error2);
    console.error("[fetchCategoriesFromFirestore] Stack:", error2 instanceof Error ? error2.stack : "N/A");
  }
  const { CATEGORIES: CATEGORIES2 } = await Promise.resolve().then(() => (init_document_categories(), document_categories_exports)).then((n) => n.n);
  console.log("[fetchCategoriesFromFirestore] Using FALLBACK static CATEGORIES with", Object.keys(CATEGORIES2).length, "categories");
  return CATEGORIES2;
}
var categoriesCache, CATEGORIES_TTL_MS, userCache;
var init_document_service = __esm({
  ".svelte-kit/output/server/chunks/document-service.js"() {
    "use strict";
    init_firebase_admin();
    init_phone();
    categoriesCache = {
      data: null,
      timestamp: 0,
      loading: null
    };
    CATEGORIES_TTL_MS = 18e5;
    userCache = /* @__PURE__ */ new Map();
    __name(parseWebhookPayload, "parseWebhookPayload");
    __name(sanitizeMessageBody, "sanitizeMessageBody");
    __name(findAllUsersByPhone, "findAllUsersByPhone");
    __name(saveUserProfile, "saveUserProfile");
    __name(resetUserProfile, "resetUserProfile");
    __name(saveBotSession, "saveBotSession");
    __name(clearBotSession, "clearBotSession");
    __name(getBotSession, "getBotSession");
    __name(getCategories, "getCategories");
    __name(fetchCategoriesFromFirestore, "fetchCategoriesFromFirestore");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/clients/_id_/documents/_server.ts.js
var server_ts_exports6 = {};
__export(server_ts_exports6, {
  GET: () => GET3,
  POST: () => POST5
});
var GET3, POST5;
var init_server_ts6 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/clients/_id_/documents/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_auth_middleware();
    init_document_service();
    init_exports();
    GET3 = /* @__PURE__ */ __name(async ({ request, params }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const db = getFirestore();
        if (!(await db.collection("users").doc(params.id).get()).exists) return json({ error: "Client not found" }, { status: 404 });
        const snapshot = await db.collection("documents").where("clientId", "==", params.id).orderBy("uploadedAt", "desc").get();
        return json(snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })));
      } catch (error2) {
        console.error("Error fetching documents:", error2);
        return json({ error: "Failed to fetch documents" }, { status: 500 });
      }
    }, "GET");
    POST5 = /* @__PURE__ */ __name(async ({ request, params }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const db = getFirestore();
        const clientDoc = await db.collection("users").doc(params.id).get();
        if (!clientDoc.exists) return json({ error: "Client not found" }, { status: 404 });
        const phones = clientDoc.data()?.phones;
        if (!phones || !Array.isArray(phones) || phones.length === 0) return json({ error: "Client has no phone numbers associated" }, { status: 400 });
        const phone = phones[0];
        const { title, filePath, category, fiscalYear, subCategory } = await request.json();
        if (!title || !filePath) return json({ error: "Title and filePath are required" }, { status: 400 });
        const categories = await getCategories();
        if (!category || !categories[category]) return json({ error: "Valid category is required" }, { status: 400 });
        const catConfig = categories[category];
        if (catConfig.fiscalYears.length > 0 && !fiscalYear) return json({ error: "Fiscal year is required for this category" }, { status: 400 });
        if (catConfig.subCategories.length > 0 && !subCategory) return json({ error: "Sub-category is required for this category" }, { status: 400 });
        const uploadedAt = (/* @__PURE__ */ new Date()).toISOString();
        const payload2 = {
          clientId: params.id,
          phone,
          title,
          filePath,
          category,
          fiscalYear: fiscalYear ?? null,
          subCategory: subCategory ?? null,
          uploadedAt
        };
        const docRef = await db.collection("documents").add(payload2);
        return json({
          id: docRef.id,
          ...payload2
        }, { status: 201 });
      } catch (error2) {
        console.error("Error creating document:", error2);
        return json({ error: "Failed to create document" }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/clients/_id_/documents/_docId_/_server.ts.js
var server_ts_exports7 = {};
__export(server_ts_exports7, {
  DELETE: () => DELETE2,
  PUT: () => PUT2
});
var PUT2, DELETE2;
var init_server_ts7 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/clients/_id_/documents/_docId_/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_storage_service();
    init_auth_middleware();
    init_document_categories();
    init_exports();
    PUT2 = /* @__PURE__ */ __name(async ({ request, params }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const db = getFirestore();
        const docRef = db.collection("documents").doc(params.docId);
        const docSnap = await docRef.get();
        if (!docSnap.exists) return json({ error: "Document not found" }, { status: 404 });
        const document2 = docSnap.data();
        const phone = document2?.phone;
        const body = await request.json();
        const title = body.title;
        const newFilePath = body.filePath;
        const category = body.category !== void 0 ? body.category || null : document2?.category ?? null;
        const fiscalYear = body.fiscalYear !== void 0 ? body.fiscalYear || null : document2?.fiscalYear ?? null;
        const subCategory = body.subCategory !== void 0 ? body.subCategory || null : document2?.subCategory ?? null;
        if (!title) return json({ error: "Title is required" }, { status: 400 });
        let validCategories = CATEGORIES;
        try {
          const categoriesDoc = await db.collection("config").doc("categories").get();
          if (categoriesDoc.exists && categoriesDoc.data()?.categories) validCategories = categoriesDoc.data().categories;
        } catch (error2) {
          console.warn("Could not load categories from database, using defaults:", error2);
        }
        if (category && !validCategories[category]) return json({ error: `Invalid category: ${category}. Valid categories are: ${Object.keys(validCategories).join(", ")}` }, { status: 400 });
        let filePath = document2?.filePath;
        if (newFilePath && newFilePath !== filePath) {
          if (document2?.filePath) try {
            await deleteFile(document2.filePath);
          } catch (error2) {
            console.error("Error deleting old file:", error2);
          }
          filePath = newFilePath;
        }
        await docRef.update({
          title,
          filePath,
          category: category ?? null,
          fiscalYear: fiscalYear ?? null,
          subCategory: subCategory ?? null
        });
        return json({
          id: params.docId,
          phone,
          title,
          filePath,
          category: category ?? null,
          fiscalYear: fiscalYear ?? null,
          subCategory: subCategory ?? null,
          uploadedAt: document2?.uploadedAt
        });
      } catch (error2) {
        console.error("Error updating document:", error2);
        const errorMessage = error2 instanceof Error ? error2.message : "Failed to update document";
        return json({
          error: "Failed to update document",
          details: errorMessage
        }, { status: 500 });
      }
    }, "PUT");
    DELETE2 = /* @__PURE__ */ __name(async ({ request, params }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const docRef = getFirestore().collection("documents").doc(params.docId);
        const docSnap = await docRef.get();
        if (!docSnap.exists) return json({ error: "Document not found" }, { status: 404 });
        const document2 = docSnap.data();
        if (document2?.filePath) try {
          await deleteFile(document2.filePath);
        } catch (error2) {
          console.error("Error deleting file:", error2);
          return json({ error: "Failed to delete file from storage" }, { status: 500 });
        }
        await docRef.delete();
        return json({ success: true });
      } catch (error2) {
        console.error("Error deleting document:", error2);
        return json({ error: "Failed to delete document" }, { status: 500 });
      }
    }, "DELETE");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/data/_collection_/_server.ts.js
var server_ts_exports8 = {};
__export(server_ts_exports8, {
  GET: () => GET4,
  POST: () => POST6
});
function allowed(collection) {
  return ALLOWED.has(collection);
}
var ALLOWED, GET4, POST6;
var init_server_ts8 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/data/_collection_/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_auth_middleware();
    init_exports();
    ALLOWED = /* @__PURE__ */ new Set([
      "learningModules",
      "assessments",
      "questions",
      "scorecards",
      "certificates",
      "cities",
      "zones",
      "settings"
    ]);
    __name(allowed, "allowed");
    GET4 = /* @__PURE__ */ __name(async ({ request, params }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      if (!allowed(params.collection)) return json({ error: "Unknown collection" }, { status: 404 });
      try {
        const snap = await getFirestore().collection(params.collection).get();
        return json(snap.docs.map((d) => ({
          id: d.id,
          ...d.data()
        })));
      } catch (error2) {
        console.error("Generic data GET failed:", error2);
        return json({ error: "Failed to load" }, { status: 500 });
      }
    }, "GET");
    POST6 = /* @__PURE__ */ __name(async ({ request, params }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      if (!allowed(params.collection)) return json({ error: "Unknown collection" }, { status: 404 });
      try {
        const { id, ...data } = await request.json() ?? {};
        const db = getFirestore();
        if (id) {
          await db.collection(params.collection).doc(String(id)).set(data);
          return json({
            id,
            ...data
          }, { status: 201 });
        }
        const ref = await db.collection(params.collection).add(data);
        return json({
          id: ref.id,
          ...data
        }, { status: 201 });
      } catch (error2) {
        console.error("Generic data POST failed:", error2);
        return json({ error: "Failed to save" }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/data/_collection_/_id_/_server.ts.js
var server_ts_exports9 = {};
__export(server_ts_exports9, {
  DELETE: () => DELETE3,
  PUT: () => PUT3
});
function allowed2(collection) {
  return ALLOWED2.has(collection);
}
var ALLOWED2, PUT3, DELETE3;
var init_server_ts9 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/data/_collection_/_id_/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_auth_middleware();
    init_exports();
    ALLOWED2 = /* @__PURE__ */ new Set([
      "learningModules",
      "assessments",
      "questions",
      "scorecards",
      "certificates",
      "cities",
      "zones",
      "settings",
      "chatSessions"
    ]);
    __name(allowed2, "allowed");
    PUT3 = /* @__PURE__ */ __name(async ({ request, params }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      if (!allowed2(params.collection)) return json({ error: "Unknown collection" }, { status: 404 });
      try {
        const data = await request.json();
        await getFirestore().collection(params.collection).doc(params.id).update(data ?? {});
        return json({
          id: params.id,
          ...data
        });
      } catch (error2) {
        console.error("Generic data PUT failed:", error2);
        return json({ error: "Failed to update" }, { status: 500 });
      }
    }, "PUT");
    DELETE3 = /* @__PURE__ */ __name(async ({ request, params }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      if (!allowed2(params.collection)) return json({ error: "Unknown collection" }, { status: 404 });
      try {
        await getFirestore().collection(params.collection).doc(params.id).delete();
        return json({ success: true });
      } catch (error2) {
        console.error("Generic data DELETE failed:", error2);
        return json({ error: "Failed to delete" }, { status: 500 });
      }
    }, "DELETE");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/debug-documents/_server.ts.js
var server_ts_exports10 = {};
__export(server_ts_exports10, {
  GET: () => GET5
});
var GET5;
var init_server_ts10 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/debug-documents/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_phone();
    init_auth_middleware();
    init_exports();
    GET5 = /* @__PURE__ */ __name(async ({ request, url: url2 }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      const phone = url2.searchParams.get("phone");
      if (!phone) return json({ error: "Phone parameter required" }, { status: 400 });
      const normalizedPhone = normalizePhone(phone);
      const db = getFirestore();
      try {
        const userSnapshot = await db.collection("users").where("phones", "array-contains", normalizedPhone).limit(1).get();
        const docsSnapshot = await db.collection("documents").where("phone", "==", normalizedPhone).get();
        return json({
          normalizedPhone,
          userExists: !userSnapshot.empty,
          documentCount: docsSnapshot.size,
          sampleDocument: docsSnapshot.docs[0]?.data() || null,
          allDocumentIds: docsSnapshot.docs.map((d) => d.id)
        });
      } catch (error2) {
        return json({ error: error2 instanceof Error ? error2.message : "Unknown error" }, { status: 500 });
      }
    }, "GET");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/debug/_server.ts.js
var server_ts_exports11 = {};
__export(server_ts_exports11, {
  GET: () => GET6
});
var GET6;
var init_server_ts11 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/debug/_server.ts.js"() {
    "use strict";
    init_auth_middleware();
    init_exports();
    GET6 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      const diagnostics = {};
      const envVars = [
        "WHATSAPP_TOKEN",
        "PHONE_NUMBER_ID",
        "WEBHOOK_VERIFY_TOKEN",
        "APP_SECRET",
        "FIREBASE_SERVICE_ACCOUNT_JSON",
        "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
      ];
      diagnostics.envCheck = {};
      for (const key of envVars) {
        const value = process.env[key];
        diagnostics.envCheck[key] = value ? `SET (${value.length} chars)` : "MISSING";
      }
      const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
      if (serviceAccountJson) try {
        const parsed = JSON.parse(serviceAccountJson);
        diagnostics.serviceAccountParsing = "SUCCESS";
        diagnostics.serviceAccountKeys = Object.keys(parsed);
        diagnostics.projectId = parsed.project_id || "MISSING";
        diagnostics.clientEmail = parsed.client_email ? "SET" : "MISSING";
        diagnostics.privateKeyPresent = parsed.private_key ? "SET" : "MISSING";
      } catch (error2) {
        diagnostics.serviceAccountParsing = "FAILED";
        diagnostics.parseError = error2 instanceof Error ? error2.message : String(error2);
      }
      try {
        const { getFirestore: getFirestore2 } = await Promise.resolve().then(() => (init_firebase_admin(), firebase_admin_exports)).then((n) => n.t);
        const db = getFirestore2();
        diagnostics.firestoreInit = "SUCCESS";
        try {
          const snapshot = await db.collection("users").limit(1).get();
          diagnostics.firestoreRead = "SUCCESS";
          diagnostics.sampleDocCount = snapshot.size;
        } catch (readError) {
          diagnostics.firestoreRead = "FAILED";
          diagnostics.readError = readError instanceof Error ? readError.message : String(readError);
        }
      } catch (initError) {
        diagnostics.firestoreInit = "FAILED";
        diagnostics.initError = initError instanceof Error ? initError.message : String(initError);
      }
      return json(diagnostics);
    }, "GET");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/delete-category/_server.ts.js
var server_ts_exports12 = {};
__export(server_ts_exports12, {
  POST: () => POST7
});
var POST7;
var init_server_ts12 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/delete-category/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_auth_middleware();
    init_exports();
    POST7 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const { type, category, fiscalYear, subCategory } = await request.json();
        if (!type || !category) return json({ error: "Missing required fields" }, { status: 400 });
        const categoriesRef = getFirestore().collection("config").doc("categories");
        const categoriesDoc = await categoriesRef.get();
        if (!categoriesDoc.exists) return json({ error: "Categories configuration not found" }, { status: 404 });
        const categories = categoriesDoc.data()?.categories || {};
        if (type === "category") {
          if (categories[category]) delete categories[category];
        } else if (type === "fiscalYear" && fiscalYear) {
          if (categories[category]?.fiscalYears) categories[category].fiscalYears = categories[category].fiscalYears.filter((fy) => fy !== fiscalYear);
        } else if (type === "subCategory" && subCategory) {
          if (categories[category]?.subCategories) categories[category].subCategories = categories[category].subCategories.filter((sc) => sc !== subCategory);
        }
        await categoriesRef.update({ categories });
        return json({
          success: true,
          message: `Deleted ${type} successfully`
        });
      } catch (error2) {
        console.error("Error deleting:", error2);
        return json({ error: "Failed to delete" }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/documents/_id_/download-url/_server.ts.js
var server_ts_exports13 = {};
__export(server_ts_exports13, {
  GET: () => GET7
});
var GET7;
var init_server_ts13 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/documents/_id_/download-url/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_storage_service();
    init_auth_middleware();
    init_exports();
    GET7 = /* @__PURE__ */ __name(async ({ request, params }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const docRef = await getFirestore().collection("documents").doc(params.id).get();
        if (!docRef.exists) return json({ error: "Document not found" }, { status: 404 });
        const filePath = docRef.data()?.filePath;
        if (!filePath) return json({ error: "File path not found" }, { status: 404 });
        return json({ url: await generateSignedUrl(filePath) });
      } catch (error2) {
        console.error("Error generating download URL:", error2);
        return json({ error: "Failed to generate download URL" }, { status: 500 });
      }
    }, "GET");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/migrate-add-clientid/_server.ts.js
var server_ts_exports14 = {};
__export(server_ts_exports14, {
  POST: () => POST8
});
async function migrateAddClientId() {
  const db = getFirestore();
  console.log("Starting migration: Add clientId to documents");
  const docsSnapshot = await db.collection("documents").get();
  console.log(`Found ${docsSnapshot.size} documents to migrate`);
  const results = {
    success: 0,
    alreadyMigrated: 0,
    orphaned: 0,
    multipleClients: 0,
    errors: 0
  };
  const orphanedDocs = [];
  const multipleClientDocs = [];
  const batchSize = 500;
  let batch = db.batch();
  let batchCount = 0;
  for (const doc of docsSnapshot.docs) {
    const data = doc.data();
    if (data.clientId) {
      results.alreadyMigrated++;
      continue;
    }
    const phone = data.phone;
    if (!phone) {
      results.orphaned++;
      orphanedDocs.push({
        id: doc.id,
        title: data.title
      });
      continue;
    }
    const clientSnapshot = await db.collection("users").where("phones", "array-contains", phone).get();
    if (clientSnapshot.empty) {
      results.orphaned++;
      orphanedDocs.push({
        id: doc.id,
        phone,
        title: data.title
      });
      continue;
    }
    if (clientSnapshot.size > 1) {
      results.multipleClients++;
      multipleClientDocs.push({
        id: doc.id,
        phone,
        title: data.title,
        clients: clientSnapshot.docs.map((c) => ({
          id: c.id,
          name: c.data().name
        }))
      });
      continue;
    }
    const clientId = clientSnapshot.docs[0].id;
    batch.update(doc.ref, { clientId });
    batchCount++;
    results.success++;
    if (batchCount >= batchSize) {
      await batch.commit();
      batch = db.batch();
      batchCount = 0;
    }
  }
  if (batchCount > 0) await batch.commit();
  console.log("Migration complete:", results);
  return {
    results,
    orphanedDocs,
    multipleClientDocs
  };
}
var POST8;
var init_server_ts14 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/migrate-add-clientid/_server.ts.js"() {
    "use strict";
    init_auth_middleware();
    init_firebase_admin();
    init_exports();
    __name(migrateAddClientId, "migrateAddClientId");
    POST8 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        return json(await migrateAddClientId());
      } catch (error2) {
        console.error("Migration error:", error2);
        return json({
          error: "Migration failed",
          details: error2 instanceof Error ? error2.message : String(error2)
        }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/migrate-documents/_server.ts.js
var server_ts_exports15 = {};
__export(server_ts_exports15, {
  POST: () => POST9
});
var POST9;
var init_server_ts15 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/migrate-documents/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_auth_middleware();
    init_exports();
    POST9 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const db = getFirestore();
        const bucket = getStorage().bucket();
        const usersSnapshot = await db.collection("users").get();
        const results = [];
        for (const userDoc of usersSnapshot.docs) {
          const phone = userDoc.data().phone;
          const [files] = await bucket.getFiles({ prefix: `users/${phone}/documents/` });
          for (const file of files) {
            const fileName = file.name.split("/").pop() || "";
            if (!fileName) continue;
            const match = fileName.match(/^(\d+)_(.+)$/);
            const timestamp = match ? parseInt(match[1]) : Date.now();
            const originalName = match ? match[2] : fileName;
            if ((await db.collection("documents").where("phone", "==", phone).where("filePath", "==", file.name).get()).empty) {
              const docRef = await db.collection("documents").add({
                phone,
                title: originalName,
                filePath: file.name,
                uploadedAt: new Date(timestamp).toISOString()
              });
              results.push({
                phone,
                fileName: originalName,
                docId: docRef.id,
                status: "created"
              });
            } else results.push({
              phone,
              fileName: originalName,
              status: "already_exists"
            });
          }
        }
        return json({
          success: true,
          migrated: results.filter((r2) => r2.status === "created").length,
          skipped: results.filter((r2) => r2.status === "already_exists").length,
          details: results
        });
      } catch (error2) {
        console.error("Migration error:", error2);
        return json({
          error: "Migration failed",
          details: error2 instanceof Error ? error2.message : String(error2)
        }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/chunks/reminder-service.js
async function getReminderConfig() {
  const db = getFirestore();
  const doc = await db.collection("config").doc("reminders").get();
  if (!doc.exists) {
    const cfg = {
      enabled: true,
      maxReminders: 5,
      reminders: DEFAULT_REMINDERS,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await db.collection("config").doc("reminders").set(cfg);
    return cfg;
  }
  const data = doc.data();
  if (!data.reminders || data.reminders.length === 0) data.reminders = DEFAULT_REMINDERS;
  return data;
}
async function saveReminderConfig(config) {
  const db = getFirestore();
  config.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  await db.collection("config").doc("reminders").set(config);
}
function renderMessage(tpl, vars) {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}
async function recordVideoDelivery(delivery) {
  const db = getFirestore();
  const payload2 = {
    ...delivery,
    phone: normalizePhone(delivery.phone),
    status: "pending",
    completedAt: null,
    deliveredAt: delivery.deliveredAt || (/* @__PURE__ */ new Date()).toISOString()
  };
  const ref = await db.collection("videoDeliveries").add(payload2);
  await scheduleReminders(ref.id, payload2, payload2.deliveredAt);
  return ref.id;
}
async function scheduleReminders(deliveryId, delivery, deliveredAt) {
  const cfg = await getReminderConfig();
  if (!cfg.enabled) return;
  const db = getFirestore();
  const base = new Date(deliveredAt).getTime();
  const steps = cfg.reminders.filter((r2) => r2.enabled).sort((a, b) => a.order - b.order).slice(0, cfg.maxReminders);
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const scheduledAt = new Date(base + step.triggerMinutes * 60 * 1e3).toISOString();
    const sr = {
      deliveryId,
      phone: delivery.phone,
      employeeName: delivery.employeeName || delivery.clientName,
      videoTitle: delivery.videoTitle,
      videoUrl: delivery.videoUrl,
      moduleNumber: delivery.moduleNumber,
      message: step.message,
      reminderNumber: i + 1,
      scheduledAt,
      sentAt: null,
      status: "scheduled"
    };
    await db.collection("scheduledReminders").add(sr);
  }
}
async function cancelReminders(deliveryId) {
  const db = getFirestore();
  const snap = await db.collection("scheduledReminders").where("deliveryId", "==", deliveryId).get();
  const batch = db.batch();
  for (const d of snap.docs) if (d.data().status === "scheduled") batch.update(d.ref, { status: "cancelled" });
  await batch.commit();
}
async function markDeliveryComplete(deliveryId) {
  await getFirestore().collection("videoDeliveries").doc(deliveryId).update({
    status: "completed",
    completedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  await cancelReminders(deliveryId);
}
async function getPendingDelivery(phone) {
  return (await getFirestore().collection("videoDeliveries").where("phone", "==", normalizePhone(phone)).get()).docs.map((d) => ({
    id: d.id,
    ...d.data()
  })).filter((d) => d.status === "pending").sort((a, b) => a.deliveredAt < b.deliveredAt ? 1 : -1)[0] ?? null;
}
async function processDueReminders() {
  const db = getFirestore();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const due = (await db.collection("scheduledReminders").where("status", "==", "scheduled").get()).docs.filter((d) => d.data().scheduledAt <= now);
  let processed = 0, sent = 0, failed = 0, cancelled = 0;
  const cfg = await getReminderConfig();
  for (const d of due) {
    processed++;
    const sr = d.data();
    const deliverySnap = await db.collection("videoDeliveries").doc(sr.deliveryId).get();
    const delivery = deliverySnap.exists ? deliverySnap.data() : null;
    if (delivery?.status === "completed") {
      await d.ref.update({ status: "cancelled" });
      cancelled++;
      continue;
    }
    if (!cfg.enabled) {
      await d.ref.update({ status: "cancelled" });
      cancelled++;
      continue;
    }
    let message = renderMessage(sr.message || cfg.reminders[sr.reminderNumber - 1]?.message || "Reminder: please complete your learning video and type FINISH.", {
      name: sr.employeeName || "there",
      video: sr.videoTitle,
      module: sr.moduleNumber || "",
      reminderNumber: String(sr.reminderNumber)
    });
    if (sr.videoUrl) message += "\n\nWatch here: " + sr.videoUrl;
    try {
      await sendMessage(sr.phone, message);
      await d.ref.update({
        status: "sent",
        sentAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      await db.collection("reminderHistory").add({
        employeeName: sr.employeeName || "",
        employeeId: sr.phone,
        videoTitle: sr.videoTitle,
        videoDeliveryTime: delivery?.deliveredAt || "",
        scheduledReminderTime: sr.scheduledAt,
        actualReminderSentTime: (/* @__PURE__ */ new Date()).toISOString(),
        reminderNumber: sr.reminderNumber,
        deliveryStatus: "Sent",
        completionStatus: delivery?.status || "pending",
        nextScheduledReminder: ""
      });
      sent++;
    } catch (e) {
      await d.ref.update({
        status: "failed",
        error: e instanceof Error ? e.message : String(e)
      });
      failed++;
    }
  }
  return {
    processed,
    sent,
    failed,
    cancelled
  };
}
async function getReminderHistory() {
  const db = getFirestore();
  const [reminders, deliveries] = await Promise.all([db.collection("scheduledReminders").orderBy("scheduledAt", "desc").limit(500).get(), db.collection("videoDeliveries").get()]);
  const deliveryById = /* @__PURE__ */ new Map();
  for (const d of deliveries.docs) deliveryById.set(d.id, d.data());
  const statusLabel = {
    scheduled: "Scheduled",
    sent: "Sent",
    delivered: "Delivered",
    failed: "Failed",
    cancelled: "Cancelled",
    completed: "Completed"
  };
  const grouped = /* @__PURE__ */ new Map();
  for (const d of reminders.docs) {
    const sr = d.data();
    if (!grouped.has(sr.deliveryId)) grouped.set(sr.deliveryId, []);
    grouped.get(sr.deliveryId).push(sr);
  }
  return reminders.docs.map((d) => {
    const sr = d.data();
    const delivery = deliveryById.get(sr.deliveryId);
    const next = (grouped.get(sr.deliveryId) || []).filter((r2) => r2.reminderNumber > sr.reminderNumber && r2.status === "scheduled").sort((a, b) => a.reminderNumber - b.reminderNumber)[0];
    return {
      employeeName: sr.employeeName || delivery?.clientName || "",
      employeeId: sr.phone,
      videoTitle: sr.videoTitle,
      videoDeliveryTime: delivery?.deliveredAt || "",
      scheduledReminderTime: sr.scheduledAt,
      actualReminderSentTime: sr.sentAt || "",
      reminderNumber: sr.reminderNumber,
      deliveryStatus: statusLabel[sr.status] || sr.status,
      completionStatus: delivery?.status === "completed" ? "Completed" : "Pending",
      nextScheduledReminder: next?.scheduledAt || ""
    };
  });
}
var DEFAULT_REMINDERS;
var init_reminder_service = __esm({
  ".svelte-kit/output/server/chunks/reminder-service.js"() {
    "use strict";
    init_firebase_admin();
    init_message_sender();
    init_phone();
    DEFAULT_REMINDERS = [
      {
        id: "r1",
        triggerMinutes: 20,
        message: "Hi {name}! We noticed you haven't confirmed completion of {video} (Module {module}). Please watch and type FINISH once completed.",
        enabled: true,
        order: 1
      },
      {
        id: "r2",
        triggerMinutes: 60,
        message: "Friendly reminder {name}! Your learning video {video} is still pending. Complete it to unlock your assessment.",
        enabled: true,
        order: 2
      },
      {
        id: "r3",
        triggerMinutes: 240,
        message: "Hi {name}, your Edventure learning video {video} is still incomplete. Type FINISH after watching to continue.",
        enabled: true,
        order: 3
      },
      {
        id: "r4",
        triggerMinutes: 360,
        message: "Reminder: {video} (Module {module}) is pending. Please complete and type FINISH.",
        enabled: true,
        order: 4
      },
      {
        id: "r5",
        triggerMinutes: 1440,
        message: "Final reminder {name}: your Edventure learning activity {video} is still incomplete. Complete it to continue your journey.",
        enabled: true,
        order: 5
      }
    ];
    __name(getReminderConfig, "getReminderConfig");
    __name(saveReminderConfig, "saveReminderConfig");
    __name(renderMessage, "renderMessage");
    __name(recordVideoDelivery, "recordVideoDelivery");
    __name(scheduleReminders, "scheduleReminders");
    __name(cancelReminders, "cancelReminders");
    __name(markDeliveryComplete, "markDeliveryComplete");
    __name(getPendingDelivery, "getPendingDelivery");
    __name(processDueReminders, "processDueReminders");
    __name(getReminderHistory, "getReminderHistory");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/reminders/_server.ts.js
var server_ts_exports16 = {};
__export(server_ts_exports16, {
  GET: () => GET8,
  POST: () => POST10
});
var GET8, POST10;
var init_server_ts16 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/reminders/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_auth_middleware();
    init_reminder_service();
    init_exports();
    GET8 = /* @__PURE__ */ __name(async ({ request, url: url2 }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const db = getFirestore();
        const config = await getReminderConfig();
        if (url2.searchParams.get("history") === "1") {
          const history = await getReminderHistory();
          return json({
            config,
            history
          });
        }
        const rows = (await db.collection("videoDeliveries").orderBy("deliveredAt", "desc").limit(100).get()).docs.map((d) => ({
          id: d.id,
          ...d.data()
        }));
        return json({
          config,
          deliveries: rows
        });
      } catch (e) {
        return json({ error: "Failed" }, { status: 500 });
      }
    }, "GET");
    POST10 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const body = await request.json();
        if (body.config) await saveReminderConfig(body.config);
        return json({ success: true });
      } catch (e) {
        return json({ error: "Failed" }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/reminders/process/_server.ts.js
var server_ts_exports17 = {};
__export(server_ts_exports17, {
  POST: () => POST11
});
var POST11;
var init_server_ts17 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/reminders/process/_server.ts.js"() {
    "use strict";
    init_auth_middleware();
    init_reminder_service();
    init_exports();
    POST11 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const result = await processDueReminders();
        return json(result);
      } catch (e) {
        return json({ error: "Failed" }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/rename/_server.ts.js
var server_ts_exports18 = {};
__export(server_ts_exports18, {
  POST: () => POST12
});
var POST12;
var init_server_ts18 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/rename/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_auth_middleware();
    init_exports();
    POST12 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const { type, category, fiscalYear, subCategory, newName } = await request.json();
        if (!type || !category || !newName) return json({ error: "Missing required fields" }, { status: 400 });
        const db = getFirestore();
        const clientsSnapshot = await db.collection("users").get();
        const batch = db.batch();
        let updateCount = 0;
        for (const clientDoc of clientsSnapshot.docs) {
          let query = db.collection("users").doc(clientDoc.id).collection("documents").where("category", "==", category);
          if (type === "fiscalYear" && fiscalYear) query = query.where("fiscalYear", "==", fiscalYear);
          else if (type === "subCategory" && fiscalYear && subCategory) query = query.where("fiscalYear", "==", fiscalYear).where("subCategory", "==", subCategory);
          const docsSnapshot = await query.get();
          for (const doc of docsSnapshot.docs) {
            const data = doc.data();
            const updateData2 = {};
            if (type === "category") {
              updateData2.category = newName;
              if (data.filePath) {
                const pathParts = data.filePath.split("/");
                const categoryIndex = pathParts.findIndex((part) => part === category);
                if (categoryIndex !== -1) {
                  pathParts[categoryIndex] = newName;
                  updateData2.filePath = pathParts.join("/");
                }
              }
            } else if (type === "fiscalYear") {
              updateData2.fiscalYear = newName;
              if (data.filePath) {
                const pathParts = data.filePath.split("/");
                const fyIndex = pathParts.findIndex((part) => part === fiscalYear);
                if (fyIndex !== -1) {
                  pathParts[fyIndex] = newName;
                  updateData2.filePath = pathParts.join("/");
                }
              }
            } else if (type === "subCategory") {
              updateData2.subCategory = newName;
              if (data.filePath) {
                const pathParts = data.filePath.split("/");
                const scIndex = pathParts.findIndex((part) => part === subCategory);
                if (scIndex !== -1) {
                  pathParts[scIndex] = newName;
                  updateData2.filePath = pathParts.join("/");
                }
              }
            }
            batch.update(doc.ref, updateData2);
            updateCount++;
          }
        }
        const categoriesRef = db.collection("config").doc("categories");
        const categoriesDoc = await categoriesRef.get();
        if (categoriesDoc.exists) {
          const categories = categoriesDoc.data()?.categories || {};
          if (type === "category") {
            if (categories[category]) {
              categories[newName] = categories[category];
              delete categories[category];
            }
          } else if (type === "fiscalYear" && fiscalYear) {
            if (categories[category]?.fiscalYears) {
              const fyIndex = categories[category].fiscalYears.indexOf(fiscalYear);
              if (fyIndex !== -1) categories[category].fiscalYears[fyIndex] = newName;
            }
          } else if (type === "subCategory" && subCategory) {
            if (categories[category]?.subCategories) {
              const scIndex = categories[category].subCategories.indexOf(subCategory);
              if (scIndex !== -1) categories[category].subCategories[scIndex] = newName;
            }
          }
          batch.update(categoriesRef, { categories });
        }
        await batch.commit();
        return json({
          success: true,
          message: `Renamed ${type} successfully`,
          documentsUpdated: updateCount
        });
      } catch (error2) {
        console.error("Error renaming:", error2);
        return json({ error: "Failed to rename" }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/reports/chat-access/_server.ts.js
var server_ts_exports19 = {};
__export(server_ts_exports19, {
  GET: () => GET9
});
function formatDuration(ms) {
  if (!ms || ms < 0) return "\u2014";
  const totalSeconds = Math.floor(ms / 1e3);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}
var INACTIVITY_TIMEOUT_MS, GET9;
var init_server_ts19 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/reports/chat-access/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_auth_middleware();
    init_exports();
    INACTIVITY_TIMEOUT_MS = 18e5;
    GET9 = /* @__PURE__ */ __name(async ({ request, url: url2 }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const db = getFirestore();
        const limit = Math.min(parseInt(url2.searchParams.get("limit") || "200", 10) || 200, 1e3);
        const sessionsSnap = await db.collection("chatSessions").orderBy("lastMessageAt", "desc").limit(limit).get();
        const accessSnap = await db.collection("documentAccessLogs").orderBy("accessedAt", "desc").limit(500).get();
        const accessBySessionId = /* @__PURE__ */ new Map();
        const accessByPhone = /* @__PURE__ */ new Map();
        for (const d of accessSnap.docs) {
          const data = d.data();
          const phone = data.phone || "";
          if (!phone) continue;
          const entry = {
            title: data.documentTitle || "Untitled",
            at: data.accessedAt || ""
          };
          if (data.chatSessionId) {
            if (!accessBySessionId.has(data.chatSessionId)) accessBySessionId.set(data.chatSessionId, []);
            accessBySessionId.get(data.chatSessionId).push(entry);
          } else {
            if (!accessByPhone.has(phone)) accessByPhone.set(phone, []);
            accessByPhone.get(phone).push(entry);
          }
        }
        const clientCache = /* @__PURE__ */ new Map();
        async function resolveClientName(phone, fallback) {
          if (fallback) return fallback;
          if (clientCache.has(phone)) return clientCache.get(phone);
          const snap = await db.collection("users").where("phones", "array-contains", phone).limit(1).get();
          let name;
          if (!snap.empty) name = snap.docs[0].data().name || void 0;
          else {
            const legacy = await db.collection("users").where("phone", "==", phone).limit(1).get();
            if (!legacy.empty) name = legacy.docs[0].data().name || void 0;
          }
          clientCache.set(phone, name || "");
          return name;
        }
        __name(resolveClientName, "resolveClientName");
        const rows = [];
        for (const s2 of sessionsSnap.docs) {
          const data = s2.data();
          const phone = data.phone || s2.id;
          const startedAt = new Date(data.startedAt || data.lastMessageAt);
          const sessionStartMs = startedAt.getTime();
          let docs = accessBySessionId.get(s2.id) || [];
          if (docs.length === 0 && phone) {
            const phoneDocs = accessByPhone.get(phone) || [];
            const sessionEndMs = data.endedAt ? new Date(data.endedAt).getTime() : sessionStartMs + INACTIVITY_TIMEOUT_MS;
            docs = phoneDocs.filter((d) => {
              const accessedAt = new Date(d.at).getTime();
              return accessedAt >= sessionStartMs && accessedAt <= sessionEndMs;
            });
          }
          let timeTakenMs = null;
          if (docs.length > 0) timeTakenMs = Math.max(...docs.map((d) => new Date(d.at).getTime())) - sessionStartMs;
          else if (data.durationMs) timeTakenMs = data.durationMs;
          const durationMs = timeTakenMs ?? data.durationMs ?? 0;
          const distinctTitles = Array.from(new Set(docs.map((d) => d.title))).slice(0, 5);
          const clientName = await resolveClientName(phone, data.clientName) || "Unknown";
          const istDate = new Date(sessionStartMs + 198e5);
          const date = istDate.toISOString().slice(0, 10);
          const time = istDate.toISOString().slice(11, 19);
          rows.push({
            sessionId: s2.id,
            phone,
            clientName,
            date,
            time,
            timeTaken: formatDuration(durationMs),
            durationMs,
            documentAccessed: distinctTitles.join(", ") || "\u2014",
            documentAccessCount: docs.length,
            status: data.status || "active",
            messageCount: data.messageCount || 0,
            messages: data.messages || [],
            steps: data.steps || [],
            startedAt: startedAt.toISOString(),
            endedAt: data.endedAt
          });
        }
        return json({ rows });
      } catch (error2) {
        console.error("Error building chat access report:", error2);
        return json({ error: "Failed to build chat access report" }, { status: 500 });
      }
    }, "GET");
    __name(formatDuration, "formatDuration");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/reports/clients-summary/_server.ts.js
var server_ts_exports20 = {};
__export(server_ts_exports20, {
  GET: () => GET10
});
var GET10;
var init_server_ts20 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/reports/clients-summary/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_auth_middleware();
    init_exports();
    GET10 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const db = getFirestore();
        const clients = (await db.collection("users").get()).docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            name: data.name || "Unnamed Client",
            phones: data.phones || (data.phone ? [data.phone] : []),
            gstNumber: data.gstNumber || void 0,
            createdAt: data.createdAt || void 0
          };
        });
        const docsSnap = await db.collection("documents").get();
        const docsByClient = /* @__PURE__ */ new Map();
        for (const doc of docsSnap.docs) {
          const data = doc.data();
          const clientId = data.clientId || "";
          if (!clientId) continue;
          if (!docsByClient.has(clientId)) docsByClient.set(clientId, {
            categories: /* @__PURE__ */ new Set(),
            total: 0
          });
          const bucket = docsByClient.get(clientId);
          bucket.total += 1;
          if (data.category) bucket.categories.add(data.category);
        }
        const rows = clients.map((c) => {
          const stats = docsByClient.get(c.id) || {
            categories: /* @__PURE__ */ new Set(),
            total: 0
          };
          return {
            clientId: c.id,
            clientName: c.name,
            phoneCount: c.phones.length,
            phones: c.phones,
            gstNumber: c.gstNumber,
            categoryCount: stats.categories.size,
            categories: Array.from(stats.categories),
            documentCount: stats.total,
            createdAt: c.createdAt
          };
        });
        rows.sort((a, b) => {
          if (b.documentCount !== a.documentCount) return b.documentCount - a.documentCount;
          return a.clientName.localeCompare(b.clientName);
        });
        return json({ rows });
      } catch (error2) {
        console.error("Error building clients summary:", error2);
        return json({ error: "Failed to build clients summary" }, { status: 500 });
      }
    }, "GET");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/reports/employee/_server.ts.js
var server_ts_exports21 = {};
__export(server_ts_exports21, {
  GET: () => GET11
});
var GET11;
var init_server_ts21 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/reports/employee/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_phone();
    init_auth_middleware();
    init_exports();
    GET11 = /* @__PURE__ */ __name(async ({ request, url: url2 }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      const raw = url2.searchParams.get("phone");
      if (!raw) return json({ error: "phone is required" }, { status: 400 });
      const phone = normalizePhone(raw);
      try {
        const db = getFirestore();
        const userSnap = await db.collection("users").where("phones", "array-contains", phone).limit(1).get();
        const legacySnap = userSnap.empty ? await db.collection("users").where("phone", "==", phone).limit(1).get() : null;
        const employeeId = ((userSnap.empty ? legacySnap?.docs[0] : userSnap.docs[0])?.data() ?? {}).employeeId || "";
        const [deliveriesSnap, scorecardsSnap] = await Promise.all([db.collection("videoDeliveries").where("phone", "==", phone).get(), employeeId ? db.collection("scorecards").where("employeeId", "==", employeeId).get() : Promise.resolve(null)]);
        const videos = deliveriesSnap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            moduleNumber: data.moduleNumber || "",
            videoTitle: data.videoTitle || "",
            deliveredAt: data.deliveredAt || "",
            completedAt: data.completedAt || "",
            status: data.status || "pending"
          };
        }).sort((a, b) => b.deliveredAt.localeCompare(a.deliveredAt));
        const assessments = (scorecardsSnap?.docs ?? []).map((d) => {
          const data = d.data();
          return {
            id: d.id,
            assessmentTitle: data.assessmentTitle || "",
            videoTitle: data.videoTitle || "",
            moduleNumber: data.moduleNumber || "",
            marksObtained: Number(data.marksObtained ?? data.score ?? 0),
            totalMarks: Number(data.totalMarks ?? data.total ?? 0),
            percentage: Number(data.percentage ?? 0),
            result: data.result || "",
            status: data.status || "",
            timeTakenSeconds: Number(data.timeTakenSeconds ?? 0),
            completedAt: data.completionDate || data.createdAt || ""
          };
        }).sort((a, b) => a.completedAt.localeCompare(b.completedAt));
        return json({
          employeeId,
          videos,
          assessments
        });
      } catch (error2) {
        console.error("Error building employee report:", error2);
        return json({ error: "Failed to build employee report" }, { status: 500 });
      }
    }, "GET");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/reports/regrade/_server.ts.js
var server_ts_exports22 = {};
__export(server_ts_exports22, {
  POST: () => POST13
});
var POST13;
var init_server_ts22 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/reports/regrade/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_learning_service();
    init_auth_middleware();
    init_exports();
    POST13 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const db = getFirestore();
        const [subsSnap, questionsSnap, assessmentsSnap] = await Promise.all([
          db.collection("assessmentSubmissions").where("result", "==", "PENDING").get(),
          db.collection("questions").get(),
          db.collection("assessments").get()
        ]);
        const questions = new Map(questionsSnap.docs.map((d) => [d.id, {
          ...d.data(),
          id: d.id
        }]));
        const assessments = new Map(assessmentsSnap.docs.map((d) => [d.id, {
          ...d.data(),
          id: d.id
        }]));
        let regraded = 0;
        let stillPending = 0;
        for (const sub of subsSnap.docs) {
          const data = sub.data();
          const assessment = assessments.get(data.assessmentId);
          const paper = (assessment?.questionIds ?? []).map((id) => questions.get(id)).filter((q) => !!q);
          if (paper.length === 0) {
            stillPending++;
            continue;
          }
          const evaluation = evaluateQuestions(paper, data.answers ?? {}, assessment?.passingPercentage ?? 40);
          if (evaluation.result === "PENDING") {
            stillPending++;
            continue;
          }
          const status = evaluation.result;
          const scores = {
            correctAnswers: evaluation.correct,
            incorrectAnswers: evaluation.incorrect,
            unanswered: evaluation.unanswered,
            totalMarks: evaluation.totalMarks,
            marksObtained: evaluation.marksObtained,
            percentage: evaluation.percentage,
            result: evaluation.result,
            status
          };
          await sub.ref.update(scores);
          const cards = await db.collection("scorecards").where("submissionId", "==", sub.id).get();
          for (const card of cards.docs) await card.ref.update({
            ...scores,
            score: evaluation.marksObtained,
            total: evaluation.totalMarks
          });
          regraded++;
        }
        return json({
          regraded,
          stillPending
        });
      } catch (error2) {
        console.error("Re-grade failed:", error2);
        return json({ error: "Failed to re-grade" }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/test-firebase/_server.ts.js
var server_ts_exports23 = {};
__export(server_ts_exports23, {
  GET: () => GET12
});
var GET12;
var init_server_ts23 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/test-firebase/_server.ts.js"() {
    "use strict";
    init_auth_middleware();
    init_exports();
    GET12 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      const results = {
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        tests: { envVars: {
          FIREBASE_SERVICE_ACCOUNT_JSON: !!process.env.FIREBASE_SERVICE_ACCOUNT_JSON,
          NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
        } }
      };
      try {
        const { getFirestore: getFirestore2 } = await Promise.resolve().then(() => (init_firebase_admin(), firebase_admin_exports)).then((n) => n.t);
        const db = getFirestore2();
        results.tests.firebaseInit = "SUCCESS";
        try {
          const usersSnapshot = await db.collection("users").limit(5).get();
          results.tests.firestoreRead = {
            status: "SUCCESS",
            userCount: usersSnapshot.size,
            users: usersSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))
          };
        } catch (readError) {
          results.tests.firestoreRead = {
            status: "FAILED",
            error: readError instanceof Error ? readError.message : String(readError)
          };
        }
        try {
          const docsSnapshot = await db.collection("documents").limit(5).get();
          results.tests.documentsRead = {
            status: "SUCCESS",
            docCount: docsSnapshot.size,
            documents: docsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))
          };
        } catch (readError) {
          results.tests.documentsRead = {
            status: "FAILED",
            error: readError instanceof Error ? readError.message : String(readError)
          };
        }
      } catch (initError) {
        results.tests.firebaseInit = {
          status: "FAILED",
          error: initError instanceof Error ? initError.message : String(initError)
        };
      }
      return json(results);
    }, "GET");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/upload-url/_server.ts.js
var server_ts_exports24 = {};
__export(server_ts_exports24, {
  POST: () => POST14
});
var POST14;
var init_server_ts24 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/upload-url/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_auth_middleware();
    init_exports();
    POST14 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const { filePath, contentType } = await request.json();
        if (!filePath) return json({ error: "filePath is required" }, { status: 400 });
        const [url2] = await getStorage().bucket().file(filePath).getSignedUrl({
          version: "v4",
          action: "write",
          expires: Date.now() + 9e5,
          contentType: contentType || "application/octet-stream"
        });
        return json({
          url: url2,
          filePath
        });
      } catch (error2) {
        console.error("Error generating upload URL:", error2);
        return json({ error: "Failed to generate upload URL" }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin/video-deliveries/_server.ts.js
var server_ts_exports25 = {};
__export(server_ts_exports25, {
  DELETE: () => DELETE4,
  GET: () => GET13,
  POST: () => POST15
});
var GET13, POST15, DELETE4;
var init_server_ts25 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin/video-deliveries/_server.ts.js"() {
    "use strict";
    init_firebase_admin();
    init_auth_middleware();
    init_reminder_service();
    init_message_sender();
    init_phone();
    init_exports();
    GET13 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const snap = await getFirestore().collection("videoDeliveries").orderBy("deliveredAt", "desc").limit(200).get();
        return json(snap.docs.map((d) => ({
          id: d.id,
          ...d.data()
        })));
      } catch (e) {
        return json({ error: "Failed" }, { status: 500 });
      }
    }, "GET");
    POST15 = /* @__PURE__ */ __name(async ({ request }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      try {
        const body = await request.json();
        if (!body.phone || !body.videoTitle) return json({ error: "phone and videoTitle are required" }, { status: 400 });
        const id = await recordVideoDelivery({
          ...body,
          deliveredAt: body.deliveredAt || (/* @__PURE__ */ new Date()).toISOString()
        });
        let deliveryMessage = `Hi ${body.employeeName || "there"}! Here is your learning video: ${body.videoTitle}.`;
        if (body.videoUrl) deliveryMessage += `

Watch here: ${body.videoUrl}`;
        deliveryMessage += "\n\nType FINISH once you have completed the video.";
        let sent = false;
        try {
          await sendMessage(normalizePhone(body.phone), deliveryMessage);
          sent = true;
        } catch (e) {
          console.error("Video delivery message failed:", e);
        }
        return json({
          id,
          sent
        }, { status: 201 });
      } catch (e) {
        console.error("Video delivery failed:", e);
        return json({ error: "Failed to deliver video" }, { status: 500 });
      }
    }, "POST");
    DELETE4 = /* @__PURE__ */ __name(async ({ request, url: url2 }) => {
      const auth2 = await verifyAdminToken(request);
      if (!auth2.authorized) return unauthorizedResponse(auth2.error);
      const id = url2.searchParams.get("id");
      if (!id) return json({ error: "id required" }, { status: 400 });
      await markDeliveryComplete(id);
      await cancelReminders(id);
      return json({ success: true });
    }, "DELETE");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/auth/login/_server.ts.js
var server_ts_exports26 = {};
__export(server_ts_exports26, {
  POST: () => POST16
});
var POST16;
var init_server_ts26 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/auth/login/_server.ts.js"() {
    "use strict";
    init_simple_auth();
    init_exports();
    POST16 = /* @__PURE__ */ __name(async ({ request }) => {
      try {
        const { email, password } = await request.json();
        if (!email || !password) return json({ error: "Email and password are required" }, { status: 400 });
        const user = validateCredentials(email, password);
        if (!user) return json({ error: "Invalid email or password" }, { status: 401 });
        return json({
          user,
          token: generateToken(user)
        });
      } catch (error2) {
        console.error("Login error:", error2);
        return json({ error: "Login failed" }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/auth/verify/_server.ts.js
var server_ts_exports27 = {};
__export(server_ts_exports27, {
  POST: () => POST17
});
var POST17;
var init_server_ts27 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/auth/verify/_server.ts.js"() {
    "use strict";
    init_simple_auth();
    init_exports();
    POST17 = /* @__PURE__ */ __name(async ({ request }) => {
      try {
        const { token } = await request.json();
        if (!token) return json({ error: "Token is required" }, { status: 400 });
        const user = verifyToken(token);
        if (!user) return json({ error: "Invalid token" }, { status: 401 });
        return json({ user });
      } catch (error2) {
        console.error("Verify error:", error2);
        return json({ error: "Verification failed" }, { status: 500 });
      }
    }, "POST");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/cron/reminders/_server.ts.js
var server_ts_exports28 = {};
__export(server_ts_exports28, {
  GET: () => GET14
});
var GET14;
var init_server_ts28 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/cron/reminders/_server.ts.js"() {
    "use strict";
    init_certificate_service();
    init_reminder_service();
    init_auth_middleware();
    init_exports();
    GET14 = /* @__PURE__ */ __name(async ({ request, url: url2 }) => {
      const secret = process.env.CRON_SECRET;
      const provided = url2.searchParams.get("secret") || request.headers.get("authorization");
      if (!(secret ? provided === secret || provided === `Bearer ${secret}` : false)) {
        if (!(await verifyAdminToken(request)).authorized) return json({ error: "Unauthorized" }, { status: 401 });
      }
      try {
        const reminders = await processDueReminders();
        const certificates = await processDueCertificates().catch((error2) => {
          console.error("Cron certificate delivery failed:", error2);
          return {
            sent: 0,
            failed: 0
          };
        });
        return json({
          ...reminders,
          certificates
        });
      } catch (error2) {
        console.error("Cron reminder processing failed:", error2);
        return json({ error: "Failed" }, { status: 500 });
      }
    }, "GET");
  }
});

// .svelte-kit/output/server/entries/endpoints/api/webhook/_server.ts.js
var server_ts_exports29 = {};
__export(server_ts_exports29, {
  GET: () => GET15,
  POST: () => POST18
});
import { createHmac as createHmac2, timingSafeEqual as timingSafeEqual2 } from "crypto";
import { waitUntil } from "cloudflare:workers";
function validateSignature(body, signature, secret) {
  if (!signature || !signature.startsWith("sha256=")) return false;
  const expectedSignature = createHmac2("sha256", secret).update(body).digest("hex");
  const providedSignature = signature.slice(7);
  if (expectedSignature.length !== providedSignature.length) return false;
  return timingSafeEqual2(Buffer.from(expectedSignature), Buffer.from(providedSignature));
}
function clampMinutes(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 30;
  return Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, Math.round(n)));
}
async function getSessionTimeoutMs() {
  const fallback = cached?.ms ?? 18e5;
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.ms;
  try {
    const doc = await getFirestore().collection("settings").doc("app").get();
    cached = {
      ms: clampMinutes(doc.exists ? doc.data().sessionTimeoutMinutes : void 0) * 6e4,
      at: Date.now()
    };
  } catch (error2) {
    console.error("[session-config] read failed, using default:", error2);
    cached = {
      ms: fallback,
      at: Date.now()
    };
  }
  return cached.ms;
}
function isRegistered(user) {
  return !!user && !!user.employeeId && !!user.name && !!user.city && !!user.managerName && user.consentStatus === "accepted";
}
function createSession(step, overrides, ttlMs = sessionTtlMs) {
  const now = Date.now();
  return {
    currentStep: step,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + ttlMs).toISOString(),
    ...overrides
  };
}
function askRegistration(session, field, note) {
  return {
    message: note ? `${note}

${PROFILE_PROMPTS[field]}` : PROFILE_PROMPTS[field],
    session: {
      ...session,
      currentStep: `registration_${field}`
    }
  };
}
function consentPrompt(session, note) {
  const body = note ? `${note}

${CONSENT_TEXT}` : CONSENT_TEXT;
  return {
    message: body,
    interactive: {
      type: "button",
      body,
      buttons: CONSENT_BUTTONS
    },
    session: {
      ...session,
      currentStep: "consent"
    }
  };
}
function validEmployeeId(value, pattern2) {
  try {
    return new RegExp(pattern2).test(value);
  } catch {
    return new RegExp(DEFAULT_EMPLOYEE_ID_PATTERN).test(value);
  }
}
function truncate(str, max) {
  return str.length <= max ? str : str.slice(0, max - 1) + "\u2026";
}
function videoPrompt(module2) {
  return [
    "Welcome to Edventure! Let's continue your learning journey. Here is your learning video for today.",
    "",
    module2.moduleNumber ? `Module ${module2.moduleNumber}: ${module2.title}` : module2.title,
    ...module2.description ? [module2.description] : [],
    ...module2.videoUrl ? ["", `Watch here: ${module2.videoUrl}`] : [],
    "",
    "Please watch the complete video and type FINISH once you have completed watching it."
  ].join("\n");
}
function pendingPrompt(pending) {
  return [
    `Your learning video "${pending.videoTitle}" is still pending.`,
    ...pending.videoUrl ? ["", `Watch here: ${pending.videoUrl}`] : [],
    "",
    "Please watch the complete video and type FINISH once you have completed watching it."
  ].join("\n");
}
async function deliverNextVideo(phone, employee) {
  const module2 = await getNextModule(phone);
  if (!module2) return {
    message: "You have completed all available learning modules.\n\nYour certificate will be shared with you once it has been generated.",
    session: createSession("done", { employee })
  };
  await recordVideoDelivery({
    phone,
    clientId: employee.id,
    clientName: employee.name,
    employeeName: employee.name,
    videoTitle: module2.title,
    videoUrl: module2.videoUrl,
    moduleNumber: module2.moduleNumber,
    deliveredAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  return {
    message: videoPrompt(module2),
    session: createSession("awaiting_finish", { employee })
  };
}
function beginRegistration(user) {
  return askRegistration(createSession("registration_employeeId", {
    registration: {},
    registrationClientId: user?.id
  }), "employeeId");
}
async function beginJourney(phone, employee) {
  const pending = await getPendingDelivery(phone);
  if (pending) return {
    message: pendingPrompt(pending),
    session: createSession("awaiting_finish", { employee })
  };
  return deliverNextVideo(phone, employee);
}
async function startAssessment(phone, pending, employee) {
  const module2 = (await getActiveModules()).find((m) => moduleKey(m) === String(pending.moduleNumber ?? pending.videoTitle)) ?? null;
  const assessment = await getAssessmentForModule(module2);
  const questionIds = assessment?.questionIds ?? [];
  if (!assessment || questionIds.length === 0) {
    const done = `Great job! Your video "${pending.videoTitle}" has been marked as completed.`;
    if (!employee) return {
      message: `${done}

Please type Hi to continue.`,
      session: null
    };
    const next = await deliverNextVideo(phone, employee);
    return {
      ...next,
      message: `${done}

${next.message}`
    };
  }
  const questions = await getQuestionsByIds(questionIds);
  if (questions.length === 0) {
    const done = `Great job! Your video "${pending.videoTitle}" has been marked as completed.`;
    if (!employee) return {
      message: `${done}

Please type Hi to continue.`,
      session: null
    };
    const next = await deliverNextVideo(phone, employee);
    return {
      ...next,
      message: `${done}

${next.message}`
    };
  }
  return questionResult(phone, createSession("assessment_question", {
    employee: employee ?? void 0,
    assessment: {
      assessmentId: assessment.id,
      title: assessment.title,
      questionIds: questions.map((q) => q.id),
      index: 0,
      answers: {},
      passingPercentage: assessment.passingPercentage ?? 40,
      moduleNumber: pending.moduleNumber,
      videoTitle: pending.videoTitle,
      startedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  }, 72e5), "Congratulations! You have completed the learning video. Now let's test your understanding.");
}
async function questionResult(phone, session, prefix) {
  const state2 = session.assessment;
  const question = (await getQuestionsByIds(state2.questionIds))[state2.index];
  if (!question) return finishAssessment(phone, session);
  const body = [
    ...prefix ? [`${prefix}`, ""] : [],
    `Question ${state2.index + 1} of ${state2.questionIds.length}`,
    "",
    question.text
  ].join("\n");
  const options2 = questionOptions(question);
  if (options2.length === 0) return {
    message: `${body}

Type your answer.`,
    session
  };
  return {
    message: body,
    interactive: {
      type: "list",
      body,
      buttonText: "Answer",
      sections: [{
        title: "Options",
        rows: options2.map((option, i) => ({
          id: `opt_${i}`,
          title: truncate(option, 24)
        }))
      }]
    },
    session
  };
}
async function answerQuestion(phone, session, interactiveReplyId, raw) {
  const state2 = session.assessment;
  const question = (await getQuestionsByIds(state2.questionIds))[state2.index];
  if (!question) return finishAssessment(phone, session);
  const options2 = questionOptions(question);
  let answer;
  if (options2.length > 0) {
    if (!interactiveReplyId?.startsWith("opt_")) return questionResult(phone, session, "Please choose one of the options.");
    const index20 = Number(interactiveReplyId.slice(4));
    if (!Number.isInteger(index20) || index20 < 0 || index20 >= options2.length) return questionResult(phone, session, "Please choose one of the options.");
    answer = interactiveReplyId;
  } else {
    if (!raw) return questionResult(phone, session, "Please type your answer.");
    if (raw.length > 2e3) return questionResult(phone, session, "Your answer is too long. Please keep it under 2000 characters.");
    answer = raw;
  }
  const next = {
    ...state2,
    index: state2.index + 1,
    answers: {
      ...state2.answers,
      [question.id]: answer
    }
  };
  const updated = {
    ...session,
    assessment: next
  };
  return next.index < next.questionIds.length ? questionResult(phone, updated) : finishAssessment(phone, updated);
}
function retakePrompt(body, session) {
  return {
    message: body,
    interactive: {
      type: "button",
      body,
      buttons: [{
        id: "retake_yes",
        title: "Retake Test"
      }]
    },
    session: {
      ...session,
      currentStep: "awaiting_retake"
    }
  };
}
async function finishAssessment(phone, session) {
  const state2 = session.assessment;
  const employee = session.employee;
  if (!employee) return {
    message: "Your session has expired. Please type Hi to continue.",
    session: null
  };
  const questions = await getQuestionsByIds(state2.questionIds);
  const evaluation = evaluateQuestions(questions, state2.answers, state2.passingPercentage);
  const timeTakenSeconds = Math.max(0, Math.round((Date.now() - new Date(state2.startedAt).getTime()) / 1e3));
  try {
    await saveAssessmentResult({
      employee,
      assessmentId: state2.assessmentId,
      assessmentTitle: state2.title,
      moduleNumber: state2.moduleNumber,
      videoTitle: state2.videoTitle,
      answers: state2.answers,
      evaluation,
      timeTakenSeconds
    });
  } catch (error2) {
    console.error("[assessment] Failed to save result:", error2);
    return {
      message: "Your assessment was submitted, but the result could not be saved. Please contact your administrator.",
      session: createSession("done", { employee })
    };
  }
  const lines = [
    `Your ${state2.title} is complete!`,
    "",
    `Total Marks: ${evaluation.totalMarks}`,
    `Marks Obtained: ${evaluation.marksObtained}`,
    `Percentage: ${evaluation.percentage}%`,
    `Result: ${evaluation.result === "PENDING" ? "PENDING EVALUATION" : evaluation.result}`
  ];
  if (evaluation.result === "PENDING") {
    lines.push("", "Your answers have been submitted and will be reviewed by your manager.");
    return {
      message: lines.join("\n"),
      session: createSession("done", { employee })
    };
  }
  if (evaluation.result === "FAIL") {
    lines.push("", "You did not meet the passing percentage. Tap Retake Test to try again.");
    return retakePrompt(lines.join("\n"), createSession("awaiting_retake", {
      employee,
      assessment: state2
    }));
  }
  const next = await deliverNextVideo(phone, employee);
  if (next.session?.currentStep === "done") {
    try {
      const issued = await issueCertificateIfComplete(phone, employee);
      if (issued) {
        lines.push("", "Congratulations! You have completed every learning module.", issued.created ? `Your certificate has been generated \u2014 Certificate ID ${issued.certificate.certificateNumber}.` : `Your certificate is already issued \u2014 Certificate ID ${issued.certificate.certificateNumber}.`);
        return {
          message: lines.join("\n"),
          session: next.session
        };
      }
    } catch (error2) {
      console.error("[assessment] certificate issue failed:", error2);
    }
    return {
      message: `${lines.join("\n")}

${next.message}`,
      session: next.session
    };
  }
  lines.push("", "Congratulations! You are ready for the next learning module.");
  return {
    message: `${lines.join("\n")}

${next.message}`,
    session: next.session
  };
}
async function processMessage(phone, text2, session, interactiveReplyId, user) {
  sessionTtlMs = await getSessionTimeoutMs();
  const raw = text2.trim();
  const input = interactiveReplyId ? interactiveReplyId.trim() : raw.toLowerCase();
  const step = session?.currentStep;
  if (input === "finish" && step !== "assessment_question") {
    const pending = await getPendingDelivery(phone);
    if (!pending) return {
      message: "You have no pending learning video. Type Hi to continue your journey.",
      session
    };
    await markDeliveryComplete(pending.id);
    return startAssessment(phone, pending, user ?? session?.employee ?? null);
  }
  if (input === "restart" || input === "start over" || input === "reset") {
    if (!isRegistered(user)) return beginRegistration(user);
    await resetEmployeeProgress(phone, user.employeeId);
    await resetUserProfile(phone);
    return beginRegistration(user);
  }
  if (step === "awaiting_retake" && session?.assessment) {
    const assessment = session.assessment;
    if (input === "retake_yes" || input === "retake" || input === "retake test") return questionResult(phone, createSession("assessment_question", {
      employee: session.employee,
      assessment: {
        ...assessment,
        index: 0,
        answers: {},
        startedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    }, 72e5), "Retaking the assessment. Good luck!");
    return retakePrompt("You did not meet the passing percentage. Tap Retake Test when you are ready to try again.", createSession("awaiting_retake", {
      employee: session.employee,
      assessment
    }));
  }
  if (input === "hi" || input === "hello") {
    if (step === "assessment_question" && session?.assessment) return questionResult(phone, session);
    if (isRegistered(user)) return beginJourney(phone, user);
    return beginRegistration(user);
  }
  if (step === "consent" && session) {
    if (input === "consent_yes") {
      const reg = session.registration;
      if (!reg?.employeeId || !reg.name || !reg.city || !reg.managerName) return askRegistration(createSession("registration_employeeId", {
        registration: {},
        registrationClientId: session.registrationClientId
      }), "employeeId");
      const config = await getRegistrationConfig();
      const profile = {
        employeeId: reg.employeeId,
        name: reg.name,
        city: reg.city,
        zone: reg.zone ?? "",
        managerName: reg.managerName,
        consentStatus: "accepted",
        consentAt: (/* @__PURE__ */ new Date()).toISOString(),
        consentVersion: config.consentVersion
      };
      let clientId;
      try {
        clientId = await saveUserProfile(phone, session.registrationClientId ?? null, profile);
      } catch (error2) {
        console.error("[registration] Failed to save profile:", error2);
        return {
          message: "Sorry, we could not save your details. Please try again later.",
          session
        };
      }
      return deliverNextVideo(phone, {
        id: clientId,
        employeeId: profile.employeeId,
        name: profile.name,
        city: profile.city,
        zone: profile.zone ?? "",
        managerName: profile.managerName
      });
    }
    if (input === "consent_no") return {
      message: "Thank you for your time. Your registration details have not been saved and your learning journey will not be started.",
      session: null
    };
    return consentPrompt(session);
  }
  if (step?.startsWith("registration_") && session) {
    const field = step.slice(13);
    const registration = { ...session.registration };
    if (!raw || raw.length > 100) return askRegistration(session, field, "That entry looks invalid. Please try again.");
    if (field === "employeeId") {
      if (!validEmployeeId(raw, (await getRegistrationConfig()).employeeIdPattern)) return askRegistration(session, field, "That Employee ID format is not valid. Please enter it again.");
      registration.employeeId = raw;
    }
    if (field === "name") registration.name = raw;
    if (field === "city") {
      const cities = await getCities();
      if (cities.length > 0) {
        const match = cities.find((c) => c.name.toLowerCase() === raw.toLowerCase());
        if (!match) return askRegistration(session, "city", `City not recognised. Available cities: ${cities.map((c) => c.name).join(", ")}`);
        registration.city = match.name;
        registration.zone = match.zone;
      } else {
        registration.city = raw;
        registration.zone = "";
      }
    }
    if (field === "managerName") registration.managerName = raw;
    const nextField = PROFILE_FIELDS[PROFILE_FIELDS.indexOf(field) + 1];
    const updated = {
      ...session,
      registration
    };
    const cityNote = field === "city" ? `Thank you! Your registered city is ${registration.city}, and your assigned zone is ${registration.zone || "Not assigned"}.` : void 0;
    if (nextField) return askRegistration(updated, nextField, cityNote);
    return consentPrompt(updated, cityNote);
  }
  if (step === "assessment_question" && session?.assessment) return answerQuestion(phone, session, interactiveReplyId, raw);
  if (step === "awaiting_finish" && session) {
    const pending = await getPendingDelivery(phone);
    if (pending) return {
      message: pendingPrompt(pending),
      session
    };
    if (isRegistered(user)) return deliverNextVideo(phone, user);
  }
  return {
    message: "Please send 'Hi' to start.",
    session: null
  };
}
async function recordChatActivity(phone, activity) {
  try {
    const db = getFirestore();
    const normalized = normalizePhone(phone);
    const now = /* @__PURE__ */ new Date();
    const nowIso = now.toISOString();
    const entries = activity.messages.filter((m) => m.text?.trim()).map((m) => ({
      at: nowIso,
      from: m.from,
      text: m.text.slice(0, 2e3)
    }));
    const userMessages = entries.filter((m) => m.from === "user").length;
    if (activity.startNew) await closeChatSession(normalized);
    const activeSnap = await db.collection("chatSessions").where("phone", "==", normalized).where("status", "==", "active").orderBy("lastMessageAt", "desc").limit(1).get();
    if (!activeSnap.empty) {
      const sessionDoc = activeSnap.docs[0];
      const data = sessionDoc.data();
      const last = new Date(data.lastMessageAt).getTime();
      if (now.getTime() - last < await getSessionTimeoutMs()) {
        await sessionDoc.ref.update({
          lastMessageAt: nowIso,
          messageCount: (data.messageCount || 0) + userMessages,
          messages: [...data.messages || [], ...entries],
          ...data.clientId ? {} : {
            clientId: activity.clientId,
            clientName: activity.clientName
          }
        });
        return sessionDoc.id;
      }
      await closeChatSession(normalized);
    }
    if (!activity.startNew) return null;
    const newSession = {
      phone: normalized,
      clientId: activity.clientId,
      clientName: activity.clientName,
      startedAt: nowIso,
      status: "active",
      messageCount: userMessages,
      lastMessageAt: nowIso,
      messages: entries
    };
    return (await db.collection("chatSessions").add(newSession)).id;
  } catch (error2) {
    console.error("[chat-logger] recordChatActivity failed:", error2);
    return null;
  }
}
async function closeChatSession(phone) {
  try {
    const db = getFirestore();
    const normalized = normalizePhone(phone);
    const activeSnap = await db.collection("chatSessions").where("phone", "==", normalized).where("status", "==", "active").orderBy("lastMessageAt", "desc").limit(1).get();
    if (activeSnap.empty) return;
    const sessionDoc = activeSnap.docs[0];
    const data = sessionDoc.data();
    const startedAt = new Date(data.startedAt).getTime();
    const endedAt = data.lastMessageAt || (/* @__PURE__ */ new Date()).toISOString();
    await sessionDoc.ref.update({
      status: "completed",
      endedAt,
      durationMs: Math.max(0, new Date(endedAt).getTime() - startedAt),
      lastMessageAt: endedAt
    });
  } catch (error2) {
    console.error("[chat-logger] closeChatSession failed:", error2);
  }
}
function isDuplicate(messageId) {
  const now = Date.now();
  for (const [id, timestamp] of processedMessages) if (now - timestamp > DEDUP_TTL_MS) processedMessages.delete(id);
  if (processedMessages.has(messageId)) return true;
  processedMessages.set(messageId, now);
  return false;
}
async function GET15({ url: url2 }) {
  const mode = url2.searchParams.get("hub.mode");
  const token = url2.searchParams.get("hub.verify_token");
  const challenge = url2.searchParams.get("hub.challenge");
  const verifyToken2 = process.env.WEBHOOK_VERIFY_TOKEN;
  if (!verifyToken2) {
    console.error("WEBHOOK_VERIFY_TOKEN environment variable is missing");
    return json({ error: "Server configuration error" }, { status: 500 });
  }
  if (mode === "subscribe" && token === verifyToken2 && challenge) return new Response(challenge, { status: 200 });
  return json({ error: "Forbidden" }, { status: 403 });
}
async function POST18(event) {
  try {
    const rawBody = await event.request.text();
    const signature = event.request.headers.get("x-hub-signature-256");
    const appSecret = process.env.APP_SECRET;
    console.log(`Webhook POST: ${rawBody.length} bytes, signature=${signature ? "yes" : "no"}`);
    if (!appSecret) {
      console.error("APP_SECRET environment variable is missing");
      return json({ error: "Server configuration error" }, { status: 500 });
    }
    if (!signature) return json({ error: "Unauthorized" }, { status: 401 });
    if (!validateSignature(rawBody, signature, appSecret)) return json({ error: "Unauthorized" }, { status: 401 });
    const parsed = parseWebhookPayload(JSON.parse(rawBody));
    if (!parsed) {
      console.log("Webhook: no message in payload (status/other event)");
      return json({ status: "ok" }, { status: 200 });
    }
    console.log(`Webhook message ${parsed.messageId} from ${parsed.from}`);
    if (isDuplicate(parsed.messageId)) {
      console.log(`Skipping duplicate message: ${parsed.messageId}`);
      return json({ status: "ok" }, { status: 200 });
    }
    waitUntil(handleMessage(parsed));
    return json({ status: "ok" }, { status: 200 });
  } catch (error2) {
    console.error("Webhook error:", error2);
    return json({ status: "ok" }, { status: 200 });
  }
}
async function handleMessage(parsed) {
  try {
    const { from, text: text2, interactiveReplyId } = parsed;
    const normalizedPhone = normalizePhone(from);
    const sanitizedText = sanitizeMessageBody(text2);
    const users = await findAllUsersByPhone(normalizedPhone);
    console.log(`Users found for ${normalizedPhone}: ${users.length}`);
    const session = await getBotSession(normalizedPhone);
    const user = users[0] ? {
      id: users[0].id,
      name: users[0].name,
      employeeId: users[0].employeeId ?? "",
      city: users[0].city ?? "",
      zone: users[0].zone ?? "",
      managerName: users[0].managerName ?? "",
      consentStatus: users[0].consentStatus
    } : null;
    const result = await processMessage(normalizedPhone, sanitizedText, session, interactiveReplyId, user);
    if (result.session) await saveBotSession(normalizedPhone, result.session);
    else await clearBotSession(normalizedPhone);
    const command = sanitizedText.toLowerCase().trim();
    const isGreeting = command === "hi" || command === "hello";
    const isRestart = command === "restart" || command === "start over" || command === "reset";
    const botText = result.interactive?.body ?? result.message;
    await recordChatActivity(normalizedPhone, {
      startNew: isGreeting || isRestart,
      messages: [{
        from: "user",
        text: sanitizedText
      }, ...botText ? [{
        from: "bot",
        text: botText
      }] : []],
      clientId: result.session?.employee?.id ?? user?.id,
      clientName: result.session?.employee?.name ?? user?.name
    });
    if (result.interactive) {
      if (result.interactive.type === "button") await sendInteractiveButtons(from, result.interactive.body, result.interactive.buttons);
      else if (result.interactive.type === "list") await sendInteractiveList(from, result.interactive.body, result.interactive.buttonText, result.interactive.sections);
    } else if (result.message) await sendMessage(from, result.message);
  } catch (error2) {
    console.error("Error processing message:", error2);
    try {
      await sendMessage(parsed.from, 'Something went wrong. Please try again by sending "Hi".');
    } catch (sendError) {
      console.error("Failed to send error fallback message:", sendError);
    }
  }
}
var MIN_MINUTES, MAX_MINUTES, CACHE_TTL_MS, cached, sessionTtlMs, PROFILE_FIELDS, PROFILE_PROMPTS, CONSENT_TEXT, CONSENT_BUTTONS, processedMessages, DEDUP_TTL_MS;
var init_server_ts29 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/webhook/_server.ts.js"() {
    "use strict";
    init_document_service();
    init_phone();
    init_message_sender();
    init_certificate_service();
    init_learning_service();
    init_reminder_service();
    init_firebase_admin();
    init_exports();
    __name(validateSignature, "validateSignature");
    MIN_MINUTES = 1;
    MAX_MINUTES = 1440;
    CACHE_TTL_MS = 6e4;
    cached = null;
    __name(clampMinutes, "clampMinutes");
    __name(getSessionTimeoutMs, "getSessionTimeoutMs");
    sessionTtlMs = 18e5;
    PROFILE_FIELDS = [
      "employeeId",
      "name",
      "managerName",
      "city"
    ];
    PROFILE_PROMPTS = {
      employeeId: "Welcome to Edventure! Let's get started with your learning journey.\n\nPlease provide the following details.\n\n1/4 \u2014 Employee ID:",
      name: "2/4 \u2014 Employee Name:",
      managerName: "3/4 \u2014 Manager Name:",
      city: "4/4 \u2014 City:"
    };
    CONSENT_TEXT = "Do you consent to Edventure recording and processing your registration information for managing your learning journey and assessments?";
    CONSENT_BUTTONS = [{
      id: "consent_yes",
      title: "YES - I Consent"
    }, {
      id: "consent_no",
      title: "NO - Do Not Consent"
    }];
    __name(isRegistered, "isRegistered");
    __name(createSession, "createSession");
    __name(askRegistration, "askRegistration");
    __name(consentPrompt, "consentPrompt");
    __name(validEmployeeId, "validEmployeeId");
    __name(truncate, "truncate");
    __name(videoPrompt, "videoPrompt");
    __name(pendingPrompt, "pendingPrompt");
    __name(deliverNextVideo, "deliverNextVideo");
    __name(beginRegistration, "beginRegistration");
    __name(beginJourney, "beginJourney");
    __name(startAssessment, "startAssessment");
    __name(questionResult, "questionResult");
    __name(answerQuestion, "answerQuestion");
    __name(retakePrompt, "retakePrompt");
    __name(finishAssessment, "finishAssessment");
    __name(processMessage, "processMessage");
    __name(recordChatActivity, "recordChatActivity");
    __name(closeChatSession, "closeChatSession");
    processedMessages = /* @__PURE__ */ new Map();
    DEDUP_TTL_MS = 3e5;
    __name(isDuplicate, "isDuplicate");
    __name(GET15, "GET");
    __name(POST18, "POST");
    __name(handleMessage, "handleMessage");
  }
});

// .svelte-kit/output/server/chunks/server.js
var prerendering = false;
function set_building() {
}
__name(set_building, "set_building");
function set_prerendering() {
  prerendering = true;
}
__name(set_prerendering, "set_prerendering");

// .svelte-kit/output/server/index.js
init_internal2();
async function configure({ building, prerendering: prerendering2, manifest: manifest3, read, assets: assets3, fix_stack_trace: fix_stack_trace2, env: env2 }) {
  if (building) {
    set_building();
    enable_verbose_errors();
  }
  if (prerendering2) set_prerendering();
  if (manifest3) set_manifest(manifest3);
  if (read) set_read_implementation(read);
  if (assets3 !== void 0) set_assets(assets3);
  if (fix_stack_trace2) set_fix_stack_trace(fix_stack_trace2);
  const instance = await Promise.resolve().then(() => (init_instance(), instance_exports));
  if (env2) instance.set_env(env2);
  return instance;
}
__name(configure, "configure");
function create_server(manifest3) {
  let server2;
  return {
    init: /* @__PURE__ */ __name(async ({ env: env2, read }) => {
      server2 = await configure({
        manifest: manifest3,
        env: env2,
        read
      });
      await server2.init();
    }, "init"),
    /** @type {import('types').ServerInstance['respond']} */
    respond: /* @__PURE__ */ __name((request, options2) => server2.respond(request, options2), "respond")
  };
}
__name(create_server, "create_server");

// .svelte-kit/cloudflare-tmp/server.js
var manifest2 = (() => {
  function __memo(fn) {
    let value;
    return () => value ??= value = fn();
  }
  __name(__memo, "__memo");
  return {
    app_dir: "_app",
    app_path: "_app",
    assets: /* @__PURE__ */ new Set(["registration_karo_logo.png"]),
    mime_types: { ".png": "image/png" },
    client: { start: "_app/immutable/entry/start.tkoLXwXp.js", app: "_app/immutable/entry/app.CHQ_uL_I.js", imports: ["_app/immutable/entry/start.tkoLXwXp.js", "_app/immutable/entry/payload.DSmR2FwN.js", "_app/immutable/chunks/DclECHGd.js", "_app/immutable/chunks/Bx7_Nu8E.js", "_app/immutable/chunks/D3tqHbWA.js", "_app/immutable/chunks/CXfzALsx.js", "_app/immutable/chunks/CNQRwAtN.js", "_app/immutable/chunks/DYrviY11.js", "_app/immutable/entry/app.CHQ_uL_I.js"], stylesheets: [], fonts: [], uses_env_dynamic_public: false },
    nodes: [
      __memo(() => Promise.resolve().then(() => (init__(), __exports))),
      __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
      __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
      __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
      __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
      __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
      __memo(() => Promise.resolve().then(() => (init__7(), __exports7))),
      __memo(() => Promise.resolve().then(() => (init__8(), __exports8))),
      __memo(() => Promise.resolve().then(() => (init__9(), __exports9))),
      __memo(() => Promise.resolve().then(() => (init__10(), __exports10))),
      __memo(() => Promise.resolve().then(() => (init__11(), __exports11))),
      __memo(() => Promise.resolve().then(() => (init__12(), __exports12))),
      __memo(() => Promise.resolve().then(() => (init__13(), __exports13))),
      __memo(() => Promise.resolve().then(() => (init__14(), __exports14))),
      __memo(() => Promise.resolve().then(() => (init__15(), __exports15))),
      __memo(() => Promise.resolve().then(() => (init__16(), __exports16))),
      __memo(() => Promise.resolve().then(() => (init__17(), __exports17))),
      __memo(() => Promise.resolve().then(() => (init__18(), __exports18))),
      __memo(() => Promise.resolve().then(() => (init__19(), __exports19)))
    ],
    remotes: {},
    routes: [
      {
        id: "/",
        pattern: /^\/$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 3 },
        endpoint: null
      },
      {
        id: "/admin",
        pattern: /^\/admin\/?$/,
        params: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 4 },
        endpoint: null
      },
      {
        id: "/admin/assessment",
        pattern: /^\/admin\/assessment\/?$/,
        params: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 5 },
        endpoint: null
      },
      {
        id: "/admin/certificates",
        pattern: /^\/admin\/certificates\/?$/,
        params: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 6 },
        endpoint: null
      },
      {
        id: "/admin/cityzone",
        pattern: /^\/admin\/cityzone\/?$/,
        params: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 7 },
        endpoint: null
      },
      {
        id: "/admin/employees",
        pattern: /^\/admin\/employees\/?$/,
        params: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 8 },
        endpoint: null
      },
      {
        id: "/admin/flows",
        pattern: /^\/admin\/flows\/?$/,
        params: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 9 },
        endpoint: null
      },
      {
        id: "/admin/learning",
        pattern: /^\/admin\/learning\/?$/,
        params: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 10 },
        endpoint: null
      },
      {
        id: "/admin/questions",
        pattern: /^\/admin\/questions\/?$/,
        params: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 11 },
        endpoint: null
      },
      {
        id: "/admin/reminders",
        pattern: /^\/admin\/reminders\/?$/,
        params: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 12 },
        endpoint: null
      },
      {
        id: "/admin/reports",
        pattern: /^\/admin\/reports\/?$/,
        params: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 13 },
        endpoint: null
      },
      {
        id: "/admin/scorecards",
        pattern: /^\/admin\/scorecards\/?$/,
        params: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 14 },
        endpoint: null
      },
      {
        id: "/admin/settings",
        pattern: /^\/admin\/settings\/?$/,
        params: [],
        page: { layouts: [0, 2], errors: [1, ,], leaf: 15 },
        endpoint: null
      },
      {
        id: "/api/admin/categories",
        pattern: /^\/api\/admin\/categories\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts(), server_ts_exports)))
      },
      {
        id: "/api/admin/certificates/generate",
        pattern: /^\/api\/admin\/certificates\/generate\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts2(), server_ts_exports2)))
      },
      {
        id: "/api/admin/certificates/[id]/send",
        pattern: /^\/api\/admin\/certificates\/([^/]+?)\/send\/?$/,
        params: [{ "name": "id", "optional": false, "rest": false, "chained": false }],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts3(), server_ts_exports3)))
      },
      {
        id: "/api/admin/clients",
        pattern: /^\/api\/admin\/clients\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts4(), server_ts_exports4)))
      },
      {
        id: "/api/admin/clients/[id]",
        pattern: /^\/api\/admin\/clients\/([^/]+?)\/?$/,
        params: [{ "name": "id", "optional": false, "rest": false, "chained": false }],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts5(), server_ts_exports5)))
      },
      {
        id: "/api/admin/clients/[id]/documents",
        pattern: /^\/api\/admin\/clients\/([^/]+?)\/documents\/?$/,
        params: [{ "name": "id", "optional": false, "rest": false, "chained": false }],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts6(), server_ts_exports6)))
      },
      {
        id: "/api/admin/clients/[id]/documents/[docId]",
        pattern: /^\/api\/admin\/clients\/([^/]+?)\/documents\/([^/]+?)\/?$/,
        params: [{ "name": "id", "optional": false, "rest": false, "chained": false }, { "name": "docId", "optional": false, "rest": false, "chained": false }],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts7(), server_ts_exports7)))
      },
      {
        id: "/api/admin/data/[collection]",
        pattern: /^\/api\/admin\/data\/([^/]+?)\/?$/,
        params: [{ "name": "collection", "optional": false, "rest": false, "chained": false }],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts8(), server_ts_exports8)))
      },
      {
        id: "/api/admin/data/[collection]/[id]",
        pattern: /^\/api\/admin\/data\/([^/]+?)\/([^/]+?)\/?$/,
        params: [{ "name": "collection", "optional": false, "rest": false, "chained": false }, { "name": "id", "optional": false, "rest": false, "chained": false }],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts9(), server_ts_exports9)))
      },
      {
        id: "/api/admin/debug-documents",
        pattern: /^\/api\/admin\/debug-documents\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts10(), server_ts_exports10)))
      },
      {
        id: "/api/admin/debug",
        pattern: /^\/api\/admin\/debug\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts11(), server_ts_exports11)))
      },
      {
        id: "/api/admin/delete-category",
        pattern: /^\/api\/admin\/delete-category\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts12(), server_ts_exports12)))
      },
      {
        id: "/api/admin/documents/[id]/download-url",
        pattern: /^\/api\/admin\/documents\/([^/]+?)\/download-url\/?$/,
        params: [{ "name": "id", "optional": false, "rest": false, "chained": false }],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts13(), server_ts_exports13)))
      },
      {
        id: "/api/admin/migrate-add-clientid",
        pattern: /^\/api\/admin\/migrate-add-clientid\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts14(), server_ts_exports14)))
      },
      {
        id: "/api/admin/migrate-documents",
        pattern: /^\/api\/admin\/migrate-documents\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts15(), server_ts_exports15)))
      },
      {
        id: "/api/admin/reminders",
        pattern: /^\/api\/admin\/reminders\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts16(), server_ts_exports16)))
      },
      {
        id: "/api/admin/reminders/process",
        pattern: /^\/api\/admin\/reminders\/process\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts17(), server_ts_exports17)))
      },
      {
        id: "/api/admin/rename",
        pattern: /^\/api\/admin\/rename\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts18(), server_ts_exports18)))
      },
      {
        id: "/api/admin/reports/chat-access",
        pattern: /^\/api\/admin\/reports\/chat-access\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts19(), server_ts_exports19)))
      },
      {
        id: "/api/admin/reports/clients-summary",
        pattern: /^\/api\/admin\/reports\/clients-summary\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts20(), server_ts_exports20)))
      },
      {
        id: "/api/admin/reports/employee",
        pattern: /^\/api\/admin\/reports\/employee\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts21(), server_ts_exports21)))
      },
      {
        id: "/api/admin/reports/regrade",
        pattern: /^\/api\/admin\/reports\/regrade\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts22(), server_ts_exports22)))
      },
      {
        id: "/api/admin/test-firebase",
        pattern: /^\/api\/admin\/test-firebase\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts23(), server_ts_exports23)))
      },
      {
        id: "/api/admin/upload-url",
        pattern: /^\/api\/admin\/upload-url\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts24(), server_ts_exports24)))
      },
      {
        id: "/api/admin/video-deliveries",
        pattern: /^\/api\/admin\/video-deliveries\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts25(), server_ts_exports25)))
      },
      {
        id: "/api/auth/login",
        pattern: /^\/api\/auth\/login\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts26(), server_ts_exports26)))
      },
      {
        id: "/api/auth/verify",
        pattern: /^\/api\/auth\/verify\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts27(), server_ts_exports27)))
      },
      {
        id: "/api/cron/reminders",
        pattern: /^\/api\/cron\/reminders\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts28(), server_ts_exports28)))
      },
      {
        id: "/api/webhook",
        pattern: /^\/api\/webhook\/?$/,
        params: [],
        page: null,
        endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts29(), server_ts_exports29)))
      },
      {
        id: "/delete-data",
        pattern: /^\/delete-data\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 16 },
        endpoint: null
      },
      {
        id: "/privacy",
        pattern: /^\/privacy\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 17 },
        endpoint: null
      },
      {
        id: "/terms",
        pattern: /^\/terms\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 18 },
        endpoint: null
      }
    ],
    prerendered_routes: /* @__PURE__ */ new Set([]),
    matchers: /* @__PURE__ */ __name(async () => {
      return {};
    }, "matchers"),
    server_assets: {}
  };
})();
var server = create_server(manifest2);

// .svelte-kit/cloudflare/_worker.js
import { env } from "cloudflare:workers";
var base_path = "";
var assets2 = /* @__PURE__ */ new Set(["registration_karo_logo.png"]);
var prerendered = /* @__PURE__ */ new Set([]);
var immutable = `/${"_app"}/immutable/`;
var version_file = `/${"_app"}/version.json`;
var origin;
var initialized = server.init({
  env,
  read: /* @__PURE__ */ __name(async (file) => {
    const url2 = `${origin}/${file}`;
    const response = await env.ASSETS.fetch(url2);
    if (!response.ok) {
      throw new Error(
        `read(...) failed: could not fetch ${url2} (${response.status} ${response.statusText})`
      );
    }
    return response.body;
  }, "read")
});
var worker_default = {
  async fetch(req, env2) {
    if (!origin) {
      origin = new URL(req.url).origin;
    }
    await initialized;
    let { pathname, search } = new URL(req.url);
    try {
      pathname = decodeURIComponent(pathname);
    } catch {
    }
    const stripped_pathname = pathname.replace(/\/$/, "");
    let is_static_asset = false;
    const filename = stripped_pathname.slice(base_path.length + 1);
    if (filename) {
      is_static_asset = assets2.has(filename) || assets2.has(filename + "/index.html");
    }
    let location = pathname.at(-1) === "/" ? stripped_pathname : pathname + "/";
    if (is_static_asset || prerendered.has(pathname) || pathname === version_file || pathname.startsWith(immutable)) {
      let res = await env2.ASSETS.fetch(req);
      if (res.status >= 400) {
        res = new Response(res.body, res);
        res.headers.set("cache-control", "no-store");
      }
      return res;
    }
    if (location && prerendered.has(location)) {
      if (search) location += search;
      return new Response("", {
        status: 308,
        headers: {
          location
        }
      });
    }
    return await server.respond(req, {
      getClientAddress() {
        return (
          /** @type {string} */
          req.headers.get("cf-connecting-ip")
        );
      }
    });
  }
};
async function scheduled(event, env2, ctx) {
  console.log("cron: scheduled fired", (/* @__PURE__ */ new Date()).toISOString());
  if (!env2.CRON_SECRET) {
    console.error("CRON_SECRET is not set \u2014 run: npx wrangler secret put CRON_SECRET");
    return;
  }
  await initialized;
  const url2 = new URL("/api/cron/reminders", "https://cron.internal");
  url2.searchParams.set("secret", env2.CRON_SECRET);
  try {
    const res = await server.respond(new Request(url2), {
      getClientAddress: /* @__PURE__ */ __name(() => "127.0.0.1", "getClientAddress")
    });
    console.log("cron: reminders route responded", res.status);
    if (!res.ok) console.error("cron run failed:", res.status, await res.text());
  } catch (error2) {
    console.error("cron run failed:", error2);
    throw error2;
  }
}
__name(scheduled, "scheduled");
export {
  worker_default as default,
  scheduled
};
//# sourceMappingURL=_worker.js.map
