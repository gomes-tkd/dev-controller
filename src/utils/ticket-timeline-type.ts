import InteractionProps from "@/utils/interaction-type";

export default interface TicketTimelineProps {
    ticketId: string;
    currentUserId: string;
    initialInteractions: InteractionProps[];
}