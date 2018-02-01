module.exports = {
	mail:{
		host:'smtp.gmail.com',
		port:'465',	
		senderName:'agarwal',
		senderMailId:'pikazzatestsp@gmail.com',
		passWord:'Pikazza1'
	},
	db:{
		url:'mongodb://35.200.176.109:21215/agarwal-db',
		name:'agarwal-db',
	},
	twilio:{
		accountSid:"AC08917a0306887de223b707ba862c0242",
		authToken:"3d3a1f916a39577a90b150ca1c7556be",
		sender:"+15558675309",
		body: "The verification code of Aggarwal Daily needs is "

	},

	basicAuth:{
		userName:'Cumulonimbus',
		passWord:'H40@C#i!CuMl0P!K4ZzA9nIWBuzH40@C#i!'
	},
	jwtSecret:{
		key:'secretpasswordforstarvzinodejsproject'
	},
	logger:{
		path:'/home/admin/haochii-log/',
	},
	imageRefPath:{
		uploadPath:'/home/admin/haochii-images/images/',
		hostingPath:'/home/admin/haochii-images/',
		host:'http://localhost:8080/images/'
	},
	/*imageRefPath:{
		uploadPath:'/opt/starvzi-images/images/',
		hostingPath:'/opt/starvzi-images/',
		//host:'http://192.168.0.62:8080/images/'
		host:'http://35.198.227.184/images/'
		//host:'http://35.187.21.181/images/'
		//uploadPath:'/opt/starvzi-images/images/',
	},*/
	swagger:{
		hostpath:'localhost:8080'
	}
};
