import {UserInterface} from '../../user/types/user.interface';

export interface TaskInterface {
    id: number;
    title: string;
    body: string;
    authorId?: number;
    executorId?: number;
    projectId: number;
    deadlineDate: Date;
    author?: UserInterface;
    executor?: UserInterface;
    createdAt: Date;
}
