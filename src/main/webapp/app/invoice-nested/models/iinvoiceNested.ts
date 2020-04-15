
import {IEntry} from "./ientry";
import {IBuyer} from "./ibuyer";

export interface IInvoiceNested {
    id:         number;
    buyer:      IBuyer;
    dueDate:    Date;
    entries:    IEntry[];
    issuedDate: Date;
    number:     string;
    seller:     IBuyer;
}