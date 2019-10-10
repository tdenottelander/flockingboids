class Boid {
    constructor(idx) {
      this.idx = idx;
      this.position = createVector(random(width), random(height));
      this.velocity = p5.Vector.random2D();
      this.minSpeed = minSpeedSlider.value();
      this.maxSpeed = maxSpeedSlider.value();
      this.velocity.setMag(random(this.minSpeed, this.maxSpeed));
      this.acceleration = createVector();
      this.maxForce = maxForceSlider.value();
      this.size = 10;
      this.history = [];
      this.line = false;

      this.perceptionAlignment = alignmentPerceptionSlider.value();
      this.perceptionCohesion = cohesionPerceptionSlider.value();
      this.perceptionSeparation = separationPerceptionSlider.value();
    }

    edges() {
      if(this.position.x > width){
        this.position.x = 0;
      } else if (this.position.x < 0){
        this.position.x = width;
      }
      if(this.position.y > height){
        this.position.y = 0;
      } else if (this.position.y < 0){
        this.position.y = height;
      }
    }

    alignment(boids) {
      let avgDirection = createVector();
      let count = 0;
      for (let other of boids){
        if(other != this){
          if(dist(other.position.x, other.position.y, this.position.x, this.position.y) < this.perceptionAlignment){
            avgDirection.add(other.velocity);
            count++;
          }
        }
      }
      if(count != 0){
        avgDirection.div(count);
        avgDirection.sub(this.velocity);
        avgDirection.limit(this.maxForce)
      }
      return avgDirection;
    }

    cohesion(boids) {
      let avgPosition = createVector();
      let count = 0;
      for (let other of boids){
        if(other != this){
          if(dist(other.position.x, other.position.y, this.position.x, this.position.y) < this.perceptionCohesion){
            avgPosition.add(other.position);
            count++;
          }
        }
      }
      if (count > 0){
        avgPosition.div(count);
      }
      let steeringForce = avgPosition.sub(this.position);
      steeringForce.limit(this.maxForce);
      return steeringForce;
    }

    separation(boids) {
      let vec = createVector();
      let count = 0;
      for (let other of boids){
        if (other != this){
          let d = dist(other.position.x, other.position.y, this.position.x, this.position.y);
          if(d < this.perceptionSeparation){
            let diff = p5.Vector.sub(this.position, other.position);
            diff.div(d)
            vec.add(diff)
            count++;
          }
        }
      }
      if(count > 0){
        vec.div(count);
        vec.sub(this.velocity);
        vec.setMag(this.maxForce);
      }
      return vec;
    }

    update(boids) {
      this.acceleration = createVector();
      this.acceleration.add(this.alignment(boids).mult(alignmentSlider.value()));
      this.acceleration.add(this.cohesion(boids).mult(cohesionSlider.value()));
      this.acceleration.add(this.separation(boids).mult(separationSlider.value()));
      this.acceleration.limit(this.maxForce);

      this.velocity.add(this.acceleration.mult(0.05));

      let speed = constrain(this.velocity.mag(), this.minSpeed, this.maxSpeed);
      this.velocity.setMag(speed);
      this.position.add(this.velocity);
      this.history.push(createVector(this.position.x + Math.random() * 5, this.position.y + Math.random() * 5));
    }

    updateSliderValues(){
      this.minSpeed = minSpeedSlider.value();
      this.maxSpeed = maxSpeedSlider.value();
      this.perceptionAlignment = alignmentPerceptionSlider.value();
      this.perceptionCohesion = cohesionPerceptionSlider.value();
      this.perceptionSeparation = separationPerceptionSlider.value();
      this.maxForce = maxForceSlider.value();
    }

    show() {
      this.drawTrail();
      this.drawPerception();
      this.drawTriangle();
    }

    drawPerception(){
      noStroke();
      if(this.idx != 0){
        fill(255);
      } else {
        fill(255, 255, 255, 100);
        if(alignmentCheckbox.value()){
          circle(this.position.x, this.position.y, this.perceptionAlignment);
        }
        if(cohesionCheckbox.value()){
          circle(this.position.x, this.position.y, this.perceptionCohesion);
        }
        if(separationCheckbox.value()){
          circle(this.position.x, this.position.y, this.perceptionSeparation);
        }
        fill('red');
      }
    }

    drawTrail(){
      if(this.history.length > trailLengthSlider.value()){
        this.history.splice(0,1);
      }
      
      if(this.line){
        stroke("yellow")
        noFill()
        beginShape()
        for (let i = 0; i < this.history.length; i++){
          var pos = this.history[i];
          if(Math.abs(pos.x - this.position.x) < width/2 && Math.abs(pos.y - this.position.y) < width/2){
            vertex(pos.x, pos.y)
          }
        }
        endShape()
      } else {
        noStroke();
        fill("yellow")
        for (let i = 0; i < this.history.length; i++){
          var pos = this.history[i];
          ellipse(pos.x, pos.y, i/10, i/10)
        }
      }
    }

    drawTriangle() {
      translate(this.position.x, this.position.y)
      rotate(atan2(this.velocity.y,this.velocity.x) + 0.5 * PI)

      let x1 = 0;
      let y1 = -this.size;

      let x2 = this.size/2;
      let y2 = this.size/3;

      let x3 = -this.size/2;
      let y3 = this.size/3;

      triangle(x1, y1, x2, y2, x3, y3);
      resetMatrix();
    }

}