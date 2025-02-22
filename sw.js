/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/07/10/Learning Markdown/index.html","43fa4fa597d8f87927b0113d55291568"],["/2024/07/10/Preface/index.html","eba11d185a14914ff1a40bf06efb5fe5"],["/2024/07/15/Deploy Environment to Anaconda3/index.html","243361785f8aea1a886f0ffe822d1a38"],["/2024/07/16/基于yolov5的数字识别/index.html","c3a56b2b51e25a672502dd2dc494cd1b"],["/2024/08/01/视觉处理之ROS与OpenCV的修改转换/index.html","fd2860e676f9fda5f413a3c043f74c24"],["/2024/08/18/Ubuntu终端下载速度慢_换源/index.html","17ccd33042302d23000d314042d0e7f2"],["/2024/08/20/dso安装及实验数据分析(内含miniconda3环境配置)/index.html","6e7ed97295e9ada04bdffd13b310951f"],["/2024/08/21/Solidworks卸载重装流程/index.html","6f8d7b3d35173b225d3f6275dfd0bbff"],["/2024/08/25/office 激活/index.html","bb09c2c1b5ad8ce0bcffd4fa1e5c2954"],["/2024/08/26/解决VMware下Ubuntu22.04无法联网问题/index.html","2c413564c3707c18f97bed7606dc9726"],["/2024/09/15/通过Git上传本地项目至Github/index.html","9b314a3c6987b37e05ba08c30c264450"],["/2024/09/22/SMART/index.html","173bb86501015ab3e2e16b6ac7d4518c"],["/2024/09/22/基于Cartographer算法的RPLIDAR激光雷达导航/index.html","2ea627e59f1b64fd56729e6285756c55"],["/2024/09/22/基于hexo的butterfiy主题的博客配置教程/index.html","0358c6690ef01ea936e8680dec2edc31"],["/2024/09/22/抽象代数/index.html","69e7e4b84a898fd0a524fa41ff49fe61"],["/2024/10/10/Terminate终端/index.html","8117b4ce99bc6ed17183a619284c7c30"],["/2024/10/10/TurtleBot3/index.html","219c22eb7a287ccdcd77d66708284c58"],["/2024/10/11/vim使用教程/index.html","7de42be8856c6100cd3c128e325effa1"],["/2024/10/20/Stm32学习记录/index.html","89293a35eaf453613c5a71bba091bbd3"],["/2024/10/22/视觉组培训/index.html","d336f443dcc28e3ca8df782d447b09d6"],["/2024/11/14/【课设】寻迹小车/index.html","22e1270927bbfc455811eae917826e7c"],["/2025/01/10/基于MID360的多算法导航合集/index.html","0933868fdc3d4143189cf94b1a0c42ce"],["/2025/01/10/天选4连接HDMI后投屏无信号/index.html","8bdf08788aa4a25cab4f4b34164b2b18"],["/2025/02/04/GitHub的配置学习/index.html","92035b15e69d4a01d4b2f9cb3d1b415d"],["/2025/02/11/Ubuntu双系统/index.html","13cd41672e24f3fbcdd10442c099f119"],["/2025/02/13/Rime输入法/index.html","f109371c7fbe7f1e60aff5488cdd5ddc"],["/2025/02/14/RM2025导航调试/index.html","0421004f4e1af6a824dcc20735f30f0f"],["/archives/2024/07/index.html","7a955642b425e5cb3201dd71f3761001"],["/archives/2024/08/index.html","810f0c3d5d788187f6bc7845edf014a0"],["/archives/2024/09/index.html","70d0aef5d2721ff838e1709206a555ac"],["/archives/2024/10/index.html","ad05f7a4624787bba4828535202e5af8"],["/archives/2024/11/index.html","3cfa28acf7098401b35a9665270e88fc"],["/archives/2024/index.html","ba9e8a88e196dfc687f3dceba3f14799"],["/archives/2024/page/2/index.html","dbcad0140d03b150e7e07d67c5bbe71e"],["/archives/2024/page/3/index.html","4592e6aa8bbe31a4b96587513ce2ac0a"],["/archives/2025/01/index.html","51e8c00b542c6f7c4b431fd2512666f7"],["/archives/2025/02/index.html","054adfbff92171e28c54c7cf2e848320"],["/archives/2025/index.html","eead7095c1ea7ff56ea6bacb160d623c"],["/archives/index.html","be64c4fd3e25ee274958f98d372a2458"],["/archives/page/2/index.html","fe6bb8ec2cd1d260c84d2601f0528719"],["/archives/page/3/index.html","1bebc3f36b9b1c7fee29de1fc0e9dbc6"],["/categories/index.html","4be311cc2cfc4e49b215d94d6bb16c49"],["/css/cursor.css","c784f5edde73b464bca58f6b5ae48798"],["/css/hbe.style.css","de85c19b502c6c5d197b9b3dde47a3f1"],["/css/home_transparent.css","581b100e092118d97bbb65f035d6caaa"],["/css/index.css","e2744197d3ed2e89723630eade984e7b"],["/css/top_img_transparent.css","4f4c177a2889b80b09a25250866c0741"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/images/GitHub的配置学习/1.png","932dcb9f9a1080a0b7edd1ce6aaffc69"],["/images/GitHub的配置学习/2.png","f3a66f9fec4bfb4292c9c1de2c0d4893"],["/images/RM2025导航调试/Robot.png","f027e04e0c2b5d360e79a96ba20e973d"],["/images/RM2025导航调试/Robot.svg","462aa4362bbb813482bf63bf15f50855"],["/images/RM2025导航调试/TF_SIM.png","fd28163c882d0c6c14e23a375cbd644a"],["/images/RM2025导航调试/image-1.png","50648c996357022966fba910faf5f362"],["/images/RM2025导航调试/image-2.png","8cbd68aff30522517f354052c8777e16"],["/images/RM2025导航调试/image-3.png","891b0bc9ed514f12216e268fdebdba0a"],["/images/RM2025导航调试/image.png","b4081fe50d696889fae2d3d74f15edac"],["/images/SMART/image-1.png","e33a3d0e3e76fa15811885f90f5f0b01"],["/images/SMART/image.png","2d56f38ffbd157b7b19901cb53c621ec"],["/images/SMART/报错2.png","0d3d6089c55f4dd47b1facb5eeef2e72"],["/images/Solidworks卸载重装流程/1.png","a3a478a58bd1b75107e39d9b0b9b94bf"],["/images/Solidworks卸载重装流程/2.png","d762e8d617a4943725fc5327714ddf3d"],["/images/Solidworks卸载重装流程/3.png","c63fa1cf2266c38e90efabb102754e5e"],["/images/Stm32学习记录/1.png","655f212e6d9fd5b9ae9b44d05d0ea514"],["/images/TurtleBot3/1.png","430d3fac8ee105873c59424a826b3ec9"],["/images/TurtleBot3/2.png","44ed17c50feaa8c22d4f7a7bea6fddd7"],["/images/TurtleBot3/报错0.png","91835f6d5edb6c47d4ae061bf8b72466"],["/images/TurtleBot3/报错1.png","4b896c488889cc11f3a67f9bec6edacc"],["/images/TurtleBot3/报错2.png","dca1e4970762d0ded1d0e2a3b5f9c60a"],["/images/Ubuntu双系统/1.png","51ad2be82306c4242ee57481790cb769"],["/images/Ubuntu双系统/10.png","5f28904bf5abede9a86458f1c1131657"],["/images/Ubuntu双系统/11.png","185d1bc5e3d611b8b9e52ad93f1ed995"],["/images/Ubuntu双系统/12.png","b51a50f826574c06bfc4e61966afbe52"],["/images/Ubuntu双系统/13.png","837f606a40eceb295422e1a6f9811282"],["/images/Ubuntu双系统/14.png","280c082fc2e6aed3758286ccb2034911"],["/images/Ubuntu双系统/15.png","ca18e7d8d825230baea8ac022c34261d"],["/images/Ubuntu双系统/16.png","336a5564c5beb1ba87f689cb25118bb8"],["/images/Ubuntu双系统/17.jpg","a13eb7c81c3fceaf14d4b230c7ba6c5a"],["/images/Ubuntu双系统/18.jpg","e16e18929cb745c4fb0ecfd601bbba96"],["/images/Ubuntu双系统/19.jpg","8ea9b6462f4a0aa5b12b7fb21f71c69e"],["/images/Ubuntu双系统/2.png","8facf0a2821ebfaff76a09b517e91189"],["/images/Ubuntu双系统/20.jpg","f6c0c03a5307ba2b722e44c22d0f78ff"],["/images/Ubuntu双系统/21.jpg","ef1ebc2bdf8e77f6b8a66f0d7afe0fc6"],["/images/Ubuntu双系统/22.jpg","d0fa06ff9630d5719513016e897fae90"],["/images/Ubuntu双系统/23.jpg","ac12a7d5bd3c01707a533ec9c05cb6cb"],["/images/Ubuntu双系统/24.jpg","ce105c7456ee58a688d6a1e35753cf29"],["/images/Ubuntu双系统/25.png","9c1902a493c9fae1c9cf35cef0306a44"],["/images/Ubuntu双系统/26.png","ab0e794b8df60e427c016c88b7463516"],["/images/Ubuntu双系统/27.png","52864272772fc878d360478dd0b4582f"],["/images/Ubuntu双系统/28.png","f916a8ff83e563abe59e08d9f3882179"],["/images/Ubuntu双系统/29.png","fea014a4bfaec8c43f6f671721f46f3b"],["/images/Ubuntu双系统/3.png","bd9160e8f2e3bbe0f09e7b4ed8a3f8db"],["/images/Ubuntu双系统/30.png","026806069decbb926223823fccf02975"],["/images/Ubuntu双系统/31.png","41ccf1c05f14fbc95c55de3bf75a09e7"],["/images/Ubuntu双系统/32.png","f22e5dd7807f7dbff2c3b2f51a6e28af"],["/images/Ubuntu双系统/33.png","2a5e79ced34951d1b4f3b00ed6c33a33"],["/images/Ubuntu双系统/34-1.png","73431b07fea0477f27be801e3d0a9197"],["/images/Ubuntu双系统/34.png","73431b07fea0477f27be801e3d0a9197"],["/images/Ubuntu双系统/35.png","d8da498e9595c0ef13e3f7430d8c6f2e"],["/images/Ubuntu双系统/4.png","fd0c26fa89f30d7a7135d102472f2d8b"],["/images/Ubuntu双系统/5.png","243582929bc7fbdc687d652aa610e464"],["/images/Ubuntu双系统/6.png","0faaae28f80da4355c957872167fbf12"],["/images/Ubuntu双系统/7.png","048d1db7c1259b8b3676e47357c07134"],["/images/Ubuntu双系统/8.png","dcd907147fcd04f8e3546806e2620eca"],["/images/Ubuntu双系统/9.png","76fc0f4333a4701964075dad549c59c1"],["/images/Ubuntu双系统/image-1.png","a76431ea5ddd40c25564950c0a3a0c75"],["/images/Ubuntu双系统/image-2.png","010546f9d174832d22ffbe22bd476cdf"],["/images/Ubuntu双系统/image-3.png","010546f9d174832d22ffbe22bd476cdf"],["/images/Ubuntu双系统/image.png","a76431ea5ddd40c25564950c0a3a0c75"],["/images/Ubuntu双系统/{40D339D4-1135-4AE7-8D39-7F71544113F8}.png","7469d787eb909d435ed54c13f40979cb"],["/images/vim使用教程/morden1.png","7cd866e532f63459ecba360a8b1afedc"],["/images/vim使用教程/vim-vi-workmodel.png","dcd25a6082e1989975c280213f3e1052"],["/images/【课设】寻迹小车/1.png","e6d0821b7b988b861f564b90263df658"],["/images/【课设】寻迹小车/10.png","3c17a58a8a7dea29b4bfbce228117ac0"],["/images/【课设】寻迹小车/11.png","2f5dc3907cbd4c29221d883282fcd946"],["/images/【课设】寻迹小车/2.png","5b35b24d0b97aa19dc10fcdcda436974"],["/images/【课设】寻迹小车/3.png","52be5c69f94058ff9eb455c8c61dc73e"],["/images/【课设】寻迹小车/4.png","3e2d0ca3121fff3c41b3df01d51ec618"],["/images/【课设】寻迹小车/5.png","695d5fa73e024587ef984a6b9cbc154a"],["/images/【课设】寻迹小车/6.png","dd4fd1841c5839f09d10d2abd6b40998"],["/images/【课设】寻迹小车/7.png","1f74198c2812c64c8f12132b44905a11"],["/images/【课设】寻迹小车/8.png","af5eff3a81a47283985d6ad6e8fc070e"],["/images/【课设】寻迹小车/9.png","d16644852928bc2ef4c0cd5de2c7a30e"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/1.png","424d73e09411191315208ab860cbfc7d"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/10.png","8af69a0de551d0b7b61a450349cbf08d"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/11.png","4a99ac6bde1b3ff6de12fa6772d746da"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/12.png","fa9f9b8909eedec755b809fb8e1ea117"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/13.png","878979cd1527f29f7181524116f75fc9"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/14.png","f49498f713b251984c2300a0bd2efe6c"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/15.png","7e0d8f1f124714960f10707d5ba61c1d"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/2.png","97c1756ca1dee6138e41c0ce74c3680c"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/3.png","c122f7795697eda105f0a1d84fe01ab8"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/4.png","9287ef806acf9791ca7ad3eeb16350bd"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/5.png","85fd08881e28922c9c6eb8458c06649f"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/6.png","a76d5f43db76df6de3e949c21545bf8f"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/7.png","74446ee743bd14c42527be1a8424c12a"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/9.png","c94c8a012bc577ff6d2e4b8e71829175"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/rosgraph.png","5c9882c63a59ad7281ba1db58f9d7ce6"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/turtlebot3_tf.png","c166372b8703668abfc7a9e2cc72097b"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/wrong1.png","fb0c79ce0719550b14505ad4c37db847"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/wrong2.png","4d6e2361511b3343d5746ee9e55ccf8f"],["/images/基于hexo的butterfiy主题的博客配置教程/{0E336FA2-1BE1-4AAE-86FC-C8476E12FC56}-1.png","dca8d24b28cae9f6fbef323338554327"],["/images/基于hexo的butterfiy主题的博客配置教程/{0E336FA2-1BE1-4AAE-86FC-C8476E12FC56}.png","dca8d24b28cae9f6fbef323338554327"],["/images/基于yolov5的数字识别/1.png","89ac0817322fb708b9a15ff1a8c766e7"],["/images/基于yolov5的数字识别/10.png","43429bcf9eca0dd71ff391e0cab75d47"],["/images/基于yolov5的数字识别/11.png","0f4f8c39e6f313a4546e42b08142cfd4"],["/images/基于yolov5的数字识别/12.png","b55f2120f8b47db67258bf4da06c7333"],["/images/基于yolov5的数字识别/13.png","afd558e880d0005257dcc311580f7702"],["/images/基于yolov5的数字识别/14.png","4be1b682cc5d0bea1a4eebca22212b3a"],["/images/基于yolov5的数字识别/15.png","9eee94a3137afcc6f098fdddea78ca0f"],["/images/基于yolov5的数字识别/16.jpg","95025aa4b9b9e9e90bf7ce178b103db8"],["/images/基于yolov5的数字识别/17.jpg","0fa2291f6e3b6d4bd776de7831da0fbc"],["/images/基于yolov5的数字识别/18.jpg","b6630dd254e3c501d7452aed526c7e08"],["/images/基于yolov5的数字识别/2.png","a0fd042f741430fe545c29c0c07f0f3f"],["/images/基于yolov5的数字识别/3.png","0817cfae82740241610308e5bc99fbb4"],["/images/基于yolov5的数字识别/4.png","e016f9ea8aff6fbf4e779f2bf7edf330"],["/images/基于yolov5的数字识别/5.png","9ab3278c1ba0289a9d0082f347d4bd23"],["/images/基于yolov5的数字识别/6.png","e3536b7b23cbbad82259bb4ae01b4469"],["/images/基于yolov5的数字识别/7.png","70938d3c73c51a784d7986ad6bc012ca"],["/images/基于yolov5的数字识别/8.png","9a3646b8430c008e199b765842dfd514"],["/images/基于yolov5的数字识别/9.png","a6151c6365596439d0417895bad977b0"],["/images/视觉处理之ROS与OpenCV的修改转换/1.png","62e10785552b894b5f2ef55729551347"],["/images/视觉处理之ROS与OpenCV的修改转换/2.png","1da124a35b38bff2d30e043d53614922"],["/images/视觉处理之ROS与OpenCV的修改转换/3.png","d5e148e5df950e6a19971e4655b63fe5"],["/images/视觉处理之ROS与OpenCV的修改转换/4.png","7e3349678d1ca38d05feaf69d59ab97d"],["/images/视觉处理之ROS与OpenCV的修改转换/5.png","19533368bdac10dd075c4b233fbe2f5f"],["/images/视觉处理之ROS与OpenCV的修改转换/6.png","c3b9350803ed8be3c3224fdc3846f69d"],["/images/视觉处理之ROS与OpenCV的修改转换/7.png","8d2e3b95e8da1545bd78091acce8c708"],["/images/视觉处理之ROS与OpenCV的修改转换/8.png","c77b5b0ee91d9639e500793a74383e4d"],["/images/视觉处理之ROS与OpenCV的修改转换/9.png","7a8fcb1e2970173548f0a136ff557633"],["/images/通过Git上传本地项目至Github/1.png","d993c29a6d4018b69a48182911e5a2f9"],["/img/0.jpg","e934378352154e9a66428a17ef2b6cc4"],["/img/0.png","a163fe12f0eedcebf17541066202d4e1"],["/img/1.png","6d8377a964659a21e4526122101e4cd5"],["/img/2.png","a40525fda647a2d79b6da73b7651c805"],["/img/3.png","56033d0598ff19cc4ee4ec2b4fc64321"],["/img/4.png","f34761405c41de7379a6018666d5c51b"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/5.png","be89248213061a2a5096dda7503ee13d"],["/img/6.png","806305fa5a9020bb79393874da4939d1"],["/img/AliPay.jpg","250e33432f3b9462cf39e60868b7cc24"],["/img/AliPay_old.jpg","e59f319325a73db9ce4901311cf75d72"],["/img/GitHub的配置学习.png","5d7ebbdc440cf529fabe179d6c6e51a2"],["/img/RM2025导航调试.png","bb0798f7564e3ab012d5df891f6e8ed0"],["/img/Rime输入法.png","5054e90cbe565470f5d3138e84551cb0"],["/img/SMART.png","c9648b17a6aef82b15722add5d35e1f8"],["/img/Solidworks卸载重装流程.png","30425a83b88b9a77dade558de911ea6c"],["/img/Terminate终端.png","bd8d05e39e4828afcf4c7bd86f28a98f"],["/img/TurtleBot3.png","41ff55acf6ecfc705c8940479685a0b2"],["/img/Ubuntu双系统.jpg","d8409e910d9c98774fbd8b10533d562d"],["/img/Ubuntu终端下载速度慢_换源.png","2c698c1d70f840e6cb52026638c70a8b"],["/img/WeChat.jpg","d88ee56336488a4ae7b4f3b31a28c700"],["/img/WeChat_old.jpg","ec967cbf8728fb251339e387a1711951"],["/img/dso安装及实验数据分析(内含miniconda3环境配置).png","f03d2f71be7bdb0db8a1354193ac4158"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/favicon/apple-touch-icon.png","8580d3908e4c7c7c7d6336690c194248"],["/img/favicon/favicon-96x96.png","3e2d967a58d3160d0af489d40bc17437"],["/img/favicon/favicon.svg","f322ce7294f9f0e47fa252541aa0912d"],["/img/favicon/web-app-manifest-144x144.png","6449b92c5e8a1c4c8b0e8913bec61328"],["/img/favicon/web-app-manifest-16x16.png","3a4ac248e23bc7a5cfb1d11eedc30619"],["/img/favicon/web-app-manifest-192x192.png","d4876752488de4ba164f77b0b562243e"],["/img/favicon/web-app-manifest-256x256.png","f48a1c745b436e23d73f2a5b6a53dfbe"],["/img/favicon/web-app-manifest-32x32.png","ebaf0a26d5fc6d349bceb8b9ebca07c3"],["/img/favicon/web-app-manifest-36x36.png","267ac7c7fb17878b82d546d70c86d776"],["/img/favicon/web-app-manifest-384x384.png","0b493a763ba4aca731db2acf6ece2139"],["/img/favicon/web-app-manifest-48x48.png","d3eb74f7cd20b835726b0e30f46461ec"],["/img/favicon/web-app-manifest-512x512.png","a9a6dd0c355b784f1d4d8e6b4d957cd8"],["/img/favicon/web-app-manifest-72x72.png","baf65cc956398ab6f462ce1c29f94310"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/light_whale.jpg","e7d2fc03e06e0cf1ff27d5b8c8f44604"],["/img/office 激活.png","6216342f04aa8b8c6331e2bce580f836"],["/img/resume.png","81fc2a3135b0f0f6d90f54beee5a0970"],["/img/whale-icon.jpg","974fee4b11d1813f7da565d0e635eb50"],["/img/【课设】寻迹小车.png","fcca42ea16c756f8aad0f6f45a1bdea0"],["/img/基于Cartographer算法的RPLIDAR激光雷达导航.png","548084a3dbb640c63645bbda97c33b63"],["/img/基于MID360的多算法导航合集.png","cdf685a99cf2496aff0141ab5f28da7a"],["/img/基于hexo的butterfiy主题的博客配置教程.png","1a17412fcb54ed810a57ac46dba4228a"],["/img/天选4连接HDMI后投屏无信号.png","e8891d57f5a2a47db9794c2c8545b57b"],["/img/抽象代数.png","c93dfd4f119f0859e4e16959b981d273"],["/img/视觉处理之ROS与OpenCV的修改转换.png","648030a3e1c2fd2dba5dc1514224f794"],["/img/解决VMware下Ubuntu22.04无法联网问题.png","3f9c98d820adcba4d3a298f1ab555029"],["/img/通过Git上传本地项目至Github.png","e96df0f06e6946260cf1ca32b2fc7273"],["/index.html","4dc5853727e9a7a25bad84ef12011882"],["/js/back_cherry.js","0ae4ee9757d30948a35b23e748a82515"],["/js/cherry.js","be192abc4fe65913eef8d27e2393c34f"],["/js/main.js","960297fafacb19dff1246d71f6dfcf6f"],["/js/refresh.js","151c3c537dc49554572d0033dce1dab4"],["/js/ripples.js","85965bea50ad3cc59f7bde5a95819996"],["/js/running-time.js","96e49113586bc2efdd57b4f0dea271a4"],["/js/search/algolia.js","4491ac1d470a1693a502a9d09034aa21"],["/js/search/local-search.js","9da6b76672a143c8c8449770a8d259f3"],["/js/timing.js","fb776476ed36f9427081939ccceb1613"],["/js/tw_cn.js","fb4da68124bbafbd2d3da537c80e27ce"],["/js/utils.js","420a15cf446b5670244a9ea05b2bccf0"],["/js/website-title.js","823453db829ea9eaa513a6b964223a71"],["/js/window.js","d0919a55cddfcb35a8d7c1156b1dcb6d"],["/lib/hbe.js","92665a6e3b10e8b1750bffb6fc01e7e8"],["/link/index.html","d5fed70f090abae7176e3366e24ef996"],["/page/2/index.html","1e6c8301e0fcb5780d044accf0033b0c"],["/page/3/index.html","72be2321798432771d21f1dbfdcad8f4"],["/resume/index.html","145d6487a0a7c7eb80a6eea8b9bd9719"],["/search.xml","284c71f1f213ad9740157a6e21a0007c"],["/sw-register.js","38dec9ee2f1d273b8cbddbbacd78eac3"],["/tags/Anaconda3/index.html","339a47c1b1b01d0d92890a20b8dc2c47"],["/tags/Blog/index.html","5a79c479f30e7c31e1b0e534ea60ff9c"],["/tags/Blog/page/2/index.html","d9e5feb6cc843cf90a97d2726cb72969"],["/tags/Blog/page/3/index.html","d55f0f4632dc2c02235979250e6b9020"],["/tags/Cartographer/index.html","33461b1fbd52a714fec952911b3635b5"],["/tags/E5/index.html","af84f920f573249d897b0d59fa384fa7"],["/tags/Environment/index.html","92be096cdd9f9ebc6484b2a890992238"],["/tags/Fastlio/index.html","c5048918c2e1d178105d45c6a33e8af6"],["/tags/Git/index.html","7049913b4ffe9648a9938ecfc105c837"],["/tags/GitHub/index.html","289ef55297fe295a449fa635462280f7"],["/tags/Linux/index.html","510ed8880e344cc1c43ffb8205e75b72"],["/tags/MID360/index.html","088ad8bcd48e49dc96dc054808adb804"],["/tags/Markdown/index.html","e2c273d5b904604f1fda3d956c116754"],["/tags/Office-Tool-Plus/index.html","d30ea3f97305cc5a93e3a543ba3faaff"],["/tags/Office/index.html","f90eec8c5a831952b7ecdbbd87231707"],["/tags/OpenCV/index.html","9ab65e0d4fde6cb43567bac64c76deb5"],["/tags/Pointlio/index.html","801fe2e5a99362a0e8d69be2315f54fa"],["/tags/RM/index.html","9acce40c0ca823e5b8ef730b7e08b4c8"],["/tags/ROS/index.html","235415ac8d9dd10e1d90a0d0ccbee82a"],["/tags/RPLIDAR/index.html","49270f55d52cdbf49cc7d5715768ebbd"],["/tags/RoboMaster/index.html","2faee13d6b4cb4cb3e8f5f910484416c"],["/tags/SLAM/index.html","1f85a0002c58539b2c65bf9daebc4d41"],["/tags/SMART/index.html","fd92c3fcfd71e0b99640376b22384d6e"],["/tags/Solidworks/index.html","a050646e861076232c7023f3582ddb8d"],["/tags/butterfly/index.html","d09cbfb9dd76ce0629aa9acb4ccd5614"],["/tags/dso/index.html","f25c7a6942756754a4560a6349ca2d09"],["/tags/gazebo/index.html","ac1b31955aabf55095fe6c2f72bb688a"],["/tags/hexo/index.html","766f88541478d6124299cf431286f730"],["/tags/humble/index.html","0e103e35adc262f8c2edd007c8fd7d5f"],["/tags/index.html","37522f2be2c86a78d6e2498c2956410e"],["/tags/miniconda3/index.html","f391a882e42e9960ef946a5bc521e87d"],["/tags/obstacle/index.html","7bf47006c293910b765a1e7b00f187ec"],["/tags/stm32/index.html","f83a54e5ab8171d1fdf92843489b02c6"],["/tags/tec/index.html","365cb76e86ed04b43f306320144d5a75"],["/tags/terminate/index.html","08333af0c0ee04a8d0ace9cbf42f7617"],["/tags/turtlebot/index.html","6b2a6f5ef691d9698b1e341a2685a1f5"],["/tags/ubuntu/index.html","439821032116c33d7d3bd45d32dc7b44"],["/tags/ubuntu22-04/index.html","6866c1c3cffdeedff7563911062c1bdc"],["/tags/vim/index.html","6505354fabbd729dd54b9060913b648d"],["/tags/yolov5/index.html","0cd67643282ae30c5562a4f91d4f84b7"],["/tags/单片机/index.html","4b0b0f3437f30a35e76aa6391ec8205c"],["/tags/博客/index.html","9cac6dcbfa7e129a495d06f5ca8c8832"],["/tags/双系统/index.html","f33b9705fd3eb547c550795b08b14e5f"],["/tags/天选4/index.html","57c91bea39168b1557ef13b9d99ea874"],["/tags/寻迹小车/index.html","78ee1ea0ac8d6d4c9b1014131e6e2b24"],["/tags/导航/index.html","6bb3e3ab827f6df48bbf5849ab4c2850"],["/tags/投屏/index.html","cde05820cbac17feb97d58b80b3488d0"],["/tags/教程/index.html","ad4546e7ace5db0c5ab91c7ddfcd0150"],["/tags/数字识别/index.html","a982eb2724519d512a8bcf01df3c0803"],["/tags/机械/index.html","fda2ec4513fdb7c1e04299f0f93be084"],["/tags/网络/index.html","0102a260c3f763be121fd2072f444f98"],["/tags/虚拟仿真/index.html","d1ab911d21d5ea33f90637977d8a557c"],["/tags/视觉组/index.html","4109b54da82b028ca41aace3af4b2f51"],["/tags/视觉组培训/index.html","f645f724f5ad523711e2b90f7fd4223e"],["/tags/课设/index.html","248a27ffd53f5d2be9bb6335f2363d4b"],["/tags/软件/index.html","574b2e764c0bb9cbf679a87ba6e3b7a9"]];
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
