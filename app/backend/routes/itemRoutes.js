import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  deleteItem,
  getItem,
  updateItem,
} from '../controllers/itemController/itemController.js';
import { createItem } from '../controllers/itemController/itemControllerWithListParam.js';
import {
  rulesForDeleteItem,
  rulesForGetItem,
  rulesForListParam,
  rulesForUpdateItem,
} from '../utils/rules.js';
import validation from '../middleware/validationMiddleware.js';
// const router = express.Router({
//   mergeParams: true,

// });

const itemRouter = express.Router(); //global item management
const itemParamRouter = express.Router({
  mergeParams: true,
}); //use to set items belongs to the list

itemParamRouter.post(
  '/item',
  protect,
  rulesForListParam(),
  validation,
  createItem
);
itemRouter
  .route('/:itemId')
  .get(rulesForGetItem(), validation, getItem)
  .put(
    rulesForUpdateItem(),
    validation,
    updateItem
  )
  .delete(
    rulesForDeleteItem(),
    validation,
    deleteItem
  );

export { itemRouter, itemParamRouter };
