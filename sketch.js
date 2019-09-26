let boids = [];
let num_boids = 50;

// let alignmentSlider, cohesionSlider, separationSlider, maxSpeedSlider;

function setup() {

    let settingsMenu = new Settings(true);
    numBoidsSlider = settingsMenu.addSlider("Number of boids", 1, 200, num_boids, 1);
    numBoidsSlider.setOnChange(function(){
        num_boids = numBoidsSlider.value();
        console.log(num_boids);
        respawn();
    })
    alignmentSlider = settingsMenu.addSlider("Alignment", 0, 10, 1, 0.1);
    alignmentPerceptionSlider = settingsMenu.addSlider("Alignment Perception", 0, 1000, 50, 1);
    alignmentPerceptionSlider.setOnChange(updateSliderValues);
    alignmentCheckbox = settingsMenu.addCheckbox("Show Alignment Perception", true, null)
    cohesionSlider = settingsMenu.addSlider("Cohesion", 0, 10, 1, 0.1);
    cohesionPerceptionSlider = settingsMenu.addSlider("Cohesion Perception", 0, 1000, 50, 1);
    cohesionPerceptionSlider.setOnChange(updateSliderValues);
    cohesionCheckbox = settingsMenu.addCheckbox("Show Cohesion Perception", false, null)
    separationSlider = settingsMenu.addSlider("Separation", 0, 10, 1, 0.1);
    separationPerceptionSlider = settingsMenu.addSlider("Separation Perception", 0, 1000, 50, 1);
    separationPerceptionSlider.setOnChange(updateSliderValues);
    separationCheckbox = settingsMenu.addCheckbox("Show Separation Perception", false, null)
    minSpeedSlider = settingsMenu.addSlider("Min speed", 0, 10, 1, 0.1);
    minSpeedSlider.setOnChange(updateSliderValues);
    maxSpeedSlider = settingsMenu.addSlider("Max speed", 0, 10, 5, 0.1);
    maxSpeedSlider.setOnChange(updateSliderValues);
    maxForceSlider = settingsMenu.addSlider("Max force", 0, 15, 5, 0.1);
    maxForceSlider.setOnChange(updateSliderValues);


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