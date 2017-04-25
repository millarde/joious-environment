# joious-environment

Example node.js config approach for separation of concerns and environment validation. See longer description at my Medium blog: https://medium.com/@millard3/a-joi-ous-environment-2b561e2133ea

Motivations:
 - separate config from application (see https://12factor.net/config)
 - validate configuration and fail quickly
 - support at least dev/prod (and make dev easier, so .env, locally)
 - provide separation of concerns for config of different components
 - bring all config into one place so it's easy to see/manage

Official 12 factor approach is to use environment variables, so let's use those, while providing several avenues for instantiating them.

To use: clone locally, `npm init` to install dependencies, `npm test` to run tests. Requires Node 6.x.

The app currently short-circuits in index.js, just dumping the environment to the console and exiting (it doesn't need to do anything nore to demonstrate the config) so `npm start` isn't particularly interesting.

Inspiration: https://blog.risingstack.com/node-js-project-structure-tutorial-node-js-at-scale/
and wanted to pull out and highlight the configuration aspect. The post includes more than just config and worth reading. [Small error in post: joi.allow is in addition to other values. To restrict, need to use joi.valid (creates proper whitelist).]

Also interesting:
http://www.tandrewnichols.me/running-multi-environment-apps-in-node-js/

Also looked at nsconf (pointed out by my friend @rmg who uses it with mktmp.io), another good option but I really wanted to have the general validation and enable the split config that might be helpful for larger projects (or just general tidiness).

As always, thanks to @rmg for his comments and suggestions.
