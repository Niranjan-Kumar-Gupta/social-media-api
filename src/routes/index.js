import express from 'express';
import { followUnfollowController, loginController, postController, userController } from '../controllers';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/authentication',loginController.login);
router.post('/follow/:id',auth,followUnfollowController.follow)
router.post('/unfollow/:id',auth,followUnfollowController.unfollow)
router.post('/posts',auth,postController.addPost)
router.delete('/posts/:id',auth,postController.deletePost)
router.post('/like/:id',auth,postController.likePost)
router.post('/unlike/:id',auth,postController.unlikePost)
router.post('/comment/:id',auth,postController.commentOnPost)
router.get('/user',auth,userController.getUser)
router.get('/posts/:id',auth,postController.getPostById)
router.get('/all_posts',auth,postController.getAllPost)


export default router;