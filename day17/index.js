const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().split("\n");

const a = Number(input[0].split(": ")[1]);
const b = Number(input[1].split(": ")[1]);
const c = Number(input[2].split(": ")[1]);
const programs = input[4].split(": ")[1].split(",").map(Number);

console.log(a, b, c, programs);

//  Except for jump instructions, the instruction pointer increases by 2 after each instruction is processed (to move past the instruction's opcode and its operand)
class ThreeBitComputer {
  constructor(registerA, registerB, registerC, program) {
    this.registerA = registerA; // Register A
    this.registerB = registerB; // Register B
    this.registerC = registerC; // Register C
    this.program = program; // The program (array of opcodes and operands)
    this.instructionPointer = 0; // Starts at 0
    this.output = []; // Outputs collected during execution
  }

  run() {
    while (this.instructionPointer < this.program.length) {
      const opcode = this.program[this.instructionPointer];
      const operand = this.program[this.instructionPointer + 1];
      this.instructionPointer += 2;

      switch (opcode) {
        case 0: // adv: A = A / 2^operand
          this.executeAdv(operand);
          break;
        case 1: // bxl: B = B XOR operand
          this.executeBxl(operand);
          break;
        case 2: // bst: B = comboOperand % 8
          this.executeBst(operand);
          break;
        case 3: // jnz: jump if A != 0
          if (this.registerA !== 0) {
            this.instructionPointer = operand;
          }
          break;
        case 4: // bxc: B = B XOR C (ignores operand)
          this.executeBxc();
          break;
        case 5: // out: output (comboOperand % 8)
          this.executeOut(operand);
          break;
        case 6: // bdv: B = A / 2^operand
          this.executeBdv(operand);
          break;
        case 7: // cdv: C = A / 2^operand
          this.executeCdv(operand);
          break;
        default:
          throw new Error(`Unknown opcode: ${opcode}`);
      }

      // Stop if A becomes 0
      if (this.registerA === 0) {
        break;
      }
    }
    return this.output;
  }

  executeAdv(operand) {
    const divisor = Math.pow(2, this.resolveComboOperand(operand));
    this.registerA = Math.floor(this.registerA / divisor);
  }

  executeBxl(operand) {
    this.registerB ^= operand;
  }

  executeBst(operand) {
    const value = this.resolveComboOperand(operand);
    this.registerB = value % 8;
  }

  executeBxc() {
    this.registerB ^= this.registerC;
  }

  executeOut(operand) {
    const value = this.resolveComboOperand(operand);
    this.output.push(value % 8);
  }

  executeBdv(operand) {
    const divisor = Math.pow(2, this.resolveComboOperand(operand));
    this.registerB = Math.floor(this.registerA / divisor);
  }

  executeCdv(operand) {
    const divisor = Math.pow(2, this.resolveComboOperand(operand));
    this.registerC = Math.floor(this.registerA / divisor);
  }

  resolveComboOperand(operand) {
    // Resolves combo operands into their values
    if (operand <= 3) {
      return operand;
    } else if (operand === 4) {
      return this.registerA;
    } else if (operand === 5) {
      return this.registerB;
    } else if (operand === 6) {
      return this.registerC;
    } else {
      throw new Error("Invalid combo operand (7)");
    }
  }
}

const computer = new ThreeBitComputer(a, b, c, programs);
const output = computer.run();

console.log("Output:", output);
