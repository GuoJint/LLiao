// module.exports = {
//     devServer:{
//       host:'localhost',
//       port:8080,
//       proxy:{
//         '/api':{
//           // http://mall-pre.springboot.cn
//           target:'www.zzxblog.com:8081',
//           changeOrigin:true,
//           pathRewrite:{
//             '/api':'/LLiao'
//           }
//         }
//       }
//     },
//     // publicPath:'/app',
//     // outputDir:'dist',
//     // indexPath:'index2.html',
//     // lintOnSave:false,
//     productionSourceMap:false,
//     chainWebpack:(config)=>{
//       config.plugins.delete('prefetch');
//     }
//   }