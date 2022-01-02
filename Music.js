song=""
leftWristX=0
LeftWristY=0
RightWristX=0
RightWristY=0

function preload(){
    song=loadSound("music.mp3")
}

function setup(){
    canvas=createCanvas(600,500)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    posenet=ml5.poseNet(video,modelLoaded)
    posenet.on("pose" , gotPoses)
}

function gotPoses(result){
    if(result.length>0){
        console.log(result)
        leftWristX=result[0].pose.leftWrist.x
        LeftWristY=result[0].pose.leftWrist.y
        console.log("LeftWristX= " + leftWristX + "LeftWristY= " + LeftWristY)
        RightWristX=result[0].pose.rightWrist.x
        RightWristY=result[0].pose.rightWrist.y
        console.log("RightWristX= " + RightWristX + "RightWristY= " + RightWristY)
    }
}

function modelLoaded(){
    console.log("posenet is initialised")
}

function draw(){
    image(video,0,0,600,500)
}

function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}