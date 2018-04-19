### 使用说明

> 准备：下载swagger-ui和swagger-edit。目录如下：

![目录](1.png)

1、启动swagger-editor：

在本项目下执行http-server swagger-editor -p8989。在浏览器中打开localhost:8989即可打开swagger-editor。

注意：要全局安装http-server。默认端口号为8080。

2、编辑swagger-editor：

在editor中编辑代码，右边是视觉效果。编辑好后导出json文件。

3、浏览接口文档：

新建文件夹public，将下载的swagger-ui文件中dist目录下的所有文件复制到public文件夹下。将导出的json文件也放入public文件夹下。修改public下index.html文件中 url = "http://petstore.swagger.io/v2/swagger.json"，将其改为swagger.json。在index.js中加上静态模块：

```
app.use('/swagger', express.static('./public'));
```

用node启动index.js，如果端口号为3000，在浏览器中打开 http://localhost:3000/swagger即可查看接口文档。



### 接口文档连接服务器，实时获取接口数据：

swagger.json中有个host字段，要想接口文档能调通地址，需此地址与浏览器中的地址一模一样。本地开服务ip可以是：

1、本机内网ip地址：如192.168.0.217:3000,

2、本机本地服务地址：127.0.0.1:3000，

3、本机本地服务简写：localhost:3000