// 操作localstorage  读取  存储  键值对字符串
// goods：[{goodsId:1,count:8}]


//  读取商品数据
export function getItems() {

 	return JSON.parse(localStorage.getItem("goods") || "[]");
 }

 //  存储数据

 export function setItem(json){

 	let  array = getItems();

 	// 假设本地存储没有该商品
 	let hasGoods = false;

 	array.forEach((item)=>{
 		if(item.goodsId===json.goodsId){

 			item.count += json.count;
 			hasGoods=true;
 		}
 	})


 	if(!hasGoods){
 		array.push(json);
 	}


 	localStorage.setItem("goods",JSON.stringify(array));
 }


 // 删除

  export  function removeItem(id){
  	let  array = getItems();
  	array.forEach((item,index)=>{
  		if(item.goodsId ===id){
  			array.splice(index,1);
  		}
  	})
  	// 重新存储
  localStorage.setItem('goods', JSON.stringify(array));
  }