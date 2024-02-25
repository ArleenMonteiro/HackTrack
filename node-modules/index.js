"use strict";
// File generated from our OpenAPI spec by Stainless.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFromPath = exports.toFile = exports.UnprocessableEntityError = exports.PermissionDeniedError = exports.InternalServerError = exports.AuthenticationError = exports.BadRequestError = exports.RateLimitError = exports.ConflictError = exports.NotFoundError = exports.APIUserAbortError = exports.APIConnectionTimeoutError = exports.APIConnectionError = exports.APIError = exports.AnthropicError = exports.AI_PROMPT = exports.HUMAN_PROMPT = exports.Anthropic = void 0;
const Core = __importStar(require("./core.js"));
const Errors = __importStar(require("./error.js"));
const Uploads = __importStar(require("./uploads.js"));
const API = __importStar(require("@anthropic-ai/sdk/resources/index"));
/** API Client for interfacing with the Anthropic API. */
class Anthropic extends Core.APIClient {
    /**
     * API Client for interfacing with the Anthropic API.
     *
     * @param {string | null} [opts.apiKey==process.env['ANTHROPIC_API_KEY'] ?? null]
     * @param {string | null} [opts.authToken==process.env['ANTHROPIC_AUTH_TOKEN'] ?? null]
     * @param {string} [opts.baseURL] - Override the default base URL for the API.
     * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
     * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
     * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
     * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
     * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
     * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
     */
    constructor({ apiKey = Core.readEnv('ANTHROPIC_API_KEY') ?? null, authToken = Core.readEnv('ANTHROPIC_AUTH_TOKEN') ?? null, ...opts } = {}) {
        const options = {
            apiKey,
            authToken,
            ...opts,
            baseURL: opts.baseURL ?? `https://api.anthropic.com`,
        };
        super({
            baseURL: options.baseURL,
            timeout: options.timeout ?? 600000 /* 10 minutes */,
            httpAgent: options.httpAgent,
            maxRetries: options.maxRetries,
            fetch: options.fetch,
        });
        this.completions = new API.Completions(this);
        this._options = options;
        this.apiKey = apiKey;
        this.authToken = authToken;
    }
    defaultQuery() {
        return this._options.defaultQuery;
    }
    defaultHeaders(opts) {
        return {
            ...super.defaultHeaders(opts),
            'anthropic-version': '2023-06-01',
            ...this._options.defaultHeaders,
        };
    }
    validateHeaders(headers, customHeaders) {
        if (this.apiKey && headers['X-Api-Key']) {
            return;
        }
        if (customHeaders['X-Api-Key'] === null) {
            return;
        }
        if (this.authToken && headers['Authorization']) {
            return;
        }
        if (customHeaders['Authorization'] === null) {
            return;
        }
        throw new Error('Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted');
    }
    authHeaders(opts) {
        const apiKeyAuth = this.apiKeyAuth(opts);
        const bearerAuth = this.bearerAuth(opts);
        if (apiKeyAuth != null && !Core.isEmptyObj(apiKeyAuth)) {
            return apiKeyAuth;
        }
        if (bearerAuth != null && !Core.isEmptyObj(bearerAuth)) {
            return bearerAuth;
        }
        return {};
    }
    apiKeyAuth(opts) {
        if (this.apiKey == null) {
            return {};
        }
        return { 'X-Api-Key': this.apiKey };
    }
    bearerAuth(opts) {
        if (this.authToken == null) {
            return {};
        }
        return { Authorization: `Bearer ${this.authToken}` };
    }
}
exports.Anthropic = Anthropic;
_a = Anthropic;
Anthropic.Anthropic = _a;
Anthropic.HUMAN_PROMPT = '\n\nHuman:';
Anthropic.AI_PROMPT = '\n\nAssistant:';
Anthropic.AnthropicError = Errors.AnthropicError;
Anthropic.APIError = Errors.APIError;
Anthropic.APIConnectionError = Errors.APIConnectionError;
Anthropic.APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
Anthropic.APIUserAbortError = Errors.APIUserAbortError;
Anthropic.NotFoundError = Errors.NotFoundError;
Anthropic.ConflictError = Errors.ConflictError;
Anthropic.RateLimitError = Errors.RateLimitError;
Anthropic.BadRequestError = Errors.BadRequestError;
Anthropic.AuthenticationError = Errors.AuthenticationError;
Anthropic.InternalServerError = Errors.InternalServerError;
Anthropic.PermissionDeniedError = Errors.PermissionDeniedError;
Anthropic.UnprocessableEntityError = Errors.UnprocessableEntityError;
exports.HUMAN_PROMPT = Anthropic.HUMAN_PROMPT, exports.AI_PROMPT = Anthropic.AI_PROMPT;
exports.AnthropicError = Errors.AnthropicError, exports.APIError = Errors.APIError, exports.APIConnectionError = Errors.APIConnectionError, exports.APIConnectionTimeoutError = Errors.APIConnectionTimeoutError, exports.APIUserAbortError = Errors.APIUserAbortError, exports.NotFoundError = Errors.NotFoundError, exports.ConflictError = Errors.ConflictError, exports.RateLimitError = Errors.RateLimitError, exports.BadRequestError = Errors.BadRequestError, exports.AuthenticationError = Errors.AuthenticationError, exports.InternalServerError = Errors.InternalServerError, exports.PermissionDeniedError = Errors.PermissionDeniedError, exports.UnprocessableEntityError = Errors.UnprocessableEntityError;
exports.toFile = Uploads.toFile;
exports.fileFromPath = Uploads.fileFromPath;
(function (Anthropic) {
    // Helper functions
    Anthropic.toFile = Uploads.toFile;
    Anthropic.fileFromPath = Uploads.fileFromPath;
    Anthropic.Completions = API.Completions;
})(Anthropic = exports.Anthropic || (exports.Anthropic = {}));
exports = module.exports = Anthropic;
exports.default = Anthropic;
//# sourceMappingURL=index.js.map