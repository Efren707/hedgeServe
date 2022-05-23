import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  result: string = "0";
  currentEq: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  numberPress(number: string) {

    //no leading zeros
    if (number == "0" && this.currentEq == "") {
      return;
    }
    
    let lastInput = this.currentEq[this.currentEq.length - 1];
    let operations = ["+", "-", "*", "/"];

    if(number == "0" && operations.includes(lastInput)) {
      return;
    }

    if(lastInput == "." && number == ".") {
      return;
    }

    this.currentEq += number;
    this.calcEq();
  }

  operationPress(operation: string) {
    let lastInput = this.currentEq[this.currentEq.length - 1];
    let operations = ["+", "-", "*", "/"];

    if(operations.includes(lastInput)) {
      return;
    }

    this.currentEq += operation;
    this.calcEq();
  }

  valueChange(){
    let operations = ["+", "-", "*", "/"];

    if(operations.includes(this.currentEq) || this.currentEq == "") {
      return;
    }

    if(this.currentEq[0] == "-"){
      this.currentEq = this.currentEq.slice(1);
    } else {
      this.currentEq = "-" + this.currentEq;
    }
  }

  backup() {
    if (this.currentEq !="" ) {
      this.currentEq=this.currentEq.slice(0, this.currentEq.length-1)
    }
  }
 
  clear() {
    this.result = '';
    this.currentEq = '';
  }

  calcEq() {
    let problem = this.currentEq;

    let lastKey = problem[problem.length - 1];
    let operations = ["+", "-", "*", "/"];
 
    if (lastKey === '.' || operations.includes(lastKey)) {
      problem=problem.slice(0,problem.length - 1);
    }
 
    this.result = eval(problem);
    console.log(this.result);
  }

  solveEq(){
    this.calcEq();
    this.currentEq = this.result;
  }

}
