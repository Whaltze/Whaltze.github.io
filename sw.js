/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/07/10/Learning Markdown/index.html","c00e3b392870dd1f8a84b169cae9afe0"],["/2024/07/10/Preface/index.html","4b5bbad74fc8bd0b32ce21b6dff2ca2f"],["/2024/07/15/Deploy Environment to Anaconda3/index.html","985d34a10c2bbebc3440ca74b5f51753"],["/2024/07/16/基于yolov5的数字识别/index.html","839f961491bfcb3d5a1828d5b4174483"],["/2024/08/01/视觉处理之ROS与OpenCV的修改转换/index.html","f0234455d7955f66ac2c31f3406afa14"],["/2024/08/18/Ubuntu终端下载速度慢_换源/index.html","4acb10b52142e218cc7fabe126e5a032"],["/2024/08/20/dso安装及实验数据分析(内含miniconda3环境配置)/index.html","6baea7061e7d2198931c5e43950d2d9c"],["/2024/08/21/Solidworks卸载重装流程/index.html","85d13e23742a06b5b9cdedf827e7eb64"],["/2024/08/25/office 激活/index.html","38d2979966ed689e265b0863c7861f18"],["/2024/08/26/解决VMware下Ubuntu22.04无法联网问题/index.html","e34eb0443f5568b495b58f2d6666465e"],["/2024/09/15/通过Git上传本地项目至Github/index.html","641d79ff62e0ea8e46285461e77fb963"],["/2024/09/22/SMART/index.html","5a41f79e7fd7255865ea16103762fb84"],["/2024/09/22/基于Cartographer算法的RPLIDAR激光雷达导航/index.html","e65ad3ff6eb6df58176a5b8a3515f5bf"],["/2024/09/22/基于hexo的butterfiy主题的博客配置教程/index.html","53ed0eebcb605567bfbaad629673efc7"],["/2024/09/22/抽象代数/index.html","3ccdfc2c54efc7c1dbd84bdf2fbf78a0"],["/2024/10/10/Terminate终端/index.html","8873324fa3c8790bcfe27e8fcab15a92"],["/2024/10/10/TurtleBot3/index.html","994e1d1a7c594398da8adbb6e65dd395"],["/2024/10/11/vim使用教程/index.html","95e7ba84e9b0ef9ce9f5d477fe4b1b17"],["/2024/10/20/Stm32学习记录/index.html","5cea3d48ef11f1480a1f40688b2dbb09"],["/2024/10/22/视觉组培训/index.html","9792b0687cdfa08ed71a57c88c437860"],["/2024/11/14/【课设】寻迹小车/index.html","d6bff5dab72e1f27339cd971a40b883c"],["/2025/01/10/基于MID360的多算法导航合集/index.html","66e4cbd7314839f68cd54618e1c753d9"],["/2025/01/10/天选4连接HDMI后投屏无信号/index.html","1877351ef9ae3108680bd1f72d506414"],["/2025/02/04/GitHub的配置学习/index.html","7d4ff2ce7a49179563e0da21a07b5c91"],["/2025/02/11/Ubuntu双系统/index.html","2d1e7ab5953b5889a2fa15b53f727564"],["/2025/02/13/Rime输入法/index.html","38304a08e6249c255fedce0efdb63c12"],["/2025/02/14/RM2025导航调试/index.html","6b9c36671758c760402c4eee0aa214ca"],["/2025/03/02/算法组第三次培训/index.html","2bdac729b04a992477c165cab0d15fa2"],["/2025/04/29/【课设】DELTA机器人/index.html","1ceaa6c6663015e22e2085db17dd06d9"],["/2025/10/17/ROS课程笔记/index.html","e9c27a4c1d0b37636279c0f736c47e91"],["/2025/10/24/Ubuntu系统网卡驱动修复/index.html","17f1ae182549fbd2fd17470dd62f6741"],["/2025/11/03/【ROS大作业】基于Camera的人脸检测识别/index.html","dd2992d6abc392b42ed80d86fc5841a7"],["/2026/01/02/Windows下部署Miniforge/index.html","e36ccc2cabc8ab0439f7cd23e86b4f3e"],["/2026/02/09/AHK快捷键配置/index.html","00d6dca6a63d7fbd7855d48184a7b394"],["/2026/02/18/Kali抓取握手包/index.html","b585fb43feb58a926bc22d1a05892305"],["/2026/04/12/【课设】虚拟现实交互/index.html","701bec24e28cf96cd70bc3de5d12d32a"],["/2026/05/27/WSL2的安装与配置/index.html","4d463a4c935a40d0d0449103687ba928"],["/2026/05/27/基于 STM32CubeMX 的双电机同步控制与测试框架搭建/index.html","09e7dbfc546f673be6c5d2fd01155042"],["/2026/05/30/【课设】SCARA并联机械臂/index.html","86cfd964142e7d8191a9fff0f319e734"],["/archives/2024/07/index.html","0bdc7f5172c9fe78ce947ac6daf2bf8a"],["/archives/2024/08/index.html","6429bf3fa06071a92196ca1b391f675e"],["/archives/2024/09/index.html","8966fe97148be944ad251c4ddac090a2"],["/archives/2024/10/index.html","3eb79121c14fc033292cb4a91560d4c3"],["/archives/2024/11/index.html","83a4bcb282d1607cee0ebcaa9ebb0f44"],["/archives/2024/index.html","549c66d407b5ec1d1a6d306316d07d73"],["/archives/2024/page/2/index.html","5ee3e06836b6f9a8287d9c418033dc35"],["/archives/2024/page/3/index.html","84d8bb549db49e52d6558734bdc89224"],["/archives/2025/01/index.html","601f37ad7ef101629f38dc80b2f7c9d2"],["/archives/2025/02/index.html","2618459da1e734fd1c28dad7c082deeb"],["/archives/2025/03/index.html","193e08663ac608b640efc6e004cd8927"],["/archives/2025/04/index.html","9e9cba60e0eaef3124d6173abfaf6abd"],["/archives/2025/10/index.html","26346cff7b3f58393c4309558116e0f4"],["/archives/2025/11/index.html","b85a78b0f3cc43045a9d9ac9c64787b6"],["/archives/2025/index.html","02708840cb4445c79193f1c2b04631e9"],["/archives/2025/page/2/index.html","a09437a97dff0724f300ad90a8727508"],["/archives/2026/01/index.html","760a43c82c6f103da84fa6eb189c0e13"],["/archives/2026/02/index.html","5b0cf873e77ffbe5f6e6ecc39846efee"],["/archives/2026/04/index.html","f45a7d1565da03ed004be3752cb1b5a0"],["/archives/2026/05/index.html","6ad2b4c5560d003c78b8f1b01e8ed44f"],["/archives/2026/index.html","7dc469c8d523d0bb191b476fe7f9d68e"],["/archives/index.html","4c652cb3e251dca1e887f6c4300a22fe"],["/archives/page/2/index.html","05eb60253ce685c5763367fc8c14e41d"],["/archives/page/3/index.html","2bb72992f660ae16c0c1b70412f744a1"],["/archives/page/4/index.html","1c33312ce4954c11b8121427c1f32fe8"],["/categories/index.html","6be2d866825764d7aaea37931d2cf2a3"],["/css/cursor.css","2f88e217e523132a58ea67acc255e189"],["/css/hbe.style.css","de85c19b502c6c5d197b9b3dde47a3f1"],["/css/home_transparent.css","f229118c56e9fb4890b04b64d3eae5db"],["/css/index.css","8a5e55e2c3eb001267fd7a286b672eec"],["/css/portal.css","c180e39936be5e6424da1ba1aff23cea"],["/css/top_img_transparent.css","e7de35083979937eb3746f8237b6e290"],["/css/var.css","ba4fe6f19f21eef8cc54616970bbaf17"],["/css/zoom.css","f31b6ad3a59916ed73b66de0b8aa9968"],["/html/AHK快捷键配置/1.html","cffcc61f34ec2ae38fb740515892d080"],["/images/GitHub的配置学习/1.png","932dcb9f9a1080a0b7edd1ce6aaffc69"],["/images/GitHub的配置学习/2.png","f3a66f9fec4bfb4292c9c1de2c0d4893"],["/images/RM2025导航调试/Robot.png","f027e04e0c2b5d360e79a96ba20e973d"],["/images/RM2025导航调试/Robot.svg","462aa4362bbb813482bf63bf15f50855"],["/images/RM2025导航调试/TF_SIM.png","fd28163c882d0c6c14e23a375cbd644a"],["/images/RM2025导航调试/image-1.png","50648c996357022966fba910faf5f362"],["/images/RM2025导航调试/image-2.png","8cbd68aff30522517f354052c8777e16"],["/images/RM2025导航调试/image-3.png","891b0bc9ed514f12216e268fdebdba0a"],["/images/RM2025导航调试/image.png","b4081fe50d696889fae2d3d74f15edac"],["/images/SMART/image-1.png","e33a3d0e3e76fa15811885f90f5f0b01"],["/images/SMART/image-2.png","f6459424acc67b4d75bbca63d4565463"],["/images/SMART/image-3.png","5b693eb07ef2490164025abdb4f824c9"],["/images/SMART/image.png","2d56f38ffbd157b7b19901cb53c621ec"],["/images/SMART/报错2.png","0d3d6089c55f4dd47b1facb5eeef2e72"],["/images/Solidworks卸载重装流程/1.png","a3a478a58bd1b75107e39d9b0b9b94bf"],["/images/Solidworks卸载重装流程/2.png","d762e8d617a4943725fc5327714ddf3d"],["/images/Solidworks卸载重装流程/3.png","c63fa1cf2266c38e90efabb102754e5e"],["/images/Stm32学习记录/1.png","655f212e6d9fd5b9ae9b44d05d0ea514"],["/images/TurtleBot3/1.png","430d3fac8ee105873c59424a826b3ec9"],["/images/TurtleBot3/2.png","44ed17c50feaa8c22d4f7a7bea6fddd7"],["/images/TurtleBot3/报错0.png","91835f6d5edb6c47d4ae061bf8b72466"],["/images/TurtleBot3/报错1.png","4b896c488889cc11f3a67f9bec6edacc"],["/images/TurtleBot3/报错2.png","dca1e4970762d0ded1d0e2a3b5f9c60a"],["/images/Ubuntu双系统/1.png","51ad2be82306c4242ee57481790cb769"],["/images/Ubuntu双系统/10.png","5f28904bf5abede9a86458f1c1131657"],["/images/Ubuntu双系统/11.png","185d1bc5e3d611b8b9e52ad93f1ed995"],["/images/Ubuntu双系统/12.png","b51a50f826574c06bfc4e61966afbe52"],["/images/Ubuntu双系统/13.png","837f606a40eceb295422e1a6f9811282"],["/images/Ubuntu双系统/14.png","280c082fc2e6aed3758286ccb2034911"],["/images/Ubuntu双系统/15.png","ca18e7d8d825230baea8ac022c34261d"],["/images/Ubuntu双系统/16.png","336a5564c5beb1ba87f689cb25118bb8"],["/images/Ubuntu双系统/17.jpg","a13eb7c81c3fceaf14d4b230c7ba6c5a"],["/images/Ubuntu双系统/18.jpg","e16e18929cb745c4fb0ecfd601bbba96"],["/images/Ubuntu双系统/19.jpg","8ea9b6462f4a0aa5b12b7fb21f71c69e"],["/images/Ubuntu双系统/2.png","8facf0a2821ebfaff76a09b517e91189"],["/images/Ubuntu双系统/20.jpg","f6c0c03a5307ba2b722e44c22d0f78ff"],["/images/Ubuntu双系统/21.jpg","ef1ebc2bdf8e77f6b8a66f0d7afe0fc6"],["/images/Ubuntu双系统/22.jpg","d0fa06ff9630d5719513016e897fae90"],["/images/Ubuntu双系统/23.jpg","ac12a7d5bd3c01707a533ec9c05cb6cb"],["/images/Ubuntu双系统/24.jpg","ce105c7456ee58a688d6a1e35753cf29"],["/images/Ubuntu双系统/25.png","9c1902a493c9fae1c9cf35cef0306a44"],["/images/Ubuntu双系统/26.png","ab0e794b8df60e427c016c88b7463516"],["/images/Ubuntu双系统/27.png","52864272772fc878d360478dd0b4582f"],["/images/Ubuntu双系统/28.png","f916a8ff83e563abe59e08d9f3882179"],["/images/Ubuntu双系统/29.png","fea014a4bfaec8c43f6f671721f46f3b"],["/images/Ubuntu双系统/3.png","bd9160e8f2e3bbe0f09e7b4ed8a3f8db"],["/images/Ubuntu双系统/30.png","026806069decbb926223823fccf02975"],["/images/Ubuntu双系统/31.png","41ccf1c05f14fbc95c55de3bf75a09e7"],["/images/Ubuntu双系统/32.png","f22e5dd7807f7dbff2c3b2f51a6e28af"],["/images/Ubuntu双系统/33.png","2a5e79ced34951d1b4f3b00ed6c33a33"],["/images/Ubuntu双系统/34-1.png","73431b07fea0477f27be801e3d0a9197"],["/images/Ubuntu双系统/34.png","73431b07fea0477f27be801e3d0a9197"],["/images/Ubuntu双系统/35.png","d8da498e9595c0ef13e3f7430d8c6f2e"],["/images/Ubuntu双系统/4.png","fd0c26fa89f30d7a7135d102472f2d8b"],["/images/Ubuntu双系统/5.png","243582929bc7fbdc687d652aa610e464"],["/images/Ubuntu双系统/6.png","0faaae28f80da4355c957872167fbf12"],["/images/Ubuntu双系统/7.png","048d1db7c1259b8b3676e47357c07134"],["/images/Ubuntu双系统/8.png","dcd907147fcd04f8e3546806e2620eca"],["/images/Ubuntu双系统/9.png","76fc0f4333a4701964075dad549c59c1"],["/images/Ubuntu双系统/image-1.png","a76431ea5ddd40c25564950c0a3a0c75"],["/images/Ubuntu双系统/image-2.png","010546f9d174832d22ffbe22bd476cdf"],["/images/Ubuntu双系统/image-3.png","010546f9d174832d22ffbe22bd476cdf"],["/images/Ubuntu双系统/image.png","a76431ea5ddd40c25564950c0a3a0c75"],["/images/Ubuntu双系统/{40D339D4-1135-4AE7-8D39-7F71544113F8}.png","7469d787eb909d435ed54c13f40979cb"],["/images/WSL2的安装与配置/image-1.png","273c3122a79075133887dc1fa68aeff8"],["/images/WSL2的安装与配置/image-2.png","afbcb2d54a724d77d69699b7509f4bb7"],["/images/WSL2的安装与配置/image.png","888aa2011774b9e381375904377013b1"],["/images/vim使用教程/morden1.png","7cd866e532f63459ecba360a8b1afedc"],["/images/vim使用教程/vim-vi-workmodel.png","dcd25a6082e1989975c280213f3e1052"],["/images/【课设】DELTA机器人/image-1.png","624840be61bc3d4bffbad91d1be50db2"],["/images/【课设】DELTA机器人/image-10.png","cc6cf243fb6ac42a172ed5fc3b99d5a3"],["/images/【课设】DELTA机器人/image-11.png","1c0d4f21ad6679c51db626ca397b2dfc"],["/images/【课设】DELTA机器人/image-2.png","c5025b67832de7e0f090ef771f330ca4"],["/images/【课设】DELTA机器人/image-3.png","29ba2f4cbd20898666fd5040e1e43380"],["/images/【课设】DELTA机器人/image-4.png","ee3dca41923cbc94b5c587e5880d4d63"],["/images/【课设】DELTA机器人/image-5.png","cc266d6843805f02e98d64a7be0cbb86"],["/images/【课设】DELTA机器人/image-6.png","fd565ee47333a93a5893e24b27651324"],["/images/【课设】DELTA机器人/image-7.png","3a9371bc1718fa562a5b3ca04b39975b"],["/images/【课设】DELTA机器人/image-8.png","bc6692cdb78ad0267deedbe1d9ef83d8"],["/images/【课设】DELTA机器人/image-9.png","8acab8353fcd24e9b4c5c6b42cd0cce9"],["/images/【课设】DELTA机器人/image.png","515f1738c99957f31b98ec8742f7b0ea"],["/images/【课设】寻迹小车/1.png","e6d0821b7b988b861f564b90263df658"],["/images/【课设】寻迹小车/10.png","3c17a58a8a7dea29b4bfbce228117ac0"],["/images/【课设】寻迹小车/11.png","2f5dc3907cbd4c29221d883282fcd946"],["/images/【课设】寻迹小车/2.png","5b35b24d0b97aa19dc10fcdcda436974"],["/images/【课设】寻迹小车/3.png","52be5c69f94058ff9eb455c8c61dc73e"],["/images/【课设】寻迹小车/4.png","3e2d0ca3121fff3c41b3df01d51ec618"],["/images/【课设】寻迹小车/5.png","695d5fa73e024587ef984a6b9cbc154a"],["/images/【课设】寻迹小车/6.png","dd4fd1841c5839f09d10d2abd6b40998"],["/images/【课设】寻迹小车/7.png","1f74198c2812c64c8f12132b44905a11"],["/images/【课设】寻迹小车/8.png","af5eff3a81a47283985d6ad6e8fc070e"],["/images/【课设】寻迹小车/9.png","d16644852928bc2ef4c0cd5de2c7a30e"],["/images/【课设】虚拟现实交互/image.png","f2eb73bde2c17d0db6fe7c391df3defa"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/1.png","424d73e09411191315208ab860cbfc7d"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/10.png","8af69a0de551d0b7b61a450349cbf08d"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/11.png","4a99ac6bde1b3ff6de12fa6772d746da"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/12.png","fa9f9b8909eedec755b809fb8e1ea117"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/13.png","878979cd1527f29f7181524116f75fc9"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/14.png","f49498f713b251984c2300a0bd2efe6c"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/15.png","7e0d8f1f124714960f10707d5ba61c1d"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/2.png","97c1756ca1dee6138e41c0ce74c3680c"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/3.png","c122f7795697eda105f0a1d84fe01ab8"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/4.png","9287ef806acf9791ca7ad3eeb16350bd"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/5.png","85fd08881e28922c9c6eb8458c06649f"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/6.png","a76d5f43db76df6de3e949c21545bf8f"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/7.png","74446ee743bd14c42527be1a8424c12a"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/9.png","c94c8a012bc577ff6d2e4b8e71829175"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/rosgraph.png","5c9882c63a59ad7281ba1db58f9d7ce6"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/turtlebot3_tf.png","c166372b8703668abfc7a9e2cc72097b"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/wrong1.png","fb0c79ce0719550b14505ad4c37db847"],["/images/基于Cartographer算法的RPLIDAR激光雷达导航/wrong2.png","4d6e2361511b3343d5746ee9e55ccf8f"],["/images/基于hexo的butterfiy主题的博客配置教程/{0E336FA2-1BE1-4AAE-86FC-C8476E12FC56}-1.png","dca8d24b28cae9f6fbef323338554327"],["/images/基于hexo的butterfiy主题的博客配置教程/{0E336FA2-1BE1-4AAE-86FC-C8476E12FC56}.png","dca8d24b28cae9f6fbef323338554327"],["/images/基于yolov5的数字识别/1.png","89ac0817322fb708b9a15ff1a8c766e7"],["/images/基于yolov5的数字识别/10.png","43429bcf9eca0dd71ff391e0cab75d47"],["/images/基于yolov5的数字识别/11.png","0f4f8c39e6f313a4546e42b08142cfd4"],["/images/基于yolov5的数字识别/12.png","b55f2120f8b47db67258bf4da06c7333"],["/images/基于yolov5的数字识别/13.png","afd558e880d0005257dcc311580f7702"],["/images/基于yolov5的数字识别/14.png","4be1b682cc5d0bea1a4eebca22212b3a"],["/images/基于yolov5的数字识别/15.png","9eee94a3137afcc6f098fdddea78ca0f"],["/images/基于yolov5的数字识别/16.jpg","95025aa4b9b9e9e90bf7ce178b103db8"],["/images/基于yolov5的数字识别/17.jpg","0fa2291f6e3b6d4bd776de7831da0fbc"],["/images/基于yolov5的数字识别/18.jpg","b6630dd254e3c501d7452aed526c7e08"],["/images/基于yolov5的数字识别/2.png","a0fd042f741430fe545c29c0c07f0f3f"],["/images/基于yolov5的数字识别/3.png","0817cfae82740241610308e5bc99fbb4"],["/images/基于yolov5的数字识别/4.png","e016f9ea8aff6fbf4e779f2bf7edf330"],["/images/基于yolov5的数字识别/5.png","9ab3278c1ba0289a9d0082f347d4bd23"],["/images/基于yolov5的数字识别/6.png","e3536b7b23cbbad82259bb4ae01b4469"],["/images/基于yolov5的数字识别/7.png","70938d3c73c51a784d7986ad6bc012ca"],["/images/基于yolov5的数字识别/8.png","9a3646b8430c008e199b765842dfd514"],["/images/基于yolov5的数字识别/9.png","a6151c6365596439d0417895bad977b0"],["/images/算法组第三次培训/image-1.png","4a676a83fb805c9a7916d10c0c6ae544"],["/images/算法组第三次培训/image.png","1b1264d9223b3cceebce92d1bbdfa933"],["/images/视觉处理之ROS与OpenCV的修改转换/1.png","62e10785552b894b5f2ef55729551347"],["/images/视觉处理之ROS与OpenCV的修改转换/2.png","1da124a35b38bff2d30e043d53614922"],["/images/视觉处理之ROS与OpenCV的修改转换/3.png","d5e148e5df950e6a19971e4655b63fe5"],["/images/视觉处理之ROS与OpenCV的修改转换/4.png","7e3349678d1ca38d05feaf69d59ab97d"],["/images/视觉处理之ROS与OpenCV的修改转换/5.png","19533368bdac10dd075c4b233fbe2f5f"],["/images/视觉处理之ROS与OpenCV的修改转换/6.png","c3b9350803ed8be3c3224fdc3846f69d"],["/images/视觉处理之ROS与OpenCV的修改转换/7.png","8d2e3b95e8da1545bd78091acce8c708"],["/images/视觉处理之ROS与OpenCV的修改转换/8.png","c77b5b0ee91d9639e500793a74383e4d"],["/images/视觉处理之ROS与OpenCV的修改转换/9.png","7a8fcb1e2970173548f0a136ff557633"],["/images/视觉组培训/7.png","8d2e3b95e8da1545bd78091acce8c708"],["/images/视觉组培训/image-1.png","b2dee78983d085e8104d2b6684f2f36d"],["/images/视觉组培训/image-10.png","c577640da43b7ce3d259cefc2e137df2"],["/images/视觉组培训/image-11.png","df318f4073a0baa987e2dfe76ac9e775"],["/images/视觉组培训/image-12.png","34540e50687118a2f9315a12a52d5eba"],["/images/视觉组培训/image-13.png","6553c37195cb644cb8da6bddd88dc9e5"],["/images/视觉组培训/image-14.png","74e38ad362048d727242d33b803317d9"],["/images/视觉组培训/image-15.png","818917374cf62066b89e906bef7737d8"],["/images/视觉组培训/image-16.png","e27ed37a1c6e0cedcbf8f697120065b1"],["/images/视觉组培训/image-17.png","17550176dab82bd9cdefad33dcfe00d0"],["/images/视觉组培训/image-18.png","dd6435588605bf201edf70c7d6d38558"],["/images/视觉组培训/image-2.png","9982e50d0a5ef88026c4cf4d43df9abb"],["/images/视觉组培训/image-20.png","81ab276892f653c9ab53b2b32b4b71c3"],["/images/视觉组培训/image-21.png","ffca1b6b2ea7d55d23c319c80ac1f5ea"],["/images/视觉组培训/image-3.png","e1b8b844903e37edb73de2e404c97340"],["/images/视觉组培训/image-4.png","627b8975baa6f8585ed944ae8a885471"],["/images/视觉组培训/image-5.png","c6831363e43de54abdb715b01bb66b71"],["/images/视觉组培训/image-6.png","278e0f82a345cb26053fee63c759f1ca"],["/images/视觉组培训/image-7.png","dd3bfb18667347e74a23e22e2f54f0bb"],["/images/视觉组培训/image-8.png","a7e533bc11ef5e074fa9dfa399f63569"],["/images/视觉组培训/image-9.png","9cad8a7b2c0ded333c336a76aa8a42a3"],["/images/视觉组培训/image.png","d77f3518c9c45bd49a55080bbf6b0cd6"],["/images/视觉组培训/result.png","6072536490068f45353f5e12628771c8"],["/images/视觉组培训/截图 2025-02-23 01-01-30.png","0be6aabac4834d62ce8434834990ca5e"],["/images/通过Git上传本地项目至Github/1.png","d993c29a6d4018b69a48182911e5a2f9"],["/img/0.jpg","e934378352154e9a66428a17ef2b6cc4"],["/img/0.png","a163fe12f0eedcebf17541066202d4e1"],["/img/1.png","6d8377a964659a21e4526122101e4cd5"],["/img/2.png","a40525fda647a2d79b6da73b7651c805"],["/img/3.png","56033d0598ff19cc4ee4ec2b4fc64321"],["/img/4.png","f34761405c41de7379a6018666d5c51b"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/5.png","be89248213061a2a5096dda7503ee13d"],["/img/6.png","806305fa5a9020bb79393874da4939d1"],["/img/AliPay.jpg","250e33432f3b9462cf39e60868b7cc24"],["/img/AliPay_old.jpg","e59f319325a73db9ce4901311cf75d72"],["/img/GZH.jpg","d740c145344e336d94321f14c9e0e22d"],["/img/GitHub的配置学习.png","5d7ebbdc440cf529fabe179d6c6e51a2"],["/img/RM2025导航调试.png","bb0798f7564e3ab012d5df891f6e8ed0"],["/img/ROS课程笔记.png","36697dc32c7e319f2fb2abc35144c467"],["/img/Rime输入法.png","5054e90cbe565470f5d3138e84551cb0"],["/img/SMART.png","c9648b17a6aef82b15722add5d35e1f8"],["/img/Solidworks卸载重装流程.png","30425a83b88b9a77dade558de911ea6c"],["/img/Terminate终端.png","bd8d05e39e4828afcf4c7bd86f28a98f"],["/img/TurtleBot3.png","41ff55acf6ecfc705c8940479685a0b2"],["/img/Ubuntu双系统.jpg","d8409e910d9c98774fbd8b10533d562d"],["/img/Ubuntu系统网卡驱动修复.png","6b022ad748addf7aefec9b7bd91949de"],["/img/Ubuntu终端下载速度慢_换源.png","2c698c1d70f840e6cb52026638c70a8b"],["/img/WSL2的安装与配置.png","129215abd5a2f31560ae23735e048a3c"],["/img/WeChat.jpg","d88ee56336488a4ae7b4f3b31a28c700"],["/img/WeChat_old.jpg","ec967cbf8728fb251339e387a1711951"],["/img/Windows下部署Miniforge.png","04c428a102942005fa38a1625a8b5d75"],["/img/dso安装及实验数据分析(内含miniconda3环境配置).png","f03d2f71be7bdb0db8a1354193ac4158"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/favicon/apple-touch-icon.png","8580d3908e4c7c7c7d6336690c194248"],["/img/favicon/favicon-96x96.png","3e2d967a58d3160d0af489d40bc17437"],["/img/favicon/favicon.svg","f322ce7294f9f0e47fa252541aa0912d"],["/img/favicon/web-app-manifest-144x144.png","6449b92c5e8a1c4c8b0e8913bec61328"],["/img/favicon/web-app-manifest-16x16.png","3a4ac248e23bc7a5cfb1d11eedc30619"],["/img/favicon/web-app-manifest-192x192.png","d4876752488de4ba164f77b0b562243e"],["/img/favicon/web-app-manifest-256x256.png","f48a1c745b436e23d73f2a5b6a53dfbe"],["/img/favicon/web-app-manifest-32x32.png","ebaf0a26d5fc6d349bceb8b9ebca07c3"],["/img/favicon/web-app-manifest-36x36.png","267ac7c7fb17878b82d546d70c86d776"],["/img/favicon/web-app-manifest-384x384.png","0b493a763ba4aca731db2acf6ece2139"],["/img/favicon/web-app-manifest-48x48.png","d3eb74f7cd20b835726b0e30f46461ec"],["/img/favicon/web-app-manifest-512x512.png","a9a6dd0c355b784f1d4d8e6b4d957cd8"],["/img/favicon/web-app-manifest-72x72.png","baf65cc956398ab6f462ce1c29f94310"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/light_whale.jpg","e7d2fc03e06e0cf1ff27d5b8c8f44604"],["/img/office 激活.png","6216342f04aa8b8c6331e2bce580f836"],["/img/resume.png","81fc2a3135b0f0f6d90f54beee5a0970"],["/img/whale-icon.jpg","974fee4b11d1813f7da565d0e635eb50"],["/img/【ROS大作业】基于Camera的人脸检测识别.png","c502dccd444122694645501b27469d3b"],["/img/【课设】DELTA机器人.png","42457c0d52c78390a03977403b8369e1"],["/img/【课设】寻迹小车.png","fcca42ea16c756f8aad0f6f45a1bdea0"],["/img/【课设】虚拟现实交互.png","cdcc4b67b2b4ddd600bfd2c6c0d17251"],["/img/基于Cartographer算法的RPLIDAR激光雷达导航.png","548084a3dbb640c63645bbda97c33b63"],["/img/基于MID360的多算法导航合集.png","cdf685a99cf2496aff0141ab5f28da7a"],["/img/基于hexo的butterfiy主题的博客配置教程.png","1a17412fcb54ed810a57ac46dba4228a"],["/img/天选4连接HDMI后投屏无信号.png","e8891d57f5a2a47db9794c2c8545b57b"],["/img/抽象代数.png","c93dfd4f119f0859e4e16959b981d273"],["/img/视觉处理之ROS与OpenCV的修改转换.png","648030a3e1c2fd2dba5dc1514224f794"],["/img/解决VMware下Ubuntu22.04无法联网问题.png","3f9c98d820adcba4d3a298f1ab555029"],["/img/通过Git上传本地项目至Github.png","e96df0f06e6946260cf1ca32b2fc7273"],["/index.html","6072f0d27bea17b5886087c90a668e7b"],["/js/backup_cherry.js","be192abc4fe65913eef8d27e2393c34f"],["/js/cherry.js","ad68b9aa03c568529a37a6b81e9e7346"],["/js/main.js","960297fafacb19dff1246d71f6dfcf6f"],["/js/portal.js","23825264a7753bfe6e04ec267c1f7258"],["/js/refresh.js","151c3c537dc49554572d0033dce1dab4"],["/js/ripples.js","85965bea50ad3cc59f7bde5a95819996"],["/js/running-time.js","96e49113586bc2efdd57b4f0dea271a4"],["/js/search/algolia.js","4491ac1d470a1693a502a9d09034aa21"],["/js/search/local-search.js","9da6b76672a143c8c8449770a8d259f3"],["/js/timing.js","fb776476ed36f9427081939ccceb1613"],["/js/tw_cn.js","fb4da68124bbafbd2d3da537c80e27ce"],["/js/utils.js","420a15cf446b5670244a9ea05b2bccf0"],["/js/website-title.js","823453db829ea9eaa513a6b964223a71"],["/js/window.js","d0919a55cddfcb35a8d7c1156b1dcb6d"],["/lib/hbe.js","92665a6e3b10e8b1750bffb6fc01e7e8"],["/link/index.html","82d81f5e016e3d1f616c274e407c6d19"],["/page/2/index.html","fb3cad22ccba61263f00046f9d189ff0"],["/page/3/index.html","44884b8e34c61e91e82d08b539c211f3"],["/page/4/index.html","84a78e6ef7a5444b0fb9faa63d752733"],["/resume/index.html","0d08c5b4b5927200ab8b79b86a6eb118"],["/search.xml","a208ce0aa6555579cc320489b2e565a5"],["/sw-register.js","69aafdf5ce0200f58a7ba9fb1aa45250"],["/tags/Anaconda3/index.html","e23575fb07174694c31d6fa19950d60e"],["/tags/Blog/index.html","0dc90b735ef982af508fdbf5ec53919b"],["/tags/Blog/page/2/index.html","d21ce7714142a0ffcf929295e42c5566"],["/tags/Blog/page/3/index.html","803fa1524966e5d5e882c5afb66b7788"],["/tags/Blog/page/4/index.html","4ec99de61e03f42b26e23d730ab7f162"],["/tags/CMake/index.html","14fcd2184f8868b1461a96a00647ebed"],["/tags/Cartographer/index.html","53ad72cbada7813fccf40607f12c618a"],["/tags/DELTA/index.html","4c4fa09becc4e3ce676cbcd3fc35c0c0"],["/tags/E5/index.html","7051a77421a66bcfcc5c8d07823aeb94"],["/tags/Environment/index.html","7683490421a6f156aa110ae4ebf757ff"],["/tags/Fastlio/index.html","61cf12f9849c3558119dcb09b40374f9"],["/tags/Git/index.html","ca3da7d81555da05f0e5021ef0df5ca5"],["/tags/GitHub/index.html","b3a332ec87681d03bca97feb10905a8f"],["/tags/Hashcat/index.html","b820e51c602fde4a3bcf529bec4cebb7"],["/tags/Kali-Linux/index.html","389ee428ec431fc5a5ac53c1cecc156e"],["/tags/Linux/index.html","ca39e42fd21b261dbb108763f19f989b"],["/tags/MID360/index.html","ed39713dceedfd80495e6ddc02e5c640"],["/tags/Markdown/index.html","9f546103c91df4bb109a77941f0264a5"],["/tags/Office-Tool-Plus/index.html","00124cb93f08ef821649496cd9006428"],["/tags/Office/index.html","22229d18135d26ac8c5dca8badd10820"],["/tags/OpenCV/index.html","bb890875e823f1e22dbad557737d6fe6"],["/tags/Pointlio/index.html","549536ee58fe5b97e02a051915328efa"],["/tags/RM/index.html","598f00d6f0e8497bcad6e006d9cee0d6"],["/tags/ROS/index.html","9cf705e519e15949e9acdcc79b0c0eff"],["/tags/RPLIDAR/index.html","32b59e1a371a4c60d47b8331ecca426e"],["/tags/RoboMaster/index.html","d00ccfa487747f5881f141183aca1192"],["/tags/SLAM/index.html","17d19afefad8936a0158cb5b4681d333"],["/tags/SMART/index.html","860de71522aafde4c884f308c689b829"],["/tags/Solidworks/index.html","a62ba04a84665b59742ab2bccd3f588d"],["/tags/VSCode/index.html","9f1d3ef0711d8821a68c5754155413e2"],["/tags/butterfly/index.html","5c9f00e1573547477fc13ed29e2b4fd2"],["/tags/dso/index.html","42a3a09f297a2bb23c73fa9af7e7254e"],["/tags/gazebo/index.html","4b66217c922862b5bdaaa910c7d308af"],["/tags/hexo/index.html","ac35c7795024af99caf1ac18cd809286"],["/tags/humble/index.html","26cb8554c3f00051fb58cdf2791cb550"],["/tags/index.html","d6da68d68944c16d8b544ed507292003"],["/tags/miniconda3/index.html","4c8550fe49803328b7fbb019db715d2f"],["/tags/obstacle/index.html","3607fb56cae407bb7828aac6b78fa8ed"],["/tags/stm32/index.html","3ada4b13e16d3868177192ae49aeb55e"],["/tags/tec/index.html","a496f435cc30153f38a563391996aa9b"],["/tags/terminate/index.html","ed52f48e95db88ef599f95271178a970"],["/tags/turtlebot/index.html","aea2b430c206c5cb991aaa8351aa32b9"],["/tags/ubuntu/index.html","8b852e9e9e8c1f8f0f475d8b4bdab1ed"],["/tags/ubuntu22-04/index.html","86a91250d8d19b29c9f5f4bc8b88e20a"],["/tags/vim/index.html","2e1f922f50a25eef4ac99afd9ad61a81"],["/tags/yolov5/index.html","f3f1ef64c0cf11a876329e7686686542"],["/tags/单片机/index.html","cbbcc942687eb6cc95702705854dc4cf"],["/tags/博客/index.html","7994ccdecdc564b76443f0dc37a96fbe"],["/tags/双系统/index.html","1479fc6687c72c10a7d85cb3556af85e"],["/tags/大作业/index.html","59b5b6ed36a21b1c35f4c4dcf4fc2ece"],["/tags/天选4/index.html","694ab32edbdcbd60c36e529d470337e6"],["/tags/寻迹小车/index.html","d119a5e444f483ca302abbe2618d68fb"],["/tags/导航/index.html","2277b57107ca4ef20b55e3394ed24364"],["/tags/抓包教程/index.html","787be3bcd6558ca51e40468b2eddb438"],["/tags/投屏/index.html","c0d2cc52602dfa2a0a0cc13823d0ce24"],["/tags/摄像头/index.html","a40fa266d27a75b076c297066f37752d"],["/tags/教程/index.html","db747994aa57462ab25ae1b285db6c17"],["/tags/数字识别/index.html","3f2a3a00d27e3f2d9ba2b3b32a313d0a"],["/tags/机器人/index.html","4b200d010e1c78848fb2fa07e4bb5157"],["/tags/机器人控制/index.html","b333ba4b8f0676986651d4005f025cf9"],["/tags/机器视觉/index.html","1880ef1f170fd75e831ab0fe5842c90b"],["/tags/机械/index.html","96ddf64beecfcae6d43eb0464c17490a"],["/tags/电机测试/index.html","0f020d6382406844dc4e258d12c01c6a"],["/tags/网络/index.html","da5785d9db610f42de24c0bd9c375f84"],["/tags/虚拟仿真/index.html","68366bb56f988e4f46823baa3b35d571"],["/tags/虚拟现实交互/index.html","6294e81050c5d590479f3ecb62e269bc"],["/tags/视觉/index.html","6428fb2ee36698f990345d254c634df3"],["/tags/视觉组/index.html","bb69743d5ca74909728ec6988b6f8419"],["/tags/视觉组培训/index.html","a079b10cee757493e85752e510ff5934"],["/tags/课设/index.html","bc56f7edf2e9278e5ce769038c34c63f"],["/tags/软件/index.html","2d4096572f36ef62d99a6b61b42496b4"]];
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
