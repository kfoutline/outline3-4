// module.exports = function(){
// 	let ele = document.createElement('div');
// 	ele.innerHMTL = 'webpack测试';
// 	return ele;
// }

export default text=>{
	let ele = document.createElement('div');
	ele.innerHTML = text;
	return ele;
}