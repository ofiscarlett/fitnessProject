// form validation
 (() => {
    'use strict'
  
    // Fetch the forms we want to apply custom Bootstrap validation 
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach((form: HTMLFormElement)=> {
        form.addEventListener('submit', (event: Event)=> {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false);
      });
  })();

//   create class and functions to calculate bmi and bmi category
  class bmiCalculator {
    male: number;
    female: number;
    age: number;
    height: number;
    weight: number;
    activity: number;
    trweight: number;
    bmi: number;
    bmr: number;
    cntrl: string;
    calories: number;

    constructor( male:number, female: number, age: number,height: number, weight: number, activity: number, trweight:number) {
        this.male = male;
        this.female = female;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.activity = activity;
        this.trweight = trweight;
        this.bmi = 0;
        this.bmr = 0;
        this.cntrl = "";
        this.calories = 0;
        
    }
    calculateBMI(): number {
        let heightinMeters = this.height / 100;
        this.bmi = this.weight / (heightinMeters * heightinMeters);
        return this.bmi;
    }
    displayBMI(): void {
        let bmiResult = document.getElementById("bmi-value");
        bmiResult.textContent = this.bmi.toFixed(1).toString();
    }
   
    getBMIStatus() {
         // get BMI status for >20 adults
        if (this.bmi < 18.5) {
          return "Underweight";
        } else if (this.bmi >= 18.5 && this.bmi < 25) {
          return "Healthy";
        } else if (this.bmi >= 25 && this.bmi < 30) {
          return "Overweight";
        } else if (this.bmi >= 30) {
          return "Obese";
        }else {
            return "invalid";
        }
    }
    displayBMIStatus(): void {
        let bmiStatus = document.getElementById("bmi-status");
        bmiStatus.textContent = this.getBMIStatus();
    }
    // BMR calculation
    calculateBMR(): number {
        //bmrM = (Weight*10)+(6.25* Height)-(5*Age)+5; //BMR FORMULA FOR MALE
        //bmrF = (Weight*10)+(6.25* Height)-(5*Age)-161; // BMR FORMULA FOR FEMALE
        let heightinCm = this.height
        let weightinKg = this.weight;
        let age = this.age;
        if((document.querySelector("#male") as HTMLInputElement).checked) {
            this.bmr = (weightinKg*10)+(6.25* heightinCm)-(5*age)+5;
        }else if ((document.querySelector("#female") as HTMLInputElement).checked){
            this.bmr = (weightinKg*10)+(6.25* heightinCm)-(5*age)-161;
        } else {
            this.bmr = 0;
        }
        return this.bmr;
    }
    displayBMR(): void {
        let bmr = document.getElementById("bmr-value");
        bmr.textContent = this.bmr.toFixed(1).toString();
    }
    // weight control
    getWeightControl() {
        // get weight control for >20 adults
        if (this.weight < this.trweight) {
            return "TO GAIN WEIGHT";
          } else if (this.weight > this.trweight) {
            return "TO LOSE WEIGHT";
          } else if (this.weight == this.trweight){
            return "TO MAINTAIN WEIGHT";
          } else {
              return "INVALID";
          }
        }   
    displayWeightControl(): void {
        let weightStatus = document.getElementById("control");
        weightStatus.textContent = this.getWeightControl();
    }
  
    // calories
    getCalories(): number {
        let actualCalories = 0;
        if (this.activity == 1) {
            actualCalories = this.bmr * 1.2;
            //if weight control is gain
            if (this.weight < this.trweight) {
                this.calories = actualCalories + 500;
                //if weight control is loss
            } else if (this.weight > this.trweight) {
                this.calories = actualCalories - 500;
                //if weight control is maintain
            } else if (this.weight == this.trweight){
                this.calories = actualCalories;
                //if weight control is invalid
            } else {
                this.calories = 0;
            }
          } else if (this.activity == 2) {
            actualCalories = this.bmr * 1.375;
            //if weight control is gain
            if (this.weight < this.trweight) {
                this.calories = actualCalories + 500;
                //if weight control is loss
            } else if (this.weight > this.trweight) {
                this.calories = actualCalories - 500;
                //if weight control is maintain
            } else if (this.weight == this.trweight){
                this.calories = actualCalories;
                //if weight control is invalid
            } else {
                this.calories = 0;
            }
          } else if (this.activity == 3){
            actualCalories = this.bmr * 1.55;
            //if weight control is gain
            if (this.weight < this.trweight) {
                this.calories = actualCalories + 500;
                //if weight control is loss
            } else if (this.weight > this.trweight) {
                this.calories = actualCalories - 500;
                //if weight control is maintain
            } else if (this.weight == this.trweight){
                this.calories = actualCalories;
                //if weight control is invalid
            } else {
                this.calories = 0;
            }
          } else if (this.activity == 4){
            actualCalories = this.bmr * 1.725;
            //if weight control is gain
            if (this.weight < this.trweight) {
                this.calories = actualCalories + 500;
                //if weight control is loss
            } else if (this.weight > this.trweight) {
                this.calories = actualCalories - 500;
                //if weight control is maintain
            } else if (this.weight == this.trweight){
                this.calories = actualCalories;
                //if weight control is invalid
            } else {
                this.calories = 0;
            }
          } else if (this.activity == 5){
            actualCalories = this.bmr * 1.9;
            //if weight control is gain
            if (this.weight < this.trweight) {
                this.calories = actualCalories + 500;
                //if weight control is loss
            }else if (this.weight > this.trweight) {
                this.calories = actualCalories - 500;
                //if weight control is maintain
            } else if (this.weight == this.trweight){
                this.calories = actualCalories;
                //if weight control is invalid
            } else {
                this.calories = 0;
            }
          } else {
            actualCalories = 0;
          }
            return this.calories;
        }
    displayCalories(): void {
        let calories = document.getElementById("calories");
        calories.textContent = this.getCalories().toFixed(1).toString();
    }
        
}
// call functions on submit
let form = document.querySelector("#bmi-form") as HTMLFormElement;
form.addEventListener("submit", (event: Event) => {
    event.preventDefault();
    
// create object and call functions
let male = Number((document.getElementById("male") as HTMLInputElement).value);
let female = Number((document.getElementById("female") as HTMLInputElement).value);
let age = Number((document.getElementById("age") as HTMLInputElement).value);
let height = Number((document.getElementById("height") as HTMLInputElement).value);
let weight = Number((document.getElementById("weight") as HTMLInputElement).value);
let activity = Number((document.getElementById("activity") as HTMLInputElement).value);
let trweight = Number((document.getElementById("tar-weight") as HTMLInputElement).value);

let bmi = new bmiCalculator(male,female,age,height, weight,activity,trweight);
bmi.calculateBMI();
bmi.displayBMI();
bmi.displayBMIStatus();
bmi.calculateBMR();
bmi.displayBMR();
bmi.getWeightControl();
bmi.displayWeightControl();
bmi.getCalories();
bmi.displayCalories();
});

