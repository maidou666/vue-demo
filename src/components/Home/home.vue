	<template>
		 <div class="mui-content">
		    
			<!-- 轮播图 -->
			<slider :imgUrl="imgUrl"></slider>

			<!-- 九宫格 -->
		   <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li   v-for="(item, index) in menus" :key="index"  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<router-link :to="item.url">
		                    <span class="mui-icon" :class='item.className'></span>
		                    <div class="mui-media-body">{{item.title}}</div>
		                </router-link>
		            </li>
		           
		          
		        </ul> 
	    	
		
	    </div>

	</template>

	<script>

		  // 导入轮播图组件
        import slider from '../Subcom/slider.vue'
		export default {

			data(){
				return {
					// 存储轮播图数据 将来做数据绑定
					
					menus:[],
				   // 请求轮播图地址
				   imgUrl:''
				}
			},

			created(){
				
				this.imgUrl=this.common.apiHost + 'getlunbo',
				this.getmenus()
				
			},

			methods:{
			
				getmenus(){
					// let url='../../../statics/js/jiugongge.json';
					let url=this.common.apiHost + 'getmenus';
					this.$http.get(url).then(function(response){
						// console.log(response.body.message);
						this.menus = response.body.message;
						
					},function(){
						console.log("请求错");
					})
				}

			},
			components:{
			   slider:slider
			}
			
		}
		
	</script>

	<style scoped>
	    .mui-icon{
	    	width: 50px;
			height: 50px;
			background-repeat:round;	
				/*填满整个容器  */
	    }
		.icon-news{			

			background-image:url(../../../statics/images/menu1.png);
		}

		.icon-share{
			background-image:url(../../../statics/images/menu2.png);
		}

		.icon-buy{
			background-image:url(../../../statics/images/menu3.png);
		}
		.icon-feedback{
			background-image:url(../../../statics/images/menu4.png);
		}
		.icon-video{
			background-image:url(../../../statics/images/menu5.png);
		}
		.icon-contact{
			background-image:url(../../../statics/images/menu6.png);
		}

		.mui-grid-view.mui-grid-9{
			background-color: #fff;
		}


	</style>