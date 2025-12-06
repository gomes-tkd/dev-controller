export default interface TicketProps {
    id: string;
    name: string;
    customer: string | undefined;
    description: string;
    date: string | undefined;
    status: string;
    priority: string;
}
