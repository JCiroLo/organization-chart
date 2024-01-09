function TreeNode({ name, attributes, children = [] }) {
  this.name = name;
  this.attributes = attributes;
  this.children = children;
}

TreeNode.prototype = {
  hasChildren: function () {
    return this.children.length > 0;
  },
  get: function () {
    return {
      name: this.name,
      attributes: this.attributes,
      children: this.children,
    };
  },
};

export default TreeNode;
