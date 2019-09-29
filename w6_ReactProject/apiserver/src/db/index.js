/**
 * MongoDB
 */

//  引入模块中的客户端对象
const { MongoClient, ObjectId } = require("mongodb");
const { mongo: mongourl, database } = require("../config.json");
const {formatId} = require('../utils')

//  利用MongoClient连接数据
// Nodejs某些方法的特性：
// * 有回掉函数：执行回掉函数并传入参数
// * 无回掉函数：返回promise对象
async function connect() {
  // 注意：mongodb:localhost:27017连接较慢，改成mongodb://127.0.0.1:27017
  let client = await MongoClient.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // 连接数据库，无则自动创建
  let db = client.db(database);
  return {
    db,
    client
  };
}

/**
 * @增
 */
exports.create = async (colName, data) => {
  let { db, client } = await connect();

  // 根据colName获取集合
  let collection = db.collection(colName);
  // collection[Array.isArray(data) ? 'insertMany':'insertOne'](data,(err,result)=>{
  //     // 插入成功后的回调
  // });

  if(!Array.isArray(data)){
    data = [data];
  }

  let result;
  try {
    result = await collection.insertMany(data);
  } catch (err) {
    result = err;
  }

  // 关闭当前连接，释放资源
  client.close();

  return result;
};

/**
 * @删
 * @param {String} colName   集合名称
 * @param {Object} query     查询条件
 * @return                   返回值
 */
exports.delete = async (colName, query) => {
  let { db, client } = await connect();
  let collection = db.collection(colName);

  if (query._id) {
    // 通过id查询数据必须使用这种格式
    // _id:'xxx' -> _id:ObjectId('xxx');
    query._id = formatId(query._id);
  }

  let result;
  try {
    result = await collection.deleteMany(query);
  } catch (err) {
    result = err;
  }

  // 关闭当前连接，释放资源
  client.close();

  return result;
};

/**
 * @改
 * @Params {String} colName   集合名称
 * @Params {Object} query   查询条件
 * @Params {Object} data   修改对象（包含$set,$inc等）
 */
exports.update = async (colName, query, data) => {
  let { db, client } = await connect();
  let collection = db.collection(colName);

  if (query._id) {
    query._id = formatId(query._id);
  }

  let result;
  try {
    result = await collection.updateMany(query, data);
  } catch (err) {
    result = err;
  }

  // 关闭当前连接，释放资源
  client.close();

  return result;
};

/**
 * @查
 */
exports.find = async (colName, query = {}, { fields={},random=false,total,options:{skip, limit, sort}={} } = {}) => {
  let { db, client } = await connect();

  let collection = db.collection(colName);

  if (query._id) {
    // 通过id查询数据必须使用这种格式
    // _id:'xxx' -> _id:ObjectId('xxx');
    query._id = formatId(query._id);
  }


  let result;
  try {
    result = random ? collection.aggregate([ { $sample: { size:limit} } ]) : collection.find(query,fields);
    
    // 排序
    if (sort) {
        // sort格式：sort=price,1
      sort = sort.split(',');
      result = result.sort({
        [sort[0]]: sort[1] || -1 // 默认降序
      });
    }

    // 跳过
    if (skip) {
      result = result.skip(skip);
    }

    // 截取数量
    if (limit) {
      result = result.limit(limit);
    }
    let count = await (random ? collection.find().count():result.count());
    result = await result.toArray();
    if(total){
      result = {
        result,
        total:count
      }

    }
  } catch (err) {
    result = err;
  }

  // 关闭当前连接，释放资源
  client.close();
  return result;
};

/**
 * @随机查询
 * aggregate( [ { $sample: { size: N } } ] ) 
 */
/* exports.random = async (colName, size) => {
    let { db, client } = await connect();
    let collection = db.collection(colName);
  
    
    let result;
    try {
      result = await collection.aggregate([ { $sample: { size} } ]).toArray();

    } catch (err) {
      result = err;
    }
  
    // 关闭当前连接，释放资源
    client.close();
  
    return result;
  }; */
  

/**
 *  触发数据库查询方法
 */
const { formatData } = require("../utils");
exports.dispatch = async function(method, colName, query = {}, options = {}) {
  // method==create: query为data
  // method==update: options为data
  try {
    let data = await this[method](colName, query, options);
    result = formatData({ data });
  } catch (err) {
    result = formatData({ code: 400 });
  }
  return result;
};
