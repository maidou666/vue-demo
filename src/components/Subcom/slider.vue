<template>
	
	 <!-- 轮播图 -->
			<mt-swipe :auto="4000">
			  <mt-swipe-item v-for="(item,index) in images" :key="index">
			  	<a :href='item.url'>
			  		<img :src="item.img">
			  	</a>
			  </mt-swipe-item>
			
			</mt-swipe>
</template>

<script>

	export default{
		data(){
			return{
			 images:[]
			}
		},

		created(){
								
				this.getlunbo();
			},
		props:["imgUrl"],

	    methods:{
	    		// 获取轮播图
				getlunbo(){
					// let url='../../../statics/js/json.json';
					this.$http.get(this.imgUrl).then(function(response){
						// console.log(response.body);
						this.images = response.body.message;
						
					},function(){
						console.log("请求错");
					})

				}
	    }
	}

	

</script>

<style scoped>
	       /* 轮播图 */
		.mint-swipe{
			height: 250px;
		}
		.mint-swipe img{
			width: 100%;
			height: 100%;
		}


</style>