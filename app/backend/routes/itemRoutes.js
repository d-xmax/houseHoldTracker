import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  deleteItem,
  getItem,
  updateItem,
} from '../controllers/itemController/itemController.js';
import { createItem, getAllItem } from '../controllers/itemController/itemControllerWithListParam.js';
import {
  rulesForDeleteItem,
  rulesForGetAllItem,
  rulesForGetItem,
  rulesForGetAllItem,
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

itemParamRouter
  .route('/item')
  .post(
    protect,
    rulesForListParam(),
    validation,
    createItem,
  )
  .get(
    protect,
    rulesForGetAllItem(),
    validation,
    getAllItem,
  );
itemRouter
  .route('/:itemId')
  .get(
    protect,
    rulesForGetItem(),
    validation,
    getItem
  )
  .put(
    protect,
    rulesForUpdateItem(),
    validation,
    updateItem,
  )
  .delete(
    protect,
    rulesForDeleteItem(),
    validation,
    deleteItem,
  );

export { itemRouter, itemParamRouter };
