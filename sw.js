/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/07/10/Learning Markdown/index.html","f7d978da5279eae43ac6a290d2f72128"],["/2024/07/10/Preface/index.html","a8d4f2961defb7df7875b7e242aef40c"],["/2024/07/15/Deploy Environment to Anaconda3/index.html","a0912c692fef14d37e9fe5a21b0ac13e"],["/2024/07/16/基于yolov5的数字识别/index.html","158127f53e4801d2cefebe221464f44d"],["/2024/08/01/视觉处理之ROS与OpenCV的修改转换/index.html","5c5bbd7b9446fcfc9b5018e53e1ed0aa"],["/2024/08/18/Ubuntu终端下载速度慢_换源/index.html","76b6ff2d5487eccbf29bbff60b723a59"],["/2024/08/20/dso安装及实验数据分析(内含miniconda3环境配置)/index.html","9ede0d02bcb540203f1ce2f338e258cc"],["/2024/08/21/Solidworks卸载重装流程/index.html","7b11c4a48433d96fbafafe5ae581c1fc"],["/2024/08/25/office 激活/index.html","a79df4f97afc8113b07b25e275f94610"],["/2024/08/26/解决VMware下Ubuntu22.04无法联网问题/index.html","cbb1b56c6726d6d43f9fd23b3bb98627"],["/2024/09/15/通过Git上传本地项目至Github/index.html","a7b0d321d818484fe3074a816ee666c4"],["/2024/09/22/SMART/index.html","aa79b9a4e6e32818b80bb6cf354b5660"],["/2024/09/22/基于Cartographer算法的RPLIDAR激光雷达导航/index.html","d9d9c8f0232e543f80f9b301da150d10"],["/2024/09/22/基于hexo的butterfiy主题的博客配置教程/index.html","0e39aea8efb954731499d3a87766c3bf"],["/2024/09/22/抽象代数/index.html","d8e49d45dd8a9c332dfe4fd101f9cf09"],["/2024/10/10/Terminate终端/index.html","7bf64e2f8bdc9bdf8cd394ce12df0a9c"],["/2024/10/10/TurtleBot3/index.html","5293ee069dc7c536b251537a39a2979d"],["/2024/10/11/vim使用教程/index.html","538415585e5033d8daff2eabd970f3e9"],["/2024/10/20/Stm32学习记录/index.html","bc6978f4ec62dcf920500760e6313f36"],["/2024/10/22/视觉组培训/index.html","d3efe634efe533abe5833628f0cf7ee9"],["/2024/11/14/【课设】寻迹小车/index.html","d0e36259b1afaf0b1c8ac139b6361685"],["/2025/01/10/基于MID360的多算法导航合集/index.html","5f1643c680dabc6ffe446cacab4057ed"],["/2025/01/10/天选4连接HDMI后投屏无信号/index.html","d56f47f21992ff4408cfd00d59318a47"],["/2025/02/04/GitHub的配置学习/index.html","41ed75181cdb86a036bafe15c1db4978"],["/2025/02/11/Ubuntu双系统/index.html","beab6569fc704588e560e9f278d9db76"],["/2025/02/13/Rime输入法/index.html","3c8a971d088d6ce40144f5928aa43b5c"],["/2025/02/14/RM2025导航调试/index.html","bbf14bd88563c4e5d05660dffb377130"],["/2025/03/02/算法组第三次培训/index.html","7e638cde3d21554a9c4f40192b47357f"],["/archives/2024/07/index.html","d597e9c4ec3c1b98b678f78528c37dc3"],["/archives/2024/08/index.html","381021023a82f832226931d7154da3ff"],["/archives/2024/09/index.html","21238bbc92d2bb6d5ad5ee702d183edc"],["/archives/2024/10/index.html","117577b7de337f530e1fee5fa1df89f2"],["/archives/2024/11/index.html","f478e7b027a63adb6aa6640953f5695b"],["/archives/2024/index.html","6f2d9e905738e68364286185e201d30e"],["/archives/2024/page/2/index.html","770cf20a9ef169f4ee4f1500dedd9bdc"],["/archives/2024/page/3/index.html","48422eb3dcc69b68336db8de43743cb4"],["/archives/2025/01/index.html","d5b7498b5a6aa500e583f52d7d06808b"],["/archives/2025/02/index.html","84261d5cdb830e9eb38b738df36d6ee1"],["/archives/2025/03/index.html","c81793e74e74d7e00842184974339de8"],["/archives/2025/index.html","9f4b82450052182e4c4b45ed626e591e"],["/archives/index.html","6aac9999b3c2cb48a246361b01046939"],["/archives/page/2/index.html","6abe0ecc160234ab21c53b310b88cccb"],["/archives/page/3/index.html","7d40c369cbdf4cb15bb438dd06d01037"],["/categories/index.html","ccee4b2a76e2bd5ac2fa6a49c7d777cc"],["/css/cursor.css","c784f5edde73b464bca58f6b5ae48798"],["/css/hbe.style.css","de85c19b502c6c5d197b9b3dde47a3f1"],["/css/home_transparent.css","581b100e092118d97bbb65f035d6caaa"],["/css/index.css","e2744197d3ed2e89723630eade984e7b"],["/css/top_img_transparent.css","4f4c177a2889b80b09a25250866c0741"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/images/GitHub的配置学习/1.png","932dcb9f9a1080a0b7edd1ce6aaffc69"],["/images/GitHub的配置学习/2.png","f3a66f9fec4bfb4292c9c1de2c0d4893"],["/images/RM2025导航调试/Robot.png","f027e04e0c2b5d360e79a96ba20e973d"],["/images/RM2025导航调试/Robot.svg","462aa4362bbb813482bf63bf15f50855"],["/images/RM2025导航调试/TF_SIM.png","fd28163c882d0c6c14e23a375cbd644a"],["/images/RM2025导航调试/image-1.png","50648c996357022966fba910faf5f362"],["/images/RM2025导航调试/image-2.png","8cbd68aff30522517f354052c8777e16"],["/images/RM2025导航调试/image-3.png","891b0bc9ed514f12216e268fdebdba0a"],["/images/RM2025导航调试/image.png","b4081fe50d696889fae2d3d74f15edac"],["/images/SMART/image-1.png","e33a3d0e3e76fa15811885f90f5f0b01"],["/images/SMART/image.png","2d56f38ffbd157b7b19901cb53c621ec"],["/images/SMART/报错2.png","0d3d6089c55f4dd47b1facb5eeef2e72"],["/images/Solidworks卸载重装流程/1.png","a3a478a58bd1b75107e39d9b0b9b94bf"],["/images/Solidworks卸载重装流程/2.png","d762e8d617a4943725fc5327714ddf3d"],["/images/Solidworks卸载重装流程/3.png","c63fa1cf2266c38e90efabb102754e5e"],["/images/Stm32学习记录/1.png","655f212e6d9fd5b9ae9b44d05d0ea514"],["/images/TurtleBot3/1.png","430d3fac8ee105873c59424a826b3ec9"],["/images/TurtleBot3/2.png","44ed17c50feaa8c22d4f7a7bea6fddd7"],["/images/TurtleBot3/报错0.png","91835f6d5edb6c47d4ae061bf8b72466"],["/images/TurtleBot3/报错1.png","4b896c488889cc11f3a67f9bec6edacc"],["/images/TurtleBot3/报错2.png","dca1e4970762d0ded1d0e2a3b5f9c60a"],["/images/Ubuntu双系统/1.png","51ad2be82306c4242ee57481790cb769"],["/images/Ubuntu双系统/10.png","5f28904bf5abede9a86458f1c1131657"],["/images/Ubuntu双系统/11.png","185d1bc5e3d611b8b9e52ad93f1ed995"],["/images/Ubuntu双系统/12.png","b51a50f826574c06bfc4e61966afbe52"],["/images/Ubuntu双系统/13.png","837f606a40eceb295422e1a6f9811282"],["/images/Ubuntu双系统/14.png","280c082fc2e6aed3758286ccb2034911"],["/images/Ubuntu双系统/15.png","ca18e7d8d825230baea8ac022c34261d"],["/images/Ubuntu双系统/16.png","336a5564c5beb1ba87f689cb25118bb8"],["/images/Ubuntu双系统/17.jpg","a13eb7c81c3fceaf14d4b230c7ba6c5a"],["/images/Ubuntu双系统/18.jpg","e16e18929cb745c4fb0ecfd601bbba96"],["/images/Ubuntu双系统/19.jpg","8ea9b6462f4a0aa5b12b7fb21f71c69e"],["/images/Ubuntu双系统/2.png","8facf0a2821ebfaff76a09b517e91189"],["/images/Ubuntu双系统/20.jpg","f6c0c03a5307ba2b722e44c22d0f78ff"],["/images/Ubuntu双系统/21.jpg","ef1ebc2bdf8e77f6b8a66f0d7afe0fc6"],["/images/Ubuntu双系统/22.jpg","d0fa06ff9630d5719513016e897fae90"],["/images/Ubuntu双系统/23.jpg","ac12a7d5bd3c01707a533ec9c05cb6cb"],["/images/Ubuntu双系统/24.jpg","ce105c7456ee58a688d6a1e35753cf29"],["/images/Ubuntu双系统/25.png","9c1902a493c9fae1c9cf35cef0306a44"],["/images/Ubuntu双系统/26.png","ab0e794b8df60e427c016c88b7463516"],["/images/Ubuntu双系统/27.png","52864272772fc878d360478dd0b4582f"],["/images/Ubuntu双系统/28.png","f916a8ff83e563abe59e08d9f3882179"],["/images/Ubuntu双系统/29.png","fea014a4bfaec8c43f6f671721f46f3b"],["/images/Ubuntu双系统/3.png","bd9160e8f2e3bbe0f09e7b4ed8a3f8db"],["/images/Ubuntu双系统/30.png","026806069decbb926223823fccf02975"],["/images/Ubuntu双系统/31.png","41ccf1c05f14fbc95c55de3bf75a09e7"],["/images/Ubuntu双系统/32.png","f22e5dd7807f7dbff2c3b2f51a6e28af"],["/images/Ubuntu双系统/33.png","2a5e79ced34951d1b4f3b00ed6c33a33"],["/images/Ubuntu双系统/34-1.png","73431b07fea0477f27be801e3d0a9197"],["/images/Ubuntu双系统/34.png","73431b07fea0477f27be801e3d0a9197"],["/images/Ubuntu双系统/35.png","d8da498e9595c0ef13e3f7430d8c6f2e"],["/images/Ubuntu双系统/4.png","fd0c26fa89f30d7a7135d102472f2d8b"],["/images/Ubuntu双系统/5.png","243582929bc7fbdc687d652aa610e464"],["/images/Ubuntu双系统/6.png","0faaae28f80da4355c957872167fbf12"],["/images/Ubuntu双系统/7.png","048d1db7c1259b8b3676e47357c07134"],["/images/Ubuntu双系统/8.png","dcd907147fcd04f8e3546806e2620eca"],["/images/Ubuntu双系统/9.png","76fc0f4333a4701964075dad549c59c1"],["/images/Ubuntu双系统/image-1.png","a76431ea5ddd40c25564950c0a3a0c75"],["/images/Ubuntu双系统/image-2.png","010546f9d174832d22ffbe22bd476cdf"],["/images/Ubuntu双系统/image-3.png","010546f9d174832d22ffbe22bd476cdf"],["/images/Ubuntu双系统/image.png","a76431ea5ddd40c25564950c0a3a0c75"],["/images/Ubuntu双系统/{40D339D4-1135-4AE7-8D39-7F71544113F8}.png","7469d787eb909d435ed54c13f40979cb"],["/images/vim使用教程/morden1.png","7cd866e532f63459ecba360a8b1afedc"],["/images/vim使用教程/vim-vi-workmodel.png","dcd25a6082e1989975c280213f3e1052"],["/images/【课设】寻迹小车/1.png","e6d0821b7b988b861f564b90263df658"],["/images/【课设】寻迹小车/10.png","3c17a58a8a7dea29b4bfbce228117ac0"],["/images/【课设】寻迹小车/11.png","2f5dc3907cbd4c29221d883282fcd946"],["/images/【课设】寻迹小车/2.png","5b35b24d0b97aa19dc10fcdcda436974"],["/images/【课设】寻迹小车/3.png","52be5c69f94058ff9eb455c8c61dc73e"],["/images/【课设】寻迹小车/4.png","3e2d0ca3121fff3c41b3df01d51ec618"],["/images/【课设】寻迹小车/5.png","695d5fa73e024587ef984a6b9cbc154a"],["/images/【课设】寻迹小车/6.png","dd4fd1841c5839f09d10d2abd6b40998"],["/images/【课设】寻迹小车/7.png","1f74198c2812c64c8f12132b44905a11"],["/images/【课设】寻迹小车/8.png","af5eff3a81a47283985d6ad6e8fc070e"],["/images/【课设】寻迹小车/9.png","d16644852928bc2ef4c0cd5de2c7a30e"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/1.png","424d73e09411191315208ab860cbfc7d"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/10.png","8af69a0de551d0b7b61a450349cbf08d"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/11.png","4a99ac6bde1b3ff6de12fa6772d746da"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/12.png","fa9f9b8909eedec755b809fb8e1ea117"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/13.png","878979cd1527f29f7181524116f75fc9"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/14.png","f49498f713b251984c2300a0bd2efe6c"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/15.png","7e0d8f1f124714960f10707d5ba61c1d"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/2.png","97c1756ca1dee6138e41c0ce74c3680c"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/3.png","c122f7795697eda105f0a1d84fe01ab8"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/4.png","9287ef806acf9791ca7ad3eeb16350bd"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/5.png","85fd08881e28922c9c6eb8458c06649f"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/6.png","a76d5f43db76df6de3e949c21545bf8f"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/7.png","74446ee743bd14c42527be1a8424c12a"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/9.png","c94c8a012bc577ff6d2e4b8e71829175"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/rosgraph.png","5c9882c63a59ad7281ba1db58f9d7ce6"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/turtlebot3_tf.png","c166372b8703668abfc7a9e2cc72097b"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/wrong1.png","fb0c79ce0719550b14505ad4c37db847"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/wrong2.png","4d6e2361511b3343d5746ee9e55ccf8f"],["/images/基于hexo的butterfiy主题的博客配置教程/{0E336FA2-1BE1-4AAE-86FC-C8476E12FC56}-1.png","dca8d24b28cae9f6fbef323338554327"],["/images/基于hexo的butterfiy主题的博客配置教程/{0E336FA2-1BE1-4AAE-86FC-C8476E12FC56}.png","dca8d24b28cae9f6fbef323338554327"],["/images/基于yolov5的数字识别/1.png","89ac0817322fb708b9a15ff1a8c766e7"],["/images/基于yolov5的数字识别/10.png","43429bcf9eca0dd71ff391e0cab75d47"],["/images/基于yolov5的数字识别/11.png","0f4f8c39e6f313a4546e42b08142cfd4"],["/images/基于yolov5的数字识别/12.png","b55f2120f8b47db67258bf4da06c7333"],["/images/基于yolov5的数字识别/13.png","afd558e880d0005257dcc311580f7702"],["/images/基于yolov5的数字识别/14.png","4be1b682cc5d0bea1a4eebca22212b3a"],["/images/基于yolov5的数字识别/15.png","9eee94a3137afcc6f098fdddea78ca0f"],["/images/基于yolov5的数字识别/16.jpg","95025aa4b9b9e9e90bf7ce178b103db8"],["/images/基于yolov5的数字识别/17.jpg","0fa2291f6e3b6d4bd776de7831da0fbc"],["/images/基于yolov5的数字识别/18.jpg","b6630dd254e3c501d7452aed526c7e08"],["/images/基于yolov5的数字识别/2.png","a0fd042f741430fe545c29c0c07f0f3f"],["/images/基于yolov5的数字识别/3.png","0817cfae82740241610308e5bc99fbb4"],["/images/基于yolov5的数字识别/4.png","e016f9ea8aff6fbf4e779f2bf7edf330"],["/images/基于yolov5的数字识别/5.png","9ab3278c1ba0289a9d0082f347d4bd23"],["/images/基于yolov5的数字识别/6.png","e3536b7b23cbbad82259bb4ae01b4469"],["/images/基于yolov5的数字识别/7.png","70938d3c73c51a784d7986ad6bc012ca"],["/images/基于yolov5的数字识别/8.png","9a3646b8430c008e199b765842dfd514"],["/images/基于yolov5的数字识别/9.png","a6151c6365596439d0417895bad977b0"],["/images/视觉处理之ROS与OpenCV的修改转换/1.png","62e10785552b894b5f2ef55729551347"],["/images/视觉处理之ROS与OpenCV的修改转换/2.png","1da124a35b38bff2d30e043d53614922"],["/images/视觉处理之ROS与OpenCV的修改转换/3.png","d5e148e5df950e6a19971e4655b63fe5"],["/images/视觉处理之ROS与OpenCV的修改转换/4.png","7e3349678d1ca38d05feaf69d59ab97d"],["/images/视觉处理之ROS与OpenCV的修改转换/5.png","19533368bdac10dd075c4b233fbe2f5f"],["/images/视觉处理之ROS与OpenCV的修改转换/6.png","c3b9350803ed8be3c3224fdc3846f69d"],["/images/视觉处理之ROS与OpenCV的修改转换/7.png","8d2e3b95e8da1545bd78091acce8c708"],["/images/视觉处理之ROS与OpenCV的修改转换/8.png","c77b5b0ee91d9639e500793a74383e4d"],["/images/视觉处理之ROS与OpenCV的修改转换/9.png","7a8fcb1e2970173548f0a136ff557633"],["/images/视觉组培训/7.png","8d2e3b95e8da1545bd78091acce8c708"],["/images/视觉组培训/image-1.png","b2dee78983d085e8104d2b6684f2f36d"],["/images/视觉组培训/image-10.png","c577640da43b7ce3d259cefc2e137df2"],["/images/视觉组培训/image-11.png","df318f4073a0baa987e2dfe76ac9e775"],["/images/视觉组培训/image-12.png","34540e50687118a2f9315a12a52d5eba"],["/images/视觉组培训/image-13.png","6553c37195cb644cb8da6bddd88dc9e5"],["/images/视觉组培训/image-14.png","74e38ad362048d727242d33b803317d9"],["/images/视觉组培训/image-15.png","818917374cf62066b89e906bef7737d8"],["/images/视觉组培训/image-16.png","e27ed37a1c6e0cedcbf8f697120065b1"],["/images/视觉组培训/image-17.png","17550176dab82bd9cdefad33dcfe00d0"],["/images/视觉组培训/image-18.png","dd6435588605bf201edf70c7d6d38558"],["/images/视觉组培训/image-2.png","9982e50d0a5ef88026c4cf4d43df9abb"],["/images/视觉组培训/image-20.png","81ab276892f653c9ab53b2b32b4b71c3"],["/images/视觉组培训/image-21.png","ffca1b6b2ea7d55d23c319c80ac1f5ea"],["/images/视觉组培训/image-3.png","e1b8b844903e37edb73de2e404c97340"],["/images/视觉组培训/image-4.png","627b8975baa6f8585ed944ae8a885471"],["/images/视觉组培训/image-5.png","c6831363e43de54abdb715b01bb66b71"],["/images/视觉组培训/image-6.png","278e0f82a345cb26053fee63c759f1ca"],["/images/视觉组培训/image-7.png","dd3bfb18667347e74a23e22e2f54f0bb"],["/images/视觉组培训/image-8.png","a7e533bc11ef5e074fa9dfa399f63569"],["/images/视觉组培训/image-9.png","9cad8a7b2c0ded333c336a76aa8a42a3"],["/images/视觉组培训/image.png","d77f3518c9c45bd49a55080bbf6b0cd6"],["/images/视觉组培训/result.png","6072536490068f45353f5e12628771c8"],["/images/视觉组培训/截图 2025-02-23 01-01-30.png","0be6aabac4834d62ce8434834990ca5e"],["/images/通过Git上传本地项目至Github/1.png","d993c29a6d4018b69a48182911e5a2f9"],["/img/0.jpg","e934378352154e9a66428a17ef2b6cc4"],["/img/0.png","a163fe12f0eedcebf17541066202d4e1"],["/img/1.png","6d8377a964659a21e4526122101e4cd5"],["/img/2.png","a40525fda647a2d79b6da73b7651c805"],["/img/3.png","56033d0598ff19cc4ee4ec2b4fc64321"],["/img/4.png","f34761405c41de7379a6018666d5c51b"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/5.png","be89248213061a2a5096dda7503ee13d"],["/img/6.png","806305fa5a9020bb79393874da4939d1"],["/img/AliPay.jpg","250e33432f3b9462cf39e60868b7cc24"],["/img/AliPay_old.jpg","e59f319325a73db9ce4901311cf75d72"],["/img/GitHub的配置学习.png","5d7ebbdc440cf529fabe179d6c6e51a2"],["/img/RM2025导航调试.png","bb0798f7564e3ab012d5df891f6e8ed0"],["/img/Rime输入法.png","5054e90cbe565470f5d3138e84551cb0"],["/img/SMART.png","c9648b17a6aef82b15722add5d35e1f8"],["/img/Solidworks卸载重装流程.png","30425a83b88b9a77dade558de911ea6c"],["/img/Terminate终端.png","bd8d05e39e4828afcf4c7bd86f28a98f"],["/img/TurtleBot3.png","41ff55acf6ecfc705c8940479685a0b2"],["/img/Ubuntu双系统.jpg","d8409e910d9c98774fbd8b10533d562d"],["/img/Ubuntu终端下载速度慢_换源.png","2c698c1d70f840e6cb52026638c70a8b"],["/img/WeChat.jpg","d88ee56336488a4ae7b4f3b31a28c700"],["/img/WeChat_old.jpg","ec967cbf8728fb251339e387a1711951"],["/img/dso安装及实验数据分析(内含miniconda3环境配置).png","f03d2f71be7bdb0db8a1354193ac4158"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/favicon/apple-touch-icon.png","8580d3908e4c7c7c7d6336690c194248"],["/img/favicon/favicon-96x96.png","3e2d967a58d3160d0af489d40bc17437"],["/img/favicon/favicon.svg","f322ce7294f9f0e47fa252541aa0912d"],["/img/favicon/web-app-manifest-144x144.png","6449b92c5e8a1c4c8b0e8913bec61328"],["/img/favicon/web-app-manifest-16x16.png","3a4ac248e23bc7a5cfb1d11eedc30619"],["/img/favicon/web-app-manifest-192x192.png","d4876752488de4ba164f77b0b562243e"],["/img/favicon/web-app-manifest-256x256.png","f48a1c745b436e23d73f2a5b6a53dfbe"],["/img/favicon/web-app-manifest-32x32.png","ebaf0a26d5fc6d349bceb8b9ebca07c3"],["/img/favicon/web-app-manifest-36x36.png","267ac7c7fb17878b82d546d70c86d776"],["/img/favicon/web-app-manifest-384x384.png","0b493a763ba4aca731db2acf6ece2139"],["/img/favicon/web-app-manifest-48x48.png","d3eb74f7cd20b835726b0e30f46461ec"],["/img/favicon/web-app-manifest-512x512.png","a9a6dd0c355b784f1d4d8e6b4d957cd8"],["/img/favicon/web-app-manifest-72x72.png","baf65cc956398ab6f462ce1c29f94310"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/light_whale.jpg","e7d2fc03e06e0cf1ff27d5b8c8f44604"],["/img/office 激活.png","6216342f04aa8b8c6331e2bce580f836"],["/img/resume.png","81fc2a3135b0f0f6d90f54beee5a0970"],["/img/whale-icon.jpg","974fee4b11d1813f7da565d0e635eb50"],["/img/【课设】寻迹小车.png","fcca42ea16c756f8aad0f6f45a1bdea0"],["/img/基于Cartographer算法的RPLIDAR激光雷达导航.png","548084a3dbb640c63645bbda97c33b63"],["/img/基于MID360的多算法导航合集.png","cdf685a99cf2496aff0141ab5f28da7a"],["/img/基于hexo的butterfiy主题的博客配置教程.png","1a17412fcb54ed810a57ac46dba4228a"],["/img/天选4连接HDMI后投屏无信号.png","e8891d57f5a2a47db9794c2c8545b57b"],["/img/抽象代数.png","c93dfd4f119f0859e4e16959b981d273"],["/img/视觉处理之ROS与OpenCV的修改转换.png","648030a3e1c2fd2dba5dc1514224f794"],["/img/解决VMware下Ubuntu22.04无法联网问题.png","3f9c98d820adcba4d3a298f1ab555029"],["/img/通过Git上传本地项目至Github.png","e96df0f06e6946260cf1ca32b2fc7273"],["/index.html","72b96fb59dd58a686aceb29200199f12"],["/js/cherry.js","be192abc4fe65913eef8d27e2393c34f"],["/js/main.js","960297fafacb19dff1246d71f6dfcf6f"],["/js/refresh.js","151c3c537dc49554572d0033dce1dab4"],["/js/ripples.js","85965bea50ad3cc59f7bde5a95819996"],["/js/running-time.js","96e49113586bc2efdd57b4f0dea271a4"],["/js/search/algolia.js","4491ac1d470a1693a502a9d09034aa21"],["/js/search/local-search.js","9da6b76672a143c8c8449770a8d259f3"],["/js/timing.js","fb776476ed36f9427081939ccceb1613"],["/js/tw_cn.js","fb4da68124bbafbd2d3da537c80e27ce"],["/js/utils.js","420a15cf446b5670244a9ea05b2bccf0"],["/js/website-title.js","823453db829ea9eaa513a6b964223a71"],["/js/window.js","d0919a55cddfcb35a8d7c1156b1dcb6d"],["/lib/hbe.js","92665a6e3b10e8b1750bffb6fc01e7e8"],["/link/index.html","854ea864d079b8e905096dbc4fd55ae1"],["/page/2/index.html","f08a952e93434bef201a01a7dff4e7c4"],["/page/3/index.html","614ceb304147fd3f26043542f61d2f2e"],["/resume/index.html","4bd13186b1f1d0ab70946917db6dece7"],["/search.xml","c0bd88fcbb2b3d16027b711f17ccb9c6"],["/sw-register.js","cf9f20a75b6c55e5680d3755d2f7926c"],["/tags/Anaconda3/index.html","858db22ca49c6926256848da44091fd8"],["/tags/Blog/index.html","0040e01c9a74268cae251bb1c5e765e2"],["/tags/Blog/page/2/index.html","a4749ee74b4ff106d4144ee6f5f5a413"],["/tags/Blog/page/3/index.html","e4e78f1d43209b17e7e23f26f2f18736"],["/tags/Cartographer/index.html","33a0fbc4b6ac1a388430239ebd697619"],["/tags/E5/index.html","2205943cf270fb1ff76f3f11adcb6e07"],["/tags/Environment/index.html","30e352c48bedb711654673b9770467de"],["/tags/Fastlio/index.html","2bc644d1b77cedada506af77edd817e7"],["/tags/Git/index.html","a636c73abf47087dff586dcfeb502535"],["/tags/GitHub/index.html","a9674f2d1d74a9ba8cad2f8ce6474257"],["/tags/Linux/index.html","3ed0ec2bc6de450714f06f04e2648e2d"],["/tags/MID360/index.html","059eb4c46a3821b9c0c0ca22dd6f8ed3"],["/tags/Markdown/index.html","094210015ac2394f8f8ba19109548221"],["/tags/Office-Tool-Plus/index.html","f8ffe3db9c9b5107669d848d7ca9ed6d"],["/tags/Office/index.html","be16c8ba67b4bcfb9c7c026ed1837032"],["/tags/OpenCV/index.html","bb95f3f49913479568ebf3b9564e7802"],["/tags/Pointlio/index.html","dc668dce887361d795d18d6ebaa804df"],["/tags/RM/index.html","c6c17e6660ff35c26ea62b4ddf5682d4"],["/tags/ROS/index.html","79a310e7cb398887c0faa160ad0afdcd"],["/tags/RPLIDAR/index.html","53d5f23b81208861167e0c312fdb8fb4"],["/tags/RoboMaster/index.html","a507b16ecf8e6dddff70e8d1bbdd19f5"],["/tags/SLAM/index.html","fde69fe5da8056e64fefe50f3923d9b6"],["/tags/SMART/index.html","e1636c5776f75162ef92b4fdaa520b75"],["/tags/Solidworks/index.html","396c9651a7d9a4787df4edb05115d5ec"],["/tags/butterfly/index.html","5f796b4ada591ee78942d03aa2e4187b"],["/tags/dso/index.html","ef48e0da704fe0a969dc5a4c08adce14"],["/tags/gazebo/index.html","fdaf5ab552a3b46375c89a76e8f6da4a"],["/tags/hexo/index.html","300b5ef74e3da880851f038bb8542f1e"],["/tags/humble/index.html","a97c25353384c983b7d794f0c9fd9165"],["/tags/index.html","eeccaf4485c9e8cbb2ca7cab1f5f8ed9"],["/tags/miniconda3/index.html","0e2650e56f3b0c70ef3f697b466387f0"],["/tags/obstacle/index.html","f29acaa92ab5e98ea2cdd56f8470ea14"],["/tags/stm32/index.html","87a29c6a90978989e3d3995c471fe884"],["/tags/tec/index.html","10efc24d2691c0c1d36668df0404f552"],["/tags/terminate/index.html","46b5ada334de7d56f0e5b02fb6e79f4d"],["/tags/turtlebot/index.html","4b5e973286df4a867c9ae5fd988152c4"],["/tags/ubuntu/index.html","1d0af821976d76ffcc8bccf8cad0165d"],["/tags/ubuntu22-04/index.html","695448b5ee1a77ef005e907fa779971f"],["/tags/vim/index.html","b9bd242581af334f24c733869ffc608d"],["/tags/yolov5/index.html","e694747147349a367b56e03b9c91bd85"],["/tags/单片机/index.html","f3fc196c21415534724de51f3ab92186"],["/tags/博客/index.html","d74338a10f1c11a3857d92c1206ce03b"],["/tags/双系统/index.html","a5d938c2e8e804fa5dcb621cfe1ee0d7"],["/tags/天选4/index.html","36013ade23ad8428eead70c0eee0f396"],["/tags/寻迹小车/index.html","b150f7f648577dc4daeb5542e9bc81be"],["/tags/导航/index.html","292cb279664326bda2fe715817a84c2d"],["/tags/投屏/index.html","4003c2b53e86392fe8eb06b3970700f1"],["/tags/教程/index.html","a21da2a74870cc6f4b1b94342964eaa3"],["/tags/数字识别/index.html","19f9e0058cf12a90ac21f5f483d3f66a"],["/tags/机械/index.html","2a818b0cd58285a5b4d6ad364c23c027"],["/tags/网络/index.html","e0fc516cc7e02825049eb5b46dd56a39"],["/tags/虚拟仿真/index.html","fd8f9432a2f83ea01156f7d643acecc5"],["/tags/视觉组/index.html","086c4450a0cbf713a6f4eedc8a3d1c9d"],["/tags/视觉组培训/index.html","16037d02779277249fddb77430add6a5"],["/tags/课设/index.html","07a081a35e930d9d4ff4fb1cfe654669"],["/tags/软件/index.html","13525f497b4bbc3bf3bb8d8007d499dd"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });



// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache 配置转换后的 toolbox 代码.

toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"cdn.jsdelivr.net"});
toolbox.router.get("/*", toolbox.cacheFirst, {"jquery":"https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js","origin":"cdn.jsdelivr.net"});





/* eslint-enable */
