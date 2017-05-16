import * as d3Hierarchy from 'd3-hierarchy'

export const FETCH_NETWORK = 'FETCH_NETWORK'
const fetchNetwork = url => {
  return {
    type: FETCH_NETWORK,
    url
  }
}

export const RECEIVE_NETWORK = 'RECEIVE_NETWORK'
const receiveNetwork = (url, json) => {

  return {
    type: RECEIVE_NETWORK,
    url,
    network: json
  }
}

const fetchNet = url => {
  return fetch(url)
}

/**
* remove unnecessary edges for visualization
*/
const filterEdges = network => {
  const edges = []
  network.elements.edges.forEach(edge => {
    if (edge.data.Is_Tree_Edge === 'Tree') {
      edges.push(edge)
    }
  })

  network.elements.edges = edges
  return network
}


export const fetchNetworkFromUrl = url => {

  return dispatch => {
    dispatch(fetchNetwork(url))

    return fetchNet(url)
      .then(response => (response.json()))
      .then(rawCyjs => (filterEdges(rawCyjs)))
      .then(json => (layout(json)))
      .then(network => dispatch(receiveNetwork(url, network)))
  }
}


const findRoot = network => {
  const nodes = network.elements.nodes

  for (let i=0; i<nodes.length; i++) {
    const node = nodes[i]
    const isRoot = node.data.isRoot
    const name = node.data.name

    if (isRoot) {
      return node.data.id
    }
  }

  return null
}


const layout = network => {

  const rootNodeId = findRoot(network)
  if (rootNodeId === null) {
    console.log('FAILED!!!!!!!!!!!!!!!!!!!!!!!!! Root Node not found: ')
    // Return network as-is
    return network
  }

  console.log('Root Node found: ' + rootNodeId)

  const layoutMap = getTree(rootNodeId, network)
  return applyLayout(layoutMap, network)
}


const getTree = (rootId, tree) => {

  const csv = []
  csv.push({
    name: rootId,
    parent: ""
  })

  const edges = tree.elements.edges
  edges.forEach(edge => {
    const source = edge.data.source
    const target = edge.data.target

    csv.push({
      name: source,
      parent: target
    })
  })

  console.log('********** ROOT: ' + rootId)

  const d3tree = d3Hierarchy
    .stratify()
    .id(function(d) {
      return d.name;
    })
    .parentId(function(d) {
      return d.parent;
    })(csv);

  console.log(d3tree)

  var layout = d3Hierarchy
    .cluster()
    .size([360, 390])
    .separation(function(a, b) {
      return (a.parent == b.parent ?
        1 :
        2) / a.depth;
    });

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
    if (position !== undefined) {
      const newPos = project(position[0], position[1])
      node.position.x = newPos[0] * 15.5
      node.position.y = newPos[1] * 15.5
    } else {
      console.log('ERRRRRRRRRRRR: ' + node.data.id)
    }
  })

  return network
}

const project = (x, y) => {
  const angle = (x - 90) / 180 * Math.PI
  const radius = y
  return [
    radius * Math.cos(angle),
    radius * Math.sin(angle)
  ];
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

  fetch(url, {
      method: "POST"
    })
    .then(response => (response.json()))
    .then(json => {
      dispatch(receiveNetwork(url, json))
    })
}

export const DELETE_NETWORK = 'DELETE_NETWORK'
const deleteNetwork = url => {
  return {
    type: DELETE_NETWORK,
    url
  }
}
