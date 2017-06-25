// 加载vue
import Vue from 'vue'

// 加载组件
import app from './app.vue'

// 加载mint-ui组件  全局导入
import mintUI from 'mint-ui'
Vue.use(mintUI);
// 加载mint-ui样式
import '../node_modules/mint-ui/lib/style.css'

// 引入mui的样式
// 
import '../statics/css/mui.css'
import '../statics/css/icons-extra.css'
import '../statics/css/style.css'

// 导入日期格式化的模块
import moment from "moment"


// 全局过滤器格式化日期
 Vue.filter("fmtDate",(input,formatStr)=>{
 	return moment(input).format(formatStr);
 })

// 引用vue-resource
import VueResource  from 'vue-resource'

Vue.use(VueResource);


// 引入路由模块
import VueRouter from 'vue-router'

// 使用路由模块

Vue.use(VueRouter);

// 加载组件
 import home from './components/Home/home.vue';
 import member from './components/Member/member.vue';
 import shopcar from './components/Shopcar/shopcar.vue';
 import search from './components/Search/search.vue';


 // 加载首页下面的组件
 import news from './components/Home/News/news.vue';
 import share from './components/Home/Share/share.vue';
 import buy from './components/Home/Buy/buy.vue';
 import feedback from './components/Home/Feedback/feedback.vue';
 import video from './components/Home/Video/video.vue';
 import contact from './components/Home/Contact/contact.vue'

 import newsdetail from './components/Home/News/newsdetail.vue';
 import sharedetail from "./components/Home/Share/sharedetail.vue";
 import buydetail  from "./components/Home/Buy/buydetail.vue"
// 创建路由对象

let router = new VueRouter({
	linkActiveClass:'mui-active',
	routes:[
		{name:'Root',path:'/',redirect:'/home'},
		{name:'Home',path:'/home',component: home},
		{name:'Member',path:'/member',component: member},
		{name:'Shopcar',path:'/shopcar',component: shopcar},
		{name:'Search',path:'/search',component: search},
		// 首页下面的路由地址
		{name:'News',path:'/news',component:news},
		{name:'Share',path:'/share',component:share},
		{name:'Buy',path:'/buy',component:buy},
		{name:'Feedback',path:'/feedback',component:feedback},
		{name:'Video',path:'/video',component:video},
		{name:'Contact',path:'/contact',component:contact},
		{name:'newsdetail',path:'/news/:id',component:newsdetail},
		{name:"sharedetail",path:'/share/:id',component:sharedetail},
		{name:'buydetail',path:'/buy/:id',component:buydetail}

	]

})






// 配置全局信息存储API主机地址

Vue.prototype.common={
	apiHost:"http://127.0.0.1:8899/api/"
}


var vm =new Vue({
	el:'#app',
	render:h => h(app),   //编译app.vue的组件

	// 使用路由对象
	router:router 
})

