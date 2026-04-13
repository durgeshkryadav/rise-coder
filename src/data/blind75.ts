/**
 * Blind 75 — Curated list of top 75 LeetCode problems.
 * Organised by week following the Grind 75 weekly schedule.
 */

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Blind75Problem {
  id: string;
  /** 1-based display number */
  number: number;
  title: string;
  difficulty: Difficulty;
  /** Estimated time in minutes */
  time: number;
  /** Topic / data-structure tag */
  tag: string;
  /** LeetCode URL */
  url: string;
}

export interface Blind75Week {
  week: number;
  title: string;
  problems: Blind75Problem[];
}

/* ────────────────────────────────────────────────── */

const blind75Data: Blind75Week[] = [
  {
    week: 1,
    title: 'Week 1',
    problems: [
      { id: 'b75-1', number: 1, title: 'Two Sum', difficulty: 'Easy', time: 15, tag: 'Array', url: 'https://leetcode.com/problems/two-sum/' },
      { id: 'b75-2', number: 2, title: 'Valid Parentheses', difficulty: 'Easy', time: 20, tag: 'Stack', url: 'https://leetcode.com/problems/valid-parentheses/' },
      { id: 'b75-3', number: 3, title: 'Merge Two Sorted Lists', difficulty: 'Easy', time: 20, tag: 'Linked List', url: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
      { id: 'b75-4', number: 4, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', time: 20, tag: 'Array', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
      { id: 'b75-5', number: 5, title: 'Valid Palindrome', difficulty: 'Easy', time: 15, tag: 'String', url: 'https://leetcode.com/problems/valid-palindrome/' },
      { id: 'b75-6', number: 6, title: 'Invert Binary Tree', difficulty: 'Easy', time: 15, tag: 'Binary Tree', url: 'https://leetcode.com/problems/invert-binary-tree/' },
      { id: 'b75-7', number: 7, title: 'Valid Anagram', difficulty: 'Easy', time: 15, tag: 'String', url: 'https://leetcode.com/problems/valid-anagram/' },
      { id: 'b75-8', number: 8, title: 'Lowest Common Ancestor of a Binary Search Tree', difficulty: 'Easy', time: 20, tag: 'Binary Search Tree', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/' },
    ],
  },
  {
    week: 2,
    title: 'Week 2',
    problems: [
      { id: 'b75-9', number: 9, title: 'Contains Duplicate', difficulty: 'Easy', time: 15, tag: 'Array', url: 'https://leetcode.com/problems/contains-duplicate/' },
      { id: 'b75-10', number: 10, title: 'Group Anagrams', difficulty: 'Medium', time: 30, tag: 'Array', url: 'https://leetcode.com/problems/group-anagrams/' },
      { id: 'b75-11', number: 11, title: 'Top K Frequent Elements', difficulty: 'Medium', time: 25, tag: 'Array', url: 'https://leetcode.com/problems/top-k-frequent-elements/' },
      { id: 'b75-12', number: 12, title: 'Encode and Decode Strings', difficulty: 'Medium', time: 25, tag: 'String', url: 'https://leetcode.com/problems/encode-and-decode-strings/' },
      { id: 'b75-13', number: 13, title: 'Product of Array Except Self', difficulty: 'Medium', time: 30, tag: 'Array', url: 'https://leetcode.com/problems/product-of-array-except-self/' },
      { id: 'b75-14', number: 14, title: 'Longest Consecutive Sequence', difficulty: 'Medium', time: 30, tag: 'Array', url: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
    ],
  },
  {
    week: 3,
    title: 'Week 3',
    problems: [
      { id: 'b75-15', number: 15, title: 'Three Sum', difficulty: 'Medium', time: 30, tag: 'Array', url: 'https://leetcode.com/problems/3sum/' },
      { id: 'b75-16', number: 16, title: 'Container With Most Water', difficulty: 'Medium', time: 35, tag: 'Array', url: 'https://leetcode.com/problems/container-with-most-water/' },
      { id: 'b75-17', number: 17, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', time: 30, tag: 'String', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
      { id: 'b75-18', number: 18, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', time: 30, tag: 'Array', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
      { id: 'b75-19', number: 19, title: 'Combination Sum', difficulty: 'Medium', time: 30, tag: 'Array', url: 'https://leetcode.com/problems/combination-sum/' },
      { id: 'b75-20', number: 20, title: 'Number of Islands', difficulty: 'Medium', time: 25, tag: 'Graph', url: 'https://leetcode.com/problems/number-of-islands/' },
    ],
  },
  {
    week: 4,
    title: 'Week 4',
    problems: [
      { id: 'b75-21', number: 21, title: 'Reverse Linked List', difficulty: 'Easy', time: 20, tag: 'Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/' },
      { id: 'b75-22', number: 22, title: 'Linked List Cycle', difficulty: 'Easy', time: 20, tag: 'Linked List', url: 'https://leetcode.com/problems/linked-list-cycle/' },
      { id: 'b75-23', number: 23, title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', time: 15, tag: 'Binary Tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
      { id: 'b75-24', number: 24, title: 'Same Tree', difficulty: 'Easy', time: 20, tag: 'Binary Tree', url: 'https://leetcode.com/problems/same-tree/' },
      { id: 'b75-25', number: 25, title: 'Subtree of Another Tree', difficulty: 'Easy', time: 20, tag: 'Binary Tree', url: 'https://leetcode.com/problems/subtree-of-another-tree/' },
      { id: 'b75-26', number: 26, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', time: 20, tag: 'Binary Tree', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
    ],
  },
  {
    week: 5,
    title: 'Week 5',
    problems: [
      { id: 'b75-27', number: 27, title: 'Validate Binary Search Tree', difficulty: 'Medium', time: 20, tag: 'Binary Search Tree', url: 'https://leetcode.com/problems/validate-binary-search-tree/' },
      { id: 'b75-28', number: 28, title: 'Kth Smallest Element in a BST', difficulty: 'Medium', time: 25, tag: 'Binary Search Tree', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/' },
      { id: 'b75-29', number: 29, title: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'Medium', time: 25, tag: 'Binary Tree', url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/' },
      { id: 'b75-30', number: 30, title: 'Maximum Subarray', difficulty: 'Medium', time: 20, tag: 'Dynamic Programming', url: 'https://leetcode.com/problems/maximum-subarray/' },
      { id: 'b75-31', number: 31, title: 'Jump Game', difficulty: 'Medium', time: 20, tag: 'Dynamic Programming', url: 'https://leetcode.com/problems/jump-game/' },
      { id: 'b75-32', number: 32, title: 'Clone Graph', difficulty: 'Medium', time: 25, tag: 'Graph', url: 'https://leetcode.com/problems/clone-graph/' },
    ],
  },
  {
    week: 6,
    title: 'Week 6',
    problems: [
      { id: 'b75-33', number: 33, title: 'Insert Interval', difficulty: 'Medium', time: 25, tag: 'Array', url: 'https://leetcode.com/problems/insert-interval/' },
      { id: 'b75-34', number: 34, title: 'Merge Intervals', difficulty: 'Medium', time: 30, tag: 'Array', url: 'https://leetcode.com/problems/merge-intervals/' },
      { id: 'b75-35', number: 35, title: 'Non-overlapping Intervals', difficulty: 'Medium', time: 20, tag: 'Array', url: 'https://leetcode.com/problems/non-overlapping-intervals/' },
      { id: 'b75-36', number: 36, title: 'Meeting Rooms', difficulty: 'Easy', time: 15, tag: 'Array', url: 'https://leetcode.com/problems/meeting-rooms/' },
      { id: 'b75-37', number: 37, title: 'Meeting Rooms II', difficulty: 'Medium', time: 20, tag: 'Array', url: 'https://leetcode.com/problems/meeting-rooms-ii/' },
      { id: 'b75-38', number: 38, title: 'Spiral Matrix', difficulty: 'Medium', time: 25, tag: 'Matrix', url: 'https://leetcode.com/problems/spiral-matrix/' },
    ],
  },
  {
    week: 7,
    title: 'Week 7',
    problems: [
      { id: 'b75-39', number: 39, title: 'Set Matrix Zeroes', difficulty: 'Medium', time: 25, tag: 'Matrix', url: 'https://leetcode.com/problems/set-matrix-zeroes/' },
      { id: 'b75-40', number: 40, title: 'Rotate Image', difficulty: 'Medium', time: 25, tag: 'Matrix', url: 'https://leetcode.com/problems/rotate-image/' },
      { id: 'b75-41', number: 41, title: 'Word Search', difficulty: 'Medium', time: 30, tag: 'Matrix', url: 'https://leetcode.com/problems/word-search/' },
      { id: 'b75-42', number: 42, title: 'Longest Palindromic Substring', difficulty: 'Medium', time: 25, tag: 'String', url: 'https://leetcode.com/problems/longest-palindromic-substring/' },
      { id: 'b75-43', number: 43, title: 'Palindromic Substrings', difficulty: 'Medium', time: 25, tag: 'String', url: 'https://leetcode.com/problems/palindromic-substrings/' },
      { id: 'b75-44', number: 44, title: 'Climbing Stairs', difficulty: 'Easy', time: 20, tag: 'Dynamic Programming', url: 'https://leetcode.com/problems/climbing-stairs/' },
    ],
  },
  {
    week: 8,
    title: 'Week 8',
    problems: [
      { id: 'b75-45', number: 45, title: 'Coin Change', difficulty: 'Medium', time: 25, tag: 'Dynamic Programming', url: 'https://leetcode.com/problems/coin-change/' },
      { id: 'b75-46', number: 46, title: 'House Robber', difficulty: 'Medium', time: 25, tag: 'Dynamic Programming', url: 'https://leetcode.com/problems/house-robber/' },
      { id: 'b75-47', number: 47, title: 'House Robber II', difficulty: 'Medium', time: 25, tag: 'Dynamic Programming', url: 'https://leetcode.com/problems/house-robber-ii/' },
      { id: 'b75-48', number: 48, title: 'Decode Ways', difficulty: 'Medium', time: 25, tag: 'Dynamic Programming', url: 'https://leetcode.com/problems/decode-ways/' },
      { id: 'b75-49', number: 49, title: 'Unique Paths', difficulty: 'Medium', time: 20, tag: 'Dynamic Programming', url: 'https://leetcode.com/problems/unique-paths/' },
      { id: 'b75-50', number: 50, title: 'Longest Common Subsequence', difficulty: 'Medium', time: 25, tag: 'Dynamic Programming', url: 'https://leetcode.com/problems/longest-common-subsequence/' },
    ],
  },
  {
    week: 9,
    title: 'Week 9',
    problems: [
      { id: 'b75-51', number: 51, title: 'Word Break', difficulty: 'Medium', time: 30, tag: 'Dynamic Programming', url: 'https://leetcode.com/problems/word-break/' },
      { id: 'b75-52', number: 52, title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', time: 35, tag: 'Trie', url: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
      { id: 'b75-53', number: 53, title: 'Design Add and Search Words Data Structure', difficulty: 'Medium', time: 30, tag: 'Trie', url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
      { id: 'b75-54', number: 54, title: 'Pacific Atlantic Water Flow', difficulty: 'Medium', time: 30, tag: 'Graph', url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
      { id: 'b75-55', number: 55, title: 'Course Schedule', difficulty: 'Medium', time: 30, tag: 'Graph', url: 'https://leetcode.com/problems/course-schedule/' },
      { id: 'b75-56', number: 56, title: 'Number of Connected Components in an Undirected Graph', difficulty: 'Medium', time: 30, tag: 'Graph', url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/' },
    ],
  },
  {
    week: 10,
    title: 'Week 10',
    problems: [
      { id: 'b75-57', number: 57, title: 'Graph Valid Tree', difficulty: 'Medium', time: 30, tag: 'Graph', url: 'https://leetcode.com/problems/graph-valid-tree/' },
      { id: 'b75-58', number: 58, title: 'Alien Dictionary', difficulty: 'Hard', time: 45, tag: 'Graph', url: 'https://leetcode.com/problems/alien-dictionary/' },
      { id: 'b75-59', number: 59, title: 'Minimum Window Substring', difficulty: 'Hard', time: 30, tag: 'String', url: 'https://leetcode.com/problems/minimum-window-substring/' },
      { id: 'b75-60', number: 60, title: 'Find Median from Data Stream', difficulty: 'Hard', time: 30, tag: 'Heap', url: 'https://leetcode.com/problems/find-median-from-data-stream/' },
      { id: 'b75-61', number: 61, title: 'Merge K Sorted Lists', difficulty: 'Hard', time: 30, tag: 'Linked List', url: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
      { id: 'b75-62', number: 62, title: 'Remove Nth Node From End of List', difficulty: 'Medium', time: 20, tag: 'Linked List', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
    ],
  },
  {
    week: 11,
    title: 'Week 11',
    problems: [
      { id: 'b75-63', number: 63, title: 'Reorder List', difficulty: 'Medium', time: 25, tag: 'Linked List', url: 'https://leetcode.com/problems/reorder-list/' },
      { id: 'b75-64', number: 64, title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', time: 35, tag: 'Binary Tree', url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
      { id: 'b75-65', number: 65, title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', time: 40, tag: 'Binary Tree', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },
      { id: 'b75-66', number: 66, title: 'Maximum Product Subarray', difficulty: 'Medium', time: 30, tag: 'Dynamic Programming', url: 'https://leetcode.com/problems/maximum-product-subarray/' },
      { id: 'b75-67', number: 67, title: 'Longest Increasing Subsequence', difficulty: 'Medium', time: 30, tag: 'Dynamic Programming', url: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
      { id: 'b75-68', number: 68, title: 'Word Search II', difficulty: 'Hard', time: 40, tag: 'Trie', url: 'https://leetcode.com/problems/word-search-ii/' },
    ],
  },
  {
    week: 12,
    title: 'Week 12',
    problems: [
      { id: 'b75-69', number: 69, title: 'Top K Frequent Words', difficulty: 'Medium', time: 20, tag: 'Heap', url: 'https://leetcode.com/problems/top-k-frequent-words/' },
      { id: 'b75-70', number: 70, title: 'Sum of Two Integers', difficulty: 'Medium', time: 30, tag: 'Bit Manipulation', url: 'https://leetcode.com/problems/sum-of-two-integers/' },
      { id: 'b75-71', number: 71, title: 'Number of 1 Bits', difficulty: 'Easy', time: 15, tag: 'Bit Manipulation', url: 'https://leetcode.com/problems/number-of-1-bits/' },
      { id: 'b75-72', number: 72, title: 'Counting Bits', difficulty: 'Easy', time: 15, tag: 'Bit Manipulation', url: 'https://leetcode.com/problems/counting-bits/' },
      { id: 'b75-73', number: 73, title: 'Missing Number', difficulty: 'Easy', time: 15, tag: 'Bit Manipulation', url: 'https://leetcode.com/problems/missing-number/' },
      { id: 'b75-74', number: 74, title: 'Reverse Bits', difficulty: 'Easy', time: 15, tag: 'Bit Manipulation', url: 'https://leetcode.com/problems/reverse-bits/' },
      { id: 'b75-75', number: 75, title: 'Minimum Height Trees', difficulty: 'Medium', time: 30, tag: 'Graph', url: 'https://leetcode.com/problems/minimum-height-trees/' },
    ],
  },
];

export default blind75Data;
