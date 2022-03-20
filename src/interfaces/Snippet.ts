
export default interface Snippet {
    id: number;
    title: string;
    description: string;
    code: string;
    user_id: number;
    language_id: number;
    icon?: string | null;
    username?: string | null;
    favorites?: number | null;
    key: string;
};