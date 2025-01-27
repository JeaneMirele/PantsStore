import { Component, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-exclusao',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './confirmar-exclusao.component.html',
  styleUrl: './confirmar-exclusao.component.css'
})
export class ConfirmarExclusaoComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarExclusaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); 
  }

  onCancel(): void {
    this.dialogRef.close(false); 
  }
}

