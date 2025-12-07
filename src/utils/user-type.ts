export default interface UserProps {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
