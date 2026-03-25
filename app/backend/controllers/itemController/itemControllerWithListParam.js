import asyncHandler from 'express-async-handler';
import Item from '../../model/itemModel.js';
import List from '../../model/listModel.js';

// @desc add item to the list
// @path POST /api/:listId/item
// @access Public

const createItem = asyncHandler(
  async (req, res) => {
    const userId = req.user._id;
    const listId = req.params.listId;

    const {
      name,
      category,
      quantity,
      quantityType,
      description,
      price,
      location,
      dop,
    } = req.body;
    if (!userId || userId === null) {
      res.status(401);
      throw Error(
        'User not found please sign in again',
      );
    }
    if (!listId || listId === null) {
      res.status(400);
      throw new Error('No list found');
    }

    const ownedList = await List.findOne({
      _id: listId,
      userId,
    }).lean();

    if (!ownedList) {
      res.status(404);
      throw new Error('List not found');
    }

    const item = await Item.create({
      listId,
      name,
      category,
      quantityDetails: {
        quantity,
        quantityType,
      },
      description,
      price,
      location,
      dop,
    });
    if (!item) {
      res.status(500);
      throw Error('Item adding fail please try again');
    }

    res.status(201).json({
      message: `Item "${name}" added successfully`,
      item,
    });
  }
);
// @desc add item to the list
// @path GET /api/:listId/item
// @access Public

// @desc add item to the list
// @path GET /api/:listId/item
// @access Public

const getAllItem = asyncHandler(
  async (req, res) => {
    const listId = req.params.listId;
    const userId = req.user._id;

    if (!listId || listId === null) {
      res.status(400);
      throw new Error('No list found');
    }

    const ownedList = await List.findOne({
      _id: listId,
      userId,
    }).lean();

    if (!ownedList) {
      res.status(404);
      throw new Error('List not found');
    }

    const items = await Item.find({ listId });

    if (!items) {
      res.status(500);
      throw Error(
        'Not found items for this list',
      );
    }
    res.status(200).json({
      items,
      count: items.length,
      message: `Get all items for the list ${listId} successful`,
    });
  },
);

export { createItem, getAllItem };
