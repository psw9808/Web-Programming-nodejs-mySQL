var express = require('express');
var router = express.Router();
var fs = require('fs');
var posts = require('../post.json');
const uuidv1 = require('uuid/v1')
var Sequelize = require('sequelize');

const sequelize = new Sequelize('gnb', 'root', '9808', {
  host: 'localhost',
  dialect: 'mysql'
});

const Post = sequelize.define('post', {
  // attributes
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.STRING
  }
});  

Post.sync()

router.get('/', function(req, res){
  // res.render('gnb',{ posts: [] })
  Post.findAll().then(function(posts) {
    res.render('gnb', {posts: posts})
  })
})

router.get('/:post_id', function(req,res){
  // var targetIndex = posts.findIndex(function(element){
  //   return element.id == req.params.post_id
  // })
  // var targetPost =posts[targetIndex]
  
  Post.findByPk(req.params.post_id).then(function(post){
    res.render('detail', {post: post})
  })
  
})

router.post('/', function(req, res){
 
  // var newObj = {
  //   id: uuidv1(),
  //   title: req.body.title,
  //   body: req.body.body
  // }
  // posts.push(newObj)
  
  // fs.writeFile('post.json',JSON.stringify(posts),function(){
    
  //   res.redirect('back');
  // })
  Post.create({title: req.body.title, body: req.body.body}).then(function() {
    res.redirect('back')
  })
})

router.post('/update/:post_id',function(req,res){
  var updatedpost = {title: req.body.title, body: req.body.body}
  Post.update(updatedpost, {where: {id: req.params.post_id}}).then(function() {
    res.redirect('/')
  })
  
  // var targetIndex = posts.findIndex(function(element){
  //   return element.id == req.params.post_id
  // })
  
  // posts[targetIndex].title=req.body.title
  // posts[targetIndex].body=req.body.body

  // fs.writeFile('post.json',JSON.stringify(posts),function(){
  //   res.redirect('/');
  // })
})

router.get('/update/:post_id', function(req,res){
  // var targetIndex = posts.findIndex(function(element){
  //   return element.id == req.params.post_id
  // })
  // var targetPost =posts[targetIndex]
  // res.render('update', {post: targetPost})
  Post.findByPk(req.params.post_id).then(function(post) {
    res.render('update', {post: post})
  })
})

router.post("/delete/:post_id", function(req, res){
  Post.destroy({where: {id: req.params.post_id}}).then(function() {
    res.redirect('/')
  })
  // var targetIndex = posts.findIndex(function(element){
  //   return element.id == req.params.post_id
  // })
  // posts.splice(targetIndex,1)
  // fs.writeFile('post.json',JSON.stringify(posts),function(){
  //   res.redirect('/')
  // })
})



module.exports = router
