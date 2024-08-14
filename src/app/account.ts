export interface Account {

    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
}
    