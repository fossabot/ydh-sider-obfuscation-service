const autoLoad = require("fastify-autoload");
const fp = require("fastify-plugin");
const path = require("path");

// Import plugins
const cors = require("fastify-cors");
const helmet = require("fastify-helmet");
const helmConfig = require("helmet");
const disableCache = require("fastify-disablecache");
const swagger = require("fastify-swagger");

// Import healthcheck route
const healthCheck = require("./routes/healthcheck");

/**
 * @author Frazer Smith
 * @description Build Fastify instance
 * @param {Function} server - Fastify instance.
 * @param {object} config - Fastify configuration values
 */
async function plugin(server, config) {
	if (config.isProduction === false) {
		server
			.register(swagger, config.swagger)
			.register(helmet, (instance) => ({
				contentSecurityPolicy: {
					directives: {
						...helmConfig.contentSecurityPolicy.getDefaultDirectives(),
						"form-action": ["'self'"],
						"img-src": ["'self'", "data:", "validator.swagger.io"],
						"script-src": ["'self'"].concat(
							instance.swaggerCSP.script
						),
						"style-src": ["'self'", "https:"].concat(
							instance.swaggerCSP.style
						),
					},
				},
			}));
	} else {
		// Use Helmet to set response security headers: https://helmetjs.github.io/
		server.register(helmet, () => ({
			contentSecurityPolicy: {
				directives: {
					...helmConfig.contentSecurityPolicy.getDefaultDirectives(),
					"form-action": ["'self'"],
				},
			},
		}));
	}

	// Enable plugins
	server
		// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
		.register(cors, config.cors)

		.register(disableCache)
		.register(healthCheck)

		/**
		 * Encapsulate plugins and routes into secured child context, so that swagger
		 * route doesn't inherit Keycloak plugin
		 */
		.register(async (securedContext) => {
			securedContext
				.register(autoLoad, {
					dir: path.join(__dirname, "plugins"),
					options: config,
				})
				// Import and register service routes
				.register(autoLoad, {
					dir: path.join(__dirname, "routes"),
					ignorePattern: /healthcheck/,
					options: config,
				});
		});
}

module.exports = fp(plugin);
