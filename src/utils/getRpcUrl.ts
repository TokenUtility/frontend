import random from "lodash/random";

// Array of available nodes to connect to
export const nodes = [
  process.env.NEXT_PUBLIC_NODE_1,
  process.env.NEXT_PUBLIC_NODE_2,
  process.env.NEXT_PUBLIC_NODE_3,
];

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1);
  return nodes[randomIndex];
};

export default getNodeUrl;
