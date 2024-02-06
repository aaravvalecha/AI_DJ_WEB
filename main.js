music="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scorerightwrist=0;
scoreleftwrist=0;

function preload(){
music=loadSound("music.mp3");
}
function setup(){
canvas= createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

posenet=ml5.poseNet(video,model_loaded);

posenet.on('pose',got_poses);
}
function got_poses(results){

    if(results.length>0){
        console.log(results);
scorerightwrist= results[0].pose.keypoints[10].score;

scoreleftwrist= results[0].pose.keypoints[10].score;


        leftwristX=results[0].pose.leftWrist.x;
leftwristY=results[0].pose.leftWrist.y;
console.log("leftwristX = "+leftwristX+", leftwristY = "+leftwristY);


rightwristX=results[0].pose.rightWrist.x;
rightwristY=results[0].pose.rightWrist.y;
console.log("rightwristX = "+rightwristX+", rightwristY = "+rightwristY);

    }

}
function model_loaded(){

    console.log("model_loaded");
}
function draw(){
image(video,0,0,600,500);

fill("red");
stroke("red");


if(scoreleftwrist > 0.2){

    circle(leftwristX,leftwristY,20);
if(leftwristY >0 && leftwristY <= 100){

document.getElementById("speed").innerHTML="speed = 0.5x";
music.rate(0.5);
}
else if(leftwristY >100 && leftwristY <= 200){

    document.getElementById("speed").innerHTML="speed = 1x";
    music.rate(1);
}else if(leftwristY >200 && leftwristY <= 300){

    document.getElementById("speed").innerHTML="speed = 1.5x";
    music.rate(1.5);
}
else if(leftwristY >300 && leftwristY <= 400){

    document.getElementById("speed").innerHTML="speed = 2x";
    music.rate(2);
}else if(leftwristY >400 && leftwristY <= 500){

    document.getElementById("speed").innerHTML="speed = 2.5x";
    music.rate(2.5);
}


}

if(scorerightwrist>0.2){
circle(rightwristX,rightwristY,20);


number_rightwristy=Number(rightwristY);
round=floor(number_rightwristy);
volume=round/500;
document.getElementById("volume").innerHTML="volume : "+volume;
music.setVolume(volume);
}


}
function play(){

    music.play();
    music.setVolume(1);
    music.rate(1);

}
function pause(){
    music.pause();

}
