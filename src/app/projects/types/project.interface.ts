import {TaskInterface} from '../../tasks/types/task.interface';
import {UserInterface} from '../../user/types/user.interface';
import {MainProjectDataInterface} from './main-project-data.interface';

export interface ProjectInterface {
    id: number;
    name: string;
    description: string;
    taskIds: number[];
    participantIds: number[];
    administratorId: number;
    createdAt: Date;
    updatedAt: Date;
    tasks?: TaskInterface[];
    users?: UserInterface[];
}
