import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  result: string = "";
  currentEq: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  numberPress(number: string) {

    //no leading zeros
    if (number == "0" && this.currentEq == "") {
      return;
    }
    
    //no double decimals
    let lastInput = this.currentEq[this.currentEq.length - 1];
   
    if(lastInput == "." && number == ".") {
      return;
    }

    this.currentEq += number;
    this.calcEq();
  }

  operationPress(operation: string) {
    let lastInput = this.currentEq[this.currentEq.length - 1];
    let operations = ["+", "-", "*", "/"];

    //no double operations
    if(operations.includes(lastInput)) {
      return;
    }

    this.currentEq += operation;
    this.calcEq();
  }

  valueChange(){
    let operations = ["+", "-", "*", "/"];

    let hasOperation = false;

    for(let i = 0; i < this.currentEq.length; i++) {
      if(operations.includes(this.currentEq[i])) {
        hasOperation = true;
      }
    }

    if(hasOperation) {
      //add negative sign to last number
      let lastOperationIdx = -1;

      for(let i = this.currentEq.length - 1; i >= 0; i--) {
        if(this.currentEq[i] == "-"){
          return;
        } else if(operations.includes(this.currentEq[i])) {
          lastOperationIdx = i;
          break;
        }
      }

      this.currentEq = this.currentEq.slice(0, lastOperationIdx + 1) + "-" + this.currentEq.slice(lastOperationIdx + 1);
    
    } else if(!hasOperation && this.currentEq != "") {
      //add negative sign to first number
      if(this.currentEq[0] == "-"){
        this.currentEq = this.currentEq.slice(1);
      } else {
        this.currentEq = "-" + this.currentEq;
      }
    
    }

  }

  //delete last character
  backup() {
    if (this.currentEq !="" ) {
      this.currentEq=this.currentEq.slice(0, this.currentEq.length-1)
    }
  }
 
  //delete all characters
  clear() {
    this.result = '';
    this.currentEq = '';
  }

  //calculate equation
  calcEq() {
    let problem = this.currentEq;

    let lastKey = problem[problem.length - 1];
    let operations = ["+", "-", "*", "/"];
 
    if (lastKey === '.' || operations.includes(lastKey)) {
      problem=problem.slice(0,problem.length - 1);
    }
 
    this.result = eval(problem);
  }

  //return result
  solveEq(){
    this.calcEq();
    this.currentEq = this.result;
  }

}
