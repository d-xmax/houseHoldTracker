import mongoose from 'mongoose';

const listSchema = mongoose.Schema(
  {
    userId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  {
    timestamps: true,
    
  }
);


listSchema.pre('findOneAndDelete', async function(next){
  const list = await this.model.findOne(this.getFilter())
 
  if(list){
    await mongoose.model('Item').deleteMany({
      listId: list._id
    })
  }
  next()
})

const List = mongoose.model('List', listSchema);
export default List;
