export default interface InteractionProps {
    id: string;
    content: string;
    createdAt: Date | string;
    userId: string | null;
    User: {
        name: string | null;
        image: string | null;
    } | null;
}
