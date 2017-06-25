	<template>
		 <div class="mui-content">
			<mt-swipe :auto="4000">
			  <mt-swipe-item>
			  	<img src="../../../statics/images/cbd.jpg">
			  </mt-swipe-item>
			  <mt-swipe-item>
			  	<img src="../../../statics/images/muwu.jpg">
			  </mt-swipe-item>
			  <mt-swipe-item>
			  	<img src="../../../statics/images/shuijiao.jpg">
			  </mt-swipe-item>
			</mt-swipe>


		   <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon icon-news"></span>
		                    <div class="mui-media-body">新闻资讯</div></a></li>
		            <li class="mui-table-view-cell icon-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon icon-share"></span>
		                    <div class="mui-media-body">图片分享</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon icon-buy"></span>
		                    <div class="mui-media-body">商品购买</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon icon-feedback"></span>
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon icon-video"></span>
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon icon-contact"></span>
		                    <div class="mui-media-body">联系我们</div></a></li>
		          
		        </ul> 
	    	
		
	    </div>

	</template>

	<script>
		export default {

			data(){
				return {
					// 存储轮播图数据 将来做数据绑定
					images:[]
				}
			},

			created(){
				// 可以认为是组件创建完毕后执行  页面加载完执行
				this.getlunbo();
			}

			methods:{
				// 获取轮播图
				getlunbo(){
					let url='json.php';
					this.$http.get(url).then(function(response){
						this.images = eval('("+response.body+")').message;
						// console.log(this.images)
					},function(){
						console.log("请求错误");
					})

				}
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


		.mint-swipe{
			height: 250px;
		}
		.mint-swipe img{
			width: 100%;
			height: 100%;
		}
	</style>