import {TicketDetails} from "./TicketDetails";

export class LotteryTicketResponse {
  status!: string;
  errorsList!: Array<string>;
  ticket!: TicketDetails;
}
