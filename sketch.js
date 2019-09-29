let boids = [];
let num_boids = 50;

// let alignmentSlider, cohesionSlider, separationSlider, maxSpeedSlider;

function setup() {

    let settingsMenu = new Settings(true);
    settingsMenu.addHeader("General");
    numBoidsSlider = settingsMenu.addSlider("Number of boids", 1, 200, num_boids, 1);
    numBoidsSlider.setOnChange(function(){
        num_boids = numBoidsSlider.value();
        respawn();
    })
    minSpeedSlider = settingsMenu.addSlider("Min speed", 0, 10, 2, 0.1);
    minSpeedSlider.setOnChange(updateSliderValues);
    maxSpeedSlider = settingsMenu.addSlider("Max speed", 0, 10, 3, 0.1);
    maxSpeedSlider.setOnChange(updateSliderValues);
    maxForceSlider = settingsMenu.addSlider("Max force", 0, 15, 5, 0.1);
    maxForceSlider.setOnChange(updateSliderValues);

    settingsMenu.addHeader("Alignment");
    alignmentSlider = settingsMenu.addSlider("Alignment", 0, 10, 1, 0.1);
    alignmentPerceptionSlider = settingsMenu.addSlider("Alignment Perception", 0, 1000, 50, 1);
    alignmentPerceptionSlider.setOnChange(updateSliderValues);
    alignmentCheckbox = settingsMenu.addCheckbox("Show Alignment Perception", true, null)
    
    settingsMenu.addHeader("Cohesion");
    cohesionSlider = settingsMenu.addSlider("Cohesion", 0, 10, 1, 0.1);
    cohesionPerceptionSlider = settingsMenu.addSlider("Cohesion Perception", 0, 1000, 50, 1);
    cohesionPerceptionSlider.setOnChange(updateSliderValues);
    cohesionCheckbox = settingsMenu.addCheckbox("Show Cohesion Perception", false, null)

    settingsMenu.addHeader("Separation");
    separationSlider = settingsMenu.addSlider("Separation", 0, 10, 1, 0.1);
    separationPerceptionSlider = settingsMenu.addSlider("Separation Perception", 0, 1000, 50, 1);
    separationPerceptionSlider.setOnChange(updateSliderValues);
    separationCheckbox = settingsMenu.addCheckbox("Show Separation Perception", false, null)

    let button = document.createElement("button");
    document.body.appendChild(button);
    button.onclick = function(e){
        numBoidsSlider.setValue(50);
        minSpeedSlider.setValue(1.6);
        maxSpeedSlider.setValue(2.5);
        maxForceSlider.setValue(2.5);
        alignmentSlider.setValue(2.5);
        alignmentPerceptionSlider.setValue(150);
        cohesionSlider.setValue(2.5);
        cohesionPerceptionSlider.setValue(75);
        separationSlider.setValue(5.5);
        separationPerceptionSlider.setValue(30);
    }

    let button2 = document.createElement("button");
    document.body.appendChild(button);
    button.onclick = function(){
        numBoidsSlider.setValue(75);
        minSpeedSlider.setValue(1.5);
        maxSpeedSlider.setValue(2.0);
        maxForceSlider.setValue(5.0);
        alignmentSlider.setValue(3.8);
        alignmentPerceptionSlider.setValue(132);
        cohesionSlider.setValue(3.3);
        cohesionPerceptionSlider.setValue(150);
        separationSlider.setValue(7.5);
        separationPerceptionSlider.setValue(32);
    }

    createCanvas(500, 500);

    for (let i = 0; i < num_boids; i++){
        boids.push(new Boid(i))
    }
}

function draw() {
    background(51);
    for (boid of boids){
        boid.update(boids);
        boid.edges();
        boid.show();
    }
}

function respawn(){
    boids = [];
    for (let i = 0; i < num_boids; i++){
        boids.push(new Boid(i));
    }
}

function updateSliderValues(){
    for (boid of boids){
        boid.updateSliderValues();
    }
}