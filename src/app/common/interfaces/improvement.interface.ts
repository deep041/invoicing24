export interface Improvement {
    _id: string;
    title: string;
    description?: string;
    status: 'open' | 'in_progress' | 'completed';
    commentCount?: number;
    createdAt?: string;
}

export interface ImprovementComment {
    _id: string;
    improvementId: string | {
        _id: string;
        title: string;
        status: string;
    };
    userId: string;
    userName?: string;
    text: string;
    createdAt?: string;
}

export interface AdminProject {
    _id: string;
    name: string;
    description?: string;
    commentIds: ImprovementComment[];
    createdAt?: string;
}
