///config file for catsums/just-bops-and-quizzes

var MongoDB = {
	uri : "mongodb+srv://catsums:7Z1WysOEFUr8cu8v@jbq-cluster.23tavft.mongodb.net/?retryWrites=true&w=majority",
	username: `catsums`,
	pass: `7Z1WysOEFUr8cu8v`,
	cluster: `jbq-cluster`,
	dbName: `mydb`,
};
var Cloudinary = {
  cloud_name: 'ddszrg1sy', 
  api_key: '863452539323724', 
  api_secret: 'rX75PSDGeePd6Ccxc-KA9cuRCZk',
}

export {
	MongoDB, Cloudinary
};