[TOC]

## MobX
## Immutable.js

由Facebook 工程师 Lee Byron 花费 3 年时间打造，在js中的引用赋值可以节省内存，但随着应用的不断复杂后，状态的改变往往会变成噩梦，通常的做法是**复制数据**来避免被修改，但这样又造成了CPU和内存的消耗，而Immutate利用**结构共享**可以很好地解决这些问题。

* 复制数据：shallowCopy或deepCopy
* 结构共享：尽量复用内存

### 数据类型

* List: 有序索引集，类似JS中的Array。
* Map: 无序索引集，类似JS中的Object。
* OrderedMap: 有序的Map，根据数据的set()进行排序。
* Set: 没有重复值的集合。
* OrderedSet: 有序的Set，根据数据的add进行排序。
* Stack: 有序集合，支持使用unshift()和shift()添加和删除。
* Record: 一个用于生成Record实例的类。类似于JavaScript的Object，但是只接收特定字符串为key，具有默认值。
* Seq: 序列，但是可能不能由具体的数据结构支持。
* Collection: 是构建所有数据结构的基类，不可以直接构建。

### 属性
* size 获取List/Map的长度，等同于ImmutableData.count();

### 方法

* fromJS(value [,converter])
将一个js数据转换为Immutable类型的数据

* toJS()
将一个Immutable数据转换为JS类型的数据

* is(map1,map2)
对两个对象的hashCode和valueOf进行比较（js中是比较两个对象的地址）

* get(key)/getIn(...key)
获取数据结构中的数据

* set(key,val)/setIn(...key,val)
设置List/Map类型的键值

* delete(key)/deleteIn(...key)
删除某个值

* update(key,val=>{})/updateIn(...key,val=>{})
更新

* has(key)/hasIn(...key)
判断是否存在某一个key