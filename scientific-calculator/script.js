class ScientificCalculator {
  constructor() {
    this.input = '';
    this.lastResult = null;
    this.expressionText = '';
    this.powerMode = false;
    this.isError = false;
    
    this.display = document.getElementById('display');
    this.expression = document.getElementById('expression');
    this.calculator = document.getElementById('calculator');
    this.toggleButton = document.getElementById('toggle');
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.updateDisplay();
  }
  
  bindEvents() {
    // Toggle expand/collapse
    this.toggleButton.addEventListener('click', () => this.toggleExpand());
    
    // Number and operator buttons
    document.querySelectorAll('.btn[data-value]').forEach(btn => {
      btn.addEventListener('click', () => this.handleButton(btn.dataset.value));
    });
    
    // Special buttons
    document.getElementById('clear').addEventListener('click', () => this.clear());
    document.getElementById('backspace').addEventListener('click', () => this.backspace());
    document.getElementById('decimal').addEventListener('click', () => this.addDecimal());
    document.getElementById('negate').addEventListener('click', () => this.toggleSign());
    document.getElementById('equals').addEventListener('click', () => this.calculate());
    document.getElementById('mod').addEventListener('click', () => this.handleButton('%'));
    
    // Advanced functions
    document.getElementById('power').addEventListener('click', () => this.setPowerMode());
    document.getElementById('sqrt').addEventListener('click', () => this.calculateSqrt());
    document.getElementById('square').addEventListener('click', () => this.calculateSquare());
    document.getElementById('inverse').addEventListener('click', () => this.calculateInverse());
    document.getElementById('sin').addEventListener('click', () => this.calculateSin());
    document.getElementById('cos').addEventListener('click', () => this.calculateCos());
    document.getElementById('tan').addEventListener('click', () => this.calculateTan());
    document.getElementById('log').addEventListener('click', () => this.calculateLog());
    
    // Keyboard support
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    
    // Button visual feedback
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousedown', () => btn.classList.add('active'));
      btn.addEventListener('mouseup', () => btn.classList.remove('active'));
      btn.addEventListener('mouseleave', () => btn.classList.remove('active'));
      btn.addEventListener('touchstart', () => {
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 200);
      });
    });
    
    // Prevent zoom on double-tap for mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }
  
  toggleExpand() {
    this.calculator.classList.toggle('expanded');
    this.toggleButton.textContent = this.calculator.classList.contains('expanded')
      ? 'Show Less ▼'
      : 'Show More ▲';
  }
  
  handleButton(value) {
    if (this.isError) {
      this.clear();
    }
    
    if (this.lastResult && !isNaN(value)) {
      this.input = value;
      this.lastResult = null;
    } else if (this.lastResult && isNaN(value)) {
      this.input = this.input + value;
      this.lastResult = null;
    } else {
      this.input += value;
    }
    
    this.updateDisplay();
  }
  
  clear() {
    this.input = '';
    this.lastResult = null;
    this.powerMode = false;
    this.expressionText = '';
    this.isError = false;
    
    this.display.classList.remove('error');
    
    this.updateExpression();
    this.updateDisplay();
  }
  
  backspace() {
    if (this.isError) {
      this.clear();
      return;
    }
    
    this.input = this.input.slice(0, -1);
    this.updateDisplay();
  }
  
  addDecimal() {
    if (this.isError) {
      this.clear();
      return;
    }
    
    const parts = this.input.split(/[\+\-\*\/%]/);
    const lastNumber = parts[parts.length - 1];
    
    if (!lastNumber.includes('.') && lastNumber !== '') {
      this.input += '.';
    } else if (lastNumber === '') {
      this.input += '0.';
    }
    
    this.updateDisplay();
  }
  
  toggleSign() {
    if (this.isError) {
      this.clear();
      return;
    }
    
    if (!this.input) return;
    
    try {
      if (this.input.includes('+') || this.input.includes('-') || 
          this.input.includes('*') || this.input.includes('/') || 
          this.input.includes('%')) {
        const result = this.safeEval(this.input);
        this.input = (-result).toString();
      } else {
        this.input = this.input.startsWith('-') 
          ? this.input.slice(1) 
          : '-' + this.input;
      }
      this.updateDisplay();
    } catch {
      this.showError('Invalid input');
    }
  }
  
  setPowerMode() {
    if (this.isError) {
      this.clear();
      return;
    }
    
    try {
      const base = this.safeEval(this.input);
      this.expressionText = `${base}^`;
      this.input = '';
      this.powerMode = true;
      this.updateExpression();
    } catch {
      this.showError('Invalid input');
    }
  }
  
  calculate() {
    if (this.isError) {
      this.clear();
      return;
    }
    
    if (!this.input) return;
    
    try {
      let result;
      
      if (this.powerMode) {
        const base = parseFloat(this.expressionText.replace('^', ''));
        const exponent = this.safeEval(this.input);
        result = Math.pow(base, exponent);
        this.powerMode = false;
        this.expressionText = '';
      } else {
        result = this.safeEval(this.input);
        this.expressionText = this.input + '=';
      }
      
      this.input = this.formatResult(result);
      this.lastResult = this.input;
      this.updateExpression();
      this.updateDisplay();
    } catch (error) {
      this.showError('Math Error');
    }
  }
  
  safeEval(expression) {
    let expr = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/%/g, '%');
    
    if (!this.isValidExpression(expr)) {
      throw new Error('Invalid expression');
    }
    
    try {
      return Function(`'use strict'; return (${expr})`)();
    } catch {
      return eval(expr);
    }
  }
  
  isValidExpression(expr) {
    if (!expr || /[^0-9+\-*/.%\s()]/.test(expr)) return false;
    if (/[+\-*/%]{2,}/.test(expr)) return false;
    return true;
  }
  
  formatResult(num) {
    if (Math.abs(num) > 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
      return num.toExponential(8).replace('e+', 'e');
    }
    
    const rounded = Math.round(num * 1e10) / 1e10;
    return parseFloat(rounded.toString()).toString();
  }
  
  calculateSqrt() {
    if (this.isError) {
      this.clear();
      return;
    }
    
    try {
      const num = this.safeEval(this.input || this.lastResult || '0');
      if (num < 0) {
        this.showError('Invalid input');
        return;
      }
      this.input = Math.sqrt(num).toString();
      this.expressionText = `√(${num})=`;
      this.updateExpression();
      this.updateDisplay();
    } catch {
      this.showError('Math Error');
    }
  }
  
  calculateSquare() {
    if (this.isError) {
      this.clear();
      return;
    }
    
    try {
      const num = this.safeEval(this.input || this.lastResult || '0');
      this.input = Math.pow(num, 2).toString();
      this.expressionText = `(${num})²=`;
      this.updateExpression();
      this.updateDisplay();
    } catch {
      this.showError('Math Error');
    }
  }
  
  calculateInverse() {
    if (this.isError) {
      this.clear();
      return;
    }
    
    try {
      const num = this.safeEval(this.input || this.lastResult || '0');
      if (num === 0) {
        this.showError('Cannot divide by zero');
        return;
      }
      this.input = (1 / num).toString();
      this.expressionText = `1/(${num})=`;
      this.updateExpression();
      this.updateDisplay();
    } catch {
      this.showError('Math Error');
    }
  }
  
  calculateSin() {
    if (this.isError) {
      this.clear();
      return;
    }
    
    try {
      const num = this.safeEval(this.input || this.lastResult || '0');
      this.input = Math.sin(num).toString();
      this.expressionText = `sin(${num})=`;
      this.updateExpression();
      this.updateDisplay();
    } catch {
      this.showError('Math Error');
    }
  }
  
  calculateCos() {
    if (this.isError) {
      this.clear();
      return;
    }
    
    try {
      const num = this.safeEval(this.input || this.lastResult || '0');
      this.input = Math.cos(num).toString();
      this.expressionText = `cos(${num})=`;
      this.updateExpression();
      this.updateDisplay();
    } catch {
      this.showError('Math Error');
    }
  }
  
  calculateTan() {
    if (this.isError) {
      this.clear();
      return;
    }
    
    try {
      const num = this.safeEval(this.input || this.lastResult || '0');
      this.input = Math.tan(num).toString();
      this.expressionText = `tan(${num})=`;
      this.updateExpression();
      this.updateDisplay();
    } catch {
      this.showError('Math Error');
    }
  }
  
  calculateLog() {
    if (this.isError) {
      this.clear();
      return;
    }
    
    try {
      const num = this.safeEval(this.input || this.lastResult || '0');
      if (num <= 0) {
        this.showError('Invalid input');
        return;
      }
      this.input = Math.log10(num).toString();
      this.expressionText = `log(${num})=`;
      this.updateExpression();
      this.updateDisplay();
    } catch {
      this.showError('Math Error');
    }
  }
  
  showError(message) {
    this.isError = true;
    this.input = message;
    this.display.classList.add('error');
    this.updateDisplay();
    
    setTimeout(() => {
      if (this.isError) {
        this.clear();
      }
    }, 2000);
  }
  
  updateExpression() {
    this.expression.textContent = this.expressionText;
  }
  
  updateDisplay() {
    this.display.value = this.input || '0';
  }
  
  handleKeyboard(event) {
    const calculatorKeys = ['0','1','2','3','4','5','6','7','8','9',
                           '.',',','+','-','*','/','=','Enter',
                           'Escape','Delete','Backspace','%','(',')',
                           's','S','c','C','t','T','l','L'];
    
    if (calculatorKeys.includes(event.key)) {
      event.preventDefault();
    }
    
    switch(event.key) {
      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8': case '9':
        this.handleButton(event.key);
        break;
      case '.':
      case ',':
        this.addDecimal();
        break;
      case '+': case '-': case '*': case '/': case '%':
        this.handleButton(event.key);
        break;
      case '=':
      case 'Enter':
        this.calculate();
        break;
      case 'Escape':
      case 'Delete':
        this.clear();
        break;
      case 'Backspace':
        this.backspace();
        break;
      case 's':
      case 'S':
        if (event.ctrlKey) {
          this.calculateSin();
        } else {
          this.calculateSqrt();
        }
        break;
      case 'c':
      case 'C':
        if (event.ctrlKey) {
          this.calculateCos();
        }
        break;
      case 't':
      case 'T':
        if (event.ctrlKey) {
          this.calculateTan();
        }
        break;
      case 'l':
      case 'L':
        if (event.ctrlKey) {
          this.calculateLog();
        }
        break;
    }
  }
}

// Initialize calculator
document.addEventListener('DOMContentLoaded', () => {
  new ScientificCalculator();
});