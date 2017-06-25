<template>
	<div class="mui-content">
		<div class="detail">
			<div class="top">
				<slider :imgUrl="imgUrl"></slider>
			</div>
		</div>
		<div class="sell">
			<h4>{{goods.title}}</h4>
			<div class="price">
				市场价：<del>￥{{goods.market_price}}</del> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				销售价：<span>￥{{goods.sell_price}}</span>
			</div>

			<div class="num">
				
				购买数量：<number @numchanged="getcount"></number>

				<transition
				  v-on:before-enter="beforeEnter"
				  v-on:enter="enter"
				  v-on:after-enter="afterEnter"				  
				>
				<div v-show="isShow" class="ball"></div>
				</transition>
				
			</div>
			<div class="button">
                <button class="mui-btn mui-btn-primary">立刻购买</button>
                <button @click="addcart" class="mui-btn mui-btn-danger">加入购物车</button>
            </div>
		</div>
		<div class="param">
            <h5>商品参数</h5>
            <div class="info">
                <p>商品编号：{{goods.goods_no}}</p>
                <p>库存情况：{{goods.stock_quantity}}件</p>
                <p>上架时间：{{goods.add_time | fmtDate("YYYY-MM-DD")}}</p>
            </div>
        </div>
        
        <div class="footer">
            <a class="mui-btn mui-btn-primary mui-btn-outlined">图文介绍</a>
            <a class="mui-btn mui-btn-danger mui-btn-outlined">商品评论</a>
        </div>

	</div>

</template>

<script>
   // 导入轮播图组件
   import slider  from "../../Subcom/slider.vue"
   // 导入number组件
   import number from "../../Subcom/number.vue"
   // 导入空白通讯vue实例
   import { objVue }  from "../../../communication.js"
   // 导入localstorage模块
   import { setItem } from "../../../common/localstorageHelp.js"

   // 导出组件
   export default{

   		data(){
   			return{
   				// 轮播图组件需要的接口地址
   				imgUrl:"",
   				id:-1,
   				goods:{},
   				count:1,
   				// 显示隐藏
   				isShow:false


   			}
   		},
   	
   		created(){
   			this.id=this.$route.params.id;
   			 //轮播图组件接口地址
   			this.imgUrl=this.common.apiHost+"getthumimages/"+this.id;
   			this.getgoods(); 
   			
   		},
   		methods:{

   			// 获取商品
   			getgoods(){
   				let url = this.common.apiHost+"goods/getinfo/"+this.id;
   				this.$http.get(url).then((response)=>{
   					this.goods=response.body.message[0];
   				})
   			},
   			// 获取子组件的数据
   			getcount(obj){
   				this.count=obj.count;
   			},
   			// 加入购物车
   			addcart(){

   				// 获取子组件的count
   				// console.log(this.count);
   				// 更新底部栏的值
   				objVue.$emit('updatebadge', this.count);
   				// 本地存储商品和数量
   				
   				// 执行动画
   				this.isShow=true;

   				// 本地存储要购买的商品和数量
          setItem({goodsId:this.id, count:this.count});



   			},
   			// 执行动画的钩子函数
   			beforeEnter(el) {
			    el.style.transform="translate3d(0,0,0)";
			},
			  // 此回调函数是可选项的设置
			  // 与 CSS 结合时使用
		   	enter(el,done) {
			    
			    let elX = el.getBoundingClientRect().left;
			    let elY = el.getBoundingClientRect().top;

			    // badge的位置
			    
			    let badge =document.querySelector(".mui-badge");
			    let badgeX = badge.getBoundingClientRect().left;
			    let badgeY = badge.getBoundingClientRect().top;

			    // 过渡的距离
			    let x = badgeX-elX;
			    let y = badgeY-elY;

			    el.style.transform = "translate3d("+x+"px,"+y+"px,0)";

			    done()
			  },

			afterEnter(el) {

			    this.isShow=false;

			  }

   		},
      components:{
        slider:slider,
        number:number

      }
   }
	
</script>

<style scoped>
	
	.num{
		position: relative;
	}

	.ball {
        left: 115px;
        top: 3px;
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: red;
        transition: all 0.5s linear;
        z-index: 1000;
        
    }
	
	.mui-content {
        background-color: #fff;
    }
    .top, .sell, .param, .footer{

    	border: 1px solid rgba(92, 92, 92, 0.7);
    	border-radius:5px;
    	margin:5px;
    	padding:10px;

    }
    .sell h4{
    	color: dodgerblue;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.5);
    }

    
    .price,
    .num,
    .button{
    	font-size:15px;
    	margin:10px;
    }

    .price span{
    	font-size:18px;
    	color:red;
    }

    .param h5{
    	font-weight:bold;
    	padding-bottom:10px;
    	border-bottom: 1px solid rgba(92, 92, 92, 0.5);

    }
     .info {
        margin-top: 10px;
        margin-left: 20px;
    }
	
	.info p{
		margin:0;
	}

	.footer .mui-btn{
		width:100%;
	}

 	.footer .mui-btn-danger {
        margin-top: 10px;
    }

</style>