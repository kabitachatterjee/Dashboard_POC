const Comment = readable.Comment

/**
 * @typedef {{
 * parentId: string,
 * timestamp: number,
 * body: string,
 * author: string,
 * voteScore: number,
 * deleted: boolean,
 * parentDeleted: boolean,
 * }}
 */
export default readable.Comment;