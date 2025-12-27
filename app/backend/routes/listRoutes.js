import express from 'express';
import {
  createList,
  deleteList,
  readAllList,
  readList,
  updateList,
} from '../controllers/listControllers.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  rulesForCreateList,
  rulesForDeleteList,
  rulesForReadList,
  rulesForUpdateList,
} from '../utils/rules.js';
import validation from '../middleware/validationMiddleware.js';
// import { checkRequestMiddleware } from '../middleware/emptyCheckMiddleware.js';
const router = express.Router();

router
  .route('/')
  .post(     
    protect,
    rulesForCreateList(),
    validation,
    createList
  )
  .get(readAllList);
router
  .route('/:id')
  .get(rulesForReadList(), validation, readList)
  .put(
    protect,
    rulesForUpdateList(),
    validation,
    updateList
  )
  .delete(
    rulesForDeleteList(),
    validation,
    deleteList
  );
export default router;
