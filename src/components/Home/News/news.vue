	<template>
		 <div class="mui-content">
	    	<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in news"  :key='item.id'>
					<router-link :to="{name:'newsdetail',params:{id:item.id}}">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body mui-ellipsis">
							{{item.title}}
							<p class='bottom'>
								<span>时间：{{item.add_time | fmtDate('YYYY-MM-DD')}}</span>
								<span>点击次数：{{item.click}}</span>
							</p>
						</div>
					</router-link>
				</li>		

			</ul>
			
	    </div>

	</template>


	<script>
		export default {

			data(){
				return {
				
					news:[]
					
				}
			},

			created(){
				
				this.getnews();
				
			},

			methods:{
				
				getnews(){
					this.$indicator.open(); 
					// 因为mint-ui是全局引用的所以他的方法可以加$直接用
					// let url='../../../../statics/js/news.json';
					let url = this.common.apiHost + 'getnewslist';
					this.$http.get(url).then(function(response){
						// console.log(response);
						this.news=response.body.message;
						this.$indicator.close();
						
					},function(){
						console.log("请求错");
					})

				}

			}
		}
		
	</script>


	<style scoped>
		.bottom{
			display:flex;
			justify-content:space-between;
			color:dodgerblue;
		}

	</style>