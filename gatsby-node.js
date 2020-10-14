const https = require("https");
const axios = require("axios");
const getGraphqlNode = require("./GetGraphqlNode");
const fs = require("fs");

exports.sourceNodes = async (nodeActions, configOptions) => {
	const { createNode } = nodeActions.actions;
	delete configOptions.plugins;

	const shouldCreateNode =
		configOptions.createNode === undefined
			? true
			: configOptions.createNode;

	const method =
		configOptions.method === undefined ? "get" : configOptions.method;

	const url =
		configOptions.url instanceof Function
			? await configOptions.url()
			: configOptions.url;

	axios({
		httpsAgent: new https.Agent({ rejectUnauthorized: false }),
		method: method.toLowerCase(),
		url: url,
		responseType: configOptions.saveTo ? "stream" : undefined,
		...configOptions.axiosConfig,
	}).then(res => {
		if (configOptions.saveTo) {
			res.data.pipe(fs.createWriteStream(configOptions.saveTo));
		}

		if (shouldCreateNode === true) {
			const data = {};
			data[configOptions.type] = res.data;

			const nodeData = getGraphqlNode(
				nodeActions,
				configOptions.name,
				data
			);
			createNode(nodeData);
		}
	});

	return;
};
