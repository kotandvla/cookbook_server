let app = new (require('express').Router)();
const models = require("../models");
const logger = new (require('../logger'))()
const answer = new (require('../answer'))()
const _ = new require("underscore");
const mongoose = require('mongoose');




function GetCategories (res, res) {
  let IsAllCorrect = true
  /*req.forEach(CategoryData => {
    let CategoryForTest = models.Categories(CategoryData)  
    let result = CategoryForTest.validateSync()
    if (result)
      Object.keys(result.errors).forEach((value, key) => {
        console.log(result.errors[value].message)
      })
    logger.info(result)
  });*/
      
    models.Categories.find({}).exec()
    .then(function (result) {
      res.send(
        answer.OK('All OK!', result)
      )
    })
    .catch(function (err) {
      logger.error(err)
      answer.Error('Bad news!', err)
    })
}

function SyncCategories(req, res) {
  var bulk = models.Categories.collection.initializeUnorderedBulkOp();

  let InputCategories = req.body
  let IDFromInputCategories = _.map(InputCategories, function(value) { return value._id })
  
  models.Categories.find({}, (err, CurrentCategories) => { 
    if (!err) {      
      _.forEach(CurrentCategories, category => {   
        CurrentInputCategory = undefined
        _.forEach(InputCategories, function (val) { 
          if (val._id == category._id){
            CurrentInputCategory = val 
          }            
        })
        if (CurrentInputCategory) {      
          if ((CurrentInputCategory.title !== category.title || 
              CurrentInputCategory.link  !== category.link) &&
              (CurrentInputCategory.title !== '' && 
                CurrentInputCategory.link  !== '')) {  
            bulk.find({ _id: category._id }).upsert().updateOne(_.omit(CurrentInputCategory, '_id'))
          }
        }
        else {
          bulk.find({ _id: category._id }).removeOne()
        }
      })

      _.forEach(InputCategories, category => {
        if (!_.findWhere(CurrentCategories, function (val) { return val._id === category._id }) || 
            category._id == undefined){
          bulk.insert(_.omit(category, '_id'))
        }
      })

      bulk.execute(function(err,result) {             
        console.log(err)      
        if (err) {
            res.send(
              answer.Error('Error when add or update category!', err)
            )
          }        
          else {
            res.send(
              answer.OK('Info update!')
            )
          }     
      });      
    }
    else {
      logger.error(err)
    }
  })
}


module.exports = { GetCategories, SyncCategories };