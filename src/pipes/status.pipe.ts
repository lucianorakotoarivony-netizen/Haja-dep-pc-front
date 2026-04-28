import { Pipe, PipeTransform } from "@angular/core";
@Pipe({name: 'reviewStatus'})
export class ReviewStatusPipe implements PipeTransform{
    transform(value: string): string {
        const translation: Record<string, string>={
            'pending': 'En attente',
            'approved':' Approuvé ',
            'rejected': 'Rejeté'
        };
        return translation[value] || value;
    }
}