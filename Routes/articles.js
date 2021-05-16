const router = require("express").Router();
const Article = require("../modals/articles");

router.post("/", (req, res) => {
  console.log(req.body);
  const article = new Article({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
  });
  // article.save((err,doc)=>{
  //     if (err) {
  //         throw err;
  //     }
  //     else{
  //         res.status(201).json(doc);
  //     }

  //better way of saving it in db
  article
    .save()
    .then((doc) => res.status(201).json(doc))
    .catch((err) => {
      throw err;
    });
});

//fetching data from db through giving id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Article.findOne(
    // basically 1st param is the filter function embedded in it so _id property wil fetch id
    { _id: id },
    (err, doc) => {
      if (err) {
        throw err;
      }
      if (doc) {
        return res.json(doc);
      } else {
        res.status(404).json({ Error: "Article data not found" });
      }
    }
  );
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  Article.findOne({ _id: id }, (err, doc) => {
    if (err) {
      throw err;
    }
    if (doc) {
      Article.updateOne(
        //2nd param here is the data to be updated , while the 1st param tells how to get that specific data
        { _id: id },
        {
          title: req.body.title,
          body: req.body.body,
          author: req.body.author,
        }
      ) // yhn pr document reccieve nh hots just status recieve hogya confirmation only kun ke patch method hai
        .then((status) => {
          return res.json(req.body);
        })
        .catch((err) => {
          throw err;
        });
    } else {
      res.status(404).json({ Error: "Article data not found" });
    }
  });
});

//fetching all articles from the db
router.get("/", (req, res) => {
  Article.find((err, doc) => {
    if (err) {
      throw err;
    } else {
      return res.json(doc);
    }
  });
});

//delete article
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Article.deleteOne(
    { _id: id })
      .then((doc) => {
        return res.json({ id: id });
      })
      .catch((err) => {
        res.status(500).json({ error: "something went wrong" });
      })
  
});

module.exports = router;
