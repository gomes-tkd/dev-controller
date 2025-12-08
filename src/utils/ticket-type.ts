export default interface TicketProps {
    id: string;
    name: string;
    customer: string | undefined;
    description: string;
    date: string;
    status: string;
    priority: string;
    dueDate: Date | string | null;
}