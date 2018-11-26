const Report = require('express').Router();
const JOI = require('joi');

//realtime db
const database = require('firebase-admin').database();

//ref
const report_ref = database.ref('report');

//base: /report
Report.post('/', function(req, res, next){
   const Schema = JOI.object().keys({
      humidity: JOI.number().required(),
      lampu: JOI.number().required(),
      pompa: JOI.number().required()
   });

   JOI.validate(req.body, Schema).then(result => {
      next();
   }).catch(error => {
      next(error);
   });
}, function(req, res, next){
   var data = req.body;
   data.timestamp = Date.now();
   console.log('disini');

   report_ref.push(data).then(result => {
      res.send({
         succes: true
      });
   }).catch(error => {
      next(error);
   });
});

Report.get('/', function(req, res, next){
   report_ref.once('value').then(result => {
      var list_report = result.val();
      var array_report = [];

      for(key in list_report){
         array_report.push(list_report[key]);
      }

      res.send({
         succes: true,
         data: array_report
      });
   }).catch(error => {
      next(error);
   })
});

module.exports = Report;