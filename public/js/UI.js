class UI {
  constructor() {
    this.type = 'number';
    this.vectorId_1 = 'vector_1';
    this.vectorId_2 = 'vector_2';
    this.vectorSize = 3;

    this.matrixId_1 = 'matrix_1';
    this.matrixId_2 = 'matrix_2';
    this.matrixSize = 3;
    this.matrixValues = document.getElementsByClassName('matrix_values');
  }
  
  // ------------- ВЕКТОРЫ -------------- //
  addVector(parentId) {
    let vectorDiv = document.getElementById(parentId);
    let className = 'vector_input';

    for (let i = 0; i < this.vectorSize; i++) {
        let input = document.createElement("input");
        input.className = className;
        vectorDiv.append(input);
    }
  }

  incVector() {
    let vectorDiv = document.getElementById('vector_1');
    let input = document.createElement("input");
    input.className = 'vector_input';
    vectorDiv.append(input);
    let vectorDiv2 = document.getElementById('vector_2');
    input = document.createElement("input");
    input.className = 'vector_input';
    vectorDiv2.append(input);
    this.vectorSize++;
    if (this.vectorSize === 3) {
      this.showElemById('vect_mult');
    } else {
      this.hideElemById('vect_mult');
    }
  }

  decVector() {
    if (this.vectorSize > 2) {
      let vectorDiv = document.getElementById('vector_1');
      let vectorDiv2 = document.getElementById('vector_2');
      vectorDiv.children[vectorDiv.children.length - 1].remove();
      vectorDiv2.children[vectorDiv2.children.length - 1].remove();
      this.vectorSize--;
      if (this.vectorSize === 3) {
        this.showElemById('vect_mult');
      } else {
        this.hideElemById('vect_mult');
      }
    }
  }

  deleteMatrix() {
    document.getElementById('matrix_1').innerHTML = "";
    document.getElementById('matrix_2').innerHTML = "";
  }

  getVectorSize = () => this.vectorSize;

  takeVectorValues = () => {
    let values = document.getElementsByClassName("matrix_values");
    console.log(values);
  }
  // ------------- МАТРИЦЫ -------------- //
  addMatrix(parentId) {
    let matrixDiv = document.getElementById(parentId);
    let className = 'matrix_input';

    for (let i = 0; i < this.matrixSize; i++) {
      for (let j = 0; j < this.matrixSize; j++) {
        let input = document.createElement("input");
        input.className = className;
        matrixDiv.append(input);
      }
      let br = document.createElement('br');
      matrixDiv.append(br);
    }
  }

  incMatrix() {
    this.deleteMatrix();
    this.matrixSize++;
    this.addMatrix(this.matrixId_1);
    this.addMatrix(this.matrixId_2);
  }

  decMatrix() {
    if (this.matrixSize > 2) {
      this.deleteMatrix();
      this.matrixSize--;
      this.addMatrix(this.matrixId_1);
      this.addMatrix(this.matrixId_2);
    }
  }

  deleteMatrix() {
    document.getElementById('matrix_1').innerHTML = "";
    document.getElementById('matrix_2').innerHTML = "";
  }

  getMatrixSize = () => this.matrixSize;

  takeNumberValues = () => {
    let inputs = document.getElementsByClassName('number_input');
      let values = [];
      for (let i = 0; i < inputs.length; i++) {
        values.push(inputs[i].value);
      }
      return values;
  }

  takeVectorValues = () => {
    let inputs = document.getElementsByClassName("vector_input");
    let values = [];
    for (let i = 0; i < inputs.length; i++) {
      values.push(inputs[i].value);
    }
    return values;
  }

  takeMatrixValues = () => {
    let inputs = document.getElementsByClassName("matrix_input");
    let values = [];
    for (let i = 0; i < inputs.length; i++) {
      values.push(inputs[i].value);
    }
    return values;
  }

  takeValues() {
    switch(this.type) {
      case 'number':
        return {
          values: this.takeNumberValues(),
          type: this.type
        };
      case 'vector':
        return {
          values: this.takeVectorValues(),
          type: this.type
        };
      case 'matrix':
        return {
          values: this.takeMatrixValues(),
          type: this.type
        };
    }
  }

  // отображение
  changeView(name) {
    switch(name) {
      case 'number':
        this.hideElem('vector_calc');
        this.hideElem('matrix_calc');
        this.showElem('number_calc');
        this.hideElemById('scal_mult');
        this.hideElemById('vect_mult');
        this.showElemById('mult');
        this.showElemById('divis');
        this.type = 'number';
        break;
      case 'vector':
        this.hideElem('number_calc');
        this.hideElem('matrix_calc');
        this.showElem('vector_calc');
        this.showElemById('scal_mult');
        this.showElemById('vect_mult');
        this.hideElemById('mult');
        this.hideElemById('divis');
        this.type = 'vector';
        break;
      case 'matrix':
        this.hideElem('number_calc');
        this.hideElem('vector_calc');
        this.showElem('matrix_calc');
        this.hideElemById('scal_mult');
        this.hideElemById('vect_mult');
        this.showElemById('mult');
        this.hideElemById('divis');
        this.type = 'matrix';
        break;
    }
  }

  showElem(className) {
    let elem = document.getElementsByClassName(className);
    elem[0].style.display = 'block';
  }

  hideElem(className) {
    let elem = document.getElementsByClassName(className);
    elem[0].style.display = 'none';
  }

  showElemById(id) {
    let elem = document.getElementById(id);
    elem.style.display = 'inline';
  }

  hideElemById(id) {
    let elem = document.getElementById(id);
    elem.style.display = 'none';
  }
}

