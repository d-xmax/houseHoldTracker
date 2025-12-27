import asyncHandler from 'express-async-handler';
import Item from '../../model/itemModel.js';
import _ from 'lodash';

// @desc show one item from the list
// @path GET /api/item/:itemId
// @access Public

const getItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  if (!itemId || itemId === null) {
    res.status(400);
    throw new Error('No item found');
  }
  const item = await Item.findById({
    _id: itemId,
  });
  if (!item || item === null) {
    res.status(500);
    throw new Error(
      'Item finding not working please try again'
    );
  }
  res.status(200).json(item, 'Item found');
});

// @desc update one item from the list
// @path PUT /api/item/:itemId
// @access Public
const updateItem = asyncHandler(
  async (req, res) => {
    const { itemId } = req.params;
    const reqItems = req.body;
    if (!itemId || itemId === null) {
      res.status(400);
      throw new Error('No item found');
    }

    const exItem = await Item.findById(
      itemId
    ).lean();

    if (!exItem || exItem === null) {
      res.status(404);
      throw new Error('Item not found');
    }

    if (!reqItems || reqItems === null) {
      res.status(404);
      throw new Error(
        'Not found items to update'
      );
    }

    // type conversion
    const castToDbType = (dbVal, reqVal) => {
      if (dbVal instanceof Date)
        return new Date(reqVal);
      if (typeof dbVal === 'number')
        return Number(reqVal);
      return reqVal;
    };

    const reqItemAndPath = {
      name: 'name',
      category: 'category',
      quantity: 'quantityDetails.quantity',
      quantityType:
        'quantityDetails.quantityType',
      description: 'description',
      location: 'location',
      dop: 'dop',
      price: 'price',
    };
    const changedFields = Object.entries(
      reqItems
    ).reduce((acc, [key, value]) => {
      const path = reqItemAndPath[key];
      if (!path) return acc;
      if (value === undefined || value === '')
        return acc;
      const exValue = _.get(exItem, path);

      const castValue = castToDbType(
        exValue,
        value
      );
      if (!_.isEqual(exValue, castValue)) {
        acc[path] = castValue;
      }
      return acc;
    }, {});

    if (Object.keys(changedFields).length === 0) {
      return res.status(200).json({
        message: 'Already Updated',
      });
    }
  

    const updatedItems =
      await Item.findOneAndUpdate(
        {
          _id: itemId,
        },
        {
          $set: changedFields,
        },
        {
          new: true,
        }
      );
    if (updatedItems === null || !updatedItems) {
      res.status(500);
      throw Error(
        'Item updating fail please try again'
      );
    }
    return res.status(200).json({
      message: 'updating successful',
    });
  }
);

// @desc delete one item from the list
// @path DELETE /api/item/:itemId
// @access Public
const deleteItem = asyncHandler(
  async (req, res) => {
    const itemId = req.params.itemId;
    if(itemId===null || !itemId){
      res.status(400)
      throw new Error("No item found")
    }
    const deletedItem =
      await Item.findByIdAndDelete({
        _id: itemId,
      });
    if (!deletedItem || deletedItem === null) {
      res.status(404);
      throw new Error('Item not found');
    }
    res.sendStatus(204);
  }
);

export { getItem, updateItem, deleteItem };
