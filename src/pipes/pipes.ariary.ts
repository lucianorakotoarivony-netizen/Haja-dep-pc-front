import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:"ariary",
})
export class AriaryPipe implements PipeTransform {
    transform(value: number | null | undefined):string {
        if (value == null){
            return "Sur devis";
        }
        const valueStr = value.toString();
        const formatted=valueStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return `${formatted} Ar`;
    }
}