import asyncHandler from 'express-async-handler';
import List from '../model/listModel.js';

// @desc create list
// @path POST /api/list/
// @access Public

const createList = asyncHandler(
  async (req, res) => {
    const { name, description, color } = req.body;
    const userId = req.user._id;

    if (!userId || userId === null) {
      res.status(400);
      throw new Error(
        'Unauthorized access please sign up or sign in again'
      );
    }
    const list = await List.create({
      userId,
      name,
      description,
      color,
    });
    if (!list || list === null) {
      res.status(500);
      throw new Error(
        'fail to create item please try again'
      );
    }
    res.status(201).json({
      message: `List "${name}" created successfully`,
      list,
    });
  }
);

// @desc update list
// @path PUT /api/list/:id
// @access Public
const updateList = asyncHandler(
  async (req, res) => {
    const listId = req.params.id;
    const userId = req.user._id;
    if (!listId || listId === null) {
      res.status(400);
      throw new Error('No list found');
    }
    const exList = await List.findOne({
      _id: listId,
      userId,
    }).lean();
    const newData = req.body;
    // list is not found
    if (exList === null) {
      res.status(404);
      throw new Error('Not found list');
    }
    if (!newData) {
      res.status(404);
      throw new Error(
        'Not found values to update'
      );
    }
    // iterate and hooked out deferent data
    const updateData = Object.fromEntries(
      Object.entries(newData).filter(
        ([key, value]) => {
          return (
            key in exList && exList[key] !== value
          );
        }
      )
    );
    // Already update
    if (Object.keys(updateData).length === 0) {
      return res
        .status(200)
        .json({ message: 'Already updated' });
    }

    const updatedList =
      await List.findOneAndUpdate(
        { _id: listId, userId },
        { $set: updateData },
        { new: true }
      );
    if (!updatedList || updatedList===null) {
      res.status(500);
      throw new Error(
        'fail to update list please try again'
      );
    }
    res.status(200).json({
      message: 'Update successful',
      updatedList,
    });
  }
);

// @desc delete list
// @path DELETE /api/list/:id
// @access Public

const deleteList = asyncHandler(
  async (req, res) => {
    const listId = req.params.id;
    const userId = req.user._id;
    if (!listId || listId === null) {
      res.status(400);
      throw new Error('No list found');
    }
    const deletedList =
      await List.findOneAndDelete({
        _id: listId,
        userId,
      });
    if (!deletedList || deletedList === null) {
      res.status(404);
      throw new Error('List not found');
    }
    res.status(200).json({
      message: `List "${deletedList.name}" deleted successfully`,
    });
  }
);

// @desc read one list item
// @path GET /api/list/:id
// @access Public
const readList = asyncHandler(
  async (req, res) => {
    const listId = req.params.id;
    const userId = req.user._id;
    if (!listId || listId === null) {
      res.status(400);
      throw new Error('No list found');
    }
    const readOne = await List.findOne({
      _id: listId,
      userId,
    }).select('-userId');

    if (!readOne || readOne === null) {
      res.status(404);
      throw Error('No list found');
    }

    res.status(200).json(readOne);
  }
);

// @desc read all list items
// @path GET /api/list/
// @access Public
const readAllList = asyncHandler(
  async (req, res) => {
    const userId = req.user._id;
    const readAll = await List.find({
      userId,
    }).select('-userId');
    const readListCount =
      await List.countDocuments({ userId });

    if (
      !readListCount ||
      readListCount === null
    ) {
      res.status(404);
      throw new Error('No list found');
    }
    if (!readAll || readAll === null) {
      res.status(500);
      throw new Error(
        'List finding not working please try again'
      );
    }
    res.status(200).json({
      readAll,
      readListCount,
      message: 'read all list successful',
    });
  }
);
export {
  createList,
  updateList,
  deleteList,
  readList,
  readAllList,
};
