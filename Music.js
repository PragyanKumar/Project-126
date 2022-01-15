song1=""
song2=""
song1_status=""
song2_status=""
leftWristX=0
LeftWristY=0
RightWristX=0
RightWristY=0

scoreLeftWrist=0
scoreRightWrist=0

function preload(){
    song1=loadSound("music.mp3")
    song2=loadSound("music2.mp3")
}

function setup(){
    canvas=createCanvas(600,500)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    posenet=ml5.poseNet(video,modelLoaded)
    posenet.on("pose" , gotPoses)
}

function gotPoses(results){
    if(results.length>0){
        console.log(results)
        scoreLeftWrist=results[0].pose.keypoints[9].score
        scoreRightWrist=results[0].pose.keypoints[10].score
        console.log("score leftwrist = " + scoreLeftWrist + "scoreRightWrist= " + scoreRightWrist)
        leftWristX=results[0].pose.leftWrist.x
        LeftWristY=results[0].pose.leftWrist.y
        console.log("LeftWristX= " + leftWristX + "LeftWristY= " + LeftWristY)
        RightWristX=results[0].pose.rightWrist.x
        RightWristY=results[0].pose.rightWrist.y
        console.log("RightWristX= " + RightWristX + "RightWristY= " + RightWristY)
    }
}

function modelLoaded(){
    console.log("posenet is initialised")
}

function draw(){
    image(video,0,0,600,500)
    song1_status=song1.isPlaying()
    song2_status=song2.isPlaying()
    fill("#0000FF")
    stroke("#0000FF")
    if(scoreLeftWrist>0.2){
    circle(leftWristX,LeftWristY,20)
    song1.stop()
    if(song2_status==false){
        song2.play()
        document.getElementById("name").innerHTML="playing avengers theme song"
    }
    }
    if(scoreRightWrist>0.2){
        circle(RightWristX,RightWristY,20)
        song2.stop()
        if(song1_status==false){
            song1.play()
            document.getElementById("name").innerHTML="playing pokemon theme song"
        }
        }
}
function play(){
    song1.play()
    song1.setVolume(1)
    song1.rate(1)
    
}

