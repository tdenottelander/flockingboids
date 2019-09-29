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

    function createPreset(values, innerHTML) {
        let button = document.createElement("button");
        button.innerHTML = innerHTML;
        button.onclick = function(){
        numBoidsSlider.setValue(values[0]);
        minSpeedSlider.setValue(values[1]);
        maxSpeedSlider.setValue(values[2]);
        maxForceSlider.setValue(values[3]);
        alignmentSlider.setValue(values[4]);
        alignmentPerceptionSlider.setValue(values[5]);
        cohesionSlider.setValue(values[6]);
        cohesionPerceptionSlider.setValue(values[7]);
        separationSlider.setValue(values[8]);
        separationPerceptionSlider.setValue(values[9]);
        }
        return button;
    }

    settingsMenu.addHeader("Presets");
    let preset1 = createPreset([50, 1.6, 2.5, 2.5, 2.5, 150, 2.5, 75, 5.5, 30], 1);
    let preset2 = createPreset([75, 1.5, 2.0, 5.0, 3.8, 132, 3.3, 150, 7.5, 32], 2);
    let preset3 = createPreset([50, 1.5, 2.5, 2.5, 5, 130, 0.5, 75, 1.5, 30], 3);
    let preset4 = createPreset([50, 1.5, 2.5, 2.5, 1.5, 130, 0, 75, 10, 60], 4);
    settingsMenu.addCustomElements([preset1, preset2, preset3, preset4]);
    settingsMenu.addCustomElement(createPreset([50, 1.5, 2.3, 8.5, 0, 0, 0, 0, 4, 70], "separation only"));
    settingsMenu.addCustomElement(createPreset([50, 1.5, 2, 2, 1, 50, 0, 0, 0, 0], "alignment only"));
    settingsMenu.addCustomElement(createPreset([50, 1.5, 2, 2.5, 0, 0, 2, 120, 0, 0], "cohesion only"));

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