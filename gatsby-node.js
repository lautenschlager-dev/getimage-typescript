const fetch = require(`node-fetch`);
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

const EXAMPLE_NODE_TYPE = `exampleImage`

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions

  const data = await fetch(
    `https://jsonplaceholder.typicode.com/photos/1`
  );
  const dataJson = await data.json();

  createNode({
    ...dataJson,
    id: createNodeId(`${EXAMPLE_NODE_TYPE}-${dataJson.id}`),
    parent: null,
    children: [],
    internal: {
      type: EXAMPLE_NODE_TYPE,
      content: JSON.stringify(dataJson),
      contentDigest: createContentDigest(dataJson),
    },
  })
  return
};


// called each time a node is created
exports.onCreateNode = async ({
  node, // the node that was just created
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
  console.log(node.internal.type)
  if (node.internal.type === EXAMPLE_NODE_TYPE) {
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      url: `https://picsum.photos/200/300`,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    })
    if (fileNode) {
      createNodeField({ node, name: 'remoteImage', value: fileNode.id })
    }
  }

}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type ${EXAMPLE_NODE_TYPE} implements Node {
      remoteImage: File @link(from: "fields.remoteImage")
    }
  `)
}