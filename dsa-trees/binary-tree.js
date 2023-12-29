/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    function minDepthHelper(node) {
      if (!node) {
        return 0;
      }

      if (!node.left && !node.right) {
        return 1;
      }

      if (!node.left) {
        return 1 + minDepthHelper(node.right);
      }

      if (!node.right) {
        return 1 + minDepthHelper(node.left);
      }

      return 1 + Math.min(minDepthHelper(node.left), minDepthHelper(node.right));
    }

    return minDepthHelper(this.root);

  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    function maxDepthHelper(node) {
      if (!node) {
        return 0;
      }

      return 1 + Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right));
    }

    return maxDepthHelper(this.root);

  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    function maxSumHelper(node) {
      if (!node) {
        return 0;
      }

      const leftMax = Math.max(0, maxSumHelper(node.left));
      const rightMax = Math.max(0, maxSumHelper(node.right));

      return Math.max(leftMax, rightMax) + node.val;
    }

    return maxSumHelper(this.root);
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    function findSuccessor(node, target, successor) {
      if (!node) {
        return successor;
      }

      if (node.val > target) {
        return findSuccessor(node.left, target, node.val);
      } else {
        return findSuccessor(node.right, target, successor);
      }
    }

    return findSuccessor(this.root, lowerBound, null);

  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    function findDepthAndParent(node, targert, depth, parent) {
      if (!node) {
        return null;
      }

      if (node.val === target) {
        return { depth, parent };
      }

      const leftResult = findDepthAndParent(node.left, target, depth + 1, node);
      const rightResult = findDepthAndParent(node.right, target, depth + 1, node);

      return leftResult || rightResult;
    }

    const resultNode1 = findDepthAndParent(this.root, node1, 1, null);
    const resultNode2 = findDepthAndParent(this.root, node2, 1, null);

    return (
      resultNode1 &&
      resultNode2 &&
      resultNode1.depth === resultNode2.depth &&
      resultNode1.parent !== resultNode2.parent
    );

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    function serializeHelper(node) {
      if (!node) {
        return 'null';
      }

      const leftSerialized = serializeHelper(node.left);
      const rightSerialized = serializeHelper(node.right);

      return `${node.val},${leftSerialized},${rightSerialized}`;
    }

    return serializeHelper(tree.root);

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    function deserializeHelper(values) {
      const val = values.shift();

      if (val === 'null') {
        return null;
      }

      const node = new BinaryTreeNode(Number(val));
      node.left = deserializeHelper(values);
      node.right = deserializeHelper(values);

      return node;
    }

    const values = stringTree.split(',');
    return new BinaryTree(deserializeHelper(values));

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    function findLowestCommonAncestor(node, p, q) {
      if (!node || node === p || node === q) {
        return node;
      }

      const left = findLowestCommonAncestor(node.left, p, q);
      const right = findLowestCommonAncestor(node.right, p, q);

      if (left && right) {
        return node;
      }

      return left || right;
    }

    return findLowestCommonAncestor(this.root, node1, node2);
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
