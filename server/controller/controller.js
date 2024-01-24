const model = require('../models/model');

// post http://localhost:8080/api/categories
async function create_categories(req, res) {
  const Create = new model.Categories({
    type: "savings",
    color: "1F3B5C",
  });

  try {
    const result = await Create.save();
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ message: `Error while creating categories ${err}` });
  }
}

// get http://localhost:8080/api/categories

async function get_categories(req, res) {
  let data = await model.Categories.find({});
  let filter = await data.map((v) => Object.assign({}, { type: v.type, color: v.color }));
  return res.json(filter);
}

// post http://localhost:8080/api/transaction
async function create_transaction(req, res) {
  if (!req.body) return res.status(400).json("Post http data not provided");
  let { name, type, amount } = req.body;

  const create = await new model.Transaction({
    name,
    type,
    amount,
    date: new Date(),
  });
  create.save()
    .then(() => {
      return res.json(create);
    })
    .catch((err) => {
      return res.status(400).json({ message: `Error while creating transaction ${err}` });
    });
}

// get http://localhost:8080/api/transaction

async function get_transaction(req,res){
    let data =await model.Transaction.find({});
    return res.json(data)
}

// delete http://localhost:8080/api/transaction
async function delete_transaction(req, res) {
    if (!req.body) return res.status(400).json({ message: "Request body not found" });
  
    try {
      const result = await model.Transaction.deleteOne(req.body);
  
      if (result.deletedCount > 0) {
        return res.json({ message: "Record Deleted" });
      } else {
        return res.status(404).json({ message: "Record not found" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Error while deleting Transaction record", error: err });
    }
  }
  
// get http://localhost:8080/api/labels

async function get_labels(req, res){
    model.Transaction.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:'type',
                foreignField:"type",
                as:"categories_info"
            }
        },
        {
            $unwind:"$categories_info"
        }
    ]).then(result=>{
        let data=result.map(v=>Object.assign({},{_id:v._id,name:v.name, type:v.type,amount:v.amount,
            color:v.categories_inf0['color']}));
        res.json(data)
    }).catch(error=>{
        res.status(400).json("Lookup collection Error")
    })
}


module.exports = {
  create_categories,
  get_categories,
  create_transaction,
  get_transaction,
  delete_transaction,
  get_labels
};
