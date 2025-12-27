import asyncHandler from 'express-async-handler';
import Item from '../../model/itemModel.js';

// @desc add item to the list
// @path POST /api/:listId/item
// @access Public

const createItem = asyncHandler(
  async (req, res) => {
    const userId = req.user._id;
    const listId = req.params.listId  

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
        'User not found please sign in again' 
      );
    } 
    if (!listId || listId === null) {
      res.status(400);
      throw new Error('No list found');
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
    res
      .status(200)
      .json(
        `Item added to the list ${listId} successful`
      );

    if(!item){
      res.status(500)
      throw Error('Item adding fail please try again')
    }  
  }
);

export { createItem };
