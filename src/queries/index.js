const checkEmailExit = "SELECT * FROM users WHERE email = $1";
const addFollowUser = "INSERT INTO follows (following_user_id,followed_user_id) VALUES ($1,$2)";
const unfollowuser = "DELETE FROM follows WHERE following_user_id = $1 AND followed_user_id = $2";
const addPost = "INSERT INTO posts (title,description,user_id) VALUES ($1,$2,$3) RETURNING id,title,description,created_at";
const deletePost = "DELETE FROM posts WHERE id = $1";
const likePost = "INSERT INTO posts_liked_users (post_id,user_id) VALUES ($1,$2)";
const unlikePost = "INSERT INTO posts_unliked_users (post_id,user_id) VALUES ($1,$2)";
const commentOnPost = "INSERT INTO posts_comments_users (post_id,user_id,comment) VALUES ($1,$2,$3) RETURNING id";
const getUserFollowing = "SELECT * FROM follows WHERE following_user_id = $1";
const getUserFollowed = "SELECT * FROM follows WHERE followed_user_id = $1";
const getPostLikeById = "SELECT * FROM posts_liked_users WHERE post_id = $1";
const getPostCommentById = "SELECT * FROM posts_comments_users WHERE post_id = $1";
const getAllPost = "SELECT * FROM posts";


module.exports = {
    checkEmailExit,
    addFollowUser,
    unfollowuser,
    addPost,
    deletePost,
    likePost,
    unlikePost,
    commentOnPost,
    getUserFollowing,
    getUserFollowed,
    getPostLikeById,
    getPostCommentById,
    getAllPost
}