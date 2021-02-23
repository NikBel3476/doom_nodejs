class UI {
  constructor() {
    this.type = 'number';
    this.vectorSize = 3;
    this.matrixSize = 3;

    this.divNumberCalcId = 'number_calc';
    this.divVectorCalcId = 'vector_calc';
    this.divMatrixCalcId = 'matrix_calc';
    this.divVectorId_1 = 'vector_1';
    this.divVectorId_2 = 'vector_2';
    this.divMatrixId_1 = 'matrix_1';
    this.divMatrixId_2 = 'matrix_2';

    this.numInputId = 'number_input';
    this.vectInputId = 'vector_input';
    this.matrixInputId = 'matrix_input';
    this.vectInputClassName = 'vector_input';

    this.sumButtonId = 'sum';
    this.subButtonId =  'sub';
    this.multButtonId = 'mult';
    this.divisButtonId = 'divis';
    this.scalMultButtonId = 'scal_mult';
    this.vectMultButtonId = 'vect_mult';
  }
  
  // ------------- ВЕКТОРЫ -------------- //
  addVector = (parentId) => {
    let vectorDiv = document.getElementById(parentId);
    let className = 'vector_input';

    for (let i = 0; i < this.vectorSize; i++) {
        let input = document.createElement("input");
        input.className = className;
        vectorDiv.append(input);
    }
  }

  incVector = () => {
    let vectorDiv = document.getElementById(this.divVectorId_1);
    let input = document.createElement("input");
    input.className = this.vectInputClassName;
    vectorDiv.append(input);
    let vectorDiv2 = document.getElementById(this.divVectorId_2);
    input = document.createElement("input");
    input.className = this.vectInputClassName;
    vectorDiv2.append(input);
    this.vectorSize++;
    if (this.vectorSize === 3) {
      this.showElemById(this.vectMultButtonId);
    } else {
      this.hideElemById(this.vectMultButtonId);
    }
  }

  decVector = () => {
    if (this.vectorSize > 2) {
      let vectorDiv = document.getElementById(this.divVectorId_1);
      let vectorDiv2 = document.getElementById(this.divVectorId_2);
      vectorDiv.children[vectorDiv.children.length - 1].remove();
      vectorDiv2.children[vectorDiv2.children.length - 1].remove();
      this.vectorSize--;
      if (this.vectorSize === 3) {
        this.showElemById(this.vectMultButtonId);
      } else {
        this.hideElemById(this.vectMultButtonId);
      }
    }
  }

  clearElemById = (id) => {
    document.getElementById(id).innerHTML = "";
  }

  getVectorSize = () => this.vectorSize;

  takeVectorValues = () => {
    let values = document.getElementsByClassName("matrix_values");
    console.log(values);
  }
  // ------------- МАТРИЦЫ -------------- //
  getMatrixSize = () => this.matrixSize;

  incMatrix = () => {
    this.clearElemById(this.divMatrixId_1);
    this.clearElemById(this.divMatrixId_2);
    this.matrixSize++;
    this.addMatrix(this.divMatrixId_1);
    this.addMatrix(this.divMatrixId_2);
  }

  decMatrix = () => {
    if (this.matrixSize > 2) {
      this.clearElemById(this.divMatrixId_1);
      this.clearElemById(this.divMatrixId_2);
      this.matrixSize--;
      this.addMatrix(this.divMatrixId_1);
      this.addMatrix(this.divMatrixId_2);
    }
  }

  addMatrix = (parentId) => {
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

  deleteMatrix = () => {
    document.getElementById(this.matrixId_1).innerHTML = "";
    document.getElementById(this.matrixId_2).innerHTML = "";
  }

  takeValues = () => {
    switch(this.type) {
      case 'number': 
        return this.takeNumberValues()
      case 'vector': 
        return this.takeVectorValues()
      case 'matrix': 
        return this.takeMatrixValues()
    }
  }

  takeNumberValues = () => {
    let inputs = document.getElementsByClassName(this.numInputId);
      let values = [];
      for (let i = 0; i < inputs.length; i++) {
        values.push(inputs[i].value);
      }
      return values;
  }

  takeVectorValues = () => {
    let inputs = document.getElementsByClassName(this.vectInputId);
    let values = [];
    for (let i = 0; i < inputs.length; i++) {
      values.push(inputs[i].value);
    }
    return values;
  }

  takeMatrixValues = () => {
    let inputs = document.getElementsByClassName(this.matrixInputId);
    let values = [];
    for (let i = 0; i < inputs.length; i++) {
      values.push(inputs[i].value);
    }
    return values;
  }

  // отображение
  showDiv = (name) => {
    switch(name) {
      case 'number':
        this.showNumber();
        this.type = 'number';
        break;
      case 'vector':
        this.showVector();
        this.type = 'vector';
        break;
      case 'matrix':
        this.showMatrix();
        this.type = 'matrix';
        break;
    }
  }

  showNumber = () => {
    this.hideElem(this.divVectorCalcId);
    this.hideElem(this.divMatrixCalcId);
    this.showElem(this.divNumberCalcId);
    this.hideElemById(this.scalMultButtonId);
    this.hideElemById(this.vectMultButtonId);
    this.showElemById(this.multButtonId);
    this.showElemById(this.divisButtonId);
  }

  showVector = () => {
    this.hideElem(this.divNumberCalcId);
    this.hideElem(this.divMatrixCalcId);
    this.showElem(this.divVectorCalcId);
    this.showElemById(this.scalMultButtonId);
    this.showElemById(this.vectMultButtonId);
    this.hideElemById(this.multButtonId);
    this.hideElemById(this.divisButtonId);
  }

  showMatrix = () => {
    this.hideElem(this.divNumberCalcId);
    this.hideElem(this.divVectorCalcId);
    this.showElem(this.divMatrixCalcId);
    this.hideElemById(this.scalMultButtonId);
    this.hideElemById(this.vectMultButtonId);
    this.showElemById(this.multButtonId);
    this.hideElemById(this.divisButtonId);
  }

  showElem = (className) => {
    let elem = document.getElementsByClassName(className);
    elem[0].style.display = 'block';
  }

  hideElem = (className) => {
    let elem = document.getElementsByClassName(className);
    elem[0].style.display = 'none';
  }

  showElemById = (id) => {
    let elem = document.getElementById(id);
    elem.style.display = 'inline';
  }

  hideElemById = (id) => {
    let elem = document.getElementById(id);
    elem.style.display = 'none';
  }
}

