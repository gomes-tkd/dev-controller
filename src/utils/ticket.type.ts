export default interface TicketProps {
    id: string;
    customer: string | undefined;
    description: string;
    date: string | undefined;
    status: string;
}
