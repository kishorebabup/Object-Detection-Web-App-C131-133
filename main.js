img = "";
status = "";
objects = [];

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting";
}

function modelLoaded(){
    status = true;
    console.log("Model Loaded");
    objectDetector.detect(img, gotResult);
}

function gotResult(results, error){
    if(error){
        console.log(error);
    }
    console.log(results);

    objects = results;
}

function preload(){
    img = loadImage("dog_cat.jpg");
}

function draw(){
   image(img, 0, 0, 640, 420); 
   
   if(status != "")
   {

     for(i = 0; i < objects.length; i++)
     {
      document.getElementById("status").innerHTML = "Object Detected";

      fill("red");
      noFill();
      stroke("red");
      percent = Math.floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
     }

   }

  
}



