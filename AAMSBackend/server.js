// Express server backend 
// Requests sent from a react-based
// front end - handled via axios

// Requiring all dependencies 
const morgan = require("morgan");
const express = require("express");
var multer  = require('multer');
var bodyParser = require("body-parser");
const tf = require("@tensorflow/tfjs-node");
const faceapi = require("face-api.js");
const fs = require('fs');
const fetch = require('node-fetch');
var sleep = require("sleep");
var multiparty = require("multiparty");
var path = require("path");

// Importing Attendance API and instantiating 
// a single object following singleton design 
// pattern
const attendance=require("./class_object.js");
let obj=new attendance();

// instantiating server dependencies
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
const port = 5000;

// Make face-api.js use that fetch implementation
faceapi.env.monkeyPatch({ fetch: fetch });

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + '/images')
	},
	filename: function (req, file, cb) {
		const fileName = file.originalname.toLowerCase().split(' ').join('-');  
		cb(null, Date.now() + '-' + fileName)  
	}
})

// Multer to handle image files in POST
var upload = multer({ 
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "audio/mpeg"
			|| file.mimetype == "audio/ogg" || file.mimetype == "audio/wav") {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only .png, .jpg and .jpeg format allowed for images and .mp3 for audio!'));
		}
	}
})

// Handling CORS errors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type ,Accept,Authorisation');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

// app.get("/", function (req, res) {
// 	res.sendFile(path.join(__dirname, "./enterDetails.html"));
// });

// STUDENT REGISTRATION 
app.post("/submitDetails",upload.single('Images'), async function(req, res, next){

	console.log(req.body.name)
	console.log(req.body.regno)
	console.log(req.body.class_id)
	console.log(req.body.password)
	console.log(req.body.no_subj)

	console.log(req.file)

	var arr = []

	arr.push(req.body.regno)
	arr.push(req.body.name)
	arr.push(req.body.class_id)
	arr.push(req.body.no_subj)

	try{
		await obj.insert_into_students_dynamic(arr, req.body.password)
	}catch(err){
		console.log(err)
		res.send("err")
	}

	const path = "./student_images/"+req.body.regno;
	fs.exists(path, (exists) => {
		if(exists) {
			fs.rename(req.file, path + '/1.jpg', (err) => {
				if(err) console.error(err);
				else console.log("Moved file!");
			})
		}
		else {
			fs.mkdir(path, (err) => {
				if(err) console.error(err);
				else {
					console.log("Created directory!");
					fs.copyFile(req.file.path, path + '/1.jpg', (err) => {
						if(err) console.error(err);
						else {
							fs.rename(req.file.path, path + '/2.jpg', (err) => {
								if(err) console.error(err);
								else {
									console.log("Moved 2 files!");
								}
							})
						}
					})
				}
			})
		}
	})

	res.send("done");
});

// STUDENT LOGIN 
app.post("/loginstudent", async function (req, res){
	var x = await obj.password_checker("users",req.body.email,req.body.password)
	console.log(x)
	if(x == 1){
		res.status(200).send("login");
	}
	else if(x == 0){
		res.status(200).send("incorrect username or password");
	}
});

// STUDENT DASHBOARD
app.post("/studentdashboard",async function (req,res){
	var [x,y,z] = await obj.student_dashboard(req.body.rno)

	console.log(x)
	res.status(200).json({
		"percent":x,
		"mean":y,
		"stddev":z,
		"error":"none"
	})
});

// LOGIN TEACHER
app.post("/loginteacher", async function(req, res){
	var x = await obj.password_checker("teachers",req.body.email,req.body.password)
	console.log(x)
	if(x == 1){
		res.status(200).send("login");
	}
	else if(x == 0){
		res.status(200).send("incorrect username or password");
	}
});

// TEACHER DASHBOARD
app.post("/teacherdashboard",async function (req,res){
	var [w,x,y,z] = await obj.teacher_dashboard(req.body.rno)

	console.log(x)
	res.status(200).json({
		"class":w,
		"subject":x,
		"enrollment":y,
		"percent":z,
		"error":"none"
	})
});

// LOGIN ADMIN
app.post("/loginadmin", async function (req, res){
	var x = await obj.password_checker("admin",req.body.email,req.body.password)
	console.log(x)
	if(x == 1){
		res.status(200).send("login");
	}
	else if(x == 0){
		res.status(200).send("incorrect username or password");
	}
});

// CHANGING TIMETABLE
app.post("/changetimetable", async function (req, res){
	console.log(req.body.section)
	console.log(req.body.subject1)
	console.log(req.body.subject2)
	console.log(req.body.subject3)
	console.log(req.body.subject4)
	console.log(req.body.subject5)
	var arr = []
	arr.push(req.body.subject1)
	arr.push(req.body.subject2)
	arr.push(req.body.subject3)
	arr.push(req.body.subject4)
	arr.push(req.body.subject5)
	try{
		await obj.change_time_table(arr, req.body.section)
	}catch(err){
		res.send("ERROR: ")
	}
	res.send("done")
});

// UPDATE TimeTables
app.get("/updatetimetable", async function(req,res){
	console.log("reached")
	await obj.update_timetable()
	res.send("done")
});

// Converting image to tensor
async function image(img) {
	const buffer = fs.readFileSync(img);
	const decoded = tf.node.decodeImage(buffer);
	const casted = decoded.toFloat();
	const result = casted.expandDims(0);
	decoded.dispose();
	casted.dispose();

	return result;
}

// Loading student labels from directory
function loadlabels(){
	const testFolder = 'D:/NewDesktop/node/student_images';
	let labels = []
	fs.readdirSync(testFolder).forEach(file => {
		labels.push(file)
	});
	return(labels)
}

// To recognize images 
async function recognize(path) {
	await faceapi.nets.ssdMobilenetv1.loadFromDisk('D:/NewDesktop/node/models/')
	await faceapi.nets.faceLandmark68Net.loadFromDisk('D:/NewDesktop/node/models/')
	await faceapi.nets.faceRecognitionNet.loadFromDisk('D:/NewDesktop/node/models/')

	const queryTensor = await image(path);
	let labels = []

	labels = loadlabels()
	let label_descriptors = []

	for(let j =0; j<labels.length; j++){
		descriptions = [];
		for (let i = 1; i <= 2; i++) {
			const img = await image(`D:/NewDesktop/node/student_images/${labels[j]}/${i}.jpg`)
			const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
			descriptions.push(detections.descriptor)
		}
		label_descriptors.push(new faceapi.LabeledFaceDescriptors(labels[j], descriptions))
	}

	const options = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 })
	const singleResult = await faceapi.detectSingleFace(queryTensor, options).withFaceLandmarks().withFaceDescriptor()
	const faceMatcher = new faceapi.FaceMatcher(label_descriptors)

	var u = 0
	if(singleResult){
		u++
	}else{
		return('noface')
	}

	const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
	const r_no = bestMatch.toString()
	return(r_no)
}

// ACCEPTING IMAGES AND PERFORMING FACE RECOGNITION
app.post('/imgsend', upload.single('Images'), async function (req, res, next) {
	console.log(req.file)
	console.log(req.body)
	let file = req.file;

	const r_no = await recognize(file.path)

	console.log(r_no)
	if(r_no === 'unknown'){
		res.status(406).send("Unrecognized Face");
	}
	else if(r_no === 'noface'){
		res.status(204).send("No Face in image");
	}
	else{
		// Updating attendance for student with r_no in db 
		await obj.update_attendance(parseFloat(r_no))
		res.status(200).send("Attendance Successfully logged for: "+r_no);
	}
});

app.listen(port, '192.168.68.110', () => {
	console.log("Server running!");
	console.log(port);
});