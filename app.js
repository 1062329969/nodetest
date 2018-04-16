//加载引用包
var express =require('express');
var session = require('express-session');
var expressControllers = require('express-controller');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var FileStore = require('session-file-store')(session);

var app = express();
var router = express.Router();

//视图加载
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//静态文件载入
app.use(express.static(path.join(__dirname, 'public')));

//传输数据json处理
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//session设置
app.use(session({
    secret: 'lyx',
    name: 'yx',
    store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 1800000 // 有效期，单位是毫秒
    }
}));

//路由控制
app.use(router);

//绑定控制器
expressControllers
    .setDirectory( __dirname + '/controllers')
    .bind(router);

//端口启动
app.listen(3000)