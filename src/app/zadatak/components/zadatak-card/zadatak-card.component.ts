import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Zadatak } from '../../interfaces';
import { PrimengModule } from '../../../shared/modules/primeng/primeng.module';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ZadatakDetaljiComponent } from '../zadatak-detalji/zadatak-detalji.component';
import { ZadatakPrioritetChipComponent } from '../zadatak-prioritet-chip/zadatak-prioritet-chip.component';

@Component({
	selector: 'zadatak-card',
	standalone: true,
	imports: [PrimengModule, ZadatakPrioritetChipComponent],
	providers: [DialogService],
	templateUrl: './zadatak-card.component.html',
	styleUrl: './zadatak-card.component.css',
})
export class ZadatakCardComponent {
	@Input() zadatak!: Zadatak;
	@Output() zadatakIzmjenjen = new EventEmitter<void>();
	ref: DynamicDialogRef | undefined;

	constructor(private dialog: DialogService) {}

	otvoriDetalje() {
		this.ref = this.dialog.open(ZadatakDetaljiComponent, {
			header: this.zadatak.naziv,
			data: this.zadatak,
			modal: true,
		});
		this.ref.onClose.subscribe((izmjenjen) => {
			if (izmjenjen) this.zadatakIzmjenjen.emit();
		});
	}
}
