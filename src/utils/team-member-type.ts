export default interface TeamMemberProps {
    name: string | null;
    id: string;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    teamId: string | null;
    createdAt: Date;
    updatedAt: Date;
}