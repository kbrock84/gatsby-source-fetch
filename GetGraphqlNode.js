const { v4: uuid } = require("uuid");

module.exports = (nodeActions, nodeType, data, content) => {
	const { createNodeId, createContentDigest } = nodeActions;

	const nodeId = createNodeId(`${uuid()}`);
	const nodeData = Object.assign({}, data, {
		id: nodeId,
		parent: null,
		children: [],
		internal: {
			type: nodeType,
			content: content,
			contentDigest: createContentDigest(data),
		},
	});
	return nodeData;
};
