export default interface InvitationProps {
    id: string;
    email: string;
    teamId: string;
    status: string;
    createdAt: Date | string;
}