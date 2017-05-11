import * as d3Hierarchy from 'd3-hierarchy'

export const FETCH_NETWORK = 'FETCH_NETWORK'
const fetchNetwork = url => {
  return {type: FETCH_NETWORK, url}
}

export const RECEIVE_NETWORK = 'RECEIVE_NETWORK'
const receiveNetwork = (url, json) => {

  return {type: RECEIVE_NETWORK, url, network: json}
}

const fetchNet = url => {
  return fetch(url)
}

export const fetchNetworkFromUrl = url => {

  return dispatch => {
    dispatch(fetchNetwork(url))

    return fetchNet(url)
      .then(response => (response.json()))
      .then(json => (layout(json)))
      .then(network => dispatch(receiveNetwork(url, network)))
  }
}

const layout = network => {

  const layoutMap = getTree('CLIXO:141', network)
  return applyLayout(layoutMap, network)
}

const getTree = (root, tree) => {

  const nodes = tree.elements.nodes
  let rootId = null;

  for (let node of nodes) {
    if (node.data.name === root) {
      rootId = node.data.id
      break
    }
  }

  const csv = []
  csv.push({name: rootId, parent: ""})

  const edges = tree.elements.edges
  edges.forEach(edge => {
    const source = edge.data.source
    const target = edge.data.target

    csv.push({name: source, parent: target})
  })

  console.log('********** ROOT: ' + rootId)
  const d3tree = d3Hierarchy.stratify().id(function(d) {
    return d.name;
  }).parentId(function(d) {
    return d.parent;
  })(csv);

  console.log(d3tree)

  // const layout = d3Hierarchy.tree().size([700, 700]).separation(function(a, b) {
  //   return (a.parent == b.parent
  //     ? 1
  //     : 2) / a.depth;
  // });

  var layout = d3Hierarchy.cluster()
    .size([360, 390])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

  layout(d3tree)
  console.log('---------- Done! -------------')
  console.log(d3tree)

  const layoutMap = {}
  walk(d3tree, layoutMap)

  console.log(layoutMap)
  return layoutMap
}

const applyLayout = (layoutMap, network) => {
  const nodes = network.elements.nodes
  nodes.forEach(node => {
    const position = layoutMap[node.data.id]
    if(position !== undefined) {
      const newPos = project(position[0], position[1])
      node.position.x = newPos[0]* 2.5
      node.position.y = newPos[1] * 2.5
    } else {
      console.log('ERRRRRRRRRRRR: ' + node.data.id)
    }
  })

  return network
}

const project = (x, y) => {
  const angle = (x - 90) / 180 * Math.PI
  const radius = y
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

const walk = (node, layoutMap) => {

  layoutMap[node.id] = [node.x, node.y]

  const children = node.children

  if (children === undefined || children.length === 0) {
    return
  } else {
    children.forEach(child => walk(child, layoutMap))
  }
}

export const idMapping = json => {

  fetch(url, {method: "POST"}).then(response => (response.json())).then(json => {
    dispatch(receiveNetwork(url, json))
  })
}

export const DELETE_NETWORK = 'DELETE_NETWORK'
const deleteNetwork = url => {
  return {type: DELETE_NETWORK, url}
}
