let boids = [];
let num_boids = 70;

function setup() {

    canvas = createCanvas(500, 500);
    canvas.parent('canvas-holder');
    canvas.canvas.id = "canvas";

    let settingsMenu = new Settings(false);
    document.getElementById('canvas-holder').appendChild(settingsMenu.settingsContainer);
    var rect = canvas.canvas.getBoundingClientRect();
    settingsMenu.setPosition(rect.x + 5, rect.y + 5);
    settingsMenu.addHeader("General");
    numBoidsSlider = settingsMenu.addSlider("Number of boids", 1, 200, num_boids, 1);
    numBoidsSlider.setOnChange(function(){
        num_boids = numBoidsSlider.value();
        respawn();
    })
    minSpeedSlider = settingsMenu.addSlider("Min speed", 0, 10, 1.3, 0.1);
    minSpeedSlider.setOnChange(updateSliderValues);
    maxSpeedSlider = settingsMenu.addSlider("Max speed", 0, 10, 2, 0.1);
    maxSpeedSlider.setOnChange(updateSliderValues);
    maxForceSlider = settingsMenu.addSlider("Max force", 0, 15, 1, 0.1);
    maxForceSlider.setOnChange(updateSliderValues);

    settingsMenu.addHeader("Alignment");
    alignmentSlider = settingsMenu.addSlider("Alignment", 0, 10, 1.5, 0.1);
    alignmentPerceptionSlider = settingsMenu.addSlider("Alignment Perception", 0, 1000, 40, 1);
    alignmentPerceptionSlider.setOnChange(updateSliderValues);
    alignmentCheckbox = settingsMenu.addCheckbox("Show Alignment Perception", true, null)
    
    settingsMenu.addHeader("Cohesion");
    cohesionSlider = settingsMenu.addSlider("Cohesion", 0, 10, 1.0, 0.1);
    cohesionPerceptionSlider = settingsMenu.addSlider("Cohesion Perception", 0, 1000, 40, 1);
    cohesionPerceptionSlider.setOnChange(updateSliderValues);
    cohesionCheckbox = settingsMenu.addCheckbox("Show Cohesion Perception", false, null)

    settingsMenu.addHeader("Separation");
    separationSlider = settingsMenu.addSlider("Separation", 0, 10, 1.5, 0.1);
    separationPerceptionSlider = settingsMenu.addSlider("Separation Perception", 0, 1000, 30, 1);
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
    let preset0 = createPreset([70, 1.3, 2, 1, 1.5, 40, 1, 40, 1.5, 30], 0);
    let preset1 = createPreset([50, 1.6, 2.5, 2.5, 2.5, 150, 2.5, 75, 5.5, 30], 1);
    let preset2 = createPreset([75, 1.5, 2.0, 5.0, 3.8, 132, 3.3, 150, 7.5, 32], 2);
    let preset3 = createPreset([50, 1.5, 2.5, 2.5, 5, 130, 0.5, 75, 1.5, 30], 3);
    let preset4 = createPreset([50, 1.5, 2.5, 2.5, 1.5, 130, 0, 75, 10, 60], 4);
    let preset5 = createPreset([75, 0.5, 10, 1.5, 2.3, 80, 1.2, 50, 1.5, 50], 5)
    settingsMenu.addCustomElements([preset0, preset1, preset2, preset3, preset4, preset5]);
    settingsMenu.addCustomElement(createPreset([50, 1.5, 2.3, 8.5, 0, 0, 0, 0, 4, 70], "separation only"));
    settingsMenu.addCustomElement(createPreset([50, 1.5, 2, 2, 1, 50, 0, 0, 0, 0], "alignment only"));
    settingsMenu.addCustomElement(createPreset([50, 1.5, 2, 2.5, 0, 0, 2, 120, 0, 0], "cohesion only"));

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