module.exports = {
	db:{
		user: 'postgres',
		host: 'localhost',
		database: 'testdb',
		password: 'sathya2690',
		port: 5432,
		max: 10, // max number of clients in the pool
  		idleTimeoutMillis: 30000
	},
	basicAuth:{
		userName:'Cumulonimbus',
		passWord:'H40@C#i!CuMl0P!K4ZzA9nIWBuzH40@C#i!'
	},
	logger:{
		path:'/Users/sathy/Desktop/'
	},
	mail:{
		host:'smtp.gmail.com',
		port:'465',	
		senderName:'Pikazza',
		senderMailId:'pikazzatestsp@gmail.com',
		passWord:'Pikazza1'
	}
};
