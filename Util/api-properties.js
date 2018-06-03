module.exports = {
	db:{
		user: 'postgres',
		host: 'localhost',
		database: 'testdb',
		password: 'postgres',
		port: 5432,
		max: 10, // max number of clients in the pool
  		idleTimeoutMillis: 30000
	},
	basicAuth:{
		userName:'Cumulonimbus',
		passWord:'H40@C#i!CuMl0P!K4ZzA9nIWBuzH40@C#i!'
	},
	logger:{
		path:'/home/prabakaran/alpha-log/'
	},
	mail:{
		host:'smtp.gmail.com',
		port:'465',
		senderName:'Pikazza',
		senderMailId:'pikazzatestsp@gmail.com',
		passWord:'Pikazza1'
	},
	imageRefPath:{
		uploadPath:'/home/prabakaran/alpha-images/images/',
		hostingPath:'/home/prabakaran/alpha-images/',
		host:'http://127.0.0.1:8080/images/',
		jsUploadPath:'/home/prabakaran/nodespace/alpha-node-api/Scripts/',
		jsHostingPath:'/home/prabakaran/nodespace/alpha-node-api/Scripts/',
		jsHost:'http://127.0.0.1:8080/'
	}
};
