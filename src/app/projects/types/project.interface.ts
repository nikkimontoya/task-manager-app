import {TaskInterface} from '../../tasks/types/task.interface';
import {UserInterface} from '../../shared/types/user.interface';

export interface ProjectInterface {
    id: number;
    name: string;
    taskIds: number[];
    participantIds: number[];
    administratorId: number;
    createdAt: Date;
    updatedAt: Date;
    tasks?: TaskInterface[];
    users?: UserInterface[];
}
