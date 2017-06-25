	<template>
		 <div class="mui-content">
	    	<div class="row" v-for="(item,index) in goodslist" :key="item.id">
	    		<div class="left">
	    			<mt-switch v-model="values[index]"></mt-switch>
	    		</div>
	    		<div class="center">
	    			<img :src="item.thumb_path" height="75" width="75" alt="">
	    		</div>
	    		<div class="right">
	    			<h4>{{item.title}}</h4>
	    			<span>￥{{item.sell_price}}</span>
	    			<number @numchanged="getcount" :id="item.id" :initcount="item.count"></number>
	    			<a href="javascript:void(0)" @click="remove(item.id)">删除</a>
	    		</div>

	    	</div>
	    
	    	
	    	<div class="footer">
	    		<div class="left">
	    			<h4>总计(不含运费)</h4>
	    			<span>已选择商品{{getTotalCount}}件，共计￥{{totalPrice}}元</span>
	    		</div>
	    		<div class="right">
	    			<button class="mui-btn mui-btn-danger">去结算</button>
	    		</div>
	    	</div>
			<!-- {{values}} -->
	    </div>

	</template>

	<script>
	    import number from "../Subcom/number.vue"
	    import { getItems,removeItem,setItem } from "../../common/localstorageHelp.js"

	     import { objVue } from '../../communication.js'

		export default {

			data(){
				return {
					
					values:[],
					goodslist:[],
					totalPrice:0

				}
			},
			created(){
				this.initpage()
			},
			components:{
				number:number
			},
			methods:{
				initpage(){

					// 获取id /3,5,6
					let array = getItems();
					let tmpArray=[];
					array.forEach((item)=>{
						 tmpArray.push(item.goodsId);

						 // console.log(tmpArray);
					})
					let ids = tmpArray.join(",");
					// console.log(ids);

					// 发送请求
					let url = this.common.apiHost +"goods/getshopcarlist/" + ids;

					this.$http.get(url).then((response)=>{
						this.goodslist=response.body.message;
						// 初始化values
						this.goodslist.forEach(()=>{
							this.values.push(false);
						})
					// 给goodslist中的每一项添加count属性
					for (let i = 0; i < array.length; i++) {
						for (let j = 0; j < this.goodslist.length; j++) {
							let item = this.goodslist[j];
							if(array[i].goodsId===item.id){
								item.count = array[i].count;
								break;
							}
						}
					}

					// console.log(this.goodslist);
					})
				},

				remove(id){
					// 本地存储删除
					removeItem(id);
					// 删除goodslist和values中数据
					
					let index=this.goodslist.findIndex((item)=>{
						if(item.id===id){
							return true;
						}
					})
					// console.log(index)
					 this.goodslist.splice(index, 1);
	           		 this.values.splice(index, 1);


					// 跟新bage数据，从本地存储中获取
					 objVue.$emit('update'); 
					 this.getTotalPrice();
					},


					// 件数的加减
					 getcount(obj) {

						// console.log(obj);

					   if(obj.type == 'add') {
			              //更新本地存储
			              setItem({goodsId: obj.id, count: 1});
			            }else if(obj.type == 'sub') {
			              setItem({goodsId: obj.id, count: -1});
			            }


			            let array=getItems();
			            // 给goodslist中的每一项添加count属性
					   for (let i = 0; i < array.length; i++) {
							for (let j = 0; j < this.goodslist.length; j++) {
								let item = this.goodslist[j];
								if(array[i].goodsId===item.id){
									item.count = array[i].count;
									break;
								}
							}
						}
			             // 跟新bage数据，从本地存储中获取
					    objVue.$emit('update');  
					    this. getTotalPrice(); 
					},
					//总价钱
				 getTotalPrice(){
				 	this.totalPrice=0;
					this.values.forEach((item,index)=>{
						if(item){
							this.totalPrice += this.goodslist[index].sell_price * this.goodslist[index].count;
						}
					})
				}

				
				
			},
			computed:{

				getTotalCount(){

					let count=0;
					this.totalPrice=0;

					this.values.forEach((item,index)=>{
						if(item){
							count+=this.goodslist[index].count;

							this.totalPrice += this.goodslist[index].sell_price * this.goodslist[index].count;
						}
					})
					return count;
				}
			}
		}
		
	</script>

	<style scoped>
		.row{

			padding: 10px 5px;
			border-bottom:1px solid rgba(92,92,92,.5);
			display:flex;
			align-items:center;

		}
		.row .center {
	        padding: 0 10px;
	    }
	    .row .right h4 {
	        color: dodgerblue;
	        margin-bottom: 10px;
	    }

	      .row .right span {
	        color: red;
	        font-size: 20px;
	        margin-right: 10px;
	    }
		
		 .row .right a {
	        font-size: 14px;
	        color: gray;
	        margin-left: 5px;
	    }

	    .footer{
	    	background-color: lightgray;
			margin-top:10px;
			display:flex;
			padding:10px 5px;
			align-items:center;
			justify-content:space-between;

	    }
		.footer .left span{
			font-size:14px;
		}  


	</style>	   
