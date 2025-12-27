import mongoose from 'mongoose';

const itemSchema = mongoose.Schema(
  {
    listId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List',
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    quantityDetails: {
      quantity: {
        required: true,
        type: Number,
      },

      quantityType: {
        required: true,
        type: String,
      },
    },
    description:{
      type: String
    },
    price:{
      type : Number
    },
    location:{
      type: String
    },
    // dop mean *purchase date
    dop:{
      type: Date
    }
    
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model('Item', itemSchema);
export default Item;
