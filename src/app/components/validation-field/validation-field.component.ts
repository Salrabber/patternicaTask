import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-field',
  templateUrl: './validation-field.component.html',
  styleUrls: ['./validation-field.component.scss'],
})
export class ValidationFieldComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getPasswordStrength(password: string): string {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*()]/.test(password);

    let strength: string = '';

    switch (true) {
      case (hasLetters && !hasSymbols && !hasDigits) ||
        (!hasLetters && hasDigits && !hasSymbols) ||
        (!hasLetters && !hasDigits && hasSymbols):
        strength = 'Easy';
        break;
      case (hasLetters && hasSymbols && !hasDigits) ||
        (hasLetters && hasDigits && !hasSymbols) ||
        (!hasLetters && hasDigits && hasSymbols):
        strength = 'Medium';
        break;
      case hasLetters && hasDigits && hasSymbols:
        strength = 'Strong';
        break;
      default:
        strength = 'Invalid';
        break;
    }

    return strength;
  }

  @Input() term!: string;
  @Input() flag!: string;

  get status() {
    return this.getPasswordStrength(this.term);
  }
  
  get colors(){
    return(
      this.term.length < 8 ? 
      {'bg-red-400': this.term.length > 0}
      :
      {'bg-red-400': this.status === 'Easy' && this.flag === 'firstField',
      'bg-yellow-400': this.status === 'Medium' && (this.flag === 'secondField' || this.flag === 'firstField'),
      'bg-green-400': this.status === 'Strong',}
    )
  }

}

      